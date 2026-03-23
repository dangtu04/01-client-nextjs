import {
  handleGetNewProductsAction,
  handleGetProductsByCategoryAction,
} from "@/actions/products.actions";
import NewProductSection from "@/components/customer/home/new.product.section";
import ProductByCategory from "@/components/customer/home/product.by.category";
import { ICategory } from "@/types/models/product.model";
import { sendRequest } from "@/utils/api";

export default async function HomePage() {
  const initialProducts = await handleGetNewProductsAction(1, 8);

  const listCategories = await sendRequest<
    IBackendRes<IModelPaginate<ICategory>>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/public/all`,
    method: "GET",
    nextOption: {
      next: { tags: ["list-categories-public"] },
    },
  });

  const latestCategories = listCategories?.data?.results?.slice(0, 4) ?? [];

  return (
    <>
      <NewProductSection
        initialProducts={initialProducts?.data?.results ?? []}
      />
      {latestCategories.map((category) => (
        <ProductByCategory key={category._id} categoryId={category._id} categoryName={category.name}/>
      ))}
    </>
  );
}
