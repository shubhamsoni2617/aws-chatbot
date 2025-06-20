import AbsenteeismCardCPFI from "./CompanyPerformanceFinancialImpactCards/AbsenteeismCardCPFI";
import CostOfVacancyCardCPFI from "./CompanyPerformanceFinancialImpactCards/CostOfVacancyCardCPFI";
import InternalMobilityCardCPFI from "./CompanyPerformanceFinancialImpactCards/InternalMobilityCardCPFI";
import PDICardCPFI from "./CompanyPerformanceFinancialImpactCards/PDICardCPFI";
import RetentionRateCardCPFI from "./CompanyPerformanceFinancialImpactCards/RetentionRateCardCPFI";
import RevenuePerEmployeeCPFI from "./CompanyPerformanceFinancialImpactCards/RevenuePerEmployeeCPFI";
import TurnoverCardCPFI from "./CompanyPerformanceFinancialImpactCards/TurnoverCardCPFI";


const CPandFIGraphConfig = (props: any) => {
  const { heading, transformedData } = props;

  switch (heading) {
    //Turnover Rate and Cost
    case "Turnover Rate":
    case "Turnover Cost":
    case "": {
      return (
        <TurnoverCardCPFI heading={heading} transformedData={transformedData} />
      );
    }

    //Absenteeism Rate and Cost
    case "Absenteeism Rate":
    case "Absenteeism Cost": {
      return <AbsenteeismCardCPFI />;
    }

    //Revenue Per employee
    case "Revenue per Employee": {
      return <RevenuePerEmployeeCPFI transformedData={transformedData} />;
    }

    //Retention Rate 
    case "Retention Rate": 
    case "First Year Retention Rate": {
      return <RetentionRateCardCPFI transformedData={transformedData} />;

    }

    //Internal Mobility Rate
    case "Internal Mobility Rate" : {
        return <InternalMobilityCardCPFI transformedData={transformedData}/>
    }

    //Cost of Vacancy
    case "Cost of Vacancy":{
        return <CostOfVacancyCardCPFI transformedData={transformedData}/>
    }

    //PDI 

    case "Performance Deficit" : {
        return <PDICardCPFI transformedData={transformedData}/>
    }
  }
};

export default CPandFIGraphConfig;
