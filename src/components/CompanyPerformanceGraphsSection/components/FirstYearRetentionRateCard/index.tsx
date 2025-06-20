import { Spin } from "antd";
import CardWrapper from "@/components/CardWrapper";
import BarGraph from "@/components/Graphs/DashboardGraphs/BarGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";

type FirstYearRetentionRateCardProps = {
  isLoadingFirstYearRetentionRate: boolean;
  firstYearRetentionRate: any;
  periodSelected: number;
  currentYear: number;
  compareModalDateReciever: any;
};

const FirstYearRetentionRateCard = ({
  isLoadingFirstYearRetentionRate,
  firstYearRetentionRate,
  periodSelected,
  currentYear,
  compareModalDateReciever,
}: FirstYearRetentionRateCardProps) => {
  return (
    <CardWrapper
      classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 h-[414px]"
      heading={"First Year Retention Rate"}
      predictedValue={firstYearRetentionRate?.predictedValue}
      companyAverage={firstYearRetentionRate?.companyAverage}
      compareModalDateReciever={compareModalDateReciever}
    >
      {isLoadingFirstYearRetentionRate ? (
        <Spin className="h-[250px] flex justify-center items-center" />
      ) : firstYearRetentionRate?.data.length === 0 ? (
        <NoData />
      ) : (
        <>
          <BarGraph data={firstYearRetentionRate?.data} isPercentage={true} />
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
        </>
      )}
    </CardWrapper>
  );
};

export default FirstYearRetentionRateCard;
