import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";
import { formatCurrencyString } from "@/utils/helper/dateCoversionHelper";

const getAverage = (data: any, datapoints: any, isCurrency: boolean) => {
  if (!data) {
    return `${isCurrency ? "£" : ""} 0 ${isCurrency ? "" : "%"}`;
  }

  return `${isCurrency ? "£" : ""} ${(data / datapoints).toFixed(2)} ${
    isCurrency ? "" : "%"
  }`;
};

export const transformRevenuePerEmployee = (
  apiData: any,
  periodSelected: number
) => {
  if (!apiData || apiData.length === 0) {
    return { companyAverage: "0%", predictedValue: "0%", data: [] };
  }
  const currentYear: number = new Date().getFullYear();

  const revenuePerEmployeeData: any = [
    { year: periodSelected, value: 0 },
    { year: currentYear - 1, value: 0 },
    { year: currentYear, value: 0 },
  ];

  let historicAvgRevenuePerEmployee = 0;
  let historicAvgRevenuePerEmployeePoints = 0;

  let predictedAvgRevenuePerEmployee = 0;
  let predictedAvgRevenuePerEmployeePoints = 0;

  const selectedPeriodData = apiData?.["historic_data"]?.find(
    (item: any) =>
      item?.financial_year === periodSelected?.toString() ||
      item?.financial_year === periodSelected
  );
  const lastYearData = apiData?.["historic_data"]?.find(
    (item: any) =>
      item?.financial_year === currentYear - 1 ||
      item?.financial_year === (currentYear - 1).toString()
  );

  const currentYearData = apiData?.["prediction_data"]?.find(
    (item: any) =>
      item?.year === currentYear || item?.year === currentYear.toString()
  );

  if (selectedPeriodData) {
    historicAvgRevenuePerEmployee += selectedPeriodData?.revenue_per_employee;
    historicAvgRevenuePerEmployeePoints++;
    revenuePerEmployeeData[0]["value"] =
      selectedPeriodData?.revenue_per_employee;
  }

  if (lastYearData) {
    historicAvgRevenuePerEmployee += lastYearData?.revenue_per_employee;
    historicAvgRevenuePerEmployeePoints++;
    revenuePerEmployeeData[1]["value"] = lastYearData?.revenue_per_employee;
  }

  if (currentYearData) {
    predictedAvgRevenuePerEmployee += currentYearData?.revenue_per_employee;
    predictedAvgRevenuePerEmployeePoints++;
    revenuePerEmployeeData[2]["value"] = currentYearData?.revenue_per_employee;
  }

  return {
    companyAverage: formatCurrencyString(getAverage(
      historicAvgRevenuePerEmployee,
      historicAvgRevenuePerEmployeePoints,
      true
    )),
    predictedValue: formatCurrencyString(getAverage(
      predictedAvgRevenuePerEmployee,
      predictedAvgRevenuePerEmployeePoints,
      true
    )),
    data: revenuePerEmployeeData,
  };
};
export const transformData = (
  apiData: any,
  period: any,
  isCompanyPerformance: any,
  apiString: string
) => {
  console.log("no data marker check", apiData?.["historic_data"]);
  // if (
  //   // !apiData ||
  //   ((apiData?.["historic_data"]?.length === 0 ||
  //   apiData?.["historic_data"] === undefined )
  //   &&
  //   (apiData?.["prediction_data"]?.length === 0 ||
  //   apiData?.["prediction_data"] === undefined))
  // ) {
  //   return { companyAverage: "0%", predictedValue: "0%", data: [] };
  // }

  const periodData = apiData?.["historic_data"]?.find(
    (item: any) => item?.year === period?.toString() || item?.year === period
  );

  const currentDate = new Date();
  const lastYear = currentDate.getFullYear() - 1;

  const lastYearData = apiData?.["historic_data"]?.find(
    (item: any) => item?.year === lastYear
  );
  
  
  const predictedData = apiData?.["prediction_data"]?.find(
    (item: any) => item?.year === 2025
  );

  if(!periodData && !lastYearData && !predictedData){
    return { companyAverage: "0%", predictedValue: "0%", data: [] };
  }

  console.log("data for no data screen test",periodData,lastYearData,predictedData, apiString)

  const retentionRateData: any = [
    {
      quarter: "Jan-Mar",
      api_quarter: "Q1",
      quarter_number: 1,
      [lastYear]: null,
      [period]: null,
      2025: null,
    },
    {
      quarter: "Apr-Jun",
      api_quarter: "Q2",
      quarter_number: 2,
      [lastYear]: null,
      [period]: null,
      2025: null,
    },
    {
      quarter: "Jul-Sep",
      api_quarter: "Q3",
      quarter_number: 3,
      [lastYear]: null,
      [period]: null,
      2025: null,
    },
    {
      quarter: "Oct-Dec",
      api_quarter: "Q4",
      quarter_number: 4,
      [lastYear]: null,
      [period]: null,
      2025: null,
    },
  ];

  const today = new Date();
  const currQuarter = Math.floor((today.getMonth() + 3) / 3);

  let historicRetentionRate = 0;
  // let historicRetentionRatePoints = 0;

  let predictedRetentionRate = 0;
  // let predictedRetentionRatePoints = 0;

  if (periodData) {
    retentionRateData.forEach((elem: any) => {
      const currQuarterData = periodData.quarters.find(
        (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
      );

      // historicRetentionRate += currQuarterData?.[`${apiString}`];
      // historicRetentionRatePoints++;

      elem[period] = currQuarterData?.[`${apiString}`];

      // if (isCompanyPerformance && i === 0) {
      //   elem[period] = null
      // }
      //  if(!isCompanyPerformance)
    });
  }

  if (lastYearData) {
    retentionRateData.forEach((elem: any, i: any) => {
      const currQuarterData = lastYearData.quarters.find(
        (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
      );

      // historicRetentionRate += currQuarterData?.[`${apiString}`];
      // historicRetentionRatePoints++;

      elem[lastYear] = currQuarterData?.[`${apiString}`];
      if (isCompanyPerformance && i <= getCurrentQuarterNumber() - 1) {
        elem[lastYear] = null;
      }

      if (i <= getCurrentQuarterNumber() - 1) {
        elem[period] = currQuarterData?.[`${apiString}`];
      }
    });
  }

  if (predictedData) {
    retentionRateData.forEach((elem: any, i: any) => {
      const currQuarterData = predictedData.quarters.find(
        (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
      );

      // predictedRetentionRate += currQuarterData?.[`${apiString}`];
      // predictedRetentionRatePoints++;

      if (isCompanyPerformance && i <= currQuarter - 1) {
        elem[lastYear] = currQuarterData?.[`${apiString}`];
      }

      //FOR Prediction Value
      if (i === getCurrentQuarterNumber() - 1) {
        predictedRetentionRate = currQuarterData?.[`${apiString}`];
      }

      if (i === getCurrentQuarterNumber() - 2) {
        historicRetentionRate = currQuarterData?.[`${apiString}`];
      }
    });
  }

  const formattedData = [];
  const currQuarterIndex = retentionRateData.findIndex(
    (elem: any) => elem.quarter_number === currQuarter
  );

  formattedData.push(
    ...retentionRateData.slice(currQuarterIndex + 1, retentionRateData.length)
  );
  formattedData.push(...retentionRateData.slice(0, currQuarterIndex + 1));

  // const retentionRateDataPredictiveAnalytics: retentionRateData[] = [
  //   { quarter: "Jan-Mar" ,2023: 0,2025:0},
  //   { quarter: "Apr-Jun" ,2023: 0,2025:0},
  //   { quarter: "Jul-Sep" ,2023: 0,2025:0},
  //   { quarter: "Oct-Dec" ,2023: 0,2025:0},
  // ];

  // const sortedYears = apiData?.["historic_data"].map((item:any) => item.year).sort((a:any, b:any) => a - b);
  // const firstYear = sortedYears[0];
  // const latestYear = sortedYears[sortedYears.length - 1];

  // apiData?.["historic_data"].forEach((yearData:any) => {
  //   yearData.quarters.forEach((quarter:any, index:number) => {
  //     retentionRateData[index][yearData.year] = quarter.turnover_rate || 0;
  //   });
  //     console.log("🚀 ~ yearData.quarters.forEach ~ retentionRateData:", structuredClone(retentionRateData))
  // });

  // adjustDataForNextQuarter(retentionRateData, firstYear, latestYear);

  return {
    companyAverage: getAverage(historicRetentionRate, 1, false),
    predictedValue: getAverage(predictedRetentionRate, 1, false),
    data: formattedData,
    // predictiveAnalyticsretentionRateData : retentionRateDataPredictiveAnalytics,
  };
};

export const transformDataTempFYRR = (
  apiData: any,
  period: any,
  isCompanyPerformance: any,
  apiString: string
) => {
  if ( ((apiData?.["historic_data"]?.length === 0 ||
    apiData?.["historic_data"] === undefined )
    &&
    (apiData?.["prediction_data"]?.length === 0 ||
    apiData?.["prediction_data"] === undefined))) {
    return { companyAverage: "0%", predictedValue: "0%", data: [] };
  }

  const periodData = apiData?.["historic_data"]?.find(
    (item: any) => item?.year === period?.toString() || item?.year === period
  );

  const currentDate = new Date();
  const lastYear = currentDate.getFullYear() - 1;

  const lastYearData = apiData?.["historic_data"]?.find(
    (item: any) => item?.year === lastYear
  );

  const predictedData = apiData?.["prediction_data"]?.find(
    (item: any) => item?.year === 2025
  );

  const retentionRateData: any = [
    {
      quarter: "Jan-Mar",
      api_quarter: "Q1",
      quarter_number: 1,
      [lastYear]: null,
      [period]: null,
      2025: null,
    },
    {
      quarter: "Apr-Jun",
      api_quarter: "Q2",
      quarter_number: 2,
      [lastYear]: null,
      [period]: null,
      2025: null,
    },
    {
      quarter: "Jul-Sep",
      api_quarter: "Q3",
      quarter_number: 3,
      [lastYear]: null,
      [period]: null,
      2025: null,
    },
    {
      quarter: "Oct-Dec",
      api_quarter: "Q4",
      quarter_number: 4,
      [lastYear]: null,
      [period]: null,
      2025: null,
    },
  ];

  const today = new Date();
  const currQuarter = Math.floor((today.getMonth() + 3) / 3);

  let historicRetentionRate = 0;
  // let historicRetentionRatePoints = 0;

  let predictedRetentionRate = 0;
  // let predictedRetentionRatePoints = 0;

  if (periodData) {
    retentionRateData.forEach((elem: any) => {
      const currQuarterData = periodData.quarters.find(
        (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
      );

      // historicRetentionRate += currQuarterData?.[`${apiString}`];
      // historicRetentionRatePoints++;

      elem[period] = currQuarterData?.[`${apiString}`];

      // if (isCompanyPerformance && i === 0) {
      //   elem[period] = null
      // }
      //  if(!isCompanyPerformance)
    });
  }

  if (lastYearData) {
    retentionRateData.forEach((elem: any, i: any) => {
      const currQuarterData = lastYearData.quarters.find(
        (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
      );

      // historicRetentionRate += currQuarterData?.[`${apiString}`];
      // historicRetentionRatePoints++;

      elem[lastYear] = currQuarterData?.[`${apiString}`];
      if (isCompanyPerformance && i <= getCurrentQuarterNumber() - 1) {
        elem[lastYear] = null;
      }

      if (i <= getCurrentQuarterNumber() - 1) {
        elem[period] = currQuarterData?.[`${apiString}`];
      }
    });
  }

  if (predictedData) {
    retentionRateData.forEach((elem: any, i: any) => {
      const currQuarterData = predictedData.quarters.find(
        (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
      );

      // predictedRetentionRate += currQuarterData?.[`${apiString}`];
      // predictedRetentionRatePoints++;

      if (isCompanyPerformance && i <= currQuarter - 1) {
        elem[lastYear] = currQuarterData?.[`first_year_retention_rate`];
      }

      //FOR Prediction Value
      if (i === getCurrentQuarterNumber() - 1) {
        predictedRetentionRate = currQuarterData?.[`first_year_retention_rate`];
      }

      if (i === getCurrentQuarterNumber() - 2) {
        historicRetentionRate = currQuarterData?.[`first_year_retention_rate`];
      }
    });
  }

  const formattedData = [];
  const currQuarterIndex = retentionRateData.findIndex(
    (elem: any) => elem.quarter_number === currQuarter
  );

  formattedData.push(
    ...retentionRateData.slice(currQuarterIndex + 1, retentionRateData.length)
  );
  formattedData.push(...retentionRateData.slice(0, currQuarterIndex + 1));

  // const retentionRateDataPredictiveAnalytics: retentionRateData[] = [
  //   { quarter: "Jan-Mar" ,2023: 0,2025:0},
  //   { quarter: "Apr-Jun" ,2023: 0,2025:0},
  //   { quarter: "Jul-Sep" ,2023: 0,2025:0},
  //   { quarter: "Oct-Dec" ,2023: 0,2025:0},
  // ];

  // const sortedYears = apiData?.["historic_data"].map((item:any) => item.year).sort((a:any, b:any) => a - b);
  // const firstYear = sortedYears[0];
  // const latestYear = sortedYears[sortedYears.length - 1];

  // apiData?.["historic_data"].forEach((yearData:any) => {
  //   yearData.quarters.forEach((quarter:any, index:number) => {
  //     retentionRateData[index][yearData.year] = quarter.turnover_rate || 0;
  //   });
  //     console.log("🚀 ~ yearData.quarters.forEach ~ retentionRateData:", structuredClone(retentionRateData))
  // });

  // adjustDataForNextQuarter(retentionRateData, firstYear, latestYear);

  return {
    companyAverage: getAverage(historicRetentionRate, 1, false),
    predictedValue: getAverage(predictedRetentionRate, 1, false),
    data: formattedData,
    // predictiveAnalyticsretentionRateData : retentionRateDataPredictiveAnalytics,
  };
};
