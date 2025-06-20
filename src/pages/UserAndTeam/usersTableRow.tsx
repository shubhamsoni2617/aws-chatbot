import {
  Checkbox,
  CheckboxProps,
  Dropdown,
  DropdownProps,
  MenuProps,
  Space,
} from "antd";
import { useState } from "react";
import UserAndTeamButtonComponent from "./compoenets/userAndTeamsButton";
import TableUserAndTeam from "./TableUserAndTeam";
import { PiUserPlusThin } from "react-icons/pi";
import NewUserModal from "./NewUserModal";
import { DownOutlined } from "@ant-design/icons";
import DeleteUserButton from "./compoenets/deleteUserButton";

const UserTableRow = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedLastActive, setSelectedLastActive] = useState<string>("");
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const DropDownComponent = (props: any) => {
    const { items, label } = props;
    const [open, setOpen] = useState(false);

    const handleMenuClick: MenuProps["onClick"] = (e) => {
      // Prevent dropdown from closing on any menu item click
      e.domEvent?.stopPropagation();

      // Remove auto-close logic - dropdown will only close when clicked outside
      // or when manually controlled
    };

    const handleOpenChange: DropdownProps["onOpenChange"] = (
      nextOpen,
      info
    ) => {
      if (info.source === "trigger" || nextOpen) {
        setOpen(nextOpen);
      }
    };

    return (
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        onOpenChange={handleOpenChange}
        open={open}
        trigger={["click"]} // Explicitly set trigger
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space
            style={{
              display: "flex",
              flexDirection: "row",
              width: "150px",
              justifyContent: "space-between",
              color: "#475569",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {label}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    );
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeCheckbox: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const items1: MenuProps["items"] = [
    {
      key: "Deactivate",
      label: <Checkbox onChange={onChangeCheckbox}>Deactivate</Checkbox>,
    },
    {
      key: "Invite Pending",
      label: <Checkbox onChange={onChangeCheckbox}>Invite Pending</Checkbox>,
    },
    {
      key: "Invite Bounced",
      label: <Checkbox onChange={onChangeCheckbox}>Invite Bounced</Checkbox>,
    },
    {
      key: "Invite Accepted",
      label: <Checkbox onChange={onChangeCheckbox}>Invite Accepted</Checkbox>,
    },
  ];

  const items2: MenuProps["items"] = [
    {
      key: "All",
      label: <p>All</p>,
    },
    {
      key: "0",
      label: <p>Today</p>,
    },
    {
      key: "1",
      label: <p>Yesterday</p>,
    },
    {
      key: "7",
      label: <p>Last 7 days</p>,
    },
    {
      key: "14",
      label: <p>Last 14 days</p>,
    },
    {
      key: "30",
      label: <p>Last 30 days</p>,
    },
    {
      key: "60",
      label: <p>Last 60 days</p>,
    },
    {
      key: "90",
      label: <p>Last 90 days</p>,
    },
    {
      key: "180",
      label: <p>Last 180 days</p>,
    },
    {
      key: "365",
      label: <p>Last 365 days</p>,
    },
  ];

  const selectedRow = (selectedRows: any) => {
    console.log("Selected Rows from Child:", selectedRows);
    setSelectedRowsData(selectedRows);
    console.log(selectedRowsData);
  };

  return (
    <div className="bg-white shadow-md rounded-xl">
      <div className="flex justify-between items-center p-[20px] pb-0 mt-[20px] md:flex-row flex-col gap-[16px]">
        {/* <Spin spinning={innerFilterLoading}> */}
        <div className="dropDownSection flex">
          <div>
            <DropDownComponent
              items={items1.map((item: any) => ({
                ...item,
                label: (
                  <Checkbox
                    checked={selectedStatus.includes(String(item?.key))}
                    onChange={(e) => {
                      let updatedStatus = [...selectedStatus];
                      if (e.target.checked) {
                        updatedStatus.push(item.key);
                      } else {
                        updatedStatus = updatedStatus.filter(
                          (k) => k !== item.key
                        );
                      }
                      setSelectedStatus(updatedStatus);
                    }}
                  >
                    {item.label.props.children}
                  </Checkbox>
                ),
              }))}
              label="Status"
            />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <DropDownComponent
              items={items2.map((item: any) => ({
                ...item,
                label: (
                  <div
                    style={{
                      fontWeight:
                        selectedLastActive === item.key ? "bold" : "normal",
                      color:
                        selectedLastActive === item.key ? "#c847e8" : "#475569",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedLastActive(item.key)}
                  >
                    {item.label.props.children}
                  </div>
                ),
              }))}
              label="Last Active"
            />
          </div>
        </div>
        {/* </Spin> */}

        <div className="buttonSection flex md:flex-row flex-col gap-[16px] w-full md:w-auto">
          <div className="w-full md:w-auto">
            <DeleteUserButton selectedRowsData={selectedRowsData}/>
          </div>
          <div className="w-full md:w-auto">
            <UserAndTeamButtonComponent
              onClick={showModal}
              icon={<PiUserPlusThin size={20} />}
              text="Upload New User"
              backgroundcolor={"#C847E8"}
              textcolor="#fff"
              borderColor="#C847E8"
            />
          </div>
        </div>
      </div>

      <div style={{ padding: "20px", marginBottom: "20px", marginTop: "4px" }}>
        <TableUserAndTeam
          selectedRow={selectedRow}
          selectedLastActive={selectedLastActive}
          selectedStatus={selectedStatus}
        />
      </div>

      <NewUserModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        setNotificationProps={null}

        // handleOk={}
      />
    </div>
  );
};

export default UserTableRow;
