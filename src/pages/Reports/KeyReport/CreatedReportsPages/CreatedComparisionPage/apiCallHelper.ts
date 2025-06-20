import API from "@/services/api";
// import { getRetentionRate } from "@/store/actions"
import axiosInstance from "@/utils/axiosInstance";

export const getRetentionRate = async (reportsDate: any, comparisionDate: any, reportsCountry: any, comparisionCountry: any, reportsDepartment: any, comparisionDepartment: any) => {

    console.log(reportsCountry, "sbgbsgbeg", comparisionCountry)


    try {
        const reportsResponse = await axiosInstance.get(`${API.get_retention_rate}`, {
            params: {
                org_id: 2,
                start_year: reportsDate,
                end_year: reportsDate,
                // department_id: reportsDepartment,
                // location_id: reportsCountry,
                department_id: reportsDepartment ? reportsDepartment : "",
                location_id: reportsCountry && reportsCountry.length > 0 ? JSON.stringify(reportsCountry) : "",
            }
        });

        const comaprisonResponse = await axiosInstance.get(`${API.get_retention_rate}`, {
            params: {
                org_id: 2,
                start_year: comparisionDate,
                end_year: comparisionDate,
                // department_id: comparisionDepartment,
                // location_id: comparisionCountry,
                department_id: comparisionDepartment ? comparisionDepartment : "",
                location_id: comparisionCountry && comparisionCountry.length > 0 ? JSON.stringify(comparisionCountry) : "",
            }
        });

        return {
            status: reportsResponse.status && comaprisonResponse.status,
            data: {
                reportsData: reportsResponse,
                comaparisionData: comaprisonResponse
            },  // ✅ Ensure returning actual response data
        };
    } catch (error: any) {
        return error?.response || { error: "Unknown error" };
    }
};


export const getFirstYearRetentionRate = async (reportsDate: any, comparisionDate: any, reportsCountry: any, comparisionCountry: any, reportsDepartment: any, comparisionDepartment: any) => {

    console.log(reportsDepartment, reportsCountry, comparisionCountry, comparisionDepartment)
    try {
        const reportsResponse = await axiosInstance.get(`${API.get_first_year_retention_rate}`, {
            params: {
                org_id: 2,
                start_year: reportsDate,
                end_year: reportsDate,
                // department_id: reportsDepartment,
                // location_id: reportsCountry,
                department_id: reportsDepartment ? reportsDepartment : "",
                location_id: reportsCountry && reportsCountry.length > 0 ? JSON.stringify(reportsCountry) : "",
            }
        });

        const comaprisonResponse = await axiosInstance.get(`${API.get_first_year_retention_rate}`, {
            params: {
                org_id: 2,
                start_year: comparisionDate,
                end_year: comparisionDate,
                // department_id: comparisionDepartment,
                // location_id: comparisionCountry,
                department_id: comparisionDepartment ? comparisionDepartment : "",
                location_id: comparisionCountry && comparisionCountry.length > 0 ? JSON.stringify(comparisionCountry) : "",
            }
        });

        return {
            status: reportsResponse.status && comaprisonResponse.status,
            data: {
                reportsData: reportsResponse,
                comaparisionData: comaprisonResponse
            },  // ✅ Ensure returning actual response data
        };
    } catch (error: any) {
        return error?.response || { error: "Unknown error" };
    }
};

export const getTurnoverRate = async (reportsDate: any, comparisionDate: any, reportsCountry: any, comparisionCountry: any, reportsDepartment: any, comparisionDepartment: any) => {

    console.log(reportsDepartment, reportsCountry, comparisionCountry, comparisionDepartment)
    try {
        const reportsResponse = await axiosInstance.get(`${API.get_turnover_rate}`, {
            params: {
                org_id: 2,
                start_year: reportsDate,
                end_year: reportsDate,
                // department_id: reportsDepartment,
                // location_id: reportsCountry,
                department_id: reportsDepartment ? reportsDepartment : "",
                location_id: reportsCountry && reportsCountry.length > 0 ? JSON.stringify(reportsCountry) : "",
            }
        });

        const comaprisonResponse = await axiosInstance.get(`${API.get_turnover_rate}`, {
            params: {
                org_id: 2,
                start_year: comparisionDate,
                end_year: comparisionDate,
                // department_id: comparisionDepartment,
                // location_id: comparisionCountry,
                department_id: comparisionDepartment ? comparisionDepartment : "",
                location_id: comparisionCountry && comparisionCountry.length > 0 ? JSON.stringify(comparisionCountry) : "",
            }
        });

        return {
            status: reportsResponse.status && comaprisonResponse.status,
            data: {
                reportsData: reportsResponse,
                comaparisionData: comaprisonResponse
            },  // ✅ Ensure returning actual response data
        };
    } catch (error: any) {
        return error?.response || { error: "Unknown error" };
    }
};


export const getAbsenteeismRate = async (reportsDate: any, comparisionDate: any, reportsCountry: any, comparisionCountry: any, reportsDepartment: any, comparisionDepartment: any) => {

    console.log(reportsDepartment, reportsCountry, comparisionCountry, comparisionDepartment)
    try {
        const reportsResponse = await axiosInstance.get(`${API.get_absenteeism_rate}`, {
            params: {
                org_id: 2,
                start_year: reportsDate,
                end_year: reportsDate,
                // department_id: reportsDepartment,
                // location_id: reportsCountry,
                // department_id: reportsDepartment ? reportsDepartment : "",
                department_id: 2,

                location_id: reportsCountry && reportsCountry.length > 0 ? JSON.stringify(reportsCountry) : "",
            }
        });

        const comaprisonResponse = await axiosInstance.get(`${API.get_absenteeism_rate}`, {
            params: {
                org_id: 2,
                start_year: comparisionDate,
                end_year: comparisionDate,
                // department_id: comparisionDepartment,
                // location_id: comparisionCountry,
                // department_id: comparisionDepartment ? comparisionDepartment : "",
                department_id: 2,
                location_id: comparisionCountry && comparisionCountry.length > 0 ? JSON.stringify(comparisionCountry) : "",
            }
        });

        return {
            status: reportsResponse.status && comaprisonResponse.status,
            data: {
                reportsData: reportsResponse,
                comaparisionData: comaprisonResponse
            },  // ✅ Ensure returning actual response data
        };
    } catch (error: any) {
        return error?.response || { error: "Unknown error" };
    }
};



export const getRevenuePerEmployee = async (startYear: any, endYear: any) => {
    try {
        const response = await axiosInstance.get(`${API.get_revenue_pre_employee}`, {
            params: {
                org_id: 2,
                start_year: startYear,
                end_year: endYear,
                // department_id: reportsDepartment ? reportsDepartment : "",
                // location_id: reportsCountry && reportsCountry.length > 0 ? JSON.stringify(reportsCountry) : "",
            }
        });

        return {
            status: response.status,
            data: response.data,  // ✅ Ensure returning actual response data
        };
    }
    catch (error: any) {
        return error?.response || { error: "Unknown error" };
    }
}

export const getCostOfVacancy = async (startYear: any, endYear: any) => {
    try {
        const response = await axiosInstance.get(`${API.get_turnover_cost}`, {
            params: {
                org_id: 2,
                start_year: startYear,
                end_year: endYear,
                // department_id: reportsDepartment ? reportsDepartment : "",
                // location_id: reportsCountry && reportsCountry.length > 0 ? JSON.stringify(reportsCountry) : "",
            }
        });

        return {
            status: response.status,
            data: response.data,  // ✅ Ensure returning actual response data
        };
    }
    catch (error: any) {
        return error?.response || { error: "Unknown error" };
    }
}


export const getTunoverCost = async (reportsDate: any, comparisionDate: any, reportsCountry: any, comparisionCountry: any, reportsDepartment: any, comparisionDepartment: any) => {

    console.log(reportsDepartment, reportsCountry, comparisionCountry, comparisionDepartment)
    try {
        const reportsResponse = await axiosInstance.get(`${API.get_turnover_cost}`, {
            params: {
                org_id: 2,
                start_year: reportsDate,
                end_year: reportsDate,
                // department_id: reportsDepartment,
                // location_id: reportsCountry,
                department_id: reportsDepartment ? reportsDepartment : "",
                location_id: reportsCountry && reportsCountry.length > 0 ? JSON.stringify(reportsCountry) : "",
            }
        });

        const comaprisonResponse = await axiosInstance.get(`${API.get_turnover_cost}`, {
            params: {
                org_id: 2,
                start_year: comparisionDate,
                end_year: comparisionDate,
                // department_id: comparisionDepartment,
                // location_id: comparisionCountry,
                department_id: comparisionDepartment ? comparisionDepartment : "",
                location_id: comparisionCountry && comparisionCountry.length > 0 ? JSON.stringify(comparisionCountry) : "",
            }
        });

        // console.log("fetching turnover cost data", reportsResponse, comaprisonResponse)
        return {
            status: reportsResponse.status && comaprisonResponse.status,
            data: {
                reportsData: reportsResponse,
                comaparisionData: comaprisonResponse
            },  // ✅ Ensure returning actual response data
        };
    } catch (error: any) {
        return error?.response || { error: "Unknown error" };
    }
};


export const getPDI = async (reportsDate: any, comparisionDate: any, reportsCountry: any, comparisionCountry: any, reportsDepartment: any, comparisionDepartment: any) => {

    console.log(reportsDepartment, reportsCountry, comparisionCountry, comparisionDepartment)
    try {
        const reportsResponse = await axiosInstance.get(`${API.get_performace_deficit_impact}`, {
            params: {
                org_id: 2,
                start_year: reportsDate,
                end_year: reportsDate,
                // department_id: reportsDepartment,
                // location_id: reportsCountry,
                department_id: reportsDepartment ? reportsDepartment : "",
                location_id: reportsCountry && reportsCountry.length > 0 ? JSON.stringify(reportsCountry) : "",
            }
        });

        const comaprisonResponse = await axiosInstance.get(`${API.get_performace_deficit_impact}`, {
            params: {
                org_id: 2,
                start_year: comparisionDate,
                end_year: comparisionDate,
                // department_id: comparisionDepartment,
                // location_id: comparisionCountry,
                department_id: comparisionDepartment ? comparisionDepartment : "",
                location_id: comparisionCountry && comparisionCountry.length > 0 ? JSON.stringify(comparisionCountry) : "",
            }
        });

        // console.log("fetching turnover cost data", reportsResponse, comaprisonResponse)
        return {
            status: reportsResponse.status && comaprisonResponse.status,
            data: {
                reportsData: reportsResponse,
                comaparisionData: comaprisonResponse
            },  // ✅ Ensure returning actual response data
        };
    } catch (error: any) {
        return error?.response || { error: "Unknown error" };
    }
};


export const getAbsenteeismCost = async (reportsDate: any, comparisionDate: any, reportsCountry: any, comparisionCountry: any, reportsDepartment: any, comparisionDepartment: any) => {

    console.log(reportsDepartment, reportsCountry, comparisionCountry, comparisionDepartment)
    try {
        const reportsResponse = await axiosInstance.get(`${API.get_absenteeism_cost}`, {
            params: {
                org_id: 2,
                start_year: reportsDate,
                end_year: reportsDate,
                // department_id: reportsDepartment,
                // location_id: reportsCountry,
                department_id: reportsDepartment ? reportsDepartment : "",
                location_id: reportsCountry && reportsCountry.length > 0 ? JSON.stringify(reportsCountry) : "",
            }
        });

        const comaprisonResponse = await axiosInstance.get(`${API.get_absenteeism_cost}`, {
            params: {
                org_id: 2,
                start_year: comparisionDate,
                end_year: comparisionDate,
                // department_id: comparisionDepartment,
                // location_id: comparisionCountry,
                department_id: comparisionDepartment ? comparisionDepartment : "",
                location_id: comparisionCountry && comparisionCountry.length > 0 ? JSON.stringify(comparisionCountry) : "",
            }
        });

        // console.log("fetching turnover cost data", reportsResponse, comaprisonResponse)
        return {
            status: reportsResponse.status && comaprisonResponse.status,
            data: {
                reportsData: reportsResponse,
                comaparisionData: comaprisonResponse
            },  // ✅ Ensure returning actual response data
        };
    } catch (error: any) {
        return error?.response || { error: "Unknown error" };
    }
};
// export const getAbsenteeismCost = async (startYear: any, endYear: any) => {
//     try {
//         const response = await axiosInstance.get(`${API.get_absenteeism_cost}`, {
//             params: {
//                 org_id: 2,
//                 start_year: startYear,
//                 end_year: endYear,
//             }
//         });

//         return {
//             status: response.status,
//             data: response.data,  // ✅ Ensure returning actual response data
//         };
//     }
//     catch (error: any) {
//         return error?.response || { error: "Unknown error" };
//     }
// }


