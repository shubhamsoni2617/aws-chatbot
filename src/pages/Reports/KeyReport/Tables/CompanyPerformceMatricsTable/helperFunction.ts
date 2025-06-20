import { getCurrentQuarterNumber, getCurrentQuarterNumericString, getLastQuarterString } from "@/utils/helper/CurrentQuarterGraphHelper";

export const getTurnoverRateTableParameters = (apiData: any) => {

    const currentYearData = apiData?.prediction_data?.find((yearData: any) => yearData.year === new Date().getFullYear());
    const currentQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getCurrentQuarterNumericString());
    const currentQuarterTurnoverRate = currentQuarterData?.turnover_rate;

    let previousQuarterData;
    if (getCurrentQuarterNumber() === 1) {
        const previousYearData = apiData?.historic_data?.find((yearData: any) => yearData?.year === new Date().getFullYear() - 1);
        previousQuarterData = previousYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
    } else {
        previousQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
    }

    const previousQuarterTurnoverRate = previousQuarterData?.turnover_rate;
    // console.log("this is the data of the api in table turnover rate",previousQuarterTurnoverRate)

    const QoQValue = ((currentQuarterTurnoverRate - previousQuarterTurnoverRate) / previousQuarterTurnoverRate) * 100;

    return {
        currentQuarterTurnoverRate: currentQuarterTurnoverRate?.toFixed(2),
        previousQuarterTurnoverRate: previousQuarterTurnoverRate?.toFixed(2),
        QoQValue: QoQValue?.toFixed(2),
    }
}

export const getAbsenteeismRateTableParameters = (apiData: any) => {
    const currentYearData = apiData?.prediction_data?.find((yearData: any) => yearData.year === new Date().getFullYear());
    const currentQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getCurrentQuarterNumericString());
    const currentQuarterAbsenteeismRate = currentQuarterData?.absenteeism_rate;

    let previousQuarterData;
    if (getCurrentQuarterNumber() === 1) {
        const previousYearData = apiData?.historic_data?.find((yearData: any) => yearData?.year === new Date().getFullYear() - 1);
        previousQuarterData = previousYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
    } else {
        previousQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
    }

    const previousQuarterAbsenteeismRate = previousQuarterData?.absenteeism_rate;
    // console.log("this is the data of the api in table turnover rate",previousQuarterData)

    const QoQValue = ((currentQuarterAbsenteeismRate - previousQuarterAbsenteeismRate) / previousQuarterAbsenteeismRate) * 100;

    return {
        currentQuarterAbsenteeismRate: currentQuarterAbsenteeismRate?.toFixed(2),
        previousQuarterAbsenteeismRate: previousQuarterAbsenteeismRate?.toFixed(2),
        QoQValue: QoQValue?.toFixed(2),
    }
}

export const getRetentionRateTableData = (apiData:any,apiString:string) => {
    const currentYearData = apiData?.prediction_data?.find((yearData: any) => yearData.year === new Date().getFullYear());
    const currentQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getCurrentQuarterNumericString());
    const currentQuarterRetentionRate = currentQuarterData?.[`${apiString}`];

    let previousQuarterData;
    if (getCurrentQuarterNumber() === 1) {
        const previousYearData = apiData?.historic_data?.find((yearData: any) => yearData?.year === new Date().getFullYear() - 1);
        previousQuarterData = previousYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
    } else {
        previousQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
    }

    const previousQuarterRetentinoRateRate = previousQuarterData?.[`${apiString}`];

    const QoQValue = ((currentQuarterRetentionRate - previousQuarterRetentinoRateRate) / previousQuarterRetentinoRateRate) * 100;
    // console.log("this is the data of the api in table turnover rate",currentYearData,currentQuarterData,currentQuarterRetentionRate)

    return {
        currentQuarterRetentionRate: currentQuarterRetentionRate?.toFixed(2),
        previousQuarterRetentinoRateRate: previousQuarterRetentinoRateRate?.toFixed(2),
        QoQValue: QoQValue?.toFixed(2),
    }
}

export const getInternalMobilityRateTableData = (apiData:any) => {
    const currentYearData = apiData?.prediction_data?.find((yearData: any) => yearData.year === new Date().getFullYear());
    const currentQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getCurrentQuarterNumericString());
    const currentQuarterInternalMobilityRate = currentQuarterData?.retention_rate;

    let previousQuarterData;
    if (getCurrentQuarterNumber() === 1) {
        const previousYearData = apiData?.historic_data?.find((yearData: any) => yearData?.year === new Date().getFullYear() - 1);
        previousQuarterData = previousYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
    } else {
        previousQuarterData = currentYearData?.quarters?.find((elem: any) => elem?.quarter === getLastQuarterString());
    }

    const previousQuarterInternalMobilityoRateRate = previousQuarterData?.retention_rate;
    // console.log("this is the data of the api in table turnover rate",previousQuarterInternalMobilityoRateRate)

    const QoQValue = ((currentQuarterInternalMobilityRate - previousQuarterInternalMobilityoRateRate) / previousQuarterInternalMobilityoRateRate) * 100;

    return {
        currentQuarterInternalMobilityRate: currentQuarterInternalMobilityRate?.toFixed(2),
        previousQuarterInternalMobilityoRateRate: previousQuarterInternalMobilityoRateRate?.toFixed(2),
        QoQValue: QoQValue?.toFixed(2),
    }
}


