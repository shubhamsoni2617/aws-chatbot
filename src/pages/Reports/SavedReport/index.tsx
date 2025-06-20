import { Tabs, TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "@/components/DefaultLayout";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import CreateReport from "../KeyReport/CreateReport";
import SavedReportsTable from "./SavedReportTable";
import Notification from "@/components/Notification";
import FilterContainer from "@/components/FilterContainer";
import TableOptions from "../TableOptions";

type NotificationType = "success" | "info" | "warning" | "error";

const SavedReport = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { reportsCount, starReportCount } = useAppSelector(
    (store) => store.reportsData
  ) as any;

  // const [reportsLength, setReportsLength] = useState(0);
  // const [starReportsLength, setStarReportsLength] = useState(0);
  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  type LabelProps = {
    label: string;
    number: string;
  };

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

  const items: TabsProps["items"] = [
    {
      key: "/key-report",
      label: <TabsLabel label="Key Reports" number="10" />,
    },
    {
      key: "/my-report",
      label: <TabsLabel label="My Reports" number={reportsCount?.toString()} />,
    },
    {
      key: "/saved-report",
      label: <TabsLabel label="Saved" number={starReportCount?.toString()} />,
    },
  ];

  const location = useLocation();

  const onChange = (key: string) => {
    navigate(key);
  };

  // const { reportsData } = useAppSelector((store) => store.reportsData) as any;

  // useEffect(() => {
  //   setReportsLength(reportsData?.length || 0);
  //   setStarReportsLength(
  //     reportsData?.filter((item: any) => item.is_starred)?.length || 0
  //   );
  // }, [reportsData?.length]);

  return (
    <DefaultLayout
      FilterComponent={
        <FilterContainer heading="Reports" mapDataReload={() => {}} noFilter />
      }
      heading="Reports"
      // noUserName
    >
      <Tabs
        activeKey={location?.pathname || "/saved-report"}
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
        <TableOptions setStartDate={setStartDate} setEndDate={setEndDate} />
        <SavedReportsTable
          startDate={startDate}
          endDate={endDate}
          setSelectedReports={() => {}}
        />{" "}
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

export default SavedReport;
