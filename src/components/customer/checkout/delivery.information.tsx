"use client";

import { IProfileUser } from "@/types/models/user.model";
import { Input, Button, Radio, Select, Form } from "antd";
import { FormInstance } from "antd/lib/form";
import { useEffect, useState } from "react";
const { Option } = Select;

interface DeliveryInformationProps {
  form: FormInstance;
  userData?: IProfileUser;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  handleSubmit: (values: any) => void;
}

interface ISelectProvince {
  name?: string;
  code?: number;
}

const DeliveryInformation = ({
  form,
  userData,
  paymentMethod,
  setPaymentMethod,
  handleSubmit,
}: DeliveryInformationProps) => {
  console.log("userData in DeliveryInformation:", userData);

  const [listProvinces, setListProvinces] = useState<ISelectProvince[]>([]);
  const [listWards, setListWards] = useState<ISelectProvince[]>([]);
  const [loadingWards, setLoadingWards] = useState(false);

  // call api list province
  useEffect(() => {
    const getProvinces = async () => {
      const res = await fetch("/api/provinces");
      setListProvinces(await res.json());
    };
    getProvinces();
  }, []);

  // load list ward khi modal mở & user đã có địa chỉ
  // không sài state selectedProvince làm dependency
  useEffect(() => {
    // if (!isModalOpen) return;

    const provinceCode = userData?.address?.provinceCode;

    // load wards
    if (provinceCode) {
      const getWards = async () => {
        setLoadingWards(true);
        try {
          const res = await fetch(`/api/wards/${provinceCode}`);
          setListWards(await res.json());
        } catch (error) {
          console.error("Error fetching wards:", error);
        } finally {
          setLoadingWards(false);
        }
      };
      getWards();
    } else {
      // chưa có đia chỉ thì clear wards
      setListWards([]);
    }
  }, [userData?.address?.provinceCode]);

  // handle đổi province
  const handleProvinceChange = async (value: string, option: any) => {
    // lưu code tỉnh
    form.setFieldValue("provinceCode", option.code);

    // reset wards
    form.setFieldValue("wardName", undefined);
    form.setFieldValue("wardCode", undefined);

    // load list ward mới
    if (option.code) {
      setLoadingWards(true);
      try {
        const res = await fetch(`/api/wards/${option.code}`);
        setListWards(await res.json());
      } catch (error) {
        console.error("Error fetching wards:", error);
        setListWards([]);
      } finally {
        setLoadingWards(false);
      }
    } else {
      setListWards([]);
    }
  };

  return (
    <div className="checkout-left">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="checkout-form"
      >
        <div className="form-section">
          <div className="section-header">
            <h2>Thông tin nhận hàng</h2>
          </div>

          <Form.Item
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input placeholder="Họ và tên" size="large" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input
              placeholder="Số điện thoại (tùy chọn)"
              size="large"
              addonBefore={
                <Select defaultValue="+84" style={{ width: 70 }}>
                  <Option value="+84">🇻🇳</Option>
                </Select>
              }
            />
          </Form.Item>

          <Form.Item name="provinceCode" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Tỉnh/Thành phố"
            name="provinceName"
            rules={[
              { required: true, message: "Vui lòng chọn tỉnh/thành phố" },
            ]}
          >
            <Select
              placeholder="Chọn tỉnh/thành phố"
              style={{ borderRadius: "6px" }}
              showSearch
              optionFilterProp="label"
              onChange={handleProvinceChange}
              options={listProvinces.map((province) => ({
                label: province.name,
                value: province.name,
                code: province.code,
              }))}
            />
          </Form.Item>

          <Form.Item name="wardCode" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Phường/Xã"
            name="wardName"
            style={{ margin: 0, marginBottom: 16 }}
            rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}
          >
            <Select
              placeholder="Chọn phường/xã"
              style={{ borderRadius: "6px" }}
              loading={loadingWards}
              disabled={listWards.length === 0}
              showSearch
              optionFilterProp="label"
              options={listWards.map((ward) => ({
                label: ward.name,
                value: ward.name,
                code: ward.code,
              }))}
              onChange={(value, option: any) => {
                form.setFieldValue("wardCode", option.code);
              }}
            />
          </Form.Item>
          <Form.Item
            name="detail"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input placeholder="Địa chỉ (tùy chọn)" size="large" />
          </Form.Item>

          <Form.Item name="notes">
            <Input.TextArea
              placeholder="Ghi chú (tùy chọn)"
              rows={3}
              size="large"
            />
          </Form.Item>
        </div>

        <div className="form-section">
          <h2 className="section-title">Thanh toán</h2>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="payment-methods"
          >
            <div className="payment-option">
              <Radio value="bank_transfer">
                <span className="payment-label">Chuyển khoản</span>
              </Radio>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300a8e8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='5' width='20' height='14' rx='2'/%3E%3Cline x1='2' y1='10' x2='22' y2='10'/%3E%3C/svg%3E"
                alt="bank"
                className="payment-icon"
              />
            </div>
            <div className="payment-option">
              <Radio value="cod">
                <span className="payment-label">Thu hộ (COD)</span>
              </Radio>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300a8e8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' y1='1' x2='12' y2='23'/%3E%3Cpath d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/%3E%3C/svg%3E"
                alt="cash"
                className="payment-icon"
              />
            </div>
          </Radio.Group>
        </div>
      </Form>
      <div className="checkout-actions">
        <Button
          type="primary"
          size="large"
          className="checkout-btn"
          onClick={() => form.submit()}
        >
          ĐẶT HÀNG
        </Button>
      </div>
    </div>
  );
};

export default DeliveryInformation;
