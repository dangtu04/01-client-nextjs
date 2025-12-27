import ProductDetail from "@/components/admin/products/product.detail";
import { ICategoryParent } from "@/types/models/category.model";
import {
  IBrand,
  ICategory,
  IProductDetail,
  ISelectResponse,
  ISize,
} from "@/types/models/product.model";
import { sendAuthRequest } from "@/utils/api";
import { notFound } from "next/navigation";

interface IProps {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: IProps) => {
  const id = params.id;
  const res = await sendAuthRequest<IBackendRes<IProductDetail>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}`,
    method: "GET",
    nextOption: {
      next: { tags: ["product-detail"] },
    },
  });
  if (!res.data) {
    notFound();
  }

  const listCategoriesForSelect = await sendAuthRequest<
    IBackendRes<ISelectResponse<ICategory>>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/select/all`,
    method: "GET",
    nextOption: {
      next: { tags: ["list-categories"] },
    },
  });

  const listBrandsForSelect = await sendAuthRequest<IBackendRes<ISelectResponse<IBrand>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands/select/all`,
    method: "GET",
    nextOption: {
      next: { tags: ["list-brands"] },
    },
  });

   const listSizesForSelect = await sendAuthRequest<IBackendRes<ISelectResponse<ISize>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sizes/select/all`,
    method: "GET",
    nextOption: {
      next: { tags: ["list-sizes"] },
    },
  });

  return (
    <>
      <div>
        <ProductDetail
          product={res.data}
          listCategoriesForSelect={listCategoriesForSelect?.data?.results ?? []}
          listBrandsForSelect={listBrandsForSelect?.data?.results ?? []}
          listSizesForSelect={listSizesForSelect?.data?.results ?? []}
        />
      </div>
    </>
  );
};

export default ProductDetailPage;
