import Notification from "@/components/Notification";
import UIButton from "@/components/ui/UIButton";
import { leaveFeedback } from "@/store/actions";
import { useAppDispatch } from "@/store/hooks";
import { Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

type NotificationType = "success" | "info" | "warning" | "error";
const LeaveFeedbackModal = (props: any) => {
  const { isModalOpen, handleOk, handleCancel, number, topic, engagementId } =
    props;
  const { TextArea } = Input;
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const handleSendFeedback = async () => {
    const formdata = new FormData();
    formdata.append("engagement_id", engagementId);
    formdata.append("feedback", textAreaValue);

    const response = await dispatch(leaveFeedback(formdata));

    if (
      response?.payload?.message?.includes("Feedback updated successfully.")
    ) {
      // setTimeout(() => {
      //         setNotificationProps({
      //           visible: true,
      //           type: "success",
      //           title: "Success",
      //           message: response?.payload?.message,
      //         });

      //       }, 1000);
      toast.success(response?.payload?.message);
      setTextAreaValue("");
      handleCancel();
    } else {
      // setTimeout(() => {
      //   setNotificationProps({
      //     visible: true,
      //     type: "error",
      //     title: "Error",
      //     message: "Something went wrong, please try again.",
      //   });
      //   // setIsModalOpen(false);
      // }, 1000);

      toast.error("Something went wrong, please try again.");
    }
    // console.log("response", response);
  };
  return (
    <div>
      <Modal
        title={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        width={580}
        height={482}
      >
        <div className="font-[700] text-[18px] text-[#] flex justify-center items-center mb-[30px]">
          Leave feedback
        </div>
        <div className="flex flex-row items-center mb-[30px]">
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "1.5px solid #ddd",
              borderColor: "#CBD5E1",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {number}
          </div>

          <div
            style={{
              marginLeft: "10px",
              fontWeight: "700",
              fontSize: "14px",
            }}
          >
            {topic}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center mb-[30px]">
          <div className="font-[600] text-[14px] text-[#1e293b]">
            Please leave your feedback!.
          </div>
          <div className="font-[400] text-[14px] text-[#1e293b]">
            {" "}
            Let us know if the steps provided were helpful, so we can continue
            improving the AI experience
          </div>
        </div>
        <div className="mb-[30px] w-[540px]">
          <TextArea
    
            rows={4}
            style={{
              width: "540px",
              height: "172px",
            }}
            onChange={(e: any) => setTextAreaValue(e.target.value)}
            value={textAreaValue}
            placeholder="Your feedback..."
            // minLength={20}
          />
        </div>
        <div className="flex flex-row justify-end gap-[8px]">
          <UIButton
            background="#fff"
            color="#c847e8"
            text="Cancel"
            borderColor="#c847e8"
            onClick={handleCancel}
          />
          <UIButton
            color="#fff"
            background="#c847e8"
            text="Save"
            borderColor="#c847e8"
            onClick={() => handleSendFeedback()}
          />
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

export default LeaveFeedbackModal;
