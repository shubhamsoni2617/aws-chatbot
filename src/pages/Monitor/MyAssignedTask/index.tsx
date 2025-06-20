import { Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import TableMyAssignedTask from "./TableMyAssignedTask";
import { useState } from "react";
import "@/components/MapFilterComponent/index.css";
import TablePublicAssignedTask from "./TablePublicAssignedTask";
import DateFeilds from "./components/DateFeilds";
import UserNameSearchFeild from "./components/UserNameSearchFeild";
import DropDownsSection from "./components/DropDownsSection";
import UserNameSearchFeildMobileView from "./componentsMobileView/UserNameSearchFeild";
import DateFeildsMobileView from "./componentsMobileView/DateFeilds";
import DropDownSectionMobileView from "./componentsMobileView/DropDownSection";

const MyAssignedTask = ({
  taskSearchValue,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  setTotalItems,
  isMyAssignedTask,
}: {
  taskSearchValue: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  isMyAssignedTask: boolean;
}) => {
  const [countrySelected, setCountrySelected] = useState("All");
  const [department, setDepartment] = useState();
  const [departmentId, setDepartmentId] = useState(null);
  const [priority, setPriority] = useState(null);
  const [kpi, setkpi] = useState();
  const [countryIds, setCountryIds] = useState<any>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [userName, setUserName] = useState("");

  return (
    <div>
      {/* filter section */}
      <div className="flex flex-row mt-5 items-center">
        {/* Desktop filter */}
        <div className="flex-row w-full items-center justify-between md:flex hidden gap-[10px]">
          <DateFeilds
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />

          <UserNameSearchFeild userName={userName} setUserName={setUserName} />

          <DropDownsSection
            setCountrySelected={setCountrySelected}
            countrySelected={countrySelected}
            setCountryIds={setCountryIds}
            department={department}
            setDepartment={setDepartment}
            setDepartmentId={setDepartmentId}
            priority={priority}
            setPriority={setPriority}
            kpi={kpi}
            setkpi={setkpi}
          />
        </div>

        {/* Mobile filter */}
        <div className="flex w-full md:hidden">
          <Collapse
            accordion
            className="border border-[#c847e8] rounded-[25px] text-center h-[35px] w-full filter-collapse"
            expandIcon={({ isActive }) => (
              <DownOutlined
                style={{ color: "#c847e8" }}
                rotate={isActive ? 180 : 0}
              />
            )}
            items={[
              {
                key: "1",
                label: "Filter",
                styles: {
                  header: {
                    padding: "5px 16px",
                    backgroundColor: "#FFF",
                    borderRadius: "25px",
                    borderColor: "#c847e8",
                    color: "c847e8",
                  },
                  body: {
                    border: "1px solid #d9d9d9",
                    borderRadius: "5px",
                    background: "#FFF",
                  },
                },
                children: (
                  <div className="flex flex-col gap-[16px]">
                    <UserNameSearchFeildMobileView
                      userName={userName}
                      setUserName={setUserName}
                    />

                    <DateFeildsMobileView
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      startDate={startDate}
                      endDate={endDate}
                    />

                    <DropDownSectionMobileView
                      setCountrySelected={setCountrySelected}
                      countrySelected={countrySelected}
                      setCountryIds={setCountryIds}
                      department={department}
                      setDepartment={setDepartment}
                      setDepartmentId={setDepartmentId}
                      priority={priority}
                      setPriority={setPriority}
                      kpi={kpi}
                      setkpi={setkpi}
                    />
                  </div>
                ),
              },
            ]}
            expandIconPosition="end"
          />
        </div>
      </div>

      {isMyAssignedTask && (
        <div className="overflow-x-auto">
          <TableMyAssignedTask
            taskSearchValue={taskSearchValue}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setTotalItems={setTotalItems}
            startDate={startDate}
            endDate={endDate}
            userNameFilter={userName}
            countrySelectedFilter={countrySelected}
            priorityFilter={priority}
            kpi={kpi}
            departmentId={departmentId}
            countryIds={countryIds}
          />
        </div>
      )}

      {!isMyAssignedTask && (
        <div className="overflow-x-auto">
          <TablePublicAssignedTask
            taskSearchValue={taskSearchValue}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setTotalItems={setTotalItems}
            startDate={startDate}
            endDate={endDate}
            userNameFilter={userName}
            countrySelectedFilter={countrySelected}
            priorityFilter={priority}
            kpi={kpi}
            departmentId={departmentId}
            countryIds={countryIds}
          />
        </div>
      )}
    </div>
  );
};

export default MyAssignedTask;
