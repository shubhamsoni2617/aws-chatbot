

import { useAppSelector } from "@/store/hooks";
import CardWrapper from "../CardWrapper";
// import BarGraph from "../Graphs/DashboardGraphs/BarGraph";
import Legend from "../Graphs/DashboardGraphs/Legend";
// import DualLineGraph from "../Graphs/DashboardGraphs/DualLineGraph";
// import AreaChartGraph from "../Graphs/DashboardGraphs/AreaChartGraph";
import SingleRoundBarGraph from "../Graphs/DashboardGraphs/SingleBarGraph";
import { Spin } from "antd";
import RetentionRateGraphPA from "../Graphs/PredictiveAnalyticsGraphs/RetentionRateGraph";
import AbsenteeismCostGraphPA from "../Graphs/PredictiveAnalyticsGraphs/AbsenteeismCostGraphPA";
import TurnoverRateGraph from "../Graphs/PredictiveAnalyticsGraphs/TurnoverRateGraph";

  
// ];
const PredictiveAnalyticsFinancialImpactGraphSection = (props: any) => {
  const {
    // currentQuarter,
    // currentYear,
    // previousYear,
    absenteeismCost,
    performanceDeficitImpact,
    turnOverCost,
    costOfVacancy,
  } = props;
  // console.log("in graph ", performanceDeficitImpact?.data)

  // console.log("absenteeism cost financial impact", absenteeismCost)

  const {periodSelected} = useAppSelector((store) => store.userData)
  const {turnoverCostLoading,absenteesimCostLoading,performanceDefecitImpactLoading,} = useAppSelector((store) => store.financiaImpact)
  const currentYear = new Date().getFullYear();
  return (
    <>
      

      <div
        className="additional-kpi-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 w-full"
        style={{ marginTop: 16, transition: "opacity 0.3s ease-in-out" }}
      >
        <CardWrapper
          classes="col-span-1 sm:col-span-2 lg:col-span-2 h-[414px]"
          companyAverage={costOfVacancy?.companyAverage}
          heading="Cost of Vacancy"
          predictedValue={costOfVacancy?.predictedValue}
        >
          {turnoverCostLoading ? <Spin className="h-[250px] flex justify-center items-center"/>: (
            <RetentionRateGraphPA
            data={costOfVacancy?.data}
            isReport={false}
            isPercentage={false}
          />
          
          )}
          
          {/* <BarGraph data={data} isReport={false} isPercentage={false} /> */}

                  <Legend year={periodSelected} comparisonYear={currentYear - 1} />

        </CardWrapper>

        <CardWrapper
          classes="col-span-1 sm:col-span-2 lg:col-span-4 h-[414px]"
          predictedValue={turnOverCost?.predictedValue || 0}
          companyAverage={turnOverCost?.companyAverage || 0}
          heading={"Turnover Cost"}
        >
          {turnoverCostLoading ? <Spin className="h-[250px] flex justify-center items-center"/> : (
        //     <TurnoverRateGraph
        //     data={turnOverCost?.data}
        //     // data={data}
        //     isReport={false}
        //     isPercentage={false}
        //     isReportAndNotCompare={false}
        //   />

          <TurnoverRateGraph
                    data={turnOverCost?.data}
                    isReport={false}
                    isPercentage={false}
                    isReportAndNotCompare={false}
                  />
          )}
          
          {/* <DualLineGraph data={data} isReport={false} isPercentage={false} /> */}
                  <Legend year={periodSelected} comparisonYear={currentYear - 1} />

        </CardWrapper>
      </div>
      <div
        className="additional-kpi-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 w-full h-[414px]"
        style={{
          marginTop: 25,
          marginBottom: 25,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <CardWrapper
          classes="col-span-1 sm:col-span-2 lg:col-span-2 h-[414px]"
          heading={performanceDeficitImpact?.heading}
          predictedValue={performanceDeficitImpact?.predictedValue}
          companyAverage={performanceDeficitImpact?.companyAverage}
        >
          {performanceDefecitImpactLoading ? (
            <Spin className="h-[250px] flex justify-center items-center"/>
          ): (
            <SingleRoundBarGraph
            data={performanceDeficitImpact?.data}
            isReport={false}
            isPercentage={false}
          />
          )}
          
                  <Legend year={periodSelected} comparisonYear={currentYear - 1} />

        </CardWrapper>

        <CardWrapper
          classes="col-span-1 sm:col-span-2 lg:col-span-4 h-[414px]"
          predictedValue={absenteeismCost?.predictedValue}
          companyAverage={absenteeismCost?.companyAverage}
          heading={"Absenteeism Cost"}
        >
          {absenteesimCostLoading ?(<Spin className="h-[250px] flex justify-center items-center"/>) : (
            <AbsenteeismCostGraphPA
            marginLeft={0}
            color2023={"#A5B4FF"}
            color2024={"#FCC439"}
            hideAxis={false}
            fillSec={false}
            height={250}
            data={absenteeismCost?.data}
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

        </CardWrapper>
      </div>
    </>
  );
};
export default PredictiveAnalyticsFinancialImpactGraphSection;
