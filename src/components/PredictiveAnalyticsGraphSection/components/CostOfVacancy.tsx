import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import CylinderChart from "@/components/PredictiveAnalytics3graphSection/CylinderChart";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const CostOfVacancy = (props:any) => {
    const {costOfVacancy,XAxisCategoriesQuarters} = props;
    const {turnoverCostLoading } = useAppSelector(store => store.financiaImpact)

    return(
        <CardWrapper
        classes="h-[420px] col-span-6 md:col-span-3 lg:col-span-2"
        heading={"Cost of Vacancy"}
        predictedValue={costOfVacancy?.predictedValue}
        companyAverage={costOfVacancy?.companyAverage}
      >
        {turnoverCostLoading ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : costOfVacancy?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <CylinderChart
              dataRevenuePerEmployee={costOfVacancy?.data}
              graphHeight="250px"
              XAxisCategories={XAxisCategoriesQuarters}
              isPrecentage={true}
              tooltipName={"Cost of Vacancy"}
            />
            <div className="mt-[16px]">
              <Legend year={null} comparisonYear={2024} />
            </div>
          </>
        )}
      </CardWrapper>
    )
}
export default CostOfVacancy;