import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import CylinderChart from "@/components/PredictiveAnalytics3graphSection/CylinderChart";
import { convertToHighchartsSeriesForRevenuePerEmployee } from "@/pages/PredictiveAnalytics3/helper";

const RevenuePerEmployeeCardPA = (props: any) => {
  const { transformedData } = props;
  const XAxisCategoriesYears = ["2024", "2025"];
  return (
    <>
      <CardWrapper
        classes="h-[450px] col-span-2"
        heading={"Revenue Per Employee"}
        predictedValue={
          convertToHighchartsSeriesForRevenuePerEmployee(
            transformedData?.revenuePerEmployee
          )?.predictedValue
        }
        companyAverage={
          convertToHighchartsSeriesForRevenuePerEmployee(
            transformedData?.revenuePerEmployee
          )?.companyAverage
        }
      >
        {!convertToHighchartsSeriesForRevenuePerEmployee(
          transformedData?.revenuePerEmployee
        )?.data.length ? (
          <NoData />
        ) : (
          <CylinderChart
            dataRevenuePerEmployee={
              convertToHighchartsSeriesForRevenuePerEmployee(
                transformedData?.revenuePerEmployee
              )?.data
            }
            graphHeight="300px"
            XAxisCategories={XAxisCategoriesYears}
          />
        )}
        <Legend year={null} comparisonYear={2024} />
      </CardWrapper>
    </>
  );
};

export default RevenuePerEmployeeCardPA;