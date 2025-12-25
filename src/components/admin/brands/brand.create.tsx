import { Modal, Form, Input, message, notification, Col, Switch } from "antd";
import { useState } from "react";
import { handleCreateBrandAction } from "@/actions/brands.actions";
import { ICreateBrandDTO } from "@/types/models/brand.model";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const BrandCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: ICreateBrandDTO) => {
    setIsSubmitting(true);
    try {
      const res = await handleCreateBrandAction(values);
      console.log(">>> check res create brand: ", res);
      if (res?.data) {
        handleCloseCreateModal();
        message.success("Thêm thương hiệu thành công!");
      } else {
        notification.error({
          message: "Lỗi thêm thương hiệu",
          description: res?.message || "Có lỗi xảy ra",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi hệ thống",
        description: "Không thể kết nối đến máy chủ",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Thêm mới thương hiệu"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseCreateModal}
      maskClosable={false}
      okText="Thêm"
      cancelText="Huỷ"
      confirmLoading={isSubmitting}
      okButtonProps={{ disabled: isSubmitting }}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên thương hiệu!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Col span={24} md={12}>
          <Form.Item label="Active" name="isActive" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
};

export default BrandCreate;
