import { useEffect, useState } from "react";
import { MenuProps, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getCurrentQuarterNumber,
} from "@/utils/helper/CurrentQuarterGraphHelper";
import { getKeyReportComment } from "@/store/actions";
import { exportToExcel, exportToPDF } from "./utils/exportUtils";
import CommentOnReportModal from "./CommentOnReportModal";
import Notification from "@/components/Notification";
import {
  getAbsenteeismRateTableParameters,
  getInternalMobilityRateTableData,
  getRetentionRateTableData,
  getTurnoverRateTableParameters,
} from "./Tables/CompanyPerformceMatricsTable/helperFunction";
import {
  getAbsenteeismCost,
  getCostOfVacancyTableData,
  getPerformnceDeficitImpact,
  getTurnoverCostTableData,
} from "./Tables/FinancialImpactMatricsTable/helper";

import KeyReportCommentSection from "./components/keyReportCommentSection";
import CommentOnReportButton from "./components/CommentOnReportButton";
import KeyReportKPIDropdowns from "./components/KeyReportKPIDropdowns";
import KeyTakeAwaySection from "./components/KeyTakeAwaySection";
import ButtonSectionKeyReport from "./components/ButtonSectionKeyReport";
import HeadingKeyReports from "./components/HeadingKeyReport";
import ConclusionKeyReports from "./components/ConclusionKeyReports";
import ExecutiveSummaryKeyReports from "./components/ExecutiveSummaryKeyReports";

type NotificationType = "success" | "info" | "warning" | "error";

const KeyReportComponent = () => {
  const [currentQuarter, setCurrentQuarter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const { profileData } = useAppSelector((store) => store.profile);
  
  interface ReportRecommendation {
    summary: string;
    key_takeaways: string[];
    recommendations: {
      [key: string]: string[];
    };
    conclusion: string;
  }

  const { reportsRecommendation } = useAppSelector<{
    reportsRecommendation: ReportRecommendation[] | null;
  }>((store) => store.reportsData);

  interface KeyReportsCommentType {
    comments?: any[];
    [key: string]: any;
  }

  const {
    isRecommendationLoading,
    isKeyReportCommentLoading,
    keyReportsComment,
  } = useAppSelector<{
    isRecommendationLoading: boolean;
    isKeyReportCommentLoading: boolean;
    keyReportsComment: KeyReportsCommentType | null;
  }>((store) => store.reportsData);

  const showModal = () => {
    setComment("");
    setIsModalOpen(true);
  };


  useEffect(() => {
    const calculateQuarters = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const currentQuarter = Math.ceil(currentMonth / 3);
      setCurrentQuarter(`Q${currentQuarter} ${currentYear}`);
    };

    calculateQuarters();

    dispatch(
      getKeyReportComment({ org_id: profileData?.["organization"]?.["id"] })
    );
  }, []);

  // Get all the table data
  const {
    turnoverRate,
    absenteesimRate,
    retentionRate,
    firstYearRetentionRate,
  } = useAppSelector((store) => store.companyPerformanceData);

  const {
    absenteesimCostData,
    turnoverCostData,
    performanceDefecitImpactData,
  } = useAppSelector((store) => store.financiaImpact);

  const currentYear = new Date().getFullYear();
  const perviousQuarterNumber =
    getCurrentQuarterNumber() === 1 ? 4 : getCurrentQuarterNumber() - 1;
  const perviousQuarter =
    "Q" +
    perviousQuarterNumber +
    " " +
    (perviousQuarterNumber === 4 ? currentYear - 1 : currentYear);

  const turnoverTableData = getTurnoverRateTableParameters(turnoverRate);
  const absenteeismRateTableData = getAbsenteeismRateTableParameters(absenteesimRate);
  const retentionRateTableData = getRetentionRateTableData(retentionRate, "retention_rate");
  const firstYearRetentionRateTableData = getRetentionRateTableData(firstYearRetentionRate, "first_year_retention_rate");
  const internalMobilityRateTableData = getInternalMobilityRateTableData(null);
  const absenteeismCostTableData = getAbsenteeismCost(absenteesimCostData);
  const turnoverCostTableData = getTurnoverCostTableData(turnoverCostData);
  const costOfVacancyTableData = getCostOfVacancyTableData(turnoverCostData);
  const pdiTableData = getPerformnceDeficitImpact(performanceDefecitImpactData);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    // Prepare data for export functions
    const exportData = {
      reportsRecommendation: reportsRecommendation || [],
      currentQuarter,
      perviousQuarter,
      turnoverTableData,
      absenteeismRateTableData,
      retentionRateTableData,
      firstYearRetentionRateTableData,
      internalMobilityRateTableData,
      costOfVacancyTableData,
      turnoverCostTableData,
      pdiTableData,
      absenteeismCostTableData,
      keyReportsComment,
      profileData,
    };

    if (e.key === "excel") {
      exportToExcel(exportData);
    } else {
      exportToPDF(exportData);
    }
  };

  return (
    <Spin spinning={isRecommendationLoading && isKeyReportCommentLoading}>
      <div className="bg-white shadow-sm rounded-xl pt-[40px] pl-[20px] pb-[20px] pr-[20px] flex-col">
        <div className="flex md:flex-row flex-col justify-between items-center mb-[24px] gap-[16px]">
          <HeadingKeyReports currentQuarter={currentQuarter}/>
          <ButtonSectionKeyReport currentQuarter={currentQuarter} />
        </div>
        <hr />

        <ExecutiveSummaryKeyReports reportsRecommendation={reportsRecommendation}/>
        <KeyTakeAwaySection reportsRecommendation={reportsRecommendation}/>
        <hr className="mt-[44px]" />
        <KeyReportKPIDropdowns reportsRecommendation={reportsRecommendation}/>
        <ConclusionKeyReports reportsRecommendation={reportsRecommendation}/>
        <CommentOnReportButton showModal={showModal} />
        <KeyReportCommentSection keyReportsComment={keyReportsComment} />
        <CommentOnReportModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setComment={setComment}
          comment={comment}
        />
      </div>
      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </Spin>
  );
};

export default KeyReportComponent;