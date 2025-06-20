import { Spin } from "antd";
import CardWrapper from "@/components/CardWrapper";
import DualLineGraph from "@/components/Graphs/DashboardGraphs/DualLineGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";

type TurnoverRateCardProps = {
  isLoadingTurnoverRate: boolean;
  turnoverRate: any;
  periodSelected: number;
  currentYear: number;
  compareModalDateReciever: any;
};

const TurnoverRateCard = ({
  isLoadingTurnoverRate,
  turnoverRate,
  periodSelected,
  currentYear,
  compareModalDateReciever,
}: TurnoverRateCardProps) => {
  
  return (
    <CardWrapper
      classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3 h-[414px]"
      heading={"Turnover Rate"}
      predictedValue={turnoverRate?.predictedValue}
      companyAverage={turnoverRate?.companyAverage}
      compareModalDateReciever={compareModalDateReciever}
    >
      {isLoadingTurnoverRate ? (
        <Spin className="h-[250px] flex justify-center items-center" />
      ) : turnoverRate?.data.length === 0 ? (
        <NoData />
      ) : (
        <>
          <DualLineGraph
            data={turnoverRate?.data}
            isReport={false}
            isPercentage={true}
            isReportAndNotCompare={false}
          />
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
        </>
      )}
    </CardWrapper>
  );
};

export default TurnoverRateCard;
