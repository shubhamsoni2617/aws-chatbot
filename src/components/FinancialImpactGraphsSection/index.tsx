import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";
import KpiCardFinancialImpact from "./components/KpiCardFinancialImpact";
import BottomGraphRow from "./components/BottomGrpahRow";
import TopGraphRow from "./components/TopGraphRow";

// ];
const FinancialImpactGraphsSection = (props: any) => {
  const {
    // currentQuarter,
    // currentYear,
    // previousYear,
    absenteeismCost,
    performanceDeficitImpact,
    turnOverCost,
    costOfVacancy,
    isPredictiveAnalytics,
    currentQuarterKpiSum,
    currentYearKpiSum,
    previousYearKpiSum,
  } = props;
  // console.log("in graph ", performanceDeficitImpact?.data)
  const {
    turnoverCostLoading,
    absenteesimCostLoading,
    performanceDefecitImpactLoading,
  } = useAppSelector((store) => store.financiaImpact);
  return (
    <>
      {turnoverCostLoading ||
      absenteesimCostLoading ||
      performanceDefecitImpactLoading ? (
        <div className="flex justify-center items-center w-full h-[calc(80vh-100px)] bg-background">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div className="gap-[16px] flex flex-col">
          {!isPredictiveAnalytics && (
            <KpiCardFinancialImpact
              currentQuarterKpiSum={currentQuarterKpiSum}
              currentYearKpiSum={currentYearKpiSum}
              previousYearKpiSum={previousYearKpiSum}
            />
          )}

          <TopGraphRow
            costOfVacancy={costOfVacancy}
            turnOverCost={turnOverCost}
          />
          <BottomGraphRow
            performanceDeficitImpact={performanceDeficitImpact}
            absenteeismCost={absenteeismCost}
          />
        </div>
      )}
    </>
  );
};
export default FinancialImpactGraphsSection;
