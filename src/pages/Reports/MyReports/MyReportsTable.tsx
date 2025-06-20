import { Spin, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RiUserShared2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ShareModal from "./ShareModal/ShareModal";
import { reportFilter } from "@/store/reducers/createReport";
import { FaStar } from "react-icons/fa6";
import Notification from "@/components/Notification";
import { getReportsData, starReport } from "@/store/actions";
import React from "react";
import { toast } from "react-toastify";
import { formatDateReportsTable } from "@/utils/helper/dateCoversionHelper";

interface DataType {
  key: React.Key;
  name: string | React.ReactElement;
  assigned: string;
  address: string;
  lastViwed: string;
  lastUpdated: string;
}

type NotificationType = "success" | "info" | "warning" | "error";

const formatDate = (date: Date): string => {
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

const ColHeading = ({
  heading,
  dataIndex,
  sortedColumn,
  sortOrder,
  showArrows,
}: {
  heading: string;
  dataIndex: string;
  sortedColumn: string | null;
  sortOrder: "ascend" | "descend" | null;
  showArrows: boolean;
}) => {
  const isCurrentSorted = sortedColumn === dataIndex;
  return (
    <div className="font-600 text-[12px] flex flex-row justify-between cursor-pointer">
      <div>{heading}</div>
      <div className="flex flex-col">
        {showArrows && (
          <>
            <IoIosArrowUp
              color={
                isCurrentSorted && sortOrder === "ascend" ? "#000" : "#cbd5e1"
              }
            />
            <IoIosArrowDown
              color={
                isCurrentSorted && sortOrder === "descend" ? "#000" : "#cbd5e1"
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

// Add these props to the component's props interface
interface MyReportsTableProps {
  startDate: string | null;
  endDate: string | null;
  setSelectedReports: (reports: any[]) => void;
}

const MyReportsTable = ({
  startDate,
  endDate,
  setSelectedReports,
}: MyReportsTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const { isOrganizationUsersLoading } = useAppSelector(
    (store) => store.userData
  );
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  const showModal = (reportId: any) => {
    setIsModalOpen(true);
    setSelectedReportId(reportId);
  };
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const [starLoadingId, setStarLoadingId] = useState<number | null>(null);

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

  const handleReportClick = (reportId: any) => {
    const currentReport = reportsData?.find(
      (report: any) => report?.report_id === reportId
    );
    console.log("current report id", currentReport);
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
        // setTimeout(() => {
        //   setNotificationProps({
        //     visible: true,
        //     type: "success",
        //     title: "Success",
        //     message: response?.payload?.data?.message,
        //   });
        // }, 1000);
        toast.success(response?.payload?.data?.message);

        setIsModalOpen(false);
        dispatch(getReportsData());
      } else {
        // setTimeout(() => {
        //   setNotificationProps({
        //     visible: true,
        //     type: "error",
        //     title: "Error",
        //     message: response?.payload?.data?.message,
        //   });
        // }, 1000);
        toast.error(response?.payload?.data?.message);
      }
    } catch (error) {
      console.error("Error in handleSaveReport:", error);
      // setTimeout(() => {
      //   setNotificationProps({
      //     visible: true,
      //     type: "error",
      //     title: "Error",
      //     message: "Something went wrong. Please try again later.",
      //   });
      // }, 1000);
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
        // setTimeout(() => {
        //   setNotificationProps({
        //     visible: true,
        //     type: "success",
        //     title: "Success",
        //     message: response?.payload?.data?.message,
        //   });
        // }, 1000);

        toast.success(response?.payload?.data?.message);
        setIsModalOpen(false);
        dispatch(getReportsData());
      } else {
        // setTimeout(() => {
        //   setNotificationProps({
        //     visible: true,
        //     type: "error",
        //     title: "Error",
        //     message: response?.payload?.data?.message,
        //   });
        // }, 1000);
        toast.error(response?.payload?.data?.message);
      }
    } catch (error) {
      console.error("Error in handleSaveReport:", error);
      // setTimeout(() => {
      //   setNotificationProps({
      //     visible: true,
      //     type: "error",
      //     title: "Error",
      //     message: "Something went wrong. Please try again later.",
      //   });
      // }, 1000);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setStarLoadingId(null);
    }
  };

  const handleColumnSort = (dataIndex: string) => {
    if (sortedColumn === dataIndex) {
      if (sortOrder === "ascend") {
        setSortOrder("descend");
      } else if (sortOrder === "descend") {
        setSortOrder(null);
        setSortedColumn(null);
      } else {
        setSortOrder("ascend");
      }
    } else {
      setSortedColumn(dataIndex);
      setSortOrder("ascend");
    }
  };

  const getSortedData = (data: DataType[]) => {
    if (!sortedColumn || !sortOrder) return data;
    const sorted = [...data];
    sorted.sort((a: any, b: any) => {
      let aValue = a[sortedColumn];
      let bValue = b[sortedColumn];
      if (
        sortedColumn === "name" &&
        aValue?.props?.children &&
        bValue?.props?.children
      ) {
        aValue = aValue.props.children;
        bValue = bValue.props.children;
      }
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
    return sorted;
  };

  // console.log("share with check for table", reportsData)

  const dataSource = (reportsData || [])
    .filter((report: any) => report?.report_id > 2)
    .map<DataType>((report: any) => ({
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
      ownedBy: {
        userName: report?.owner_name,
        userEmailId: report?.owner_email,
      },
      assigned: "Everyone",
      address: "Public",
      lastViwed: new Date().toLocaleString(),
      // lastViwed: "jnknjn",

      lastUpdated: report?.last_updated,
    }));

  const onRow = (record: any) => ({
    className: starLoadingId === record.key ? "opacity-50" : "",
  });

  const { profileData } = useAppSelector((store) => store.profile);
  const currentDate = new Date();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: (
        <div style={{ width: 40, textAlign: "center" }}>
          {/* <FaStar size={16} color="#cbd5e1" style={{ pointerEvents: "none" }} /> */}
        </div>
      ),
      width: 50,
      dataIndex: "star",
      align: "center",
    },
    {
      title: (
        <ColHeading
          heading="Name"
          dataIndex="name"
          sortedColumn={sortedColumn}
          sortOrder={sortOrder}
          showArrows={true}
        />
      ),
      dataIndex: "name",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("name"),
      }),
      render: (text) => <div className="font-[600] text-[12px]">{text}</div>,
    },
    {
      title: (
        <ColHeading
          heading="Assigned"
          dataIndex="assigned"
          sortedColumn={sortedColumn}
          sortOrder={null}
          showArrows={false}
        />
      ),
      dataIndex: "assigned",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("assigned"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: (
        <ColHeading
          heading="Visibility"
          dataIndex="address"
          sortedColumn={sortedColumn}
          sortOrder={null}
          showArrows={false}
        />
      ),
      dataIndex: "address",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("address"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: (
        <ColHeading
          heading="Owned By"
          dataIndex="ownedBy"
          sortedColumn={sortedColumn}
          sortOrder={sortOrder}
          showArrows={true}
        />
      ),
      dataIndex: "ownedBy",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("ownedBy"),
      }),
      render: (userData: any) => {
        // console.log(
        //   "avaasvsavsavsf",
        //   userData?.userName,
        //   userData?.userEmailId
        // );
        return (
          // <></>
          <div>
            <div className="userName font-[600] text-[12px]">
              {/* {profileData?.["user"]?.["name"]} */}
              {userData?.userName}
            </div>
            <div className="userEmailId font-[400] text-[12px]">
              {/* {profileData?.["user"]?.["email"]} */}
              {userData?.userEmailId}
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <ColHeading
          heading="Last Viewed"
          dataIndex="lastViwed"
          sortedColumn={sortedColumn}
          sortOrder={sortOrder}
          showArrows={true}
        />
      ),
      dataIndex: "lastViwed",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("lastViwed"),
      }),
      render: () => (
        <div>
          <div className="dateAndTimeOfView font-[600] text-[12px]">
            {formatDate(currentDate)}
          </div>
          <div className="lastViewdUserName font-[400] text-[12px]">
            {profileData?.["user"]?.["name"]}
          </div>
        </div>
      ),
    },
    {
      title: (
        <ColHeading
          heading="Last Updated"
          dataIndex="lastUpdated"
          sortedColumn={sortedColumn}
          sortOrder={sortOrder}
          showArrows={true}
        />
      ),
      dataIndex: "lastUpdated",
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("lastUpdated"),
      }),
      render: (date) => (
        <div>
          <div className="dateAndTimeOfView font-[600] text-[12px]">
            {formatDateReportsTable(date)}
          </div>
          <div className="lastViewdUserName font-[400] text-[12px]">
            {profileData?.["user"]?.["name"]}
          </div>
        </div>
      ),
    },
    {
      title: (
        <ColHeading
          heading=""
          dataIndex="actions"
          sortedColumn={sortedColumn}
          sortOrder={null}
          showArrows={true}
        />
      ),
      dataIndex: "actions",
      render: (record: any, _) => {
        console.log("share with check for table", record);
        return (
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <RiUserShared2Line size={20} color="#1E293B" />
            <span
              style={{ textDecoration: "underline", color: "#1E293B" }}
              onClick={() => showModal(_.key)}
            >
              Share
            </span>
          </div>
        );
      },
    },
  ];

  const selectionType: "checkbox" | "radio" = "checkbox";

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

  return (
    <>
      <div style={{ width: "100%", marginTop: "16px" }}>
        <Spin
          spinning={isLoadingReportsData || isOrganizationUsersLoading}
          tip={"Loading Reports..."}
          size="large"
        >
          <Table<DataType>
            rowSelection={{ type: selectionType, ...rowSelection }}
            columns={columns}
            dataSource={
              isLoadingReportsData
                ? []
                : getSortedData(filterDataByDate(dataSource))
            }
            scroll={{ x: "max-content" }}
            tableLayout={isLoadingReportsData ? "fixed" : "auto"}
            onRow={onRow}
          />
        </Spin>
        <ShareModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          reportId={selectedReportId}
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

export default MyReportsTable;
