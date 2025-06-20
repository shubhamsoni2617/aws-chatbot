// import HighChartsOrganizationChats from "../HighChartsOrganizationChart";
import { useAppSelector } from "@/store/hooks";
import { useSearchParams } from "react-router-dom";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import WorldMapCard from "./components/WorldMapCard";
import RevenuePerEmployeeCard from "./components/RevenuePerEmployeeCard";
import RetentionRateCard from "./components/RetentionRateCard";
import FirstYearRetentionRateCard from "./components/FirstYearRetentionRateCard";
import InternalMobilityRateCard from "./components/InternalMobilityRateCard";
import TurnoverRateCard from "./components/TurnoverRateCard";
import AbsernteeismRateCard from "./components/AbsenteeismRateCard";

const CompanyPerformanceGraphsSection = (props: any) => {
  const {
    // mapData,
    compareModalDateReciever,
    // filterData,
    // mapGeoData,
    retentionRate,
    revenuePerEmployee,
    /* highlightState - preserved for future map state highlighting functionality */
    firstYearRetentionRate,
    internalMobilityRate,
    turnoverRate,
    absenteeismRate,
    isFetching,
  } = props;

  const { profileLoading } = useAppSelector((store) => store.profile);
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setInnerFilterHighlightedState] = useState();
  const [innerFilterLoading, setInnerFilterLoading] = useState(false);
  const [localFilterByCountry, setLocalFilterByCountry] = useState(
    searchParams.get("filterByCountry")
  );
  const searchParameters = new URLSearchParams(window.location.search);

  const hasFilterParams =
    searchParameters.has("filterByCountry") ||
    searchParameters.has("filterByState") ||
    searchParameters.has("filterByAddress");
  const {
    // isLoadingLocationMatrics,
    periodSelected,
    // showGlobe,
    // innerFilterMarkers,
    // innerFilterLocationCountry,
    // innerFilterLocationAddress,
    // innerFilterDepartment,
    // innerFilterLocationState,
  } = useAppSelector((store) => store.userData);

  const {
    isLoadingTurnoverRate,
    // isLoadingAbsenteesimRate,
    isLoadingFirstYearRetentionRate,
    isLoadingInternalMobilityRate,
    isLoadingRetentionRate,
    isLoadingRevenuePerEmployee,
  } = useAppSelector((store) => store.companyPerformanceData);

  const currentYear = new Date().getFullYear();

  const createUrlParams = (paramsObj: any) => {
    const searchParams = new URLSearchParams();
    Object.keys(paramsObj).forEach((key) => {
      if (paramsObj[key]) {
        searchParams.append(key, paramsObj[key]);
      }
    });
    return searchParams.toString();
  };

  let userRole = "Country Head";
  userRole = "CEO";

  const fadeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  useEffect(() => {
    if (userRole === "Country Head" && !localFilterByCountry) {
      // setGeoChartLoading(prev=>prev+1);
      const newParams = createUrlParams({ filterByCountry: "India" });
      setSearchParams(newParams);
      setLocalFilterByCountry("India");
      // setTimeout(() => setGeoChartLoading(false), 1000); // Simulate loading time
    }
  }, [userRole, localFilterByCountry, setSearchParams]);

  return profileLoading ? (
    <div className="flex justify-center items-center w-full h-[calc(80vh-100px)] bg-background">
      <Spin size="large" tip="Loading..." />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
      <WorldMapCard
        userRole={userRole}
        hasFilterParams={hasFilterParams}
        isFetching={isFetching}
        innerFilterLoading={innerFilterLoading}
        setInnerFilterHighlightedState={setInnerFilterHighlightedState}
        setInnerFilterLoading={setInnerFilterLoading}
        fadeVariants={fadeVariants}
        compareModalDateReciever={compareModalDateReciever}
      />

      <RevenuePerEmployeeCard
        isLoadingRevenuePerEmployee={isLoadingRevenuePerEmployee}
        revenuePerEmployee={revenuePerEmployee}
        periodSelected={periodSelected}
        currentYear={currentYear}
        compareModalDateReciever={compareModalDateReciever}
      />

      <RetentionRateCard
        isLoadingRetentionRate={isLoadingRetentionRate}
        retentionRate={retentionRate}
        periodSelected={periodSelected}
        currentYear={currentYear}
        compareModalDateReciever={compareModalDateReciever}
      />

      <FirstYearRetentionRateCard
        isLoadingFirstYearRetentionRate={isLoadingFirstYearRetentionRate}
        firstYearRetentionRate={firstYearRetentionRate}
        periodSelected={periodSelected}
        currentYear={currentYear}
        compareModalDateReciever={compareModalDateReciever}
      />


      <InternalMobilityRateCard
        isLoadingInternalMobilityRate={isLoadingInternalMobilityRate}
        internalMobilityRate={internalMobilityRate}
        periodSelected={periodSelected}
        currentYear={currentYear}
        compareModalDateReciever={compareModalDateReciever}
      />

      <TurnoverRateCard
        isLoadingTurnoverRate={isLoadingTurnoverRate}
        turnoverRate={turnoverRate}
        periodSelected={periodSelected}
        currentYear={currentYear}
        compareModalDateReciever={compareModalDateReciever}
      />

      <AbsernteeismRateCard
      absenteeismRate={absenteeismRate}
      compareModalDateReciever={compareModalDateReciever}
      />
    </div>
  );
};

export default CompanyPerformanceGraphsSection;
