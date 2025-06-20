import axios from "axios";
import API from "../api";
import axiosInstance from "@/utils/axiosInstance";

// userLogin service
const userLogin = async (data: any) => {
  return await axios
    .post(`${API.user_login}`, data)
    .then((res) => {
      // console.log(res.data.access_token);
      return {
        status: res.status,
        data: {
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
          temp_password: res.data.temp_password,
          userId: 1,
          ...data,
        },
      };
    })
    .catch((e) => {
      return e?.response;
    });
};

// changePassword service
const changePassword = async (data: any) => {
  return await axiosInstance
    .post(`${API.change_password}`, data)
    .then((res) => {
      // console.log("This is the change password services", res);
      return {
        status: res.status,
        data: res.data,
      };
    })
    .catch((e) => {
      return e?.response;
    });
};

//resetPassword

const resetPassword = async(data:any) => {
  return await axios.post(`${API.reset_password}`, data)
  .then(res => {  return {
      status: res.status,
      data: res.data,
  }})
  .catch( e => {return e?.response});
}

//Forgot Password
const forgotPassword = async(data:any) => {
  return await axios.post(`${API.forgot_password}`, data)
  .then(res => { console.log("forgot passowrd", res);return {
      status:res.status,
      data: {
          message: res.data,
      }
  }})
  .catch(e => {return e?.response});
}

//Change 2FA
const changeTwoFA = async(data:any) => {
  return await axiosInstance.post(`${API.change_2FA}`, data)
  .then(res => {
      return{
          status:res.status,
          data: res.data,
      }
  })
  .catch(e => {return e?.response});
}


const authServices = {
  userLogin,
  changePassword,
  resetPassword,
  forgotPassword,
  changeTwoFA,
};

export default authServices;
