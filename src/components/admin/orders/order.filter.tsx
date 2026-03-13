"use client";

import { useState } from "react";
import { Button, Select, Space, Card, Row, Col } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderStatus, PaymentStatus, PaymentMethod } from "@/types/models/order.model";

const { Option } = Select;

interface IOrderFilterProps {
  onFilter?: (filters: IOrderFilterValues) => void;
}

export interface IOrderFilterValues {
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  sort?: string;
}

// Mapping for labels
const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Chờ xác nhận",
  [OrderStatus.CONFIRMED]: "Đã xác nhận",
  [OrderStatus.PROCESSING]: "Đang xử lý",
  [OrderStatus.SHIPPING]: "Đang giao hàng",
  [OrderStatus.COMPLETED]: "Đã giao hàng",
  [OrderStatus.CANCELLED]: "Đã hủy",
  [OrderStatus.REFUNDED]: "Hoàn tiền",
};

const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  [PaymentStatus.UNPAID]: "Chưa thanh toán",
  [PaymentStatus.PAID]: "Đã thanh toán",
  [PaymentStatus.FAILED]: "Thất bại",
  [PaymentStatus.REFUNDED]: "Hoàn tiền",
};

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.COD]: "Tiền mặt (COD)",
  [PaymentMethod.VNPAY]: "VNPay",
};

// Generate options from enums
const ORDER_STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({
  label,
  value,
}));

const PAYMENT_STATUS_OPTIONS = Object.entries(PAYMENT_STATUS_LABELS).map(([value, label]) => ({
  label,
  value,
}));

const PAYMENT_METHOD_OPTIONS = Object.entries(PAYMENT_METHOD_LABELS).map(([value, label]) => ({
  label,
  value,
}));

const SORT_ORDER_OPTIONS = [
  { label: "Mới nhất", value: "-createdAt" },
  { label: "Cũ nhất", value: "asc" },
];

const OrderFilter = (props: IOrderFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<IOrderFilterValues>({
    status: searchParams.get("status") || undefined,
    paymentStatus: searchParams.get("payment.status") || undefined,
    paymentMethod: searchParams.get("payment.method") || undefined,
    sort: searchParams.get("sort") || "-createdAt",
  });

  const handleChange = (key: keyof IOrderFilterValues, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ap dụng filter và update url
  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    // console.log(">>>>>> check filters: ", filters);

    // reset về trang 1 khi lọc
    params.set("current", "1");

    // set hoặc xóa từng param
    if (filters.status) params.set("status", filters.status);
    else params.delete("status");

    if (filters.paymentStatus) params.set("payment.status", filters.paymentStatus);
    else params.delete("payment.status");

    if (filters.paymentMethod) params.set("payment.method", filters.paymentMethod);
    else params.delete("payment.method");

    if (filters.sort) params.set("sort", filters.sort);
    else params.delete("sort");

    router.push(`?${params.toString()}`);
    props.onFilter?.(filters);
  };

  const handleReset = () => {
    const reset: IOrderFilterValues = {
      status: undefined,
      paymentStatus: undefined,
      paymentMethod: undefined,
      sort: "-createdAt",
    };
    setFilters(reset);

    const params = new URLSearchParams();
    params.set("current", "1");
    params.set("sort", "-createdAt");
    router.push(`?${params.toString()}`);
    props.onFilter?.(reset);
  };

  return (
    <Card
      className="order-filter-card"
      styles={{ body: { padding: "16px 20px" } }}
    >
      <Row gutter={[12, 12]} align="middle">
        {/* Trạng thái đơn hàng */}
        <Col xs={24} sm={12} md={5}>
          <div className="filter-item">
            <label className="filter-label">Trạng thái đơn hàng</label>
            <Select
              allowClear
              placeholder="Tất cả"
              value={filters.status}
              onChange={(val) => handleChange("status", val)}
              style={{ width: "100%" }}
              size="middle"
            >
              {ORDER_STATUS_OPTIONS.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        </Col>

        {/* Trạng thái thanh toán */}
        <Col xs={24} sm={12} md={5}>
          <div className="filter-item">
            <label className="filter-label">Trạng thái thanh toán</label>
            <Select
              allowClear
              placeholder="Tất cả"
              value={filters.paymentStatus}
              onChange={(val) => handleChange("paymentStatus", val)}
              style={{ width: "100%" }}
              size="middle"
            >
              {PAYMENT_STATUS_OPTIONS.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        </Col>

        {/* Phương thức thanh toán */}
        <Col xs={24} sm={12} md={5}>
          <div className="filter-item">
            <label className="filter-label">Phương thức thanh toán</label>
            <Select
              allowClear
              placeholder="Tất cả"
              value={filters.paymentMethod}
              onChange={(val) => handleChange("paymentMethod", val)}
              style={{ width: "100%" }}
              size="middle"
            >
              {PAYMENT_METHOD_OPTIONS.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        </Col>

        {/* Sắp xếp */}
        <Col xs={24} sm={12} md={4}>
          <div className="filter-item">
            <label className="filter-label">Sắp xếp theo</label>
            <Select
              value={filters.sort}
              onChange={(val) => handleChange("sort", val)}
              style={{ width: "100%" }}
              size="middle"
            >
              {SORT_ORDER_OPTIONS.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        </Col>

        {/* Nút hành động */}
        <Col xs={24} sm={24} md={5}>
          <div className="filter-item">
            <label className="filter-label" style={{ opacity: 0, userSelect: "none" }}>
              &nbsp;
            </label>
            <Space>
              <Button
                type="primary"
                icon={<FilterOutlined />}
                onClick={handleFilter}
              >
                Lọc
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
              >
                Đặt lại
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderFilter;