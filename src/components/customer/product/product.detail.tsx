import { IProductDetail } from "@/types/models/product.model";
import "./product.detail.scss";
import ProductDetailImages from "./product.detail.images";
import ProductDetailInfo from "./product.detail.info";
interface IProps {
  product?: IProductDetail;
  images?: string[];
}

const ProductDetail = async ({ product, images }: IProps) => {
  if (!product) return null;

  // ảnh chính của sản phẩm
  const thumbnail = product?.thumbnail?.secureUrl;

  // gộp ảnh chính và list ảnh phụ
  const listImagesFinal = [thumbnail, ...(images || [])];

  // thông tin chi tiết sản phẩm
  const info = {
    name: product.name,
    categoryName: product.categoryIds?.map((cat) => cat.name) || [],
    brandName: product.brandId?.name || "",
    price: product.price,
    sizeName: product.variants
      ?.map((i) => i.sizeName)
      .filter(Boolean) as string[],
    material: product.material,
    description: product.description,
  };

  return (
    <div className="product-detail-section">
      <div className="product-detail-images">
        <ProductDetailImages listImages={listImagesFinal} />
      </div>
      <div className="product-detail-info">
        <ProductDetailInfo info={info} />
      </div>
    </div>
  );
};

export default ProductDetail;
