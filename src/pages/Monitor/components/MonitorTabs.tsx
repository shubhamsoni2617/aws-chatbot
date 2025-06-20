import { Tabs, TabsProps } from "antd";
import MyAssignedTask from "../MyAssignedTask";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

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

const MonitorTabs = (props: any) => {
  const {
    searchInput,
    myTasksCurrentPage,
    myTasksPageSize,
    publicTasksCurrentPage,
    publicTasksPageSize,
    setMyTasksCurrentPage,
    setMyTasksPageSize,
    setMyTasksTotalItems,
    setPublicTasksCurrentPage,
    setPublicTasksPageSize,
    setPublicTasksTotalItems,
    setActiveTab,
  } = props;
  const { userEmail } = useAppSelector((store) => store.profile);
  const { monitorTaskData } = useAppSelector((store) => store.monitor);
  const [myAssignedTask, setMyAssignedTask] = useState<any>();
  const [publicAssignedTask, setPublicAssignedTask] = useState<any>();
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (monitorTaskData) {
      setMyAssignedTask(
        monitorTaskData?.assigned_task?.filter(
          (task: any) => task?.assigned_to?.email === userEmail
        )?.length
      );
      setPublicAssignedTask(
        monitorTaskData?.assigned_task?.filter((task: any) => task)?.length
      );
    }
  }, [monitorTaskData]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <TabsLabel
          label="My assigned tasks"
          number={myAssignedTask?.toString()}
        />
      ),
      children: (
        <MyAssignedTask
          taskSearchValue={searchInput}
          currentPage={myTasksCurrentPage}
          setCurrentPage={setMyTasksCurrentPage}
          pageSize={myTasksPageSize}
          setPageSize={setMyTasksPageSize}
          setTotalItems={setMyTasksTotalItems}
          isMyAssignedTask={true}
        />
      ),
    },
    {
      key: "2",
      label: (
        <TabsLabel
          label="Public assigned tasks"
          number={publicAssignedTask?.toString()}
        />
      ),
      children: (
        <MyAssignedTask
          taskSearchValue={searchInput}
          currentPage={publicTasksCurrentPage}
          setCurrentPage={setPublicTasksCurrentPage}
          pageSize={publicTasksPageSize}
          setPageSize={setPublicTasksPageSize}
          setTotalItems={setPublicTasksTotalItems}
          isMyAssignedTask={false}
        />
      ),
    },
  ];

  return (
    <div
      className="bg-white rounded-xl p-5 mt-[20px]"
      style={{ boxShadow: "0px 0px 8px 0px #00000014" }}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        tabBarStyle={{ marginLeft: "12px" }}
      />
    </div>
  );
};

export default MonitorTabs;
