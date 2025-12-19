"use client";
import { IUserTable } from "@/types/models/user.model";
import { Button, Table } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { title } from "process";
import { useState } from "react";

interface IProps {
  users: IUserTable[];
  meta?: {
    current: number;
    pageSize: number;
    pages: number;
    totals: number;
  };
}

const UserTable = (props: IProps) => {
  const { users, meta } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  //   console.log(">>> check router: ", router);
  //   console.log(">>> check searchParams: ", searchParams.toString());

  const handlePaginationChange = (page: number, pageSize: number) => {
    // Tạo URLSearchParams mới từ searchParams hiện tại
    const params = new URLSearchParams(searchParams.toString());

    // Cập nhật current và pageSize
    params.set("current", page.toString());
    params.set("pageSize", pageSize.toString());

    // Navigate với params mới
    router.push(`?${params.toString()}`);
  };

  const columns = [
    {
      title: "STT",
      render: (_: any, __: IUserTable, index: number) => {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hành động",
    
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
        <span>Manager Users</span>
        <Button>Create User</Button>
      </div>
      <Table
        rowKey={"_id"}
        bordered
        dataSource={users}
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
    </>
  );
};

export default UserTable;
