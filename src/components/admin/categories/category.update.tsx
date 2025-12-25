import { handleUpdateCategoryAction } from "@/actions/categories.actions";
import { IUpdateCategoryDTO, ICategoryParent } from "@/types/models/category.model";
import { Modal, Input, Form, Row, Col, message, notification, Select, Switch, InputNumber } from "antd";
import { useEffect, useState } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: (v: any) => void;
  categories?: ICategoryParent[];
}

const CategoryUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, categories = [] } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        _id: dataUpdate._id,
        name: dataUpdate.name,
        parentId: dataUpdate.parentId ? dataUpdate.parentId._id : undefined,
        order: dataUpdate.order,
        isActive: dataUpdate.isActive,
      });
    }
  }, [dataUpdate, form]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values: any) => {
    setIsSubmitting(true);
    if (!dataUpdate) return;

    const { _id, ...payload } = values;

    const data: IUpdateCategoryDTO = {
      name: payload.name,
      parentId: payload.parentId || null,
      order: payload.order,
      isActive: payload.isActive,
    };

    try {
      const res = await handleUpdateCategoryAction(_id, data);
      if (res?.data) {
        message.success("Cập nhật danh mục thành công");
        handleCloseUpdateModal();
      } else {
        notification.error({
          message: "Lỗi cập nhật danh mục",
          description: res?.message,
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
      title="Cập nhật danh mục"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
      maskClosable={false}
      okText="Cập nhật"
      cancelText="Huỷ"
      confirmLoading={isSubmitting}
      okButtonProps={{ disabled: isSubmitting }}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[15, 15]}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Col span={24}>
            <Form.Item label="Tên danh mục" name="name" rules={[{ required: true, message: "Vui lòng nhập tên" }]}> 
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
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CategoryUpdate;
