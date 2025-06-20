import React, { useEffect } from "react";
import { Badge, Button, message, Spin, Table, TableColumnsType } from "antd";
import { useState } from "react";
import SendReminderModal from "../SendReminderModal";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import TaskStatusSelect from "./TaskStatusSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getEngagementAssignedTasks,
  getMonitorAssignedTasks,
  sendReminder,
} from "@/store/actions";
import Notification from "@/components/Notification";
import { convertToISO8601 } from "@/utils/helper/dateCoversionHelper";
import { toast } from "react-toastify";
import { taskStatusHelperObject } from "@/utils/helper/objectValuePairHelper";
import { lowerCase } from "lodash";

// type TableRowSelection<T extends object = object> =
//   TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  dateAssigned: string;
  name: string;
  assigned: any;
  dateOfCompletion: string;
  priority: React.ReactNode;
  taskCompleted: string;
  priorityValue?: string; // Added to store the actual priority value
}

type NotificationType = "success" | "info" | "warning" | "error";

interface TableMyAssignedTaskProps {
  taskSearchValue: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  startDate: string | null;
  endDate: string | null;
  userNameFilter:string;
  countrySelectedFilter: string;
  priorityFilter: string | null;
  kpi: any;
  departmentId: any;
  countryIds:any;
}

const TableMyAssignedTask = (props: TableMyAssignedTaskProps) => {
  const {
    taskSearchValue,
    currentPage,
    // setCurrentPage,
    pageSize,
    // setPageSize,
    startDate,
    endDate,
    userNameFilter,
    priorityFilter,
    kpi,
    departmentId,
    countryIds
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [selectedRowForReminder, setSelectedRowForReminder] =
    useState<DataType | null>(null);
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const dispatch = useAppDispatch();
  const { orgIDRedux, userEmail, userId, userName } = useAppSelector(
    (store) => store.profile
  );
  // const { engagementAssignedTasksData } = useAppSelector(
  //   (store) => store.predictiveAnalytics as any
  // );

  // const { isEngagementAssignedTasksLoading } = useAppSelector(
  //   (store) => store.predictiveAnalytics as any
  // );

  const { isMonitorTaskLoading, monitorTaskData } = useAppSelector(
    (store) => store.monitor
  );

  useEffect(() => {
    dispatch(
      getEngagementAssignedTasks({
        org_id: orgIDRedux,
        engagement_id: 66,
      })
    );
  }, []);

  interface EngagementAssignedTask {
    [key: string]: any;
  }

  const [tableData, setTableData] = useState<DataType[]>([]);

  // {monitorTaskData?.assigned_task?.forEach((elem:any) => {
  //   console.log(elem?.assigned_by?.user_id === userId)
  // })}
  // console.log(
  //   monitorTaskData?.assigned_task?.filter(
  //     (elem: any) => elem?.assigned_by?.email === userEmail
  //   )
  // );

useEffect(() => {
  const dataSource: any[] =
    (monitorTaskData?.assigned_task as EngagementAssignedTask[])
      ?.filter((elem: any) => elem?.assigned_to?.email === userEmail)
      // Add KPI filter here - if kpi has a value, filter by it, otherwise show all
      ?.filter((elem: any) => {
        if (!kpi || kpi === '' || kpi === 'All') {
          // If no KPI is selected, show all tasks
          return true;
        }
        
        // If KPI is selected, only show tasks that match the KPI
        return lowerCase(elem?.kpi) === lowerCase(kpi);
      })
      // Fixed department filter
      ?.filter((elem: any) => {
        // If no department is selected (null, undefined, or 'All'), show all tasks
        if (departmentId === null || departmentId === undefined || departmentId === 'All') {
          return true;
        }
        if(elem?.department_id !== null){
          console.log("departmentId in table my assigned task", elem);
        }
        
        // Convert both values to strings for comparison
        const elemDeptId = elem?.department_id?.toString();
        const filterDeptId = departmentId.toString();
        
        // console.log(' departmentId in table my assigned task Comparing:',elem?.department_id,filterDeptId); // Debug log
        
        return elemDeptId === filterDeptId;
      })
      // Fixed country filter - check for array intersection
      ?.filter((elem: any) => {
        // If no countries are selected, show all tasks
        if (countryIds.length === 0) {
          return true;
        }
        
        // If elem.location_ids is not an array or is empty, exclude it
        if (!Array.isArray(elem?.location_ids) || elem.location_ids.length === 0) {
          return false;
        }
        
        // Check if there's any overlap between countryIds and elem.location_ids
        return elem.location_ids.some((locationId: any) => 
          countryIds.includes(locationId)
        );
      })
      ?.map<any>((_: EngagementAssignedTask): any => {
        // Store the priority value as a separate property
        const priorityValue = _.priority || "Medium";
        return {
          key: _.id,
          dateAssigned: _.start_date,
          name: _.task_name ? _.task_name : "N/A",
          assigned: {
            name: _.assigned_to?.name,
            email: _.assigned_to?.email,
            userId: _.assigned_to?.user_id,
          },
          progress: _.progress,
          dateOfCompletion: _.end_date,
          priorityValue,
          priority:
            _.priority === "High" ? (
              <Badge
                status="error"
                className="flex flex-row justifiy-center items-center"
                text={<div className="font-[400] text-[12px]">High</div>}
              />
            ) : _.priority === "Medium" ? (
              <Badge
                status="warning"
                className="flex flex-row justifiy-center items-center"
                text={<div className="font-[400] text-[12px]">Medium</div>}
              />
            ) : (
              <Badge
                status="success"
                className="flex flex-row justifiy-center items-center"
                text={<div className="font-[400] text-[12px]">Low</div>}
              />
            ),
          taskCompleted:
            _.status === "In Progress" || _.status === "in-progress"
              ? "In Progress"
              : _.status === "pending" || _.status === "Pending"
              ? "Pending"
              : "Completed",
          kpi: _.kpi,
          department_id: _.department_id, // Add department_id for debugging
        };
      }) || [];
      
  console.log('Filtered dataSource:', dataSource); // Debug log
  setTableData(dataSource);
  // Update total items
  props.setTotalItems(dataSource.length);
}, [monitorTaskData, kpi, departmentId, countryIds]);// Add kpi to the dependency array

  const filterData = (data: DataType[]) => {
  let filteredData = [...data];

  // Apply search filter
  if (searchValue.length > 0) {
    filteredData = filteredData.filter((report: any) =>
      report.name.toLowerCase().includes(searchValue)
    );
  }

  // Apply date filters
  if (startDate || endDate) {
    filteredData = filteredData.filter((item) => {
      const itemDate = new Date(item.dateAssigned);
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      }
      
      if (startDate) {
        const start = new Date(startDate);
        return itemDate >= start;
      }
      
      if (endDate) {
        const end = new Date(endDate);
        return itemDate <= end;
      }

      return true;
    });
  }

  //apply usewr name filter 
  if (userNameFilter && userNameFilter !== "") {
    filteredData = filteredData.filter(
      (item: any) =>
        item.assigned?.name &&
        item.assigned.name.toLowerCase().includes(userNameFilter.toLowerCase())
    );
  }

  //Apply filter for Priority
  if (priorityFilter && priorityFilter !== "" && priorityFilter !== "All") {
    filteredData = filteredData.filter(
      (item: any) => item.priorityValue === priorityFilter
    );
  }
  console.log(filteredData)


  return filteredData;
};
  const showModal = (record: DataType) => {
    // console.log("selected Data in this page for data", record);
    setSelectedRowForReminder(record);
    // const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSendReminder = () => {
    setIsModalOpen(false);
    setSelectedRowForReminder(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRowForReminder(null);
  };
  // useEffect(() => {
  //   console.log("this is the data that is set for the row",selectedRowForReminder)
  // }, [selectedRowForReminder])

  const handleStatusChange = async (value: string, record: any) => {
    // Prevent multiple API calls at once
    if (isApiCallInProgress) return;

    // console.log(record?.dateOfCompletion);

    setIsApiCallInProgress(true);

    try {
      // Update the UI optimistically
      const newData = tableData.map((item) =>
        item.key === record.key ? { ...item, taskCompleted: value } : item
      );
      setTableData(newData);

      const recordData = monitorTaskData?.assigned_task?.find(
        (elem: any) => elem?.id === record?.key
      );
      console.log(recordData);
      // Prepare API call data
      const formdata = new FormData();
      // formdata.append("org_id", orgIDRedux || "");
      // formdata.append("task_id", "1"); //TODO change task id once api is resolved
      // formdata.append("task_compeleted", value);
      formdata.append("org_id", String(orgIDRedux) || "");
      formdata.append("task_id", recordData?.id);
      formdata.append("assigned_to[user_id]", recordData?.assigned_to?.user_id); //TODO Change when recieved in list of users
      formdata.append("assigned_to[name]", recordData?.assigned_to?.name);
      formdata.append("assigned_to[email]", recordData?.assigned_to?.email);
      formdata.append("progress", String(recordData?.progress || 0));
      formdata.append("start_date", convertToISO8601(recordData?.start_date));
      formdata.append("end_date", convertToISO8601(recordData?.end_date));
      formdata.append("priority", recordData?.priority);
      formdata.append(
        "status",
        taskStatusHelperObject?.[value as keyof typeof taskStatusHelperObject]
      );
      formdata.append("notes", recordData?.notes);
      formdata.append("task_name", "First Task");
      formdata.append("assigned_by[name]", userName ? userName : "");
      formdata.append("assigned_by[email]", userEmail ? userEmail : "");
      formdata.append("assigned_by[user_id]", userId ? userId?.toString() : "");
      formdata.append("location_ids[]", "id1");
      formdata.append("location_ids[]", "id2");
      formdata.append("department_id", recordData?.department_id);
      formdata.append("kpi", recordData?.kpi);
      // console.log(formdata);
      // Call the API
      const response = await dispatch(sendReminder(formdata));

      // console.log(newData, value);
      if (response?.payload?.status === 200) {
        // setNotificationProps({
        //   visible: true,
        //   type: "success",
        //   title: "Success",
        //   message: "Task status updated successfully.",
        // });
        toast.success("Task status updated successfully.");

        dispatch(
          getMonitorAssignedTasks({
            org_id: orgIDRedux,
          })
        );
      } else {
        // Revert the optimistic update if the API call failed
        // setNotificationProps({
        //   visible: true,
        //   type: "error",
        //   title: "Error",
        //   message: "Failed to update task status. Please try again.",
        // });

        toast.error("Failed to update task status. Please try again.");

        // Rollback the UI change
        const rollbackData = tableData.map((item) =>
          item.key === record.key
            ? { ...item, taskCompleted: record.taskCompleted }
            : item
        );
        setTableData(rollbackData);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Error",
      //   message: "An unexpected error occurred. Please try again.",
      // });

      toast.error("An unexpected error occurred. Please try again.");

      // Rollback the UI change
      const rollbackData = tableData.map((item) =>
        item.key === record.key
          ? { ...item, taskCompleted: record.taskCompleted }
          : item
      );
      setTableData(rollbackData);
    } finally {
      setIsApiCallInProgress(false);
    }
  };

  const ColHeading = (props: any) => {
    const { heading, dataIndex, isSorting } = props;
    const isCurrentSorted = sortedColumn === dataIndex;

    return (
      <div className="font-600 text-[12px] flex flex-row justify-between items-center">
        <div>{heading}</div>
        {!isSorting && (
          <div className="flex flex-col">
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
          </div>
        )}
      </div>
    );
  };

  const handleColumnSort = (dataIndex: string) => {
    if (sortedColumn === dataIndex) {
      setSortOrder(
        sortOrder === "ascend"
          ? "descend"
          : sortOrder === "descend"
          ? null
          : "ascend"
      );
      setSortedColumn(sortOrder === "descend" ? null : dataIndex);
    } else {
      setSortedColumn(dataIndex);
      setSortOrder("ascend");
    }
  };

  // const handlePageChange = (page: number, size?: number) => {
  //   setCurrentPage(page);
  //   if (size) setPageSize(size);
  // };

  const getPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: <ColHeading heading="Date" dataIndex="dateAssigned" />,
      dataIndex: "dateAssigned",
      width: 120,
      sorter: (a, b) => a.dateAssigned.localeCompare(b.dateAssigned),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("dateAssigned"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Task Name" dataIndex="name" />,
      dataIndex: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("name"),
      }),
      render: (text) => <div className="font-[600] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Assigned" dataIndex="assigned" />,
      dataIndex: "assigned",
      width: 180,
      sorter: (a, b) => a.assigned.name.localeCompare(b.assigned.name),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("assigned"),
      }),
      render: (assigned: any) => {
        const { name, email } = assigned;
        return (
          <div>
            <div className="userName font-[600] text-[12px]">{name}</div>
            <div className="userEmailId font-[400] text-[12px]">{email}</div>
          </div>
        );
      },
    },
    {
      title: <ColHeading heading="Due Date" dataIndex="dateOfCompletion" />,
      dataIndex: "dateOfCompletion",
      width: 120,
      sorter: (a, b) => a.dateOfCompletion.localeCompare(b.dateOfCompletion),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("dateOfCompletion"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Priority" dataIndex="priority" />,
      dataIndex: "priority",
      width: 120,
      sorter: (a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };

        const getText = (node: React.ReactNode): string => {
          if (React.isValidElement(node) && node.props.text?.props?.children) {
            return node.props.text.props.children;
          }
          return "";
        };
        return (
          priorityOrder[getText(a.priority) as keyof typeof priorityOrder] -
          priorityOrder[getText(b.priority) as keyof typeof priorityOrder]
        );
      },
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("priority"),
      }),
    },
    {
      title: <ColHeading heading="Status" dataIndex="taskCompleted" />,
      dataIndex: "taskCompleted",
      width: 150,
      sorter: false,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("taskCompleted"),
      }),

      render: (value: string, record: DataType) => (
        <TaskStatusSelect
          value={value}
          onChange={(newValue) => {
            if(value === "Completed"){
            message.warning("You cannot change status of a Completed Task")
          }
          else{
            handleStatusChange(newValue, record)
          }
          }}
        />
      ),
    },
    {
      title: <ColHeading heading="Action" isSorting={true} />,
      width: 130,
      render: (_, record) => {
        console.log("record", record);
        return(
        <Button
          style={{
            borderRadius: "40px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "6px",
            paddingBottom: "6px",
            background: "#C847E8",
            color: "#fff",
            fontWeight: 400,
            fontSize: "14px",
          }}
          className="focus:outline-0 hover:!border-[#C847E8] w-full"
          onClick={() => showModal(record)}
          disabled={ _?.taskCompleted==='Completed'}
        >
          Send reminder
        </Button>
      )},
    },
  ];

  const mobileColumns: TableColumnsType<DataType> = [
    {
      title: <ColHeading heading="Date" dataIndex="dateAssigned" />,
      dataIndex: "dateAssigned",
      width: 120,
      sorter: (a, b) => a.dateAssigned.localeCompare(b.dateAssigned),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("dateAssigned"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Task Name" dataIndex="name" />,
      dataIndex: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("name"),
      }),
      render: (text) => <div className="font-[600] text-[12px]">{text}</div>,
    },
  ];

  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection: TableRowSelection<DataType> = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   selections: [
  //     Table.SELECTION_ALL,
  //     Table.SELECTION_INVERT,
  //     Table.SELECTION_NONE,
  //     {
  //       key: "odd",
  //       text: "Select Odd Row",
  //       onSelect: (changeableRowKeys) => {
  //         const newSelectedRowKeys = changeableRowKeys.filter(
  //           (_, index) => index % 2 === 0
  //         );
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //     {
  //       key: "even",
  //       text: "Select Even Row",
  //       onSelect: (changeableRowKeys) => {
  //         const newSelectedRowKeys = changeableRowKeys.filter(
  //           (_, index) => index % 2 !== 0
  //         );
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //   ],
  // };

  const searchValue =
    typeof taskSearchValue === "string" ? taskSearchValue.toLowerCase() : "";

  // const data =
  //   searchValue.length === 0
  //     ? tableData
  //     : tableData.filter((report: any) =>
  //         report.name.toLowerCase().includes(searchValue)
  //       );

  const data = filterData(tableData);

  return (
    <div className="mt-[30px]">
      {/* Desktop View */}
      <div className="md:block hidden">
        <Spin spinning={isMonitorTaskLoading || isApiCallInProgress}>
          <Table<DataType>
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={getPageData()}
            pagination={false}
          />
        </Spin>
      </div>

      {/* <div className="mt-4 flex justify-end bg-[#f8f8f8] w-full">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data.length}
              onChange={handlePageChange}
              // showSizeChanger
              // showTotal={(total) => `Total ${total} items`}
            />
          </div> */}

      {/* Mobile View */}
      <div className="md:hidden block border-collapse border-[#CBD5E1] border !rounded-[8px]">
        <Spin spinning={isMonitorTaskLoading || isApiCallInProgress}>
          <Table<DataType>
            columns={mobileColumns}
            dataSource={data}
            expandable={{
              expandedRowRender: (record) => (
                <div className="text-[12px]">
                  <div className="flex justify-between">
                    <span>{record.dateAssigned}</span>
                    <span className="font-semibold">{record.name}</span>
                  </div>

                  <div className="mt-[16px]">
                    <div className="font-semibold">Assigned</div>
                    <div className="font-semibold mt-[2px]">
                      {record.assigned.name}
                    </div>
                    <div>{record.assigned.email}</div>
                  </div>

                  <div className="mt-[16px]">
                    <div className="font-semibold">Due Date</div>
                    <div className="font-semibold mt-[2px]">
                      {record.dateOfCompletion}
                    </div>
                  </div>

                  <div className="mt-[16px] flex justify-between">
                    <div>
                      <div className="font-semibold">Priority</div>
                      <div className="font-semibold mt-[2px]">
                        {record.priority}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">Status</div>
                      <div className="font-semibold mt-[2px]">
                        <TaskStatusSelect
                          value={record.taskCompleted}
                          onChange={(newValue) =>{
                            handleStatusChange(newValue, record)
                            console.log("afvavsavadvs",newValue, record)}
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-[16px]">
                    <Button
                      style={{
                        borderRadius: "40px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingTop: "6px",
                        paddingBottom: "6px",
                        background: "#C847E8",
                        color: "#fff",
                        fontWeight: 400,
                        fontSize: "14px",
                      }}
                      className="focus:outline-0 hover:!border-[#C847E8] w-full"
                      onClick={() => showModal(record)}
                    >
                      Send reminder
                    </Button>
                  </div>
                </div>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
          />
        </Spin>
      </div>

      {/* Send Modal */}
      <SendReminderModal
        isModalOpen={isModalOpen}
        handleSendReminder={handleSendReminder}
        handleCancel={handleCancel}
        setNotificationProps={setNotificationProps}
        preselectedDataKey={selectedRowForReminder?.key}
        preselectedDataName={selectedRowForReminder?.name}
        heading={"Send Reminder"}
      />
      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </div>
  );
};

export default TableMyAssignedTask;
