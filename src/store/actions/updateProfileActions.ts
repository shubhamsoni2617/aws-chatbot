import { createAsyncThunk } from "@reduxjs/toolkit";
import { UPDATE_PROFILE } from "../types";
import { updateProfileServices } from "@/services";

export const updateProfile = createAsyncThunk(
    UPDATE_PROFILE,
    async (data:any) => {
        const response = await updateProfileServices.updateProfile(data)
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data ,error:true}
        return res;
    }
)