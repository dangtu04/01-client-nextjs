"use client";
import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button, Avatar, Form, message } from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import EditProfileModal from "./edit.profile.modal";
import { IProfileUser } from "@/types/models/user.model";

interface IProps {
  userData?: IProfileUser;
}

const Profile = ({ userData }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getFullAddress = () => {
    if (!userData?.address) return "Chưa cập nhật";
    const { detaill, wardName, provinceName } = userData?.address;
    return `${detaill || ""}, ${wardName}, ${provinceName}`.trim();
  };

  const showModal = () => {
    form.setFieldsValue({
      name: userData?.name,
      phone: userData?.phone,
      provinceCode: userData?.address?.provinceCode,
      provinceName: userData?.address?.provinceName,
      wardCode: userData?.address?.wardCode,
      wardName: userData?.address?.wardName,
      detaill: userData?.address?.detaill,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    message.success("Cập nhật hồ sơ thành công");
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Header Card */}
        <Card
          bordered={false}
          style={{
            marginBottom: "24px",
            borderRadius: "8px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <Avatar
              size={80}
              icon={<UserOutlined />}
              style={{
                background: "#333",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: "200px" }}>
              <h2
                style={{
                  margin: "0 0 8px 0",
                  color: "#333",
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                {userData?.name}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                <MailOutlined style={{ marginRight: "8px" }} />
                {userData?.email}
              </p>
            </div>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={showModal}
              style={{
                background: "#333",
                borderColor: "#333",
                height: "40px",
                padding: "0 24px",
                borderRadius: "6px",
              }}
            >
              Chỉnh sửa hồ sơ
            </Button>
          </div>
        </Card>

        {/* Info Card */}
        <Card
          title={
            <span style={{ color: "#333", fontSize: "18px", fontWeight: 600 }}>
              Thông tin cá nhân
            </span>
          }
          bordered={false}
          style={{
            borderRadius: "8px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          <Descriptions
            column={{ xs: 1, sm: 1, md: 2 }}
            labelStyle={{ color: "#666", fontWeight: 500 }}
          >
            <Descriptions.Item
              label={
                <span>
                  <UserOutlined style={{ marginRight: "8px" }} />
                  Họ và tên
                </span>
              }
            >
              {userData?.name}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <MailOutlined style={{ marginRight: "8px" }} />
                  Email
                </span>
              }
            >
              {userData?.email}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <PhoneOutlined style={{ marginRight: "8px" }} />
                  Số điện thoại
                </span>
              }
            >
              {userData?.phone || "Chưa cập nhật"}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <CalendarOutlined style={{ marginRight: "8px" }} />
                  Ngày tạo tài khoản
                </span>
              }
            >
              {formatDate(userData?.createdAt)}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <HomeOutlined style={{ marginRight: "8px" }} />
                  Địa chỉ
                </span>
              }
              span={2}
            >
              {getFullAddress()}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      {/* Edit Modal */}
      <EditProfileModal
        isModalOpen={isModalOpen}
        form={form}
        userData={userData}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Profile;
