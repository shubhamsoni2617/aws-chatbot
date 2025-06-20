import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_REPORT, GET_KEY_REPORT_COMMENT, GET_OVERVIEW_KEY_REPORT_COMMENT, GET_REPORT_COMMENTS, GET_REPORT_RECOMMENDATION, GET_REPORTS_DATA, KEY_OVERVIEW_REPORTS_ADD_COMMENT, KEY_REPORTS_ADD_COMMENT, SAVE_REPORT_DATA, SHARE_REPORT, START_REPORT } from "../types";
import { reportsServices } from "@/services";

export const saveReportData = createAsyncThunk(
    SAVE_REPORT_DATA,
    async (data: any) => {
        const response = await reportsServices.saveReportData(data); // Call the saveReportData service
        let res;
        if (response?.status === 200) res = response?.data;
        else res = { ...response?.data, error: true };
        return res;
    }
);

export const getReportsData = createAsyncThunk(
    GET_REPORTS_DATA,
    async () => {
        const response = await reportsServices.getReportsData(); // Call the getReportsData service
        // console.log("🚀 ~ response:", response)
        let res;
        if (response?.status === 200){
            const filteredData = structuredClone(response)?.data?.reports?.filter((item: any) => item?.report_name );
             res = filteredData
            }else{
                res = { ...response?.data, error: true };
            }
        return res;
    }
);

export const getReportRecommendation = createAsyncThunk(
    GET_REPORT_RECOMMENDATION,
    async (data:any) => {
        const response = await reportsServices.getReportRecommendatation(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const starReport  = createAsyncThunk(
    START_REPORT,
    async(data:any) => {
        const response = await reportsServices.startReport(data);
        let res;
        if(response?.status === 200) res = response;
        else res = {...response , error: true};
        return res;
    }
)


export const deleteReport  = createAsyncThunk(
    DELETE_REPORT,
    async(data:any) => {
        const response = await reportsServices.deleteReport(data);
        let res;
        if(response?.status === 200) res = response;
        else res = {...response , error: true};
        return res;
    }
)

export const addReportComment  = createAsyncThunk(
    START_REPORT,
    async(data:any) => {
        const response = await reportsServices.addReportComment(data);
        let res;
        if(response?.status === 200) res = response;
        else res = {...response , error: true};
        return res;
    }
)

export const getReportComment = createAsyncThunk(
    GET_REPORT_COMMENTS,
    async (data:any) => {
        const response = await reportsServices.getReportComment(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const postKeyReportComment = createAsyncThunk(
    KEY_REPORTS_ADD_COMMENT,
    async (data:any) => {
        const response = await reportsServices.postKeyReportComment(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getKeyReportComment = createAsyncThunk(
    GET_KEY_REPORT_COMMENT,
    async (data:any) => {
        const response = await reportsServices.getKeyReportsComment(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const postOverviewKeyReportComment = createAsyncThunk(
    KEY_OVERVIEW_REPORTS_ADD_COMMENT,
    async (data:any) => {
        const response = await reportsServices.postOverviewKeyReportComment(data);
        let res;
        if(response?.status === 200) {
            // if (response && response.data && response.data.payload) {
            //     response.data.payload.error = false;
            // }
            res = response?.data
            // if (res && res.payload) {
            //     res.payload.error = false;
            // }
        }
        else res = {...response?.data , error: true};
        return res;
    }
)

export const getOverviewKeyReportComment = createAsyncThunk(
    GET_OVERVIEW_KEY_REPORT_COMMENT,
    async (data:any) => {
        const response = await reportsServices.getOverViewKeyReportsComment(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const updateEngagementNote = createAsyncThunk(
    KEY_REPORTS_ADD_COMMENT,
    async (data:any) => {
        const response = await reportsServices.updateEngagementNote(data);
        let res;
        if(response?.status === 200) res = response;
        else res = {...response?.data , error: true};
        return res;
    }
)

export const shareReport = createAsyncThunk(
    SHARE_REPORT,
    async (data:any) => {
        const response = await reportsServices.shareReport(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data , error: true};
        return res;
    }
)
