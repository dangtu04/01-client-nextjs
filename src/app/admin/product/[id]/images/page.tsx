import ProductImages from "@/components/admin/products/product.images";
import { IProductImage, IProductImageResponse,  } from "@/types/models/product.model";
import { sendAuthRequest } from "@/utils/api";
import { notFound } from "next/navigation";

interface IProps {
  params: { id: string };
}

const ProductImagesPage = async ({ params }: IProps) => {
  const { id } = params;

  const res = await sendAuthRequest<IBackendRes<IProductImageResponse>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}/images-detail`,
    method: "GET",
    nextOption: {
      next: { tags: ["detail-images"] },
    },
  });
  if (res?.statusCode === 400) {
    notFound();
  }
  // console.log(">>> ProductImagesPage res: ", res.data);

  return (
    <>
      <div>
        <ProductImages images={res?.data?.results ?? []} productId={id} />
      </div>
    </>
  );
};

export default ProductImagesPage;
