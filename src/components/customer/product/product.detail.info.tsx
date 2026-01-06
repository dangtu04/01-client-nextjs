"use client";

import { useState } from "react";
import "./product.detail.info.scss";

interface IProps {
  info: {
    name: string;
    categoryName: string[];
    brandName: string;
    price: number;
    sizeName: string[];
    material: string;
    description: string;
  };
}

const ProductDetailInfo = ({ info }: IProps) => {
  const {
    name,
    categoryName,
    brandName,
    price,
    sizeName,
    material,
    description,
  } = info;

  const [selectedSize, setSelectedSize] = useState(sizeName[0] || "");
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: "increment" | "decrement") => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="product-info-container">
      {/* Product Title */}
      <h1 className="product-title">
        {name}
        {/* <span className="stock-badge">Còn Hàng</span> */}
      </h1>

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

      {/* Size Selection */}
      <div className="selection-group">
        <div className="size-header">
          <label>
            Kích thước: <strong>{selectedSize}</strong>
          </label>
          <p className="size-guide">Hướng dẫn chọn size</p>
        </div>
        <div className="size-options">
          {sizeName.map((size) => (
            <button
              key={size}
              className={`size-btn ${selectedSize === size ? "active" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="cart-actions">
        <div className="quantity-selector">
          <button onClick={() => handleQuantityChange("decrement")}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => handleQuantityChange("increment")}>+</button>
        </div>
        <button className="add-to-cart-btn">THÊM VÀO GIỎ</button>
        <button className="buy-now-btn">MUA NGAY</button>
      </div>

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
