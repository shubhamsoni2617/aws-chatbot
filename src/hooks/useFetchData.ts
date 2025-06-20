import { useEffect, /* useState - preserved for future local state management */ } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getAbsenteeismCost,
  getAbsenteeismRate,
  getDepartments,
  getFirstYearRetentionRate,
  getInternalMobilityRate,
  getKeyReportComment,
  getLocationMatrics,
  getLocations,
  getMonitorAssignedTasks,
  // getOrganizationChartData,
  getPerformaceDeficitImpact,
  getProfileData,
  getReportRecommendation,
  getReportsData,
  getRetentionRate,
  getRevenuePerEmployee,
  getTurnOverCost,
  getTurnoverRate,
  getUsers
} from "../store/actions";
// import {
//   DepartemtIdHelper,
//   LocationIdHelper,
// } from "../utils/helper/LocationDepartmentIdHelper";

export const useFetchData = () => {
  const today = new Date();
  const formattedDateInYYYYMMDD = today.toISOString().split("T")[0];
  const dispatch = useAppDispatch();
  const { periodSelected,selectedLocationIds, selectedDepartmentIds} = useAppSelector(
    (store) => store.userData
  );
  const {orgIDRedux} = useAppSelector((store) => store.profile);
  // const params = new URLSearchParams(window.location.search);
  // const country = params.get("filterByCountry");
  // const state = params.get("filterByState");
  // const address = params.get("filterByAddress");
  // const departmentName = params.get("filterByDepartment");

  // const [department_id, setDepartmentIds] = useState();
  // const [locationIds, setLocationIds] = useState<string[]>([]);

  // useEffect(() => {
  //   setDepartmentIds(DepartemtIdHelper(departments, departmentName));
  //   setLocationIds(LocationIdHelper(locations, country, state, address));
  // },[locations, departments])
  // Fetch initial data
  
  useEffect(() => {
    dispatch(getProfileData({}));
    dispatch(getLocations({}));
    dispatch(getDepartments({}));
    dispatch(getLocationMatrics());
    dispatch(getReportsData());
  
    
  }, [dispatch]);

  useEffect(() => {
    dispatch(getKeyReportComment({org_id: orgIDRedux}));
    dispatch(getUsers({organization_id:orgIDRedux}));
    dispatch(getMonitorAssignedTasks({org_id: orgIDRedux}));
  },[orgIDRedux, dispatch])

  // Dispatch actions dependent on departments and department_id
  useEffect(() => {
    console.log("selectedDepartments",selectedDepartmentIds)
  //   if (!departments || !locations ) return;

    // const department_id = DepartemtIdHelper(departments, departmentName);
    // const locationIds = LocationIdHelper(locations, country, state, address);
    dispatch(getReportRecommendation({
        org_id: 2,
        start_year: periodSelected ? periodSelected : "2023",
        end_year: "2025",
        department_id: selectedDepartmentIds ? String(selectedDepartmentIds) : "",
        // location_id: locationIds && locationIds.length > 0 ? JSON.stringify(locationIds) : "",
    }))


    dispatch(
      getRetentionRate({
        org_id: 2,
        start_year: periodSelected ? periodSelected : "2023",
        end_year: "2025",
        department_id: selectedDepartmentIds ? String(selectedDepartmentIds) : "",
        location_id: selectedLocationIds && selectedLocationIds.length > 0 ? JSON.stringify(selectedLocationIds) : "",
      })
      // location_id: selectedLocationIds && selectedLocationIds.length > 0 ? JSON.stringify(selectedLocationIds) : "",
    );
    dispatch(
      getTurnoverRate({
        org_id: "2",
        start_date: `${periodSelected ? periodSelected : "2023"}-01-01`,
        end_date: formattedDateInYYYYMMDD,
        department_id: selectedDepartmentIds ? String(selectedDepartmentIds) : "",
        location_id: selectedLocationIds && selectedLocationIds.length > 0 ? JSON.stringify(selectedLocationIds) : "",
      })
    );
    dispatch(getRevenuePerEmployee({ org_id: "2" }));
    dispatch(
      getInternalMobilityRate({
        start_date: `${periodSelected ? periodSelected : "2024"}-01-01`,
        end_date: formattedDateInYYYYMMDD,
        department_id: selectedDepartmentIds ? String(selectedDepartmentIds) : "",
        location_id: selectedLocationIds && selectedLocationIds.length > 0 ? JSON.stringify(selectedLocationIds) : "",
      })
    );
    dispatch(
      getAbsenteeismRate({
        org_id: "2",
        start_year: periodSelected ? periodSelected : "2023",
        end_year: "2025",
        // department_id: selectedDepartmentIds ? String(selectedDepartmentIds) : "",
        location_id: selectedLocationIds && selectedLocationIds.length > 0 ? JSON.stringify(selectedLocationIds) : "",
      })
    );
    dispatch(
      getFirstYearRetentionRate({
        org_id: "2",
        start_year: periodSelected ? periodSelected : "2023",
        end_year: "2025",
        department_id: selectedDepartmentIds ? String(selectedDepartmentIds) : "",
        location_id: selectedLocationIds && selectedLocationIds.length > 0 ? JSON.stringify(selectedLocationIds) : "",
      })
    );
    dispatch(
      getAbsenteeismCost({
        org_id: "2",
        start_year: periodSelected ? periodSelected : "2023",
        end_year: "2025",
        // location_id: "",
        // department_id: selectedDepartmentIds ? String(selectedDepartmentIds) : "",
        location_id: selectedLocationIds && selectedLocationIds.length > 0 ? JSON.stringify(selectedLocationIds) : "",
      })
    );
    dispatch(
      getTurnOverCost({
        org_id: "2",
        department_id: selectedDepartmentIds ? String(selectedDepartmentIds) : "",
        start_year: "2023",
        // location_id: "2",
        location_id: selectedLocationIds && selectedLocationIds.length > 0 ? JSON.stringify(selectedLocationIds) : "",
        end_year: "2025",
      })
    );
    dispatch(
      getPerformaceDeficitImpact({
        org_id: "2",
        start_year: periodSelected ? periodSelected : "2023",
        end_year: "2025",
        location_id: selectedLocationIds && selectedLocationIds.length > 0 ? JSON.stringify(selectedLocationIds) : "",
        department_id: selectedDepartmentIds ? String(selectedDepartmentIds) : "",
      })
    );
  }, [dispatch, periodSelected,selectedLocationIds,selectedDepartmentIds]);

  
};