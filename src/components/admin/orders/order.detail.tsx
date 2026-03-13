"use client";
import {
  IOrder,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/types/models/order.model";
import { Card, Divider, Row, Col, Table, Tag, Space } from "antd";
import type { TableColumnsType } from "antd";

interface OrderDetailProps {
  order: IOrder;
}

const OrderDetail = ({ order }: OrderDetailProps) => {
  // console.log(">>>>>> check order detail: ", order);

  // cột hiển thị sản phẩm trong đơn hàng
  const itemColumns: TableColumnsType<any> = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: 200,
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 120,
      render: (thumbnail: string) => (
        <img src={thumbnail} alt="Product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Kích cỡ",
      dataIndex: "sizeCode",
      key: "sizeCode",
      width: 80,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (price: number) => <span>{price.toLocaleString("vi-VN")}₫</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 120,
      render: (totalPrice: number) => (
        <span style={{ fontWeight: "600", color: "#1890ff" }}>
          {totalPrice.toLocaleString("vi-VN")}₫
        </span>
      ),
    },
  ];

  // lấy màu tương ứng với status của order
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "orange";
      case "CONFIRMED":
        return "blue";
      case "PROCESSING":
        return "cyan";
      case "SHIPPING":
        return "purple";
      case "COMPLETED":
        return "green";
      case "CANCELLED":
        return "red";
      case "REFUNDED":
        return "volcano";
      default:
        return "default";
    }
  };

  // lấy label hiển thị tương ứng với status của order
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Đang chờ";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "PROCESSING":
        return "Đang xử lý";
      case "SHIPPING":
        return "Đang giao";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã huỷ";
      case "REFUNDED":
        return "Hoàn tiền";
      default:
        return status;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    return method === PaymentMethod.COD ? "Thanh toán khi nhận hàng" : method;
  };

  const getPaymentStatusLabel = (status: string) => {
    return status === PaymentStatus.UNPAID
      ? "Chưa thanh toán"
      : "Đã thanh toán";
  };

  return (
    <div>
      <h1>Chi tiết đơn hàng</h1>

      {/* Order Info */}
      <Card title="Thông tin đơn hàng" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={12}>
            <p>
              <strong>Mã đơn hàng:</strong>{" "}
              <span style={{ fontSize: 14, color: "#1890ff" }}>
                {order._id}
              </span>
            </p>
            <p>
              <strong>Email khách hàng:</strong> {order.userEmail}
            </p>
            <p>
              <strong>Trạng thái đơn:</strong>{" "}
              <Tag color={getStatusColor(order.status)}>
                {getStatusLabel(order.status)}
              </Tag>
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(order.createdAt).toLocaleString("vi-VN")}
            </p>
            <p>
              <strong>Cập nhật lần cuối:</strong>{" "}
              {new Date(order.updatedAt).toLocaleString("vi-VN")}
            </p>
          </Col>
        </Row>
      </Card>

      {/* Items */}
      <Card title="Sản phẩm trong đơn hàng" style={{ marginBottom: 24 }}>
        <Table<any>
          columns={itemColumns}
          dataSource={order.items}
          rowKey="productId"
          pagination={false}
        />
      </Card>

      {/* Delivery Info */}
      <Card title="Thông tin giao hàng" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={12}>
            <p>
              <strong>Tên người nhận:</strong> {order.delivery.receiverName}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order.delivery.receiverPhone}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Tỉnh/Thành phố:</strong>{" "}
              {order.delivery.address.provinceName}
            </p>
            <p>
              <strong>Quận/Huyện:</strong> {order.delivery.address.wardName}
            </p>
          </Col>
        </Row>
        <p>
          <strong>Địa chỉ chi tiết:</strong> {order.delivery.address.detail}
        </p>
        {order.delivery.note && (
          <p>
            <strong>Ghi chú:</strong> {order.delivery.note}
          </p>
        )}
      </Card>

      {/* Payment Info */}
      <Card title="Thông tin thanh toán" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={12}>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {getPaymentMethodLabel(order.payment.method)}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Trạng thái thanh toán:</strong>{" "}
              <Tag color={order.payment.status === "PAID" ? "green" : "orange"}>
                {getPaymentStatusLabel(order.payment.status)}
              </Tag>
            </p>
          </Col>
        </Row>
        {order.payment.transactionId && (
          <p>
            <strong>ID giao dịch:</strong> {order.payment.transactionId}
          </p>
        )}
      </Card>

      {/* Order Summary */}
      <Card title="Tóm tắt đơn hàng">
        <Row justify="end" style={{ maxWidth: 400 }}>
          <Col span={24}>
            <Row justify="space-between" style={{ marginBottom: 12 }}>
              <span>Tổng tiền hàng:</span>
              <span>{order.subtotal.toLocaleString("vi-VN")}₫</span>
            </Row>
            {/* <Row justify="space-between" style={{ marginBottom: 12 }}>
              <span>Chiết khấu:</span>
              <span style={{ color: "red" }}>
                -{order.discountAmount.toLocaleString("vi-VN")}₫
              </span>
            </Row> */}
            <Row justify="space-between" style={{ marginBottom: 12 }}>
              <span>Phí vận chuyển:</span>
              <span>{order.shippingFee.toLocaleString("vi-VN")}₫</span>
            </Row>
            <Divider style={{ margin: "12px 0" }} />
            <Row
              justify="space-between"
              style={{
                fontWeight: "600",
                fontSize: 16,
                color: "#1890ff",
              }}
            >
              <span>Tổng cộng:</span>
              <span>{order.totalAmount.toLocaleString("vi-VN")}₫</span>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default OrderDetail;
