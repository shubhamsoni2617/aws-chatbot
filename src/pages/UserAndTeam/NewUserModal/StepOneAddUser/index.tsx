// import UIButton from "@/components/ui/UIButton";
import { getUsers } from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axiosInstance from "@/utils/axiosInstance";
import { Button, Input, message, Upload, UploadProps } from "antd";
// import Dragger from "antd/es/upload/Dragger";
import { BsCloudUpload } from "react-icons/bs";
import { toast } from "react-toastify";
// import { useState } from "react";
// import { BsCloudUpload } from "react-icons/bs";

const StepOneAddUser = (props: any) => {
  const {
    setStep,
    formData,
    handleCancel,
    email,
    setEmail,
    handleOk,
    setBulkUploadLoading,
  } = props;

  const { orgIDRedux } = useAppSelector((store) => store.profile);
  const { Dragger } = Upload;
  const dispatch = useAppDispatch();

  // Custom upload function using axios
  const customUpload = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    
    const formData = new FormData();
    formData.append("file", file);

    // Set loading to true at the start
    setBulkUploadLoading(true);

    try {
      const response = await axiosInstance.post(
        `/users/bulk-invite/upload?org_id=${orgIDRedux}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress({ percent });
            }
          },
        }
      );

      onSuccess(response.data, file);
      // message.success(`${file.name} file uploaded successfully.`);
      toast.success(`${file.name} file uploaded successfully.`)
      handleOk();
      dispatch(getUsers({ organization_id: orgIDRedux }));
    } catch (error: any) {
      console.error("Upload error:", error);
      onError(error);
      // message.error(`${file.name} file upload failed.`);
      toast.error(`${file.name} file uploaded successfully.`)
    } finally {
      // Set loading to false after success or error
      setBulkUploadLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".csv",
    customRequest: customUpload,
    beforeUpload(file) {
      const isCsv =
        file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv");
      if (!isCsv) {
        message.error("You can only upload CSV files!");
        return false;
      }
      return true;
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      // Note: success and error messages are now handled in customUpload function
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleNextClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      message.error("Please enter an email.");
      return;
    }

    if (!emailRegex.test(email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    formData.append("email", email);
    setStep(2);
  };

  const handleCancelClick = () => {
    handleCancel();
    setEmail(null);
    setStep(1);
  };

  return (
    <div>
      <div className="font-[600] text-[14px] mt-[4px] mb-[24px] text-[#1e293b]">
        Email
      </div>
      <div className="flex justify-center font-[600] text-[14px] text-[#1e293b]">
        Add User to Your Account
      </div>
      <div className="flex text-center text-[14px] font-[400] text-[#1e293b]">
        Quickly invite a single user by entering their email address or add
        multiple users at once by uploading a CSV file with their details.
      </div>
      <Input
        className="mt-[24px]"
        placeholder="Enter Email"
        onChange={(e: any) => setEmail(e.target.value)}
        value={email}
      />
      <div className="mt-[24px]">
        <Dragger {...uploadProps} style={{ background: "#fff" }}>
          <p className="ant-upload-drag-icon">
            <div className="flex justify-center">
              <div className="bg-[#eef2ff] w-[48px] h-[48px] flex justify-center rounded-full">
                <BsCloudUpload
                  size={22}
                  enableBackground="#fff"
                  className="mt-auto mb-auto"
                />
              </div>
            </div>
          </p>
          <p className="flex justify-center">
            <div className="text-[#c847e8] text-[16px] font-[700] mr-[4px]">
              Click here
            </div>
            <div className="text-[16px] font-[600] text-[#475569]">
              to upload your file or drag
            </div>
          </p>
          <p className="ant-upload-hint font-[500] text-[14px]">
            Supported Format: CSV
          </p>
        </Dragger>
      </div>

      <div className="w-full flex justify-center items-center mt-[24px] gap-[16px]">
        <Button
          type="default"
          className="w-[94px] h-[37px] rounded-full border border-[#c847e8] text-[#c847e8] px-[24px] py-[10px] hover:text-[#c847e8] hover:border-[#c847e8]"
          onClick={() => handleCancelClick()}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          className="w-[80px] h-[37px] rounded-full border border-[#c847e8] bg-[#c847e8] text-white px-[24px] py-[10px] hover:bg-[#c847e8] hover:border-[#c847e8] hover:text-white"
          onClick={() => handleNextClick()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepOneAddUser;
