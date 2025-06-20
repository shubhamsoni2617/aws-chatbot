import { createSlice } from "@reduxjs/toolkit"
import { getDetailsSettingsData, getSecuritySettingsData } from "../actions/settingsAction";


const initialState = {
    loadingDetails: false,
    loadingSecurity:false,
    details: null,
    security:null
}

const settingSlice = createSlice({
    name: "settings",
    initialState,
    reducers:{

    },

    extraReducers: (builder) => {
        builder.addCase(getDetailsSettingsData.pending, (state) => {
            state.loadingDetails = true;
        });
        builder.addCase(getDetailsSettingsData.fulfilled, (state, action) => {
            state.loadingDetails = false;
            state.details = action.payload;
        });



        builder.addCase(getSecuritySettingsData.pending, (state) => {
            state.loadingSecurity= true;
        });
        builder.addCase(getSecuritySettingsData.fulfilled, (state, action) => {
            state.loadingSecurity = false;
            state.security = action.payload;
        })

    },
})

export default settingSlice.reducer;