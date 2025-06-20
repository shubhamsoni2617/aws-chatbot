import React from "react";
import CountryDropdown from "../DropDowns/countryDropdown";
import DepartmentDropDown from "../DropDowns/departmentDropdown";
import PriorityDropdown from "../DropDowns/priority";
import KpiDropdown from "../DropDowns/kpiDropdown";

function DropDownSectionMobileView(props: any) {
  const {
    setCountrySelected,
    countrySelected,
    setCountryIds,
    department,
    setDepartment,
    setDepartmentId,
    priority,
    setPriority,
    kpi,
    setkpi,
  } = props;
  return (
    <>
      <div className="w-full flex justify-between">
        <div className="CountrySelection flex flex-row items-center">
          <div className="mr-[5px]">Country:</div>
          <CountryDropdown
            className="w-auto"
            setCountrySelected={setCountrySelected}
            countrySelected={countrySelected}
            setCountryIds={setCountryIds}
          />
        </div>

        <div className="DepartmentSelection flex flex-row items-center">
          <div className="mr-[5px]">Department:</div>
          <DepartmentDropDown
            className="w-auto"
            department={department}
            setDepartment={setDepartment}
            setDepartmentId={setDepartmentId}
          />
        </div>
      </div>

      <div className="w-full flex justify-between">
        <div className="PrioritySelection flex flex-row items-center">
          <div className="mr-[5px]">Priority:</div>
          <PriorityDropdown
            className="w-auto"
            priority={priority}
            setPriority={setPriority}
          />
        </div>

        <div className="KPISelection flex flex-row items-center">
          <div className="mr-[5px]">KPI:</div>
          <KpiDropdown kpi={kpi} setKpi={setkpi} className="w-auto" />
        </div>
      </div>
    </>
  );
}

export default DropDownSectionMobileView;
