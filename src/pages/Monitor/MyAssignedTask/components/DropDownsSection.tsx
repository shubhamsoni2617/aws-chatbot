import CountryDropdown from "../DropDowns/countryDropdown";
import DepartmentDropDown from "../DropDowns/departmentDropdown";
import PriorityDropdown from "../DropDowns/priority";
import KpiDropdown from "../DropDowns/kpiDropdown";

function DropDownsSection(props: any) {
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
      <div
        className="CountrySelection"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="mr-[5px] flex flex-row justify-center items-center">
          Country:
        </div>
        <CountryDropdown
          setCountrySelected={setCountrySelected}
          countrySelected={countrySelected}
          setCountryIds={setCountryIds}
        />
      </div>

      <div className="DepartmentSelection flex flex-row items-center">
        <div className="mr-[5px]">Department:</div>
        <DepartmentDropDown
          department={department}
          setDepartment={setDepartment}
          setDepartmentId={setDepartmentId}
        />
      </div>

      <div className="PrioritySelection flex flex-row items-center">
        <div className="mr-[5px]">Priority:</div>
        <PriorityDropdown priority={priority} setPriority={setPriority} />
      </div>

      <div className="KPISelection flex flex-row items-center">
        <div className="mr-[5px]">KPI:</div>
        <KpiDropdown kpi={kpi} setKpi={setkpi} />
      </div>
    </>
  );
}

export default DropDownsSection;
