import { getCurrentQuarterNumber, moveFirstToLast } from "@/utils/helper/CurrentQuarterGraphHelper";

const currentYear = new Date().getFullYear();
const lastYear = currentYear - 1;
// const nextYear = currentYear + 1;

const getAverage = (data: any, datapoints: any, isCurrency: boolean) => {
    if (!data) {
      return `${isCurrency ? "£" : ""} 0 ${isCurrency ? "" : "%"}`;
    }
  
    return `${isCurrency ? "£" : ""} ${(data / datapoints).toFixed(2)} ${isCurrency ? "" : "%"
      }`;
  };



export const transformDataforPredictiveAnalytics = (
    apiData: any,
    periodSelected: any,
    kpiString:string
  ) => {
    console.log("data in prdiction interval screen",apiData, kpiString)
    if ((apiData?.["historic_data"]?.length ===0 && apiData?.["prediction_data"]?.length ===0)) {
      return { companyAverage: "0%", predictedValue: "0%", data: [] };
    }
    
    const periodData = apiData?.["historic_data"]?.find(
      (item: any) => item?.year === periodSelected?.toString() || item?.year === periodSelected
    );
  
    const lastYearData = apiData?.["historic_data"]?.find(
      (item: any) => item?.year === lastYear
    );
  
    const predictedData = apiData?.["prediction_data"]?.find(
      (item: any) => item?.year === currentYear
    );
  
    // const nextYearData = apiData?.["prediction_data"]?.find(
    //   (item:any) => item?.year === nextYear
    // )
  
    let retentionRateData: any = [
      {
        quarter: "Jan-Mar",
        api_quarter: "Q1",
        quarter_number: 1,
        [lastYear]: null,
        [periodSelected]: null,
        currentYear: null,
      },
      {
        quarter: "Apr-Jun",
        api_quarter: "Q2",
        quarter_number: 2,
        [lastYear]: null,
        [periodSelected]: null,
        currentYear: null,
      },
      {
        quarter: "Jul-Sep",
        api_quarter: "Q3",
        quarter_number: 3,
        [lastYear]: null,
        [periodSelected]: null,
        currentYear: null,
      },
      {
        quarter: "Oct-Dec",
        api_quarter: "Q4",
        quarter_number: 4,
        [lastYear]: null,
        [periodSelected]: null,
        currentYear: null,
      },
    ];
  
  
    let historicRetentionRate = 0;
    let historicRetentionRatePoints = 0;
    
    let predictedRetentionRate = 0;
    let predictedRetentionRatePoints = 0;
  
  
    
  
  
    if (periodData) {
      retentionRateData.forEach((elem: any) => {
        const currQuarterData = periodData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        historicRetentionRate += currQuarterData?.[`${kpiString}`];
        historicRetentionRatePoints++;
  
        elem[periodSelected] = currQuarterData?.[`${kpiString}`];
        // console.log("The data for period", currQuarterData);
  
  
        // if (isCompanyPerformance && i === 0) {
        //   elem[period] = null
        // }
        //  if(!isCompanyPerformance)
      });
    }
  
  
  
    if (lastYearData) {
      retentionRateData.forEach((elem: any) => {
        const currQuarterData = lastYearData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        historicRetentionRate += currQuarterData?.[`${kpiString}`];
        historicRetentionRatePoints++;
  
        // if(elem?.quarter_number === getCurrentQuarterNumber() || elem?.quarter_number === getLastQuarterNumber()){
        // console.log("quartrs data check", currQuarterData?.[`${kpiString}`], elem?.quarter=== getCurrentQuarter())
        elem[lastYear] = currQuarterData?.[`${kpiString}`];
        if(elem?.quarter_number <= getCurrentQuarterNumber()+1){
            elem[periodSelected] = currQuarterData?.[`${kpiString}`]
            elem[lastYear] = null;
          }

        
        // }
        // if (isCompanyPerformance && i === 0) {
        //   elem[lastYear] = null;
        // }
      });
    }
  
    if (predictedData) {
      retentionRateData.forEach((elem: any) => {
        const currQuarterData = predictedData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        predictedRetentionRate += currQuarterData?.[`${kpiString}`] || currQuarterData?.[`${kpiString}s`];
        predictedRetentionRatePoints++;
  
        // if (isCompanyPerformance && i === currQuarter - 1) {
        
        elem[currentYear] = currQuarterData?.[`${kpiString}`] || currQuarterData?.[`${kpiString}s`];
        if(elem?.quarter_number <= getCurrentQuarterNumber()+1){
          elem[lastYear] = currQuarterData?.[`${kpiString}`] || currQuarterData?.[`${kpiString}s`]
        //   elem[currentYear] = null;
        }
        // }
      });
    }
  
    // if(nextYearData) {
    //   retentionRateData?.forEach((elem:any) =>{
    //     const currQuarterData = predictedData.quarters.find(
    //       (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
    //     );
  
    //     if(elem?.quarter_number === getCurrentQuarterNumber()-1){
    //       elem[currentYear] = currQuarterData?.[`${kpiString}`];
    //     }
    //   })
    // }
  
    // if(getCurrentQuarterNumber()>=3){
      for(let i=0;i<=getCurrentQuarterNumber();i++){
        retentionRateData = moveFirstToLast(retentionRateData)
      }
    // }
    
    // retentionRateData = moveFirstToLast(retentionRateData)
    // console.log("this is the new data naovnafnfalvfadvad", retentionRateData)
    // const sortedYears = apiData?.["historic_data"]
    //   .map((item: any) => item.year)
    //   .sort((a: any, b: any) => a - b);
  
    // const firstYear = sortedYears[0];
    // const latestYear = apiData?.prediction_data[0].year;
  
    // const quarterMap: Record<string, string> = {
    //   Q1: "Jan-Mar",
    //   Q2: "Apr-Jun",
    //   Q3: "Jul-Sep",
    //   Q4: "Oct-Dec",
    // };
  
    // const transformedData = apiData.historic_data[0].quarters.map(
    //   (quarterData: any, index: number) => {
    //     const predictedQuarter = apiData.prediction_data[0].quarters[index];
    //     return {
    //       [firstYear]: quarterData.[`${kpiString}`],
    //       [latestYear]: predictedQuarter.[`${kpiString}`],
    //       quarter: quarterMap[quarterData.quarter],
    //     };
    //   }
    // );
  
    
  
    
    return {
      companyAverage: getAverage(historicRetentionRate,historicRetentionRatePoints,false), // Placeholder, modify as needed
      predictedValue: getAverage(predictedRetentionRate,predictedRetentionRatePoints,false), // Placeholder, modify as needed
      data: retentionRateData,
    };
  };


  export const transformDataforPredictiveAnalyticsTempFYRR = (
    apiData: any,
    periodSelected: any,
    kpiString:string
  ) => {
    if (!apiData || apiData.length === 0) {
      return { companyAverage: "0%", predictedValue: "0%", data: [] };
    }
    const periodData = apiData?.["historic_data"]?.find(
      (item: any) => item?.year === periodSelected?.toString() || item?.year === periodSelected
    );
  
    const lastYearData = apiData?.["historic_data"]?.find(
      (item: any) => item?.year === lastYear
    );
  
    const predictedData = apiData?.["prediction_data"]?.find(
      (item: any) => item?.year === currentYear
    );
  
    // const nextYearData = apiData?.["prediction_data"]?.find(
    //   (item:any) => item?.year === nextYear
    // )
  
    let retentionRateData: any = [
      {
        quarter: "Jan-Mar",
        api_quarter: "Q1",
        quarter_number: 1,
        [lastYear]: null,
        [periodSelected]: null,
        currentYear: null,
      },
      {
        quarter: "Apr-Jun",
        api_quarter: "Q2",
        quarter_number: 2,
        [lastYear]: null,
        [periodSelected]: null,
        currentYear: null,
      },
      {
        quarter: "Jul-Sep",
        api_quarter: "Q3",
        quarter_number: 3,
        [lastYear]: null,
        [periodSelected]: null,
        currentYear: null,
      },
      {
        quarter: "Oct-Dec",
        api_quarter: "Q4",
        quarter_number: 4,
        [lastYear]: null,
        [periodSelected]: null,
        currentYear: null,
      },
    ];
  
  
    let historicRetentionRate = 0;
    let historicRetentionRatePoints = 0;
    
    let predictedRetentionRate = 0;
    let predictedRetentionRatePoints = 0;
  
  
    
  
  
    if (periodData) {
      retentionRateData.forEach((elem: any) => {
        const currQuarterData = periodData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        historicRetentionRate += currQuarterData?.[`${kpiString}`];
        historicRetentionRatePoints++;
  
        elem[periodSelected] = currQuarterData?.[`${kpiString}`];
        // console.log("The data for period", currQuarterData);
  
  
        // if (isCompanyPerformance && i === 0) {
        //   elem[period] = null
        // }
        //  if(!isCompanyPerformance)
      });
    }
  
  
  
    if (lastYearData) {
      retentionRateData.forEach((elem: any) => {
        const currQuarterData = lastYearData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        historicRetentionRate += currQuarterData?.[`${kpiString}`];
        historicRetentionRatePoints++;
  
        // if(elem?.quarter_number === getCurrentQuarterNumber() || elem?.quarter_number === getLastQuarterNumber()){
        // console.log("quartrs data check", currQuarterData?.[`${kpiString}`], elem?.quarter=== getCurrentQuarter())
        elem[lastYear] = currQuarterData?.[`${kpiString}`];
        if(elem?.quarter_number <= getCurrentQuarterNumber()+1){
            elem[periodSelected] = currQuarterData?.[`${kpiString}`]
            elem[lastYear] = null;
          }

        
        // }
        // if (isCompanyPerformance && i === 0) {
        //   elem[lastYear] = null;
        // }
      });
    }
  
    if (predictedData) {
      retentionRateData.forEach((elem: any) => {
        const currQuarterData = predictedData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        predictedRetentionRate += currQuarterData?.[`first_year_retention_rate`] || currQuarterData?.[`first_year_retention_rates`];
        predictedRetentionRatePoints++;
  
        // if (isCompanyPerformance && i === currQuarter - 1) {
        
        elem[currentYear] = currQuarterData?.[`first_year_retention_rate`] || currQuarterData?.[`first_year_retention_rates`];
        if(elem?.quarter_number <= getCurrentQuarterNumber()+1){
          elem[lastYear] = currQuarterData?.[`first_year_retention_rate`] || currQuarterData?.[`first_year_retention_rates`]
        //   elem[currentYear] = null;
        }
        // }
      });
    }
  
    // if(nextYearData) {
    //   retentionRateData?.forEach((elem:any) =>{
    //     const currQuarterData = predictedData.quarters.find(
    //       (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
    //     );
  
    //     if(elem?.quarter_number === getCurrentQuarterNumber()-1){
    //       elem[currentYear] = currQuarterData?.[`${kpiString}`];
    //     }
    //   })
    // }
  
    // if(getCurrentQuarterNumber()>=3){
      for(let i=0;i<=getCurrentQuarterNumber();i++){
        retentionRateData = moveFirstToLast(retentionRateData)
      }
    // }
    
    // retentionRateData = moveFirstToLast(retentionRateData)
    // console.log("this is the new data naovnafnfalvfadvad", retentionRateData)
    // const sortedYears = apiData?.["historic_data"]
    //   .map((item: any) => item.year)
    //   .sort((a: any, b: any) => a - b);
  
    // const firstYear = sortedYears[0];
    // const latestYear = apiData?.prediction_data[0].year;
  
    // const quarterMap: Record<string, string> = {
    //   Q1: "Jan-Mar",
    //   Q2: "Apr-Jun",
    //   Q3: "Jul-Sep",
    //   Q4: "Oct-Dec",
    // };
  
    // const transformedData = apiData.historic_data[0].quarters.map(
    //   (quarterData: any, index: number) => {
    //     const predictedQuarter = apiData.prediction_data[0].quarters[index];
    //     return {
    //       [firstYear]: quarterData.[`${kpiString}`],
    //       [latestYear]: predictedQuarter.[`${kpiString}`],
    //       quarter: quarterMap[quarterData.quarter],
    //     };
    //   }
    // );
  
    
  
    
    return {
      companyAverage: getAverage(historicRetentionRate,historicRetentionRatePoints,false), // Placeholder, modify as needed
      predictedValue: getAverage(predictedRetentionRate,predictedRetentionRatePoints,false), // Placeholder, modify as needed
      data: retentionRateData,
    };
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
        companyAverage: getAverage(
          historicAvgRevenuePerEmployee,
          historicAvgRevenuePerEmployeePoints,
          true
        ),
        predictedValue: getAverage(
          predictedAvgRevenuePerEmployee,
          predictedAvgRevenuePerEmployeePoints,
          true
        ),
        data: revenuePerEmployeeData,
      };
    };

    export const getPerformanceDeficitImpact = (data: any) => {
      function calculateTotalPDI(data:any, year:any) {
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