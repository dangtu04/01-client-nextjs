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
  console.log('>>>> product: ', product)
  // console.log(">>>>> product variant: ", product.variants);

  // ảnh chính của sản phẩm
  const thumbnail = product?.thumbnail?.secureUrl;

  // gộp ảnh chính và list ảnh phụ
  const listImagesFinal = [thumbnail, ...(images || [])];


  // console.log('>>>>>>> sizes: ', sizes)

  // thông tin chi tiết sản phẩm
  const info = {
    productId: product._id,
    name: product.name,
    categoryName: product.categoryIds?.map((cat) => cat.name) || [],
    brandName: product.brandId?.name || "",
    price: product.price,
    variants: product.variants,
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
