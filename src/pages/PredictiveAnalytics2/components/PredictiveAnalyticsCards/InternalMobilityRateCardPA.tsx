import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import CylinderChart from "@/components/PredictiveAnalytics3graphSection/CylinderChart";
import {
  getCurrentQuarterNumber,
  moveFirstToLast,
} from "@/utils/helper/CurrentQuarterGraphHelper";

const InternalMobilityRateCardPA = (props: any) => {
  const { transformedData } = props;
  let XAxisCategoriesQuarters = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
  for (let i = 0; i <= getCurrentQuarterNumber(); i++) {
    XAxisCategoriesQuarters = moveFirstToLast(XAxisCategoriesQuarters);
  }
  return (
    <>
      <CardWrapper
        classes="h-[420px] col-span-2"
        heading={"Internal Mobility Rate"}
        predictedValue={transformedData?.internalMobilityRate?.predictedValue}
        companyAverage={transformedData?.internalMobilityRate?.companyAverage}
      >
        {!transformedData?.internalMobilityRate?.data.length ? (
          <NoData /> //TODO CHANGE THE PROPERTY BASED ON DATA CONDITINAL CONDTIONO TO BE MODIFIED
        ) : (
          <CylinderChart
            dataRevenuePerEmployee={transformedData?.internalMobilityRate?.data}
            graphHeight="250px"
            XAxisCategories={XAxisCategoriesQuarters}
          />
        )}
        <div className="mt-[16px]">
          <Legend year={null} comparisonYear={2024} />
        </div>
      </CardWrapper>
    </>
  );
};

export default InternalMobilityRateCardPA;
