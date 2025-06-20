import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportDataParams {
  reportsRecommendation: any[];
  currentQuarter: string;
  perviousQuarter: string;
  turnoverTableData: any;
  absenteeismRateTableData: any;
  retentionRateTableData: any;
  firstYearRetentionRateTableData: any;
  internalMobilityRateTableData: any;
  costOfVacancyTableData: any;
  turnoverCostTableData: any;
  pdiTableData: any;
  absenteeismCostTableData: any;
  keyReportsComment: any;
  profileData: any;
}

const dateFormatter = (dateString: string): string => {
  const date = new Date(dateString);
  const formatted = date.toISOString().split("T")[0];
  return formatted;
};

export const exportToExcel = (data: ExportDataParams): void => {
  const {
    reportsRecommendation,
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
  } = data;

  const workbook = XLSX.utils.book_new();

  // Executive Summary
  const executiveSummary = [
    ["Executive Summary"],
    [reportsRecommendation?.[0]?.["summary"]],
  ];
  const executiveSheet = XLSX.utils.aoa_to_sheet(executiveSummary);
  XLSX.utils.book_append_sheet(workbook, executiveSheet, "Executive Summary");

  // Key Takeaways
  const keyTakeaways = [
    ["Key Takeaway"],
    ...(reportsRecommendation?.[0]?.["key_takeaways"] as string[]).map(
      (item) => [item]
    ),
  ];
  const keySheet = XLSX.utils.aoa_to_sheet(keyTakeaways);
  XLSX.utils.book_append_sheet(workbook, keySheet, "Key Takeaways");

  // Company Performance Metrics
  const performanceMetrics = [
    [
      "Metrics Name",
      perviousQuarter,
      "QoQ Change",
      `Prediction ${currentQuarter}`,
    ],
    [
      "Turnover Rate",
      `${turnoverTableData?.previousQuarterTurnoverRate}%`,
      `${turnoverTableData?.QoQValue}%`,
      `${turnoverTableData?.currentQuarterTurnoverRate}%`,
    ],
    [
      "Absenteeism Rate",
      `${absenteeismRateTableData?.previousQuarterAbsenteeismRate}%`,
      `${absenteeismRateTableData?.QoQValue}%`,
      `${absenteeismRateTableData?.currentQuarterAbsenteeismRate}%`,
    ],
    [
      "Retention Rate",
      `${retentionRateTableData?.previousQuarterRetentinoRateRate}%`,
      `${retentionRateTableData?.QoQValue}%`,
      `${retentionRateTableData?.currentQuarterRetentionRate}%`,
    ],
    [
      "First-Year Retention Rate",
      `${firstYearRetentionRateTableData?.previousQuarterRetentinoRateRate}%`,
      `${firstYearRetentionRateTableData?.QoQValue}%`,
      `${firstYearRetentionRateTableData?.currentQuarterRetentionRate}%`,
    ],
    ["Revenue per Employee", "$145,000", "N/A", 14800],
    [
      "Internal Mobility Rate",
      internalMobilityRateTableData?.previousQuarterInternalMobilityoRateRate
        ? `${internalMobilityRateTableData?.previousQuarterInternalMobilityoRateRate}%`
        : "N/A",
      internalMobilityRateTableData?.QoQValue
        ? `${internalMobilityRateTableData?.QoQValue}%` === "NaN%"
          ? "N/A"
          : `${internalMobilityRateTableData?.QoQValue}%`
        : "N/A",
      internalMobilityRateTableData?.currentQuarterInternalMobilityRate
        ? `${internalMobilityRateTableData?.currentQuarterInternalMobilityRate}%`
        : "N/A",
    ],
  ];
  const perfSheet = XLSX.utils.aoa_to_sheet(performanceMetrics);
  XLSX.utils.book_append_sheet(workbook, perfSheet, "Performance Metrics");

  // Financial Impact Metrics
  const financialMetrics = [
    [
      "Metrics Name",
      perviousQuarter,
      "QoQ Change",
      `Prediction ${currentQuarter}`,
    ],
    [
      "Cost of Vacancy",
      `${costOfVacancyTableData?.previousQuarterCostOfVacancy}%`,
      `${costOfVacancyTableData?.QoQValue}%`,
      `${costOfVacancyTableData?.currentQuarterCostOfVacancy}%`,
    ],
    [
      "Turnover Cost",
      `${turnoverCostTableData?.previousQuarterTurnoverCost}%`,
      `${turnoverCostTableData?.QoQValue}%`,
      `${turnoverCostTableData?.currentQuarterTurnoverCost}%`,
    ],
    [
      "Performance Defecit Impact",
      `${pdiTableData?.previousQuarterPDI}%`,
      `${pdiTableData?.QoQValue}%`,
      `${pdiTableData?.currentQuarterPDI}%`,
    ],
    [
      "Absenteeism Cost",
      `${absenteeismCostTableData?.previousQuarterAbsenteeismCost}%`,
      `${absenteeismCostTableData?.QoQValue}%`,
      `${absenteeismCostTableData?.currentQuarterAbsenteeismCost}%`,
    ],
  ];
  const finSheet = XLSX.utils.aoa_to_sheet(financialMetrics);
  XLSX.utils.book_append_sheet(workbook, finSheet, "Financial Metrics");

  // Predictive Analytics Highlights
  const predictiveAnalytics = [
    ["Predictive Analytics Highlights"],
    ["Revamp Employee Retention Strategies"],
    ...(
      reportsRecommendation?.[0]?.recommendations?.[
        "Revamp Employee Retention Strategies"
      ] ?? []
    ).map((item: string) => ["", item]),
    ["Improve Employee Engagement"],
    ...(
      reportsRecommendation?.[0]?.recommendations?.[
        "Improve Employee Engagement"
      ] ?? []
    ).map((item: string) => ["", item]),
    ["Reduce Absenteeism & Stress Levels"],
    ...(
      reportsRecommendation?.[0]?.recommendations?.[
        "Reduce Absenteeism & Stress Levels"
      ] ?? []
    ).map((item: string) => ["", item]),
    ["Enhance Career Development & Internal Mobility"],
    ...(
      reportsRecommendation?.[0]?.recommendations?.[
        "Enhance Career Development & Internal Mobility"
      ] ?? []
    ).map((item: string) => ["", item]),
  ];
  const predictiveSheet = XLSX.utils.aoa_to_sheet(predictiveAnalytics);
  XLSX.utils.book_append_sheet(
    workbook,
    predictiveSheet,
    "Predictive Analytics Highlights"
  );

  // Comments
  const comments = [
    ["Name", "Email", "Date", "Comment"], // header row
    ...(
      (keyReportsComment?.comments as {
        user_name: string;
        user_email: string;
        date: string;
        comment: string;
      }[]) || []
    ).map((item: any) => [
      item?.["user_name"], // Name
      item?.["user_email"], // Email
      dateFormatter(item?.["date"]), // Formatted Date
      item?.["comment"], // Comment
    ]),
  ];
  const commentsSheet = XLSX.utils.aoa_to_sheet(comments);
  XLSX.utils.book_append_sheet(workbook, commentsSheet, "Comments");

  // Conclusion
  const conclusion = [
    ["Conclusion"],
    [reportsRecommendation?.[0]?.["conclusion"]],
  ];
  const conclusionSheet = XLSX.utils.aoa_to_sheet(conclusion);
  XLSX.utils.book_append_sheet(workbook, conclusionSheet, "Conclusion");

  // Export to file
  XLSX.writeFile(
    workbook,
    `HR_Report_${currentQuarter.replace(" ", "_")}.xlsx`
  );
};

export const exportToPDF = (data: ExportDataParams): void => {
  const {
    reportsRecommendation,
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
  } = data;

  const PAGE_HEIGHT = 297;
  const BOTTOM_MARGIN = 20;
  const LINE_HEIGHT = 6;

  const doc = new jsPDF();
  let y = 10;

  // Utility function to handle pagination
  const checkPageOverflow = () => {
    if (y + LINE_HEIGHT > PAGE_HEIGHT - BOTTOM_MARGIN) {
      doc.addPage();
      y = 20; // reset to top margin of new page
    }
  };

  // Title
  doc.setFontSize(18);
  doc.text(
    `${profileData?.["organization"]?.["name"]} Quarterly HR Report`,
    10,
    y
  );
  y += 6;
  doc.setFontSize(11);
  doc.text(`Prepared by ${profileData?.["user"]?.["name"]}`, 10, y);
  y += 15;

  // Executive Summary
  doc.setFontSize(14);
  doc.text("Executive Summary", 10, y);
  y += 7;
  doc.setFontSize(11);
  const summaryText = doc.splitTextToSize(
    reportsRecommendation?.[0]?.["summary"] || "N/A",
    180
  );
  doc.text(summaryText, 10, y);
  y += summaryText.length * 3;
  y += 15;

  // Key Takeaways
  doc.setFontSize(14);
  doc.text("Key Takeaways", 10, y);
  y += 7;
  (reportsRecommendation?.[0]?.["key_takeaways"] || []).forEach(
    (item: string) => {
      doc.setFontSize(11);
      doc.text(`• ${item}`, 12, y);
      y += 7;
    }
  );
  y += 10;

  // Company Performance Metrics
  doc.setFontSize(14);
  doc.text("Company Performance Metrics", 10, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    head: [
      [
        "Metrics Name",
        perviousQuarter,
        "QoQ Change",
        `Prediction ${currentQuarter}`,
      ],
    ],
    body: [
      [
        "Turnover Rate",
        `${turnoverTableData?.previousQuarterTurnoverRate}%`,
        `${turnoverTableData?.QoQValue}%`,
        `${turnoverTableData?.currentQuarterTurnoverRate}%`,
      ],
      [
        "Absenteeism Rate",
        `${absenteeismRateTableData?.previousQuarterAbsenteeismRate}%`,
        `${absenteeismRateTableData?.QoQValue}%`,
        `${absenteeismRateTableData?.currentQuarterAbsenteeismRate}%`,
      ],
      [
        "Retention Rate",
        `${retentionRateTableData?.previousQuarterRetentinoRateRate}%`,
        `${retentionRateTableData?.QoQValue}%`,
        `${retentionRateTableData?.currentQuarterRetentionRate}%`,
      ],
      [
        "First-Year Retention Rate",
        `${firstYearRetentionRateTableData?.previousQuarterRetentinoRateRate}%`,
        `${firstYearRetentionRateTableData?.QoQValue}%`,
        `${firstYearRetentionRateTableData?.currentQuarterRetentionRate}%`,
      ],
      ["Revenue per Employee", "$145,000", "N/A", "14800"],
      [
        "Internal Mobility Rate",
        internalMobilityRateTableData?.previousQuarterInternalMobilityoRateRate
          ? `${internalMobilityRateTableData?.previousQuarterInternalMobilityoRateRate}%`
          : "N/A",
        internalMobilityRateTableData?.QoQValue
          ? `${internalMobilityRateTableData?.QoQValue}%`
          : "N/A",
        internalMobilityRateTableData?.currentQuarterInternalMobilityRate
          ? `${internalMobilityRateTableData?.currentQuarterInternalMobilityRate}%`
          : "N/A",
      ],
    ],
  });
  y = (doc as any).lastAutoTable?.finalY + 10 || y + 10;

  // Financial Impact Metrics
  doc.setFontSize(14);
  doc.text("Financial Impact Metrics", 10, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    head: [
      [
        "Metrics Name",
        perviousQuarter,
        "QoQ Change",
        `Prediction ${currentQuarter}`,
      ],
    ],
    body: [
      [
        "Cost of Vacancy",
        `${costOfVacancyTableData?.previousQuarterCostOfVacancy}%`,
        `${costOfVacancyTableData?.QoQValue}%`,
        `${costOfVacancyTableData?.currentQuarterCostOfVacancy}%`,
      ],
      [
        "Turnover Cost",
        `${turnoverCostTableData?.previousQuarterTurnoverCost}%`,
        `${turnoverCostTableData?.QoQValue}%`,
        `${turnoverCostTableData?.currentQuarterTurnoverCost}%`,
      ],
      [
        "Performance Defecit Impact",
        `${pdiTableData?.previousQuarterPDI}%`,
        `${pdiTableData?.QoQValue}%`,
        `${pdiTableData?.currentQuarterPDI}%`,
      ],
      [
        "Absenteeism Cost",
        `${absenteeismCostTableData?.previousQuarterAbsenteeismCost}%`,
        `${absenteeismCostTableData?.QoQValue}%`,
        `${absenteeismCostTableData?.currentQuarterAbsenteeismCost}%`,
      ],
    ],
  });
  y = (doc as any).lastAutoTable?.finalY + 10 || y + 10;

  // Predictive Analytics Highlights
  doc.setFontSize(14);
  doc.text("Predictive Analytics Highlights", 10, y);
  y += 10;
  const sections = reportsRecommendation?.[0]?.recommendations || {};
  Object.entries(sections).forEach(([title, items]) => {
    checkPageOverflow();
    doc.setFontSize(12);
    doc.text(title, 12, y);
    y += 7;
    (items as string[]).forEach((line: string) => {
      checkPageOverflow();
      doc.setFontSize(11);
      doc.text(`- ${line}`, 16, y);
      y += 6;
    });
    y += 5;
  });
  y += 10;

  // Comments
  doc.setFontSize(14);
  doc.text("Comments", 10, y);
  y += 5;
  autoTable(doc, {
    startY: y,
    head: [["Name", "Email", "Date", "Comment"]],
    body: [
      ...(
        (keyReportsComment?.comments as {
          user_name: string;
          user_email: string;
          date: string;
          comment: string;
        }[]) || []
      ).map((item: any) => [
        item?.["user_name"], // Name
        item?.["user_email"], // Email
        dateFormatter(item?.["date"]), // Formatted Date
        item?.["comment"], // Comment
      ]),
    ],
  });
  y = (doc as any).lastAutoTable?.finalY + 15 || y + 10;

  // Conclusion
  doc.setFontSize(14);
  doc.text("Conclusion", 10, y);
  y += 10;
  doc.setFontSize(11);
  const conclusionText = doc.splitTextToSize(
    reportsRecommendation?.[0]?.["conclusion"] || "N/A",
    180
  );
  doc.text(conclusionText, 10, y);

  doc.save(`HR_Report_${currentQuarter.replace(" ", "_")}.pdf`);
};