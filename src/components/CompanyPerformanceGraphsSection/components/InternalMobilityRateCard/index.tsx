import { Spin } from "antd";
import CardWrapper from "@/components/CardWrapper";
import AreaChartGraph from "@/components/Graphs/DashboardGraphs/AreaChartGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";

type InternalMobilityRateCardProps = {
  isLoadingInternalMobilityRate: boolean;
  internalMobilityRate: any;
  periodSelected: number;
  currentYear: number;
  compareModalDateReciever: any;
};

const InternalMobilityRateCard = ({
  isLoadingInternalMobilityRate,
  internalMobilityRate,
  periodSelected,
  currentYear,
  compareModalDateReciever,
}: InternalMobilityRateCardProps) => {
  return (
    <CardWrapper
      classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 h-[414px]"
      heading={"Internal Mobility Rate"}
      predictedValue={internalMobilityRate?.predictedValue}
      companyAverage={internalMobilityRate?.companyAverage}
      compareModalDateReciever={compareModalDateReciever}
    >
      {isLoadingInternalMobilityRate ? (
        <Spin className="h-[250px] flex justify-center items-center" />
      ) : internalMobilityRate?.data.length === 0 ? (
        <NoData />
      ) : (
        <>
          <AreaChartGraph
            marginLeft={-10}
            color2023={"#A5B4FF"}
            color2024={"#FCC439"}
            hideAxis={false}
            fillSec={false}
            height={250}
            data={internalMobilityRate?.data}
            isPercentage={true}
          />
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
        </>
      )}
    </CardWrapper>
  );
};

export default InternalMobilityRateCard;
