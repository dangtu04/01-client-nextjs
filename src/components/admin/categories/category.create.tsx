import { handleCreateCategoryAction } from "@/actions/categories.actions";
import { ICreateCategoryDTO, ICategoryParent } from "@/types/models/category.model";
import { Modal, Input, Form, Row, Col, message, notification, Select, Switch, InputNumber } from "antd";
import { useState } from "react";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
  categories?: ICategoryParent[];
}

const CategoryCreate = (props: IProps) => {
  const [form] = Form.useForm();
  const { isCreateModalOpen, setIsCreateModalOpen, categories = [] } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: ICreateCategoryDTO) => {
    setIsSubmitting(true);
    try {
      const res = await handleCreateCategoryAction(values);
      if (res?.data) {
        handleCloseCreateModal();
        message.success("Thêm danh mục thành công!");
      } else {
        notification.error({
          message: "Lỗi thêm danh mục",
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
      title="Thêm mới danh mục"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
      okText="Thêm"
      cancelText="Huỷ"
      confirmLoading={isSubmitting}
      okButtonProps={{ disabled: isSubmitting }}
    >
      <Form name="create-category" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Danh mục cha" name="parentId">
              <Select allowClear placeholder="Chọn danh mục cha (nếu có)">
                {categories.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Thứ tự" name="order">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Hiển thị" name="isActive" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CategoryCreate;
