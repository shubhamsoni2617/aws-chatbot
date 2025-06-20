import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_LOGIN, CHANGE_PASSWORD, RESET_PASSWORD, FORGOT_PASSWORD, Two_FA_CHANGE } from "../types";
import { authServices } from "@/services";

// userLogin action
export const userLogin = createAsyncThunk(
  USER_LOGIN,
  async (data: any) => {
    const response = await authServices.userLogin(data); // Using the merged authServices
    let res;
    if (response?.status === 200) {res = response?.data;}
    else res = { ...response?.data, error: true };
    // console.log("in Auth action page", res);
    return res;
  }
);

// changePassword action
export const changePassword = createAsyncThunk(
  CHANGE_PASSWORD,
  async (data: any) => {
    const response = await authServices.changePassword(data); // Using the merged authServices
    let res;
    if (response?.status === 200) res = response?.data;
    else res = { ...response?.data, error: true };
    return res;
  }
);

//Reset Password Actions
export const resetPassword = createAsyncThunk(
    RESET_PASSWORD,
    async (data:any) => {
        const response = await authServices.resetPassword(data);
        let res;
        if(response?.status === 200) res = response?.data;
        else res = {...response?.data, error:true}
        return res;
    }
);

//Forgot Password Actions
export const forgotPassword = createAsyncThunk(
  FORGOT_PASSWORD,
  async (data:any) => {
      const response = await authServices.forgotPassword(data)
      let res;
      if (response?.status === 200) res = response?.data;
      else res = {...response?.data, error:true};
      return res;
  }
)

//Change2FASetting Actions
export const change2FA = createAsyncThunk(
  Two_FA_CHANGE,
  async(data:any) => {
      const response = await authServices.changeTwoFA(data)
      let res;
      if(response?.status === 200) res = response?.data;
      else res = {...response?.data, error:true}

      return res;
  }
)
