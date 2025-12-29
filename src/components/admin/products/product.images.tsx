"use client";

import { IProductImage } from "@/types/models/product.model";
import { Button, Form, Image, message, Upload, UploadFile } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  handleBulkAddImagesAction,
  handleBulkUpdateImagesAction,
} from "@/actions/products.actions";

interface IProps {
  images?: IProductImage[];
  productId: string;
}

const ProductImages = ({ images, productId }: IProps) => {
  // list ảnh ban đầu từ server
  const [listImages, setListImages] = useState<IProductImage[]>([]);
  
  // list ảnh được giữ lại sau khi user xóa
  const [listImagesToKeep, setListImagesToKeep] = useState<IProductImage[]>([]);
  
  // list file mới được chọn để upload
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

 
  useEffect(() => {
    setListImages(images ?? []);
    setListImagesToKeep(images ?? []);
  }, [images]);

  
  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

 
  // validate file: ảnh, < 5MB
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

    // chặn upload tự động
    return false;
  };

  // xoá ảnh trên giao diện, chỉ xoá ở server xoá khi nhấn submit
  const handleDelete = (publicId: string) => {
    setListImagesToKeep(prev => 
      prev.filter(item => item.publicId !== publicId)
    );
  };

  /**
   * xử lý submit form
   * - nếu chưa có ảnh nào: call api thêm mới (POST)
   * - nếu đã có ảnh: call api cập nhật (PATCH) với danh sách publicId giữ lại
   */
  const onFinish = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      // phân biệt giữa ADD và UPDATE
      const isAddingNewImages = !listImages || listImages.length === 0;

      if (isAddingNewImages) {
        // sản phẩm chưa có ảnh -> ADD
        const res = await handleBulkAddImagesAction(productId, formData);
        
        if (res?.statusCode === 201) {
          message.success("Thêm ảnh thành công");
          setFileList([]);
          form.resetFields();
        } else {
          message.error(res?.message || "Có lỗi xảy ra");
        }
      } else {
        // sản phẩm đã có ảnh -> UPDATE
        // gửi danh sách publicId của các ảnh cần giữ lại
        const publicIdsToKeep = listImagesToKeep.map(item => item.publicId);
        publicIdsToKeep.forEach(id => {
          formData.append("publicIdsToKeep", id);
        });

        const res = await handleBulkUpdateImagesAction(productId, formData);
        
        if (res?.statusCode === 200) {
          message.success("Cập nhật ảnh thành công");
          setFileList([]);
          form.resetFields();
        } else {
          message.error(res?.message || "Có lỗi xảy ra");
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi xử lý ảnh");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* PreviewGroup để xem ảnh full size */}
      <Image.PreviewGroup>
        {listImagesToKeep.map((img) => (
          <div
            key={img.publicId}
            style={{
              position: "relative",
              width: 200,
              display: "inline-block",
              marginInline: 5,
              marginBottom: 10,
            }}
          >
            <Image width={200} src={img.secureUrl} alt="Product" />

            {/* nút xóa overlay trên ảnh */}
            <Button
              icon={<DeleteOutlined style={{ color: "#fff", fontSize: "20px" }} />}
              onClick={() => handleDelete(img.publicId)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 10,
                backgroundColor: "#ff5449",
                border: "none",
              }}
              aria-label="Xóa ảnh"
            />
          </div>
        ))}
      </Image.PreviewGroup>

      {/* Form upload ảnh mới */}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Ảnh sản phẩm">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={beforeUpload}
            maxCount={10}
            multiple
            accept="image/*"
          >
            <Button 
              type="primary" 
              icon={<UploadOutlined />} 
              loading={loading}
            >
              Chọn ảnh
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            disabled={fileList.length === 0 && listImagesToKeep.length === listImages.length}
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductImages;