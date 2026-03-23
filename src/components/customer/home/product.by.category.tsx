import { handleGetProductsByCategoryAction } from "@/actions/products.actions";
import { IProductCard } from "@/types/models/product.model";
import ProductList from "./product.list";

interface IProps {
  categoryId: string;
  categoryName?: string;
}

const ProductByCategory = async ({ categoryId, categoryName }: IProps) => {
  const products = await handleGetProductsByCategoryAction(categoryId, 1, 8);
  const productsList = products?.data?.results ?? [];

  return (
    <ProductList products={productsList} categoryName={categoryName} categoryId={categoryId} />
  );
};

export default ProductByCategory;
