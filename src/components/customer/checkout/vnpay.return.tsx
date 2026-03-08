"use client";

import { PaymentStatus } from "@/types/models/order.model";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

interface VNPayReturnResponse {
  success: boolean;
  orderId?: string;
  status?: PaymentStatus;
  message?: string;
}

interface VNPayReturnProps {
  data?: VNPayReturnResponse;
}

const VNPayReturn = ({ data }: VNPayReturnProps) => {
  const router = useRouter();

  if (data?.success) {
    return (
      <Result
        status="success"
        title="Thanh toán thành công!"
        subTitle={`Mã đơn hàng: ${data.orderId}`}
        extra={[
          <Button
            type="primary"
            key="orders"
            onClick={() => router.push("/orders")}
          >
            Xem đơn hàng
          </Button>,
          <Button key="home" onClick={() => router.push("/")}>
            Về trang chủ
          </Button>,
        ]}
      />
    );
  }

  return (
    <Result
      status="error"
      title="Thanh toán thất bại"
      subTitle={
        data?.message ||
        "Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."
      }
      extra={[
        <Button type="primary" key="retry" onClick={() => router.push("/checkout")}>
          Thử lại
        </Button>,
        <Button key="home" onClick={() => router.push("/")}>
          Về trang chủ
        </Button>,
      ]}
    />
  );
};

export default VNPayReturn;
