import API from "@/services/api";
// import { getRetentionRate } from "@/store/actions"
import axiosInstance from "@/utils/axiosInstance";

export const getRetentionRate = async (
  startYear: any,
  endYear: any,
  reportsLocatinIds: any,
  reportsDepartmentIds: any
) => {
  try {
    const response = await axiosInstance.get(`${API.get_retention_rate}`, {
      params: {
        org_id: 2,
        start_year: startYear,
        end_year: endYear,
        department_id: reportsDepartmentIds ? reportsDepartmentIds : "",
        location_id:
          reportsLocatinIds && reportsLocatinIds.length > 0
            ? JSON.stringify(reportsLocatinIds)
            : "",
      },
    });

    return {
      status: response.status,
      data: response.data, // ✅ Ensure returning actual response data
    };
  } catch (error: any) {
    return error?.response || { error: "Unknown error" };
  }
};

export const getFirstYearRetentionRate = async (
  startYear: any,
  endYear: any,
  reportsLocatinIds: any,
  reportsDepartmentIds: any
) => {
  try {
    const response = await axiosInstance.get(
      `${API.get_first_year_retention_rate}`,
      {
        params: {
          org_id: 2,
          start_year: startYear,
          end_year: endYear,
          department_id: reportsDepartmentIds ? reportsDepartmentIds : "",
          location_id:
            reportsLocatinIds && reportsLocatinIds.length > 0
              ? JSON.stringify(reportsLocatinIds)
              : "",
        },
      }
    );

    return {
      status: response.status,
      data: response.data, // ✅ Ensure returning actual response data
    };
  } catch (error: any) {
    return error?.response || { error: "Unknown error" };
  }
};

export const getTurnoverRate = async (
  startYear: any,
  endYear: any,
  reportsLocatinIds: any,
  reportsDepartmentIds: any
) => {
  try {
    const response = await axiosInstance.get(`${API.get_turnover_rate}`, {
      params: {
        org_id: 2,
        start_year: startYear,
        end_year: endYear,
        department_id: reportsDepartmentIds ? reportsDepartmentIds : "",
        location_id:
          reportsLocatinIds && reportsLocatinIds.length > 0
            ? JSON.stringify(reportsLocatinIds)
            : "",
      },
    });

    return {
      status: response.status,
      data: response.data, // ✅ Ensure returning actual response data
    };
  } catch (error: any) {
    return error?.response || { error: "Unknown error" };
  }
};

export const getAbsenteeismRate = async (
  startYear: any,
  endYear: any,
  reportsLocatinIds: any,
  reportsDepartmentIds: any
) => {
  try {
    const response = await axiosInstance.get(`${API.get_absenteeism_rate}`, {
      params: {
        org_id: 2,
        start_year: startYear,
        end_year: endYear,
        department_id: reportsDepartmentIds ? reportsDepartmentIds : "",
        location_id:
          reportsLocatinIds && reportsLocatinIds.length > 0
            ? JSON.stringify(reportsLocatinIds)
            : "",
      },
    });

    return {
      status: response.status,
      data: response.data, // ✅ Ensure returning actual response data
    };
  } catch (error: any) {
    return error?.response || { error: "Unknown error" };
  }
};

export const getRevenuePerEmployee = async (startYear: any, endYear: any) => {
  try {
    const response = await axiosInstance.get(
      `${API.get_revenue_pre_employee}`,
      {
        params: {
          org_id: 2,
          start_year: startYear,
          end_year: endYear,
        },
      }
    );

    return {
      status: response.status,
      data: response.data, // ✅ Ensure returning actual response data
    };
  } catch (error: any) {
    return error?.response || { error: "Unknown error" };
  }
};

export const getCostOfVacancy = async (
  startYear: any,
  endYear: any,
  reportsLocatinIds: any,
  reportsDepartmentIds: any
) => {
  try {
    const response = await axiosInstance.get(`${API.get_turnover_cost}`, {
      params: {
        org_id: 2,
        start_year: startYear,
        end_year: endYear,
        department_id: reportsDepartmentIds ? reportsDepartmentIds : "",
        location_id:
          reportsLocatinIds && reportsLocatinIds.length > 0
            ? JSON.stringify(reportsLocatinIds)
            : "",
      },
    });

    return {
      status: response.status,
      data: response.data, // ✅ Ensure returning actual response data
    };
  } catch (error: any) {
    return error?.response || { error: "Unknown error" };
  }
};

export const getTunoverCost = async (
  startYear: any,
  endYear: any,
  reportsLocatinIds: any,
  reportsDepartmentIds: any
) => {
  try {
    const response = await axiosInstance.get(`${API.get_turnover_cost}`, {
      params: {
        org_id: 2,
        start_year: startYear,
        end_year: endYear,
        department_id: reportsDepartmentIds ? reportsDepartmentIds : "",
        location_id:
          reportsLocatinIds && reportsLocatinIds.length > 0
            ? JSON.stringify(reportsLocatinIds)
            : "",
      },
    });

    return {
      status: response.status,
      data: response.data, // ✅ Ensure returning actual response data
    };
  } catch (error: any) {
    return error?.response || { error: "Unknown error" };
  }
};

export const getPDI = async (startYear: any, endYear: any,reportsLocatinIds: any,
    reportsDepartmentIds: any) => {
  try {
    const response = await axiosInstance.get(
      `${API.get_performace_deficit_impact}`,
      {
        params: {
          org_id: 2,
          start_year: startYear,
          end_year: endYear,
          department_id: reportsDepartmentIds ? reportsDepartmentIds : "",
        location_id:
          reportsLocatinIds && reportsLocatinIds.length > 0
            ? JSON.stringify(reportsLocatinIds)
            : "",
        },
      }
    );

    return {
      status: response.status,
      data: response.data, // ✅ Ensure returning actual response data
    };
  } catch (error: any) {
    return error?.response || { error: "Unknown error" };
  }
};

export const getAbsenteeismCost = async (startYear: any, endYear: any,reportsLocatinIds: any,
    reportsDepartmentIds: any) => {
  try {
    const response = await axiosInstance.get(`${API.get_absenteeism_cost}`, {
      params: {
        org_id: 2,
        start_year: startYear,
        end_year: endYear,
        department_id: reportsDepartmentIds ? reportsDepartmentIds : "",
        location_id:
          reportsLocatinIds && reportsLocatinIds.length > 0
            ? JSON.stringify(reportsLocatinIds)
            : "",
      },
    });

    return {
      status: response.status,
      data: response.data, // ✅ Ensure returning actual response data
    };
  } catch (error: any) {
    return error?.response || { error: "Unknown error" };
  }
};
