import {
  Button,
  Checkbox,
  Input,
  Popover,
  Spin,
  Upload,
  UploadProps,
  message,
} from "antd";
import "./Details.css";
import { GrCloudUpload } from "react-icons/gr";
import profileImage from "../../../assets/ProfileImage.png";
import { TbFileUpload } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import {
  // getDetailsSettingsData,
  updateProfile,
} from "@/store/actions";
import Notification from "@/components/Notification";
import { PiQuestionBold } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { PiCheck } from "react-icons/pi";
import { toast } from "react-toastify";
const Details = () => {
  const dispatch = useAppDispatch();
  const { details } = useAppSelector((store) => store.settings);

  type NotificationType = "success" | "info" | "warning" | "error";

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const {
    bioDescription,
    // profilePicture,
    // notification,
    // contactInformation,
    userRole,
  }: any = details || {};

  const { TextArea } = Input;

  // const onChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   console.log("Change:", e.target.value);
  // };

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: "file",
    multiple: false, // Change to true if you allow multiple uploads
    beforeUpload: (file) => {
      // Store the file in state
      setUploadedFile(file);
      return false; // Prevent automatic upload
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const { profileLoading, profileData } = useAppSelector(
    (store) => store.profile
  );
  const companyName = profileData?.["organization"]?.["name"];

  const { isProcessing } = useAppSelector((store) => store.updateProfile);

  const [reports, setReports] = useState<boolean>(false);
  const [sound, setSound] = useState<boolean>(false);
  const [vibrations, setVibrations] = useState<boolean>(false);
  const [bio, setBio] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (profileData?.["user"]?.["notification_settings"]) {
      const notificationSettings = profileData["user"]["notification_settings"];
      setReports(notificationSettings["reports"] !== "0");
      setSound(notificationSettings["sound"] !== "0");
      setVibrations(notificationSettings["vibrations"] !== "0");
    }
    if (profileData?.["user"]) {
      setBio(profileData?.["user"]?.["bio"]);
    }
  }, [profileData]);

  const onReportClick = () => {
    setReports((prev) => !prev);
  };

  const onSoundClick = () => {
    setSound((prev) => !prev);
  };

  const onVibrationClick = () => {
    setVibrations((prev) => !prev);
  };

  // console.log(details);

  // const getData = () => {
  //   const payload = {};
  //   // dispatch(getDetailsSettingsData(payload));

  // };

  const handelUpdateUserData = () => {
    const payload = new FormData();
    payload.append("bio", bio);
    payload.append("notification_settings[reports]", reports ? "1" : "0");
    payload.append("notification_settings[sound]", sound ? "1" : "0");
    payload.append("notification_settings[vibrations]", vibrations ? "1" : "0");

    if (uploadedFile) {
      payload.append("profile_picture", uploadedFile, uploadedFile.name);
    }

    dispatch(updateProfile(payload))
      .unwrap()
      .then((res) => {
        // setNotificationProps({
        //   visible: true,
        //   type: res.error ? "warning" : "success",
        //   title: res?.status || "Warning",
        //   message: res?.message || "Something went Wrong",
        // });

        if (res.error === "warning") {
          toast.warning(res?.message);
        }
        if (res.error === "success") {
          toast.success(res?.message);
        }

        console.log("This is res", res);
      })
      .catch((err) => {
        // setNotificationProps({
        //   visible: true,
        //   type: "error",
        //   title: "Login Failed",
        //   message: err?.message || "Unable to log in.",
        // });
        toast.error(err?.message || "Unable to log in");
      });
  };

  return (
    <div>
      {profileLoading ? (
        <div className="flex justify-center items-center w-full h-[calc(80vh-100px)] bg-background">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div className="detailsTable">
          <div className="ProfileDetails mb-[16px] flex justify-between gap-[16px]">
            <div className="row1col1">
              <div className="ProfileDetailesTxt text-[#1e293b]">
                Profile Details
              </div>
              <div className="ProfileDetailesTxt2 text-[#475569]">
                You can change your profile details here seamlessly.
              </div>
            </div>

            <div className="flex flex-row gap-[8px]">
              <Button
                className="ExportBtn min-h-[40px]"
                style={{ padding: "10px 24px" }}
              >
                <GrCloudUpload />
                Export Data
              </Button>
              <Button
                className="SaveBtn min-h-[40px]"
                style={{ padding: "10px 24px" }}
              >
                Save
              </Button>
            </div>
          </div>

          <hr />

          <div className="bio">
            <div className="row2col1">
              <div className="BioDescTxt text-[#1e293b]">Bio Description</div>
              <div className="BioDescTxt2 text-[#475569]">
                {/* {profileData?.["user"]?.["bio"]} */}
                This will be your main story. Keep it very,very long
              </div>
            </div>
            <div className=" min-h-[172px]">
              <TextArea
                className="bio-textarea"
                rows={8}
                showCount
                maxLength={300}
                onChange={(e) => setBio(e.target.value)}
                placeholder={bioDescription}
              />
            </div>
          </div>

          <hr
            style={{
              marginTop: "32px",
            }}
          />

          <div className="BioDesc">
            <div className="row2col1">
              <div className="BioDescTxt text-[#1e293b]">Profile Picture</div>
              <div className="BioDescTxt2 text-[#475569]">
                This is where people will see your actual face
              </div>
              <div className="mt-[12px] font-[700] text-[14px] text-[#C847E8] cursor-pointer">
                View Details
              </div>
            </div>
            <div className="p-0 lg-[20px] lg:mt-[10px] mt-[20px] flex flex-col md:flex-row gap-[12px]">
              <img
                src={profileImage} //TODO Change the static profile picture
                alt="Profile Picture"
                style={{
                  borderRadius: "123px",
                  height: "64px",
                  width: "64px",
                }}
              />
              <form className="w-[444px] h-[170px]">
                <Dragger
                  className="block max-w-[450px] md:ml-[5px] ml-0 mt-[10px] md:mt-0 w-full h-full border-[#c847e8] focus:outline-[#c847e8] focus:outline-auto hover:border-[#c847e8]"
                  {...props}
                  style={{
                    height: "170px",
                    backgroundColor: "white",
                    // borderColor: "#c847e8",
                  }}
                >
                  <div className="uploadIconSection mb-[24px]">
                    <TbFileUpload className="Upload-icon" color="#c847e8" />
                  </div>
                  <p
                    className="ant-upload-text"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                  >
                    <div style={{ color: "#C847E8", display: "inline" }}>
                      Click here
                    </div>{" "}
                    drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Supported Format: SVG, JPG, PNG (10mb each)
                  </p>
                </Dragger>
              </form>
            </div>
          </div>

          <hr
            style={{
              marginTop: "32px",
            }}
          />

          <div className="flex flex-row gap-[32px]">
            <div className="w-[260px] h-[68px]">
              <div className="BioDescTxt text-[#1e293b]">Notifications </div>
              <div className="BioDescTxt2 text-[#475569]">
                This is where you’ll receive notifications
              </div>
            </div>
            <div className="row4col2">
              <Checkbox
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  font: "Inter",
                }}
                checked={reports}
                onClick={onReportClick}
              >
                Reports
              </Checkbox>
              <br />
              <p
                className="BioDescTxt2"
                style={{ marginBottom: "14px", fontSize: "14px" }}
              >
                Enable reports notifications
              </p>
              <Checkbox
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  font: "Inter",
                }}
                checked={sound}
                onClick={onSoundClick}
              >
                Sound
              </Checkbox>
              <br />
              <p
                className="BioDescTxt2"
                style={{ marginBottom: "14px", fontSize: "14px" }}
              >
                Enable sound notifications
              </p>
              <Checkbox
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  font: "Inter",
                }}
                checked={vibrations}
                onChange={onVibrationClick}
              >
                Vibrations
              </Checkbox>
              <br />
              <p
                className="BioDescTxt2"
                style={{ marginBottom: "14px", fontSize: "14px" }}
              >
                Enable vibrations effect
              </p>
            </div>
          </div>
          <hr
            style={{
              marginTop: "32px",
            }}
          />

          <div className="ContactInfoRow">
            <div className="row2col1">
              <div className="BioDescTxt flex flex-row items-center text-[#1e293b]">
                Contract Information{" "}
                <Popover content={<div>Contract Information</div>}>
                  <PiQuestionBold size={20} color="#94a3b8" />
                </Popover>
              </div>
              <div className="BioDescTxt2 text-[#475569]">
                Details of your contract and access level.
              </div>
            </div>
            <div className="row5col2">
              <div className="Contact-info">
                <div className="col-span-2">
                  <p className="flex flex-row">
                    <strong style={{ fontWeight: 600, marginRight: "20px" }}>
                      Company Name
                    </strong>{" "}
                    <div className="font-[400] text-[14px] text-[#475569]">
                      {companyName}
                    </div>
                    {/* {companyName} */}
                  </p>
                </div>

                <div className="flex flex-row gap-[20px]">
                  <div className="flex flex-col w-[260px] h-[74px] justify-center">
                    <p className="sub-heading">Contact ID</p>
                    <p className="BioDescTxt2">123456</p>
                  </div>

                  <div className="flex flex-col w-[260px] h-[74px] justify-center">
                    <p className="sub-heading">Contact Status</p>
                    <p
                      className="text-[14px] font-[400] text-[#5FC43B]"
                      style={{
                        color: "#5FC43B",
                      }}
                    >
                      Active
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-[20px]">
                  <div className="flex flex-col w-[260px] h-[74px] justify-center">
                    <p className="sub-heading">Contract Start Date</p>
                    <p className="BioDescTxt2">
                      {/* {contactInformation?.contactStartDate} */}
                      January 1, 2023
                    </p>
                  </div>

                  <div className="flex flex-col w-[260px] h-[74px] justify-center">
                    <p className="sub-heading">Contract End Date</p>
                    <p className="BioDescTxt2">
                      {/* {contactInformation?.contactEndDate} */}
                      December 31, 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr
            style={{
              marginTop: "32px",
            }}
          />

          <div
            className="UserRole"
            // style={{
            //   marginBottom: "-80px",
            // }}
          >
            <div className="h-[46px] w-[260px]">
              <div className="BioDescTxt flex flex-row items-center text-[#1e293b]">
                User Role
                <Popover content={<div>Contract Information</div>}>
                  <PiQuestionBold size={20} color="#94a3b8" />
                </Popover>
              </div>
              <div className="BioDescTxt2 text-[#475569]">
                Your access level within the platform.
              </div>
            </div>
            <div className="mb-[24px]">
              <p
                className="ReadOnlyTxt"
                style={{
                  color: "#C847E8",
                }}
              >
                {userRole === "Admin" ? (
                  <div>Read and Write Access</div>
                ) : (
                  <div> Read Only Access</div>
                )}
              </p>
            </div>
          </div>

          <div className="Buttons">
            <Button
              className="BtnSaveBtn"
              onClick={handelUpdateUserData}
              loading={isProcessing}
              style={{ padding: "10px 24px" }}
            >
              Save Settings <PiCheck size={18} />
            </Button>

            <Button className="BtnCancelBtn" style={{ padding: "10px 24px" }}>
              Cancel
              <RxCross1 size={18} />
            </Button>
          </div>
        </div>
      )}

      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </div>
  );
};

export default Details;
