import { Button, Dropdown, MenuProps, Space } from "antd";
import { BsCloudDownload } from "react-icons/bs";
import { DownOutlined } from "@ant-design/icons";
// import ExcelIcon from "../../../assets/ExportButton/XSL.svg";
// import PdfIcon from "../../../assets/ExportButton/PDF.svg";
import ExcelIcon from "../../../../assets/ExportButton/XSL.svg";
import PdfIcon from "../../../../assets/ExportButton/PDF.svg";
import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";
import {
  getAbsenteeismRateTableParameters,
  getInternalMobilityRateTableData,
  getRetentionRateTableData,
  getTurnoverRateTableParameters,
} from "../Tables/CompanyPerformceMatricsTable/helperFunction";
import { getAbsenteeismCost } from "@/store/actions";
import {
  getCostOfVacancyTableData,
  getPerformnceDeficitImpact,
  getTurnoverCostTableData,
} from "../Tables/FinancialImpactMatricsTable/helper";
import { useAppSelector } from "@/store/hooks";
import { exportToExcel, exportToPDF } from "../utils/exportUtils";

interface ReportRecommendation {
  summary: string;
  key_takeaways: string[];
  recommendations: {
    [key: string]: string[];
  };
  conclusion: string;
}

interface KeyReportsCommentType {
  comments?: any[];
  [key: string]: any;
}

const ButtonSectionKeyReport = (props: any) => {
  // const {handleMenuClick} = props;
  const { currentQuarter } = props;

  const { reportsRecommendation } = useAppSelector<{
    reportsRecommendation: ReportRecommendation[] | null;
  }>((store) => store.reportsData);

  const {
    // isRecommendationLoading,
    // isKeyReportCommentLoading,
    keyReportsComment,
  } = useAppSelector<{
    isRecommendationLoading: boolean;
    isKeyReportCommentLoading: boolean;
    keyReportsComment: KeyReportsCommentType | null;
  }>((store) => store.reportsData);

  const { profileData } = useAppSelector((store) => store.profile);

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
  const absenteeismRateTableData =
    getAbsenteeismRateTableParameters(absenteesimRate);
  const retentionRateTableData = getRetentionRateTableData(
    retentionRate,
    "retention_rate"
  );
  const firstYearRetentionRateTableData = getRetentionRateTableData(
    firstYearRetentionRate,
    "first_year_retention_rate"
  );
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

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex flex-row justify-between">
          <div>Export to Excel</div>
          <img src={ExcelIcon} alt="excel" width={20} height={24} />
        </div>
      ),
      key: "excel",
      // icon: <img src={ExcelIcon} alt="excel" width={20} height={24} />,
    },
    {
      label: (
        <div className="flex flex-row justify-between">
          <div>Export to PDF</div>
          <img src={PdfIcon} alt="excel" width={20} height={24} />
        </div>
      ),
      key: "pdf",
      // icon: <img src={PdfIcon} alt="pdf" width={20} height={24} />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="gap-[16px] flex md:flex-row flex-col items-center md:w-auto w-full">
      {/* <UIButton
              background="#c847e8"
              text="Save Report"
              color="#fff"
              borderColor="#c847e8"
              onClick={() => {}}
            /> */}
      <Dropdown menu={menuProps}>
        <Button
          className="md:w-auto w-full min-h-[37px]"
          style={{
            background: "#fff",
            borderColor: "#c847e8",
            color: "#c847e8",
            borderRadius: "40px",
            fontWeight: 400,
            padding: "10px 24px",
          }}
        >
          <BsCloudDownload size={18} />
          <Space>
            Export Report
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default ButtonSectionKeyReport;
