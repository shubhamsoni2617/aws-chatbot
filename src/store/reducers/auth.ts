import { createSlice } from "@reduxjs/toolkit";
import { userLogin} from "../actions"; // Import both actions
import axios from "axios";
import { setLocalData } from "../../utils/localStorage";

// Initial state for both auth and changePassword
const initialState = {
  // auth state
  loading: false,
  isLoggedIn: false,
  userId: null,
  token: "",
  profile: {},
  temp_password:null,

  // changePassword state
  isLoadingChangePassword: false,

  //resetPassword loading
  isLoadingResetPassword: false,

  //forgotPassword Loading
  isLoadingForgotPassword: false,

  //2FA Loading
  isLoading2FA: false,
};

// Store user data for authentication
const storeUserData = (data: any) => {
  if (data) {
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${data?.access_token}`,
        Accept: 'application/json',
      };
      setLocalData('token', {
        access_token: data.access_token,
        refresh_token: data.refresh_token
      }); // Save both tokens
      setLocalData('temp_password', {
        temp_password: data.temp_password,
      }); 
      

    } catch (e) {
      console.log('SET DATA ERROR', e);
    }
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      state.userId = action?.payload;
    },
  },
  extraReducers: (builder) => {
    // Handling userLogin action states
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload.access_token;
      state.temp_password = action.payload;
      console.log("temp passowrd", action.payload);
      storeUserData(action?.payload);
    });

   
  },
});

export const { setInitialData } = authSlice.actions;

export default authSlice.reducer;
