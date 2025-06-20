import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_SETTINGS_DETAILS_DATA, GET_SETTINGS_SECURITY_DATA } from "../types";
import { settingsServices } from "@/services";

export const getDetailsSettingsData = createAsyncThunk(
    GET_SETTINGS_DETAILS_DATA,
    async (data:any) => {
        const response = await settingsServices.getSettingsData(data);
        let res;
        if(response?.status === 200) res = response?.data?.details;
        else res = {...response?.data?.details, error: true};
        return res
    }
)

export const getSecuritySettingsData = createAsyncThunk(
    GET_SETTINGS_SECURITY_DATA,
    async (data:any) => {
        const response = await settingsServices.getSettingsData(data);
        let res;
        if(response?.status === 200) res = response?.data?.security;
        else res = {...response?.data?.security, error: true};
        return res
    }
)