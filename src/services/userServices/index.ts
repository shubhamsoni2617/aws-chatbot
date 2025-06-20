import axiosInstance from "@/utils/axiosInstance"
import API from "../api"



const getDepartments = async(data: any) => {
    return await axiosInstance
    .get(`${API.get_departments}`, data)
    .then(res => {
        return{
            status: res.status,
            data: res.data,
        }
    })
    .catch(e => {return e?.response});
}

const getLocations = async(data: any) => {
    return await axiosInstance
    .get(`${API.get_locations}`, data)
    .then(res => {
        return{
            status : res.status,
            data: res.data,
        }
    })
    .catch(e => {return e?.response});
}


const getOrganizationChartData = async (data: any) => {
    return await axiosInstance
        .get(`${API.get_organization_chart_data}`, data && {
            params: {
                department_id: data.department_id,
            }
        })
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

const getLocationMatrics = async () => {
    return await axiosInstance
        .get(`${API.get_location_matrics}`)
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

const getOrganizationUsers = async (data:any) => {
    return await axiosInstance
        .get(`${API.get_users}`, data && {
            params:{
                organization_id:data?.organization_id
            }
        })
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

const addUser = async (data: any) => {
    return await axiosInstance
      .post(`${API.add_user}`, data)
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

  const deleteUser = async (data: any) => {
  return await axiosInstance
    .post(`${API.delete_user}`, {
      org_id: data?.org_id,
      user_id: data?.user_id,
    })
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

const userServices = {
    
    getDepartments,
    getLocations,       
    getOrganizationChartData,
    getLocationMatrics, 
    getOrganizationUsers,
    addUser,
    deleteUser
};

export default userServices;