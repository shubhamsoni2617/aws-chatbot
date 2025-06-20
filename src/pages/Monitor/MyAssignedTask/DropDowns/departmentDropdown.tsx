import { useAppSelector } from "@/store/hooks";
import { transformDepartmentsFilterData } from "@/utils/transfromData/transformFilters";
import { Select } from "antd";
import { useMemo, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import "./dropdown.css";
const DepartmentDropDown = (props: any) => {
  const { department, setDepartment, setDepartmentId } = props;
  const { departments } = useAppSelector((store) => store.userData as any);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const transformedDepartments = useMemo(
    () =>
      Array.isArray(departments)
        ? transformDepartmentsFilterData(departments)
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [departments]
  );
  // console.log("department data inthis page", department);
  return (
    <Select
      suffixIcon={
        openDropdown === "department" ? (
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
        setDepartment(value);
        const department = departments?.find((item:any) => item?.name === value);
        setDepartmentId(department?.id || null);
        // setDepartmentId(departments ? departments.find((item: any) => item.label === value)?.key : null);
        // console.log("department data inthis page", value);
      }}
      value={department}
      options={transformedDepartments?.data?.map((item: any) => ({
        value: item.label,
        label: item.label,
      }))}
      onDropdownVisibleChange={(open) => {
        setOpenDropdown(open ? "department" : null);
      }}
      style={{
        border: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default DepartmentDropDown;
