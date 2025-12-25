"use client";

import { IProductTable } from "@/types/models/product.model";
import { Button, Table, Tag, Image, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";

interface IProps {
  products: IProductTable[];
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
}

const ProductTable = (props: IProps) => {
  const { products, meta } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  // ===== Pagination handler =====
  const handlePaginationChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("current", page.toString());
    params.set("pageSize", pageSize.toString());
    router.push(`?${params.toString()}`);
  };

  // ===== Columns =====
  const columns: ColumnsType<IProductTable> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 220,
      ellipsis: true,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 100,
      render: (thumbnail) => (
        <Image
          src={thumbnail?.secureUrl}
          alt="thumbnail"
          width={60}
          height={60}
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "categoryIds",
      key: "categoryIds",
      render: (categories) => (
        <>
          {categories?.map((cat: any) => (
            <Tag key={cat._id} color="blue">
              {cat.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Thương hiệu",
      dataIndex: "brandId",
      key: "brandId",
      render: (brand) => brand?.name,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const color =
          status === "active"
            ? "green"
            : status === "inactive"
            ? "red"
            : "orange";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600 }}>
          QUẢN LÝ SẢN PHẨM
        </span>
        <Button type="primary">Thêm mới sản phẩm</Button>
      </div>

      {/* Table */}
      <Table<IProductTable>
        rowKey="_id"
        columns={columns}
        dataSource={products}
        rowSelection={{
          type: "checkbox",
        }}
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
      />
    </>
  );
};

export default ProductTable;
