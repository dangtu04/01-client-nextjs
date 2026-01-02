import { handleGetNewProductsAction } from "@/actions/products.actions";
import NewProductSection from "@/components/customer/home/new.product.section";

export default async function HomePage() {
  const initialProducts = await handleGetNewProductsAction(1, 8);

  return (
    <>
      <NewProductSection
        initialProducts={initialProducts?.data?.results ?? []}
      />
    </>
  );
}
