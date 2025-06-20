import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import PyramidGradientChart from "@/components/PredictiveAnalytics3graphSection/PyramidChart";
import { convertToHighchartsSeriesForPDI } from "@/pages/PredictiveAnalytics3/helper";

const PDICardPA = (props:any) => {
    const {transformedData} = props;
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
      <PyramidGradientChart
        data={
          convertToHighchartsSeriesForPDI(transformedData?.performanceDeficit)
            ?.data
        }
        graphHeight={265}
      />
      <Legend year={null} comparisonYear={2024} />
    </CardWrapper>
  );
};

export default PDICardPA;