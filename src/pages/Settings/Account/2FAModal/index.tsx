import Notification from "@/components/Notification";
import UIButton from "@/components/ui/UIButton";
import { change2FA } from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button, Input, Modal } from "antd";
import { useCallback, useState } from "react";

type Props = {
  isModalOpen: boolean;
  onClose: any;
  gettingData: any;
  is2FAEnabled: any;
};
const TwoFAModal = (props: Props) => {
  const { isModalOpen, onClose, gettingData, is2FAEnabled } = props;
  const [currentPassword, setCurrentPassword] = useState("");
  type NotificationType = "success" | "info" | "warning" | "error";

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const dispatch = useAppDispatch();
  const { isLoading2FA } = useAppSelector((store) => store.changeTwoFA);

  const handleCancel = () => {
    onClose();
  };

  const debouncedSetNotificationProps = useCallback(() => {
    let timeoutId: NodeJS.Timeout;

    return (newProps: {
      visible: boolean;
      type: NotificationType;
      title: string;
      message: string;
    }) => {
      // Clear the previous timeout if it exists
      clearTimeout(timeoutId);

      // Set a new timeout
      timeoutId = setTimeout(() => {
        setNotificationProps(newProps);
      }, 1000); // 1000ms debounce delay
    };
  }, []);

  const handel2FAChange = () => {
    const payload = new FormData();
    payload.append("password", currentPassword);
    payload.append("status", is2FAEnabled ? "disable" : "enable");

    dispatch(change2FA(payload))
      .unwrap()
      .then((res) => {
        // Call the debounced function
        debouncedSetNotificationProps()({
          visible: true,
          type: res?.error ? "warning" : "success",
          title: res?.status || "Success",
          message: res?.message || "",
        });

        if (!res?.error) {
          gettingData();
          onClose();
        }
        setCurrentPassword("");
      });
  };

  return (
    <div>
      <Modal
        title={
          <div style={{ justifyContent: "center", display: "flex" }}>
            Change 2FA
          </div>
        }
        open={isModalOpen}
        footer={null}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        // onClose={onClose()}
        closable={false}
      >
        <div
          style={{
            fontWeight: 400,
            fontSize: "14px",
            color: "#1e293b",
            marginTop: "16px",
            marginBottom: "32px",
          }}
        >
          Enter your password below and confirm to change 2FA.
        </div>
        <Input.Password
          placeholder="Current Password"
          style={{ marginBottom: "16px" }}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <div className="w-auto">
            <UIButton
              text="Cancel"
              background="#fff"
              color="#c847e8"
              borderColor="#c847e8"
              onClick={handleCancel}
            />
          </div>
          <div style={{ marginLeft: "10px" }} />
          <Button
            loading={isLoading2FA}
            style={{
              borderRadius: "40px",
              backgroundColor: "#c847e8",
              color: "#fff",
              fontWeight: "400",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "24px",
              paddingRight: "24px",
              minHeight: "40px",
            }}
            onClick={handel2FAChange} // Trigger the function on Confirm click
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </div>
  );
};

export default TwoFAModal;
