import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import DualLineGraphPA from "@/components/PredictiveAnalytics3graphSection/DualLineGraphs";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const TurnoverCostCard = (props:any) => {
    const{turnoverCost} = props;
    const{turnoverCostLoading} = useAppSelector(store => store.financiaImpact)
    return(
        <CardWrapper
        classes="h-[420px] col-span-6 md:col-span-3 lg:col-span-4"
        heading={"Turnover Cost"}
        predictedValue={turnoverCost?.predictedValue}
        companyAverage={turnoverCost?.companyAverage}
      >
        {turnoverCostLoading ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : turnoverCost?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <DualLineGraphPA
              data={turnoverCost?.data}
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
    )
}

export default TurnoverCostCard;