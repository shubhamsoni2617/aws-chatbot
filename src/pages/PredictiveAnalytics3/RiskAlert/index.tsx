import { useEffect, useMemo, useState } from "react";
import { Spin } from "antd";
import { getRetentionRate } from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { countries } from "@/utils/countries";
import { useNavigate, useSearchParams } from "react-router-dom";
// import countriesLocation from "../../utils/countriesLocation.json";
import { IoIosArrowRoundBack } from "react-icons/io";
import RiskAlertGraphSection from "./RiskAlertGraphSection";
import { GetLocation } from "../../CompanyPerformance/GetLocationHelper";
import { transfromLocationsFilterData } from "@/utils/transfromData/transformFilters";
import DefaultLayout from "@/components/DefaultLayout";
import FilterContainer from "@/components/FilterContainer";
import {
  convertToHighchartsSeries,
  convertToHighchartsSeriesForRevenuePerEmployee,
  transformDataforPredictiveAnalytics,
  transformRevenuePerEmployee,
} from "../helper";
import { RiskAlertGraphSectionData } from "./RiskAlertGraphSection/helperForRiskAlertData";

interface DateData {
  selectedPeriod: string;
  startDate: string;
  endDate: string;
}

const RiskAlert = () => {
  const [filtersParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [riskAlertPoints, setRiskAlertPoints] = useState<any>([]);
  const filterByCountry = searchParams.get("filterByCountry");
  const { riskAlertLocationPoints } = useAppSelector(
    (store) => store.predictiveAnalytics
  );
  const {
    periodSelected,
    // internalMobilityRate,
    locations,
    selectedDepartmentIds,
    // selectedLocationIds
  } = useAppSelector((store) => store.userData);

  const [markers, setMarkers] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false); // Added state to track fetching status
  const [startDate, setStartDate] = useState(new Date().getFullYear() - 2);
  const [endDate, setEndDate] = useState(new Date().getFullYear() - 1);

  const filterData = {
    filterByPeriod: filtersParams.get("filterByPeriod"),
    filterByCountry: filtersParams.get("filterByCountry"),
    filterByDepartment: filtersParams.get("filterByDepartment"),
    filterByKpi: filtersParams.get("filterByKpi"),
  };

  useEffect(() => {

     const settingriskAlertData = async () => {
      const riskAlertData = await RiskAlertGraphSectionData(
      riskAlertLocationPoints,
      locations,
      periodSelected,
      selectedDepartmentIds
    )
    setRiskAlertPoints(riskAlertData)
     }

     settingriskAlertData();
    // console.log("Risk Alert Points", riskAlertPoints);
  }, [
    riskAlertLocationPoints,
    locations,
    selectedDepartmentIds,
    periodSelected,
  ]);

  const { turnoverRate, absenteesimRate, revenuePerEmployee } = useAppSelector(
    (store) => store.companyPerformanceData
  );
  console.log("apiData check for error in page of predictive analytics new form chedck gasdgsadgs",riskAlertPoints)
  // const { profileLoading } = useAppSelector((store) => store.profile);

  useEffect(() => {
    if (!searchParams.get("filterByPeriod")) {
      dispatch({ type: "userData/setPeriod", payload: 2023 });
    }
  }, []);

  // const transformedRetentionRate = useMemo(
  //   () => ( transformRetentionData(retentionRate, filterData?.filterByPeriod, true)),
  //   [retentionRate]
  // );

  const transformedTurnoverRate = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        riskAlertPoints?.turnoverRateRAData,
        periodSelected,
        "turnover_rate"
      ),
    [turnoverRate]
  );

  const transformedAbsenteeismRate = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        riskAlertPoints?.absenteeismRateRAData,
        periodSelected,
        "absenteeism_rate"
      ),
    [absenteesimRate]
  );

  const transformedRevenuePerEmployee = useMemo(
    () =>
      transformRevenuePerEmployee(
        revenuePerEmployee,
        periodSelected ? Number(periodSelected) : 0
      ),
    [revenuePerEmployee, periodSelected]
  );

  // const transformedInternalMobilityRate = useMemo(
  //   () => ( transfromInternalMobilityRate(internalMobilityRate, filterData?.filterByPeriod, true)),
  //   [internalMobilityRate]
  // );

  const transfromedLocationsFilterData = useMemo(
    () =>
      transfromLocationsFilterData(
        locations,
        searchParams.get("filterByCountry"),
        searchParams.get("filterByState"),
        searchParams.get("filterByAddress")
      ),
    [locations, filterByCountry]
  );

  // const GetLocation = async (transformedLocation: any) => {
  //   if (!transformedLocation.data) {
  //     console.log("No location data available.");
  //     return;
  //   }

  //   const newMarkers: any[] = [];

  //   if(filterByCountry!==null){
  //   for (const element of transformedLocation.data) {
  //     if(element.key !== 'All'){
  //     let location = element.key;
  //     if(filterByCountry!==null && filterByCountry!==""){
  //       location = location+" "+filterByCountry;
  //     }
  //     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location},+CA&key=AIzaSyA3PyHPTNxzbDgu9mwPkF7smCSd9p-EL6U`;

  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       if (data?.results[0]?.geometry?.location !== null) {
  //         const loca = data?.results[0]?.geometry?.location;
  //         const lat = loca.lat;
  //       const lon = loca.lng;
  //       newMarkers.push({ name: element.key, lat, lon });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching location for", location, ":", error);
  //     }}
  //   }}
  //   else{
  //     transformedLocation.data.forEach((item:any ) => {
  //       const arr = countriesLocation.find(country => country.tooltipName === item.key);
  //       if(arr)
  //         newMarkers.push(arr);
  //     })
  //   }
  //   setMarkers(newMarkers);
  // };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // setIsFetching(true);  // Start fetching
        const locations = await GetLocation(
          transfromedLocationsFilterData,
          filterByCountry,
          filterData
        );
        setMarkers(locations || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsFetching(false);
      }
    };

    if (transfromedLocationsFilterData.data.length > 0) {
      fetchLocation();
    }
  }, [transfromedLocationsFilterData]);

  useEffect(() => {
    dispatch(
      getRetentionRate({
        org_id: "2",
        start_year: startDate,
        end_year: endDate,
      })
    );
  }, [startDate, endDate]);

  const compareModalDateReciever = ({
    selectedPeriod,
    startDate,
    endDate,
  }: DateData) => {
    if (startDate !== null) setStartDate(Number(startDate));
    if (endDate !== null) setEndDate(Number(endDate));
    console.log("Data in Company Performance screen", selectedPeriod);
  };

  const mapGeoData = useMemo(() => {
    const country = countries.find(
      (country: any) => country.name === filterData?.filterByCountry
    );
    return country?.mapData || null;
  }, [filterData?.filterByCountry]);

  const navigate = useNavigate();
  const backButtonNavigate = () => {
    navigate("/predictive-analytics-3");
  };

  return (
    <DefaultLayout
      FilterComponent={
        <FilterContainer
          // filterReciver={filterReciver}
          to="/predictive-analytics/RiskAlert"
          heading="Risk Alert"
          mapDataReload={() => {}}
        />
      }
      noUserName
      heading="Risk Alert"
    >
      {isFetching ? (
        <div className="flex justify-center items-center w-full h-[calc(80vh-100px)] bg-background">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div>
          <div
            style={{
              fontWeight: 500,
              fontSize: "14px",
              marginBottom: "19.5px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={backButtonNavigate}
          >
            <IoIosArrowRoundBack size={30} />
            Back to Predictive Analytics
          </div>
          <RiskAlertGraphSection
            mapData={markers}
            compareModalDateReciever={compareModalDateReciever}
            filterData={filterData}
            revenuePerEmployee={convertToHighchartsSeriesForRevenuePerEmployee(
              transformedRevenuePerEmployee
            )}
            // retentionRate={transformedRetentionRate}
            // firstYearRetentionRate={transformedRetentionRate}
            mapGeoData={mapGeoData}
            // internalMobilityRate={transformedInternalMobilityRate}
            turnoverRate={transformedTurnoverRate}
            absenteeismRate={convertToHighchartsSeries(
              transformedAbsenteeismRate
            )}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      )}
    </DefaultLayout>
  );
};

export default RiskAlert;
