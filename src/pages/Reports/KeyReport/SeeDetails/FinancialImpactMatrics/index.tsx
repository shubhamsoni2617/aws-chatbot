import CardWrapper from "@/components/CardWrapper";
import DefaultLayout from "@/components/DefaultLayout";
import AreaChartGraph from "@/components/Graphs/DashboardGraphs/AreaChartGraph";
import BarGraph from "@/components/Graphs/DashboardGraphs/BarGraph";
import DualLineGraph from "@/components/Graphs/DashboardGraphs/DualLineGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import SingleRoundBarGraph from "@/components/Graphs/DashboardGraphs/SingleBarGraph";
import ViewDetailsButton from "@/components/ui/ViewDetails";
import {
  transformData,
  transformYearlyData,
} from "@/pages/FinacialImpact/transformHelper";
import { useAppSelector } from "@/store/hooks";
import { Button, Spin } from "antd";
import { useMemo } from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

// ];
const FinancialImpactMatrics = () => {
  // console.log("in graph ", performanceDeficitImpact?.data)

  const {
    absenteesimCostData,
    performanceDefecitImpactData,
    turnoverCostData,
  } = useAppSelector((store) => store.financiaImpact);
  const { periodSelected } = useAppSelector((store) => store.userData);
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
    () => transformYearlyData(performanceDefecitImpactData, periodSelected,"total_performance_deficit"),
    [performanceDefecitImpactData]
  );

  const navigate = useNavigate();
  const handleClick = (heading: any) => {
    navigate("/reports/FinancialImapctDetails", {
      state: {
        heading: heading,
      },
    });
  };

  //   const {periodSelected} = useAppSelector((store) => store.userData)
  const {
    turnoverCostLoading,
    absenteesimCostLoading,
    performanceDefecitImpactLoading,
  } = useAppSelector((store) => store.financiaImpact);
  const currentYear = new Date().getFullYear();
  return (
    <DefaultLayout heading={"Reports"} isFilter={false} FilterComponent={null}>
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
          onClick={() => navigate("/key-report")}
        >
          <PiArrowLeftThin size={30} />
          <span>Back to Key Reports</span>
        </Button>
      </div>
      <div
        className="additional-kpi-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 w-full"
        style={{ marginTop: 16, transition: "opacity 0.3s ease-in-out" }}
      >
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
              // isReport={false}
              isPercentage={false}
            />
          )}

          {/* <BarGraph data={data} isReport={false} isPercentage={false} /> */}

          <Legend year={periodSelected} comparisonYear={currentYear - 1} />

          <div onClick={() => handleClick("Cost of Vacancy")}>
            <ViewDetailsButton />
          </div>
        </CardWrapper>

        <CardWrapper
          classes="col-span-1 sm:col-span-2 lg:col-span-4 h-[450px]"
          predictedValue={transformedTurnoverCostData?.predictedValue || 0}
          companyAverage={transformedTurnoverCostData?.companyAverage || 0}
          heading={"Turnover Cost"}
        >
          {turnoverCostLoading ? (
            <Spin className="h-[250px] flex justify-center items-center" />
          ) : (
            <DualLineGraph
              data={transformedTurnoverCostData?.data}
              // data={data}
              isReport={false}
              isPercentage={false}
              isReportAndNotCompare={false}
            />
          )}

          {/* <DualLineGraph data={data} isReport={false} isPercentage={false} /> */}
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
          <div onClick={() => handleClick("Turnover Cost")}>
            <ViewDetailsButton />
          </div>
        </CardWrapper>
      </div>
      <div
        className="additional-kpi-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 w-full h-[450px]"
        style={{
          marginTop: 25,
          marginBottom: 25,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <CardWrapper
          classes="col-span-1 sm:col-span-2 lg:col-span-2 h-[450px]"
          heading={"Performance Deficit"}
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

          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
          <div onClick={() => handleClick("Performance Deficit")}>
            <ViewDetailsButton />
          </div>
        </CardWrapper>

        <CardWrapper
          classes="col-span-1 sm:col-span-2 lg:col-span-4 h-[450px]"
          predictedValue={transformedAbsenteeismCostData?.predictedValue}
          companyAverage={transformedAbsenteeismCostData?.companyAverage}
          heading={"Absenteeism Cost"}
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

          {/* <AreaChartGraph
            marginLeft={0}
            color2023={"#A5B4FF"}
            color2024={"#FCC439"}
            hideAxis={false}
            fillSec={false}
            height={310}
            data={data}
            isPercentage={false}
          /> */}
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
          <div onClick={() => handleClick("Absenteeism Cost")}>
            <ViewDetailsButton />
          </div>
        </CardWrapper>
      </div>
    </DefaultLayout>
  );
};
export default FinancialImpactMatrics;
