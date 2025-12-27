"use client";

import {
  IBrand,
  ICategory,
  IProductDetail,
  ISize,
} from "@/types/models/product.model";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Image,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import { handleUpdateProductAction } from "@/actions/products.actions";
import ProductVariant from "./product.variant";

interface IProps {
  product: IProductDetail;
  listCategoriesForSelect: ICategory[];
  listBrandsForSelect: IBrand[];
  listSizesForSelect: ISize[];
}

const { TextArea } = Input;

const ProductDetail = (props: IProps) => {
  const { product, listCategoriesForSelect, listBrandsForSelect, listSizesForSelect } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        _id: product._id,
        name: product.name,
        price: product.price,
        brandId: product.brandId,
        categoryIds: product.categoryIds,
        material: product.material,
        description: product.description,
      });

      // Set ảnh thumbnail hiện có
      if (product.thumbnail?.secureUrl) {
        setFileList([
          {
            uid: "-1",
            name: "thumbnail.jpg",
            status: "done",
            url: product.thumbnail.secureUrl,
            thumbUrl: product.thumbnail.secureUrl,
          },
        ]);
      }
    }
  }, [product, form]);

  const handleUploadChange = ({ fileList: newFileList }: any) => {
    // Chỉ giữ file mới nhất
    const latestFile = newFileList[newFileList.length - 1];

    if (latestFile) {
      // Tạo preview URL cho ảnh mới
      if (latestFile.originFileObj) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFileList([
            {
              ...latestFile,
              url: e.target?.result as string,
              thumbUrl: e.target?.result as string,
            },
          ]);
        };
        reader.readAsDataURL(latestFile.originFileObj);
      } else {
        setFileList([latestFile]);
      }
    }
  };

  const beforeUpload = (file: File) => {
    // Validate file type
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      alert("Bạn chỉ có thể upload file ảnh!");
      return false;
    }

    // Validate file size (e.g., < 5MB)
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      alert("Ảnh phải nhỏ hơn 5MB!");
      return false;
    }

    return false; // Prevent auto upload
  };

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

      const res = await handleUpdateProductAction(product._id, formData);
      console.log(">>>> check res: ", res);
      if (res?.statusCode === 200) {
        message.success("Cập nhật sản phẩm thành công");
        form.resetFields();
        setFileList([]);
      } else {
        message.error(res?.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "24px" }}>Cập nhật sản phẩm</h2>

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        {/* Phần Form - 60% */}
        <div style={{ flex: "0 0 60%", minWidth: 0 }}>
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
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
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input placeholder="Áo thun nam basic" />
              </Form.Item>

              <Form.Item label="Ảnh sản phẩm">
                {fileList.length > 0 ? (
                  <div
                    style={{ display: "flex", gap: 16, alignItems: "start" }}
                  >
                    <Image
                      width={200}
                      height={200}
                      src={fileList[0].url || fileList[0].thumbUrl}
                      alt="Product thumbnail"
                      style={{ objectFit: "cover", borderRadius: 8 }}
                      preview={{
                        mask: "Xem ảnh lớn",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <Upload
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleUploadChange}
                        accept="image/*"
                      >
                        <Button icon={<UploadOutlined />}>Thay đổi ảnh</Button>
                      </Upload>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setFileList([])}
                      >
                        Xóa ảnh
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleUploadChange}
                    beforeUpload={beforeUpload}
                    maxCount={1}
                    accept="image/*"
                  >
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                    </div>
                  </Upload>
                )}
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
                rules={[
                  { required: true, message: "Vui lòng chọn thương hiệu" },
                ]}
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
                  Cập nhật sản phẩm
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <hr />
        {/* Phần ProductVariant - 40% */}
        <div style={{ flex: "0 0 40%", minWidth: 0 }}>
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              height: "100%",
            }}
          >
            <ProductVariant listSizesForSelect={listSizesForSelect} productId={product._id} variants={product.variants} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
