import CardWrapper from "@/components/CardWrapper";
import DefaultLayout from "@/components/DefaultLayout";
import FilterContainer from "@/components/FilterContainer";
import AreaChartGraph from "@/components/Graphs/DashboardGraphs/AreaChartGraph";
import AreaGradientChart from "@/components/Graphs/DashboardGraphs/AreaGradientChart";
import BarGraph from "@/components/Graphs/DashboardGraphs/BarGraph";
import DualLineGraph from "@/components/Graphs/DashboardGraphs/DualLineGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import RoundedBarGraph from "@/components/Graphs/DashboardGraphs/RoundedBarGraph";
import NoData from "@/components/NoData";
import ViewDetailsButton from "@/components/ui/ViewDetails";
import {
  transformData,
  transformRevenuePerEmployee,
} from "@/pages/CompanyPerformance/transformHelper";
import { useAppSelector } from "@/store/hooks";

import { Button, Spin } from "antd";
import { useMemo } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CompanyPerformaceMetrics = () => {
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

  const { periodSelected } = useAppSelector((store) => store.userData);
  const currentYear = new Date().getFullYear();
  // interface Data {
  //   predictedValue: string;
  //   companyAverage: string | number;
  //   data: any[];
  // }

  const navigate = useNavigate();

  const handleClick = (heading: any) => {
    navigate("/reports/CompanyPerformanceDetails", {
      state: {
        heading: heading,
      },
    });
  };

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
    transformedInternalMobilityRate?.data.length
  );
  return (
    <DefaultLayout
      FilterComponent={
        <FilterContainer heading="Reports" mapDataReload={() => {}} noFilter />
      }
      noUserName
      heading="Reports"
    >
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
          className="hover:!text-[#C847E8] transition-colors"
          onClick={() => navigate("/key-report")}
        >
          <LuArrowLeft size={24} />
          <span className="hover:!text-[#C847E8] transition-colors">
            Back to Key Reports
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-x-[16px] gap-y-[16px]">
        <CardWrapper
          classes="rounded-[12px] h-[450px] col-span-3 md:col-span-1"
          heading={"Revenue per Employee"}
          predictedValue={transformedRevenuePerEmployee?.predictedValue}
          companyAverage={transformedRevenuePerEmployee?.companyAverage}
          // compareModalDateReciever={compareModalDateReciever}
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
            <Legend year={periodSelected} comparisonYear={currentYear - 1} />
          </div>
          <div onClick={() => handleClick("Revenue per Employee")}>
            <ViewDetailsButton />
          </div>
        </CardWrapper>

        <CardWrapper
          classes="rounded-[12px] h-[450px] col-span-3 md:col-span-1"
          heading={"Retention Rate"}
          predictedValue={transformedRetentionRate?.predictedValue}
          companyAverage={transformedRetentionRate?.companyAverage}
          // compareModalDateReciever={compareModalDateReciever}
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
          <div onClick={() => handleClick("Retention Rate")}>
            <ViewDetailsButton />
          </div>
        </CardWrapper>

        <CardWrapper
          classes="rounded-[12px] h-[450px] col-span-3 md:col-span-1"
          heading={"First Year Retention Rate"}
          predictedValue={transformedFirstYearRetentionRate?.predictedValue}
          companyAverage={transformedFirstYearRetentionRate?.companyAverage}
          // compareModalDateReciever={compareModalDateReciever}
        >
          {isLoadingFirstYearRetentionRate ? (
            <Spin className="h-[250px] flex justify-center items-center" />
          ) : (
            <BarGraph
              data={transformedFirstYearRetentionRate?.data}
              // isReport={false}
              isPercentage={true}
            />
          )}
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
          <div onClick={() => handleClick("First Year Retention Rate")}>
            <ViewDetailsButton />
          </div>
        </CardWrapper>

        <CardWrapper
          classes="rounded-[12px] h-[450px] col-span-3 md:col-span-1"
          heading={"Internal Mobility Rate"}
          predictedValue={transformedInternalMobilityRate?.predictedValue}
          companyAverage={transformedInternalMobilityRate?.companyAverage}
          // compareModalDateReciever={compareModalDateReciever}
        >
          {isLoadingInternalMobilityRate ? (
            <Spin className="h-[250px] flex justify-center items-center" />
          ) : (
            transformedInternalMobilityRate?.data.length === 0 ? (<NoData/>) : 
           ( <>
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
            <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            <div onClick={() => handleClick("Internal Mobility Rate")}>
            <ViewDetailsButton />
          </div>
            </>)
          )}
          
          
        </CardWrapper>

        <CardWrapper
          classes="rounded-[12px] h-[450px] col-span-3 md:col-span-1"
          heading={"Turnover Rate"}
          predictedValue={transformedTurnoverRate?.predictedValue}
          companyAverage={transformedTurnoverRate?.companyAverage}
          // compareModalDateReciever={compareModalDateReciever}
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
          <div onClick={() => handleClick("Turnover Rate")}>
            <ViewDetailsButton />
          </div>
        </CardWrapper>

        <CardWrapper
          classes="rounded-[12px] h-[450px] col-span-3 md:col-span-1"
          heading={"Absenteeism Rate"}
          predictedValue={transformedAbsenteeismRate?.predictedValue}
          companyAverage={transformedAbsenteeismRate?.companyAverage}
          // compareModalDateReciever={compareModalDateReciever}
        >
          {isLoadingAbsenteesimRate ? (
            <Spin className="h-[250px] flex justify-center items-center" />
          ) : (
            <RoundedBarGraph
              data={transformedAbsenteeismRate?.data}
              isReportAndNotCompare={false}
            />
            // <></>
          )}
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
          <div onClick={() => handleClick("Absenteeism Rate")}>
            <ViewDetailsButton />
          </div>
        </CardWrapper>
      </div>
    </DefaultLayout>
  );
};

export default CompanyPerformaceMetrics;
