import { handleCreateUserAction } from "@/actions/users.actions";
import { ICreateUserDTO } from "@/types/models/user.model";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";
import { useState } from "react";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const UserCreate = (props: IProps) => {
  // console.log(">>> check render UserCreate")

  const [form] = Form.useForm();
  const { isCreateModalOpen, setIsCreateModalOpen } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: ICreateUserDTO) => {
    setIsSubmitting(true); // bắt đầu loading
    try {
      const res = await handleCreateUserAction(values);
      if (res?.data) {
        handleCloseCreateModal();
        message.success("Thêm người dùng thành công!");
      } else {
        notification.error({
          message: "Lỗi thêm người dùng",
          description: res?.message || "Có lỗi xảy ra",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi hệ thống",
        description: "Không thể kết nối đến máy chủ",
      });
    } finally {
      setIsSubmitting(false); // kết thúc loading
    }
  };

  return (
    <Modal
      title="Thêm mới người dùng"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
      okText="Thêm"
      cancelText="Huỷ"
      confirmLoading={isSubmitting}
      okButtonProps={{ disabled: isSubmitting }}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Form.Item
              label="Tên người dùng"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                {
                  type: "email",
                  message: "Email không đúng định dạng!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserCreate;
