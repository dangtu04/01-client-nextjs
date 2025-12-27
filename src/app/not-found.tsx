"use client";

import { Button, Result, ConfigProvider } from "antd";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
      }}
    >
      <Result
        status="404"
        title={
          <span style={{ fontSize: "72px", fontWeight: "bold" }}>404</span>
        }
        subTitle={
          <div style={{ fontSize: "18px" }}>
            Rất tiếc, trang bạn đang truy cập không tồn tại hoặc đã bị di dời.
          </div>
        }
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/")}
            style={{ borderRadius: "8px", height: "45px", padding: "0 30px" }}
          >
            Về trang chủ
          </Button>
        }
      />
    </div>
  );
}
