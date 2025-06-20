import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import DualLineGraphPA from "@/components/PredictiveAnalytics3graphSection/DualLineGraphs";

const RetentionRateCardPA = (props: any) => {
  const { transformedData } = props;
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <CardWrapper
        classes="h-[420px]"
        heading={"Retention Rate"}
        predictedValue={transformedData?.retentionRate?.predictedValue}
        companyAverage={transformedData?.retentionRate?.companyAverage}
      >
        {!transformedData?.retentionRate?.data.length ? (
          <NoData />
        ) : (
          <DualLineGraphPA
            data={transformedData?.retentionRate?.data}
            isReport={false}
            isPercentage={true}
            isReportAndNotCompare={false}
          />
        )}
        <div className="mt-[16px]">
          <Legend year={null} comparisonYear={2024} />
        </div>
      </CardWrapper>

      <CardWrapper
        classes="h-[420px]"
        heading={"First Year Retention Rate"}
        predictedValue={transformedData?.firstYearRetentionRate?.predictedValue}
        companyAverage={transformedData?.firstYearRetentionRate?.companyAverage}
      >
        {!transformedData?.firstYearRetentionRate?.data.length ? (
          <NoData />
        ) : (
          <DualLineGraphPA
            data={transformedData?.firstYearRetentionRate?.data}
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

export default RetentionRateCardPA;
