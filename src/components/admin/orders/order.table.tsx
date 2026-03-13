"use client";

import { useState } from "react";
import { IOrder, OrderStatus } from "@/types/models/order.model";
import { Table, Button, Tag, Space, Select, message } from "antd";
import type { TableColumnsType } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { handleChangeOrderStatusAction } from "@/actions/orders.actions";
import "./order.filter.scss";
interface IOrderTableProps {
  orders?: IOrder[];
  loading?: boolean;
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
}

const STATUS_COLORS: Record<string, string> = {
  [OrderStatus.PENDING]: "orange",
  [OrderStatus.CONFIRMED]: "blue",
  [OrderStatus.PROCESSING]: "cyan",
  [OrderStatus.SHIPPING]: "purple",
  [OrderStatus.COMPLETED]: "green",
  [OrderStatus.CANCELLED]: "red",
  [OrderStatus.REFUNDED]: "default",
};

const OrderTable = (props: IOrderTableProps) => {
  const { orders = [], loading = false, meta } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isUpdating, setIsUpdating] = useState(false);

  const handlePaginationChange = (page: number, pageSize: number) => {
    // tạo URLSearchParams mới từ searchParams hiện tại
    const params = new URLSearchParams(searchParams.toString());

    // update current và pageSize
    params.set("current", page.toString());
    params.set("pageSize", pageSize.toString());

    // navigate với params mới
    router.push(`?${params.toString()}`);
  };

  // cập nhật trạng thái đơn hàng
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const result = await handleChangeOrderStatusAction(orderId, newStatus);

      if (result?.success) {
        message.success("Cập nhật trạng thái thành công");
        router.refresh();
      } else {
        message.error(result?.message || "Cập nhật trạng thái thất bại");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật trạng thái");
    } finally {
      setIsUpdating(false);
    }
  };
  // console.log(">>>>>> check orders: ", orders);
  const columns: TableColumnsType<IOrder> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      width: 180,
      render: (text: string) => (
        <span style={{ fontSize: "12px", fontWeight: "500" }}>{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
      width: 180,
    },
    {
      title: "Số điện thoại",
      dataIndex: ["delivery", "receiverPhone"],
      key: "receiverPhone",
      width: 120,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 120,
      render: (amount: number) => (
        <span style={{ fontWeight: "600", color: "#1890ff" }}>
          {amount.toLocaleString("vi-VN")}₫
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: string, record: IOrder) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
          loading={isUpdating}
          style={{ width: "100%" }}
          className={`order-status-${status.toLowerCase()}`}
          options={[
            { label: "Đang chờ", value: OrderStatus.PENDING },
            { label: "Đã xác nhận", value: OrderStatus.CONFIRMED },
            { label: "Đang xử lý", value: OrderStatus.PROCESSING },
            { label: "Đang giao", value: OrderStatus.SHIPPING },
            { label: "Hoàn thành", value: OrderStatus.COMPLETED },
            { label: "Đã huỷ", value: OrderStatus.CANCELLED },
            { label: "Hoàn tiền", value: OrderStatus.REFUNDED },
          ]}
        />
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      render: (_: any, record: IOrder) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              router.push(`/admin/order/${record._id}`);
            }}
          >
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<IOrder>
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: meta?.current,
          pageSize: meta?.pageSize,
          total: meta?.totals,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: handlePaginationChange,
        }}
        scroll={{ x: 1200 }}
      />
    </>
  );
};

export default OrderTable;
