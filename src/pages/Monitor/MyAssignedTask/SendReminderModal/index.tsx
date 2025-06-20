import {
  Avatar,
  Badge,
  DatePicker,
  DatePickerProps,
  // Dropdown,
  Input,
  // Menu,
  MenuProps,
  Modal,
  Select,
  // Space,
  Spin,
} from "antd";
import { DownOutlined, UpOutlined, UserOutlined } from "@ant-design/icons";
import UIButton from "@/components/ui/UIButton";
import React, { useState } from "react";
import profileImage from "../../../../assets/ProfileImage.png";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getEngagementAssignedTasks,
  getMonitorAssignedTasks,
  sendReminder,
} from "@/store/actions";
import { toast } from "react-toastify";
import { taskStatusHelperObject } from "@/utils/helper/objectValuePairHelper";
// import { profile } from "console";

interface SendReminderModal {
  isModalOpen: boolean;
  handleSendReminder: () => void;
  handleCancel: () => void;
  setNotificationProps: any;
  preselectedDataKey: any;
  preselectedDataName: any;
  heading: any;
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Badge status="error" text="Pending" />,
  },
  {
    key: "2",
    label: <Badge status="warning" text="In Progress" />,
  },
  {
    key: "3",
    label: <Badge status="success" text="Completed" />,
  },
];

const items2: MenuProps["items"] = [
  {
    key: "1",
    label: <Badge status="error" text="High" />,
  },
  {
    key: "2",
    label: <Badge status="warning" text="Medium" />,
  },
  {
    key: "3",
    label: <Badge status="success" text="Low" />,
  },
];

interface AssignToCustomLabelProps {
  email: string;
  name: string;
  profilePicture: any;
}

const AssignToCustomLabel: React.FC<AssignToCustomLabelProps> = ({
  email,
  name,
  // profilePicture,
}) => {
  return (
    <div className="flex flex-row gap-[16px]">
      <div>{name}</div>
      <Avatar className="h-[21px] w-[21px] rounded-full bg-[#f4d9fa] text-[#c847e8]">
        {name[0]}
      </Avatar>
      {/* <img src={profilePicture} className="h-[21px] w-[21px] rounded-full" /> */}
      <div>{email}</div>
    </div>
  );
};

const { TextArea } = Input;

const SendReminderModal = (props: SendReminderModal) => {
  const {
    isModalOpen,
    handleCancel,
    handleSendReminder,
    // setNotificationProps,
    preselectedDataKey,
    preselectedDataName,
    heading,
  } = props;
  console.log("send reminder props check", props);
  const dispatch = useAppDispatch();
  const [userNote, setUserNote] = useState<any>(null);
  // const orgID = profileData?.organization_id
  const { orgIDRedux, userEmail, userId, userName } = useAppSelector(
    (store) => store.profile
  );

  console.log("record", preselectedDataKey, preselectedDataName);

  // console.log("selected Data in this page for data", preselectedData?.key)
  // useEffect(() => {
  //   dispatch(getUsers({ organization_id: orgIDRedux }));
  // }, [isModalOpen]);

  const { organizationUsersData, isOrganizationUsersLoading } = useAppSelector(
    (store) => store?.userData
  );

  const items3: MenuProps["items"] = Array.isArray(organizationUsersData)
    ? organizationUsersData.map((item: any, i: number) => ({
        label: (
          <AssignToCustomLabel
            email={item?.email}
            name={`${item?.first_name} ${item?.last_name}`}
            profilePicture={profileImage}
          />
        ),
        key: `dynamic-${i}`,
        icon: <UserOutlined />,
      }))
    : [];

  // Add state variables for selected values
  const [taskStatus, setTaskStatus] = useState<string>("In Progress");
  const [priority, setPriority] = useState<string>("High");
  const [assignedTo, setAssignedTo] = useState<string>("Assign To");
  const [email, setEmail] = useState<string>("");
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  // Add state variables for dropdown open states
  const [isTaskStatusOpen, setIsTaskStatusOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isAssignedToOpen, setIsAssignedToOpen] = useState(false);

  // Modify handleMenuClick to handle different dropdowns
  const handleTaskStatusClick: MenuProps["onClick"] = (e) => {
    const selectedItem = items.find(
      (item: any) => item && "key" in item && item.key === e.key
    );
    if (
      selectedItem &&
      "label" in selectedItem &&
      selectedItem.label &&
      typeof selectedItem.label === "object" &&
      React.isValidElement(selectedItem.label) &&
      selectedItem.label.props &&
      selectedItem.label.props.text
    ) {
      setTaskStatus(selectedItem.label.props.text);
      console.log(
        taskStatusHelperObject?.[
          selectedItem.label.props.text as keyof typeof taskStatusHelperObject
        ]
      );
    } else if (
      selectedItem &&
      "label" in selectedItem &&
      typeof selectedItem.label === "string"
    ) {
      setTaskStatus(selectedItem.label);
      // console.log(selectedItem.label);
    }
  };

  const onStartDateChange: DatePickerProps["onChange"] = (date) => {
    if (date) {
      setStartDate(date.toISOString()); // "2025-05-13T08:00:00.000Z"
    } else {
      setStartDate(undefined);
    }
  };

  const onEndDateChange: DatePickerProps["onChange"] = (date) => {
    if (date) {
      setEndDate(date.toISOString());
    } else {
      setEndDate(undefined);
    }
  };

  const handlePriorityClick: MenuProps["onClick"] = (e) => {
    const selectedItem = items2.find(
      (item) => item && "key" in item && item.key === e.key
    );
    if (selectedItem && "label" in selectedItem && selectedItem.label) {
      if (
        typeof selectedItem.label === "object" &&
        React.isValidElement(selectedItem.label) &&
        selectedItem.label.props &&
        selectedItem.label.props.text
      ) {
        setPriority(selectedItem.label.props.text);
      } else if (typeof selectedItem.label === "string") {
        setPriority(selectedItem.label);
      }
    }
  };

  const handleAssignedToClick: MenuProps["onClick"] = (e) => {
    const selectedItem = items3.find((item: any) => item?.key === e.key) as any;
    if (selectedItem && "label" in selectedItem && selectedItem.label) {
      // console.log(selectedItem?.label?.props?.email)
      if (
        typeof selectedItem.label === "object" &&
        React.isValidElement(selectedItem.label)
      ) {
        setEmail(selectedItem.label.props?.email);
      }
      // If label is a React element, you may want to display a name instead of the whole element
      // For now, fallback to a default string or extract the name if possible
      if (typeof selectedItem.label === "string") {
        console.log(selectedItem);
        setAssignedTo(selectedItem.label);
      } else if (
        typeof selectedItem.label === "object" &&
        React.isValidElement(selectedItem.label) &&
        selectedItem.label.props &&
        selectedItem.label.props.name
      ) {
        setAssignedTo(selectedItem.label.props.name);
      } else {
        setAssignedTo("Assign To");
      }
    } else {
      setAssignedTo("Assign To");
    }
  };

  // Update menuProps with new click handlers
  // const menuProps1 = {
  //   items: items,
  //   onClick: handleTaskStatusClick,
  // };

  // const menuProps2 = {
  //   items: items2,
  //   onClick: handlePriorityClick,
  // };

  // const menuProps3 = {
  //   items: items3,
  //   onClick: handleAssignedToClick,
  // };

  const handleSendReminderClick = async () => {
    const formdata = new FormData();
    formdata.append("org_id", String(orgIDRedux) || "");
    formdata.append("task_id", preselectedDataKey);
    formdata.append("assigned_to[user_id]", "45"); //TODO Change when recieved in list of users
    formdata.append("assigned_to[name]", assignedTo);
    formdata.append("assigned_to[email]", email);
    formdata.append("progress", "60");
    formdata.append("start_date", startDate);
    formdata.append("end_date", endDate);
    formdata.append("priority", priority);
    formdata.append(
      "status",
      taskStatusHelperObject?.[
        taskStatus as keyof typeof taskStatusHelperObject
      ]
    );
    formdata.append("notes", userNote);
    formdata.append("task_name", preselectedDataName);
    formdata.append("assigned_by[name]", userName ? userName : "");
    formdata.append("assigned_by[email]", userEmail ? userEmail : "");
    formdata.append("assigned_by[user_id]", userId ? userId?.toString() : "");
    formdata.append("location_ids[]", "id1");
    formdata.append("location_ids[]", "id2");
    formdata.append("department_id", "departid");
    formdata.append("kpi", "retention rate");

    // console.log(requestBody);

    const response = await dispatch(sendReminder(formdata));

    console.log(response);
    if (response?.payload?.status === 200) {
      toast.success("Reminder sent successfully.");
      handleSendReminder();
      dispatch(
        getMonitorAssignedTasks({
          org_id: orgIDRedux,
        })
      );
      dispatch(
        getEngagementAssignedTasks({
          org_id: orgIDRedux,
          engagement_id: preselectedDataKey,
        })
      );
    } else {
      toast.error("Something went wrong. Please try again later.");
      handleSendReminder();
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleSendReminder}
      onCancel={handleCancel}
      footer={null}
      // className="w-[800px]"
      width={800}
      // className="z-2"
      style={{
        zIndex: 20000,
      }}
    >
      <Spin spinning={isOrganizationUsersLoading}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "18px",
              marginBottom: "20px",
            }}
          >
            <p>{heading}</p>
          </div>
          <div>
            <div className="font-[600] text-[14px] text-[#94A3B8] mb-[8px]">
              Task name:
            </div>
            <div
              style={{
                borderWidth: "1px",
                // padding: "7px",
                borderRadius: "4px",
                // fontWeight: 500,
                // fontSize: "14px",
              }}
              className="font-[600] text-[#1e293b] text-[16px] p-[12px]"
            >
              {preselectedDataName}
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexWrap: "wrap",
              gap: "16px", // Optional spacing between items
            }}
          >
            <div className="flex-1">
              <div className="font-[600] text-[14px] text-[#94A3B8] mb-[8px]">
                Task Completed:
              </div>
              <Select
                className="w-full h-[43px]"
                value={taskStatus}
                onDropdownVisibleChange={(open) => setIsTaskStatusOpen(open)}
                open={isTaskStatusOpen}
                onChange={(value) => setTaskStatus(value)}
                dropdownRender={(menu) => <div>{menu}</div>}
                suffixIcon={
                  isTaskStatusOpen ? <UpOutlined /> : <DownOutlined />
                }
                options={[
                  {
                    label: <Badge status="error" text="Pending" />,
                    value: "Pending",
                  },
                  {
                    label: <Badge status="warning" text="In Progress" />,
                    value: "In Progress",
                  },
                  {
                    label: <Badge status="success" text="Completed" />,
                    value: "Completed",
                  },
                ]}
              />
            </div>

            <div className="flex-1 ">
              <div className="font-[600] text-[14px] text-[#94A3B8] mb-[8px]">
                Priority
              </div>
              <Select
                className="w-full h-[43px]"
                value={priority}
                onDropdownVisibleChange={(open) => setIsPriorityOpen(open)}
                open={isPriorityOpen}
                onChange={(value) => setPriority(value)}
                dropdownRender={(menu) => <div>{menu}</div>}
                suffixIcon={isPriorityOpen ? <UpOutlined /> : <DownOutlined />}
                options={[
                  {
                    label: <Badge status="error" text="High" />,
                    value: "High",
                  },
                  {
                    label: <Badge status="warning" text="Medium" />,
                    value: "Medium",
                  },
                  {
                    label: <Badge status="success" text="Low" />,
                    value: "Low",
                  },
                ]}
              />
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div className="font-[600] text-[14px] text-[#94A3B8] mb-[8px]">
              Assigned:
            </div>
            {/* <div> */}
            <Select
              className="w-full h-[43px]"
              value={assignedTo}
              onDropdownVisibleChange={(open) => setIsAssignedToOpen(open)}
              open={isAssignedToOpen}
              suffixIcon={isAssignedToOpen ? <UpOutlined /> : <DownOutlined />}
              onChange={(value, option: any) => {
                console.log(value);
                setAssignedTo(option.label?.props?.name || "Assign To");
                setEmail(option.label?.props?.email || "");
              }}
              dropdownRender={(menu) => (
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {menu}
                </div>
              )}
              options={items3?.map((item: any) => ({
                value: item?.key,
                label: item?.label,
              }))}
            />
            {/* </div> */}
          </div>

          <div className="flex flex-col mt-[20px]">
            <div>
              <div className="font-[600] text-[14px] text-[#94A3B8] mb-[8px]">
                Date for completion:
              </div>
            </div>

            <div className="flex flex-row w-full gap-[16px]">
              <DatePicker
                onChange={onStartDateChange}
                className="flex-1 p-[12px] font-[400] text-[16px] text-[#1e293b]  h-[43px]"
              />

              <DatePicker
                onChange={onEndDateChange}
                className="flex-1 p-[12px] font-[400] text-[16px] text-[#1e293b]  h-[43px]"
              />
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <TextArea
              rows={4}
              placeholder="Add Note"
              onChange={(e: any) => setUserNote(e.target.value)}
              className="h-[150px] w-[750px] "
            />
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
              text="Send Reminder"
              color="#fff"
              background="#c847e8"
              onClick={handleSendReminderClick}
              borderColor="#c837e8"
            />
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default SendReminderModal;
