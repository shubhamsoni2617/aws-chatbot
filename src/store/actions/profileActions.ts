import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_PROFILE_DATA } from "../types";
import getProfileServices from "../../services/profileServices";


export const getProfileData = createAsyncThunk(
    GET_PROFILE_DATA,
    async(data:any) => {
        const response = await getProfileServices.getProfileData(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data, error:true};
        return res;
    }
)