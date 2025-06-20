export const tranfromReportReduxForComparision = (periods:any, departments:any, countries:any, checkBoxData:any) => {

    const reportsData = {
        "report_id": null,
            "report_name": "",
            "isComparison": 1,
            "report_filters": {
                "kpi": "turnover_rate",
                "period": periods[1],
                "department": departments[1],
                "location_ids": [
                    countries[1]
                ]
            },
            "comparison_filters": {
                "period": periods[0],
                "department": departments[0],
                "location_ids": [
                    countries[0]
                ]
            },
            "kpi": {
                "turnover_rate": checkBoxData.includes("Turnover Rate") ? "1" : "0",
                "retention_rate": checkBoxData.includes("Retention Rate") ? "1" : "0",
                "turnover_costs": checkBoxData.includes("Turnover Costs") ? "1" : "0",
                "cost_of_vacancy": checkBoxData.includes("Cost of Vacancy") ? "1" : "0",
                "absenteeism_rate": checkBoxData.includes("Absenteeism Rate") ? "1" : "0",
                "absenteeism_costs": checkBoxData.includes("Absenteeism costs") ? "1" : "0",
                "revenue_per_employee": checkBoxData.includes("Revenue Per Employee") ? "1" : "0",
                "internal_mobility_rate": checkBoxData.includes("Internal Mobility Rate") ? "1" : "0",
                "first_year_retention_rate": checkBoxData.includes("First Year Retention Rate") ? "1" : "0",
                "performance_deficit_impact": checkBoxData.includes("Performance Deficit Impact") ? "1" : "0"
            }
    }
    console.log(reportsData)

    return(reportsData);
}