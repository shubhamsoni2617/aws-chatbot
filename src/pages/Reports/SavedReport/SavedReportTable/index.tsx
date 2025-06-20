import { Spin, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useNavigate } from "react-router-dom";

import { reportFilter } from "@/store/reducers/createReport";
import { FaStar } from "react-icons/fa6";
import Notification from "@/components/Notification";
import { getReportsData, starReport } from "@/store/actions";
import ShareModal from "../ShareModal/ShareModal";
import { toast } from "react-toastify";
import { formatDateReportsTable } from "@/utils/helper/dateCoversionHelper";

interface DataType {
  key: React.Key;
  name: string | React.ReactElement;
  assigned: string;
  address: string;
  lastViwed: string;
  lastUpdated: any;
}

type NotificationType = "success" | "info" | "warning" | "error";

// Add these props to the component's props interface
interface SavedReportsTableProps {
  startDate: string | null;
  endDate: string | null;
  setSelectedReports: (reports: any[]) => void;
}

const formatDate = (date: Date | null): string => {
  if (!date) return "-";
  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
};

const ColHeading = (props: any) => {
  const { heading } = props;
  return (
    <div className="font-600 text-[12px] flex flex-row justify-between">
      <div>{heading}</div>
      <div className="flex flex-col">
        <IoIosArrowUp />
        <IoIosArrowDown color="#cbd5e1" />
      </div>
    </div>
  );
};

const SavedReportsTable = ({
  setSelectedReports,
  startDate,
  endDate,
}: SavedReportsTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starLoadingId, setStarLoadingId] = useState<number | null>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  interface ReportState {
    isLoadingSaveReportData: boolean;
    isLoadingReportsData: boolean;
    reportsData: any[] | null;
  }

  const rowSelection: TableProps<DataType>["rowSelection"] = {
    onChange: (selectedRowKeys: any, selectedRows: DataType[]) => {
      setSelectedReports(selectedRowKeys);
      console.log(`selectedRowKeys: ${selectedRows} `);
    },
  };

  const { reportsData, isLoadingReportsData } = useAppSelector(
    (store) => store.reportsData
  ) as ReportState;

  console.log("reports data", reportsData);
  // const staredReports

  const handleReportClick = (reportId: any) => {
    const currentReport = reportsData?.find(
      (report: any) => report?.report_id === reportId
    );
    const isComparision = currentReport?.isComparison;

    dispatch(reportFilter({ val: currentReport }));
    if (isComparision) {
      navigate("/report/ViewComparison", {
        state: {
          parentUrl: "/my-report",
        },
      });
    } else {
      navigate("/reports/ViewReport", {
        state: {
          parentUrl: "/my-report",
        },
      });
    }
  };

  const handleUnstar = async (reportId: any) => {
    setStarLoadingId(reportId);
    const formdata = new FormData();
    formdata.append("org_id", "2");
    formdata.append("report_id", String(reportId));
    formdata.append("is_starred", "0");

    try {
      const response = await dispatch(starReport(formdata));
      if (response?.payload?.status === 200) {
        toast.success(response?.payload?.data?.message);
        setIsModalOpen(false);
        dispatch(getReportsData());
      } else {
        toast.error(response?.payload?.data?.message);
      }
    } catch (error) {
      console.error("Error in handleSaveReport:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setStarLoadingId(null);
    }
  };

  const handleStar = async (reportId: any) => {
    setStarLoadingId(reportId);
    const formdata = new FormData();
    formdata.append("org_id", "2");
    formdata.append("report_id", String(reportId));
    formdata.append("is_starred", "1");

    try {
      const response = await dispatch(starReport(formdata));
      if (response?.payload?.status === 200) {
        toast.success(response?.payload?.data?.message);
        setIsModalOpen(false);
        dispatch(getReportsData());
      } else {
        toast.error(response?.payload?.data?.message);
      }
    } catch (error) {
      console.error("Error in handleSaveReport:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setStarLoadingId(null);
    }
  };

  // Add the date filter function from the first file
  const filterDataByDate = (data: DataType[]) => {
    if (!startDate && !endDate) return data;

    return data.filter((item) => {
      // Convert the item's date and remove time component
      const itemDate = new Date(item.lastUpdated);
      itemDate.setHours(0, 0, 0, 0);

      if (startDate && endDate) {
        // Convert start and end dates and remove time component
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Set to end of day

        return itemDate >= start && itemDate <= end;
      }

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        return itemDate >= start;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Set to end of day
        return itemDate <= end;
      }

      return true;
    });
  };

  const dataSource = (reportsData || [])
    .filter((filter_report: any) => filter_report?.is_starred)
    .map<DataType>((report: any, i: any) => ({
      key: report?.report_id,
      name: (
        <a onClick={() => handleReportClick(report?.report_id)}>
          {report?.report_name}
        </a>
      ),
      star: (
        <div className="ml-[10px] cursor-pointer">
          {report?.is_starred ? (
            <FaStar
              size={20}
              color="#c847e8"
              onClick={() => handleUnstar(report?.report_id)}
            />
          ) : (
            <FaStar
              size={20}
              style={{
                color: "#fff",
                stroke: "#000",
                strokeWidth: "20px",
              }}
              onClick={() => handleStar(report?.report_id)}
            />
          )}
        </div>
      ),
      ownedBy: `Owner ${i}`,
      assigned: "Everyone",
      address: "Public",
      lastViwed: new Date().toLocaleString(),
      lastUpdated: report?.last_updated,
    }));

  const { profileData } = useAppSelector((store) => store.profile);
  const currentDate = new Date();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onRow = (record: any) => ({
    className: starLoadingId === record.key ? "opacity-50" : "",
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "",
      width: 50,
      dataIndex: "star",
    },
    {
      title: <ColHeading heading="Name" />,
      dataIndex: "name",
      sorter: (a: any, b: any) =>
        a.name.props.children.localeCompare(b.name.props.children),
      render: (text) => <div className="font-[600] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Assigned" />,
      dataIndex: "assigned",
      sorter: (a: any, b: any) => a.assigned.localeCompare(b.assigned),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Visibility" />,
      dataIndex: "address",
      sorter: (a: any, b: any) => a.address.localeCompare(b.address),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Owned By" />,
      dataIndex: "ownedBy",
      render: () => (
        <div>
          <div className="userName font-[600] text-[12px]">
            {profileData?.["user"]?.["name"]}
          </div>
          <div className="userEmailId font-[400] text-[12px]">
            {profileData?.["user"]?.["email"]}
          </div>
        </div>
      ),
    },
    {
      title: <ColHeading heading="Last Viewed" />,
      dataIndex: "lastViwed",
      render: () => (
        <div>
          <div className="dateAndTimeOfView font-[600] text-[12px]">
            {currentDate ? formatDate(currentDate) : "-"}
          </div>
          <div className="lastViewdUserName font-[400] text-[12px]">
            {profileData?.['user']?.['name'] || "-"}
          </div>
        </div>
      ),
    },
    {
      title: <ColHeading heading="Last Updated" />,
      dataIndex: "lastUpdated",
      render: (date) => {
        console.log("date for check", date);
        return (
          <div>
            <div className="dateAndTimeOfView font-[600] text-[12px]">
              {formatDateReportsTable(date)}
            </div>
            <div className="lastViewdUserName font-[400] text-[12px]">
              {profileData?.["user"]?.["name"]}
            </div>
          </div>
        );
      },
    },
  ];

  const selectionType: "checkbox" | "radio" = "checkbox";

  return (
    <>
      <div style={{ width: "100%", marginTop: "16px" }}>
        <Spin
          spinning={isLoadingReportsData}
          tip={"Loading Saved Reports..."}
          // size="medium"
        >
          <Table<DataType>
            rowSelection={{ type: selectionType, ...rowSelection }}
            columns={columns}
            dataSource={
              isLoadingReportsData
                ? []
                : filterDataByDate(dataSource)
            }
            scroll={{ x: "max-content" }}
            onRow={onRow}
          />
        </Spin>
        <ShareModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>
      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </>
  );
};

export default SavedReportsTable;