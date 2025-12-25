"use client";

import { ICategoryParent, ICategoryTable } from "@/types/models/category.model";
import { Button, Popconfirm, Table } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CategoryCreate from "./category.create";
import { handleDeleteCategoryAction } from "@/actions/categories.actions";
import CategoryUpdate from "./category.update";

interface IProps {
  categories: ICategoryTable[];
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
  listCategoriesForSelect?: ICategoryParent[];
}

const CategoryTable = (props: IProps) => {
  const { categories, meta, listCategoriesForSelect } = props;
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
      render: (_: any, __: ICategoryTable, index: number) => {
        const current = meta?.current ?? 1;
        const pageSize = meta?.pageSize ?? 10;
        return (current - 1) * pageSize + index + 1;
      },
    },
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Danh mục cha",
      render: (_: any, record: ICategoryTable) =>
        record.parentId ? record.parentId.name : "-",
    },
    { title: "Cấp bậc", dataIndex: "level", key: "level" },
    { title: "Thứ tự", dataIndex: "order", key: "order" },
    {
      title: "Hiển thị",
      dataIndex: "isActive",
      key: "isActive",
      render: (val: boolean) => (val ? "Active" : "Inactive"),
    },
    {
      title: "Hành động",
      render: (text: any, record: any) => (
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
            title={"Xác nhận xóa danh mục"}
            description={"Bạn có chắc chắn muốn xóa danh mục này ?"}
            onConfirm={async () =>
              await handleDeleteCategoryAction(record?._id)
            }
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <span style={{ cursor: "pointer" }}>
              <DeleteTwoTone twoToneColor="#ff4d4f" />
            </span>
          </Popconfirm>
        </>
      ),
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
        <span>QUẢN LÝ DANH MỤC</span>
        <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
          Thêm mới danh mục
        </Button>
      </div>

      <Table
        rowKey={"_id"}
        bordered
        dataSource={categories}
        columns={columns}
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

      <CategoryCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        categories={listCategoriesForSelect}
      />

      <CategoryUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        categories={listCategoriesForSelect}
      />
    </>
  );
};

export default CategoryTable;
