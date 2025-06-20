import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    GET_DEPARTMENTS, 
    GET_LOCATIONS, 
    GET_ORGANIZATION_CHART_DATA,
    GET_LOCATION_MATRICS, 
    ADD_USER,
    DELETE_USER
} from "../types";
import { userServices } from "@/services";

export const getLocations = createAsyncThunk(
    GET_LOCATIONS,
    async (data:any) => {
        const response = await userServices.getLocations(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getDepartments = createAsyncThunk(
    GET_DEPARTMENTS,
    async (data:any) => {
        const response =await userServices.getDepartments(data)
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getOrganizationChartData = createAsyncThunk(
    GET_ORGANIZATION_CHART_DATA,
    async (data: any) => {
        const response = await userServices.getOrganizationChartData(data);
        let res;
        if (response?.status === 200) res = response?.data;
        else res = { ...response?.data, error: true };
        return res;
    }
);


export const getLocationMatrics = createAsyncThunk(
    GET_LOCATION_MATRICS,
    async () => {
        const response = await userServices.getLocationMatrics(); // Call the getLocationMatrics service
        let res;
        if (response?.status === 200) res = response?.data;
        else res = { ...response?.data, error: true };
        return res;
    }
);

export const addUser = createAsyncThunk(
    ADD_USER,
    async (data:any) => {
        const response = await userServices.addUser(data); // Call the getLocationMatrics service
        let res;
        if (response?.status === 200) res = response?.data;
        else res = { ...response?.data, error: true };
        return res;
    }
);


export const getUsers = createAsyncThunk(
    ADD_USER,
    async (data:any) => {
        const response = await userServices.getOrganizationUsers(data); // Call the getLocationMatrics service
        let res;
        if (response?.status === 200) res = response?.data;
        else res = { ...response?.data, error: true };
        return res;
    }
);

export const deleteUser = createAsyncThunk(
    DELETE_USER,
    async (data:any) => {
        const response = await userServices.deleteUser(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = { ...response?.data, error: true};
        return res;
    }

)
