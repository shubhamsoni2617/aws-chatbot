import axiosInstance from "@/utils/axiosInstance";
import API from "../api";

const addStep = async (data: any) => {
  return await axiosInstance
    .post(`${API.add_step_engagement}`, data)
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
      };
    })
    .catch((e) => {
      return e?.response;
    });
};

const getEngagement = async (data: any) => {
  return await axiosInstance.get(
    `${API.get_engagement}`,
    data && {
      params: {
        org_id: data.org_id,
        location_id: data.location_id,
        kpi: data.kpi,
        quarter: data.quarter,
      },
    }
  );
};

const getEngagementAssignedTask = async (data: any) => {
  return await axiosInstance.get(
    `${API.get_engagement_assigned_task}`,
    data && {
      params: {
        org_id: data.org_id,
        engagement_id: data.engagement_id,
      },
    }
  );
};

const engagementAssignTask = async (data: any) => {
  return await axiosInstance
    .post(`${API.engagement_assign_task}`, data)
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
      };
    })
    .catch((e) => {
      return e?.response;
    });
};

const leaveFeedback = async(data:any) => {
  return await axiosInstance
  .post(`${API.leave_feedback}`, data)
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

const predictiveAnalyticsServices = {
  addStep,
  getEngagement,
  getEngagementAssignedTask,
  engagementAssignTask,
  leaveFeedback
};

export default predictiveAnalyticsServices;
