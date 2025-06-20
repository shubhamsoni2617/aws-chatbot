import axiosInstance from "@/utils/axiosInstance";
import API from "../api";

const saveReportData = async (data: any) => {
    return await axiosInstance
        .post(`${API.save_report_data}`, data)
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

const getReportsData = async () => {
    return await axiosInstance
        .get(`${API.get_reports_data}`)
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

const getReportRecommendatation = async (data:any) => {
    return await axiosInstance
    .get(`${API.get_report_recommendatation}`, data && {
        params: {
            org_id: data.org_id,
            department_id: data.department_id,
            start_year: data.start_year,
            end_year:data.end_year,
        }
    })
}

const startReport = async(data:any) => {
    return await axiosInstance
    .post(`${API.star_report}`, data)
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

const deleteReport = async(data:any) => {
    return await axiosInstance
    .delete(`${API.delete_report}`, data && {
        params: {
            report_ids: data.report_ids,
        }
    })
        
}

const addReportComment = async(data:any) => {
    return await axiosInstance
    .post(`${API.add_report_comment}`, data)
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

const getReportComment = async (data:any) => {
    return await axiosInstance
    .get(`${API.get_report_comment}`, data && {
        params: {
            report_id: data.report_id,
        }
    })
}


const postKeyReportComment = async(data:any) => {
    return await axiosInstance
    .post(`${API.post_key_report_comment}`, data)
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

const getKeyReportsComment = async (data:any) => {
    return await axiosInstance
    .get(`${API.get_key_report_comment}`, data && {
        params: {
            org_id: data.org_id,
        }
    })
}

const postOverviewKeyReportComment = async(data:any) => {
    return await axiosInstance
    .post(`${API.post_overview_key_report_comment}`, data)
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

const getOverViewKeyReportsComment = async (data:any) => {
    return await axiosInstance
    .get(`${API.get_overview_key_report_comment}`, data && {
        params: {
            org_id: data.org_id,
            kpi:data.kpi,
        }
    })
}

const updateEngagementNote = async(data:any) => {
    return await axiosInstance
    .post(`${API.update_engagement_notes}`, data)
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

const shareReport = async(data:any) => {
    return await axiosInstance
    .post(`${API.share_report}`, data)
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




const reportsServices = {  
    saveReportData,
    getReportsData,
    getReportRecommendatation,
    startReport,
    deleteReport,
    addReportComment,
    getReportComment,
    postKeyReportComment,
    getKeyReportsComment,
    postOverviewKeyReportComment,
    getOverViewKeyReportsComment,
    updateEngagementNote,
    shareReport

};

export default reportsServices;