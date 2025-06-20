import { Tabs, TabsProps } from "antd";
import "../Reports-2.css";
// import "./Reports-2.css";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "@/components/DefaultLayout";
import CreateReport from "../KeyReport/CreateReport";
import MyReportsTable from "./MyReportsTable";
import { useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import TableOptions from "./TableOptions";
// import { deleteReport, getReportsData } from "@/store/actions";
import Notification from "@/components/Notification";
import FilterContainer from "@/components/FilterContainer";
import { deleteReport, getReportsData } from "@/store/actions";
import { toast } from "react-toastify";
// import KeyReport from "./KeyReport";
// import MyReports from "./MyReport";

type NotificationType = "success" | "info" | "warning" | "error";
type DeleteResponse = {
  payload: {
    status: number;
    data: {
      message: string;
    };
  };
};
const MyReports = () => {
  const { reportsCount, starReportCount } = useAppSelector(
    (store) => store.reportsData
  ) as any;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [reportsLength, setReportsLength] = useState(0);
  const [selectedReports, setSelectedReports] = useState<any>([]);
  // const [starReportsLength, setStarReportsLength] = useState(0);
  type LabelProps = {
    label: string;
    number: string;
  };
  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const dispatch = useAppDispatch();
  const handleDeleteReport = async () => {
    console.log("selectedReports", selectedReports);
    try {
      const response = (await dispatch(
        deleteReport({ report_ids: selectedReports })
      )) as unknown as DeleteResponse;
      console.log("reports response", response);
      if (response?.payload?.status === 200) {
        // if (response?.payload?.message?.includes("Report saved successfully.")) {

        // setTimeout(() => {
        // setNotificationProps({
        //   visible: true,
        //   type: "success",
        //   title: "Success",
        //   message: response?.payload?.data?.message,
        // });
        // }, 2000);

        toast.success(response?.payload?.data?.message);
        // setIsModalOpen(false);
        dispatch(getReportsData());
        // console.log("Report unstared successfully:", response.payload.data);
      } else {
        // setTimeout(() => {
        // setNotificationProps({
        //   visible: true,
        //   type: "error",
        //   title: "Error",
        //   message: response?.payload?.data?.message,
        //   // message: "Error",
        // });
        // }, 2000);
        toast.warning(response?.payload?.data?.message);
        // console.log("Report not saved successfully:", response.payload);
      }
    } catch (error) {
      console.error("Error in handleSaveReport:", error);
      // setTimeout(() => {
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Error",
      //   message: "Something went wrong. Please try again later.",
      // });
      toast.error("Something went wrong. Please try again later.");
      // }, 2000);
    }
  };
  // interface ReportState {
  //   isLoadingSaveReportData: boolean;
  //   isLoadingReportsData: boolean;
  //   reportsData: any[] | null;
  // }

  const TabsLabel = (props: LabelProps) => {
    const { label, number } = props;
    return (
      <div className="flex flex-row gap-[8px]">
        <div className="font-[500] text-[14px] text-[#475569] ml-[16px]">
          {label}
        </div>
        <div className="font-[500] text-[14px] text-[#c847e8] mr-[16px]">
          {number}
        </div>
      </div>
    );
  };
  const navigate = useNavigate();

  // const { reportsData } = useAppSelector(
  //   (store) => store.reportsData
  // ) as ReportState;

  // useEffect(() => {
  //   setReportsLength(reportsData?.length || 0);
  //   setStarReportsLength(
  //     reportsData?.filter((item: any) => item.is_starred)?.length || 0
  //   );
  // }, [reportsData?.length]);

  const items: TabsProps["items"] = [
    {
      key: "/key-report",
      label: <TabsLabel label="Key Reports" number="10" />,
      //   children: <KeyReport />,
    },
    {
      key: "/my-report",
      label: <TabsLabel label="My Reports" number={reportsCount?.toString()} />,
      //   children: <MyReports />,
    },
    {
      key: "/saved-report",
      label: <TabsLabel label="Saved" number={starReportCount?.toString()} />,
      //   children: <MyReports />,
    },
  ];

  const location = useLocation();

  const onChange = (key: string) => {
    console.log("🚀 ~ onChange ~ key:", key);
    // setTab(key);
    navigate(key);
  };

  return (
    <DefaultLayout
      FilterComponent={
        <FilterContainer heading="Reports" mapDataReload={() => {}} noFilter />
      }
      heading="Reports"
      // noUserName
    >
      <Tabs
        activeKey={location?.pathname || "/my-report"}
        // tabPosition={mode}
        tabBarStyle={
          window.innerWidth < 1024
            ? {
                background: "white",
                padding: "15px 32px 64px 32px",
                borderRadius: 13,
                boxShadow: "0px 0px 8px 0px #00000014",
              }
            : {
                background: "white",
                padding: "32px 32px 16px 32px",
                borderRadius: 13,
                boxShadow: "0px 0px 8px 0px #00000014",
                marginTop: "-24px",
              }
        }
        tabBarExtraContent={
          <div className="hidden md:block">
            {/* Only show on md+ screens */}
            <CreateReport />
          </div>
        }
        items={items}
        onChange={onChange}
      />

      {/* Mobile version shown below tabs */}
      <div className="block md:hidden px-4 md:mt-0 md-md-0 mt-[-70px] mb-[30px]">
        <CreateReport />
      </div>

      <div className="bg-[#fff] p-[20px] rounded-[12px]">
        <TableOptions
          handleDeleteReport={handleDeleteReport}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <MyReportsTable
          startDate={startDate}
          endDate={endDate}
          setSelectedReports={setSelectedReports}
        />
      </div>

      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </DefaultLayout>
  );
};

export default MyReports;
