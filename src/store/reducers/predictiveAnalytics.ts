import { createSlice } from "@reduxjs/toolkit";
import { getEngagement, getEngagementAssignedTasks } from "../actions";

const initialState = {
  isEngagementLoading: true,
  engagementData: null,

  isEngagementAssignedTasksLoading: true,
  engagementAssignedTasksData: null,

  riskAlertLocationIds: <any>[],
  riskAlertLocationPoints: <any> null,
};

const predictiveAnalyticsSlice = createSlice({
  name: "predictiveAnalyticsData",
  initialState,
  reducers: {
    setEngagementAssigntaskToNull: (state) => {
      state.engagementAssignedTasksData = null;
    },
    setEmgagementDataNull: (state) => {
      state.engagementData = null;
    },
    setRiskAlertLocationIds: (state, action) => {
      state.riskAlertLocationIds = [...state.riskAlertLocationIds, action.payload];
    },
    setRiskAlertLocationPoints: (state, action) => {
      state.riskAlertLocationPoints = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getEngagement.pending, (state) => {
      state.isEngagementLoading = true;
    });
    builder.addCase(getEngagement.fulfilled, (state, action) => {
      state.isEngagementLoading = false;
      state.engagementData = action.payload;
    });
    builder.addCase(getEngagement.rejected, (state) => {
      state.isEngagementLoading = false;
    })

    builder.addCase(getEngagementAssignedTasks.pending, (state) => {
      state.isEngagementAssignedTasksLoading = true;
    });
    builder.addCase(getEngagementAssignedTasks.fulfilled, (state, action) => {
      state.isEngagementAssignedTasksLoading = false;
      state.engagementAssignedTasksData = action.payload;
    });
  },
});

export const {
  setRiskAlertLocationPoints,
  setEngagementAssigntaskToNull,
  setEmgagementDataNull,
  setRiskAlertLocationIds,
} = predictiveAnalyticsSlice.actions;
export default predictiveAnalyticsSlice.reducer;
