import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_STEP, ENGAGEMENT_ASSIGN_TASK, GET_ENGAGEMENT, GET_ENGAGEMENT_ASSIGNED_TASK, LEAVE_FEEDBACK } from "../types";
import { predictiveAnalyticsServices } from "@/services";



export const addStep = createAsyncThunk(
    ADD_STEP,
    async (data:any) => {
        const response = await predictiveAnalyticsServices.addStep(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getEngagement = createAsyncThunk(
    GET_ENGAGEMENT,
    async (data:any) => {
        const response = await predictiveAnalyticsServices.getEngagement(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getEngagementAssignedTasks = createAsyncThunk(
    GET_ENGAGEMENT_ASSIGNED_TASK,
    async (data:any) => {
        const response = await predictiveAnalyticsServices.getEngagementAssignedTask(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const engagementAssignTask = createAsyncThunk(
    ENGAGEMENT_ASSIGN_TASK,
    async (data:any) => {
        const response = await predictiveAnalyticsServices.engagementAssignTask(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const leaveFeedback = createAsyncThunk(
    LEAVE_FEEDBACK,
    async (data:any) => {
        const response = await predictiveAnalyticsServices.leaveFeedback(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)
