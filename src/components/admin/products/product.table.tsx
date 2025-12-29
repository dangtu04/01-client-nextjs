"use client";

import { IProductTable } from "@/types/models/product.model";
import { Button, Table, Tag, Image, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  DeleteOutlined,
  DeleteTwoTone,
  EditTwoTone,
  PictureOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { handleDeleteProductAction } from "@/actions/products.actions";

const nullImage = "/null-product.png";

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
          src={thumbnail?.secureUrl || nullImage}
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
      // width: 120,
      render: (_, record) => (
        <Space>
          <Link href={`/admin/product/${record._id}/images`}>
            <PictureOutlined
              style={{ cursor: "pointer", margin: "0 20px", fontSize: 16 }}
            />
          </Link>

          <Link href={`/admin/product/${record._id}`}>
            <EditTwoTone
              style={{ cursor: "pointer", margin: "0 20px", fontSize: 16 }}
            />
          </Link>
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa sản phẩm"}
            description={"Bạn có chắc chắn muốn xóa sản phẩm này ?"}
            onConfirm={async () => await handleDeleteProductAction(record?._id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <span style={{ cursor: "pointer", fontSize: 16 }}>
              <DeleteTwoTone twoToneColor="#ff4d4f" />
            </span>
          </Popconfirm>
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
        <span style={{ fontSize: 18, fontWeight: 600 }}>QUẢN LÝ SẢN PHẨM</span>
        <Button type="primary">
          <Link href="/admin/product/create">Thêm mới sản phẩm</Link>
        </Button>
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
