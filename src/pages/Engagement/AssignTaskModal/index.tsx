import { Badge, DatePicker, DatePickerProps, Input, Modal } from "antd";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import UIButton from "@/components/ui/UIButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";
import {
  engagementAssignTask,
  getEngagementAssignedTasks,
} from "@/store/actions";
import { Select } from "antd";
import { toast } from "react-toastify";

const { Option } = Select;

const extractErrorMessages = (errorsObj: any): string[] => {
  const messages: string[] = [];
  for (const key in errorsObj) {
    if (Array.isArray(errorsObj[key])) {
      messages.push(...errorsObj[key]);
    } else if (typeof errorsObj[key] === "object" && errorsObj[key] !== null) {
      messages.push(...extractErrorMessages(errorsObj[key]));
    }
  }
  return messages;
};

const AssignTaskModal = (props: any) => {
  const {
    isModalOpen,
    setIsModalOpen,
    taskName,
    engagementId,
    kpi,
  } = props;
  const { orgIDRedux, userEmail, userName, userId } = useAppSelector(
    (store) => store.profile
  );
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [priority, setPriority] = useState<string>("High");
  const [taskCompleted, setTaskCompleted] = useState<string>("In Progress");
  const [taskNameState, setTaskNameState] = useState<string>(taskName);
  const [selectedStatus, setSelectedStatus] = useState({
    text: "In Progress",
    status: "warning",
  });
  const [selectedPriority, setSelectedPriority] = useState({
    text: "High",
    status: "error",
  });
  console.log(selectedStatus, selectedPriority);
  const [selectedUser, setSelectedUser] = useState("Assign To");
  const [selectedUserEmail, setSelectedUserEmail] = useState();
  const dispatch = useAppDispatch();

  const { organizationUsersData, selectedLocationIds, selectedDepartmentIds } =
    useAppSelector((store) => store?.userData);

  const items3: any[] = Array.isArray(organizationUsersData)
    ? organizationUsersData.map((item: any, i: number) => ({
        label: `${item?.first_name} ${item?.last_name}`,
        key: `dynamic-${i}`,
        email: `${item?.email}`,
        icon: <UserOutlined />,
      }))
    : [];

  const handleCancel = () => {
    setIsModalOpen(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setPriority("High"); // Reset with proper default value
    setTaskCompleted("In Progress"); // Reset with proper default value
    setSelectedStatus({ text: "In Progress", status: "warning" });
    setSelectedPriority({ text: "High", status: "error" });
    setSelectedUser("Assign To");
    setSelectedUserEmail(undefined);
    // setNotificationProps({
    //   visible: false,
    //   type: "info",
    //   title: "",
    //   message: "",
    // });
  };

  const formatDateToISO = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString();
  };

  const onStartDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setStartDate(
      typeof dateString === "string" && dateString
        ? formatDateToISO(dateString)
        : ""
    );
  };

  const onEndDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setEndDate(
      typeof dateString === "string" && dateString
        ? formatDateToISO(dateString)
        : ""
    );
  };

  const handleAddTask = async () => {
    const orgId = orgIDRedux;
    const engagement_id = engagementId;
    const assignToName = selectedUser;
    const assignToEmail = selectedUserEmail;
    const assignToUserId = "3";
    const start_date = startDate;
    const end_date = endDate;

    console.log("Priority:", priority); // Debug log
    console.log("Status:", taskCompleted); // Debug log
    console.log("Assigned To Email:", assignToEmail);

    const formdata = new FormData();
    formdata.append("org_id", orgId ? String(orgId) : "");
    formdata.append("engagement_id", engagement_id);
    formdata.append("assigned_to[name]", assignToName);
    formdata.append("assigned_to[email]", String(assignToEmail));
    formdata.append("assigned_to[user_id]", assignToUserId);
    formdata.append("start_date", String(start_date));
    formdata.append("end_date", String(end_date));
    formdata.append("priority", String(priority));
    // formdata.append("status", String(taskCompleted));
    formdata.append("status", "pending");

    formdata.append("task_name", taskNameState);
    formdata.append("assigned_by[name]", userName ? userName : "");
    formdata.append("assigned_by[email]", userEmail ? userEmail : "");
    formdata.append("assigned_by[user_id]", userId.toString());
    selectedLocationIds?.forEach((locationId: string) => {
      formdata?.append("location_ids[]", locationId);
    });
    formdata.append("department_id", String(selectedDepartmentIds));
    formdata.append("kpi", kpi);

    // console.log("Form Data Priority:", formdata.get("priority"));
    // console.log("Form Data Status:", formdata.get("status"));

    // Commented out API call for testing
    try {
      const response = await dispatch(engagementAssignTask(formdata));
      console.log("Add Task to user response", response);
      if (response?.payload?.message?.includes("Task assigned successfully.")) {
        // setTimeout(() => {
        //   setNotificationProps({
        //     visible: true,
        //     type: "success",
        //     title: "Success",
        //     message: "Step added successfully",
        //   });
        // }, 700);
        toast.success("Step added successfully");
        dispatch(
          getEngagementAssignedTasks({
            org_id: orgId,
            engagement_id: engagement_id,
          })
        );
        setIsModalOpen(false);
      } else {
        const errorMessages = extractErrorMessages(
          response?.payload?.errors || {}
        );
        // setNotificationProps({
        //   visible: true,
        //   type: "error",
        //   title: "Error",
        //   message: errorMessages.join(" "),
        // });
        toast.error(errorMessages.join(" "));
      }
    } catch (error) {
      console.error("Error in handleSaveReport:", error);
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Error",
      //   message: "Something went wrong. Please try again later.",
      // });
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleAddTask}
      onCancel={handleCancel}
      width={"45%"}
      footer={null}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "18px",
            marginBottom: "20px",
          }}
        >
          <p>Assign Task</p>
        </div>
        <div>
          <div style={{ fontSize: "14px", color: "#94A3B8" }}>Task name:</div>
          <Input
            style={{
              borderWidth: "1px",
              padding: "7px",
              borderRadius: "4px",
              fontWeight: 500,
              fontSize: "14px",
            }}
            value={taskNameState}
            onChange={(e) => setTaskNameState(e.target.value)}
          />
          {/* {taskName} */}
          {/* </Input> */}
        </div>

        <div className="flex flex-row justify-center items-center mt-[20px] gap-[20px]">
          {/* <div className="flex-1">
            <div style={{ fontSize: "14px", color: "#94A3B8" }}>
              Task Completed:
            </div>
            <Select
              value={taskCompleted} // Use the state variable directly
              style={{ width: "100%" }}
              onChange={(value) => {
                setTaskCompleted(value); // Set the actual selected value
                
                // Update the display object separately
                const statusMap: {
                  [key: string]: { text: string; status: string };
                } = {
                  "Pending": { text: "Pending", status: "error" },
                  "In Progress": { text: "In Progress", status: "warning" },
                  "Completed": { text: "Completed", status: "success" },
                };
                setSelectedStatus(statusMap[value] || statusMap["In Progress"]);
              }}
            >
              <Option value="Pending">
                <Badge status="error" text="Pending" />
              </Option>
              <Option value="In Progress">
                <Badge status="warning" text="In Progress" />
              </Option>
              <Option value="Completed">
                <Badge status="success" text="Completed" />
              </Option>
            </Select>
          </div> */}

          <div className="flex-1">
            <div style={{ fontSize: "14px", color: "#94A3B8" }}>Priority</div>
            <Select
              value={priority} // Use the state variable directly
              style={{ width: "100%" }}
              onChange={(value) => {
                setPriority(value); // Set the actual selected value

                // Update the display object separately
                const priorityMap: {
                  [key: string]: { text: string; status: string };
                } = {
                  High: { text: "High", status: "error" },
                  Medium: { text: "Medium", status: "warning" },
                  Low: { text: "Low", status: "success" },
                };
                setSelectedPriority(priorityMap[value] || priorityMap["High"]);
              }}
            >
              <Option value="High">
                <Badge status="error" text="High" />
              </Option>
              <Option value="Medium">
                <Badge status="warning" text="Medium" />
              </Option>
              <Option value="Low">
                <Badge status="success" text="Low" />
              </Option>
            </Select>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <div style={{ fontSize: "14px", color: "#94A3B8" }}>Assigned:</div>
          <Select
            value={selectedUser}
            style={{ width: "100%" }}
            onChange={(_: any, option: any) => {
              console.log("Option", _);
              setSelectedUser(option.label);
              setSelectedUserEmail(option.email);
            }}
            options={items3.map((user) => ({
              label: user.label,
              value: user.key,
              email: user.email,
            }))}
          />
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            // gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              // justifyContent: "",
              alignItems: "center",
              gap:'10px'
            }}
          >
            <div style={{ fontSize: "14px", color: "#94A3B8" , flex:1}}>
              Start Date:
            </div>
            <div style={{ fontSize: "14px", color: "#94A3B8" , flex:1}}>End Date:</div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <DatePicker
              onChange={onStartDateChange}
              value={startDate ? dayjs(startDate) : null}
              style={{ width: "100%" }}
              
              // showTime
            />

            <DatePicker
              onChange={onEndDateChange}
              value={endDate ? dayjs(endDate) : null}
              style={{ width: "100%" }}
              // showTime
            />
          </div>
        </div>

        <div className="mt-[20px] flex justify-end gap-[8px]">
          <UIButton
            text="Cancel"
            color="#c847e8"
            background="#fff"
            onClick={handleCancel}
            borderColor="#c837e8"
          />
          <UIButton
            text="Assign Task"
            color="#fff"
            background="#c847e8"
            onClick={handleAddTask}
            borderColor="#c837e8"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AssignTaskModal;
