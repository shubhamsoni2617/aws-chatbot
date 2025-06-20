import CardWrapper from "@/components/CardWrapper";
import DefaultLayout from "@/components/DefaultLayout";
import AreaChartGraph from "@/components/Graphs/DashboardGraphs/AreaChartGraph";
import AreaGradientChart from "@/components/Graphs/DashboardGraphs/AreaGradientChart";
import BarGraph from "@/components/Graphs/DashboardGraphs/BarGraph";
import DualLineGraph from "@/components/Graphs/DashboardGraphs/DualLineGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import RoundedBarGraph from "@/components/Graphs/DashboardGraphs/RoundedBarGraph";
// import ViewDetailsButton from "@/components/ui/ViewDetails";
import {
  transformData,
  transformRevenuePerEmployee,
} from "@/pages/CompanyPerformance/transformHelper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { Button, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
// import SaveReportModal from "../../SaveReportModal";
// import TextArea from "antd/es/input/TextArea";
import OverView from "../OverView";
import { getOverviewKeyReportComment } from "@/store/actions";
import { Comment } from "../../components/Comment";

// reports/SeeDetails/CompanyPerformace
const ViewDetailsCompanyPerformace = () => {
  // const period = new Date().getFullYear() - 2;

  const {
    revenuePerEmployee,
    absenteesimRate,
    retentionRate,
    firstYearRetentionRate,
    turnoverRate,
    internalMobilityRate,
    isLoadingAbsenteesimRate,
    isLoadingFirstYearRetentionRate,
    isLoadingInternalMobilityRate,
    isLoadingRetentionRate,
    isLoadingRevenuePerEmployee,
    isLoadingTurnoverRate,
  } = useAppSelector((store) => store.companyPerformanceData);
  const { profileData } = useAppSelector((store) => store.profile);
  const {overViewKeyReportsComment,isOverViewKeyReportCommentLoading} = useAppSelector(store => store.reportsData)
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { heading } = location.state || {};
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    dispatch(getOverviewKeyReportComment({
      org_id: String(profileData?.["organization"]?.["id"]),
      kpi: heading,
    }))
  },[])

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

  const transformedRevenuePerEmployee = useMemo(
    () => transformRevenuePerEmployee(revenuePerEmployee, periodSelected),
    [revenuePerEmployee, periodSelected]
  );

  const transformedRetentionRate = useMemo(
    () => transformData(retentionRate, periodSelected, true, "retention_rate"),
    [retentionRate, periodSelected]
  );

  const transformedFirstYearRetentionRate = useMemo(
    () =>
      transformData(
        firstYearRetentionRate,
        periodSelected,
        true,
        "retention_rate"
      ),
    [firstYearRetentionRate, periodSelected]
  );

  const transformedInternalMobilityRate = useMemo(
    () =>
      transformData(
        internalMobilityRate,
        periodSelected,
        true,
        "internal_mobility_rate"
      ),
    [internalMobilityRate, periodSelected]
  );

  const transformedTurnoverRate = useMemo(
    () => transformData(turnoverRate, periodSelected, true, "turnover_rate"),
    [turnoverRate, periodSelected]
  );

  const transformedAbsenteeismRate = useMemo(
    () =>
      transformData(absenteesimRate, periodSelected, true, "absenteeism_rate"),
    [absenteesimRate, periodSelected]
  );

  console.log(
    "data in cmopany matrics",
    transformedAbsenteeismRate,
    transformRevenuePerEmployee,
    transformedRetentionRate
  );

  const transformedData = useMemo(() => {
    switch (heading) {
      case "Revenue per Employee":
        return transformedRevenuePerEmployee;
      case "Retention Rate":
        return transformedRetentionRate;
      case "First Year Retention Rate":
        return transformedFirstYearRetentionRate;
      case "Internal Mobility Rate":
        return transformedInternalMobilityRate;
      case "Turnover Rate":
        return transformedTurnoverRate;
      case "Absenteeism Rate":
        return transformedAbsenteeismRate;
      // case "Cost of Vacancy":
      //   return transformedCostOfVacancy;
      // case "Turnover Cost":
      //   return transformedTurnoverCostData;
      // case "Performance Deficit":
      //   return transformedPerformaceDefecitImpact;
      // case "Absenteeism Cost":
      //   return transformedAbsenteeismCostData;
      default:
        return transformedAbsenteeismRate;
    }
  }, [
    heading,
    // transformedAbsenteeismCostData,
    transformedAbsenteeismRate,
    // transformedCostOfVacancy,
    transformedFirstYearRetentionRate,
    transformedInternalMobilityRate,
    // transformedPerformaceDefecitImpact,
    transformedRetentionRate,
    transformedRevenuePerEmployee,
    // transformedTurnoverCostData,
    transformedTurnoverRate,
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
          onClick={() => navigate("/reports/SeeDetails/CompanyPerformace")}
        >
          <PiArrowLeftThin size={30} />
          <span>Back to Company Performance Reports</span>
        </Button>
      </div>
      <div className="bg-[#fff] rounded-[12px] p-[20px] mb-[60px]">
        <div className=" mb-[40px]">
          {heading === "Revenue per Employee" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px] "
              heading={"Revenue per Employee"}
              predictedValue={transformedRevenuePerEmployee?.predictedValue}
              companyAverage={transformedRevenuePerEmployee?.companyAverage}
            >
              {isLoadingRevenuePerEmployee ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <AreaGradientChart
                  height={240}
                  gradientColor={"#c847e8"}
                  data={transformedRevenuePerEmployee?.data}
                />
              )}
              <div style={{ marginTop: "16px" }}>
                <Legend
                  year={periodSelected}
                  comparisonYear={currentYear - 1}
                />
              </div>
            </CardWrapper>
          )}

          {heading === "Retention Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading={"Retention Rate"}
              predictedValue={transformedRetentionRate?.predictedValue}
              companyAverage={transformedRetentionRate?.companyAverage}
            >
              {isLoadingRetentionRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <BarGraph
                  data={transformedRetentionRate?.data}
                  isPercentage={true}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "First Year Retention Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading={"First Year Retention Rate"}
              predictedValue={transformedFirstYearRetentionRate?.predictedValue}
              companyAverage={transformedFirstYearRetentionRate?.companyAverage}
            >
              {isLoadingFirstYearRetentionRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <BarGraph
                  data={transformedFirstYearRetentionRate?.data}
                  isPercentage={true}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Internal Mobility Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading={"Internal Mobility Rate"}
              predictedValue={transformedInternalMobilityRate?.predictedValue}
              companyAverage={transformedInternalMobilityRate?.companyAverage}
            >
              {isLoadingInternalMobilityRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <AreaChartGraph
                  marginLeft={-10}
                  color2023={"#A5B4FF"}
                  color2024={"#FCC439"}
                  hideAxis={false}
                  fillSec={false}
                  height={250}
                  data={transformedInternalMobilityRate?.data}
                  isPercentage={true}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Turnover Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading={"Turnover Rate"}
              predictedValue={transformedTurnoverRate?.predictedValue}
              companyAverage={transformedTurnoverRate?.companyAverage}
            >
              {isLoadingTurnoverRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <DualLineGraph
                  data={transformedTurnoverRate?.data}
                  isReport={false}
                  isPercentage={true}
                  isReportAndNotCompare={false}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Absenteeism Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading={"Absenteeism Rate"}
              predictedValue={transformedAbsenteeismRate?.predictedValue}
              companyAverage={transformedAbsenteeismRate?.companyAverage}
            >
              {isLoadingAbsenteesimRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <RoundedBarGraph
                  data={transformedAbsenteeismRate?.data}
                  isReportAndNotCompare={false}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}
        </div>

        {/* over view section */}
        {/* <div style={{ marginTop: "60px" }}>
          <div
            className="[font-family:'Plus_Jakarta_Sans',sans-serif] font-[700px]"
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
          className="ButtonSection gap-[16px]"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            className="SaveReport min-h-[40px]"
            // onClick={showModal}
            style={{
              backgroundColor: "#C847E8",
              color: "#fff",
              borderRadius: "40px",
              // marginRight: "5px",
              padding:'10px 24px',
            }}
          >
            Save Report
          </Button>
          <Dropdown menu={menuProps}>
            <Button
              className="ExportReportBtn min-h-[40px]"
              style={{
                borderRadius: "40px",
                borderColor: "#c847E8",
                color: "#c847E8",
                // marginLeft: "5px",
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

          
        <OverView overView={overView} kpi={heading} matricsName="Company Performance" setIsLoading={setIsLoading}/>
        {/* <SaveReportModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        /> */}

        {
          (overViewKeyReportsComment?.["comments"] ?? []).map((item: any,i:number) => {
            return (
              <Comment commentData={item} 
              ifLast = {i === (overViewKeyReportsComment?.["comments"] ?? []).length - 1}
              />
            );
          })
        }
      </div>
      </Spin>
    </DefaultLayout>
  );
};

export default ViewDetailsCompanyPerformace;
