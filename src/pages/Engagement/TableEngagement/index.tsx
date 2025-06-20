import { getEngagementAssignedTasks } from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Badge, Progress, Spin, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import { LuCalendarPlus } from "react-icons/lu";
import { CgFlag } from "react-icons/cg";
import {
  taskStatusHelperObjectReverse,
  taskStatusHelperObjectReverseWarning,
} from "@/utils/helper/objectValuePairHelper";
import { FiEdit } from "react-icons/fi";
import SendReminderModal from "@/pages/Monitor/MyAssignedTask/SendReminderModal";
interface DataType {
  key: React.Key;
  assigned: string;
  address: string;
  startDate: string;
  endDate: string;
  name:string;
}

const TableEngagement = (props: any) => {
  const { engagementId, setIsTaskCompleted } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedRowForReminder, setSelectedRowForReminder] =
  //   useState<DataType | null>(null);

  const dispatch = useAppDispatch();
  const { profileData } = useAppSelector((store) => store.profile);
  const { engagementAssignedTasksData, isEngagementAssignedTasksLoading } =
    useAppSelector((store) => store.predictiveAnalytics);
  const org_id = profileData?.["organization"]?.["id"];

  

  // const taskStatusObject: any = {
  //   "In Progress": { status: "warning", text: "In Progress" },
  //   "in-progress": { status: "warning", text: "In Progress" },
  //   Completed: { status: "success", text: "Completed" },
  //   Pending: { status: "error", text: "Pending" },
  //   pending: { status: "error", text: "Pending" },
  // };

  // console.log("engagementId", engagementId);

  const showModal = () => {
    // console.log("selected Data in this page for data", record);
    // setSelectedRowForReminder(record);
    // const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSendReminder = () => {
    setIsModalOpen(false);
    // setSelectedRowForReminder(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // setSelectedRowForReminder(null);
  };

  useEffect(() => {
    dispatch(
      getEngagementAssignedTasks({
        org_id: org_id,
        engagement_id: engagementId,
      })
    );
  }, [isModalOpen]);

  const assignedTaskArray =
    engagementAssignedTasksData?.["assigned_task"] || [];
  console.log("engagementAssignedTasksData", assignedTaskArray[0]);

  useEffect(() => {
    if (assignedTaskArray[0]?.["status"] === "done") {
      setIsTaskCompleted(true);
    }
  }, [assignedTaskArray]);

  const dataSource = assignedTaskArray.map<any>((item: any, i: any) => ({
    key: i,
    assignedTo: item?.assigned_to,
    progress: item?.progress,
    assigned: "Everyone",
    address: i % 2 === 0 ? "Public" : "Private",
    startDate: item?.start_date,
    endDate: item?.end_date,
    priority: item?.priority,
    // i === 1 ? (
    //   <Badge status="error" text="High" />
    // ) : i % 2 === 0 ? (
    //   <Badge status="warning" text="Medium" />
    // ) : (
    //   <Badge status="success" text="Low" />
    // ),
    taskCompleted: item?.status,
    // i === 1 ? (
    //   <Badge status="error" text="Pending" />
    // ) : i % 2 === 0 ? (
    //   <Badge status="warning" text="In Progress" />
    // ) : (
    //   <Badge status="success" text="Completed" />
    // ),
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      // width: 280,
      render: (text) => {
        console.log("text", text);
        return (
          <div>
            <div className="userName" style={{ fontWeight: "700" }}>
              {text?.name}
            </div>
            <div className="userEmailId">{text?.email}</div>
          </div>
        );
      },
    },
    {
      title: "Progress",
      // width:280,
      dataIndex: "progress",
      render: (progress) => (
        <div>
          <Progress percent={progress} status="active" />
        </div>
      ),
    },
    {
      title: "Start Date",
      // width: 220,
      dataIndex: "startDate",
      render: (startDate) => (
        <div>
          <div
            className="dateAndTimeOfView"
            style={{ fontWeight: "400", fontSize: "14px" }}
          >
            {startDate}
          </div>
        </div>
      ),
    },
    {
      title: "End Date",
      // width: 220,
      dataIndex: "endDate",
      render: (endDate) => (
        <div>
          <div
            className="dateAndTimeOfView"
            style={{ fontWeight: "400", fontSize: "14px" }}
          >
            {endDate}
          </div>
        </div>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      // width: 250,
      render: (priority) => {
        return (
          <div>
            {priority === "High" ? (
              <Badge status="error" text="High" />
            ) : priority === "Medium" ? (
              <Badge status="warning" text="Medium" />
            ) : (
              <Badge status="success" text="Low" />
            )}
          </div>
        );
      },
    },
    {
      title: "Task Completed",
      dataIndex: "taskCompleted",
      // width: 250,
      render: (taskCompleted: any) => {
        // console.log("rendering the table data", taskCompleted);
        return (
          <div>
            <Badge
              status={
                taskStatusHelperObjectReverseWarning?.[`${taskCompleted}`]
              }
              text={taskStatusHelperObjectReverse?.[`${taskCompleted}`]}
            />
          </div>
        );
      },
    },

    {
      title: "Edit Task",
      render: () => {
        return (
          <div className="flex flex-row justify-start ml-[0px] items-center  text-slate-400 gap-[10px] ml-20 cursor-pointer" onClick={() => showModal()}>
            <FiEdit size={24} />
          </div>
        );
      },
    },
  ];

  console.log('record inavasvasd',assignedTaskArray[0])

  return (
    <div className="w-full mt-[30px]">
      <Spin spinning={isEngagementAssignedTasksLoading} tip="Loading...">
        <div className="md:block hidden">
          <Table<DataType>
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: "max-content" }}
            locale={{
              emptyText: (
                <div className="grid place-items-center grid-cols-7 justify-center w-[97%] rounded-[8px] border-none border-[#CBD5E1]">
                  <div className="flex items-center  text-slate-400">
                    {/* <i className="ri-user-add-line text-xl" />{" "} */}
                    {/* Antd icon or your own */}
                    <LuUserPlus size={24} />
                  </div>
                  <div className="flex items-center  flex-row text-slate-400">
                    <Progress
                      percent={0}
                      showInfo={false}
                      strokeColor="#CBD5E1"
                    />
                    <span>0%</span>
                  </div>
                  <div className="flex items-center  text-slate-400">
                    {/* <i className="ri-calendar-add-line text-xl" /> */}
                    <LuCalendarPlus size={24} />
                  </div>
                  <div className="flex items-center  text-slate-400">
                    {/* <i className="ri-calendar-add-line text-xl" /> */}
                    <LuCalendarPlus size={24} />
                  </div>
                  <div className="flex items-center  text-slate-400">
                    {/* <i className="ri-flag-line text-xl" /> */}
                    <CgFlag size={24} />
                  </div>
                  <div className="flex items-center text-slate-600 gap-[10px]">
                    <Badge color="#FACC15" />
                    <div>Pending</div>
                  </div>

                  <div className="flex items-center  text-slate-400 gap-[10px] ml-20">
                    <FiEdit size={24} />
                  </div>
                </div>
              ),
            }}
            components={{
              table: (props: any) => (
                <table
                  {...props}
                  className="min-w-full border-collapse border-[#CBD5E1] border !rounded-[8px]"
                >
                  {props.children}
                </table>
              ),
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    className="first:border-l-0 !bg-[#CBD5E14D] px-4 py-2 text-left text-sm font-semibold text-[#1E293B] !border-[#CBD5E1] border-l border-b"
                  >
                    {props.children}
                  </th>
                ),
              },
            }}
          />
        </div>

        <div className="md:hidden block border-collapse border-[#CBD5E1] border rounded-[8px]">
          {assignedTaskArray.map((item: any, index) => (
            <table key={index} className="w-full table-auto">
              <tr>
                <td className="bg-[#CBD5E14D] border-r border-[#CBD5E1] px-4 py-2 text-left text-sm font-semibold text-[#1E293B]">
                  Assigned to
                </td>
                <td className="px-4">
                  <div>
                    <div className="userName" style={{ fontWeight: "700" }}>
                      {item?.assigned_to?.name}
                    </div>
                    <div className="userEmailId">
                      {item?.assigned_to?.email}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="bg-[#CBD5E14D] border-r border-[#CBD5E1] px-4 py-2 text-left text-sm font-semibold text-[#1E293B]">
                  Progress
                </td>
                <td className="px-4">
                  <Progress percent={item?.progress || 0} status="active" />
                </td>
              </tr>
              <tr>
                <td className="bg-[#CBD5E14D] border-r border-[#CBD5E1] px-4 py-2 text-left text-sm font-semibold text-[#1E293B]">
                  Start
                </td>
                <td className="px-4">
                  <div
                    className="dateAndTimeOfView"
                    style={{ fontWeight: "400", fontSize: "14px" }}
                  >
                    {item?.start_date}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="bg-[#CBD5E14D] border-r border-[#CBD5E1] px-4 py-2 text-left text-sm font-semibold text-[#1E293B]">
                  End
                </td>
                <td className="px-4">
                  <div
                    className="dateAndTimeOfView"
                    style={{ fontWeight: "400", fontSize: "14px" }}
                  >
                    {item?.end_date}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="bg-[#CBD5E14D] border-r border-[#CBD5E1] px-4 py-2 text-left text-sm font-semibold text-[#1E293B]">
                  Priority
                </td>
                <td className="px-4">
                  <div>
                    {item?.priority === "High" ? (
                      <Badge status="error" text="High" />
                    ) : item?.priority === "Medium" ? (
                      <Badge status="warning" text="Medium" />
                    ) : (
                      <Badge status="success" text="Low" />
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="bg-[#CBD5E14D] border-r border-[#CBD5E1] px-4 py-2 text-left text-sm font-semibold text-[#1E293B]">
                  Status
                </td>
                <td className="px-4">
                  {/* <div>
                    {item?.status === "pending" ? (
                      <Badge status="warning" text="Pending" />
                    ) : (
                      <Badge status="success" text="Completed" />
                    )}
                    
                  </div> */}
                </td>
              </tr>
            </table>
          ))}
        </div>
      </Spin>
      <SendReminderModal
        isModalOpen={isModalOpen}
        handleSendReminder={handleSendReminder}
        handleCancel={handleCancel}
        setNotificationProps={null}
        preselectedDataKey={assignedTaskArray[0]?.['id']}
        preselectedDataName={assignedTaskArray[0]?.['task_name']}
        heading={"Edit Task"}
      />
    </div>
  );
};

export default TableEngagement;
