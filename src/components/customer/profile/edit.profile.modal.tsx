import React from 'react';
import { Modal, Form, Input, Select, Space, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';

interface EditProfileModalProps {
  isModalOpen: boolean;
  form: FormInstance;
  userData: any;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isModalOpen,
  form,
  userData,
  onCancel,
  onSubmit
}) => {
  return (
    <Modal
      title={<span style={{ color: '#333', fontSize: '18px', fontWeight: 600 }}>Chỉnh sửa hồ sơ</span>}
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
      width={600}
      style={{ top: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        style={{ marginTop: '24px' }}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập họ tên' },
            { min: 2, message: 'Tên phải có ít nhất 2 ký tự' }
          ]}
        >
          <Input 
            placeholder="Nhập họ và tên"
            style={{ borderRadius: '6px' }}
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { pattern: /^(0|\+84)[0-9]{9,10}$/, message: 'Số điện thoại không hợp lệ' }
          ]}
        >
          <Input 
            placeholder="Nhập số điện thoại"
            style={{ borderRadius: '6px' }}
          />
        </Form.Item>

        <div style={{ 
          background: '#fafafa',
          padding: '16px',
          borderRadius: '6px',
          marginBottom: '24px'
        }}>
          <h4 style={{ 
            margin: '0 0 16px 0',
            color: '#333',
            fontSize: '14px',
            fontWeight: 600
          }}>
            Địa chỉ
          </h4>

          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Form.Item
                name="provinceCode"
                style={{ margin: 0 }}
              >
                <Input type="hidden" />
              </Form.Item>
              
              <Form.Item
                label="Tỉnh/Thành phố"
                name="provinceName"
                style={{ margin: 0 }}
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
              >
                <Select 
                  placeholder="Chọn tỉnh/thành phố"
                  style={{ borderRadius: '6px' }}
                
                >
                  <Select.Option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</Select.Option>
                  <Select.Option value="Thành phố Hà Nội">Thành phố Hà Nội</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="wardCode"
                style={{ margin: 0 }}
              >
                <Input type="hidden" />
              </Form.Item>

              <Form.Item
                label="Phường/Xã"
                name="wardName"
                style={{ margin: 0 }}
                rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}
              >
                <Select 
                  placeholder="Chọn phường/xã"
                  style={{ borderRadius: '6px' }}
                >
                  <Select.Option value="Phường Bến Nghé">Phường Bến Nghé</Select.Option>
                  <Select.Option value="Phường Bến Thành">Phường Bến Thành</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Số nhà, tên đường"
              name="detaill"
              style={{ margin: 0 }}
            >
              <Input 
                placeholder="Ví dụ: 123 Nguyễn Huệ"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>
          </Space>
        </div>

        <Form.Item style={{ margin: 0 }}>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onCancel} style={{ borderRadius: '6px' }}>
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              style={{
                background: '#333',
                borderColor: '#333',
                borderRadius: '6px'
              }}
            >
              Lưu thay đổi
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
