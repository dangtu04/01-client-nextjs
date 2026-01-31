"use client";

import React, { useState } from "react";
import { Form } from "antd";
import "./checkout.scss";
import DeliveryInformation from "./delivery.information";
import OrderSummary from "./order.summary";
import { ICartItem } from "@/types/models/cart.model";
import { SHIPPING_CONFIG } from "@/utils/shipping";
import { IProfileUser } from "@/types/models/user.model";

interface IProps {
  cartItems: ICartItem[];
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
  totalPrice: number;
  userData?: IProfileUser;
}

const Checkout = (props: IProps) => {
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [form] = Form.useForm();

  const { cartItems, totalPrice, userData } = props;

  // console.log("userData checkout component", userData);

  const subtotal = totalPrice;
  const shippingFee =
    totalPrice >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_CONFIG.DEFAULT_FEE;
  const total = subtotal + shippingFee;

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    console.log("Payment method:", paymentMethod);

  };

   form.setFieldsValue({
      name: userData?.name,
      phone: userData?.phone,
      provinceCode: userData?.address?.provinceCode,
      provinceName: userData?.address?.provinceName,
      wardCode: userData?.address?.wardCode,
      wardName: userData?.address?.wardName,
      detail: userData?.address?.detail,
    });

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        {/* Left Section - Delivery Information */}
        <DeliveryInformation
          form={form}
          userData={userData}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          handleSubmit={handleSubmit}
        />

        {/* Right Section - Order Summary */}
        <OrderSummary
          cartItems={cartItems}
          subtotal={subtotal}
          shippingFee={shippingFee}
          total={total}
          meta={props.meta}
        />
      </div>
    </div>
  );
};

export default Checkout;
