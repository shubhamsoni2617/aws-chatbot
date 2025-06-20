import { createSlice } from "@reduxjs/toolkit"
import { updateProfile } from "../actions";

const initialState = {
    isProcessing :false,
}

const updateProfileSlice = createSlice({
    name:"updateProfile",
    initialState,
    reducers:{

    },

    extraReducers: (builder) => {
        builder.addCase(updateProfile.pending, (state) => {
            state.isProcessing = true;
        })
        builder.addCase(updateProfile.fulfilled, (state) => {
            state.isProcessing = false;
        })
    }
})

export default updateProfileSlice.reducer;