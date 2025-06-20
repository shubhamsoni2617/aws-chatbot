import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "react-router-dom";

import { GetLocation } from "./GetLocationHelper";
import { transfromLocationsFilterData } from "@/utils/transfromData/transformFilters";
import DefaultLayout from "@/components/DefaultLayout";
import FilterContainer from "@/components/FilterContainer";
import CompanyPerformanceGraphsSection from "@/components/CompanyPerformanceGraphsSection";
import { countries } from "@/utils/countries";
import {
  transformData,
  transformDataTempFYRR,
  transformRevenuePerEmployee,
} from "./transformHelper";
import ResetPassswordModal from "../Settings/Account/ChangePasswordModal";
import { getLocalData } from "@/utils/localStorage";
import ChangePasswordNewUser from "../ChangePasswordNewUser";


const CompanyPerformance = () => {
  const [filtersParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const {
    locations,
    periodSelected,
    selectedDepartment,
    selectedLocationAddress,
    selectedLocationCountry,
    selectedLocationState,
  } = useAppSelector((store) => store.userData);

  const {temp_password} = useAppSelector(store => store.auth)

  const [markers, setMarkers] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [mapGeoData, setMapGeoData] = useState<any>(null);
  const [period, setPeriod] = useState(
    filtersParams.get("filterByPeriod") || 2023
  );

  const [country, setCountry] = useState();
  const [highlightState, setHighlightState] = useState(
    searchParams.get("filterByState")
  );
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

    const onChangePasswordModalClose = () => {
      setIsChangePasswordModalOpen(false);
    };

  const storedData = getLocalData("temp_password");
  const tempPassword = storedData?.temp_password;

  console.log(country, period);

  useEffect(() => {
    console.log("temp passowrd",tempPassword);
    if(tempPassword){
      setIsChangePasswordModalOpen(true);
    }
  },[temp_password])

  useEffect(() => {
    setHighlightState(selectedLocationState);
  }, [selectedLocationState]);

  const filterData = {
    filterByPeriod: periodSelected,
    filterByCountry: selectedLocationCountry,
    filterByState: selectedLocationState,
    filterByDepartment: selectedDepartment,
    filterByKpi: filtersParams.get("filterByKpi"),
  };

  const {
    revenuePerEmployee,
    retentionRate,
    firstYearRetentionRate,
    internalMobilityRate,
    turnoverRate,
    absenteesimRate,
  } = useAppSelector((store) => store.companyPerformanceData);

  useEffect(() => {
    if (!searchParams.get("filterByPeriod")) {
      dispatch({ type: "userData/setPeriod", payload: 2023 });
    }
  }, [searchParams, dispatch]);

  const transformedRevenuePerEmployee = useMemo(
    () => transformRevenuePerEmployee(revenuePerEmployee, periodSelected),
    [revenuePerEmployee, periodSelected]
  );

  const transformedRetentionRate = useMemo(
    () => transformData(retentionRate, periodSelected, true, "retention_rate"),
    [retentionRate, periodSelected]
  );

  const transformedFirstYearRetentionRate = useMemo(
    () =>
      transformDataTempFYRR(
        firstYearRetentionRate,
        periodSelected,
        true,
        "retention_rate" // TODO this key needs to be changed when the historic data key change. For now the data is not visilbe due to difference in key for historic and predicted data
      ),
    [firstYearRetentionRate, periodSelected]
  );

  const transformedInternalMobilityRate = useMemo(
    () =>
      transformData(
        internalMobilityRate,
        periodSelected,
        true,
        "internal_mobility_rate"
      ),
    [internalMobilityRate, periodSelected]
  );

  const transformedTurnoverRate = useMemo(
    () => transformData(turnoverRate, periodSelected, true, "turnover_rate"),
    [turnoverRate, periodSelected]
  );

  const transformedAbsenteeismRate = useMemo(
    () =>
      transformData(absenteesimRate, periodSelected, true, "absenteeism_rate"),
    [absenteesimRate, periodSelected]
  );

  const transfromedLocationsFilterData = useMemo(() => {
    return Array.isArray(locations)
      ? transfromLocationsFilterData(
          locations,
          selectedLocationCountry,
          selectedLocationState,
          selectedLocationAddress
        )
      : { companyAverage: "0%", predictedValue: "0%", data: [] };
  }, [
    locations,
    selectedLocationCountry,
    selectedLocationState,
    selectedLocationAddress,
  ]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsFetching(true);
        const locations = await GetLocation(
          transfromedLocationsFilterData,
          filterData.filterByCountry,
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
    // console.log("transform filter data",transfromedLocationsFilterData);
  }, [transfromedLocationsFilterData, filterData.filterByCountry]);

  useEffect(() => {
    const fetchMapGeoData = async () => {
      const country = countries.find(
        (country: any) => country.name === filterData.filterByCountry
      );
      if (country) {
        setMapGeoData(country.mapData || null);
      } else if (filterData.filterByCountry) {
        const parts = filterData.filterByCountry.split("-");
        const countryNew =
          parts.length > 1
            ? parts[parts.length - 1].replace(/\+/g, " ").trim()
            : parts[0];
        setHighlightState(parts.length > 1 ? parts[parts.length - 2] : null);
        const mapData = countries.find(
          (country: any) => country.name === countryNew
        )?.mapData;
        setMapGeoData(mapData || null);
      }
    };

    fetchMapGeoData();
  }, [filterData.filterByCountry]);

  const dataForFilterParameters = (data: any) => {
    if (data?.filterByPeriod) setPeriod(data.filterByPeriod);
    if (data?.filterByCountry) setCountry(data.filterByCountry);
  };

  const mapDataReload = (props: any) => {
    console.log("Start year end year", props.start_year, props.end_year);
  };

  return (
    <>
    {tempPassword? (
      <ChangePasswordNewUser/>
    ) : (
      <DefaultLayout
      FilterComponent={
        <FilterContainer
          heading="Company Performance"
          to="/"
          dataForFilterParameters={dataForFilterParameters}
          mapDataReload={mapDataReload}
        />
      }
      heading="Company Performance"
    >
      <div className="">
        <CompanyPerformanceGraphsSection
          isFetching={isFetching}
          mapData={markers}
          filterData={filterData}
          revenuePerEmployee={transformedRevenuePerEmployee}
          retentionRate={transformedRetentionRate}
          firstYearRetentionRate={transformedFirstYearRetentionRate}
          internalMobilityRate={transformedInternalMobilityRate}
          turnoverRate={transformedTurnoverRate}
          absenteeismRate={transformedAbsenteeismRate}
          mapGeoData={mapGeoData}
          startDate={2024}
          endDate={2025}
          highlightState={highlightState}
        />
        {/* <hr className="mt-[50px]" /> */}
      </div>
      <ResetPassswordModal
        isModalOpen={isChangePasswordModalOpen}
        onClose={onChangePasswordModalClose}
      />
    </DefaultLayout>
    )}
    
    </>
  );
};

export default CompanyPerformance;
