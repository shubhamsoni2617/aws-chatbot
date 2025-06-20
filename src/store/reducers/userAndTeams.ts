import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedCountryCodeFilter : null,
    selectedCountryUserAndTeams: null,
    mapDataFilterMarkersUserAndTeams :null,
    showAllUsers:true,
}

const userAndTeamsSlice = createSlice({
    name: "userAndTeams",
    initialState,
    reducers: {
        setSelectedCountryCodeFilter: (state, action) => {
            state.selectedCountryCodeFilter = action.payload
            
        },
        showAllUser: (state, action) => {
            state.showAllUsers = action.payload;
        }
    },
})

export const {setSelectedCountryCodeFilter,showAllUser} = userAndTeamsSlice.actions;

export default userAndTeamsSlice.reducer;