import {
  getCurrentQuarterNumber,
  moveFirstToLast,
} from "@/utils/helper/CurrentQuarterGraphHelper";
import {  useState } from "react";
// import MapFilterConatiner from "../MapFilterComponent";
// import { useSearchParams } from "react-router-dom";
// import { Spin } from "antd";
import WorlMapCard from "./components/WorldMapCard";
import RevenuePerEmployeeCard from "./components/RevenuePerEmployeeCard";
import RetentionRateCard from "./components/RetentionRateCard";
import FirstYearRetentionRateCard from "./components/FirstYearRetentionRateCard";
import InternalMobilityRateCard from "./components/InternalMobilityRateCard";
import TurnoverRateCard from "./components/TurnoverRateCard";
import AbsenteeismRateCard from "./components/AbsenteeismRateCard";
import CostOfVacancy from "./components/CostOfVacancy";
import TurnoverCostCard from "./components/TurnoverCostCard";
import PDICard from "./components/PDICard";
import AbsenteeismCostCard from "./components/AbsenteeismCostCard";
// import RotatingGlobeMap from "../NewWorldMap";

let XAxisCategoriesQuarters = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
for (let i = 0; i <= getCurrentQuarterNumber(); i++) {
  XAxisCategoriesQuarters = moveFirstToLast(XAxisCategoriesQuarters);
}
const XAxisCategoriesYears = ["2024", "2025"];

const PredictiveAnalyticsGraphSection = (props: any) => {
  const {
    retentionRate,
    firstYearRetentionRate,
    turnoverRate,
    turnoverCost,
    absenteeismRate,
    absenteeismCost,
    costOfVacancy,
    internalMobilityRate,
    revenuePerEmployee,
    performnceDefecitImpact,
    // mapData,
    // mapGeoData,
    // filterData,
    // isFetching,
  } = props;


  const [, setInnerFilterHighlightedState] = useState();

  return (
    <div className="grid grid-cols-6 gap-[16px]">
      <WorlMapCard
        setInnerFilterHighlightedState={setInnerFilterHighlightedState}
      />
      {/* setInnerFilterHighlightedState */}

      <RevenuePerEmployeeCard
        revenuePerEmployee={revenuePerEmployee}
        XAxisCategoriesYears={XAxisCategoriesYears}
      />
      <RetentionRateCard retentionRate={retentionRate} />
      <FirstYearRetentionRateCard
        firstYearRetentionRate={firstYearRetentionRate}
      />
      <InternalMobilityRateCard
        internalMobilityRate={internalMobilityRate}
        XAxisCategoriesQuarters={XAxisCategoriesQuarters}
      />

      <TurnoverRateCard turnoverRate={turnoverRate} />
      <AbsenteeismRateCard
        absenteeismRate={absenteeismRate}
        XAxisCategoriesQuarters={XAxisCategoriesQuarters}
      />

      <CostOfVacancy
        costOfVacancy={costOfVacancy}
        XAxisCategoriesQuarters={XAxisCategoriesQuarters}
      />
      <TurnoverCostCard turnoverCost={turnoverCost} />
      <PDICard performnceDefecitImpact={performnceDefecitImpact} />
      <AbsenteeismCostCard
        absenteeismCost={absenteeismCost}
        XAxisCategories={XAxisCategoriesQuarters}
      />
    </div>
  );
};

export default PredictiveAnalyticsGraphSection;
