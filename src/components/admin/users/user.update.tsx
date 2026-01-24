import { handleUpdateUserAction } from "@/actions/users.actions";
import { IUpdateUserDTO } from "@/types/models/user.model";
import { UserRole } from "@/utils/roles";
import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  notification,
  Select,
  Switch,
} from "antd";
import { useEffect, useState } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: (v: any) => void;
}

const UserUpdate = (props: IProps) => {
  // console.log(">>> check render UserUpdate")
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        _id: dataUpdate._id,
        name: dataUpdate.name,
        email: dataUpdate.email,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
        role: dataUpdate.role,
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

    const data: IUpdateUserDTO = {
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      role: payload.role,
      isActive: payload.isActive,
    };

    try {
      const res = await handleUpdateUserAction(_id, data);
      if (res?.data) {
        message.success("Cập nhật người dùng thành công");
        handleCloseUpdateModal();
      } else {
        notification.error({
          message: "Lỗi cập nhật người dùng",
          description: res?.message,
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
      title="Update a user"
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
          {/* Hidden ID */}
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Col span={24} md={12}>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </Col>

          {/* <Col span={24} md={12}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col> */}

          <Col span={24} md={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select role" }]}
            >
              <Select placeholder="Select role">
                {Object.values(UserRole).map((role) => (
                  <Select.Option key={role} value={role}>
                    {role}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item label="Active" name="isActive" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserUpdate;
