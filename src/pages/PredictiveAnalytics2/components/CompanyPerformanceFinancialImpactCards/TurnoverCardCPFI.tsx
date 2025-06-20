import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import TurnoverRateGraph from "@/components/Graphs/PredictiveAnalyticsGraphs/TurnoverRateGraph";

const TurnoverCardCPFI = (props: any) => {
  const { transformedData, heading } = props;
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <CardWrapper
        classes=""
        heading={"Turnover Rate"}
        predictedValue={transformedData?.turnoverRate?.predictedValue}
        companyAverage={transformedData?.turnoverRate?.companyAverage}
        // compareModalDateReciever={compareModalDateReciever}
      >
        <TurnoverRateGraph
          data={transformedData?.turnoverRate?.data}
          isReport={false}
          isPercentage={true}
          isReportAndNotCompare={false}
        />
        <Legend comparisonYear={2024} year={2025} />
      </CardWrapper>
      <CardWrapper
        classes="graph2"
        predictedValue={transformedData?.turnoverCost?.["predictedValue"]}
        companyAverage={transformedData?.turnoverCost?.["companyAverage"]}
        heading={
          heading?.split(" ").slice(0, -1).join(" ") + " " + "Cost" || ""
        }
      >
        <TurnoverRateGraph
          isReport={false}
          data={transformedData?.turnoverCost?.data}
          isPercentage={false}
          isReportAndNotCompare={false}
        />
        <Legend comparisonYear={2024} year={2025} />
      </CardWrapper>
    </div>
  );
};

export default TurnoverCardCPFI;
