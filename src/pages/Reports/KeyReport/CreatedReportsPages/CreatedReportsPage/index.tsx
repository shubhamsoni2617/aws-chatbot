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
} from "./apiCallsHelper";
import {
  transformAbsenteeismCost,
  transformAbsenteeismRate,
  transformCostOfVacancy,
  transformFirstYearRetentionRate,
  transformPerformanceDeficitImpact,
  transformRetentionRate,
  transformRevenuePerEmployee,
  transformTurnoverCost,
  transformTurnoverRate,
} from "./transformHelper";
import ReportsBarGraph from "./Graphs/RetentionRateReportsGraph";
import TurnoverRateReportsGraph from "./Graphs/TurnoverRate";
import AbsenteeismRateGraphReports from "./Graphs/AbsenteeismRateGraphReports";

import PDIGraphReports from "./Graphs/PDIGraphReport";
import AbsenteeismCostGraphReports from "./Graphs/AbsenteeismCostGraphReports";
import Legend from "./Legend";
import { Button, Dropdown, MenuProps, Space, Spin } from "antd";
import UIButton from "@/components/ui/UIButton";
import { BsCloudDownload } from "react-icons/bs";
import {
  DownOutlined,
  // FileExcelOutlined,
  // FilePdfOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { getDepartmentIds, getExternalIds } from "./helper";
import DefaultLayout from "@/components/DefaultLayout";
import CardWrapper from "@/components/CardWrapper";
import AreaGradientChart from "@/components/Graphs/DashboardGraphs/AreaGradientChart";
import ViewDetailsButton from "@/components/ui/ViewDetails";
import SaveReportModal from "../../SaveReportModal";
import {
  DepartemtIdHelper,
  LocationIdHelper,
} from "@/utils/helper/LocationDepartmentIdHelper";
import { getReportsData, saveReportData } from "@/store/actions";
import Notification from "@/components/Notification";
import { LuArrowLeft } from "react-icons/lu";
import { toast } from "react-toastify";
import ExcelIcon from "../../../../../assets/ExportButton/XSL.svg";
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
const CreatedReportsPage = () => {
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
  // const { checkboxData, filterData } = state as {
  //   checkboxData: any;
  //   filterData: any;
  // };
  const [checkboxData, setCheckboxData] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { reportsData } = useAppSelector((store) => store.createReport) as {
    reportsData: {
      report_filters?: Record<string, any>;
      kpi?: Record<string, string>;
      report_id?: number;
    } | null;
  };
  // console.log("Reports data", reportsData);

  const handleClick = ({ heading, data }: { heading: string; data: any }) => {
    navigate("/reports/ViewDetails", {
      state: {
        heading: heading,
        data: data,
        reportId: reportsData?.report_id,
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

  const filterData = reportsData?.report_filters;

  // console.log("data recieved int his page", checkboxData, filterData);

  const { locations, departments } = useAppSelector((store) => store.userData);
  const [reportName, setReportName] = useState("");
  const endDate = +(
    filterData?.["filterByPeriod"] ??
    filterData?.["period"] ??
    0
  );
  const startDate = endDate - 1;

  const [retentionData, setRetentionData] = useState<unknown>(null);
  const [retentionRateGraphData, setRetentionRateGraphData] =
    useState<unknown>(null);
  const [firstYearRetentionData, setFirstYearRetentionData] =
    useState<unknown>(null);
  const [retentionFirstYearRateGraphData, setFirstYearRetentionRateGraphData] =
    useState<unknown>(null);

  const [turnoverRateData, setTurnoverRateData] = useState<unknown>(null);
  const [turnoverRateGraphData, setTurnoverRateGraphData] =
    useState<unknown>(null);

  const [absenteeismRateData, setAbsenteeismRateData] = useState<unknown>(null);
  const [absenteeismRateGraphData, setAbsenteeismRateGraphData] =
    useState<unknown>(null);

  const [revenuePerEmployeeRateData, setRevenuePerEmployeeRateData] =
    useState<unknown>(null);
  const [revenuePerEmployeeRateGraphData, setRevenuePerEmployeeRateGraphData] =
    useState<unknown>(null);

  const [costOfVacancyData, setCostOfVacancyData] = useState<unknown>(null);
  const [costOfVacancyGraphData, setCostOfVacancyGraphData] =
    useState<unknown>(null);

  const [turnoverCostData, setTurnoverCostData] = useState<unknown>(null);
  const [turnoverCostGraphData, setTurnoverCostGraphData] =
    useState<unknown>(null);

  const [pdiData, setPdiData] = useState<unknown>(null);
  const [pdiGraphData, setPdiGraphData] = useState<unknown>(null);

  const [absenteeismCostData, setAbsenteeismCostData] = useState<unknown>(null);
  const [absenteeismCostGraphData, setAbsenteeismCostGraphData] =
    useState<unknown>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const reportsDepartment = filterData?.department;
  const [reportsDepartment_id, setReportsDepartmentIds] = useState<number>();
  const [reportsLocationIds, setReportsLocationIds] = useState<string[]>([]);
  const [reportsCountryName, setReportsCountryName] = useState("");

  useEffect(() => {
    if (reportsData?.report_id) {
      const reportsCountryArrElem = filterData?.location_ids[0].split(",")[0];
      const reportCountryData = locations.find(
        (elem: any) => elem?.external_id === reportsCountryArrElem
      );
      setReportsCountryName(reportCountryData?.["country_name"] || "");
    } else {
      setReportsCountryName(filterData?.location_ids[0]);
    }
  }, locations);

  useEffect(() => {
    if (!reportsData?.report_id) {
      setReportsDepartmentIds(
        DepartemtIdHelper(departments, reportsDepartment)
      );
      setReportsLocationIds(
        LocationIdHelper(locations, reportsCountryName, null, null)
      );
    } else {
      setReportsDepartmentIds(+reportsData?.report_filters?.department);
      setReportsLocationIds(reportsData?.report_filters?.location_ids);
    }
  }, [locations, departments, reportsCountryName]);

  console.log(error);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        const promises = [];

        if (checkboxData?.includes("Retention Rate")) {
          promises.push(
            getRetentionRate(
              startDate,
              endDate,
              reportsLocationIds,
              reportsDepartment_id
            ).then((data) => setRetentionData(data?.data))
          );
        }

        if (checkboxData?.includes("First Year Retention Rate")) {
          promises.push(
            getFirstYearRetentionRate(
              startDate,
              endDate,
              reportsLocationIds,
              reportsDepartment_id
            ).then((data) => setFirstYearRetentionData(data?.data))
          );
        }

        if (checkboxData?.includes("Turnover Rate")) {
          promises.push(
            getTurnoverRate(
              startDate,
              endDate,
              reportsLocationIds,
              reportsDepartment_id
            ).then((data) => setTurnoverRateData(data?.data))
          );
        }

        if (checkboxData?.includes("Absenteeism Rate")) {
          promises.push(
            getAbsenteeismRate(
              startDate,
              endDate,
              reportsLocationIds,
              reportsDepartment_id
            ).then((data) => setAbsenteeismRateData(data?.data))
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
            getCostOfVacancy(
              startDate,
              endDate,
              reportsLocationIds,
              reportsDepartment_id
            ).then((data) => setCostOfVacancyData(data?.data))
          );
        }

        if (checkboxData?.includes("Turnover Costs")) {
          promises.push(
            getTunoverCost(
              startDate,
              endDate,
              reportsLocationIds,
              reportsDepartment_id
            ).then((data) => setTurnoverCostData(data?.data))
          );
        }

        if (checkboxData?.includes("Performance Deficit Impact")) {
          promises.push(
            getPDI(
              startDate,
              endDate,
              reportsLocationIds,
              reportsDepartment_id
            ).then((data) => setPdiData(data?.data))
          );
        }

        if (checkboxData?.includes("Absenteeism costs")) {
          promises.push(
            getAbsenteeismCost(
              startDate,
              endDate,
              reportsLocationIds,
              reportsDepartment_id
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
    reportsDepartment_id,
    reportsCountryName,
  ]);

  useEffect(() => {
    if (checkboxData?.includes("Retention Rate")) {
      setRetentionRateGraphData(
        transformRetentionRate(retentionData, startDate, endDate)
      );
    }

    if (checkboxData?.includes("First Year Retention Rate")) {
      setFirstYearRetentionRateGraphData(
        transformFirstYearRetentionRate(
          firstYearRetentionData,
          startDate,
          endDate
        )
      );
    }

    if (checkboxData?.includes("Turnover Rate")) {
      setTurnoverRateGraphData(
        transformTurnoverRate(turnoverRateData, startDate, endDate)
      );
    }

    if (checkboxData?.includes("Absenteeism Rate")) {
      setAbsenteeismRateGraphData(
        transformAbsenteeismRate(absenteeismRateData, startDate, endDate)
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
        transformTurnoverCost(turnoverCostData, startDate, endDate)
      );
    }

    if (checkboxData?.includes("Performance Deficit Impact")) {
      setPdiGraphData(
        transformPerformanceDeficitImpact(
          pdiData,
          startDate,
          endDate,
          "total_performance_deficit"
        )
      );
    }

    if (checkboxData?.includes("Absenteeism costs")) {
      setAbsenteeismCostGraphData(
        transformAbsenteeismCost(absenteeismCostData, startDate, endDate)
      );
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
    //   await getLocationArray(filterData?.["filterByCountry"]?.toString() || ""),
    //   locations
    // );

    // const departmentIdForReports = await getDepartmentIds(
    //   filterData?.filterByDepartment,
    //   departments
    // );

    console.log(
      "filter period save report error ",
      filterData?.period.toString()
    );

    const formdata = new FormData();

    const isComparision = 0;
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

    const locationIds = LocationIdHelper(locations, reportsCountryName, null, null);
    if(locationIds.length !==0 ){
      locationIds.forEach(
      (id: any) => {
        formdata.append("report_filters[location_ids][]", id);
      }
    );
    }
    else{
      formdata.append("report_filters[location_ids][]", "");
    }
    

    formdata.append(
      "report_filters[period]",
      filterData?.period.toString() || ""
    );
    // formdata.append(
    //   "report_filters[period]",
    //   String(filterData?.filterByPeriod || "")
    // );
    formdata.append(
      "report_filters[department]",
      String(reportsDepartment_id ?? "") || ""
    );
    formdata.append("report_filters[kpi]", "null");

    // console.log(LocationIdHelper(locations, reportsCountryName, null, null), (reportsDepartment_id || ","))

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
        toast.success("Report saved successfully!");
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
        toast.error("Failed to save report. Please try again.");
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
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsModalOpen(false);
    }

    // console.log(reportsLocationIds)
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("Menu item clicked:", e);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex flex-row justify-between">
          <div>Export to Excel</div>
          <img src={ExcelIcon} alt="excel" width={20} height={24} />
        </div>
      ),
      key: "1",
      // icon: <FileExcelOutlined />,
    },
    {
      label: (<div className="flex flex-row justify-between">
          <div>Export to PDF</div>
          <img src={PdfIcon} alt="excel" width={20} height={24} />
        </div>),
      key: "2",
      // icon: <FilePdfOutlined />,
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
    navigate(state.parentUrl);
  }, [navigate]);

  const handleSaveModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  console.log("Checkbox data", retentionData);
  return (
    <DefaultLayout heading="Reports" isFilter={false}>
      {loading ? (
        <div className="inset-0 z-10 flex justify-center h-[90vh] items-center bg-white bg-opacity-70  w-full">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          <div
          className="flex flex-row justify-between items-center mb-[12px]"
            // style={{
            //   display: "flex",
            //   flexDirection: "row",
            //   justifyContent: "space-between",
            //   alignItems: "center",
            // }}
          >
            <Button
              className="hover:!text-[#C847E8] transition-colors "
              style={{
                background: "#f8f8f8",
                border: "none",
                boxShadow: "none",
                marginBottom: "16px",
                padding: "0px 0px",
              }}
              onClick={handleReturnNavigation}
            >
              <LuArrowLeft size={24} />
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
                <Legend year={startDate} comparisonYear={endDate} />

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
                <Legend year={startDate} comparisonYear={endDate} />
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
                <Legend year={startDate} comparisonYear={endDate} />
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

                <Legend year={startDate} comparisonYear={endDate} />
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
                  <Legend year={startDate} comparisonYear={endDate} />
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
                <Legend year={startDate} comparisonYear={endDate} />
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
                <Legend year={startDate} comparisonYear={endDate} />
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
                <Legend year={startDate} comparisonYear={endDate} />
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
                <Legend year={startDate} comparisonYear={endDate} />
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

            {checkboxData?.includes("Absenteeism costs") && (
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
                  height={291}
                />
                <Legend year={startDate} comparisonYear={endDate} />
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
    </DefaultLayout>
  );
};

export default CreatedReportsPage;
