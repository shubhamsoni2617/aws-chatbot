import CardWrapper from "@/components/CardWrapper";
import DefaultLayout from "@/components/DefaultLayout";
import AreaChartGraph from "@/components/Graphs/DashboardGraphs/AreaChartGraph";
import AreaGradientChart from "@/components/Graphs/DashboardGraphs/AreaGradientChart";
import BarGraph from "@/components/Graphs/DashboardGraphs/BarGraph";
import DualLineGraph from "@/components/Graphs/DashboardGraphs/DualLineGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import RoundedBarGraph from "@/components/Graphs/DashboardGraphs/RoundedBarGraph";
import SingleRoundBarGraph from "@/components/Graphs/DashboardGraphs/SingleBarGraph";
import Notification from "@/components/Notification";
import { BsCloudDownload } from "react-icons/bs";
import {
  transformData,
  transformRevenuePerEmployee,
} from "@/pages/CompanyPerformance/transformHelper";
import { transformYearlyData } from "@/pages/FinacialImpact/transformHelper";
import { addReportComment, getReportComment } from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  DownOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotesSection from "./NotesSection";
import { setNotesToNull } from "@/store/reducers/reportsReducer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { LuArrowLeft } from "react-icons/lu";
import { toast } from "react-toastify";
import ExcelIcon from "../../../../../assets/ExportButton/XSL.svg";
import PdfIcon from "../../../../../assets/ExportButton/PDF.svg";

type NotificationType = "success" | "info" | "warning" | "error";

const ViewDetailsCreateReport = () => {
  const location = useLocation();
  const { heading, reportId, data } = location.state || {};
  const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { periodSelected } = useAppSelector((store) => store.userData);
  // const { isNotesLoading } = useAppSelector((store) => store.reportsData);
  const currentYear = new Date().getFullYear();
  const [note, setNote] = useState("");
  const [refreshNotes, setRefreshNotes] = useState(false);
  // console.log("This is report id", reportId);

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  // Company Performance Selectors
  const {
    revenuePerEmployee,
    absenteesimRate,
    retentionRate,
    firstYearRetentionRate,
    turnoverRate,
    internalMobilityRate,
    isLoadingAbsenteesimRate,
    isLoadingFirstYearRetentionRate,
    isLoadingInternalMobilityRate,
    isLoadingRetentionRate,
    isLoadingRevenuePerEmployee,
    isLoadingTurnoverRate,
  } = useAppSelector((store) => store.companyPerformanceData);

  // Financial Impact Selectors
  const {
    absenteesimCostData,
    performanceDefecitImpactData,
    turnoverCostData,
    turnoverCostLoading,
    performanceDefecitImpactLoading,
    absenteesimCostLoading,
  } = useAppSelector((store) => store.financiaImpact);

  const { profileData } = useAppSelector((store) => store.profile);

  // Transform Company Performance Data
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
      transformData(
        firstYearRetentionRate,
        periodSelected,
        true,
        "retention_rate"
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

  // Transform Financial Impact Data
  const transformedAbsenteeismCostData = useMemo(
    () =>
      transformData(
        absenteesimCostData,
        periodSelected,
        true,
        "absenteeism_cost"
      ),
    [absenteesimCostData]
  );

  const transformedTurnoverCostData = useMemo(
    () =>
      transformData(turnoverCostData, periodSelected, true, "turnover_cost"),
    [turnoverCostData]
  );

  const transformedCostOfVacancy = useMemo(
    () =>
      transformData(turnoverCostData, periodSelected, true, "cost_of_vacancy"),
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

  // Modal and Menu Handlers
  // const showModal = () => setIsModalOpen(true);
  // const handleOk = () => setIsModalOpen(false);
  // const handleCancel = () => setIsModalOpen(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "excel") {
      exportToExcel();
    } else {
      exportToPDF();
    }
  };

  const exportToExcel = () => {
    const sheetData = transformedData.data.map(
      (item: { [x: string]: unknown; quarter: unknown }) => ({
        Quarter: item.quarter,
        "2023": item["2023"],
        "2024": item["2024"],
        "2025": item["2025"],
      })
    );

    // Add an empty row, then the overview text
    sheetData.push({}, { "2023": overView });

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, heading);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, `${heading}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Quarter", "2023", "2024", "2025"];
    const tableRows = transformedData.data.map(
      (item: { [x: string]: unknown; quarter: unknown }) => [
        item.quarter,
        item["2023"] ?? "-",
        item["2024"] ?? "-",
        item["2025"] ?? "-",
      ]
    );

    doc.text(`${heading} Report`, 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [tableColumn],
      body: tableRows,
      margin: { top: 10 },
    });

    // Get the finalY position safely
    const finalY =
      ((doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable
        ?.finalY ?? 20) + 10;

    // Add wrapped overview text below the table
    const wrappedText = doc.splitTextToSize(overView, 180);
    doc.text(wrappedText, 14, finalY + 10);
    doc.setFontSize(8);
    doc.save(`${heading}.pdf`);
  };

  const menuProps = {
    items: [
      {
        label: (
          <div className="flex flex-row justify-between">
            <div>Export to Excel</div>
            <img src={ExcelIcon} alt="excel" width={20} height={24} />
          </div>
        ),
        key: "excel",
        // icon: <FileExcelOutlined />,
      },
      {
        label: (
          <div className="flex flex-row justify-between">
            <div>Export to PDF</div>
            <img src={PdfIcon} alt="excel" width={20} height={24} />
          </div>
        ),
        key: "pdf",
        // icon: <FilePdfOutlined />,
      },
    ],
    onClick: handleMenuClick,
  };

  const onTextAreaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote(e.target.value);
    // console.log("Change:", e.target.value);
  };

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  // console.log("This is profile data",formattedDate)
  const dispatch = useAppDispatch();
  const handleSaveReport = async () => {
    const formdata = new FormData();
    formdata.append("org_id", String(profileData?.["organization"]?.["id"]));
    formdata.append("report_id", String(reportId));
    formdata.append("user_name", String(profileData?.["user"]?.["name"]));
    formdata.append("email", String(profileData?.["user"]?.["email"]));
    formdata.append("kpi", heading);
    formdata.append("comment", note);
    formdata.append("date", formattedDate);

    try {
      const response = await dispatch(addReportComment(formdata));
      console.log("reports response", response);
      if (response?.payload?.status === 201) {
        // if (response?.payload?.message?.includes(
        //   "Report saved successfully.")) {
        // setTimeout(() => {
        //   setNotificationProps({
        //     visible: true,
        //     type: "success",
        //     title: "Success",
        //     message: response?.payload?.data?.message,
        //   });
        // }, 2000);

        toast.success(response?.payload?.data?.message);
        setNote("");
        // setIsModalOpen(false);
        // dispatch(getReportsData());
        dispatch(getReportComment({ report_id: String(reportId) }));
        setRefreshNotes((prev) => !prev);
        // console.log("Report saved successfully:", response.payload.data);
      } else {
        // setTimeout(() => {
        //   setNotificationProps({
        //     visible: true,
        //     type: "error",
        //     title: "Error",
        //     message: response.payload?.statusText,
        //   });
        // }, 2000);

        toast.error(response?.payload?.statusText);
        // console.log("Report not saved successfully:", response.payload?.statusText);
      }
    } catch (error) {
      console.error("Error in handleSaveReport:", error);
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Error",
      //   message: String(error),
      // });
      toast.error(String(error));
    }
  };

  const transformedData = useMemo(() => {
    switch (heading) {
      case "Revenue per Employee":
        return transformedRevenuePerEmployee;
      case "Retention Rate":
        return transformedRetentionRate;
      case "First Year Retention Rate":
        return transformedFirstYearRetentionRate;
      case "Internal Mobility Rate":
        return transformedInternalMobilityRate;
      case "Turnover Rate":
        return transformedTurnoverRate;
      case "Absenteeism Rate":
        return transformedAbsenteeismRate;
      case "Cost of Vacancy":
        return transformedCostOfVacancy;
      case "Turnover Cost":
        return transformedTurnoverCostData;
      case "Performance Deficit":
        return transformedPerformaceDefecitImpact;
      case "Absenteeism Cost":
        return transformedAbsenteeismCostData;
      default:
        return transformedAbsenteeismRate;
    }
  }, [
    heading,
    transformedAbsenteeismCostData,
    transformedAbsenteeismRate,
    transformedCostOfVacancy,
    transformedFirstYearRetentionRate,
    transformedInternalMobilityRate,
    transformedPerformaceDefecitImpact,
    transformedRetentionRate,
    transformedRevenuePerEmployee,
    transformedTurnoverCostData,
    transformedTurnoverRate,
  ]);

  const overView = useMemo(() => {
    if (transformedData && transformedData.data.length > 0) {
      const yearString: string = (new Date().getFullYear() - 1).toString(); // 2024
      const LastYearString: string = (new Date().getFullYear() - 2).toString(); // 2023

      const currentMonth = new Date().getMonth() + 1;
      const currentQuarterNumber = Math.floor((currentMonth - 1) / 3) + 1;
      const lastQuarterNumber =
        currentQuarterNumber === 1 ? 4 : currentQuarterNumber - 1;

      const lastQuarter = transformedRetentionRate.data.find(
        (item) => item.quarter_number === lastQuarterNumber
      );

      if (!lastQuarter || lastQuarter[yearString] === null)
        return `${heading} data is not available for the last quarter.`;

      const prevQuarter = transformedRetentionRate.data.find(
        (item) =>
          item.quarter_number ===
          (lastQuarterNumber === 1 ? 4 : lastQuarterNumber - 1)
      );

      const sameQuarterLastYear = lastQuarter[LastYearString];
      const currentQuarterValue = lastQuarter[yearString];
      const prevQuarterValue = prevQuarter?.[yearString];

      const diffFromPrevQuarter =
        prevQuarterValue !== undefined && prevQuarterValue !== null
          ? +(currentQuarterValue - prevQuarterValue).toFixed(2)
          : null;

      const diffFromLastYear =
        sameQuarterLastYear !== undefined && sameQuarterLastYear !== null
          ? +(currentQuarterValue - sameQuarterLastYear).toFixed(2)
          : null;

      const trendDirection = (diff: number | null) =>
        diff !== null ? (diff > 0 ? "increase" : "decrease") : "no change";

      const formattedPrevQuarter =
        diffFromPrevQuarter !== null
          ? `a ${trendDirection(diffFromPrevQuarter)} of ${Math.abs(
              diffFromPrevQuarter
            )}% from the previous quarter`
          : "no available comparison to the previous quarter";

      const formattedLastYear =
        diffFromLastYear !== null
          ? `${trendDirection(diffFromLastYear)} of ${Math.abs(
              diffFromLastYear
            )}% from the same period last year`
          : "no available comparison to the same period last year";

      return `${heading} for the last quarter (${
        lastQuarter.quarter
      }) stands at ${currentQuarterValue}%, reflecting ${formattedPrevQuarter} and ${formattedLastYear}. This trend is driven by internal changes and market adaptation. The forecast for the next period estimates a value of ${transformedData.predictedValue.trim()}, assuming stable market conditions and continued operational improvements.
    `.trim();
    }
    return "";
  }, [heading, transformedData]);

  const handleBackButton = () => {
    navigate(-1);
    dispatch(setNotesToNull());
  };

  return (
    <DefaultLayout heading="Reports">
      {/* <Spin spinning={isNotesLoading}> */}
      <div className="flex flex-row justify-between items-center">
        <Button
          style={{
            background: "#f8f8f8",
            border: "none",
            boxShadow: "none",
            marginBottom: "16px",
            padding: "10px 0px",
          }}
          className="hover:!text-[#C847E8] transition-colors"
          onClick={() => handleBackButton()}
        >
          <LuArrowLeft size={24} />
          <span>Back to Reports</span>
        </Button>
      </div>
      {}
      <div className="bg-[#fff] rounded-[12px] p-[20px] mb-[60px]">
        <div className="mb-[40px]">
          {/* Company Performance Graphs */}
          {heading === "Revenue per Employee" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading="Revenue per Employee"
              predictedValue={transformedRevenuePerEmployee?.predictedValue}
              companyAverage={transformedRevenuePerEmployee?.companyAverage}
            >
              {isLoadingRevenuePerEmployee ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <AreaGradientChart
                  height={320}
                  gradientColor="#c847e8"
                  data={data}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Retention Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading="Retention Rate"
              predictedValue={transformedRetentionRate?.predictedValue}
              companyAverage={transformedRetentionRate?.companyAverage}
            >
              {isLoadingRetentionRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <BarGraph data={data} isPercentage={true} />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "First Year Retention Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading="First Year Retention Rate"
              predictedValue={transformedFirstYearRetentionRate?.predictedValue}
              companyAverage={transformedFirstYearRetentionRate?.companyAverage}
            >
              {isLoadingFirstYearRetentionRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <BarGraph data={data} isPercentage={true} />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Internal Mobility Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading="Internal Mobility Rate"
              predictedValue={transformedInternalMobilityRate?.predictedValue}
              companyAverage={transformedInternalMobilityRate?.companyAverage}
            >
              {isLoadingInternalMobilityRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <AreaChartGraph
                  marginLeft={-10}
                  color2023="#A5B4FF"
                  color2024="#FCC439"
                  hideAxis={false}
                  fillSec={false}
                  height={250}
                  data={data}
                  isPercentage={true}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Turnover Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading="Turnover Rate"
              predictedValue={transformedTurnoverRate?.predictedValue}
              companyAverage={transformedTurnoverRate?.companyAverage}
            >
              {isLoadingTurnoverRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <DualLineGraph
                  data={data}
                  isReport={false}
                  isPercentage={true}
                  isReportAndNotCompare={false}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Absenteeism Rate" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading="Absenteeism Rate"
              predictedValue={transformedAbsenteeismRate?.predictedValue}
              companyAverage={transformedAbsenteeismRate?.companyAverage}
            >
              {isLoadingAbsenteesimRate ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <RoundedBarGraph data={data} isReportAndNotCompare={false} />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {/* Financial Impact Graphs */}
          {heading === "Cost of Vacancy" && (
            <CardWrapper
              classes="col-span-1 sm:col-span-2 lg:col-span-2 h-[450px]"
              heading="Cost of Vacancy"
              predictedValue={transformedCostOfVacancy?.predictedValue}
              companyAverage={transformedCostOfVacancy?.companyAverage}
            >
              {turnoverCostLoading ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <BarGraph data={data} isPercentage={false} />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Turnover Cost" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading="Turnover Cost"
              predictedValue={transformedTurnoverCostData?.predictedValue}
              companyAverage={transformedTurnoverCostData?.companyAverage}
            >
              {turnoverCostLoading ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <DualLineGraph
                  data={data}
                  isReport={false}
                  isPercentage={false}
                  isReportAndNotCompare={false}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Performance Deficit" && (
            <CardWrapper
              classes="h-[450px]"
              heading="Performance Deficit"
              predictedValue={
                transformedPerformaceDefecitImpact?.predictedValue
              }
              companyAverage={
                transformedPerformaceDefecitImpact?.companyAverage
              }
            >
              {performanceDefecitImpactLoading ? (
                <Spin className="h-[290px] flex justify-center items-center" />
              ) : (
                <SingleRoundBarGraph
                  data={data}
                  isReport={false}
                  isPercentage={false}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}

          {heading === "Absenteeism Cost" && (
            <CardWrapper
              classes="rounded-[12px] h-[450px]"
              heading="Absenteeism Cost"
              predictedValue={transformedAbsenteeismCostData?.predictedValue}
              companyAverage={transformedAbsenteeismCostData?.companyAverage}
            >
              {absenteesimCostLoading ? (
                <Spin className="h-[250px] flex justify-center items-center" />
              ) : (
                <AreaChartGraph
                  marginLeft={0}
                  color2023="#A5B4FF"
                  color2024="#FCC439"
                  hideAxis={false}
                  fillSec={false}
                  height={250}
                  data={data}
                  isPercentage={false}
                />
              )}
              <Legend year={periodSelected} comparisonYear={currentYear - 1} />
            </CardWrapper>
          )}
        </div>

        <div className="mt-[60px]">
          <div className="font-bold text-[18px] mb-[20px]">Overview</div>
          <div className="text-[14px] font-normal text-[#475569] leading-[16px]">
            {overView}
          </div>
        </div>

        {/* Notes Compoenent */}

        {reportId && (
          <>
            <NotesSection
              reportId={reportId}
              heading={heading}
              refresh={refreshNotes}
            />

            <div className="Add-Note">
              <TextArea
                showCount
                maxLength={100}
                onChange={onTextAreaChange}
                placeholder="Add Note"
                value={note}
                style={{
                  minHeight: "172px",
                  width: "100%",
                  marginTop: "30px",
                  marginBottom: "40px",
                  resize: "vertical",
                }}
                autoSize={true}
              />
            </div>

            <div className="flex flex-row justify-center p-[20px]">
              <Button
                className="SaveReport h-[40px]"
                // onClick={showModal}
                onClick={() => handleSaveReport()}
                style={{
                  backgroundColor: "#C847E8",
                  color: "#fff",
                  borderRadius: "40px",
                  marginRight: "5px",
                  padding: "10px 24px",
                }}
              >
                Add Note
              </Button>
              <Dropdown menu={menuProps}>
                <Button
                  className="ExportReportBtn h-[40px]"
                  style={{
                    borderRadius: "40px",
                    borderColor: "#c847E8",
                    color: "#c847E8",
                    marginLeft: "5px",
                    padding: "10px 24px",
                  }}
                >
                  <Space>
                    <BsCloudDownload size={20} />
                    Export Report
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </>
        )}

        {/* <SaveReportModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        /> */}
      </div>
      {/* </Spin> */}
      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </DefaultLayout>
  );
};

export default ViewDetailsCreateReport;
