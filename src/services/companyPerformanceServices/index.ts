import axiosInstance from "@/utils/axiosInstance"
import API from "../api"

const getRetentionRate = async(data:any) => {
    return await axiosInstance
    .get(`${API.get_retention_rate}`, data && {
        params:{
            org_id: data.org_id,
            department_id: data.department_id,
            start_year: data.start_year,
            end_year:data.end_year,
            location_id: data.location_id,
        }
    })
    .then((res) => {
        return{
            status: res.status,
            data: res.data,
        }
    })
    .catch(e => {return e?.response});
}

const getTurnoverRate = async(data: any) => {
    return await axiosInstance
    .get(`${API.get_turnover_rate}`, data && {
        params: {
            org_id: data.org_id,
            start_date: data.start_date,
            end_date: data.end_date,
            department_id: data.department_id,
            location_id: data.location_id,
        }
    })
    .then((res) => {
        return{
            status: res.status,
            data: res.data,
        }
    })
    .catch(e => {return e?.response});
}

const getRevenuePerEmployee = async(data: any) => {
    return await axiosInstance
    .get(`${API.get_revenue_pre_employee}`, data && {
        params: {
            org_id: data.org_id,
        }
    })
    .then((res) => {
        return{
            status: res.status,
            data: res.data,
        }
    })
    .catch(e => {return e?.response});
}

const getAbsenteeismRate = async(data: any) => {
    return await axiosInstance
    .get(`${API.get_absenteeism_rate}`, data && 
        {params: {
            org_id: data.org_id,
            start_year : data.start_year,
            end_year : data.end_year,
            department_id: data.department_id,
            location_id: data.location_id,
        }}
    )
    .then((res) => {
        return{
            status: res.status,
            data: res.data,
        }
    })
    .catch(e => {return e?.response});
}

const getInternalMobilityRate = async(data: any) => {
    return await axiosInstance
    .get(`${API.get_internal_mobility_rate}`, data && {
        params: {
            start_date: data.start_date,
            end_date: data.end_date,
            department_id: data.department_id,
            location_id: data.location_id,
        }
    })
    .then((res) => {
        return{
            status: res.status,
            data: res.data,
        }
    })
    .catch(e => {return e?.response});
}


const getFirstYearRetentionRate = async(data: any) => {
    return await axiosInstance
    .get(`${API.get_first_year_retention_rate}`, data && {
        params: {
            org_id: data.org_id,
            department_id: data.department_id,
            start_year: data.start_year,
            end_year: data.end_year,
            location_id: data.location_id,
        }
    })
    .then((res) => {
        return{
            status: res.status,
            data: res.data,
        }
    })
    .catch(e => {return e?.response});
}




const companyPerformanceServices = {
    getRetentionRate,
    getTurnoverRate,
    getRevenuePerEmployee,
    getInternalMobilityRate,
    getAbsenteeismRate,
    getFirstYearRetentionRate,
};

export default companyPerformanceServices;