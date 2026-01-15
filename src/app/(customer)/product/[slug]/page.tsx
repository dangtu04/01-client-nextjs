import ProductDetail from "@/components/customer/product/product.detail";
import { IProductDetail } from "@/types/models/product.model";
import { sendRequest } from "@/utils/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: { slug: string };
}

// dynamic metadata
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = params;

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
        tags: [`product-detail-${slug}`],
        revalidate: 3600,
      },
    },
  });

  const product = res?.data?.product;

  if (!product) {
    return { title: "Sản phẩm không tồn tại" };``
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.thumbnail.secureUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = params;

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
        tags: ["product-detail", `product-detail-${slug}`],
        revalidate: 3600,
      },
    },
  });

  if (!res?.data?.product) {
    notFound();
  }

  return (
    <div>
      <ProductDetail product={res.data.product} images={res.data.images} />
    </div>
  );
}
