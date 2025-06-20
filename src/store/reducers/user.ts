import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getDepartments,
  getLocations,
  getOrganizationChartData,
  getLocationMatrics,
  getUsers,
  deleteUser,
} from "../actions";
// import { useSearchParams } from "react-router-dom";
import {
  DepartemtIdHelper,
  LocationIdHelper,
} from "@/utils/helper/LocationDepartmentIdHelper";

const currentYear = new Date().getFullYear();

const initialState = {
  // Departments
  isLoadingDepartments: false,
  departments: null,

  // Locations
  isLoadingLocations: false,
  locations: [],

  // Organization Chart Data
  isLoadingOrganizationChartData: false,
  organizationChartData: <any>null,

  // Location Metrics
  isLoadingLocationMatrics: false,
  locationMatrics: [] as any,

  //Organization Users Data
  isOrganizationUsersLoading: true,
  organizationUsersData:<any> null,

  //Delete User
  isDeleteLoading: false,

  periodSelected: currentYear - 2,
  selectedKpi: null,
  selectedLocationCountry: <any>null,
  selectedLocationState: <any>null,
  selectedLocationAddress: <any>null,
  selectedLocationIds: <string[]>[],
  selectedDepartment: "",
  selectedDepartmentIds: "",

  innerFilterLocationCountry: <any>null,
  innerFilterLocationState: <any>null,
  innerFilterLocationAddress: <any>null,
  innerFilterDepartment: <any>null,
  innerFilterDepartmentIds: <any>null,

  innerFilterMarkers: <any>[],
  mapDataFilterMarkers: <any>null,

  countryList: [],
  stateList: [],
  addressList: [],

  showGlobe: true,
  drillDownEnabled: true,


  //users List
    inactiveUsersList: [] as any[],
    deactivatedUsersList: [] as any[],
    pendingInvitesUsersList: [] as any[],
    inviteBouncedUsersList: [] as any[],
    usersIn2FAList: [] as any[],
    inviteAccecptedUsersList: [] as any[],
    recentUserList: [] as any[],

};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<number>) => {
      state.periodSelected = action.payload;
    },
    setKpi: (state, action) => {
      state.selectedKpi = action.payload;
    },
    setLocation: (state, action) => {
      state.selectedLocationCountry =
        action.payload?.filterByCountry === ""
          ? null
          : (action.payload?.filterByCountry);

      state.innerFilterLocationCountry = state.selectedLocationCountry;

      state.selectedLocationState =
        action.payload?.filterByState === ""
          ? null
          : action.payload?.filterByState;

      state.innerFilterLocationState = state.selectedLocationState;

      state.selectedLocationAddress =
        action.payload?.filterByAddress === ""
          ? null
          : action.payload?.filterByAddress;

      state.innerFilterLocationAddress = state.selectedLocationAddress;

      state.selectedLocationIds = LocationIdHelper(
        state.locations,
        state.selectedLocationCountry,
        state.selectedLocationState,
        state.selectedLocationAddress
      );

      // console.log(
      //   "Data in user reduceer for locations",
      //   state.selectedLocationCountry,"asdfvadvasdv",
      //   state.selectedLocationState,"gegegeegege",
      //   state.selectedLocationAddress,"khlhlllhhoo",
      //   state.selectedLocationIds
      // );
    },

    setInnerFilterCountry: (state, action) => {
      state.innerFilterLocationCountry = action.payload;
    },

    setInnerFilterState: (state, action) => {
      state.innerFilterLocationState = action.payload;
    },

    setInnerFilterLocationAddress: (state, action) => {
      state.innerFilterLocationAddress = action.payload;
    },

    setInnerFilterMarker:(state, action) => {
      state.innerFilterMarkers = action.payload;
    },

    setMapDataFilterMarkers:(state, action) => {
      state.mapDataFilterMarkers = action.payload;
    },

    drillDownFucntion: (state, action) => {
      state.selectedLocationCountry =
        action.payload?.filterByCountry === ""
          ? null
          : action.payload?.filterByCountry;

      state.innerFilterLocationCountry =
        action.payload?.filterByCountry === ""
          ? null
          : action.payload?.filterByCountry;

      state.selectedLocationState =
        action.payload?.filterByState === ""
          ? null
          : action.payload?.filterByState;
      state.selectedLocationAddress =
        action.payload?.filterByAddress === ""
          ? null
          : action.payload?.filterByAddress;

      state.selectedLocationIds = LocationIdHelper(
        state.locations,
        state.selectedLocationCountry,
        state.selectedLocationState,
        state.selectedLocationAddress
      );
    },

    setDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
      state.innerFilterDepartment = action.payload;
      state.selectedDepartmentIds = DepartemtIdHelper(
        state.departments,
        state.selectedDepartment
      );
      state.innerFilterDepartmentIds = state.selectedDepartmentIds

    },

    setInnerFilterDepartment: (state, action) => {
      state.innerFilterDepartment = action.payload;
      state.innerFilterDepartmentIds = DepartemtIdHelper(
        state.departments,
        state.innerFilterDepartment
      );
    },

    

    setCountryList: (state, action) => {
      if (!state.selectedLocationCountry) state.countryList = action.payload;
      if (state.selectedLocationCountry && !state.selectedLocationState)
        state.stateList = action.payload;
      if (state.selectedLocationCountry && state.selectedLocationState)
        state.addressList = action.payload;
    },

    setGlobeView: (state, action) => {
      state.showGlobe = action.payload;
    },
    setDrillDown: (state, action) => {
      state.drillDownEnabled = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Departments
    builder.addCase(getDepartments.pending, (state) => {
      state.isLoadingDepartments = true;
    });
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
      state.isLoadingDepartments = false;
    });

    // Location
    builder.addCase(getLocations.pending, (state) => {
      state.isLoadingLocations = true;
    });
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.isLoadingLocations = false;
      state.locations = action.payload;
    });

    // Organization Chart Data
    builder.addCase(getOrganizationChartData.pending, (state) => {
      state.isLoadingOrganizationChartData = true;
    });
    builder.addCase(getOrganizationChartData.fulfilled, (state, action) => {
      state.isLoadingOrganizationChartData = false;
      state.organizationChartData = action.payload;
    });
    // builder.addCase(getReportsData.rejected, (state) => {
    //     state.isLoadingReportsData = false;
    // });

    // Get Location Metrics
    builder.addCase(getLocationMatrics.pending, (state) => {
      state.isLoadingLocationMatrics = true;
    });
    builder.addCase(getLocationMatrics.fulfilled, (state, action) => {
      state.isLoadingLocationMatrics = false;
      state.locationMatrics = action.payload;
    });

    //deleting a user 
    builder.addCase(deleteUser.pending, (state) => {
      state.isDeleteLoading = true;
    })
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isDeleteLoading = false;
    })
    builder.addCase(deleteUser.rejected, (state) => {
      state.isDeleteLoading = false;
    })
    // builder.addCase(getLocationMatrics.rejected, (state) => {
    //     state.isLoadingLocationMatrics = false;
    // });


    // Organization Users Data
    builder.addCase(getUsers.pending, (state) => {
      state.isOrganizationUsersLoading = true;
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isOrganizationUsersLoading = false;
      state.organizationUsersData = action.payload;

      action?.payload?.forEach((user:any) => {
        //inactive users list
        if(user?.user_status_metadata?.inactive_user){
          state.inactiveUsersList.push(user);
        }
        //deactivated users List
        if(user?.user_status_metadata?.deactivated_user){
          state.deactivatedUsersList.push(user);
        }
        //pending invite users List
        if(user?.user_status_metadata?.pending_invite){
          state.pendingInvitesUsersList.push(user);
        }
        //invite bounced users List
        if(user?.user_status_metadata?.invite_bounced){
          state.inviteBouncedUsersList.push(user);
        }
        //2FA enrolled users List
        if(user?.user_status_metadata?.enrolled_in_2fa){
          state.usersIn2FAList.push(user);
        }
        //invite accepted users List
        if(user?.user_status_metadata?.invite_accepted){
          state.inviteAccecptedUsersList.push(user);
        }
        //recent users List
        if(user?.user_status_metadata?.last_active_days_ago < 7 && user?.user_status_metadata?.last_active_days_ago !== null){
          state.recentUserList.push(user);
        }

      })
    })
  },
});

export const {
  setPeriod,
  setKpi,
  setGlobeView,
  setDrillDown,
  setCountryList,
  setLocation,
  setDepartment,
  setInnerFilterCountry,
  setInnerFilterLocationAddress,
  setInnerFilterState,
  drillDownFucntion,
  setInnerFilterMarker,
  setMapDataFilterMarkers,
  setInnerFilterDepartment
} = userDataSlice.actions;

export default userDataSlice.reducer;
