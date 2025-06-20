import { Button, Dropdown, MenuProps, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCurrentQuarterNumericString } from "@/utils/helper/CurrentQuarterGraphHelper";
import { getFormattedDate } from "@/utils/helper/dateCoversionHelper";
import {
  getOverviewKeyReportComment,
  postOverviewKeyReportComment,
} from "@/store/actions";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";
import ExcelIcon from "../../../../../assets/ExportButton/XSL.svg";
import PdfIcon from "../../../../../assets/ExportButton/PDF.svg";

const items: MenuProps["items"] = [
  {
    label: (
      <div className="flex flex-row justify-between">
        <div>Export to Excel</div>
        <img src={ExcelIcon} alt="excel" width={20} height={24} />
      </div>
    ),
    key: "1",
    // icon: <UserOutlined />,
  },
  {
    label: (
      <div className="flex flex-row justify-between">
        <div>Export to PDF</div>
        <img src={PdfIcon} alt="excel" width={20} height={24} />
      </div>
    ),
    key: "2",
    // icon: <UserOutlined />,
  },
];

const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log("Menu item clicked:", e);
};

const menuProps = {
  items,
  onClick: handleMenuClick,
};

type NotificationType = "success" | "info" | "warning" | "error";
const OverView = (props: any) => {
  const { overView, kpi, matricsName, setIsLoading } = props;
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const { profileData } = useAppSelector((store) => store.profile);
  const dispatch = useAppDispatch();

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const today = new Date();
  const formattedDate = getFormattedDate(today);

  const handleAddNote = async () => {
    console.log("check the data of add note", getCurrentQuarterNumericString());
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("org_id", String(profileData?.["organization"]?.["id"]));
    formdata.append("user_name", String(profileData?.["user"]?.["name"]));
    formdata.append("user_email", String(profileData?.["user"]?.["email"]));
    formdata.append("quarter", getCurrentQuarterNumericString());
    formdata.append("date", formattedDate);
    formdata.append("comment", textAreaValue);
    formdata.append("matrics_name", matricsName);
    formdata.append("kpi", kpi);

    const response = await dispatch(postOverviewKeyReportComment(formdata));

    console.log("🚀 ~ response:", response);
    if (response?.payload?.message?.includes("Comment saved successfully.")) {
      // setTimeout(() => {
      //   setNotificationProps({
      //     visible: true,
      //     type: "success",
      //     title: "Success",
      //     message: response?.payload?.message,
      //   });

      //   // setIsModalOpen(false);
      //   // dispatch(getKeyReportComment({org_id: profileData?.["organization"]?.["id"]}));
      // }, 1000);
      toast.success(response?.payload?.message);
      setTextAreaValue("");
      dispatch(
        getOverviewKeyReportComment({
          org_id: String(profileData?.["organization"]?.["id"]),
          kpi: kpi,
        })
      );
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
    setIsLoading(false);
  };
  return (
    <div>
      <div style={{ marginTop: "60px" }}>
        <div
          // className="[font-family:'Plus_Jakarta_Sans',sans-serif] font-[700px]"
          className="font-[700px]"
          style={{
            fontWeight: 700,
            fontSize: "18px",
            marginBottom: "20px",
          }}
        >
          Overview
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#475569",
            lineHeight: "16px",
          }}
        >
          {overView}
        </div>
      </div>

      <div className="Add-Note">
        <TextArea
          showCount
          maxLength={100}
          onChange={(e: any) => setTextAreaValue(e.target.value)}
          value={textAreaValue}
          placeholder="Add Note"
          style={{
            minHeight: "172px",
            width: "100%",
            marginTop: "30px",
            marginBottom: "40px",
            resize: "vertical",
          }}
          autoSize={true}
        />
      </div>

      <div
        className="ButtonSection gap-[16px]"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Button
          className="SaveReport min-h-[40px]"
          // onClick={showModal}
          style={{
            backgroundColor: "#C847E8",
            color: "#fff",
            borderRadius: "40px",
            // marginRight: "5px",
            padding: "10px 24px",
          }}
          onClick={() => handleAddNote()}
        >
          Add Note
        </Button>
        <Dropdown menu={menuProps}>
          <Button
            className="ExportReportBtn min-h-[40px]"
            style={{
              borderRadius: "40px",
              borderColor: "#c847E8",
              color: "#c847E8",
              // marginLeft: "5px",
              padding: "10px 24px",
            }}
          >
            <Space>
              Export Report
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </div>
  );
};

export default OverView;
