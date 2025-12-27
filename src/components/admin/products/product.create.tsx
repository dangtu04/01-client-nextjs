"use client";

import { Button, Form, Input, InputNumber, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IBrand, ICategory } from "@/types/models/product.model";
import { handleCreateProductAction } from "@/actions/products.actions";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

interface IProps {
  listCategoriesForSelect: ICategory[];
  listBrandsForSelect: IBrand[];
}

const { TextArea } = Input;

const ProductCreate = (props: IProps) => {
  const { listCategoriesForSelect, listBrandsForSelect } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("brandId", values.brandId);
      
      // Đảm bảo categoryIds luôn là array
      const categoryIds = Array.isArray(values.categoryIds) 
        ? values.categoryIds 
        : [values.categoryIds];
      
      // Gửi từng categoryId với key có dạng array: categoryIds[]
      categoryIds.forEach((id: string) => {
        formData.append("categoryIds[]", id);
      });

      if (values.description) {
        formData.append("description", values.description);
      }
      if (values.material) {
        formData.append("material", values.material);
      }

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("thumbnail", fileList[0].originFileObj);
      }

      const res = await handleCreateProductAction(formData);

      if (res?.statusCode === 201) {
        message.success("Tạo sản phẩm thành công");
        form.resetFields();
        setFileList([]);
      } else {
        message.error(res?.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList.slice(-1));
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ được upload file ảnh!");
      return Upload.LIST_IGNORE;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Ảnh phải nhỏ hơn 5MB!");
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Thêm sản phẩm</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          price: 0,
        }}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input placeholder="Áo thun nam basic" />
        </Form.Item>

        <Form.Item label="Ảnh sản phẩm">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={beforeUpload}
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            addonAfter="VNĐ"
          />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categoryIds"
          rules={[{ required: true, message: "Chọn ít nhất 1 danh mục" }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn danh mục"
            options={listCategoriesForSelect.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Thương hiệu"
          name="brandId"
          rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
        >
          <Select
            placeholder="Chọn thương hiệu"
            options={listBrandsForSelect.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
          />
        </Form.Item>

        <Form.Item label="Chất liệu" name="material">
          <Input placeholder="Cotton, Jean, ..." />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} placeholder="Mô tả sản phẩm..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductCreate;