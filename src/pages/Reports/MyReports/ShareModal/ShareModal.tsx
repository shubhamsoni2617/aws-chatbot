import { Button, Modal, Avatar, Spin, Select } from "antd";
// import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./ShareModal.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { shareReport } from "@/store/actions";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

const { Option } = Select;

interface AssignToCustomLabelProps {
  email: string;
  name: string;
}

const AssignToCustomLabel: React.FC<AssignToCustomLabelProps> = ({
  email,
  name,
}) => {
  return (
    <div className="flex flex-row gap-[8px] flex-wrap w-full items-center">
      <div className="truncate max-w-[40%]">{name}</div>
      <Avatar className="h-[21px] w-[21px] rounded-full bg-[#f4d9fa] text-[#c847e8]">
        {name[0]}
      </Avatar>
      <div className="truncate max-w-[50%]">{email}</div>
    </div>
  );
};

const accessOptions = [
  { label: "Restricted", key: "1" },
  { label: "View Only", key: "2" },
  { label: "Editor", key: "3" },
];

interface ShareModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  reportId: any;
}

type NotificationType = "success" | "info" | "warning" | "error";

const ShareModal: React.FC<ShareModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  reportId,
}) => {
  // const { profileData } = useAppSelector((store) => store.profile);
  const { organizationUsersData, isOrganizationUsersLoading } = useAppSelector(
    (store) => store?.userData
  );
  const dispatch = useAppDispatch();

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedAccess, setSelectedAccess] = useState<any>(accessOptions[0]);

  // useEffect(() => {
  //   dispatch(
  //     getUsers({ organization_id: profileData?.["organization"]?.["id"] })
  //   );
  // }, []);

  const handleShareReport = async () => {
    if (!selectedUser) {
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Error",
      //   message: "Please select a user to share with",
      // });
      toast.error("Please select a user to share with");
      return;
    }

    const sharedWithName = selectedUser?.name;
    const sharedWithEmail = selectedUser?.email;
    const restrictedAccess = selectedAccess?.label === "Restricted" ? "1" : "0";

    // console.log(
    //   "sharedWithName",
    //   sharedWithName,
    //   "sharedWithEmail",
    //   sharedWithEmail,
    //   "restrictedAccess",
    //   restrictedAccess
    // );

    const formdata = new FormData();
    formdata.append("report_id", reportId);
    formdata.append("shared_with_email", sharedWithEmail);
    formdata.append("shared_with_name", sharedWithName);
    formdata.append("is_restricted_access", restrictedAccess);

    const response = await dispatch(shareReport(formdata));
    console.log(response);

    if (response?.payload?.message?.includes("Report shared successfully.")) {
      // setNotificationProps({
      //   visible: true,
      //   type: "success",
      //   title: "Success",
      //   message: response?.payload?.data?.message,
      // });

      toast.success(response?.payload?.message);
      setSelectedUser(null);
    } else {
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Error",
      //   message: "Something went wrong. Please try again later.",
      // });

      toast.error("Something went wrong. Please try again later.");
    }

    // setTimeout(() => {
      handleOk();
    // }, 1000);
  };

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  return (
    <Modal
      title=""
      open={isModalOpen}
      onCancel={handleCancel}
      footer={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            style={{
              color: "#C847E8",
              borderRadius: "20px",
              borderColor: "#C847E8",
              padding: "10px 24px",
            }}
            onClick={handleCancel}
          >
            Copy Link
          </Button>
          <Button
            type="primary"
            style={{
              color: "#fff",
              backgroundColor: "#C847E8",
              borderRadius: "20px",
              padding: "10px 24px",
            }}
            onClick={() => handleShareReport()}
          >
            Done
          </Button>
        </div>
      }
    >
      <Spin spinning={isOrganizationUsersLoading}>
        <div className="ShareModalTitle">
          Access: Sales Comparison by Country
        </div>

        <div className="ShareModalSubTitle">
          Add the users you want to share with.
        </div>

        <Select
          style={{ width: "100%" }}
          placeholder="Share With"
          onChange={(option,_) => {
            console.log("value and options", option,_);
            setSelectedUser(_);
          }}
          optionLabelProp="label"
          showSearch
          optionFilterProp="label"
          value={selectedUser}
        >
          {Array.isArray(organizationUsersData) &&
            organizationUsersData.map((item: any, i: number) => {
              const label = (
                <AssignToCustomLabel
                  email={item?.email}
                  name={`${item?.first_name} ${item?.last_name}`}
                />
              );

              const optionValue = item.email; // use email or ID here

              return (
                <Option
                  key={`dynamic-${i}`}
                  value={optionValue}
                  label={`${item?.first_name} ${item?.last_name} ${item?.email}`}
                  name={`${item?.first_name} ${item?.last_name}`}
                  email={item?.email}
                >
                  {label}
                </Option>
              );
            })}
        </Select>

        <div style={{ marginTop: "10px", fontSize: "16px", fontWeight: "500" }}>
          General Access
        </div>

        <Select
          style={{ width: "100%" }}
          placeholder="General Access"
          value={selectedAccess}
          onChange={(value) => setSelectedAccess(value)}
          labelInValue
        >
          {accessOptions.map((option) => (
            <Option key={option.key} value={option.key} label={option.label}>
              {option.label}
            </Option>
          ))}
        </Select>

        <div className="shareInformationText">
          Only users with access can open the content via this link.
        </div>
      </Spin>
      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </Modal>
  );
};

export default ShareModal;
