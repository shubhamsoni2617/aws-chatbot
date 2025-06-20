import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    reportsData: null,
}

const createReportSlice = createSlice({
    name:'createReport',
    initialState,
    reducers:{
        reportFilter: (state, action) => {
            state.reportsData = action.payload.val;
        }
    }

})

export const {reportFilter} = createReportSlice.actions;
export default createReportSlice.reducer;