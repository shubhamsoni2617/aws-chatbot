import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import SingleRoundBarGraph from "@/components/Graphs/DashboardGraphs/SingleBarGraph";
import { convertToHighchartsSeriesForPDI } from "@/pages/PredictiveAnalytics3/helper";

const PDICardCPFI = (props:any) => {
    const {transformedData} = props
  return (
    <CardWrapper
      classes="col-span-1 sm:col-span-2 lg:col-span-2"
      heading={"Performance Deficit"}
      predictedValue={transformedData?.performanceDeficit?.predictedValue}
      // companyAverage={transformedPerformaceDeficitImpact?.companyAverage}
      companyAverage={
        convertToHighchartsSeriesForPDI(transformedData?.performanceDeficit)
          ?.companyAverage
      }
    >
      <SingleRoundBarGraph
        data={transformedData?.performanceDeficit?.data}
        isReport={false}
        isPercentage={false}
      />
      <Legend comparisonYear={2024} year={2025} />
    </CardWrapper>
  );
};

export default PDICardCPFI;