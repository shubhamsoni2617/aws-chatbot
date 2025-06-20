import { useNavigate } from "react-router-dom";
import CompanyPerformanceMatricsTable from "../Tables/CompanyPerformceMatricsTable";
import FinancialImpactMatricsTable from "../Tables/FinancialImpactMatricsTable";
import DropDownComponent from "./DropDownComponent";
import PredictiveAnalyticsHighlightSection from "./PredictiveAnalyticsHighlightSection";

const KeyReportKPIDropdowns = (props: any) => {
  const navigate = useNavigate();
  const { reportsRecommendation } = props;
  const handleSeeDetials = () => {
    navigate("/reports/SeeDetails/CompanyPerformace");
  };

  const handleFinancialImpactSeeDetails = () => {
    navigate("/reports/SeeDetails/FinancialImpact");
  };
  return (
    <>
      <div>
        <DropDownComponent
          heading="Company Performance Metrics"
          navigationFunction={() => handleSeeDetials()}
        >
          <CompanyPerformanceMatricsTable />
        </DropDownComponent>
      </div>

      <div>
        <DropDownComponent
          heading="Financial Impact Metrics"
          navigationFunction={() => handleFinancialImpactSeeDetails()}
        >
          <FinancialImpactMatricsTable />
        </DropDownComponent>
      </div>

      {/* <div>
                  <DropDownComponent
                    heading="Company Pulse Metrics"
                    navigationFunction={() => {}}
                  > */}
      {/* <FinancialImpactMatricsTable /> */}
      {/* <div>Company Pulse Metrics Table</div>
                  </DropDownComponent>
                </div> */}

      <PredictiveAnalyticsHighlightSection
        reportsRecommendation={reportsRecommendation}
      />
      {/* <hr className="mt-[44px]" />
        
                <div>
                  <DropDownComponent heading="Strategic Recommendations">
                    <div>Strategic Recommendations contents</div>
                  </DropDownComponent>
                </div> */}
    </>
  );
};

export default KeyReportKPIDropdowns;
