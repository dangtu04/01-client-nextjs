import { Modal, Form, Input, message, notification, Switch } from "antd";
import { useEffect, useState } from "react";
import { handleUpdateBrandAction } from "@/actions/brands.actions";
import { IUpdateBrandDTO } from "@/types/models/brand.model";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: (v: any) => void;
}

const BrandUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        _id: dataUpdate._id,
        name: dataUpdate.name,
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

    const data: IUpdateBrandDTO = {
      name: payload.name,
      isActive: payload.isActive,
    };

    try {
      const res = await handleUpdateBrandAction(_id, data);
      if (res?.data) {
        message.success("Cập nhật thương hiệu thành công");
        handleCloseUpdateModal();
      } else {
        notification.error({
          message: "Lỗi cập nhật thương hiệu",
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
      title="Cập nhật thương hiệu"
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
        <Form.Item name="_id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên thương hiệu!" },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Col span={24} md={12}> */}
        <Form.Item label="Active" name="isActive" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
        {/* </Col> */}
      </Form>
    </Modal>
  );
};

export default BrandUpdate;
