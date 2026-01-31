"use client";

import { Input, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { ICartItem } from "@/types/models/cart.model";
import PaginationLayout from "../layouts/pagination";

interface OrderSummaryProps {
  cartItems: ICartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
}

const OrderSummary = ({
  cartItems,
  subtotal,
  shippingFee,
  total,
  meta,
}: OrderSummaryProps) => {
  return (
    <div className="checkout-right">
      <div className="order-summary">
        <h3 className="summary-title">Đơn hàng ({meta?.totals || 0} sản phẩm)</h3>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-image-wrapper">
                <img
                  src={item.productId.thumbnail.secureUrl}
                  alt={item.productId.name}
                  className="item-image"
                />
                <span className="item-quantity">{item.quantity}</span>
              </div>
              <div className="item-details">
                <h4 className="item-name">{item.productId.name}</h4>
                <p className="item-specs">{item.sizeId.name}</p>
              </div>
              <div className="item-price">
                {item.subtotal.toLocaleString("vi-VN")}₫
              </div>
            </div>
          ))}
        </div>
        <PaginationLayout meta={meta} />

        {/* <div className="discount-section">
          <Input
            placeholder="Nhập mã giảm giá"
            size="large"
            className="discount-input"
          />
          <Button type="primary" size="large" className="apply-btn">
            Áp dụng
          </Button>
        </div> */}

        <div className="summary-details">
          <div className="summary-row">
            <span>Tạm tính</span>
            <span className="price">{subtotal.toLocaleString("vi-VN")}₫</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển</span>
            <span className="price">
              {subtotal >= 500000 ? "Miễn phí" : shippingFee.toLocaleString("vi-VN") + "₫"}
            </span>
          </div>
        </div>

        <div className="summary-total">
          <span>Tổng cộng</span>
          <span className="total-price">{total.toLocaleString("vi-VN")}₫</span>
        </div>

        <a href="#" className="back-link">
          <LeftOutlined /> Quay về giỏ hàng
        </a>
      </div>
    </div>
  );
};

export default OrderSummary;
