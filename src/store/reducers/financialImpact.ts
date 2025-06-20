import { createSlice } from "@reduxjs/toolkit";
import { getAbsenteeismCost, getFinancialImpactData, getPerformaceDeficitImpact, getTurnOverCost, getCostOfVacancy } from "../actions";

const initialState = {
    loading: false,
    financialImpact: null,

    //absenteeism cost
    absenteesimCostLoading: false,
    absenteesimCostData: null,

    //turnover cost
    turnoverCostLoading: false,
    turnoverCostData: null,

    //performance deficit impact
    performanceDefecitImpactLoading: false,
    performanceDefecitImpactData: null,

    //cost of vacancy
    costOfVacancyLoading: false,
    costOfVacancyData: null,
}

const financialImpactSlice = createSlice({
    name: "financialImpact",
    initialState,
    reducers: {

    },
    
    extraReducers: (builder) => {
        builder.addCase(getFinancialImpactData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getFinancialImpactData.fulfilled, (state, action) => {
            state.loading = false;
            state.financialImpact = action.payload;
        })

        //for absenteeism cost
        builder.addCase(getAbsenteeismCost.pending, (state) => {
            state.absenteesimCostLoading = true;
        });
        builder.addCase(getAbsenteeismCost.fulfilled, (state, action) => {
            state.absenteesimCostLoading = false;
            state.absenteesimCostData = action.payload;
        })

        //for turnover cost
        builder.addCase(getTurnOverCost.pending, (state) => {
            state.turnoverCostLoading = true;
        })
        builder.addCase(getTurnOverCost.fulfilled, (state, action) => {
            state.turnoverCostLoading = false;
            state.turnoverCostData = action.payload;
        })

        //for performance deficit impact
        builder.addCase(getPerformaceDeficitImpact.pending, (state) => {
            state.performanceDefecitImpactLoading = true;
        })
        builder.addCase(getPerformaceDeficitImpact.fulfilled, (state, action) => {
            state.performanceDefecitImpactLoading = false;
            state.performanceDefecitImpactData = action.payload;
        })

        //for cost of vacancy
        builder.addCase(getCostOfVacancy.pending, (state) => {
            state.costOfVacancyLoading = true;
        })
        builder.addCase(getCostOfVacancy.fulfilled, (state, action) => {
            state.costOfVacancyLoading = false;
            state.costOfVacancyData = action.payload;
        })
    }
})

export default financialImpactSlice.reducer;