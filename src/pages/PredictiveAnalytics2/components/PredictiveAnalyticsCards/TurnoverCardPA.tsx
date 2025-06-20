import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import AbsenteeismCostGraphPA from "@/components/PredictiveAnalytics3graphSection/AreaChartGraphs";
import DualLineGraphPA from "@/components/PredictiveAnalytics3graphSection/DualLineGraphs";

const TurnoverCardPA = (props: any) => {
  const { transformedData } = props;
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <CardWrapper
        classes="h-[420px] "
        heading={"Turnover Rate"}
        predictedValue={transformedData?.turnoverRate?.predictedValue}
        companyAverage={transformedData?.turnoverRate?.companyAverage}
      >
        {!transformedData?.turnoverRate?.data.length ? (
          <NoData />
        ) : (
          <AbsenteeismCostGraphPA
            marginLeft={0}
            color2023={"#a5b4ff"}
            color2024={"#FCC439"}
            hideAxis={false}
            fillSec={false}
            height={256}
            data={transformedData?.turnoverRate?.data}
            isPercentage={true}
          />
        )}
        <div className="mt-[16px]">
          <Legend year={null} comparisonYear={2024} />
        </div>
      </CardWrapper>
      <CardWrapper
        classes="h-[420px]"
        heading={"Turnover Cost"}
        predictedValue={transformedData?.turnoverCost?.predictedValue}
        companyAverage={transformedData?.turnoverCost?.companyAverage}
      >
        {!transformedData?.turnoverCost?.data.length ? (
          <NoData />
        ) : (
          <DualLineGraphPA
            data={transformedData?.turnoverCost?.data}
            isReport={false}
            isPercentage={true}
            isReportAndNotCompare={false}
          />
        )}
        <div className="mt-[16px]">
          <Legend year={null} comparisonYear={2024} />
        </div>
      </CardWrapper>
    </div>
  );
};

export default TurnoverCardPA;
