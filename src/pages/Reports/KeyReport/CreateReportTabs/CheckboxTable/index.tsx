import { Checkbox } from "antd";
import { useEffect, useState } from "react";

type CheckboxOptionsProps = {
  textValue: string;
  onClick: () => void;
};

const CheckboxGroup = Checkbox.Group;

const ColumnOneOptions = [
  "Revenue Per Employee",
  "Retention Rate",
  "First Year Retention Rate",
  "Internal Mobility Rate",
  "Turnover Rate",
];

const ColumnTwoOptions = [
  "Absenteeism Rate",
  "Cost of Vacancy",
  "Turnover Costs",
  "Performance Deficit Impact",
  "Absenteeism costs",
];

// Merge the two columns into one
const AllOptions = [...ColumnOneOptions, ...ColumnTwoOptions];

const CheckboxOptions = (props: CheckboxOptionsProps) => {
  const { textValue, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        fontWeight: "400",
        fontSize: "14px",
        color: "#94A3B8",
        cursor: "pointer",
      }}
    >
      {textValue}
    </div>
  );
};

const CheckboxTable = (props: any) => {
  const {  handelCheckBoxData} = props;

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (checkedValues: string[]) => {
    setSelectedItems(checkedValues);
  };

  useEffect(() => {
    // handelCheckBoxData(selectedItems);
    handelCheckBoxData(selectedItems);
  }, [selectedItems]);

  const handleNone = () => {
    setSelectedItems([]); // Uncheck all checkboxes
  };

  const handleAll = () => {
    setSelectedItems(AllOptions); // Check all checkboxes
  };

  const handleInverse = () => {
    const invertedSelection = AllOptions.filter(
      (option) => !selectedItems.includes(option)
    );
    setSelectedItems(invertedSelection);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          
        }}
        className="pl-[20px] pr-[20px] pt-[12px] mb-[12px]"
      >
        <div
          style={{
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          Select KPI
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px"
          }}
        >
          <CheckboxOptions textValue="None" onClick={handleNone} />
          <CheckboxOptions textValue="Inverse" onClick={handleInverse} />
          <CheckboxOptions textValue="All" onClick={handleAll} />
        </div>
      </div>
      <div
        className="mb-[12px]"
      >
        <CheckboxGroup
          options={AllOptions}
          value={selectedItems}
          onChange={handleCheckboxChange}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            padding: "20px",
          }}
        />
      </div>
    </>
  );
};

export default CheckboxTable;
