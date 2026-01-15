"use client";

import { handleAddtoCartAction } from "@/actions/carts.actions";
import { CartLimits } from "@/types/models/cart.model";
import { IProductVariant } from "@/types/models/product.model";
import { message } from "antd";
import { useState } from "react";

interface IProps {
  variants: IProductVariant[];
  productId: string;
}

const ProductPurchaseOptions = ({ variants, productId }: IProps) => {
  const [selectedVariant, setSelectedVariant] = useState<IProductVariant>(
    variants[0]
  );
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: "increment" | "decrement") => {
    if (action === "increment" && quantity < CartLimits.MAX_QUANTITY_PER_ITEM) {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    // console.log('>>>>> check: ', selectedVariant)
    const res = await handleAddtoCartAction(
      productId,
      selectedVariant.sizeId,
      quantity,
    );
    // console.log('>>>> res: ', res)
    if(res?.statusCode === 201) {
      message.success(res?.data?.message)
    } else {
      message.error(res?.message)
    }
  };

  const handleBuyNow = () => {
    console.log(">>>> Buy now");
  };

  // console.log(">>>>> selcted size: ", selectedSize);

  return (
    <>
      {/* Size Selection */}
      <div className="selection-group">
        <div className="size-header">
          <label>
            Kích thước: <strong>{selectedVariant.sizeName}</strong>
          </label>
          <p className="size-guide">Hướng dẫn chọn size</p>
        </div>
        <div className="size-options">
          {variants.map((size) => (
            <button
              key={size.sizeId}
              className={`size-btn ${
                selectedVariant.sizeId === size.sizeId ? "active" : ""
              }`}
              onClick={() => setSelectedVariant(size)}
            >
              {size.sizeName}
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
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          THÊM VÀO GIỎ
        </button>
        <button className="buy-now-btn" onClick={handleBuyNow}>
          MUA NGAY
        </button>
      </div>
    </>
  );
};

export default ProductPurchaseOptions;
