import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";
import ColumnChart from "@/components/PredictiveAnalytics3graphSection/ColumnChart";
import CylinderChart from "@/components/PredictiveAnalytics3graphSection/CylinderChart";
import { convertToHighchartsSeries } from "@/pages/PredictiveAnalytics3/helper";
import { getCurrentQuarterNumber, moveFirstToLast } from "@/utils/helper/CurrentQuarterGraphHelper";

const AbsenteeismCardPA = (props:any) => {
    const {transformedData} = props;
    let XAxisCategoriesQuarters = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
      for (let i = 0; i <= getCurrentQuarterNumber(); i++) {
        XAxisCategoriesQuarters = moveFirstToLast(XAxisCategoriesQuarters);
      }
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <CardWrapper
        classes="h-[420px]"
        heading={"Absenteeism Rate"}
        predictedValue={
          convertToHighchartsSeries(transformedData?.absenteeismRate)
            ?.predictedValue
        }
        companyAverage={
          convertToHighchartsSeries(transformedData?.absenteeismRate)
            ?.companyAverage
        }
      >
        {!convertToHighchartsSeries(transformedData?.absenteeismRate)?.data
          .length ? (
          <NoData />
        ) : (
          <ColumnChart
            dataRevenuePerEmployee={
              convertToHighchartsSeries(transformedData?.absenteeismRate)?.data
            }
            graphHeight="250px"
            XAxisCategories={XAxisCategoriesQuarters}
          />
        )}
        <div className="mt-[16px]">
          <Legend year={null} comparisonYear={2024} />
        </div>
      </CardWrapper>
      <CardWrapper
        classes="h-[420px]"
        heading={"Absenteeism Cost"}
        predictedValue={
          convertToHighchartsSeries(transformedData?.absenteeismCost)
            ?.predictedValue
        }
        companyAverage={
          convertToHighchartsSeries(transformedData?.absenteeismCost)
            ?.companyAverage
        }
      >
        {!convertToHighchartsSeries(transformedData?.absenteeismCost)?.data
          .length ? (
          <NoData />
        ) : (
          <CylinderChart
            dataRevenuePerEmployee={
              convertToHighchartsSeries(transformedData?.absenteeismCost)?.data
            }
            graphHeight="250px"
            XAxisCategories={XAxisCategoriesQuarters}
          />
        )}
        <div className="mt-[16px]">
          <Legend year={null} comparisonYear={2024} />
        </div>
      </CardWrapper>
    </div>
  );
};

export default AbsenteeismCardPA; 
