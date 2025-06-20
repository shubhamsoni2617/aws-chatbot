import React from "react";
import { RxCross2 } from "react-icons/rx";

interface CustomCloseButtonProps {
  closeToast?: () => void;
  type?: string;
}

const CustomCloseButtonNotification: React.FC<CustomCloseButtonProps> = ({ closeToast, type }) => {
  const getColor = () => {
    switch (type) {
      case "success":
        return "#28A745";
      case "error":
        return "#DC3545";
      case "info":
        return "indigo";
      case "warning":
        return "orange";
      default:
        return "#333";
    }
  };

  return (
    <div className="flex flex-row justify-center ml-[16px]" onClick={closeToast}>
      <RxCross2 size={24} color={getColor()} style={{
        height: '24px',
        width:'24px',
        // padding: 6,
      }}/>
    </div>
  );
};

export default CustomCloseButtonNotification;
