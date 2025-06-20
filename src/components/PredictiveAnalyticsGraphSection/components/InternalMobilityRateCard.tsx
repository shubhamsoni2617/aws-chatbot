import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import CylinderChart from "@/components/PredictiveAnalytics3graphSection/CylinderChart";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const InternalMobilityRateCard = (props:any) => {
    const { internalMobilityRate,XAxisCategoriesQuarters } = props;
    const { isLoadingInternalMobilityRate } = useAppSelector(store => store.companyPerformanceData)
    return(
        <CardWrapper
        classes="h-[420px] col-span-6 md:col-span-3 lg:col-span-2"
        heading={"Internal Mobility Rate"}
        predictedValue={internalMobilityRate?.predictedValue}
        companyAverage={internalMobilityRate?.companyAverage}
      >
        {isLoadingInternalMobilityRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : internalMobilityRate?.data?.length === 0 ? (
          <NoData /> //TODO CHANGE THE PROPERTY BASED ON DATA CONDITINAL CONDTIONO TO BE MODIFIED
        ) : (
          <>
            <CylinderChart
              dataRevenuePerEmployee={internalMobilityRate?.data}
              graphHeight="250px"
              XAxisCategories={XAxisCategoriesQuarters}
              tooltipName={"Internal Mobility Rate"}
            />
            <div className="mt-[16px]">
              <Legend year={null} comparisonYear={2024} />
            </div>
          </>
        )}
      </CardWrapper>
    )
}

export default InternalMobilityRateCard;