
// import { current, prepareAutoBatched } from "@reduxjs/toolkit";

import { getCurrentQuarterNumber, getCurrentQuarterString, getLastQuarterString } from "@/utils/helper/CurrentQuarterGraphHelper";

const currentYear = new Date().getFullYear() - 1;
const lastYear = currentYear - 1;

export const getCurrentQuarterData = (data: any) => {
  let totalCurrentYearCost = 0;
  let totalPreviousYearCost = 0;
  const currentYearData = data?.historic_data?.find(
    (yearData: any) =>
      yearData.year === currentYear || yearData.year === currentYear.toString()
  );
  const lastYearData = data?.historic_data?.find(
    (yearData: any) =>
      yearData.year === lastYear || yearData.year === lastYear.toString()
  );

  // console.log("currentYearData", currentYearData, lastYearData,)
  // console.log("lastYearData", lastYearData)

  for (let i = 0; i < 4; i++) {
    totalCurrentYearCost += currentYearData?.quarters[i]["absenteeism_cost"];
    totalPreviousYearCost += lastYearData?.quarters[i]["absenteeism_cost"];
  }



  return {
    currentTotal: totalCurrentYearCost,
    previousTotal: totalPreviousYearCost,
  };


};

export const getTunoverCostAndCostOfVacancy = (data: any) => {
  let totalCostCurrentYear = 0;
  let totalCostPreviousYear = 0;
  const currentYearData = data?.prediction_data?.find(
    (yeardata: any) =>
      yeardata.year === currentYear || yeardata.year === currentYear.toString()
  );
  const perviousYearData = data?.historic_data?.find(
    (yeardata: any) =>
      yeardata.year === lastYear || yeardata.year === lastYear.toString()
  );

  totalCostCurrentYear =
    currentYearData?.cost_of_vacancy + currentYearData?.total_turnover_cost;
  totalCostPreviousYear =
    perviousYearData?.cost_of_vacancy + perviousYearData?.total_turnover_cost;

  // console.log("curent year of get function", currentYearData?.total_turnover_cost)

  return {
    currentYearTotalCost: totalCostCurrentYear,
    previousYearTotalCost: totalCostPreviousYear,
  };
};

export const getPerformanceDeficitImpact = (data: any) => {
  function calculateTotalPDI(data: any, year: any) {
    let totalPDI = 0;

    if (data?.historic_data[year]) {
      // Calculate from historic data
      const quarters = data?.historic_data[year];
      for (const quarter in quarters) {
        for (const month in quarters[quarter]) {
          totalPDI += quarters[quarter][month].pdi;
        }
      }
    }

    return totalPDI;
  }

  const totalCostCurrentYear = calculateTotalPDI(data, currentYear.toString());

  const totalCostPreviousYear = calculateTotalPDI(data, lastYear.toString());
  // console.log("this is the data",totalCostCurrentYear,totalCostPreviousYear)

  return {
    currentYearTotalPdi: totalCostCurrentYear,
    previouYearTotalPdi: totalCostPreviousYear,
  };
};

const currentMonth = getCurrentQuarterString();
let quarter = "";

if (currentMonth === "Jan-Mar") quarter = "Q4";

if (currentMonth === "Apr-Jun") quarter = "Q1";

if (currentMonth === "Jul-Sep") quarter = "Q2";

if (currentMonth === "Oct-Dec") quarter = "Q3";

export const getPreviousQuarterData = (data: any) => {
  const currentYearData = data?.historic_data?.find(
    (yearData: any) =>
      yearData.year === currentYear || yearData.year === currentYear.toString()
  ); //TODO replace current year with logic for calculating previous quarter data
  const currentQuarterData = currentYearData?.quarters?.find(
    (quarterData: any) => quarterData?.quarter === quarter
  );

  const absenteeismCostPreviousQuarter = currentQuarterData?.absenteeism_cost;
  // console.log("currentMonth", absenteeismCostPreviousQuarter)

  return absenteeismCostPreviousQuarter;
};

export const getPreviousQuarterTurnoverCost = (data: any) => {
  const currentYearData = data?.prediction_data?.find(
    (yeardata: any) =>
      yeardata.year === currentYear || yeardata.year === currentYear.toString()
  );
  const currentQuarterData = currentYearData?.quarters?.find(
    (quarterData: any) => quarterData?.quarter === quarter
  );

  const totalTurnoverCost = currentQuarterData?.total_turnover_cost;
  console.log(
    "check quarterly data of tunover rate",
    currentQuarterData?.total_turnover_cost
  );

  return totalTurnoverCost;
};

export const getPerviousQuarterPdi = (data: any) => {
  const quarterData =
    data?.["historic_data"]?.[currentYear.toString()]?.[quarter];
  let totalQaurterData = 0;
  // quarterData?.forEach((elem) => {
  //     console.log("Check quarter data from pdi",elem)
  // })
  const pdiValues = Object.values(quarterData || {})?.map(
    (month) => (month as { pdi: number })?.pdi
  );

  pdiValues.forEach((elem) => {
    totalQaurterData += elem;
  });
  console.log("Check quarter data from pdi", quarterData);

  return totalQaurterData;
};


export const getCurrentQuarterSum = (absenteeismData: any, turnoverCostData: any, pdiData: any) => {

  const currYear = new Date().getFullYear();
  const singleApiQuarterData = (apiData: any, apiString: any) => {
    let yearData;
    if (+getCurrentQuarterNumber === 1) {
      yearData = apiData?.historic_data?.find((elem: any) => elem.year === currYear - 1 || elem.year === (currYear - 1).toString())
    }
    else {
      yearData = apiData?.prediction_data?.find((elem: any) => elem.year === currYear || elem.year === (currYear - 1).toString());
    }

    const quarterData = yearData?.quarters.find((elem: any) => elem.quarter === getLastQuarterString())
    // console.log("this is years data",quarterData?.[`${apiString}`] || quarterData?.[`${apiString}s`]);

    return (quarterData?.[`${apiString}`] || quarterData?.[`${apiString}s`]);
  }

  const absenteeismCost = singleApiQuarterData(absenteeismData, "absenteeism_cost")
  const turnoverCost = singleApiQuarterData(turnoverCostData, "turnover_cost")
  const costofVacancy = singleApiQuarterData(turnoverCostData, "cost_of_vacancy")
  const pdi = singleApiQuarterData(pdiData, "pdi");

  // console.log("this is years data",turnoverCost ,absenteeismCost, costofVacancy, pdi)

  return ((absenteeismCost + turnoverCost + costofVacancy + pdi).toFixed(2))

}

export const getCurrentYearSum = (absenteeismData: any, turnoverCostData: any, pdiData: any) => {
  let count = 4;
  const currYear = new Date().getFullYear();

  const getSingleApiYearData = (apiData: any, apiString: any) => {
    let apiDataSum = 0;

    const currYearData = apiData?.prediction_data?.find((elem: any) =>
      elem?.year === currYear || elem?.year === currYear.toString() || elem.year === +currYear
    )?.quarters;

    const lastYearData = apiData?.historic_data?.find((elem: any) => elem.year === +currYear - 1 || elem.year === (+currYear - 1).toString())?.quarters
    if (!currYearData || !Array.isArray(currYearData)) {
      console.warn(`currYearData is undefined or not an array for ${apiString}`);
      return;
    }
    if (!lastYearData || !Array.isArray(lastYearData)) {
      console.warn(`currYearData is undefined or not an array for ${apiString}`);
      return;
    }


    for (let i = 0; i < Math.min(getCurrentQuarterNumber()-1, currYearData.length); i++) {
      const value = currYearData[i]?.[`${apiString}`] ?? currYearData[i]?.[`${apiString}s`] ?? 0;
      apiDataSum += value;

      count--;
    }
    // console.log("check for last year data", lastYearData, count);
    for (let i = lastYearData.length - 1; i >= count; i--) {
      const value = lastYearData[i]?.[`${apiString}`] ?? lastYearData[i]?.[`${apiString}s`] ?? 0;
      apiDataSum += value
      // console.log("check for last year data", value, i);

    }
    return (apiDataSum);
  };



  const absenteeismSum = getSingleApiYearData(absenteeismData, "absenteeism_cost") || 0;
  const turnoverSum = getSingleApiYearData(turnoverCostData, "turnover_cost") || 0;
  const costofVacancySum = getSingleApiYearData(turnoverCostData, "cost_of_vacancy") || 0;
  const pdiSum = getSingleApiYearData(pdiData, "pdi")||0;

  console.log("check for last year data", absenteeismSum, turnoverSum, costofVacancySum, pdiSum);

  return (Number((absenteeismSum+ turnoverSum+ costofVacancySum+ pdiSum).toFixed(2)));
}

// export const currentPreviousYearData = (absenteeismData: any, turnoverCostData: any, pdiData: any) => {

//   const currYear = Number(new Date().getFullYear());

//   const previousYear = currYear-1;
//   const lastToLastYear = currYear-2
// }