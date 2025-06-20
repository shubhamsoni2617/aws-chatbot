import CardWrapper from "@/components/CardWrapper"
import AreaChartGraph from "@/components/Graphs/DashboardGraphs/AreaChartGraph"
import Legend from "@/components/Graphs/DashboardGraphs/Legend"
import NoData from "@/components/NoData"
import { useAppSelector } from "@/store/hooks"
import { Spin } from "antd"

const AbsenteeismCostCard = (props:any) => {
    const {absenteeismCost} = props;
    const {absenteesimCostLoading} = useAppSelector(store => store.financiaImpact);
    const {periodSelected} = useAppSelector(store => store.userData);
    const currentYear = new Date().getFullYear();
    return(
        <CardWrapper
              classes="col-span-1 sm:col-span-2 lg:col-span-4 h-[414px]"
              predictedValue={absenteeismCost?.predictedValue}
              companyAverage={absenteeismCost?.companyAverage}
              heading={"Absenteeism Cost"}
            >
              {absenteesimCostLoading ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : absenteeismCost?.data?.length === 0 ? (
                <NoData />
              ) : (
                <>
                  <AreaChartGraph
                    marginLeft={0}
                    color2023={"#A5B4FF"}
                    color2024={"#FCC439"}
                    hideAxis={false}
                    fillSec={false}
                    height={250}
                    data={absenteeismCost?.data}
                    isPercentage={false}
                  />
                  <Legend
                    year={periodSelected}
                    comparisonYear={currentYear - 1}
                  />
                </>
              )}

              {/* <AreaChartGraph
            marginLeft={0}
            color2023={"#A5B4FF"}
            color2024={"#FCC439"}
            hideAxis={false}
            fillSec={false}
            height={310}
            data={data}
            isPercentage={false}
          /> */}
            </CardWrapper>
    )
}

export default AbsenteeismCostCard;