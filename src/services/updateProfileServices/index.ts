import axiosInstance from "@/utils/axiosInstance"
import API from "../api"

const updateProfile = async(data:any) => {
    return await axiosInstance.post(`${API.profile}`, data)
    .then(res => {return {
        status: res.status,
        data:res.data,
    }})
    .catch(e => {return e?.response});
}

const updateProfileServices = {
    updateProfile,
}

export default updateProfileServices;