import CardWrapper from "@/components/CardWrapper";
import DefaultLayout from "@/components/DefaultLayout";
import AreaChartGraph from "@/components/Graphs/DashboardGraphs/AreaChartGraph";
import BarGraph from "@/components/Graphs/DashboardGraphs/BarGraph";
import DualLineGraph from "@/components/Graphs/DashboardGraphs/DualLineGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
// import { transformData, transformRevenuePerEmployee } from "@/pages/CompanyPerformance/transformHelper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { DownOutlined, UserOutlined } from "@ant-design/icons";
import {
  transformData,
  transformYearlyData,
} from "@/pages/FinacialImpact/transformHelper";

import { Button, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
// import SaveReportModal from "../../SaveReportModal";
// import TextArea from "antd/es/input/TextArea";
import SingleRoundBarGraph from "@/components/Graphs/DashboardGraphs/SingleBarGraph";
import OverView from "../OverView";
import { Comment } from "../../components/Comment";
import { getOverviewKeyReportComment } from "@/store/actions";

// reports/SeeDetails/CompanyPerformace
const ViewDetailsFinancialImpact = () => {
  const location = useLocation();
  const { heading } = location.state || {};
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  // const onTextAreaChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   console.log("Change:", e.target.value);
  // };

  // const handleMenuClick: MenuProps["onClick"] = (e) => {
  //   console.log("Menu item clicked:", e);
  // };

  // const items: MenuProps["items"] = [
  //   {
  //     label: "Export to Excel",
  //     key: "1",
  //     icon: <UserOutlined />,
  //   },
  //   {
  //     label: "Export to PDF",
  //     key: "2",
  //     icon: <UserOutlined />,
  //   },
  // ];

  // const menuProps = {
  //   items,
  //   onClick: handleMenuClick,
  // };

  const { periodSelected } = useAppSelector((store) => store.userData);
  const currentYear = new Date().getFullYear();
  // interface Data {
  //   predictedValue: string;
  //   companyAverage: string | number;
  //   data: any[];
  // }

  const navigate = useNavigate();

  const {
    absenteesimCostData,
    performanceDefecitImpactData,
    turnoverCostData,
    turnoverCostLoading,
    performanceDefecitImpactLoading,
    absenteesimCostLoading,
  } = useAppSelector((store) => store.financiaImpact);

  const { retentionRate } = useAppSelector(
    (store) => store.companyPerformanceData
  );
  const { profileData } = useAppSelector((store) => store.profile);

  const { overViewKeyReportsComment, isOverViewKeyReportCommentLoading } =
    useAppSelector((store) => store.reportsData);

  useEffect(() => {
    dispatch(
      getOverviewKeyReportComment({
        org_id: String(profileData?.["organization"]?.["id"]),
        kpi: heading,
      })
    );
  }, []);

  //   const { periodSelected } = useAppSelector((store) => store.userData);
  // console.log("Absenteesim Cost Data", absenteesimCostData);

  const transformedAbsenteeismCostData = useMemo(
    () =>
      transformData(absenteesimCostData, periodSelected, "absenteeism_cost"),
    [absenteesimCostData]
  );
  const transformedTurnoverCostData = useMemo(
    () => transformData(turnoverCostData, periodSelected, "turnover_cost"),
    [turnoverCostData]
  );

  const transformedCostOfVacancy = useMemo(
    () => transformData(turnoverCostData, periodSelected, "cost_of_vacancy"),
    [turnoverCostData]
  );

  const transformedPerformaceDefecitImpact = useMemo(
    () =>
      transformYearlyData(
        performanceDefecitImpactData,
        periodSelected,
        "total_performance_deficit"
      ),
    [performanceDefecitImpactData]
  );

  const transformedRetentionRate = useMemo(
    () => transformData(retentionRate, periodSelected, "retention_rate"),
    [retentionRate, periodSelected]
  );

  const transformedData = useMemo(() => {
    switch (heading) {
      // case "Revenue per Employee":
      //   return transformedRevenuePerEmployee;
      case "Retention Rate":
        return transformedRetentionRate;
      // case "First Year Retention Rate":
      //   return transformedFirstYearRetentionRate;
      // case "Internal Mobility Rate":
      //   return transformedInternalMobilityRate;
      // case "Turnover Rate":
      //   return transformedTurnoverRate;
      // case "Absenteeism Rate":
      //   return transformedAbsenteeismRate;
      case "Cost of Vacancy":
        return transformedCostOfVacancy;
      case "Turnover Cost":
        return transformedTurnoverCostData;
      case "Performance Deficit":
        return transformedPerformaceDefecitImpact;
      case "Absenteeism Cost":
        return transformedAbsenteeismCostData;
      // default:
      //   return transformedAbsenteeismRate;
    }
  }, [
    heading,
    transformedAbsenteeismCostData,
    // transformedAbsenteeismRate,
    transformedCostOfVacancy,
    // transformedFirstYearRetentionRate,
    // transformedInternalMobilityRate,
    transformedPerformaceDefecitImpact,
    transformedRetentionRate,
    // transformedRevenuePerEmployee,
    transformedTurnoverCostData,
    // transformedTurnoverRate,
  ]);

  const overView = useMemo(() => {
    if (transformedData && transformedData.data.length > 0) {
      const yearString: string = (new Date().getFullYear() - 1).toString(); // 2024
      const LastYearString: string = (new Date().getFullYear() - 2).toString(); // 2023

      const currentMonth = new Date().getMonth() + 1;
      const currentQuarterNumber = Math.floor((currentMonth - 1) / 3) + 1;
      const lastQuarterNumber =
        currentQuarterNumber === 1 ? 4 : currentQuarterNumber - 1;

      const lastQuarter = transformedRetentionRate.data.find(
        (item) => item.quarter_number === lastQuarterNumber
      );

      if (!lastQuarter || lastQuarter[yearString] === null)
        return `${heading} data is not available for the last quarter.`;

      const prevQuarter = transformedRetentionRate.data.find(
        (item) =>
          item.quarter_number ===
          (lastQuarterNumber === 1 ? 4 : lastQuarterNumber - 1)
      );

      const sameQuarterLastYear = lastQuarter[LastYearString];
      const currentQuarterValue = lastQuarter[yearString];
      const prevQuarterValue = prevQuarter?.[yearString];

      const diffFromPrevQuarter =
        prevQuarterValue !== undefined && prevQuarterValue !== null
          ? +(currentQuarterValue - prevQuarterValue).toFixed(2)
          : null;

      const diffFromLastYear =
        sameQuarterLastYear !== undefined && sameQuarterLastYear !== null
          ? +(currentQuarterValue - sameQuarterLastYear).toFixed(2)
          : null;

      const trendDirection = (diff: number | null) =>
        diff !== null ? (diff > 0 ? "increase" : "decrease") : "no change";

      const formattedPrevQuarter =
        diffFromPrevQuarter !== null
          ? `a ${trendDirection(diffFromPrevQuarter)} of ${Math.abs(
              diffFromPrevQuarter
            )}% from the previous quarter`
          : "no available comparison to the previous quarter";

      const formattedLastYear =
        diffFromLastYear !== null
          ? `${trendDirection(diffFromLastYear)} of ${Math.abs(
              diffFromLastYear
            )}% from the same period last year`
          : "no available comparison to the same period last year";

      return `${heading} for the last quarter (${
        lastQuarter.quarter
      }) stands at ${currentQuarterValue}%, reflecting ${formattedPrevQuarter} and ${formattedLastYear}. This trend is driven by internal changes and market adaptation. The forecast for the next period estimates a value of ${transformedData.predictedValue.trim()}, assuming stable market conditions and continued operational improvements.
    `.trim();
    }
    return "";
  }, [heading, transformedData]);

  //   console.log("data in cmopany matrics", transformedAbsenteeismRate, transformRevenuePerEmployee, transformedRetentionRate)
  return (
    <DefaultLayout heading="Reports">
      <Spin spinning={isOverViewKeyReportCommentLoading || isLoading}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              background: "#f8f8f8",
              border: "none",
              boxShadow: "none",
              marginBottom: "24px",
              padding: "10px 0px",
            }}
            onClick={() => navigate("/reports/SeeDetails/FinancialImpact")}
          >
            <PiArrowLeftThin size={30} />
            <span>Back to Financial Impact Reports</span>
          </Button>
        </div>
        <div className="bg-[#fff] rounded-[12px] p-[20px] mb-[60px]">
          <div className="mb-[40px]">
            {heading === "Cost of Vacancy" && (
              <CardWrapper
                classes="col-span-1 sm:col-span-2 lg:col-span-2 h-[450px]"
                companyAverage={transformedCostOfVacancy?.companyAverage}
                heading="Cost of Vacancy"
                predictedValue={transformedCostOfVacancy?.predictedValue}
              >
                {turnoverCostLoading ? (
                  <Spin className="h-[250px] flex justify-center items-center" />
                ) : (
                  <BarGraph
                    data={transformedCostOfVacancy?.data}
                    isPercentage={false}
                  />
                )}
                <Legend
                  year={periodSelected}
                  comparisonYear={currentYear - 1}
                />
              </CardWrapper>
            )}

            {heading === "Turnover Cost" && (
              <CardWrapper
                classes="rounded-[12px] h-[450px]"
                predictedValue={
                  transformedTurnoverCostData?.predictedValue || 0
                }
                companyAverage={
                  transformedTurnoverCostData?.companyAverage || 0
                }
                heading="Turnover Cost"
              >
                {turnoverCostLoading ? (
                  <Spin className="h-[250px] flex justify-center items-center" />
                ) : (
                  <DualLineGraph
                    data={transformedTurnoverCostData?.data}
                    isReport={false}
                    isPercentage={false}
                    isReportAndNotCompare={false}
                  />
                )}
                <Legend
                  year={periodSelected}
                  comparisonYear={currentYear - 1}
                />
              </CardWrapper>
            )}

            {heading === "Performance Deficit" && (
              <CardWrapper
                classes="h-[450px]"
                heading="Performance Deficit"
                predictedValue={
                  transformedPerformaceDefecitImpact?.predictedValue || 0
                }
                companyAverage={
                  transformedPerformaceDefecitImpact?.companyAverage || 0
                }
              >
                {performanceDefecitImpactLoading ? (
                  <Spin className="h-[290px] flex justify-center items-center" />
                ) : (
                  <SingleRoundBarGraph
                    data={transformedPerformaceDefecitImpact?.data}
                    isReport={false}
                    isPercentage={false}
                  />
                )}
                <Legend
                  year={periodSelected}
                  comparisonYear={currentYear - 1}
                />
              </CardWrapper>
            )}

            {heading === "Absenteeism Cost" && (
              <CardWrapper
                classes="rounded-[12px] h-[450px]"
                predictedValue={transformedAbsenteeismCostData?.predictedValue}
                companyAverage={transformedAbsenteeismCostData?.companyAverage}
                heading="Absenteeism Cost"
              >
                {absenteesimCostLoading ? (
                  <Spin className="h-[250px] flex justify-center items-center" />
                ) : (
                  <AreaChartGraph
                    marginLeft={0}
                    color2023={"#A5B4FF"}
                    color2024={"#FCC439"}
                    hideAxis={false}
                    fillSec={false}
                    height={250}
                    data={transformedAbsenteeismCostData?.data}
                    isPercentage={false}
                  />
                )}
                <Legend
                  year={periodSelected}
                  comparisonYear={currentYear - 1}
                />
              </CardWrapper>
            )}
          </div>

          {/* <div style={{ marginTop: "60px" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "18px",
              marginBottom: "20px",
            }}
          >
            Overview
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#475569",
              lineHeight: "16px",
            }}
          >
            {overView}
          </div>
        </div>

        <div className="Add-Note">
          <TextArea
            showCount
            maxLength={100}
            onChange={onTextAreaChange}
            placeholder="Add Note"
            style={{
              minHeight: "172px",
              width: "100%",
              marginTop: "30px",
              marginBottom: "40px",
              resize: "vertical",
            }}
          />
        </div>

        <div
          className="ButtonSection"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            className="SaveReport"
            // onClick={showModal}
            style={{
              backgroundColor: "#C847E8",
              color: "#fff",
              borderRadius: "40px",
              marginRight: "5px",
              padding:'10px 24px',
            }}
          >
            Save Report
          </Button>
          <Dropdown menu={menuProps}>
            <Button
              className="ExportReportBtn"
              style={{
                borderRadius: "40px",
                borderColor: "#c847E8",
                color: "#c847E8",
                marginLeft: "5px",
                padding:'10px 24px'
              }}
            >
              <Space>
                Export Report
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div> */}

          <OverView
            overView={overView}
            kpi={heading}
            matricsName="Financial Impact"
            setIsLoading={setIsLoading}
          />

          {(overViewKeyReportsComment?.["comments"] ?? []).map((item: any, i:number) => {
            return (
              <Comment
                commentData={item}
                ifLast={
                  i ===
                  (overViewKeyReportsComment?.["comments"] ?? []).length - 1
                }
              />
            );
          })}
          {/* <SaveReportModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        /> */}
        </div>
      </Spin>
    </DefaultLayout>
  );
};

export default ViewDetailsFinancialImpact;
