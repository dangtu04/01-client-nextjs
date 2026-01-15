"use client";

import React, { useState } from "react";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./cart.scss";
import { ICartItem } from "@/types/models/cart.model";
import CartItem from "./cart.item";

interface IProps {
  items: ICartItem[];
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
}

const Cart = (props: IProps) => {
  const { items } = props;

  // console.log(">>>>> check props: ", props);

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <ShoppingCartOutlined style={{ fontSize: 80 }} />
            <h2>Giỏ hàng trống</h2>
            <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <button className="btn-shopping">Tiếp tục mua sắm</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Giỏ hàng của bạn</h1>
        <p className="cart-count">{items.length} sản phẩm</p>

        <div className="cart-content">
    

          <CartItem items={items}/>
          <div className="cart-summary">
            <h2>Tóm tắt đơn hàng</h2>

            <div className="summary-row">
              <span>Tạm tính</span>
              {/* <span>{formatPrice(subtotal)}</span> */}
            </div>

            <div className="summary-row">
              <span>Phí vận chuyển</span>
              {/* <span>{formatPrice(shipping)}</span> */}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Tổng cộng</span>
              {/* <span>{formatPrice(total)}</span> */}
            </div>

            <button className="btn-checkout">Thanh toán</button>

            <div className="shipping-note">
              <p>Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
            </div>

            <button className="btn-continue">Tiếp tục mua sắm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
