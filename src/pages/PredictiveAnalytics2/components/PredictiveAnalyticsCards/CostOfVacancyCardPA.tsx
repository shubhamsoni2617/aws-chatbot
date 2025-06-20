import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import CylinderChart from "@/components/PredictiveAnalytics3graphSection/CylinderChart";
import { convertToHighchartsSeries } from "@/pages/PredictiveAnalytics3/helper";
import { getCurrentQuarterNumber, moveFirstToLast } from "@/utils/helper/CurrentQuarterGraphHelper";

const CostOfVacancyCardPA = (props: any) => {
  const { transformedData } = props;
  let XAxisCategoriesQuarters = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
    for (let i = 0; i <= getCurrentQuarterNumber(); i++) {
      XAxisCategoriesQuarters = moveFirstToLast(XAxisCategoriesQuarters);
    }
  return (
    <>
      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2"
        companyAverage={transformedData?.costOfVacancy?.companyAverage}
        heading="Cost of Vacancy"
        predictedValue={transformedData?.costOfVacancy?.predictedValue}
      >
        <CylinderChart
          dataRevenuePerEmployee={
            convertToHighchartsSeries(transformedData?.costOfVacancy)?.data
          }
          graphHeight="250px"
          XAxisCategories={XAxisCategoriesQuarters}
          isPrecentage={true}
        />

        <div className="mt-[16px]">
          <Legend year={null} comparisonYear={2024} />
        </div>
      </CardWrapper>
    </>
  );
};
export default CostOfVacancyCardPA;
