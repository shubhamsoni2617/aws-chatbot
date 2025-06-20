
import { useEffect, useMemo, useState } from "react";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { countries } from "@/utils/countries";
import { useSearchParams } from "react-router-dom";


import { GetLocation } from "@/pages/CompanyPerformance/GetLocationHelper";
import RiskManagement from "../RiskManagement";
import PredictiveAnalyticsCompanyPerformanceGraphSection from "@/components/PredictiveAnalyticsCompanyPerformanceGraphSection";
import FilterContainer from "@/components/FilterContainer";
import DefaultLayout from "@/components/DefaultLayout";
import { transformDataforPredictiveAnalytics, transformRevenuePerEmployee } from "../transformHelper";
import { transfromLocationsFilterData } from "@/utils/transfromData/transformFilters";
// import RiskManagement from "../RiskManagement";

interface DateData {
  selectedPeriod: string;
  startDate: string;
  endDate: string;
}

const CompanyPerformancePredictiveAnalytics = () => {
  const [filtersParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filterByCountry = searchParams.get("filterByCountry");
  const period = searchParams.get("filterByPeriod");

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

  // const { loading } = useAppSelector((store) => store.companyPerformance);
  const { profileLoading } = useAppSelector((store) => store.profile);
  const {
    locations,
    periodSelected
  } = useAppSelector((store) => store.userData);

  const {
    retentionRate,
    firstYearRetentionRate,
    turnoverRate,
    absenteesimRate,
    revenuePerEmployee,
    internalMobilityRate,
  } = useAppSelector((store) => store.companyPerformanceData);

  useEffect(() => {
      if (!searchParams.get("filterByPeriod")) {
        dispatch({ type: "userData/setPeriod", payload: 2023 });
      }
    }, []);

  const transformedRetentionRate = useMemo(
    () => transformDataforPredictiveAnalytics(retentionRate,periodSelected,'retention_rate'),
    [retentionRate]
  );

  const transformedFirstYearRetentionRate = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        firstYearRetentionRate,periodSelected,'retention_rate'
      ),
    [firstYearRetentionRate]
  );

  const transformedTurnoverRate = useMemo(
    () => transformDataforPredictiveAnalytics(turnoverRate,periodSelected,'turnover_rate'),
    [turnoverRate]
  );

  const transformedAbsenteeismRate = useMemo(
    () => transformDataforPredictiveAnalytics(absenteesimRate,periodSelected,'absenteeism_rate'),
    [absenteesimRate]
  );

  const transformedRevenuePerEmployee = useMemo(
    () =>
      transformRevenuePerEmployee(
        revenuePerEmployee,
        period ? Number(period) : 0
      ),
    [revenuePerEmployee, period]
  );

  const transformedInternalMobilityRate = useMemo(
    () => transformDataforPredictiveAnalytics(internalMobilityRate, periodSelected, 'retention_rate'),
    [internalMobilityRate, periodSelected]
  );

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

  //   if (filterByCountry !== null) {
  //     for (const element of transformedLocation.data) {
  //       if (element.key !== "All") {
  //         let location = element.key;
  //         if (filterByCountry !== null && filterByCountry !== "") {
  //           location = location + " " + filterByCountry;
  //         }
  //         const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location},+CA&key=AIzaSyA3PyHPTNxzbDgu9mwPkF7smCSd9p-EL6U`;

  //         try {
  //           const response = await fetch(url);
  //           const data = await response.json();
  //           if (data?.results[0]?.geometry?.location !== null) {
  //             const loca = data?.results[0]?.geometry?.location;
  //             const lat = loca.lat;
  //             const lon = loca.lng;
  //             newMarkers.push({ name: element.key, lat, lon });
  //           }
  //         } catch (error) {
  //           console.error("Error fetching location for", location, ":", error);
  //         }
  //       }
  //     }
  //   } else {
  //     transformedLocation.data.forEach((item: any) => {
  //       const arr = countriesLocation.find(
  //         (country) => country.tooltipName === item.key
  //       );
  //       if (arr) newMarkers.push(arr);
  //     });
  //   }
  //   setMarkers(newMarkers);
  // };

  useEffect(() => {
    const fetchLocation = async () => {
      try{

        setIsFetching(true);  // Start fetching
        const locations = await GetLocation(transfromedLocationsFilterData,filterByCountry,filterData);
        setMarkers(locations || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }finally{
        setIsFetching(false);
      }
    };


    if (transfromedLocationsFilterData.data.length > 0) {
      fetchLocation();
    }
  }, [transfromedLocationsFilterData]);


  const compareModalDateReciever = ({
    selectedPeriod,
    startDate,
    endDate,
  }: DateData) => {
    if (startDate !== null) setStartDate(Number(startDate));
    if (endDate !== null) setEndDate(Number(endDate));
    console.log("Data in Company Performance screen", selectedPeriod);
  };

  // const { firstYearRetentionRate }: any = companyPerformance || {};
  const mapGeoData = useMemo(() => {
    const country = countries.find(
      (country: any) => country.name === filterData?.filterByCountry
    );
    return country?.mapData || null;
  }, [filterData?.filterByCountry]);

  return (
    <DefaultLayout
      FilterComponent={<FilterContainer heading="Predictive Analytics" to="/" mapDataReload={()=>{}}/>}
      heading="Predictive Analytics"
    >
      { profileLoading || isFetching ? (
        <div className="absolute inset-0 z-10 flex justify-center items-center bg-white bg-opacity-70">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div>
          <RiskManagement />
          <PredictiveAnalyticsCompanyPerformanceGraphSection
            mapData={markers}
            compareModalDateReciever={compareModalDateReciever}
            filterData={filterData}
            revenuePerEmployee={transformedRevenuePerEmployee}
            retentionRate={transformedRetentionRate}
            firstYearRetentionRate={transformedFirstYearRetentionRate}
            mapGeoData={mapGeoData}
            internalMobilityRate={transformedInternalMobilityRate}
            turnoverRate={transformedTurnoverRate}
            absenteeismRate={transformedAbsenteeismRate}
            startDate={startDate}
            endDate={endDate}
          />
          
          <hr style={{ marginTop: "25px" }} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default CompanyPerformancePredictiveAnalytics;
