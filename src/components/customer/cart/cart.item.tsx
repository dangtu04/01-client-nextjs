"use client";

import {
  handleDeleteCartItemAction,
  handleUpdateCartItemAction,
} from "@/actions/carts.actions";
import { CartLimits, ICartItem } from "@/types/models/cart.model";
import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useCallback, useRef, useState } from "react";

interface IProps {
  items: ICartItem[];
}

const CartItem = (props: IProps) => {
  const { items } = props;

  const [cartItems, setCartItems] = useState<ICartItem[]>(items);

  // lưu timeout của itemId
  const updateTimeouts = useRef<{ [itemId: string]: NodeJS.Timeout }>({});

  // qty cuối cùng của item
  const latestQuantities = useRef<{ [itemId: string]: number }>({});

  // qty ban đầu của item
  const originalQuantities = useRef<{ [itemId: string]: number }>({});

  // format giá
  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const updateQuantity = useCallback((id: string, change: number) => {
    //  cập nhật ui
    setCartItems((items) =>
      items.map((item) => {
        if (item._id === id) {
          // kiểm tra có phải lần đầu click không
          if (!(id in originalQuantities.current)) {
            originalQuantities.current[id] = item.quantity;
          }
          const newQty = Math.max(1, item.quantity + change);
          latestQuantities.current[id] = newQty;
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );

    // nếu đã có timeout trước thì clear đi
    if (updateTimeouts.current[id]) {
      clearTimeout(updateTimeouts.current[id]);
    }

    updateTimeouts.current[id] = setTimeout(async () => {
      // lưu qty để cập nhật
      const quantityToUpdate = latestQuantities.current[id];
      // lưu qty để rollback
      const oldQuantity = originalQuantities.current[id];

      try {
        const res = await handleUpdateCartItemAction(id, quantityToUpdate);

        if (res?.statusCode !== 200) {
          throw new Error(res?.message || "Cập nhật thất bại");
        }
        delete originalQuantities.current[id];
      } catch (error) {
        console.error("Update error:", error);
        message.error("Cập nhật thất bại");

        setCartItems((items) =>
          items.map((item) =>
            item._id === id ? { ...item, quantity: oldQuantity } : item
          )
        );
        delete originalQuantities.current[id];
      } finally {
        delete latestQuantities.current[id];
        delete updateTimeouts.current[id];
      }
    }, 500);
  }, []);
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
