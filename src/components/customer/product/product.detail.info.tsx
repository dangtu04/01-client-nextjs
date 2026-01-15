import { IProductVariant } from "@/types/models/product.model";
import "./product.detail.info.scss";
import ProductPurchaseOptions from "./product.purchase.options";

interface IProps {
  info: {
    productId: string;
    name: string;
    categoryName: string[];
    brandName: string;
    price: number;
    variants: IProductVariant[];
    material: string;
    description: string;
  };
}

const ProductDetailInfo = ({ info }: IProps) => {
  const {
    productId,
    name,
    categoryName,
    brandName,
    price,
    variants,
    material,
    description,
  } = info;
  // console.log("..... variants: ", variants);

  return (
    <div className="product-info-container">
      {/* Product Title */}
      <h1 className="product-title">{name}</h1>

      {/* Product Meta */}
      <div className="product-meta">
        <span>
          Loại: <strong>{categoryName.join(", ")}</strong>
        </span>
        <span className="separator">|</span>
        <span>
          Thương hiệu: <strong>{brandName}</strong>
        </span>
      </div>

      {/* Price */}
      <div className="product-price">
        <span className="price">{price.toLocaleString("vi-VN")} ₫</span>
      </div>

      {/* Purchase Options */}
      <ProductPurchaseOptions variants={variants} productId={productId} />

      {/* Material Section */}
      {material && (
        <div className="product-material">
          <hr className="section-divider" />
          <h3 className="section-title">Chất liệu</h3>
          <p>{material}</p>
        </div>
      )}

      {/* Description Section */}
      {description && (
        <div className="product-description">
          <hr className="section-divider" />
          <h3 className="section-title">Mô tả sản phẩm</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailInfo;
