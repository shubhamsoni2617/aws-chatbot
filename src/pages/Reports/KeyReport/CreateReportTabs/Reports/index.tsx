import CheckboxTable from "../CheckboxTable";
import ReportsFilterView from "@/components/FilterContainer/ReportsFilterView";
import UIButton from "@/components/ui/UIButton";
import { useEffect, useState } from "react";
import { transformRediuxForReports } from "./helper";
import { useAppDispatch } from "@/store/hooks";
import { reportFilter } from "@/store/reducers/createReport";
import { useNavigate } from "react-router-dom";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

type Props = {
  isComparision: boolean;
  getFilterData: any;
  getCheckBoxData: any;
  filterData: any;
};

type NotificationType = "success" | "info" | "warning" | "error";

const ReportsCreateReport = (props: Props) => {
  const { isComparision, getFilterData, filterData } = props;

  const [periodReport, setPeriodReport] = useState();
  const [countryReport, setCountryReport] = useState();
  const [departmentReport, setDepartmentReport] = useState();

  const [checkBoxData, setCheckBoxData] = useState([]);
  const dispatch = useAppDispatch();

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const handelFilterParameter = (filterParameter: any) => {
    console.log("Filter Parameters in Reports page", filterParameter);
    getFilterData(filterParameter);
  };

  const handelCheckBoxData = (selectedItems: []) => {
    setCheckBoxData(selectedItems);
  };

  useEffect(() => {
    console.log("tjhisnis the periodReport data", checkBoxData);
  }, [checkBoxData]);

  const navigate = useNavigate();

  const handleOnClick = () => {
    const val = transformRediuxForReports(
      periodReport,
      departmentReport,
      countryReport,
      checkBoxData
    );

    const checkNotification = 
      // Object?.keys(val?.report_filters?.department).length === 0 ||
      // Object?.keys(val?.report_filters?.location_ids[0]).length === 0 ||
      // Object.keys(val?.report_filters?.period).length === 0 ||
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
      navigate("/reports/ViewReport", {
        state: {
          parentUrl: "/key-report",
        },
      });
    }

    // console.log(Object?.keys(val?.report_filters?.department).length === 0 );
    // console.log(Object?.keys(val?.report_filters?.location_ids[0]).length === 0);
    // console.log(Object.keys(val?.report_filters?.period).length ===0);
    // console.log(checkBoxData.length===0)

    console.log(checkNotification);
  };
  return (
    <div className="md:w-[700px] w-full">
      <div className="w-full p-[20px] bg-white gap-3 hidden items-end lg:flex lg:flex-row ">
        <ReportsFilterView
          setFilterParameters={handelFilterParameter}
          filterParameters={filterData}
          isReport={true}
          setPeriodReport={setPeriodReport}
          setCountryReport={setCountryReport}
          setDepartmentReport={setDepartmentReport}
        />
      </div>
      <CheckboxTable
        isComparision={isComparision}
        // setCheckBoxData={setCheckBoxData}
        handelCheckBoxData={handelCheckBoxData}
      />

      <div className="flex flex-row justify-center items-center">
        <div className="w-full md:w-fit">
          <UIButton
            background="#fff"
            borderColor="#c847e8"
            text="Apply"
            onClick={() => handleOnClick()}
            color="#c847e8"
          />
        </div>
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

export default ReportsCreateReport;
