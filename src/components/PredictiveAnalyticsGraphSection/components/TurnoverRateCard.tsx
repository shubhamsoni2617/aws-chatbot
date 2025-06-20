import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import AbsenteeismCostGraphPA from "@/components/PredictiveAnalytics3graphSection/AreaChartGraphs";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const TurnoverRateCard = (props:any) => {
    const {turnoverRate } = props;
    const {isLoadingTurnoverRate} = useAppSelector(store => store.companyPerformanceData)
    return (
        <CardWrapper
        classes="h-[420px] col-span-6 md:col-span-3"
        heading={"Turnover Rate"}
        predictedValue={turnoverRate?.predictedValue}
        companyAverage={turnoverRate?.companyAverage}
      >
        {isLoadingTurnoverRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : turnoverRate?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <AbsenteeismCostGraphPA
              marginLeft={0}
              color2023={"#a5b4ff"}
              color2024={"#FCC439"}
              hideAxis={false}
              fillSec={false}
              height={256}
              data={turnoverRate?.data}
              isPercentage={true}
            />
            <div className="mt-[16px]">
              <Legend year={null} comparisonYear={2024} />
            </div>
          </>
        )}
      </CardWrapper>
    )
}

export default TurnoverRateCard;