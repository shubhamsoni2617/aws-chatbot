import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_MONITOR_ASSIGNED_TASK, SEND_REMINDER } from "../types";
import { monitorServices } from "@/services";


export const sendReminder = createAsyncThunk(
    SEND_REMINDER,
    async (data:any) => {
        const response = await monitorServices.sendReminder(data);
        let res;
        if(response?.status === 200) res = response;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getMonitorAssignedTasks = createAsyncThunk(
    GET_MONITOR_ASSIGNED_TASK,
    async (data:any) => {
        const response = await monitorServices.getMonitorAssignedTask(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)