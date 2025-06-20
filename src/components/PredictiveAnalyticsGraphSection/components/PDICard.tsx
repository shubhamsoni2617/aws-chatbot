import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import PyramidGradientChart from "@/components/PredictiveAnalytics3graphSection/PyramidChart";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const PDICard = (props:any) => {
    const {performnceDefecitImpact} = props;
    const {performanceDefecitImpactLoading} = useAppSelector(store => store.financiaImpact)
    return(
        <CardWrapper
        classes="h-[420px] col-span-6 md:col-span-3 lg:col-span-2"
        heading={"Performance Deficit"}
        predictedValue={performnceDefecitImpact?.predictedValue}
        companyAverage={performnceDefecitImpact?.companyAverage}
      >
        {performanceDefecitImpactLoading ? (
          <Spin className="h-[290px] flex justify-center items-center" />
        ) : performnceDefecitImpact?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <PyramidGradientChart
              data={performnceDefecitImpact?.data}
              graphHeight={265}
            />
            <Legend year={null} comparisonYear={2024} />
          </>
        )}
      </CardWrapper>
    )
}

export default PDICard;