"use client";

import { Button, Popconfirm, Table } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import BrandCreate from "./brand.create";
import BrandUpdate from "./brand.update";
import { IBrandTable } from "@/types/models/brand.model";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { handleDeleteBrandAction } from "@/actions/brands.actions";
interface IProps {
  brands: IBrandTable[];
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
}

const BrandTable = (props: IProps) => {
  const { brands, meta } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);

  const handlePaginationChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("current", page.toString());
    params.set("pageSize", pageSize.toString());
    router.push(`?${params.toString()}`);
  };

  const columns = [
    {
      title: "STT",
      render: (_: any, __: IBrandTable, index: number) => {
        const current = meta?.current ?? 1;
        const pageSize = meta?.pageSize ?? 10;
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Hành động",
      render: (text: any, record: any) => {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", margin: "0 20px" }}
              onClick={() => {
                setIsUpdateModalOpen(true);
                setDataUpdate(record);
              }}
            />
             <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa thương hiệu"}
              description={"Bạn có chắc chắn muốn xóa thương hiệu này ?"}
              onConfirm={async () => await handleDeleteBrandAction(record?._id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
     <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>QUẢN LÝ THƯƠNG HIỆU</span>
        <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
          Thêm mới thương hiệu
        </Button>
      </div>
      <Table
        rowKey={"_id"}
        bordered
        dataSource={brands}
        columns={columns}
        pagination={{
          current: meta?.current,
          pageSize: meta?.pageSize,
          total: meta?.totals,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: handlePaginationChange,
        }}
      />
      <BrandCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <BrandUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default BrandTable;