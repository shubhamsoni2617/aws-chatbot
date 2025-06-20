import { notification } from "antd";
import React from "react";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationProps = {
  type: NotificationType;
  title: string;
  message: string;
  visible: boolean;
  onClose: () => void;
};

const Notification = ({ type, title, message, visible, onClose }: NotificationProps) => {
  const [api, contextHolder] = notification.useNotification();

  React.useEffect(() => {
    if (visible) {
      api[type]({
        message: title,
        description: message,
        showProgress: true,
        onClose,
        duration: 2,
      });
    }
  }, [visible, api, type, title, message, onClose]);

  return <>{contextHolder}</>;
};

export default Notification;
