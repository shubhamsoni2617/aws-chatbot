import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import CylinderChart from "@/components/PredictiveAnalytics3graphSection/CylinderChart";
import { useAppSelector } from "@/store/hooks";
import { getCurrentQuarterNumber, moveFirstToLast } from "@/utils/helper/CurrentQuarterGraphHelper";
import { Spin } from "antd";

const AbsenteeismCostCard = (props: any) => {
  const { absenteeismCost } = props;
  const { absenteesimCostLoading } = useAppSelector(
    (store) => store.financiaImpact
  );
  let XAxisCategoriesQuarters = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
  for (let i = 0; i <= getCurrentQuarterNumber(); i++) {
    XAxisCategoriesQuarters = moveFirstToLast(XAxisCategoriesQuarters);
  }
  return (
    <CardWrapper
      classes="h-[420px] col-span-6 md:col-span-3 lg:col-span-4"
      heading={"Absenteeism Cost"}
      predictedValue={absenteeismCost?.predictedValue}
      companyAverage={absenteeismCost?.companyAverage}
    >
      {absenteesimCostLoading ? (
        <Spin className="h-[250px] flex justify-center items-center" />
      ) : absenteeismCost?.data.length === 0 ? (
        <NoData />
      ) : (
        <>
          <CylinderChart
            dataRevenuePerEmployee={absenteeismCost?.data}
            graphHeight="250px"
            XAxisCategories={XAxisCategoriesQuarters}
            groupPadding={0.3}
            tooltipName={"Absenteeism Cost"}
          />
          <div className="mt-[16px]">
            <Legend year={null} comparisonYear={2024} />
          </div>
        </>
      )}
    </CardWrapper>
  );
};

export default AbsenteeismCostCard;
