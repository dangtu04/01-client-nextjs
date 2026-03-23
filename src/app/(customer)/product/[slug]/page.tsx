import ProductDetail from "@/components/customer/product/product.detail";
import { IProductDetail } from "@/types/models/product.model";
import { sendRequest } from "@/utils/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: { slug: string };
}

// hàm gọi api dùng chung cho cả page và metadata
async function getProductDetail(slug: string) {
  const res = await sendRequest<
    IBackendRes<{
      product: IProductDetail;
      images: string[];
    }>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/detail/${slug}`,
    method: "GET",
    nextOption: {
      next: {
        // tag để revalidate cache khi cần
        tags: [`product-detail-${slug}`],
        // cache 1 tiếng
        revalidate: 3600,
      },
    },
  });

  return res?.data;
}

// dynamic metadata cho trang chi tiết sản phẩm
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const data = await getProductDetail(params.slug);
  const product = data?.product;

  // nếu không có sản phẩm
  if (!product) {
    return {
      title: "sản phẩm không tồn tại",
      description: "không tìm thấy sản phẩm",
    };
  }

  return {
    title: product.name,

    // cắt description <160 kt
    description: product.description?.slice(0, 160),

    // open graph để share facebook, zalo
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: [product.thumbnail?.secureUrl],
      type: "website",
    },

    // canonical url tránh trùng lặp seo
    alternates: {
      canonical: `/product/${params.slug}`,
    },
  };
}

// page chính
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const data = await getProductDetail(params.slug);

  // nếu không có sản phẩm thì chuyển sang trang 404
  if (!data?.product) {
    notFound();
  }

  return (
    <div>
      <ProductDetail product={data.product} images={data.images} />
    </div>
  );
}