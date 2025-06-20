import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import DualLineGraphPA from "@/components/PredictiveAnalytics3graphSection/DualLineGraphs";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const FirstYearRetentionRateCard = (props: any) => {
  const { firstYearRetentionRate } = props;
  const { isLoadingFirstYearRetentionRate } = useAppSelector(
    (store) => store.companyPerformanceData
  );

  return (
    <CardWrapper
      classes="h-[420px] col-span-6 md:col-span-3 lg:col-span-2"
      heading={"First Year Retention Rate"}
      predictedValue={firstYearRetentionRate?.predictedValue}
      companyAverage={firstYearRetentionRate?.companyAverage}
    >
      {isLoadingFirstYearRetentionRate ? (
        <Spin className="h-[250px] flex justify-center items-center" />
      ) : firstYearRetentionRate?.data.length === 0 ? (
        <NoData />
      ) : (
        <>
          <DualLineGraphPA
            data={firstYearRetentionRate?.data}
            isReport={false}
            isPercentage={true}
            isReportAndNotCompare={false}
          />
          <div className="mt-[16px]">
            <Legend year={null} comparisonYear={2024} />
          </div>
        </>
      )}
    </CardWrapper>
  );
};

export default FirstYearRetentionRateCard;
