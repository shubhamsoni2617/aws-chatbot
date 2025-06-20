import CardWrapper from "@/components/CardWrapper";
import DualLineGraph from "@/components/Graphs/DashboardGraphs/DualLineGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const TurnoverCostCard = (props: any) => {
  const { turnOverCost } = props;
  const { turnoverCostLoading } = useAppSelector(
    (store) => store.financiaImpact
  );
  const { periodSelected } = useAppSelector((store) => store.userData);
  const currentYear = new Date().getFullYear();
  return (
    <CardWrapper
      classes="col-span-1 sm:col-span-2 lg:col-span-4 h-[414px]"
      predictedValue={turnOverCost?.predictedValue || 0}
      companyAverage={turnOverCost?.companyAverage || 0}
      heading={"Turnover Cost"}
    >
      {turnoverCostLoading ? (
        <Spin className="h-[250px] flex justify-center items-center" />
      ) : turnOverCost?.data?.length === 0 ? (
        <NoData />
      ) : (
        <>
          <DualLineGraph
            data={turnOverCost?.data}
            // data={data}
            isReport={false}
            isPercentage={false}
            isReportAndNotCompare={false}
          />
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
        </>
      )}

      {/* <DualLineGraph data={data} isReport={false} isPercentage={false} /> */}
    </CardWrapper>
  );
};

export default TurnoverCostCard;
