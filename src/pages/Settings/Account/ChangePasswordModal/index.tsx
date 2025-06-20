import Notification from "@/components/Notification";
// import UIButton from "@/components/ui/UIButton";
import { changePassword } from "@/store/actions"; // Import changePassword action
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Custom hooks to use dispatch and selector
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type Props = {
  isModalOpen: boolean;
  onClose: any;
};

const ResetPassswordModal = (props: Props) => {
  type NotificationType = "success" | "info" | "warning" | "error";

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const { isModalOpen, onClose } = props;

  const dispatch = useAppDispatch();
  const { isLoadingChangePassword } = useAppSelector(
    (store) => store.changePassword
  );

  // State for input values
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation schema
  const validationSchema = Yup.object().shape({
    current_password: Yup.string().matches(
      /^.*(?=.{7,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 7 characters, one uppercase letter, and one number"
    ),
    new_password: Yup.string()
      .matches(
        /^.*(?=.{7,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 7 characters, one uppercase letter, and one number"
      )
      .required("New password is required"),
    confirm_password: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("new_password")], "Passwords don't match"),
  });

  const handleChangePassword = async () => {
    // Validate input fields
    try {
      await validationSchema.validate({
        // current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      const payload = new FormData();
      payload.append("current_password", currentPassword);
      payload.append("new_password", newPassword);
      payload.append("new_password_confirmation", confirmPassword);

      dispatch(changePassword(payload))
        .unwrap() // Unwrap the promise to handle resolved or rejected cases
        .then((res) => {
          // setNotificationProps({
          //   visible: true,
          //   type: res?.error ? "warning" : "success",
          //   title: res?.status,
          //   message: res?.message,
          // });

          if(res?.error === "warning"){
            toast.warning(res?.message);
          }

          if(res?.error === "success"){
            toast.success(res?.message);
          }

          
          if (!res?.error) {
            setConfirmPassword(""); // Clear confirm password
            setCurrentPassword(""); // Clear current password
            setNewPassword(""); // Clear new password
            onClose(); // Close the modal on success
          }
        });
    } catch (error: any) {
      // Display validation errors
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Validation Error",
      //   message: error.message,
      // });
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        title={
          <div style={{ justifyContent: "center", display: "flex" }}>
            Reset Your Password
          </div>
        }
        open={isModalOpen}
        footer={null}
        closable={false}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
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
          Enter your new password below and confirm the change using 2FA.
        </div>
        <Input.Password
          placeholder="Current Password"
          style={{ marginBottom: "16px" }}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input.Password
          placeholder="New Password"
          style={{ marginBottom: "16px" }}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input.Password
          placeholder="New Password Confirmation"
          style={{ marginBottom: "16px" }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "end", gap:'10px' }}>
          
          <Button
            loading={isLoadingChangePassword}
            style={{
              borderRadius: "40px",
              backgroundColor: "#fff",
              color: "#c847e8",
              fontWeight: "400",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "24px",
              paddingRight: "24px",
              borderColor: '#c847e8',
              height:'37px'
            }}
            onClick={handleCancel} // Trigger the function on Confirm click
          >
            Cancel
          </Button>

          <Button
            loading={isLoadingChangePassword}
            style={{
              borderRadius: "40px",
              backgroundColor: "#c847e8",
              color: "#fff",
              fontWeight: "400",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "24px",
              paddingRight: "24px",
              height:'37px'
            }}
            onClick={handleChangePassword} // Trigger the function on Confirm click
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

export default ResetPassswordModal;
