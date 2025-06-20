import axios from "axios";
import API from "../api";
import axiosInstance from "@/utils/axiosInstance";

// Below is for Json file
const getFinancialImpactData = async (data: any) => {
  return await axios
    .get(`${API.getFinancialImpactData}`, data)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e?.response;
    });
};

// starting here is from API Call from backend
const getAbsenteeismCost = async (data: any) => {
  return await axiosInstance
    .get(
      `${API.get_absenteeism_cost}`,
      data && {
        params: {
          org_id: data.org_id,
          location_id: data.location_id,
          department_id: data.department_id,
          start_year: data.start_year,
          end_year: data.end_year,
        },
      }
    )
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

const getTurnOverCost = async (data: any) => {
  // console.log("🚀 ~ getTurnOverCost ~ data:", data);
  return await axiosInstance
    .get(
      `${API.get_turnover_cost}`,
      data && {
        params: {
          org_id: data.org_id,
          department_id: data.department_id,
          start_year: data.start_year,
          location_id: data.location_id,
          end_year: data.end_year,
        },
      }
    )
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

const getPerformaceDeficitImpact = async (data: any) => {
  return await axiosInstance
    .get(
      `${API.get_performace_deficit_impact}`,
      data && {
        params: {
          org_id: data.org_id,
          start_year: data.start_year,
          end_year: data.end_year,
          location_id: data.location_id,
          department_id: data.department_id
        },
      }
    )
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

const getCostOfVacancy = async () => {
  return await axiosInstance
    .get(`${API.get_cost_of_vacancy}`)
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

const financialImpactServices = {
  getFinancialImpactData,
  getAbsenteeismCost,
  getTurnOverCost,
  getPerformaceDeficitImpact,
  getCostOfVacancy,
};
export default financialImpactServices;
