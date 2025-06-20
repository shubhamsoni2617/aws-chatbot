import { Select } from "antd";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const PriorityDropdown = (props: any) => {
  const { priority, setPriority } = props;
  //   const { departments } = useAppSelector((store) => store.userData);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const priorityList = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "High",
      label: "High",
    },
    {
      value: "Medium",
      label: "Medium",
    },
    {
      value: "Low",
      label: "Low",
    },
  ];
  //   console.log("priority data inthis page", priority);
  return (
    <Select
      suffixIcon={
        openDropdown === "priority" ? (
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
        setPriority(value);
        console.log("priority data inthis page", value);
      }}
      value={priority}
      options={priorityList}
      onDropdownVisibleChange={(open) => {
        setOpenDropdown(open ? "priority" : null);
      }}
      style={{
        border: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default PriorityDropdown;
