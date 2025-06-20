import axios from "axios"
import API from "../api"

 const getSettingsData = async (data:any) => {
    return await axios.get(`${API.getSettingsData}`, data)
    .then(res => {return res})
    .catch(e => {return e?.response});
 }

 const settingsServices = {
   getSettingsData,
 }

 export default settingsServices;