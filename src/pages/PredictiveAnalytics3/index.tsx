import DefaultLayout from "@/components/DefaultLayout";
import FilterContainer from "@/components/FilterContainer";
import PredictiveAnalyticsGraphSection from "@/components/PredictiveAnalyticsGraphSection";
import RiskAssesmentCard from "./RiskAssesmentCard";
import { useEffect, useMemo } from "react";
// import { countries } from "@/utils/countries";
// import { GetLocation } from "../CompanyPerformance/GetLocationHelper";
// import { transfromLocationsFilterData } from "@/utils/transfromData/transformFilters";
import {
  convertToHighchartsSeries,
  convertToHighchartsSeriesForPDI,
  convertToHighchartsSeriesForRevenuePerEmployee,
  transformDataforPredictiveAnalytics,
  transformDataforPredictiveAnalyticsTempFYRR,
  transformRevenuePerEmployee,
} from "./helper";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { transformYearlyData } from "../FinacialImpact/transformHelper";

const PredictiveAnalyticsNew = () => {
  // const [filtersParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  // const filterByCountry = searchParams.get("filterByCountry");
  const period = searchParams.get("filterByPeriod");

  // const [markers, setMarkers] = useState<any[]>([]);
  // const [isFetching, setIsFetching] = useState(false); // Added state to track fetching status
  // const [startDate, setStartDate] = useState(new Date().getFullYear() - 2);
  // const [endDate, setEndDate] = useState(new Date().getFullYear() - 1);

  // const filterData = {
  //   filterByPeriod: filtersParams.get("filterByPeriod"),
  //   filterByCountry: filtersParams.get("filterByCountry"),
  //   filterByDepartment: filtersParams.get("filterByDepartment"),
  //   filterByKpi: filtersParams.get("filterByKpi"),
  // };

  // const { loading } = useAppSelector((store) => store.companyPerformance);
  // const { profileLoading } = useAppSelector((store) => store.profile);
  const { periodSelected } = useAppSelector((store) => store.userData);

  const {
    retentionRate,
    firstYearRetentionRate,
    turnoverRate,
    absenteesimRate,
    revenuePerEmployee,
    internalMobilityRate,
  } = useAppSelector((store) => store.companyPerformanceData);

  const {
    absenteesimCostData,
    performanceDefecitImpactData,
    turnoverCostData,
  } = useAppSelector((store) => store.financiaImpact);

  useEffect(() => {
    if (!searchParams.get("filterByPeriod")) {
      dispatch({ type: "userData/setPeriod", payload: 2023 });
    }
  }, []);

  const transformedRetentionRate = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        retentionRate,
        periodSelected,
        "retention_rate"
      ),
    [retentionRate]
  );

  const transformedFirstYearRetentionRate = useMemo(
    () =>
      transformDataforPredictiveAnalyticsTempFYRR(
        firstYearRetentionRate,
        periodSelected,
        "retention_rate"
      ),
    [firstYearRetentionRate]
  );

  const transformedTurnoverRate = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        turnoverRate,
        periodSelected,
        "turnover_rate"
      ),
    [turnoverRate]
  );

  const transformedAbsenteeismRate = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        absenteesimRate,
        periodSelected,
        "absenteeism_rate"
      ),
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
    () =>
      transformDataforPredictiveAnalytics(
        internalMobilityRate,
        periodSelected,
        "internal_mobility_rate" //TODO CHANGE WHEN THE API DATA IS RECIEVED
      ),
    [internalMobilityRate, periodSelected]
  );

  const transformedAbsenteeismCostData = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        absenteesimCostData,
        periodSelected,
        "absenteeism_cost"
      ),
    [absenteesimCostData]
  );
  const transformedTurnoverCostData = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        turnoverCostData,
        periodSelected,
        "turnover_cost"
      ),
    [turnoverCostData]
  );

  const transformedCostOfVacancy = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        turnoverCostData,
        periodSelected,
        "cost_of_vacancy"
      ),
    [turnoverCostData]
  );

  const transformedPerformaceDefecitImpact = useMemo(
    () =>
      transformYearlyData(
        performanceDefecitImpactData,
        periodSelected,
        "total_performance_deficit"
      ),
    [performanceDefecitImpactData]
  );

  // let transformedHighchartsDataForPDI ;

  // useEffect(() => {

  // },[])

  // const transfromedLocationsFilterData = useMemo(
  //   () =>
  //     transfromLocationsFilterData(
  //       locations,
  //       searchParams.get("filterByCountry"),
  //       searchParams.get("filterByState"),
  //       searchParams.get("filterByAddress")
  //     ),
  //   [locations, filterByCountry]
  // );

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       setIsFetching(true); // Start fetching
  //       const locations = await GetLocation(
  //         transfromedLocationsFilterData,
  //         filterByCountry,
  //         filterData
  //       );
  //       setMarkers(locations || []);
  //     } catch (error) {
  //       console.error("Error fetching locations:", error);
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   };

  //   if (transfromedLocationsFilterData.data.length > 0) {
  //     fetchLocation();
  //   }
  // }, [transfromedLocationsFilterData]);

  // const compareModalDateReciever = ({
  //   selectedPeriod,
  //   startDate,
  //   endDate,
  // }: any) => {
  //   if (startDate !== null) setStartDate(Number(startDate));
  //   if (endDate !== null) setEndDate(Number(endDate));
  //   console.log("Data in Company Performance screen", selectedPeriod);
  // };

  // const mapGeoData = useMemo(() => {
  //   const country = countries.find(
  //     (country: any) => country.name === filterData?.filterByCountry
  //   );
  //   return country?.mapData || null;
  // }, [filterData?.filterByCountry]);

  // console.log(
  //   "checking header files of predeictive analytics",
  //   transformedInternalMobilityRate?.data?.length
  // );

  // console.log("data in prdiction interval screen",transformedPerformaceDefecitImpact)
  return (
    <DefaultLayout
      heading="Predictive Analytics"
      isFilter={true}
      FilterComponent={<FilterContainer mapDataReload={() => {}} />}
    >
      <RiskAssesmentCard />
      <PredictiveAnalyticsGraphSection
        retentionRate={transformedRetentionRate}
        firstYearRetentionRate={transformedFirstYearRetentionRate}
        turnoverRate={transformedTurnoverRate}
        turnoverCost={transformedTurnoverCostData}
        absenteeismRate={
          transformedAbsenteeismRate?.data?.length === 0 ? {data: []}:
          convertToHighchartsSeries(transformedAbsenteeismRate) 
        }
        absenteeismCost={
          transformedAbsenteeismCostData?.data?.length === 0 ? {data: []}:
          convertToHighchartsSeries(transformedAbsenteeismCostData) 
        }
        costOfVacancy={
          transformedCostOfVacancy?.data?.length === 0 ? {data: []}:
          convertToHighchartsSeries(transformedCostOfVacancy) 
        }
        internalMobilityRate={
          transformedInternalMobilityRate?.data?.length === 0 ? {data: []}:
          convertToHighchartsSeries(transformedInternalMobilityRate)
        }
        revenuePerEmployee={
          transformedRevenuePerEmployee?.data?.length === 0 ? {data: []}:
          convertToHighchartsSeriesForRevenuePerEmployee(
          transformedRevenuePerEmployee
        )}
        performnceDefecitImpact={convertToHighchartsSeriesForPDI(
          transformedPerformaceDefecitImpact?.data?.length === 0 ? {data: []}:
          transformedPerformaceDefecitImpact
        )}
      />
    </DefaultLayout>
  );
};

export default PredictiveAnalyticsNew;
