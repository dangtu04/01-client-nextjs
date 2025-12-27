"use client";

import { IProductVariant, ISize } from "@/types/models/product.model";
import {
  Button,
  Form,
  InputNumber,
  Select,
  Space,
  message,
  Divider,
} from "antd";
import { useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { handleUpdateProductVariantsAction } from "@/actions/products.actions";

interface IProps {
  listSizesForSelect: ISize[];
  variants: IProductVariant[];
  productId: string;
}

interface VariantFormItem {
  sizeId: string;
  quantity: number;
}

const ProductVariant = (props: IProps) => {
  const { listSizesForSelect, variants, productId } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Khởi tạo giá trị ban đầu từ variants có sẵn
  const initialVariants: VariantFormItem[] =
    variants.length > 0
      ? variants.map((v) => ({
          sizeId: v.sizeId,
          quantity: v.quantity || 0,
        }))
      : [];

  // Lấy danh sách size đã được chọn
  const getSelectedSizes = () => {
    const variants = form.getFieldValue("variants") || [];
    return variants.map((v: VariantFormItem) => v?.sizeId).filter(Boolean);
  };

  // Lọc options cho mỗi select, loại bỏ size đã chọn ở các variant khác
  const getAvailableSizes = (currentIndex: number) => {
    const selectedSizes = getSelectedSizes();
    const currentSizeId = form.getFieldValue([
      "variants",
      currentIndex,
      "sizeId",
    ]);

    return listSizesForSelect
      .filter(
        (size) =>
          !selectedSizes.includes(size._id) || size._id === currentSizeId
      )
      .map((size) => ({
        label: size.name,
        value: size._id,
      }));
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const variantsData = values.variants.filter(
        (item: VariantFormItem) => item && item.sizeId
      );
      // console.log(">>> variantsData: ", variantsData);

      if (variantsData.length === 0) {
        message.warning("Vui lòng thêm ít nhất 1 biến thể");
        return;
      }

      // TODO: Gọi API update variants
      const res = await handleUpdateProductVariantsAction(
        productId,
        variantsData
      );
      if (res?.statusCode === 200) {
        message.success("Cập nhật biến thể thành công");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật biến thể");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>Quản lý biến thể sản phẩm</h3>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>
        Thêm size và số lượng tồn kho cho từng biến thể
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          variants:
            initialVariants.length > 0
              ? initialVariants
              : [{ sizeId: undefined, quantity: 0 }],
        }}
      >
        <Form.List name="variants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div
                  key={key}
                  style={{
                    marginBottom: "16px",
                    padding: "16px",
                    background: "#fafafa",
                    borderRadius: "8px",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <Space
                    align="start"
                    style={{ display: "flex", width: "100%" }}
                  >
                    <div style={{ flex: 1 }}>
                      <Form.Item
                        {...restField}
                        name={[name, "sizeId"]}
                        label="Size"
                        rules={[{ required: true, message: "Chọn size" }]}
                        style={{ marginBottom: "12px" }}
                      >
                        <Select
                          placeholder="Chọn size"
                          style={{ width: "100%" }}
                          options={getAvailableSizes(index)}
                          onChange={() => form.validateFields()}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "quantity"]}
                        label="Số lượng"
                        rules={[
                          { required: true, message: "Nhập số lượng" },
                          {
                            type: "number",
                            min: 0,
                            message: "Số lượng phải >= 0",
                          },
                        ]}
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber
                          placeholder="0"
                          min={0}
                          style={{ width: "100%" }}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                        />
                      </Form.Item>
                    </div>

                    {fields.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        style={{ marginTop: "30px" }}
                      />
                    )}
                  </Space>
                </div>
              ))}

              {fields.length < 10 && (
                <Button
                  type="dashed"
                  onClick={() => add({ sizeId: undefined, quantity: 0 })}
                  block
                  icon={<PlusOutlined />}
                  style={{ marginBottom: "16px" }}
                >
                  Thêm biến thể
                </Button>
              )}
            </>
          )}
        </Form.List>

        <Divider style={{ margin: "16px 0" }} />

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Cập nhật biến thể
          </Button>
        </Form.Item>
      </Form>

      {/* Hiển thị tổng số lượng */}
      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          background: "#e6f7ff",
          borderRadius: "8px",
          border: "1px solid #91d5ff",
        }}
      >
        <div style={{ fontSize: "14px", color: "#666" }}>
          Tổng số biến thể:{" "}
          <strong>{form.getFieldValue("variants")?.length || 0}</strong>
        </div>
      </div>
    </div>
  );
};

export default ProductVariant;
