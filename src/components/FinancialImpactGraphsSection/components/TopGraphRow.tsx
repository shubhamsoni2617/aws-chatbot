import CostOfVacancyCard from "./CostOfVacancy";
import TurnoverCostCard from "./TurnoverCostCard";

const TopGraphRow = (props:any) => {
    const {costOfVacancy,turnOverCost} = props;
  return (
    <div
      className="additional-kpi-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 w-full"
      style={{ marginTop: 0, transition: "opacity 0.3s ease-in-out" }}
    >
      <CostOfVacancyCard costOfVacancy={costOfVacancy} />
      <TurnoverCostCard turnOverCost={turnOverCost} />
    </div>
  );
};

export default TopGraphRow;
