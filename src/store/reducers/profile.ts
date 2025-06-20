import { createSlice } from "@reduxjs/toolkit";
import { getProfileData } from "../actions";

const initialState = {
    profileLoading: false,
    profileData: null,

    //ORG id
    orgIDRedux: null,
    organizationName:"",

    //UserInfo
    userName:null,
    userEmail:null,
    userId:<any>null,


    //Company Name,
    companyName:null,


};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        // setOrgID: (state, action) => {
        //     state.orgIDRedux = action.payload
        // }
    },

    extraReducers: (builder) => {
        builder.addCase(getProfileData.pending, (state) => {
            state.profileLoading = true;
        });
        builder.addCase(getProfileData.fulfilled, (state, action) => {
            state.profileLoading = false;
            state.profileData = action.payload;
            state.orgIDRedux = action.payload?.organization?.id;
            state.companyName = action.payload?.organization?.name;
            state.userName = action.payload?.user?.name;
            state.userEmail = action.payload?.user?.email;
            state.userId = action.payload?.user?.id;
            state.organizationName = action?.payload?.organization?.name;
        })
    }
});

export default profileSlice.reducer;