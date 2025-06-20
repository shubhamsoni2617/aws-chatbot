import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    GET_ABSENTEEISM_RATE, 
    GET_FIRST_YEAR_RETENTION_RATE, 
    GET_INTERNAL_MOBILITY_RATE, 
    GET_RETENTION_RATE, 
    GET_REVENUE_PER_EMPLOYEE, 
    GET_TURNOVER_RATE, 

} from "../types";
import { companyPerformanceServices } from "@/services";

export const getRetentionRate = createAsyncThunk(
    GET_RETENTION_RATE,
    async (data:any) => {
        const response = await companyPerformanceServices.getRetentionRate(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getTurnoverRate = createAsyncThunk(
    GET_TURNOVER_RATE,
    async (data:any) => {
        const response = await companyPerformanceServices.getTurnoverRate(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getRevenuePerEmployee = createAsyncThunk(
    GET_REVENUE_PER_EMPLOYEE,
    async (data:any) => {
        const response = await companyPerformanceServices.getRevenuePerEmployee(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getAbsenteeismRate = createAsyncThunk(
    GET_ABSENTEEISM_RATE,
    async (data:any) => {
        const response = await companyPerformanceServices.getAbsenteeismRate(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getInternalMobilityRate = createAsyncThunk(
    GET_INTERNAL_MOBILITY_RATE,
    async (data:any) => {
        const response = await companyPerformanceServices.getInternalMobilityRate(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getFirstYearRetentionRate = createAsyncThunk(
    GET_FIRST_YEAR_RETENTION_RATE,
    async (data:any) => {
        const response = await companyPerformanceServices.getFirstYearRetentionRate(data);
        let res;
        if(response?.status === 200) {res = response?.data}
        else res = {...response?.data , error: true};
        return res;
    }
)
