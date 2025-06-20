import { createSlice } from "@reduxjs/toolkit";
import { 
    getInternalMobilityRate, 
    getRetentionRate, 
    getRevenuePerEmployee, 
    getTurnoverRate, 
    getAbsenteeismRate, 
    getFirstYearRetentionRate, 
} from "../actions";

const initialState = {
    // RetentionRate
    isLoadingRetentionRate: false,
    retentionRate: null,

    // TurnOverRate
    isLoadingTurnoverRate: false,
    turnoverRate: null,

    // RevenuePer Employee
    isLoadingRevenuePerEmployee: false,
    revenuePerEmployee: null,

    // Internal Mobility Rate
    isLoadingInternalMobilityRate: false,
    internalMobilityRate: null,

    // Absenteeism Rate
    isLoadingAbsenteesimRate: false,
    absenteesimRate: null,

    // First Year Retention Rate
    isLoadingFirstYearRetentionRate: false,
    firstYearRetentionRate: null,


};

const companyPerformanceSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
       
    },

    extraReducers: (builder) => {
        // RetentionRate
        builder.addCase(getRetentionRate.pending, (state) => {
            state.isLoadingRetentionRate = true;
        });
        builder.addCase(getRetentionRate.fulfilled, (state, action) => {
            state.isLoadingRetentionRate = false;
            state.retentionRate = action.payload;
        });

        // TurnOver Rate
        builder.addCase(getTurnoverRate.pending, (state) => {
            state.isLoadingTurnoverRate = true;
        });
        builder.addCase(getTurnoverRate.fulfilled, (state, action) => {
            state.isLoadingTurnoverRate = false;
            state.turnoverRate = action.payload;
        });

        // RevenuePerEmployee
        builder.addCase(getRevenuePerEmployee.pending, (state) => {
            state.isLoadingRevenuePerEmployee = true;
        });
        builder.addCase(getRevenuePerEmployee.fulfilled, (state, action) => {
            state.isLoadingRevenuePerEmployee = false;
            state.revenuePerEmployee = action.payload;
        });

        // Internal Mobility Rate
        builder.addCase(getInternalMobilityRate.pending, (state) => {
            state.isLoadingInternalMobilityRate = true;
        });
        builder.addCase(getInternalMobilityRate.fulfilled, (state, action) => {
            state.isLoadingInternalMobilityRate = false;
            state.internalMobilityRate = action.payload;
        });

        // Absenteeism Rate
        builder.addCase(getAbsenteeismRate.pending, (state) => {
            state.isLoadingAbsenteesimRate = true;
        });
        builder.addCase(getAbsenteeismRate.fulfilled, (state, action) => {
            state.isLoadingAbsenteesimRate = false;
            state.absenteesimRate = action.payload;
        });

        // First Year Retention Rate
        builder.addCase(getFirstYearRetentionRate.pending, (state) => {
            state.isLoadingFirstYearRetentionRate = true;
        });
        builder.addCase(getFirstYearRetentionRate.fulfilled, (state, action) => {
            state.isLoadingFirstYearRetentionRate = false;
            state.firstYearRetentionRate = action.payload;
        });
    }
});

export default companyPerformanceSlice.reducer;