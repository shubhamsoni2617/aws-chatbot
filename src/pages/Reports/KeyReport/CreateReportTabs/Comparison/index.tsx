import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { MdOutlineCompareArrows } from "react-icons/md";
import CheckboxTable from "../CheckboxTable";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  transformDepartmentsFilterData,
  transfromLocationsFilterData,
} from "@/utils/transfromData/transformFilters";
import UIButton from "@/components/ui/UIButton";
import { tranfromReportReduxForComparision } from "./helper";
import { reportFilter } from "@/store/reducers/createReport";
import { useNavigate } from "react-router-dom";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

type Props = {
  isComparision: boolean;
  getCheckBoxData: any;
  getComparisonData: any;
};

type DropDownProps = {
  dropdown: string;
  selectedValue: string;
  onSelect: (value: string) => void;
};

type CompareByRowComponentProps = {
  title: string;
  selectedValues: [string, string];
  onSelect: (index: number, value: string) => void;
  className: string;
};

type NotificationType = "success" | "info" | "warning" | "error";
// const items = [
//   { label: "Country 1", key: "1" },
//   { label: "Country 2", key: "2" },
//   { label: "Country 3", key: "3" },
//   { label: "Country 4", key: "4" },
// ];

// const Quarter = [
//   {
//     label: "Today",
//     key: "1",
//   },
//   {
//     label: "1st Quarter 2024",
//     key: "2",
//   },
//   {
//     label: " 2nd Quarter 2024",
//     key: "3",
//   },
//   {
//     label: "3rd Quarter 2024",
//     key: "4",
//   },
//   {
//     label: "4rd Quarter 2024",
//     key: "5",
//   },
//   {
//     label: "Annual",
//     key: "6",
//   }
// ];

const Quarter = [
  {
    label: "2024",
    key: "1",
  },
  {
    label: "2023",
    key: "2",
  },
  {
    label: "2022",
    key: "3",
  },
  // {
  //   label: "2022",
  //   key: "4",
  // },
  // {
  //   label: "2021",
  //   key: "5",
  // },
  // {
  //   label: "2022",
  //   key: "6",
  // },
];

const DropdownComponent = (props: DropDownProps) => {
  const { departments, locations } = useAppSelector((store) => store.userData);

  const transfromedDepoartementsData = useMemo(
    () =>
      Array.isArray(departments)
        ? transformDepartmentsFilterData(departments)
        : { companyAverage: "0%", predictedValue: "0%", data: [] },
    [departments]
  );

  const transfromedLocationsFilterData = useMemo(
    // () => (Array.isArray(locations) ? transfromLocationsFilterData(locations,searchParams.get("filterByAddress") ? `${searchParams.get("filterByAddress")+" "+searchParams.get("filterByState")+ " "+ searchParams.get("filterByCountry")}` : searchParams.get("filterByState")? searchParams.get("filterByState"):filterByCountry) : { companyAverage: "0%", predictedValue: "0%", data: [] }),
    () =>
      Array.isArray(locations)
        ? transfromLocationsFilterData(locations, null, null, null)
        : { companyAverage: "0%", predictedValue: "0%", data: [] },
    [locations]
  );

  const { dropdown, selectedValue, onSelect } = props;
  const menuItems =
    dropdown === "Country"
      ? transfromedLocationsFilterData?.["data"]
      : dropdown === "Period"
      ? Quarter
      : transfromedDepoartementsData["data"];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedOption =
      menuItems.find((item: any) => item.key === e.key)?.label || "";
    onSelect(selectedOption);
  };

  return (
    <div>
      <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
        <Button style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ color: "#94A3B8" }}>{selectedValue || "Select"}</div>
            <DownOutlined />
          </div>
        </Button>
      </Dropdown>
    </div>
  );
};

const CompareByRowComponent = (props: CompareByRowComponentProps) => {
  const { title, selectedValues, onSelect, className } = props;

  return (
    <div className={`${className}`}>
      <div className="text-[12px] font-[500] text-[#1e293b]">
        Compare by {title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px", // adjust as needed
        }}
      >
        <div style={{ flex: 1 }}>
          <DropdownComponent
            dropdown={title}
            selectedValue={selectedValues[0]}
            onSelect={(value) => onSelect(0, value)}
          />
        </div>

        <div
          style={{
            flex: 0.3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MdOutlineCompareArrows size={20} />
        </div>

        <div style={{ flex: 1 }}>
          <DropdownComponent
            dropdown={title}
            selectedValue={selectedValues[1]}
            onSelect={(value) => onSelect(1, value)}
          />
        </div>
      </div>
    </div>
  );
};


const ComparisonCreateReport = (props: Props) => {
  const { isComparision, getComparisonData } = props;
  const [periods, setPeriods] = useState<[string, string]>(["", ""]);
  const [departments, setDepartments] = useState<[string, string]>(["", ""]);
  const [countries, setCountries] = useState<[string, string]>(["", ""]);
  const [checkBoxData, setCheckBoxData] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { reportsData } = useAppSelector((store) => store.createReport);
  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });
  const handleSelect = (
    setState: React.Dispatch<React.SetStateAction<[string, string]>>,
    index: number,
    value: string
  ) => {
    setState((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated as [string, string];
    });
  };

  const handleCheckBoxData = (selectedItems: string[]) => {
    setCheckBoxData(selectedItems);
  };

  useEffect(() => {
    getComparisonData([countries, periods, departments]);
    // console.log("getComaprionsData",reportsData)
  }, [periods, departments, countries, checkBoxData, reportsData]);

  const navigate = useNavigate();
  const handleOnClick = () => {
    const val = tranfromReportReduxForComparision(
      periods,
      departments,
      countries,
      checkBoxData
    );
    const checkNotification =
      Object?.keys(val?.report_filters?.department).length === 0 ||
      Object?.keys(val?.report_filters?.location_ids[0]).length === 0 ||
      Object.keys(val?.report_filters?.period).length === 0 ||
      Object?.keys(val?.comparison_filters?.department).length === 0 ||
      Object?.keys(val?.comparison_filters?.location_ids[0]).length === 0 ||
      Object.keys(val?.comparison_filters?.period).length === 0 ||
      checkBoxData.length === 0;

    if (checkNotification) {
      // setNotificationProps({
      //   visible: true,
      //   type: "warning",
      //   title: "Error",
      //   message: "Kindely select all the required feilds",
      // });
      toast.warning("Kindely select all the required feilds");
    } else {
      dispatch(reportFilter({ val }));
      navigate("/report/ViewComparison", {
        state: {
          parentUrl: "/key-report",
        },
      });
    }

    console.log("Reports data in page", checkNotification);
  };
  return (
    <div className="p-[20px] pb-[0px]">
      
        <CompareByRowComponent
          title="Country"
          selectedValues={countries}
          onSelect={(index, value) => handleSelect(setCountries, index, value)}
          className="mb-[16px]"
        />
        <CompareByRowComponent
          title="Period"
          selectedValues={periods}
          onSelect={(index, value) => handleSelect(setPeriods, index, value)}
          className="mb-[16px]"
        />
        <CompareByRowComponent
          title="Department"
          selectedValues={departments}
          onSelect={(index, value) =>
            handleSelect(setDepartments, index, value)
          }
          className="mb-[20px]"
        />
        
        <CheckboxTable
          isComparision={isComparision}
          handelCheckBoxData={handleCheckBoxData}
        />
      

      <div className=" flex flex-row justify-center items-center align-center">
        <div className="w-full md:w-fit">
          <UIButton
            background="#fff"
            borderColor="#c847e8"
            text="Apply"
            onClick={() => handleOnClick()}
            color="#c847e8"
          />
        </div>
        {/* <Button>
          Apply
        </Button> */}
      </div>

      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </div>
  );
};

export default ComparisonCreateReport;
