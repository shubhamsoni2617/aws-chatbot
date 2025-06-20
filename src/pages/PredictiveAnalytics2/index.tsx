import FilterContainer from "@/components/FilterContainer";
import DefaultLayout from "@/components/DefaultLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddStepModal from "./AddStepModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePredictiveAnalytics } from "@/hooks/fetchPredictiveAnalyticsData";
import {
  getCurrentQuarterNumber,
  getCurrentQuarterNumericString,
  moveFirstToLast,
} from "@/utils/helper/CurrentQuarterGraphHelper";
import { convertToHighchartsSeriesForPDI } from "../PredictiveAnalytics3/helper";
import { getEngagement } from "@/store/actions";
import { setEmgagementDataNull } from "@/store/reducers/predictiveAnalytics";
import BackButton from "./components/BackButton";
import GraphConfig from "./components/Graphconfig";
import PredictionIntervalCard from "./components/PredictionIntervalCard";
import EngagementCard from "./components/EngagementCardComponents/EngagementCard";

const PredictiveAnalytics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const heading = searchParams.get("graph");
  const currentYear = new Date().getFullYear();
  const [indexNumber, setIndexNumber] = useState(0);
  // let indexNumber = 0;
  // const periodSelected = searchParams.get("filterByYear");
  const { periodSelected, selectedLocationIds } = useAppSelector(
    (store) => store.userData
  );
  const { orgIDRedux } = useAppSelector((store) => store.profile);
  const { engagementData } = useAppSelector(
    (store) => store.predictiveAnalytics as any
  );
  const {
    absenteesimRate,
    turnoverRate,
    revenuePerEmployee,
    retentionRate,
    firstYearRetentionRate,
    internalMobilityRate,
  } = useAppSelector((store) => store.companyPerformanceData);
  const {
    absenteesimCostData,
    // costOfVacancyData,
    turnoverCostData,
    performanceDefecitImpactData,
  } = useAppSelector((store) => store.financiaImpact);

  const companyData = useAppSelector((store) => store.companyPerformanceData);
  const financialData = useAppSelector((store) => store.financiaImpact);

  const transformedData = usePredictiveAnalytics(
    { ...companyData, ...financialData },
    periodSelected.toString()
  );

  useEffect(() => {
    dispatch(
      getEngagement({
        org_id: orgIDRedux,
        location_id: JSON.stringify(selectedLocationIds),
        kpi: heading,
        quarter: `${getCurrentQuarterNumericString() + " " + currentYear}`,
      })
    );
  }, [orgIDRedux, selectedLocationIds]);

  // console.log("engagement Pagedata",engagementData?.engagement_data)
  // console.log("absenteeism data in this page", transformedAbsenteeismRate,"vafvaf",transformedAbsenteeismRate)

  let XAxisCategoriesQuarters = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
  for (let i = 0; i <= getCurrentQuarterNumber(); i++) {
    XAxisCategoriesQuarters = moveFirstToLast(XAxisCategoriesQuarters);
  }
  // const XAxisCategoriesYears = ["2024", "2025"];

  const dataKeyMapping = {
    "Turnover Rate": transformedData.turnoverRate,
    "Turnover Cost": transformedData.turnoverCost,
    "Absenteeism Rate": transformedData.absenteeismRate,
    "Absenteeism Cost": transformedData.absenteeismCost,
    "Retention Rate": transformedData.retentionRate,
    "First Year Retention Rate": transformedData.firstYearRetentionRate,
    "Internal Mobility Rate": transformedData.internalMobilityRate,
    "Cost of Vacancy": transformedData.costOfVacancy,
    "Performance Deficit": transformedData.performanceDeficit,
    "Revenue per Employee": transformedData.revenuePerEmployee,
  };

  const dataKeyMappingInitialApiData = {
    "Turnover Rate": turnoverRate,
    "Turnover Cost": turnoverCostData,
    "Absenteeism Rate": absenteesimRate,
    "Absenteeism Cost": absenteesimCostData,
    "Retention Rate": retentionRate,
    "First Year Retention Rate": firstYearRetentionRate,
    "Internal Mobility Rate": internalMobilityRate,
    "Cost of Vacancy": turnoverCostData,
    "Performance Deficit": performanceDefecitImpactData,
    "Revenue per Employee": revenuePerEmployee,
  };
  const backButtonNavigate = () => {
    dispatch(setEmgagementDataNull());
    navigate(searchParams.get("parentPage") || "/");
  };

  const parentPage = searchParams.get("parentPage");

  console.log(
    "data in prdiction interval screen",
    convertToHighchartsSeriesForPDI(transformedData?.performanceDeficit)
  );

  useEffect(() => {
    setIndexNumber(engagementData?.engagement_data?.length);
  }, [engagementData]);

  return (
    <DefaultLayout
      FilterComponent={
        <FilterContainer
          heading="Predictive Analytics"
          mapDataReload={() => {}}
        />
      }
      heading="Predictive Analytics"
    >
      <BackButton
        backButtonNavigate={backButtonNavigate}
        parentPage={parentPage}
      />

      <GraphConfig
        heading={heading}
        parentPage={parentPage}
        transformedData={transformedData}
      />

      <PredictionIntervalCard
        heading={heading}
        dataKeyMapping={dataKeyMapping}
        dataKeyMappingInitialApiData={dataKeyMappingInitialApiData}
      />
      <EngagementCard heading={heading} showModal={showModal} />
      <AddStepModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        heading={heading}
        indexNumber={indexNumber + 1}
      />
    </DefaultLayout>
  );
};

export default PredictiveAnalytics;
