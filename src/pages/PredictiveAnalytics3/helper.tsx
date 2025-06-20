import { getCurrentQuarterNumber, moveFirstToLast } from "@/utils/helper/CurrentQuarterGraphHelper";
import { formatCurrencyString } from "@/utils/helper/dateCoversionHelper";

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
    console.log("apiData check for error in page of predictive analytics new form chedck", apiData , kpiString)
    if (
      apiData===null || 
      (apiData?.["historic_data"]?.length===0 || apiData?.["historic_data"]?.length=== undefined) &&
      (apiData?.["prediction_data"]?.length===0 || apiData?.["prediction_data"]?.length=== undefined)
    ) {
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
  
    console.log("apiData check for error in page of predictive analytics", periodData, lastYearData, predictedData,kpiString)
    if(!periodData && !lastYearData && !predictedData){
      return { companyAverage: "0%", predictedValue: "0%", data: [] };
    }
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
    let historicRetentionRatePoints = 1;
    
    let predictedRetentionRate = 0;
    let predictedRetentionRatePoints = 1;
  
  
    
  
  
    if (periodData) {
      retentionRateData.forEach((elem: any) => {
        const currQuarterData = periodData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        // historicRetentionRate += currQuarterData?.[`${kpiString}`];
        // historicRetentionRatePoints++;
  
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
  
        // historicRetentionRate += currQuarterData?.[`${kpiString}`];
        // historicRetentionRatePoints++;
  
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
      retentionRateData.forEach((elem: any,i:any) => {
        const currQuarterData = predictedData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        // predictedRetentionRate += currQuarterData?.[`${kpiString}`] || currQuarterData?.[`${kpiString}s`];
        // predictedRetentionRatePoints++;

        if(i=== getCurrentQuarterNumber()-1){
          predictedRetentionRate  = currQuarterData?.[`${kpiString}`] || currQuarterData?.[`${kpiString}s`];
        }
  
        if(i=== getCurrentQuarterNumber()-2) {
          historicRetentionRate = currQuarterData?.[`${kpiString}`] || currQuarterData?.[`${kpiString}s`];
        }
  
        // if (isCompanyPerformance && i === currQuarter - 1) {
        
        elem[currentYear] = currQuarterData?.[`${kpiString}`] || currQuarterData?.[`${kpiString}s`];
        if(elem?.quarter_number <= getCurrentQuarterNumber()+1){
          elem[lastYear] = currQuarterData?.[`${kpiString}`] || currQuarterData?.[`${kpiString}s`]
        //   elem[currentYear] = null;
        }
        // }
      });
    }

      for(let i=0;i<=getCurrentQuarterNumber();i++){
        retentionRateData = moveFirstToLast(retentionRateData)
      }

      console.log()
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
    let historicRetentionRatePoints = 1;
    
    let predictedRetentionRate = 0;
    let predictedRetentionRatePoints = 1;
  
  
    
  
  
    if (periodData) {
      retentionRateData.forEach((elem: any) => {
        const currQuarterData = periodData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        // historicRetentionRate += currQuarterData?.[`${kpiString}`];
        // historicRetentionRatePoints++;
  
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
  
        // historicRetentionRate += currQuarterData?.[`${kpiString}`];
        // historicRetentionRatePoints++;
  
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
      retentionRateData.forEach((elem: any,i:any) => {
        const currQuarterData = predictedData.quarters.find(
          (lastYearQuarters: any) => lastYearQuarters.quarter === elem.api_quarter
        );
  
        // predictedRetentionRate += currQuarterData?.[`${kpiString}`] || currQuarterData?.[`${kpiString}s`];
        // predictedRetentionRatePoints++;

        if(i=== getCurrentQuarterNumber()-1){
          predictedRetentionRate  = currQuarterData?.[`first_year_retention_rate`] || currQuarterData?.[`first_year_retention_rates`];
        }
  
        if(i=== getCurrentQuarterNumber()-2) {
          historicRetentionRate = currQuarterData?.[`first_year_retention_rate`] || currQuarterData?.[`first_year_retention_rates`];
        }
  
        // if (isCompanyPerformance && i === currQuarter - 1) {
        
        elem[currentYear] = currQuarterData?.[`first_year_retention_rate`] || currQuarterData?.[`first_year_retention_rates`];
        if(elem?.quarter_number <= getCurrentQuarterNumber()+1){
          elem[lastYear] = currQuarterData?.[`first_year_retention_rate`] || currQuarterData?.[`first_year_retention_rates`]
        //   elem[currentYear] = null;
        }
        // }
      });
    }

      for(let i=0;i<=getCurrentQuarterNumber();i++){
        retentionRateData = moveFirstToLast(retentionRateData)
      }

      console.log()
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

   export const convertToHighchartsSeries = (rawData:any) => {
    const rechartsData = rawData?.data;
    const currentYear = new Date().getFullYear()
   const highchartsGraphData = [
        {
          name: "",
          showInLegend: false,
          data: [
            {
              y: +rechartsData?.[0]?.[currentYear-2] || 0,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "#fde9b6"], // light yellow at bottom
                  [1, "#fbc748"], // dark golden yellow at top
                ],
              },
            },
            {
              y: +rechartsData?.[1]?.[currentYear-2] || 0,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "#fde9b6"],
                  [1, "#fbc748"],
                ],
              },
            },
            {
                y: +rechartsData?.[2]?.[currentYear-2] || 0,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "#fde9b6"],
                  [1, "#fbc748"],
                ],
              },
            },
            {
                y: +rechartsData?.[3]?.[currentYear-2] || 0,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "#fde9b6"],
                  [1, "#fbc748"],
                ],
              },
            },
          ],
        },
        {
          name: "",
          showInLegend: false,
          data: [
            {
                y: +rechartsData?.[0]?.[currentYear-1] || 0,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "#e0e4ff"], // light purple at bottom
                  [1, "#a5b4ff"], // rich purple at top
                ],
              },
            },
            {
                y: +rechartsData?.[1]?.[currentYear-1] || 0,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "#e0e4ff"],
                  [1, "#a5b4ff"],
                ],
              },
            },
            {
                y: +rechartsData?.[2]?.[currentYear-1] || 0,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "#e8ccff"],
                  [1, "#c847e8"],
                ],
              },
            },
            {
                y: +rechartsData?.[3]?.[currentYear-1] || 0,
              color: {
                linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                stops: [
                  [0, "#e8ccff"],
                  [1, "#c847e8"],
                ],
              },
            },
          ],
        },
      ]
      
        // console.log("New graph data turnoverRate", highchartsGraphData)

        return {
            data: highchartsGraphData,
            companyAverage: rawData?.companyAverage,
            predictedValue: rawData?.predictedValue,
        }
        // return seriesData;
      };

      export const convertToHighchartsSeriesForRevenuePerEmployee = (rawData:any) => {
        const currentYear = new Date().getFullYear();

        const currentYearRevenuePerEmployee = rawData?.data?.find((yearData:any) => yearData.year === currentYear)?.value;
        const previousYearRevenumePerEmployee = rawData?.data?.find((yearData:any) => yearData.year === currentYear-1)?.value;

        const highchartGraphData = [
          {
            name: "",
            showInLegend: false,
            data: [
              {
                y: previousYearRevenumePerEmployee ,
                color: {
                  linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                  stops: [
                    [0, "#fde9b6"], // light yellow at bottom
                    [1, "#fbc748"], // dark golden yellow at top
                  ],
                },
              },
              {
                y: currentYearRevenuePerEmployee,
                color: {
                  linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                  stops: [
                    [0, "#e8ccff"], // light yellow at bottom
                    [1, "#c847e8"], // dark golden yellow at top
                  ],
                },
              },
            ],
          },
        ]


          // console.log("New graph data turnoverRate", rawData);

          return{
            data: highchartGraphData,
            companyAverage: rawData?.companyAverage,
            predictedValue: rawData?.predictedValue,
          }
        
      }


      export const convertToHighchartsSeriesForPDI = (rawData: any) => {
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 2;
      
        const firstEntry = rawData?.data?.[0];
      
        if (!firstEntry || typeof firstEntry !== 'object') {
          return {
            data: [],
            companyAverage: "£0",
            predictedValue: "£0",
            heading: "Performance Deficit",
          };
        }
      
        const currentYearPdi = firstEntry[currentYear];
        const previousYearPdi = firstEntry[previousYear];
      
        if (currentYearPdi === undefined && previousYearPdi === undefined) {
          return {
            data: [],
            companyAverage: "£0",
            predictedValue: "£0",
            heading: "Performance Deficit",
          };
        }
      
        const highchartGraphData = [
          {
            name: previousYear.toString(),
            y: previousYearPdi,
            color: {
              linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
              stops: [
                [0, '#fde9b6'],
                [1, '#fbc748'],
              ],
            },
          },
          {
            name: currentYear.toString(),
            y: currentYearPdi,
            color: {
              linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
              stops: [
                [0, '#e8ccff'],
                [1, '#c847e8'],
              ],
            },
          },
        ];
      
        return {
          data: highchartGraphData,
          companyAverage: rawData?.companyAverage ?? "£0",
          predictedValue: rawData?.predictedValue ?? "£0",
          heading: "Performance Deficit",
        };
      };
      