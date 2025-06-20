import { createSlice } from "@reduxjs/toolkit"
import { getMonitorAssignedTasks } from "../actions"



const initialState = {
    isMonitorTaskLoading: true,
    monitorTaskData: <any>null,

    myAssignedTask: 0,
    publicAssignedTasks: 0,
}

const monitorSlice = createSlice({
    name:"monitorData",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getMonitorAssignedTasks.pending, (state) => {
            state.isMonitorTaskLoading=true;
        })
        builder.addCase(getMonitorAssignedTasks.fulfilled, (state, action) => {
            state.isMonitorTaskLoading=false;
            state.monitorTaskData = action.payload;
        })
        builder.addCase(getMonitorAssignedTasks.rejected, (state) => {
            state.isMonitorTaskLoading = false;
        })
    }
})

export default monitorSlice.reducer;