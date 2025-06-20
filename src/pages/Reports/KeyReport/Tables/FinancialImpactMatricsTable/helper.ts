import { getCurrentQuarterNumber, getCurrentQuarterNumericString, getLastQuarterString } from "@/utils/helper/CurrentQuarterGraphHelper";

export const getAbsenteeismCost = (apiData:any) => {

    const currentYearData = apiData?.prediction_data?.find((yearData: any) => yearData.year === new Date().getFullYear());
        const currentQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getCurrentQuarterNumericString());
        const currentQuarterAbsenteeismCost = currentQuarterData?.absenteeism_costs;
    
        let previousQuarterData;
        if (getCurrentQuarterNumber() === 1) {
            const previousYearData = apiData?.historic_data?.find((yearData: any) => yearData?.year === new Date().getFullYear() - 1);
            previousQuarterData = previousYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
        } else {
            previousQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
        }
    
        const previousQuarterAbsenteeismCost = previousQuarterData?.absenteeism_costs; //TODO Notifiy backend that the keys differ 
        // console.log("this is the data of the api in table turnover rate",previousQuarterAbsenteeismCost)
    
        const QoQValue = ((currentQuarterAbsenteeismCost - previousQuarterAbsenteeismCost) / previousQuarterAbsenteeismCost) * 100;
    
        // console.log("apiData absenteeism costs", previousQuarterAbsenteeismCost)
        return {
            currentQuarterAbsenteeismCost: currentQuarterAbsenteeismCost?.toFixed(2),
            previousQuarterAbsenteeismCost: previousQuarterAbsenteeismCost?.toFixed(2),
            QoQValue: QoQValue?.toFixed(2),
        }

    
}

export const getTurnoverCostTableData = (apiData:any) => {

    const currentYearData = apiData?.prediction_data?.find((yearData: any) => yearData.year === new Date().getFullYear());
        const currentQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getCurrentQuarterNumericString());
        const currentQuarterTurnoverCost = currentQuarterData?.turnover_costs;
    
        let previousQuarterData;
        if (getCurrentQuarterNumber() === 1) {
            const previousYearData = apiData?.historic_data?.find((yearData: any) => yearData?.year === new Date().getFullYear() - 1);
            previousQuarterData = previousYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
        } else {
            previousQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
        }
    
        const previousQuarterTurnoverCost = previousQuarterData?.turnover_costs; //TODO Notifiy backend that the keys differ 
        // console.log("this is the data of the api in table turnover rate",previousQuarterTurnoverCost)
    
        const QoQValue = ((currentQuarterTurnoverCost - previousQuarterTurnoverCost) / previousQuarterTurnoverCost) * 100;
    
        // console.log("apiData absenteeism costs", previousQuarterTurnoverCost)
        return {
            currentQuarterTurnoverCost: currentQuarterTurnoverCost?.toFixed(2),
            previousQuarterTurnoverCost: previousQuarterTurnoverCost?.toFixed(2),
            QoQValue: QoQValue?.toFixed(2),
        }

}

export const getCostOfVacancyTableData = (apiData:any) => {

    const currentYearData = apiData?.prediction_data?.find((yearData: any) => yearData.year === new Date().getFullYear());
        const currentQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getCurrentQuarterNumericString());
        // const currentQuarterCostOfVacancy = currentQuarterData?.cost_of_vacancy;
        const currentQuarterCostOfVacancy = currentQuarterData?.turnover_costs;

    
        let previousQuarterData;
        if (getCurrentQuarterNumber() === 1) {
            const previousYearData = apiData?.historic_data?.find((yearData: any) => yearData?.year === new Date().getFullYear() - 1);
            previousQuarterData = previousYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
        } else {
            previousQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
        }
    
        // const previousQuarterCostOfVacancy = previousQuarterData?.cost_of_vacancy; //TODO Notifiy backend that the keys differ 
        const previousQuarterCostOfVacancy = previousQuarterData?.turnover_costs; //TODO Notifiy backend that the keys differ 

        // console.log("this is the data of the api in table turnover rate",previousQuarterCostOfVacancy)
    
        const QoQValue = ((currentQuarterCostOfVacancy - previousQuarterCostOfVacancy) / previousQuarterCostOfVacancy) * 100;
    
        // console.log("apiData absenteeism costs", currentQuarterCostOfVacancy)
        return {
            currentQuarterCostOfVacancy: currentQuarterCostOfVacancy?.toFixed(2),
            previousQuarterCostOfVacancy: previousQuarterCostOfVacancy?.toFixed(2),
            QoQValue: QoQValue?.toFixed(2),
        }

}

export const getPerformnceDeficitImpact = (apiData:any) => {

    const currentYearData = apiData?.prediction_data?.find((yearData: any) => yearData.year === new Date().getFullYear());
        const currentQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getCurrentQuarterNumericString());
        // const currentQuarterCostOfVacancy = currentQuarterData?.cost_of_vacancy;
        const currentQuarterPDI = currentQuarterData?.pdi;

    
        let previousQuarterData;
        if (getCurrentQuarterNumber() === 1) {
            const previousYearData = apiData?.historic_data?.find((yearData: any) => yearData?.year === new Date().getFullYear() - 1);
            previousQuarterData = previousYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
        } else {
            previousQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
        }
    
        // const previousQuarterPDI = previousQuarterData?.cost_of_vacancy; //TODO Notifiy backend that the keys differ 
        const previousQuarterPDI = previousQuarterData?.pdi; //TODO Notifiy backend that the keys differ 

        // console.log("this is the data of the api in table turnover rate",previousQuarterPDI)
    
        const QoQValue = ((currentQuarterPDI - previousQuarterPDI) / previousQuarterPDI) * 100;
    
        // console.log("apiData absenteeism costs", previousQuarterPDI)
        return {
            currentQuarterPDI: currentQuarterPDI?.toFixed(2),
            previousQuarterPDI: previousQuarterPDI?.toFixed(2),
            QoQValue: QoQValue?.toFixed(2),
        }
}