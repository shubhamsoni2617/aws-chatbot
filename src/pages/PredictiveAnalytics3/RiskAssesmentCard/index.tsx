import UIButton from "@/components/ui/UIButton";
import GradientProgress from "./ProgressBar";
import { useNavigate } from "react-router-dom";

const RiskAssesmentCard = () => {
  const navigate = useNavigate();
  const riskAlertButtonNavigate = () => {
    navigate("/predictive-analytics/RiskAlert");
  };
  return (
    <div className="bg-white rounded-xl shadow-[0px_0px_8px_0px_#00000014] mb-[20px] p-[20px] h-[195px]">
      <div className="flex flex-col md:flex-row justify-between md:items-center items-start">
        <div className="font-bold text-[18px] text-[#1E293B]">
          Risk Assessment
        </div>
        <div className="w-full md:w-[auto] md:mt-0 mt-[16px]">
          <UIButton
            background="#C847E8"
            text="Risk Alert"
            color="#fff"
            borderColor="#C847E8"
            onClick={riskAlertButtonNavigate}
            // onClick={() => {}}
          />
        </div>
      </div>
      <div className="h-[32px] text-[14px] font-normal text-slate-600 mt-6 mb-6 leading-[16px] tracking-[0px] align-middle font-inter">
        Our predictive model indicates a significant risk factor associated with
        the analyzed data. Key drivers have been identified, and proactive
        measures are recommended to mitigate potential impact.
      </div>

      {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "24px",
              }}
            >
              <div
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#1E293B",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <TfiPieChart color="#C847e8" style={{ margin: "5px" }} />
                Probability of the forecast
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                99%
              </div>
            </div> */}

      <GradientProgress totalSteps={30} value={70} />
      <div className="flex flex-row justify-between mt-[10px]">
        <div className="text-gray-700 font-medium">Critical</div>
        <div className="text-gray-700 font-medium text-center">At Risk</div>
        <div className="text-gray-700 font-medium text-right">Stable</div>
      </div>
    </div>
  );
};

export default RiskAssesmentCard;
