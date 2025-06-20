import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import RetentionRateGraphPA from "@/components/Graphs/PredictiveAnalyticsGraphs/RetentionRateGraph";

const RetentionRateCardCPFI = (props: any) => {
    const { transformedData } = props;
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <CardWrapper
        classes=""
        heading={"Retention Rate"}
        predictedValue={transformedData?.retentionRate?.predictedValue}
        companyAverage={transformedData?.retentionRate?.companyAverage}
        // compareModalDateReciever={compareModalDateReciever}
      >
        <RetentionRateGraphPA
          data={transformedData?.retentionRate?.data}
          isReport={false}
          isPercentage={true}
        />

        <Legend comparisonYear={2024} year={2025} />
      </CardWrapper>

      <CardWrapper
        classes=""
        heading={"First Year Retention Rate"}
        predictedValue={transformedData?.firstYearRetentionRate?.predictedValue}
        companyAverage={transformedData?.firstYearRetentionRate?.companyAverage}
        // compareModalDateReciever={compareModalDateReciever}
      >
        <RetentionRateGraphPA
          data={transformedData?.firstYearRetentionRate?.data}
          isReport={false}
          isPercentage={true}
        />
        <Legend comparisonYear={2024} year={2025} />
      </CardWrapper>
    </div>
  );
};

export default RetentionRateCardCPFI;
