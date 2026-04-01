import React from "react";
import { Modal } from "antd";
import "./notification.modal.scss";
import { useRouter } from "next/navigation";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  redirectUrl?: string;
  actionLabel?: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  onClose,
  message,
  redirectUrl,
  actionLabel,
}) => {
    const router = useRouter();;

  const handleAction = () => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      className="notification-modal"
      width={440}
    >
      <div className="notification-modal__body">
        <div className="notification-modal__icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="15" stroke="#000" strokeWidth="2" />
            <path
              d="M16 10v7"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="16" cy="22" r="1.2" fill="#000" />
          </svg>
        </div>

        <p className="notification-modal__message">{message}</p>

        <div className="notification-modal__footer">
          {redirectUrl && (
            <button
              className="notification-modal__btn notification-modal__btn--action"
              onClick={handleAction}
            >
              {actionLabel || "Xem ngay"}
            </button>
          )}
          <button
            className="notification-modal__btn notification-modal__btn--close"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;