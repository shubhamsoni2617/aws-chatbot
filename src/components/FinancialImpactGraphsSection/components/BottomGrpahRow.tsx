import AbsenteeismCostCard from "./AbsenteeismCostCard"
import PerformanceDefecitCard from "./PerformnceDefecitCard"

const BottomGraphRow = (props:any) => {
    const {performanceDeficitImpact,absenteeismCost} = props;
    return(
        <div
            className="additional-kpi-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 w-full h-[414px]"
            style={{
              // marginTop: 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <PerformanceDefecitCard
              performanceDeficitImpact={performanceDeficitImpact}
            />
            <AbsenteeismCostCard absenteeismCost={absenteeismCost} />
          </div>
    )
}

export default BottomGraphRow;