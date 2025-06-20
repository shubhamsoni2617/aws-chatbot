import CardWrapper from "@/components/CardWrapper"
import Legend from "@/components/Graphs/DashboardGraphs/Legend"
import SingleRoundBarGraph from "@/components/Graphs/DashboardGraphs/SingleBarGraph"
import NoData from "@/components/NoData"
import { useAppSelector } from "@/store/hooks"
import { Spin } from "antd"

const PerformanceDefecitCard = (props:any) => {
    const {performanceDeficitImpact} = props;
    const {performanceDefecitImpactLoading} = useAppSelector((store) => store.financiaImpact);
    const {periodSelected} = useAppSelector((store) => store.userData);
    const currentYear = new Date().getFullYear();
    return(
        <CardWrapper
              classes="col-span-1 sm:col-span-2 lg:col-span-2 h-[414px]"
              heading={"Performance Deficit"}
              predictedValue={performanceDeficitImpact?.predictedValue || 0}
              companyAverage={performanceDeficitImpact?.companyAverage || 0}
            >
              {performanceDefecitImpactLoading ? (
                <Spin className="h-[290px] flex justify-center items-center" />
              ) : performanceDeficitImpact?.data?.length === 0 ? (
                <NoData />
              ) : (
                <>
                  <SingleRoundBarGraph
                    data={performanceDeficitImpact?.data}
                    isReport={false}
                    isPercentage={false}
                  />
                  <Legend
                    year={periodSelected}
                    comparisonYear={currentYear - 1}
                  />
                </>
              )}
            </CardWrapper>
    )
}

export default PerformanceDefecitCard;