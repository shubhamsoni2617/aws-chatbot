import CardWrapper from "@/components/CardWrapper"
import Legend from "@/components/Graphs/DashboardGraphs/Legend"
import NoData from "@/components/NoData"
import DualLineGraphPA from "@/components/PredictiveAnalytics3graphSection/DualLineGraphs"
import { useAppSelector } from "@/store/hooks"
import { Spin } from "antd"

const RetentionRateCard = (props:any) => {
    const {retentionRate} = props;
    const {isLoadingRetentionRate} = useAppSelector(store => store.companyPerformanceData)
    return(
        <CardWrapper
        classes="h-[420px] col-span-6 md:col-span-3 lg:col-span-2"
        heading={"Retention Rate"}
        predictedValue={retentionRate?.predictedValue}
        companyAverage={retentionRate?.companyAverage}
      >
        {isLoadingRetentionRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : retentionRate?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <DualLineGraphPA
              data={retentionRate?.data}
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

export default RetentionRateCard;