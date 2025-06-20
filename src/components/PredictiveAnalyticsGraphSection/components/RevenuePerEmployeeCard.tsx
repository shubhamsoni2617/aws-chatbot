import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import CylinderChart from "@/components/PredictiveAnalytics3graphSection/CylinderChart";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const RevenuePerEmployeeCard = (props:any) => {
    const {revenuePerEmployee,XAxisCategoriesYears } = props;
    const {isLoadingRevenuePerEmployee} = useAppSelector(store => store.companyPerformanceData)
    return(
        <CardWrapper
        classes="h-[450px] col-span-6 md:col-span-3 lg:col-span-2"
        heading={"Revenue Per Employee"}
        predictedValue={revenuePerEmployee?.predictedValue}
        companyAverage={revenuePerEmployee?.companyAverage}
      >
        {isLoadingRevenuePerEmployee ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : revenuePerEmployee?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <CylinderChart
              dataRevenuePerEmployee={revenuePerEmployee?.data}
              graphHeight="300px"
              XAxisCategories={XAxisCategoriesYears}
              tooltipName={"Revenue Per Employee"}
            />
            <Legend year={null} comparisonYear={2024} />
          </>
        )}
      </CardWrapper>
    )
}

export default RevenuePerEmployeeCard;