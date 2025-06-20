import { Select } from "antd";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const KpiDropdown = (props: any) => {
  const { kpi, setKpi } = props;
  //   const { departments } = useAppSelector((store) => store.userData);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const priorityList = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Revenue Per Employee",
      label: "Revenue Per Employee",
    },
    {
      value: "Turnover Rate",
      label: "Turnover Rate",
    },
    {
      value: "Absenteeism Rate",
      label: "Absenteeism Rate",
    },
  ];
  // console.log("kpi data inthis page", kpi);
  return (
    <Select
      suffixIcon={
        openDropdown === "kpi" ? (
          <GoChevronUp size={16} />
        ) : (
          <GoChevronDown size={16} />
        )
      }
      className={`${
        props.className ? props.className : "w-[80px]"
      } !border-none !shadow-none !bg-transparent custom-no-border-select`}
      placeholder="All"
      onChange={(value: string) => {
        setKpi(value);
        // console.log("kpi data inthis page", value);
      }}
      value={kpi}
      options={priorityList}
      onDropdownVisibleChange={(open) => {
        setOpenDropdown(open ? "kpi" : null);
      }}
      style={{
        border: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default KpiDropdown;
