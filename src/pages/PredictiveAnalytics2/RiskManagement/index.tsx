import UIButton from "@/components/ui/UIButton";
// import { TfiPieChart } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const RiskManagement = () => {
  const navigate = useNavigate();
  const riskAlertButtonNavigate = () => {
    navigate('/predictive-analytics/RiskAlert')
  }
    return(
        <div className="bg-white rounded-xl shadow-md mb-[20px] p-[20px]">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                  color: "#1E293B",
                }}
              >
                Risk Assessment
              </div>
              <UIButton
                background="#C847E8"
                text="Risk Alert"
                color="#fff"
                borderColor="#C847E8"
                onClick={riskAlertButtonNavigate}
              />
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#475569",
                marginTop: "24px",
                marginBottom: "30px"
              }}
            >
              Our predictive model indicates a significant risk factor associated with the analyzed data. Key drivers have been identified, and proactive measures are recommended to mitigate potential impact.
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
            
          </div>
    )

    // return(
    //   <div className="flex flex-row justify-center items-center mt-[25px]">
    //   <UIButton background="#c847e8" color="#fff" text="Risk Assessment" borderColor="#c847e8" onClick={() => riskAlertButtonNavigate()}/>

    //   </div>
    // )
}

export default RiskManagement;