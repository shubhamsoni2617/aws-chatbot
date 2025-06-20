import { useMemo, useState } from "react";



import { transformDataforPredictiveAnalytics } from "../transformHelper";
import { transformYearlyData } from "@/pages/FinacialImpact/transformHelper";
import FilterContainer from "@/components/FilterContainer";
import DefaultLayout from "@/components/DefaultLayout";

import PredictiveAnalyticsFinancialImpactGraphSection from "@/components/PredictiveAnalyticsFinancialImpactGraphSection";
import { useAppSelector } from "@/store/hooks";


const FinancialImpactPA = () => {
  // const [locationId, setLocationId] = useState("");


  const [filterData, setFilterData] = useState({
    filterByPeriod: "",
    filterByCountry: "",
    filterByDepartment: "",
    filterByKpi: "",
  });
  type Props = {
    filterByPeriod: string;
    filterByCountry: string;
    filterByDepartment: string;
    filterByKpi: string;
  };

  const {
    absenteesimCostData,
    performanceDefecitImpactData,
    turnoverCostData,
  } = useAppSelector((store) => store.financiaImpact);
  const { periodSelected } = useAppSelector(
    (store) => store.userData
  );
  // console.log("Absenteesim Cost Data", absenteesimCostData);

  const transformedAbsenteeismCostData = useMemo(
    () => transformDataforPredictiveAnalytics(absenteesimCostData, periodSelected , "absenteeism_cost"),
    [absenteesimCostData]
  );
  const transformedTurnoverCostData = useMemo(
    () => transformDataforPredictiveAnalytics(turnoverCostData, periodSelected, "turnover_cost"),
    [turnoverCostData]
  );

  const transformedCostOfVacancy = useMemo(
    () => transformDataforPredictiveAnalytics(turnoverCostData, periodSelected,"cost_of_vacancy"),
    [turnoverCostData]
  );

  const transformedPerformaceDefecitImpact = useMemo(
    () => transformYearlyData(performanceDefecitImpactData, periodSelected, 'total_performance_deficit'),
    [performanceDefecitImpactData]
  );

//   const month= new Date().getMonth() + 1;
// console.log("month", month)


//   console.log("currentMonth",)


  const filterReciver = (filterParameters: Props) => {
    setFilterData(filterParameters);
    console.log("In Financial Impact Screen", filterData);
  };






  return (
    <DefaultLayout
      FilterComponent={
        <FilterContainer
          filterReciver={filterReciver}
          to="/financial-impact"
          heading="Predictive Analytics"
          mapDataReload={()=>{}}
                    // mapDataReload={mapDataReload}
        />
      }
      isFilter={true}
      heading="Predictive Analytics" 
    >
      { (
        <PredictiveAnalyticsFinancialImpactGraphSection
          absenteeismCost={transformedAbsenteeismCostData}
          performanceDeficitImpact={transformedPerformaceDefecitImpact}
          turnOverCost={transformedTurnoverCostData}
          costOfVacancy={transformedCostOfVacancy}
        />
      )}
    </DefaultLayout>
  );
};

export default FinancialImpactPA;
