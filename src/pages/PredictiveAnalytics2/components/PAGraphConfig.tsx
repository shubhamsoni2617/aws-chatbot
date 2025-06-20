import AbsenteeismCardPA from "./PredictiveAnalyticsCards/AbsenteeismCardPA";
import CostOfVacancyCardPA from "./PredictiveAnalyticsCards/CostOfVacancyCardPA";
import InternalMobilityRateCardPA from "./PredictiveAnalyticsCards/InternalMobilityRateCardPA";
import PDICardPA from "./PredictiveAnalyticsCards/PDICardPA";
import RetentionRateCardPA from "./PredictiveAnalyticsCards/RetentionRateCardPA";
import RevenuePerEmployeeCardPA from "./PredictiveAnalyticsCards/RevenuePerEmployeeCardPA";
import TurnoverCardPA from "./PredictiveAnalyticsCards/TurnoverCardPA";

const PAGraphConfig = (props: any) => {
  const { heading, transformedData } = props;

  switch (heading) {
    // Turnover Rate and Cost
    case "Turnover Rate":
    case "Turnover Cost":
    case "": {
      return <TurnoverCardPA transformedData={transformedData} />;
    }

    // Absenteeism Rate and Cost
    case "Absenteeism Rate":
    case "Absenteeism Cost": {
      return <AbsenteeismCardPA transformedData={transformedData} />;
    }

    //Revenue Per Employee
    case "Revenue Per Employee": {
      return <RevenuePerEmployeeCardPA transformedData={transformedData} />;
    }

    //Retention Rate And First Year Retention Rate
    case "Retention Rate":
    case "First Year Retention Rate": {
      return <RetentionRateCardPA transformedData={transformedData} />;
    }

    //Internal Mobility Rate
    case "Internal Mobility Rate": {
      return <InternalMobilityRateCardPA transformedData={transformedData} />;
    }

    //Cost of Vacancy
    case "Cost of Vacancy": {
      return <CostOfVacancyCardPA transformedData={transformedData} />;
    }

    //PDI
    case "Performance Deficit": {
        return <PDICardPA transformedData={transformedData} />
    }
  }
};

export default PAGraphConfig;
