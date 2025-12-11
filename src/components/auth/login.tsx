"use client";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/navigation";
import ModalReactivate from "./modal.reactivate";
import { useState } from "react";
import ModalChangePassword from "./modal.change.password";
const Login = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const onFinish = async (values: any) => {
    const { email, password } = values;
    const res = await authenticate(email, password);
    console.log(">>> check res: ", res);
    if (res?.error) {
      if (res?.errCode === 1) {
        notification.error({
          message: "Đăng nhập không thành công",
          description: res?.error,
        });
      } else if (res?.errCode === 2) {
        // notification.error({
        //   message: "Đăng nhập không thành công",
        //   description: "Tài khoản chưa được kích hoạt!",
        // });
        setUserEmail(email);
        setIsModalOpen(true);
        return;
      }
    } else {
      message.success("Đăng nhập thành công!");
      router.push("/");
    }
  };

  return (
    <>
      {" "}
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <legend>Đăng Nhập</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button type="link" onClick={() => setChangePassword(true)}>
                    Quên mật khẩu?
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <Link href={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Chưa có tài khoản? <Link href={"/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
      <ModalReactivate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        email={userEmail}
      />
      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />
    </>
  );
};

export default Login;
