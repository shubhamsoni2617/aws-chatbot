import CardWrapper from "@/components/CardWrapper"
import BarGraph from "@/components/Graphs/DashboardGraphs/BarGraph"
import Legend from "@/components/Graphs/DashboardGraphs/Legend"
import NoData from "@/components/NoData"
import { useAppSelector } from "@/store/hooks"
import { Spin } from "antd"

const CostOfVacancyCard = (props:any) => {
    const {costOfVacancy} = props;
    const {turnoverCostLoading} = useAppSelector(store => store.financiaImpact)
    const {periodSelected} = useAppSelector(store => store.userData)
    const currentYear = new Date().getFullYear();
    return(
        <CardWrapper
              classes="col-span-1 sm:col-span-2 lg:col-span-2 h-[414px]"
              companyAverage={costOfVacancy?.companyAverage}
              heading="Cost of Vacancy"
              predictedValue={costOfVacancy?.predictedValue}
            >
              {turnoverCostLoading ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : costOfVacancy?.data?.length === 0 ? (
                <NoData />
              ) : (
                <>
                  <BarGraph
                    data={costOfVacancy?.data}
                    // isReport={false}
                    isPercentage={false}
                  />
                  <Legend
                    year={periodSelected}
                    comparisonYear={currentYear - 1}
                  />
                </>
              )}

              {/* <BarGraph data={data} isReport={false} isPercentage={false} /> */}
            </CardWrapper>
    )
}

export default CostOfVacancyCard;