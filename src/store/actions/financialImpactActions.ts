import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ABSENTEEISM_COST, GET_COMPANY_PERFORMANCE_DATA, GET_PERFORMACE_DEFECIT_IMPACT, GET_TURNOVER_COST, GET_COST_OF_VACANCY } from "../types";
import financialImpactServices from "@/services/financialImpactServices";

export const getFinancialImpactData = createAsyncThunk(
    GET_COMPANY_PERFORMANCE_DATA,
    async(data:any) => {
        const response = await financialImpactServices.getFinancialImpactData(data);
        let res;
        if (response?.status === 200) res = response?.data;
        else res = { ...response?.data, error: true};
        return res
    }
)

export const getAbsenteeismCost = createAsyncThunk(
    GET_ABSENTEEISM_COST,
    async(data:any) => {
        const response =await financialImpactServices.getAbsenteeismCost(data);
        let res;
        if(response?.status === 200) res= response?.data;
        else res = {...response?.data, error: true};
        return res;
    }
)

export const getTurnOverCost = createAsyncThunk(
    GET_TURNOVER_COST,
    async(data:any) => {
        const response = await financialImpactServices.getTurnOverCost(data);
        let res;
        if(response?.status === 200) res= response?.data;
        else res = {...response?.data, error: true};
        return res;
    }
)

export const getPerformaceDeficitImpact = createAsyncThunk(
    GET_PERFORMACE_DEFECIT_IMPACT,
    async(data:any) => {
        const response = await financialImpactServices.getPerformaceDeficitImpact(data);
        let res;
        if(response?.status === 200) res= response?.data;
        else res = {...response?.data, error: true};
        return res;
    }
)

// New action for cost of vacancy
export const getCostOfVacancy = createAsyncThunk(
    GET_COST_OF_VACANCY,
    async() => {
        const response = await financialImpactServices.getCostOfVacancy();
        let res;
        if(response?.status === 200) res= response?.data;
        else res = {...response?.data, error: true};
        return res;
    }
)
