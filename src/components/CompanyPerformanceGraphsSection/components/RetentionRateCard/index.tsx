import { Spin } from "antd";
import CardWrapper from "@/components/CardWrapper";
import BarGraph from "@/components/Graphs/DashboardGraphs/BarGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";

type RetentionRateCardProps = {
  isLoadingRetentionRate: boolean;
  retentionRate: any;
  periodSelected: number;
  currentYear: number;
  compareModalDateReciever: any;
};

const RetentionRateCard = ({
  isLoadingRetentionRate,
  retentionRate,
  periodSelected,
  currentYear,
  compareModalDateReciever,
}: RetentionRateCardProps) => {
  return (
    <CardWrapper
      classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 h-[414px]"
      heading={"Retention Rate"}
      predictedValue={retentionRate?.predictedValue}
      companyAverage={retentionRate?.companyAverage}
      compareModalDateReciever={compareModalDateReciever}
    >
      {isLoadingRetentionRate ? (
        <Spin className="h-[250px] flex justify-center items-center" />
      ) : retentionRate?.data.length === 0 ? (
        <NoData />
      ) : (
        <>
          <BarGraph data={retentionRate?.data} isPercentage={true} />
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
        </>
      )}
    </CardWrapper>
  );
};

export default RetentionRateCard;
