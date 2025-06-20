import FinancialImpactCard from "../FinalcialImpactCard";

const KpiCardFinancialImpact = (props:any) => {
    const {currentQuarterKpiSum,currentYearKpiSum,previousYearKpiSum} = props;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full ">
      {/* <Skeleton active={turnoverCostLoading && absenteesimCostLoading && performanceDefecitImpactLoading}> */}
      <FinancialImpactCard
        txtFirst="Sum of the presented KPIs in the"
        txtSecond="current quarter"
        amount={currentQuarterKpiSum}
      />
      {/* </Skeleton> */}
      <FinancialImpactCard
        txtFirst="Sum of the presented KPIs in the"
        txtSecond="current year"
        amount={currentYearKpiSum}
      />
      <FinancialImpactCard
        txtFirst="Sum of the presented KPIs in the"
        txtSecond="previous year"
        amount={previousYearKpiSum}
      />
    </div>
  );
};

export default KpiCardFinancialImpact;