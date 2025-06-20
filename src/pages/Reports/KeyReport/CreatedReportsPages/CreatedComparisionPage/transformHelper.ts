
export const transformRetentionRate = (apiData: any, reportsDate: any, comparisionDate: any, reportsCountry: any, comparisionCountry: any, reportsDepartment: any, comparisionDepartment: any, apiString:any) => {
    
    console.log(reportsDepartment, comparisionDepartment)
    const startYearData = apiData?.reportsData?.data?.historic_data?.find((item: any) => item.year === reportsDate || item?.year === reportsDate.toString() || item?.year === Number(reportsDate));
    const endYearData = apiData?.comaparisionData?.data?.historic_data?.find((item: any) => item?.year === comparisionDate || item?.year === comparisionDate.toString() || item?.year === Number(comparisionDate));

    // console.log("retention rate comparision data check", comparisionDate);
    const retentionRateData: any = [
        {
            quarter: "Jan-Mar",
            api_quarter: "Q1",
            quarter_number: 1,
            [reportsCountry]: null,
            [comparisionCountry]: null,
            // 2025: null,
        },
        {
            quarter: "Apr-Jun",
            api_quarter: "Q2",
            quarter_number: 2,
            [reportsCountry]: null,
            [comparisionCountry]: null,
            //   2025: null,
        },
        {
            quarter: "Jul-Sep",
            api_quarter: "Q3",
            quarter_number: 3,
            [reportsCountry]: null,
            [comparisionCountry]: null,
            //   2025: null,
        },
        {
            quarter: "Oct-Dec",
            api_quarter: "Q4",
            quarter_number: 4,
            [reportsCountry]: null,
            [comparisionCountry]: null,
            //   2025: null,
        },
    ];

    if (startYearData) {
        retentionRateData?.forEach((elem: any) => {
            const currQuarterData = startYearData?.quarters.find(
                (startYearQuarter: any) => startYearQuarter.quarter === elem?.api_quarter
            );
            elem[reportsDate] = currQuarterData?.[`${apiString}`];
        })


    }

    if (endYearData) {
        retentionRateData?.forEach((elem: any) => {
            const currQuarterData = endYearData?.quarters.find(
                (endYearQuarters: any) => endYearQuarters.quarter === elem?.api_quarter
            );
            elem[comparisionDate] = currQuarterData?.[`${apiString}`];
        })


    }

    console.log("data for tesing start year nad end year data", retentionRateData, apiString);

    return (retentionRateData)

    
}


export const transformRevenuePerEmployee = (
    apiData: any,
    start_year: number,
    end_year: number
) => {
    if (!apiData || apiData.length === 0) {
        return { companyAverage: "0%", predictedValue: "0%", data: [] };
    }
    //   const currentYear: number = new Date().getFullYear();

    const revenuePerEmployeeData: any = [
        { year: start_year, value: 0 },
        { year: end_year, value: 0 },
        // { year: currentYear, value: 0 },
    ];

    const selectedPeriodData = apiData?.["historic_data"]?.find(
        (item: any) =>
            item?.financial_year === start_year?.toString() ||
            item?.financial_year === start_year
    );
    const lastYearData = apiData?.["historic_data"]?.find(
        (item: any) =>
            item?.financial_year === end_year ||
            item?.financial_year === (end_year).toString()
    );

    //   const currentYearData = apiData?.["prediction_data"]?.find(
    //     (item: any) =>
    //       item?.year === currentYear || item?.year === currentYear.toString()
    //   );

    if (selectedPeriodData) {

        revenuePerEmployeeData[0]["value"] =
            selectedPeriodData?.revenue_per_employee;
    }

    if (lastYearData) {

        revenuePerEmployeeData[1]["value"] = lastYearData?.revenue_per_employee;
    }

    //   if (currentYearData) {
    //     predictedAvgRevenuePerEmployee += currentYearData?.revenue_per_employee;
    //     predictedAvgRevenuePerEmployeePoints++;
    //     revenuePerEmployeeData[2]["value"] = currentYearData?.revenue_per_employee;
    //   }



    return revenuePerEmployeeData;

};

export const transformCostOfVacancy = (apiData: any, start_year: any, end_year: any) => {
    const startYearData = apiData?.historic_data?.find((item: any) => item.year === start_year || item?.year === start_year.toString());
    const endYearData = apiData?.historic_data?.find((item: any) => item.year === end_year || item?.year === end_year.toString());


    const retentionRateData: any = [
        {
            quarter: "Jan-Mar",
            api_quarter: "Q1",
            quarter_number: 1,
            [start_year]: null,
            [end_year]: null,
            2025: null,
        },
        {
            quarter: "Apr-Jun",
            api_quarter: "Q2",
            quarter_number: 2,
            [start_year]: null,
            [end_year]: null,
            //   2025: null,
        },
        {
            quarter: "Jul-Sep",
            api_quarter: "Q3",
            quarter_number: 3,
            [start_year]: null,
            [end_year]: null,
            //   2025: null,
        },
        {
            quarter: "Oct-Dec",
            api_quarter: "Q4",
            quarter_number: 4,
            [start_year]: null,
            [end_year]: null,
            //   2025: null,
        },
    ];

    if (startYearData) {
        retentionRateData?.forEach((elem: any) => {
            const currQuarterData = startYearData?.quarters.find(
                (startYearQuarter: any) => startYearQuarter.quarter === elem?.api_quarter
            );
            elem[start_year] = currQuarterData?.cost_of_vacancy;
        })


    }

    if (endYearData) {
        retentionRateData?.forEach((elem: any) => {
            const currQuarterData = endYearData?.quarters.find(
                (endYearQuarters: any) => endYearQuarters.quarter === elem?.api_quarter
            );
            elem[end_year] = currQuarterData?.cost_of_vacancy;
        })


    }

    return (retentionRateData)

    // console.log("data for tesing start year nad end year data", retentionRateData);
}

export const transformPerformanceDeficitImpact = (data: any, start_year: any, end_year: any, apiString: any) => {
    const selectedPeriodData = data?.historic_data?.find((items: any) => items?.year === start_year || items?.year === start_year.toString());
    const currentYearData = data?.prediction_data?.find((items: any) => items?.year === end_year || items?.year === end_year.toString());

    let totalPdiSumCurrentYear = 0;

    currentYearData?.quarters?.forEach((elem: any) => {
        totalPdiSumCurrentYear += elem?.pdi;
    })
    // const yearsData = [selectedPeriodData?.total_performance_deficit,totalPdiSumCurrentYear]

    const yearsData = {
        [start_year]: selectedPeriodData?.[`${apiString}`],
        // 1:totalPdiSumCurrentYear,
        [end_year]: totalPdiSumCurrentYear
    }
    // console.log("New pdi data, ", yearsData)
    // return yearsData;
    return [yearsData]


    // Wrap in an array as required
};

export const transformAbsenteeismCost = (apiData: any, start_year: any, end_year: any) => {
    const startYearData = apiData?.historic_data?.find((item: any) => item.year === start_year || item?.year === start_year.toString());
    const endYearData = apiData?.historic_data?.find((item: any) => item.year === end_year || item?.year === end_year.toString());


    const retentionRateData: any = [
        {
            quarter: "Jan-Mar",
            api_quarter: "Q1",
            quarter_number: 1,
            [start_year]: null,
            [end_year]: null,
            2025: null,
        },
        {
            quarter: "Apr-Jun",
            api_quarter: "Q2",
            quarter_number: 2,
            [start_year]: null,
            [end_year]: null,
            //   2025: null,
        },
        {
            quarter: "Jul-Sep",
            api_quarter: "Q3",
            quarter_number: 3,
            [start_year]: null,
            [end_year]: null,
            //   2025: null,
        },
        {
            quarter: "Oct-Dec",
            api_quarter: "Q4",
            quarter_number: 4,
            [start_year]: null,
            [end_year]: null,
            //   2025: null,
        },
    ];

    if (startYearData) {
        retentionRateData?.forEach((elem: any) => {
            const currQuarterData = startYearData?.quarters.find(
                (startYearQuarter: any) => startYearQuarter.quarter === elem?.api_quarter
            );
            elem[start_year] = currQuarterData?.absenteeism_cost;
        })


    }

    if (endYearData) {
        retentionRateData?.forEach((elem: any) => {
            const currQuarterData = endYearData?.quarters.find(
                (endYearQuarters: any) => endYearQuarters.quarter === elem?.api_quarter
            );
            elem[end_year] = currQuarterData?.absenteeism_cost;
        })


    }

    return (retentionRateData)

    // console.log("data for tesing start year nad end year data", retentionRateData);
}