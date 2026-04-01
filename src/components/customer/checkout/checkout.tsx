"use client";

import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import "./checkout.scss";
import DeliveryInformation from "./delivery.information";
import OrderSummary from "./order.summary";
import { ICartItem } from "@/types/models/cart.model";
import { SHIPPING_CONFIG } from "@/utils/shipping";
import { IProfileUser } from "@/types/models/user.model";
import { PaymentMethod } from "@/types/models/order.model";
import {
  handleCreateCODOrderAction,
  handleCreateVNPayOrderAction,
} from "@/actions/orders.actions";
import { useRouter } from "next/navigation";

// Fix 6: Định nghĩa interface thay vì dùng any
interface ICheckoutFormValues {
  name: string;
  phone: string;
  provinceCode: string;
  provinceName: string;
  wardCode: string;
  wardName: string;
  detail: string;
  note?: string;
}

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.COD,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const { cartItems, totalPrice, userData } = props;

  const subtotal = totalPrice;
  const shippingFee =
    totalPrice >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_CONFIG.DEFAULT_FEE;
  const total = subtotal + shippingFee;

  const handleSubmit = async (values: ICheckoutFormValues) => {
    setIsLoading(true);
    try {
      const data = {
        paymentMethod,
        delivery: {
          receiverName: values.name,
          receiverPhone: values.phone,
          address: {
            provinceCode: values.provinceCode,
            provinceName: values.provinceName,
            wardCode: values.wardCode,
            wardName: values.wardName,
            detail: values.detail,
          },
          note: values.note || "",
        },
      };

      if (paymentMethod === PaymentMethod.COD) {
        const res = await handleCreateCODOrderAction(data);
        if (res?.success) {
          message.success("Đặt hàng thành công");
          router.push("/order");
        } else {
          message.error(res?.message || "Đặt hàng thất bại");
        }
      }

      if (paymentMethod === PaymentMethod.VNPAY) {
        const res = await handleCreateVNPayOrderAction(data);
        if (res?.success && res?.paymentUrl) {
          window.location.href = res.paymentUrl;
        } else {
          message.error(res?.message || "Tạo đơn hàng thất bại");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData?.name,
        phone: userData?.phone,
        provinceCode: userData?.address?.provinceCode,
        provinceName: userData?.address?.provinceName,
        wardCode: userData?.address?.wardCode,
        wardName: userData?.address?.wardName,
        detail: userData?.address?.detail,
      });
    }
  }, [userData, form]);

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
          isLoading={isLoading}
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
