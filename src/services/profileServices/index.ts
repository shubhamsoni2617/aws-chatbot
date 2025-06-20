import axiosInstance from "../../utils/axiosInstance"
import API from "../api"

const getProfileData  = async (data:any) => {
    return await axiosInstance.get(`${API.profile}`, data)
    .then(res => {return res})
    .catch(e => {return e?.response});
}

const getProfileServices = {
    getProfileData,
}

export default getProfileServices;