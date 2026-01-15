"use client";

import {
  handleDeleteCartItemAction,
  handleUpdateCartItemAction,
} from "@/actions/carts.actions";
import { CartLimits, ICartItem } from "@/types/models/cart.model";
import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useState } from "react";

interface IProps {
  items: ICartItem[];
}

const CartItem = (props: IProps) => {
  const { items } = props;

  const [cartItems, setCartItems] = useState<ICartItem[]>(items);

  // console.log(">>>> check: ", items);

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const updateQuantity = async (id: string, change: number) => {
    let updateQuantity = 1;
    setCartItems((items) =>
      items.map((item) => {
        if (item._id === id) {
          const newQty = Math.max(1, item.quantity + change);
          updateQuantity = newQty;
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
    try {
      const res = await handleUpdateCartItemAction(id, updateQuantity);
      // console.log('>>>>> check res: ', res)
      if (res?.statusCode !== 200) {
        message.error("Cập nhật thất bại");
      }
    } catch (error) {
      console.log('>>>>> error: ', error)
    }
  };
  const deleteItem = async (itemId: string) => {
    const previousItems = cartItems;

    // Xóa ngay trong UI
    setCartItems((items) => items.filter((item) => item._id !== itemId));

    try {
      const response = await handleDeleteCartItemAction(itemId);
      if (response.statusCode !== 200) {
        // Rollback nếu lỗi
        setCartItems(previousItems);
        message.error("Xóa sản phẩm thất bại");
      }
    } catch (error) {
      setCartItems(previousItems);
      message.error("Có lỗi xảy ra");
    }
  };
  return (
    <div className="cart-items">
      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">
          <div className="item-image">
            <img
              src={item.productId.thumbnail.secureUrl}
              alt={item.productId.name}
            />
          </div>

          <div className="item-details">
            <h3 className="item-name">{item.productId.name}</h3>
            <div className="item-options">
              <span>Size: {item.sizeId.name}</span>
            </div>
            <p className="item-price">{formatPrice(item.productId.price)}</p>
          </div>

          <div className="item-actions">
            <div className="quantity-control">
              <button
                onClick={() => updateQuantity(item._id, -1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <input type="text" value={item.quantity} readOnly />
              <button
                onClick={() => updateQuantity(item._id, 1)}
                disabled={
                  item.quantity >= CartLimits.MAX_QUANTITY_PER_ITEM ||
                  item.quantity >= item.variant.stock
                }
              >
                +
              </button>
            </div>

            <button
              className="btn-remove"
              onClick={() => deleteItem(item._id)}
              title="Xóa sản phẩm"
            >
              <DeleteOutlined />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CartItem;
