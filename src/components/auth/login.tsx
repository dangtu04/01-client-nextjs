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
const Login = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { email, password } = values;
    const res = await authenticate(email, password);
    if (res?.error) {
      if (res?.errCode === 1) {
        notification.error({
          message: "Đăng nhập không thành công",
          description: "Email/mật khẩu không hợp lệ!",
        });
      } else if (res?.errCode === 2) {
        notification.error({
          message: "Đăng nhập không thành công",
          description: "Tài khoản chưa được kích hoạt!",
        });
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
                  <Button type="link">Quên mật khẩu?</Button>
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
              Chưa có tài khoản?{" "}
              <Link href={"/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </>
  );
};

export default Login;
