import { Modal, Spin } from "antd";
import { useState } from "react";
import StepOneAddUser from "./StepOneAddUser";
// import UIButton from "@/components/ui/UIButton";
import StepTwoPermission from "./StepTwoPermission";

const NewUserModal = (props: any) => {
  const { isModalOpen, handleOk, handleCancel, setNotificationProps } = props;
  const [step, setStep] = useState(1); // Step state
  const [email, setEmail] = useState<any>();
  const [bulkUploadLoading, setBulkUploadLoading] = useState(false);
  // const totalSteps = 3; // Total steps in the process

  // const nextStep = () => {
  //     if (step <= totalSteps) setStep(step + 1);
  //     if(step === totalSteps) handleOk();
  // };

  const formData = new FormData();

  return (
    <Modal
      title={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <Spin spinning={bulkUploadLoading}>
      <div className="text-[18px] font-[700] text-[#1e293b] flex justify-center">
        Add New User
      </div>

      {/* Progress Indicator with 3 separate segments */}
      <div className="mt-4 flex justify-between items-center w-full">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-[6px] flex-1 rounded-full transition-all duration-300 ${
              index <= step ? "bg-purple-500" : "bg-gray-300"
            }`}
            style={{ marginRight: index !== 3 ? "8px" : "0px" }} // Adds gap between segments
          />
        ))}
      </div>

      {/* <StepOneAddUser /> */}
      {/* step one screen */}
      {step === 1 && (
        <StepOneAddUser
          setStep={setStep}
          formData={formData}
          handleCancel={handleCancel}
          email={email}
          setEmail={setEmail}
          handleOk={handleOk}
          setBulkUploadLoading={setBulkUploadLoading}
        />
      )}

      {/* step two screen */}
      {step === 2 && (
        <StepTwoPermission
          setStep={setStep}
          formData={formData}
          handleCancel={handleCancel}
          email={email}
          setNotificationProps={setNotificationProps}
          handleOk={handleOk}
          setEmail={setEmail}
        />
      )}

      {/* Next Step Button */}
      <div className="mt-4 flex justify-center gap-[8px]">
        {/* <button
                    onClick={nextStep}
                    disabled={step === totalSteps+1}
                    className={`px-4 py-2 text-white rounded-md bg-blue-500`}
                >
                    Next
                </button> */}
      </div>
      </Spin>
    </Modal>
  );
};

export default NewUserModal;
