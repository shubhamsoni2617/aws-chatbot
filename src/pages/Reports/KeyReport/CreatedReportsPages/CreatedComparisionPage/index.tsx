import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  getAbsenteeismCost,
  getAbsenteeismRate,
  getCostOfVacancy,
  getFirstYearRetentionRate,
  getPDI,
  getRetentionRate,
  getRevenuePerEmployee,
  getTunoverCost,
  getTurnoverRate,
} from "./apiCallHelper";
import {
  //   transformAbsenteeismCost,
  //   transformAbsenteeismRate,
  transformCostOfVacancy,
  //   transformFirstYearRetentionRate,
  //   transformPerformanceDeficitImpact,
  transformRetentionRate,
  transformRevenuePerEmployee,
  //   transformTurnoverCost,
  //   transformTurnoverRate,
} from "./transformHelper";

import { Button, Dropdown, MenuProps, Space, Spin } from "antd";
import UIButton from "@/components/ui/UIButton";
import { PiArrowLeftThin } from "react-icons/pi";
import { BsCloudDownload } from "react-icons/bs";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { getDepartmentIds, getExternalIds } from "../CreatedReportsPage/helper";
import DefaultLayout from "@/components/DefaultLayout";
import CardWrapper from "@/components/CardWrapper";
import AreaGradientChart from "@/components/Graphs/DashboardGraphs/AreaGradientChart";
import ViewDetailsButton from "@/components/ui/ViewDetails";
import Legend from "../CreatedReportsPage/Legend";
import AbsenteeismCostGraphReports from "../CreatedReportsPage/Graphs/AbsenteeismCostGraphReports";
import PDIGraphReports from "../CreatedReportsPage/Graphs/PDIGraphReport";
import TurnoverRateReportsGraph from "../CreatedReportsPage/Graphs/TurnoverRate";
import ReportsBarGraph from "../CreatedReportsPage/Graphs/RetentionRateReportsGraph";
import AbsenteeismRateGraphReports from "../CreatedReportsPage/Graphs/AbsenteeismRateGraphReports";
import { getReportsData, saveReportData } from "@/store/actions";
import Notification from "@/components/Notification";
import {
  DepartemtIdHelper,
  LocationIdHelper,
} from "@/utils/helper/LocationDepartmentIdHelper";
import SaveReportModal from "../../SaveReportModal";
import { toast } from "react-toastify";
import ExcelIcon from "../../../../../assets/ExportButton/XSL.svg"
import PdfIcon from "../../../../../assets/ExportButton/PDF.svg";

// import { saveReportData } from "@/store/actions";
type NotificationType = "success" | "info" | "warning" | "error";
const formatSnakeCaseToTitle = (text: string) => {
  return text
    .split("_") // Split on underscore
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize first letter
    )
    .join(" "); // Join with space
};
const CreatedComparisionPage = () => {
  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });
  // const { state } = useLocation();
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const { locations, departments } = useAppSelector((store) => store.userData);
  const [reportName, setReportName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { checkboxData, reportsFilterData } = state as {
  //   checkboxData: any;
  //   reportsFilterData: any;
  // };
  const [checkboxData, setCheckboxData] = useState<string[]>([]);

  const { reportsData } = useAppSelector((store) => store.createReport) as {
    reportsData: any | null;
  };
  console.log("Reports data", reportsData);

  const handleClick = (props: any) => {
    const { heading, data } = props;
    navigate("/reports/ViewDetails", {
      state: {
        reportId: reportsData?.report_id,
        heading: heading,
        data: data,
      },
    });
  };

  useEffect(() => {
    if (reportsData?.kpi) {
      const keys: string[] = [];
      for (const key in reportsData?.kpi) {
        if (reportsData.kpi[key] === "1") {
          keys.push(formatSnakeCaseToTitle(key));
        }
      }
      setCheckboxData(keys);
    }
  }, [reportsData]);

  // const reportNameBool = reportsData?.report_name.length > 0
  const reportsFilterData = reportsData?.report_filters;
  const comparisonFilterData = reportsData?.comparison_filters;

  // usefull parameter extraction

  //   const reportsCountryName = reportsFilterData?.location_ids[0];
  //   const comparisionCountryName = comparisonFilterData?.location_ids[0];
  const [reportsCountryName, setReportsCountryName] = useState("");
  const [comparisionCountryName, setComparisionCountryName] = useState("");
  useEffect(() => {
    if (reportsData?.report_id) {
      const reportsCountryArrElem =
        reportsFilterData?.location_ids[0].split(",")[0];
      const reportCountryData = locations.find(
        (elem: any) => elem?.external_id === reportsCountryArrElem
      );
      setReportsCountryName(reportCountryData?.["country_name"] || "");

      const comparisionCountryArrElem = comparisonFilterData?.location_ids[0];
      const comparisionCountryData = locations.find(
        (elem: any) => elem?.external_id === comparisionCountryArrElem
      );
      setComparisionCountryName(comparisionCountryData?.["country_name"] || "");

      // console.log(
      //   "checking data for the dates",reportsCountryName,comparisionCountryName
      //   // reportsCountryName,
      //   // comparisionCountryName
      // );
    } else {
      setReportsCountryName(reportsFilterData?.location_ids[0]);
      setComparisionCountryName(comparisonFilterData?.location_ids[0]);
    }

    // console.log(
    //   "checking data for the dates",reportsCountryArrElem
    //   // reportsCountryName,
    //   // comparisionCountryName
    // );
  }, locations);

  useEffect(() => {}, [departments]);

  //   const reportsCountry = "India";
  //   const comparisionCountry = "Brazil";
  const reportsDate = reportsFilterData?.period;
  const comparisionDate = comparisonFilterData?.period;
  const reportsDepartment = reportsFilterData?.department;
  const comparisionDepartment = comparisonFilterData?.department;

  console.log("data recieved int his page", reportsData?.report_id);

  const endDate = +(
    reportsFilterData?.["filterByPeriod"] ??
    reportsFilterData?.["period"] ??
    0
  );
  const startDate = endDate - 1;

  const [retentionData, setRetentionData] = useState<any>(null);
  const [retentionRateGraphData, setRetentionRateGraphData] =
    useState<any>(null);
  const [firstYearRetentionData, setFirstYearRetentionData] =
    useState<any>(null);
  const [retentionFirstYearRateGraphData, setFirstYearRetentionRateGraphData] =
    useState<any>(null);

  const [turnoverRateData, setTurnoverRateData] = useState<any>(null);
  const [turnoverRateGraphData, setTurnoverRateGraphData] = useState<any>(null);

  const [absenteeismRateData, setAbsenteeismRateData] = useState<any>(null);
  const [absenteeismRateGraphData, setAbsenteeismRateGraphData] =
    useState<any>(null);

  const [revenuePerEmployeeRateData, setRevenuePerEmployeeRateData] =
    useState<any>(null);
  const [revenuePerEmployeeRateGraphData, setRevenuePerEmployeeRateGraphData] =
    useState<any>(null);

  const [costOfVacancyData, setCostOfVacancyData] = useState<any>(null);
  const [costOfVacancyGraphData, setCostOfVacancyGraphData] =
    useState<any>(null);

  const [turnoverCostData, setTurnoverCostData] = useState<any>(null);
  const [turnoverCostGraphData, setTurnoverCostGraphData] = useState<any>(null);

  const [pdiData, setPdiData] = useState<any>(null);
  const [pdiGraphData, setPdiGraphData] = useState<any>(null);

  const [absenteeismCostData, setAbsenteeismCostData] = useState<any>(null);
  const [absenteeismCostGraphData, setAbsenteeismCostGraphData] =
    useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [reportsDepartment_id, setReportsDepartmentIds] = useState<number>();
  const [reportsLocationIds, setReportsLocationIds] = useState<string[]>([]);

  const [comparisionDepartment_id, setComparisionDepartmentIds] =
    useState<number>();
  const [comparisionLocationIds, setComparisionLocationIds] = useState<
    string[]
  >([]);
  useEffect(() => {
    if (!reportsData?.report_id) {
      setReportsDepartmentIds(
        DepartemtIdHelper(departments, reportsDepartment)
      );
      setReportsLocationIds(
        LocationIdHelper(locations, reportsCountryName, null, null)
      );
      setComparisionDepartmentIds(
        DepartemtIdHelper(departments, comparisionDepartment)
      );
      setComparisionLocationIds(
        LocationIdHelper(locations, comparisionCountryName, null, null)
      );
    } else {
      setReportsDepartmentIds(+reportsData?.report_filters?.department);
      setComparisionDepartmentIds(+reportsData?.comparison_filters?.department);
      setReportsLocationIds(reportsData?.report_filters?.location_ids);
      setComparisionLocationIds(reportsData?.comparison_filters?.location_ids);
    }

    console.log(
      "LocationsIds parameters",
      LocationIdHelper(locations, comparisionCountryName, null, null)
    );
  }, [
    locations,
    reportsData,
    departments,
    reportsCountryName,
    comparisionCountryName,
  ]);

  useEffect(() => {
    console.log(
      "LocationsIds parameters",
      comparisionLocationIds,
      reportsLocationIds
    );
  }, [comparisionLocationIds, reportsLocationIds]);
  console.log(error);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        const promises = [];

        if (checkboxData?.includes("Retention Rate")) {
          promises.push(
            await getRetentionRate(
              reportsDate,
              comparisionDate,
              reportsLocationIds,
              comparisionLocationIds,
              reportsDepartment_id,
              comparisionDepartment_id
            ).then((data) => setRetentionData(data?.data))
          );
        }

        if (checkboxData?.includes("First Year Retention Rate")) {
          promises.push(
            getFirstYearRetentionRate(
              reportsDate,
              comparisionDate,
              reportsLocationIds,
              comparisionLocationIds,
              reportsDepartment_id,
              comparisionDepartment_id
            ).then((data) => setFirstYearRetentionData(data?.data))
          );
        }

        if (checkboxData?.includes("Turnover Rate")) {
          promises.push(
            getTurnoverRate(
              reportsDate,
              comparisionDate,
              reportsLocationIds,
              comparisionLocationIds,
              reportsDepartment_id,
              comparisionDepartment_id
            ).then((data) => setTurnoverRateData(data?.data))
          );
        }

        if (checkboxData?.includes("Absenteeism Rate")) {
          promises.push(
            getAbsenteeismRate(
              reportsDate,
              comparisionDate,
              reportsLocationIds,
              comparisionLocationIds,
              reportsDepartment_id,
              comparisionDepartment_id
            ).then((data) => {
              setAbsenteeismRateData(data?.data);
              console.log(
                "absenteeism data in this page for check single vlue",
                data
              );
            })
          );
        }

        if (checkboxData?.includes("Revenue Per Employee")) {
          promises.push(
            getRevenuePerEmployee(startDate, endDate).then((data) =>
              setRevenuePerEmployeeRateData(data?.data)
            )
          );
        }

        if (checkboxData?.includes("Cost of Vacancy")) {
          promises.push(
            getCostOfVacancy(startDate, endDate).then((data) =>
              setCostOfVacancyData(data?.data)
            )
          );
        }

        if (checkboxData?.includes("Turnover Costs")) {
          promises.push(
            getTunoverCost(
              reportsDate,
              comparisionDate,
              reportsLocationIds,
              comparisionLocationIds,
              reportsDepartment_id,
              comparisionDepartment_id
            ).then((data) => setTurnoverCostData(data?.data))
          );
        }

        if (checkboxData?.includes("Performance Deficit Impact")) {
          promises.push(
            getPDI(
              reportsDate,
              comparisionDate,
              reportsLocationIds,
              comparisionLocationIds,
              reportsDepartment_id,
              comparisionDepartment_id
            ).then((data) => setPdiData(data?.data))
          );
        }

        if (checkboxData?.includes("Absenteeism Costs")) {
          promises.push(
            getAbsenteeismCost(
              reportsDate,
              comparisionDate,
              reportsLocationIds,
              comparisionLocationIds,
              reportsDepartment_id,
              comparisionDepartment_id
            ).then((data) => setAbsenteeismCostData(data?.data))
          );
        }

        // Wait for all API calls to complete
        await Promise.all(promises);
      } catch (error) {
        setError("Failed to fetch data.");
        console.error(error);
      } finally {
        setLoading(false); // Stop loading after all API calls are complete
      }
    };

    fetchData();
  }, [
    startDate,
    endDate,
    checkboxData,
    reportsLocationIds,
    comparisionLocationIds,
    reportsDepartment_id,
    comparisionDepartment_id,
    locations,
    departments,
  ]);

  useEffect(() => {
    if (checkboxData?.includes("Retention Rate")) {
      setRetentionRateGraphData(
        transformRetentionRate(
          retentionData,
          reportsDate,
          comparisionDate,
          reportsCountryName,
          comparisionCountryName,
          reportsDepartment,
          comparisionDepartment,
          "retention_rate"
        )
      );
    }

    if (checkboxData?.includes("First Year Retention Rate")) {
      setFirstYearRetentionRateGraphData(
        transformRetentionRate(
          firstYearRetentionData,
          reportsDate,
          comparisionDate,
          reportsCountryName,
          comparisionCountryName,
          reportsDepartment,
          comparisionDepartment,
          "retention_rate"
        )
      );
    }

    if (checkboxData?.includes("Turnover Rate")) {
      setTurnoverRateGraphData(
        transformRetentionRate(
          turnoverRateData,
          reportsDate,
          comparisionDate,
          reportsCountryName,
          comparisionCountryName,
          reportsDepartment,
          comparisionDepartment,
          "turnover_rate"
        )
      );
    }

    if (checkboxData?.includes("Absenteeism Rate")) {
      setAbsenteeismRateGraphData(
        transformRetentionRate(
          absenteeismRateData,
          reportsDate,
          comparisionDate,
          reportsCountryName,
          comparisionCountryName,
          reportsDepartment,
          comparisionDepartment,
          "absenteeism_rate"
        )
      );
    }

    if (checkboxData?.includes("Revenue Per Employee")) {
      setRevenuePerEmployeeRateGraphData(
        transformRevenuePerEmployee(
          revenuePerEmployeeRateData,
          startDate,
          endDate
        )
      );
    }

    if (checkboxData?.includes("Cost of Vacancy")) {
      setCostOfVacancyGraphData(
        transformCostOfVacancy(costOfVacancyData, startDate, endDate)
      );
    }

    if (checkboxData?.includes("Turnover Costs")) {
      setTurnoverCostGraphData(
        transformRetentionRate(
          turnoverCostData,
          reportsDate,
          comparisionDate,
          reportsCountryName,
          comparisionCountryName,
          reportsDepartment,
          comparisionDepartment,
          "turnover_cost"
        )
      );
    }

    if (checkboxData?.includes("Performance Deficit Impact")) {
      setPdiGraphData(
        transformRetentionRate(
          pdiData,
          reportsDate,
          comparisionDate,
          reportsCountryName,
          comparisionCountryName,
          reportsDepartment,
          comparisionDepartment,
          "pdi"
        )
      );
    }

    if (checkboxData?.includes("Absenteeism Costs")) {
      setAbsenteeismCostGraphData(
        transformRetentionRate(
          absenteeismCostData,
          reportsDate,
          comparisionDate,
          reportsCountryName,
          comparisionCountryName,
          reportsDepartment,
          comparisionDepartment,
          "absenteeism_cost"
        )
      );
      //   console.log("absenteeism cost graphs data", absenteeismCostGraphData)
    }
  }, [
    retentionData,
    firstYearRetentionData,
    turnoverRateData,
    absenteeismRateData,
    revenuePerEmployeeRateData,
    costOfVacancyData,
    turnoverCostData,
    pdiData,
    absenteeismCostData,
  ]);

  const dispatch = useAppDispatch();
  const handleSaveReport = async () => {
    // const {} = props
    // const getLocationArray = async (country: string) => {
    //   const filteredLocations = locations.filter(
    //     (location: any) => location.country_name === country
    //   );

    //   if (filteredLocations.length === 0) {
    //     return [];
    //   }

    //   return filteredLocations.map((value: any) => value?.id);
    // };

    // const locationIdsForReports = await getExternalIds(
    //   await getLocationArray(
    //     reportsFilterData?.["filterByCountry"]?.toString() || ""
    //   ),
    //   locations
    // );

    // const departmentIdForReports = await getDepartmentIds(
    //   reportsFilterData?.department,
    //   departments
    // );

    const formdata = new FormData();

    const isComparision = 1;
    formdata.append("isComparison", isComparision.toString());
    formdata.append("report_name", reportName); //TODO ADD REPORTS NAME
    formdata.append(
      "kpi[revenue_per_employee]",
      checkboxData?.includes("Revenue Per Employee") ? "1" : "0"
    );
    formdata.append(
      "kpi[first_year_retention_rate]",
      checkboxData?.includes("First Year Retention Rate") ? "1" : "0"
    );
    formdata.append(
      "kpi[turnover_rate]",
      checkboxData?.includes("Turnover Rate") ? "1" : "0"
    );
    formdata.append(
      "kpi[cost_of_vacancy]",
      checkboxData?.includes("Cost of Vacancy") ? "1" : "0"
    );
    formdata.append(
      "kpi[performance_deficit_impact]",
      checkboxData?.includes("Performance Deficit Impact") ? "1" : "0"
    );
    formdata.append(
      "kpi[retention_rate]",
      checkboxData?.includes("Retention Rate") ? "1" : "0"
    );
    formdata.append(
      "kpi[internal_mobility_rate]",
      checkboxData?.includes("Internal Mobility Rate") ? "1" : "0"
    );
    formdata.append(
      "kpi[absenteeism_rate]",
      checkboxData?.includes("Absenteeism Rate") ? "1" : "0"
    );
    formdata.append(
      "kpi[turnover_costs]",
      checkboxData?.includes("Turnover Costs") ? "1" : "0"
    );
    formdata.append(
      "kpi[absenteeism_costs]",
      checkboxData?.includes("Absenteeism costs") ? "1" : "0"
    );

    // formdata.append(
    //   "report_filters[location_ids][]",
    //   JSON.stringify(reportsLocationIds) || ""
    // );

    LocationIdHelper(locations, reportsCountryName, null, null).forEach(
      (id: any) => {
        formdata.append("report_filters[location_ids][]", id);
      }
    );

    formdata.append(
      "report_filters[period]",
      String(reportsFilterData?.period || "")
    );

    // LocationIdHelper(locations, comparisionCountryName, null, null)
    formdata.append(
      "report_filters[department]",
      String(reportsDepartment_id || "")
    );
    formdata.append("report_filters[kpi]", "null");

    LocationIdHelper(locations, comparisionCountryName, null, null).forEach(
      (id: any) => {
        formdata.append("comparison_filters[location_ids][]", id);
      }
    );

    formdata.append("comparison_filters[period]", comparisonFilterData?.period);
    formdata.append(
      "comparison_filters[department]",
      String(comparisionDepartment_id || "")
    );

    // console.log("jhvjhvjh",comparisionLocationIds, reportsLocationIds);
    try {
      const response = await dispatch(saveReportData(formdata));
      console.log("reports response", response);
      // if (response?.payload?.status === 200) {
      if (response?.payload?.message?.includes("Report saved successfully.")) {
        // setNotificationProps({
        //   visible: true,
        //   type: "success",
        //   title: "Success",
        //   message: "Report saved successfully!",
        // });
        toast.success("Report saved successfully.")
        setIsModalOpen(false);
        dispatch(getReportsData());
        console.log("Report saved successfully:", response.payload.data);
      } else {
        // setNotificationProps({
        //   visible: true,
        //   type: "error",
        //   title: "Error",
        //   message: "Failed to save report. Please try again.",
        // });
        toast.error("Failed to save report. Please try again.")
        console.log("Report not saved successfully:", response.payload);
      }
    } catch (error) {
      console.error("Error in handleSaveReport:", error);
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Error",
      //   message: "Something went wrong. Please try again later.",
      // });
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("Menu item clicked:", e);
  };

  const items: MenuProps["items"] = [
    {
      label: (<div className="flex flex-row justify-between">
          <div>Export to Excel</div>
          <img src={ExcelIcon} alt="excel" width={20} height={24} />
        </div>),
      key: "1",
      // icon: <UserOutlined />,
    },
    {
      label: (<div className="flex flex-row justify-between">
          <div>Export to PDF</div>
          <img src={PdfIcon} alt="excel" width={20} height={24} />
        </div>),
      key: "2",
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleReturnNavigation = useCallback(() => {
    localStorage.removeItem("checkboxData");
    localStorage.removeItem("compareData");
    localStorage.removeItem("filterParams");
    navigate(state?.parentUrl);
  }, [navigate]);

  const handleSaveModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    // <Spin spinning={loading} className="h-full w-full">
    <DefaultLayout heading="Reports" isFilter={false}>
      {loading ? (
        <div className="inset-0 z-10 flex justify-center h-[90vh] items-center bg-white bg-opacity-70  w-full">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        // <Spin spinning={loading}>
        <>
          <div className="flex flex-row justify-between items-center mb-[12px]">
            <Button
              className="hover:!text-[#C847E8]"
              style={{
                background: "#f8f8f8",
                border: "none",
                boxShadow: "none",
                marginBottom: "24px",
                padding: "10px 24px",
              }}
              onClick={handleReturnNavigation}
            >
              <PiArrowLeftThin size={30} />
              <span>Back to My Reports</span>
            </Button>

            {!reportsData?.report_id && (
              <div className="flex flex-row justify-center items-center">
                <UIButton
                  background="#c847e8"
                  borderColor="#c847e8"
                  color="#fff"
                  text="Save Report"
                  onClick={() => handleSaveModalOpen()}
                />
                {/* </div> */}

                <Dropdown menu={menuProps}>
                  <Button
                    style={{
                      background: "#fff",
                      borderColor: "#c847e8",
                      color: "#c847e8",
                      borderRadius: "40px",
                      fontWeight: 400,
                      marginLeft: "8px",
                      padding: "10px 24px",
                    }}
                  >
                    <BsCloudDownload size={18} />
                    <Space>
                      Export Report
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-[16px]">
            {checkboxData?.includes("Retention Rate") && (
              <CardWrapper
                classes="rounded-[12px] h-full"
                heading={"Retention Rate"}
                //companyAverage={0}
              >
                <ReportsBarGraph
                  data={retentionRateGraphData}
                  isReport={false}
                  isPercentage={true}
                />
                <Legend
                  year={reportsCountryName}
                  comparisonYear={comparisionCountryName}
                />

                <div
                  onClick={() =>
                    handleClick({
                      heading: "Retention Rate",
                      data: retentionRateGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}

            {checkboxData?.includes("First Year Retention Rate") && (
              <CardWrapper
                classes="rounded-[12px] h-full"
                heading={"First Year Retention Rate"}
                //companyAverage={0}
              >
                <ReportsBarGraph
                  data={retentionFirstYearRateGraphData}
                  isReport={false}
                  isPercentage={true}
                />
                <Legend
                  year={reportsCountryName}
                  comparisonYear={comparisionCountryName}
                />
                <div
                  onClick={() =>
                    handleClick({
                      heading: "First Year Retention Rate",
                      data: retentionFirstYearRateGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}

            {checkboxData?.includes("Turnover Rate") && (
              <CardWrapper
                classes="rounded-[12px] h-full"
                heading={"Turnover Rate"}
                //companyAverage={0}
              >
                <TurnoverRateReportsGraph
                  data={turnoverRateGraphData}
                  isReport={false}
                  isPercentage={true}
                  isReportAndNotCompare={false}
                />
                <Legend
                  year={reportsCountryName}
                  comparisonYear={comparisionCountryName}
                />
                <div
                  onClick={() =>
                    handleClick({
                      heading: "Turnover Rate",
                      data: turnoverRateGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}

            {checkboxData?.includes("Absenteeism Rate") && (
              <CardWrapper
                classes="rounded-[12px] h-full"
                heading={"Absenteeism Rate"}
                //companyAverage={0}
              >
                <AbsenteeismRateGraphReports
                  data={absenteeismRateGraphData}
                  isReportAndNotCompare={false}
                />

                <Legend
                  year={reportsCountryName}
                  comparisonYear={comparisionCountryName}
                />
                <div
                  onClick={() =>
                    handleClick({
                      heading: "Absenteeism Rate",
                      data: absenteeismRateGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}

            {/* Revenue Per Employee */}

            {checkboxData?.includes("Revenue Per Employee") && (
              <CardWrapper
                classes="rounded-[12px] h-full"
                heading={"Revenue per Employee"}
                //companyAverage={0}
              >
                {/* <RadialBarGraph data={revenuePerEmployee?.data} /> */}
                <AreaGradientChart
                  height={314}
                  gradientColor={"#c847e8"}
                  data={revenuePerEmployeeRateGraphData}
                  isReport={true}
                />
                <div className="mt-[-8px]">
                  <Legend
                    year={reportsCountryName}
                    comparisonYear={comparisionCountryName}
                  />
                </div>

                <div
                  onClick={() =>
                    handleClick({
                      heading: "Revenue per Employee",
                      data: revenuePerEmployeeRateGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}

            {checkboxData?.includes("Cost of Vacancy") && (
              <CardWrapper
                classes="rounded-[12px] h-full"
                heading={"Cost of Vacancy"}
                //companyAverage={0}
              >
                <ReportsBarGraph
                  data={costOfVacancyGraphData}
                  isReport={false}
                  isPercentage={true}
                />
                <Legend
                  year={reportsCountryName}
                  comparisonYear={comparisionCountryName}
                />
                <div
                  onClick={() =>
                    handleClick({
                      heading: "Cost of Vacancy",
                      data: costOfVacancyGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}

            {/* Turnover Costs */}

            {checkboxData?.includes("Turnover Costs") && (
              <CardWrapper
                classes="rounded-[12px] h-full"
                heading={"Turnover Cost"}
                //companyAverage={0}
              >
                <TurnoverRateReportsGraph
                  data={turnoverCostGraphData}
                  isReport={false}
                  isPercentage={true}
                  isReportAndNotCompare={false}
                />
                <Legend
                  year={reportsCountryName}
                  comparisonYear={comparisionCountryName}
                />
                <div
                  onClick={() =>
                    handleClick({
                      heading: "Turnover Cost",
                      data: turnoverCostGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}

            {checkboxData?.includes("Turnover Costs") && (
              <CardWrapper
                classes="rounded-[12px] h-full"
                heading={"Turnover Cost"}
                //companyAverage={0}
              >
                <TurnoverRateReportsGraph
                  data={turnoverCostGraphData}
                  isReport={false}
                  isPercentage={true}
                  isReportAndNotCompare={false}
                />
                <Legend
                  year={reportsCountryName}
                  comparisonYear={comparisionCountryName}
                />
                <div
                  onClick={() =>
                    handleClick({
                      heading: "Turnover Cost",
                      data: turnoverCostGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}

            {/* Performance Deficit Impact */}

            {checkboxData?.includes("Performance Deficit Impact") && (
              <CardWrapper
                classes="rounded-[12px] h-full"
                heading={"Performce Deficit Impact"}
                //companyAverage={0}
              >
                <PDIGraphReports
                  data={pdiGraphData}
                  isReport={false}
                  isPercentage={true}
                  isReportAndNotCompare={false}
                />
                <Legend
                  year={reportsCountryName}
                  comparisonYear={comparisionCountryName}
                />
                <div
                  onClick={() =>
                    handleClick({
                      heading: "Performance Deficit Impact",
                      data: pdiGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}

            {checkboxData?.includes("Absenteeism Costs") && (
              <CardWrapper
                classes="rounded-[12px]"
                heading={"Absenteeism Cost"}
                //companyAverage={0}
              >
                <AbsenteeismCostGraphReports
                  color2023={"#A5B4FF"}
                  color2024={"#FCC439"}
                  data={absenteeismCostGraphData}
                  isReport={false}
                  isPercentage={true}
                  isReportAndNotCompare={false}
                  height={305}
                />
                <div className="mt-[8px]">
                  <Legend
                    year={reportsCountryName}
                    comparisonYear={comparisionCountryName}
                  />
                </div>

                <div
                  onClick={() =>
                    handleClick({
                      heading: "Absenteeism Cost",
                      data: absenteeismCostGraphData,
                    })
                  }
                >
                  <ViewDetailsButton />
                </div>
              </CardWrapper>
            )}
          </div>
        </>
        // </Spin>
      )}
      <SaveReportModal
        isModalOpen={isModalOpen}
        handleOk={() => handleSaveReport()}
        handleCancel={() => handleModalClose()}
        setReportName={setReportName}
      />
      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
      ;
    </DefaultLayout>
    // </Spin>
  );
};

export default CreatedComparisionPage;
