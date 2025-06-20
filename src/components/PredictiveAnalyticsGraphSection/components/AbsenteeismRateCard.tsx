import CardWrapper from "@/components/CardWrapper"
import Legend from "@/components/Graphs/DashboardGraphs/Legend"
import NoData from "@/components/NoData"
import ColumnChart from "@/components/PredictiveAnalytics3graphSection/ColumnChart"
import { useAppSelector } from "@/store/hooks"
import { Spin } from "antd"

const AbsenteeismRateCard = (props:any) => {
    const {absenteeismRate,XAxisCategoriesQuarters} = props;
    const {isLoadingAbsenteesimRate} = useAppSelector(store => store.companyPerformanceData)
    return(
        <CardWrapper
        classes="h-[420px] col-span-6 md:col-span-3"
        heading={"Absenteeism Rate"}
        predictedValue={absenteeismRate?.predictedValue}
        companyAverage={absenteeismRate?.companyAverage}
      >
        {isLoadingAbsenteesimRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : absenteeismRate?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <ColumnChart
              dataRevenuePerEmployee={absenteeismRate?.data}
              graphHeight="250px"
              XAxisCategories={XAxisCategoriesQuarters}
            />
            <div className="mt-[16px]">
              <Legend year={null} comparisonYear={2024} />
            </div>
          </>
        )}
      </CardWrapper>
    )
}

export default AbsenteeismRateCard