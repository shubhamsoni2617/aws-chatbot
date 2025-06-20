import axiosInstance from "@/utils/axiosInstance";
import API from "../api";


const sendReminder = async (data:any) => {
    return await axiosInstance
    .post(`${API.send_reminder}`, data)
    .then((res) => {
        return {
            status: res.status,
            data: res.data,
        };
    })
    .catch((e) => {
        return e?.response;
    });
}
const getMonitorAssignedTask = async (data: any) => {
  return await axiosInstance.get(
    `${API.get_engagement_assigned_task}`,
    data && {
      params: {
        org_id: data.org_id,
      },
    }
  );
};

const monitorServices = {
    sendReminder,
    getMonitorAssignedTask
}

export default monitorServices;