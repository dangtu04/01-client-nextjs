"use client";
import React, { useState } from "react";
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
import { handleUpdateProfileAction } from "@/actions/users.actions";

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

  // lấy địa chỉ
  const getFullAddress = () => {
    if (!userData?.address) return "Chưa cập nhật";
    const { detail, wardName, provinceName } = userData?.address;
    return `${detail || ""}, ${wardName}, ${provinceName}`.trim();
  };

  // hiện modal, set các field 
  const showModal = () => {
    form.setFieldsValue({
      name: userData?.name,
      phone: userData?.phone,
      provinceCode: userData?.address?.provinceCode,
      provinceName: userData?.address?.provinceName,
      wardCode: userData?.address?.wardCode,
      wardName: userData?.address?.wardName,
      detail: userData?.address?.detail,
    });
    setIsModalOpen(true);
  };

  // đóng modal, reset form
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // hàm gửi data cập nhật
  const handleSubmit = async (values: any) => {
    const data = {
      address: {
        provinceCode: values.provinceCode,
        provinceName: values.provinceName,
        wardCode: values.wardCode,
        wardName: values.wardName,
        detail: values.detail,
      },
      name: values.name,
      phone: values.phone,
    };

    const res = await handleUpdateProfileAction(data);

    if (res && res.statusCode === 200) {
      message.success("Cập nhật hồ sơ thành công");
      setIsModalOpen(false);
    } else {
      // console.log("res update profile error:", res);
      message.error("Cập nhật hồ sơ thất bại");
    }
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

            {/* <Descriptions.Item
              label={
                <span>
                  <CalendarOutlined style={{ marginRight: "8px" }} />
                  Ngày tạo tài khoản
                </span>
              }
            >
              {formatDate(userData?.createdAt)}
            </Descriptions.Item> */}

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

      {isModalOpen && (
        <EditProfileModal
          isModalOpen={isModalOpen}
          form={form}
          userData={userData}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}

      {/* Edit Modal */}
    </div>
  );
};

export default Profile;
