import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";

const getAverage = (data: any, datapoints: any, isCurrency: boolean) => {
  if (!data) {
    return `${isCurrency ? "£" : ""} 0 ${isCurrency ? "" : "%"}`;
  }

  return `${isCurrency ? "£" : ""} ${(data / datapoints).toFixed(2)} ${
    isCurrency ? "" : "%"
  }`;
};

const currentYear = new Date().getFullYear();
export const transformData = (apiData: any, period: any, apiString: string) => {
  if (
    (apiData?.["historic_data"]?.length === 0 ||
      apiData?.["historic_data"] === undefined) &&
    (apiData?.["prediction_data"]?.length === 0 ||
      apiData?.["prediction_data"] === undefined)
  ) {
    return { companyAverage: "0%", predictedValue: "0%", data: [] };
  }
  // console.log("turnover daata in utils file", apiData);
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

  // console.log(apiData, periodData, "🚀 ~ transformTurnoverData ~ lastYearData:", lastYearData)

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

  // console.log("The data for period", periodData);
  if (periodData) {
    retentionRateData.forEach((elem: any) => {
      const currQuarterData = periodData.quarters.find(
        (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
      );

      // historicRetentionRate += currQuarterData?.[`${apiString}`];
      // historicRetentionRatePoints++;

      elem[period] = currQuarterData?.[`${apiString}`];
      // console.log("The data for period", currQuarterData);
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
      if (i <= getCurrentQuarterNumber() - 1) {
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

      if (i <= currQuarter - 1) {
        elem[lastYear] =
          currQuarterData?.[`${apiString}`] ||
          currQuarterData?.[`${apiString}s`];
      }

      //FOR Prediction Value
      if (i === getCurrentQuarterNumber() - 1) {
        predictedRetentionRate =
          currQuarterData?.[`${apiString}s`] ||
          currQuarterData?.[`${apiString}`];
      }

      if (i === getCurrentQuarterNumber() - 2) {
        historicRetentionRate =
          currQuarterData?.[`${apiString}`] ||
          currQuarterData?.[`${apiString}s`];
      }
    });
  }
  // console.log("dxsdfghgjhsfgh", retentionRateData);

  const formattedData = [];
  const currQuarterIndex = retentionRateData.findIndex(
    (elem: any) => elem.quarter_number === currQuarter
  );

  formattedData.push(
    ...retentionRateData.slice(currQuarterIndex + 1, retentionRateData.length)
  );
  formattedData.push(...retentionRateData.slice(0, currQuarterIndex + 1));
  // console.log(
  //   currQuarterIndex,
  //   "xdsfghinretentionrate",
  //   formattedData,
  //   "sdaefg",
  //   currQuarter
  // );

  return {
    companyAverage: getAverage(historicRetentionRate, 1, true),
    predictedValue: getAverage(predictedRetentionRate, 1, true),
    data: formattedData,
    // predictiveAnalyticsretentionRateData : retentionRateDataPredictiveAnalytics,
  };
};

export const transformPerformanceDeficitImpact = (data: any) => {
  if (!data || typeof data !== "object") {
    console.error("Invalid data received:", data);
    return { data: [] }; // Return an empty structure instead of breaking
  }

  const yearData: any = {};

  // Get all years (keys) and sort them just in case
  const years = Object.keys(data?.["historic_data"]);
  if (years.length === 0) return { data: [] };

  const firstYear = years[0]; // First year
  const lastYear = years[years.length - 1]; // Last year

  // Helper function to calculate the average PDI for a given year
  const calculateAveragePdi = (year: string) => {
    let totalPdi = 0;
    let count = 0;

    Object.keys(data?.["historic_data"][year]).forEach((quarter) => {
      if (
        !data?.["historic_data"][year][quarter] ||
        typeof data?.["historic_data"][year][quarter] !== "object"
      )
        return;

      Object.keys(data?.["historic_data"][year][quarter]).forEach((month) => {
        const monthData = data?.["historic_data"][year][quarter][month];

        if (monthData && monthData.pdi !== undefined) {
          totalPdi += monthData.pdi;
          count++;
        }
      });
    });

    return count > 0 ? parseFloat((totalPdi / count).toFixed(2)) : 0;
  };

  const calculateAveragePdiForPredictedData = () => {
    let totalPdi = 0;
    let count = 0;

    const predicted_data = data?.["prediction_data"]?.[0]?.["quarters"];
    // console.log(
    //   "pdi_values",
    //   data?.["prediction_data"]?.[0]?.["quarters"],
    //   year
    // );

    predicted_data.forEach((quarter: any) => {
      totalPdi = quarter?.["pdi"] + totalPdi;
      count++;
    });

    return count > 0 ? parseFloat((totalPdi / count).toFixed(2)) : 0;
  };

  console.log("pdi_data", lastYear);
  // Compute values for the first and last years only
  yearData[firstYear] = calculateAveragePdi(firstYear);
  yearData[lastYear] = calculateAveragePdiForPredictedData();

  console.log("Processed year data:", yearData);
  return {
    data: [yearData],
    companyAverage: "£" + yearData[firstYear],
    predictedValue: "£" + yearData[lastYear],
    heading: "Performance Deficit",
  }; // Wrap in an array as required
};

export const transformYearlyData = (
  data: any,
  periodSelceted: any,
  apiString: any
) => {
  // console.log("data in prdiction interval screen", data);

  const selectedPeriodData = data?.historic_data?.find(
    (items: any) =>
      items?.year === periodSelceted ||
      items?.year === periodSelceted.toString() ||
      items?.year === Number(periodSelceted)
  );
  const currentYearData = data?.prediction_data?.find(
    (items: any) =>
      items?.year === currentYear || items?.year === currentYear.toString()
  );

  if (!selectedPeriodData && !currentYearData) {
    return {
      data: [],
      companyAverage: "£" + 0,
      predictedValue: "£" + 0,
      heading: "Performance Deficit",
    };
  }

  let totalPdiSumCurrentYear = 0;

  currentYearData?.quarters?.forEach((elem: any) => {
    totalPdiSumCurrentYear += elem?.pdi;
  });
  // const yearsData = [selectedPeriodData?.total_performance_deficit,totalPdiSumCurrentYear]

  const yearsData = {
    [periodSelceted]: selectedPeriodData?.[`${apiString}`],
    // 1:totalPdiSumCurrentYear,
    [currentYear]: totalPdiSumCurrentYear,
  };
  // console.log("New pdi data, ", yearsData)
  // return yearsData;
  // console.log("data in prdiction interval screen", data, [yearsData]);
  return {
    data: [yearsData],
    companyAverage: "£" + selectedPeriodData?.total_performance_deficit,
    predictedValue: "£" + totalPdiSumCurrentYear,
    heading: "Performance Deficit",
  };
};
