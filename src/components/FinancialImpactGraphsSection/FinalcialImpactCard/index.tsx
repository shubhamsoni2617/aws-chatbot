import { useAppSelector } from "@/store/hooks";
import "./FinancialImpactCard.css";
import { Skeleton } from "antd";

type Props = {
  txtFirst: string;
  txtSecond: string;
  amount: number;
};
const FinancialImpactCard = (props: Props) => {
  const { amount, txtFirst, txtSecond } = props;
  const {
    turnoverCostLoading,
    absenteesimCostLoading,
    performanceDefecitImpactLoading,
  } = useAppSelector((store) => store.financiaImpact);
  return (
    <div className="bg-white shadow-sm rounded-xl p-[20px] h-[133px]">
      <div className="text">
        <span className="font-[600] text-[16px]">{txtFirst}</span>
        <span className="secondTxt font-[600] text-[16px]">{txtSecond}</span>
      </div>
      {turnoverCostLoading ||
      absenteesimCostLoading ||
      performanceDefecitImpactLoading ? (
        <Skeleton
          active={
            turnoverCostLoading ||
            absenteesimCostLoading ||
            performanceDefecitImpactLoading
          }
          paragraph={{ rows: 1 }}
        />
      ) : (
        <div className="amount h-[39px]">£{isNaN(amount) ? 0 : amount}</div>
      )}

      {/* </Skeleton> */}
    </div>
  );
};

export default FinancialImpactCard;
