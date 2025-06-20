import { useEffect, useMemo, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import FilterContainer from "../../components/FilterContainer";
import "./FinancialImpact.css";

import { Spin } from "antd";

import { useAppSelector } from "@/store/hooks";
import FinancialImpactGraphsSection from "@/components/FinancialImpactGraphsSection";

// import { useSearchParams } from "react-router-dom";
import { getCurrentQuarterSum, getCurrentYearSum } from "./helper";
import { transformData, transformYearlyData } from "./transformHelper";

const FinacialImpact = () => {
  // const dispatch = useAppDispatch();
  // const [searchParams] = useSearchParams();
  // const [locationId, setLocationId] = useState("");
  const {
    loading,
    financialImpact,
    absenteesimCostLoading,
    turnoverCostLoading,
    performanceDefecitImpactLoading,
  } = useAppSelector((store) => store.financiaImpact);

  const [currentQuarterKpiSum, setCurrentQuarterKpiSum] = useState(0);
  const [previousYearKpiSum, setPreviousYearrKpiSum] = useState(0);
  const [currentYearKpiSum, setCurrentYearKpiSum] = useState(0);

  const {
    currentQuarter,
    currentYear,
    previousYear,
  }: // absenteeismCost,
  // performanceDeficitImpact,
  // turnOverCost,
  // costOfVacancy,
  any = financialImpact || {};

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
  const { periodSelected } = useAppSelector((store) => store.userData);
  // console.log("Absenteesim Cost Data", absenteesimCostData);

  const transformedAbsenteeismCostData = useMemo(
    () =>
      transformData(absenteesimCostData, periodSelected, "absenteeism_cost"),
    [absenteesimCostData]
  );
  const transformedTurnoverCostData = useMemo(
    () => transformData(turnoverCostData, periodSelected, "turnover_cost"),
    [turnoverCostData]
  );

  const transformedCostOfVacancy = useMemo(
    () => transformData(turnoverCostData, periodSelected, "cost_of_vacancy"),
    [turnoverCostData]
  );

  const transformedPerformaceDefecitImpact = useMemo(
    () =>
      transformYearlyData(
        performanceDefecitImpactData,
        periodSelected,
        "total_performance_deficit"
      ),
    [performanceDefecitImpactData]
  );

  // console.log(
  //   "transfrom absenteesim cost data ceck for no datascreen",
  //   transformedPerformaceDefecitImpact
  // );

  //   const month= new Date().getMonth() + 1;
  // console.log("month", month)

  //   console.log("currentMonth",)

  useEffect(() => {
    // const abseteeismCost = getCurrentQuarterData(absenteesimCostData);

    // const turnoverAndVacancyCost = getTunoverCostAndCostOfVacancy(turnoverCostData);

    // const pdiCost = getPerformanceDeficitImpact(performanceDefecitImpactData);

    // getPreviousYearSum(absenteesimCostData,turnoverCostData,performanceDefecitImpactData);

    setCurrentYearKpiSum(
      getCurrentYearSum(
        absenteesimCostData,
        turnoverCostData,
        performanceDefecitImpactData
      )
    );
    setPreviousYearrKpiSum(0);

    setCurrentQuarterKpiSum(
      getCurrentQuarterSum(
        absenteesimCostData,
        turnoverCostData,
        performanceDefecitImpactData
      )
    );
  }, [absenteesimCostData, turnoverCostData, performanceDefecitImpactData]);
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
          heading="Financial Impact"
          mapDataReload={() => {}}
        />
      }
      isFilter={true}
      heading="Financial Impact"
    >
      {loading &&
      performanceDefecitImpactLoading &&
      absenteesimCostLoading &&
      turnoverCostLoading ? (
        <div className="flex justify-center items-center w-full h-[calc(80vh-100px)] bg-background">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <FinancialImpactGraphsSection
          currentQuarter={currentQuarter}
          currentYear={currentYear}
          previousYear={previousYear}
          absenteeismCost={transformedAbsenteeismCostData}
          performanceDeficitImpact={transformedPerformaceDefecitImpact}
          turnOverCost={transformedTurnoverCostData}
          costOfVacancy={transformedCostOfVacancy}
          previousYearKpiSum={previousYearKpiSum}
          currentYearKpiSum={currentYearKpiSum}
          currentQuarterKpiSum={currentQuarterKpiSum}
        />
      )}
    </DefaultLayout>
  );
};

export default FinacialImpact;
