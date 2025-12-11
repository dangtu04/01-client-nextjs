"use client";

import { sendRequest } from "@/utils/api";
import { useHasMounted } from "@/utils/customHook";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Steps } from "antd";
import { useEffect, useState } from "react";

type ModalReactivateProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
};

const ModalReactivate = (props: ModalReactivateProps) => {
  const { isModalOpen, setIsModalOpen, email } = props;
  const [current, setCurrent] = useState(0);
  const hasMounted = useHasMounted();
  const [form] = Form.useForm();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    form.setFieldsValue({ email });
  }, [email]);

  if (!hasMounted) return <></>;

  const onFinishStep0 = async (values: any) => {
    const { email } = values;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/reactivate`,
      body: { email },
    });
    if (res?.data) {
      setUserId(res?.data?._id);
      setCurrent(1);
    } else {
      notification.error({
        message: "Error",
        description: res?.message,
      });
    }
  };

  const onFinishStep1 = async (values: any) => {
    const { code } = values;
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-account`,
      body: { _id: userId, code },
    });
    if (res?.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: "Error",
        description: res?.message,
      });
    }
  };

  return (
    <>
      <Modal
        title="Activate account"
        open={isModalOpen}
        onOk={() => setIsModalOpen(true)}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={null}
      >
        <Steps
          current={current}
          items={[
            {
              title: "Login",

              icon: <UserOutlined />,
            },
            {
              title: "Verification",

              icon: <SolutionOutlined />,
            },

            {
              title: "Done",

              icon: <SmileOutlined />,
            },
          ]}
        />

        {current === 0 && (
          <>
            <div style={{ margin: "20px 0" }}>
              Tài khoản của bạn chưa được kích hoạt
            </div>
            <Form
              form={form}
              onFinish={onFinishStep0}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item label="" name="email" initialValue={email}>
                <Input disabled />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Resend
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 1 && (
          <>
            <div style={{ margin: "20px 0" }}>Vui lòng nhập mã xác nhận</div>
            <Form
              form={form}
              onFinish={onFinishStep1}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input your code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Activate
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 2 && (
          <>
            <div style={{ margin: "20px 0" }}>
              Tài khoản đã được kích hoạt thành công, vui lòng đăng nhập lại
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalReactivate;
