type InfoHeadingKey =
  | "Revenue Per Employee"
  | "Revenue per Employee"
  | "Retention Rate"
  | "First Year Retention Rate"
  | "Internal Mobility Rate"
  | "Turnover Rate"
  | "Absenteeism Rate"
  | "Cost of Vacancy"
  | "Turnover Cost"
  | "Performance Deficit"
  | "Absenteeism Cost";

interface InfoContentPopOverProps {
  heading: InfoHeadingKey;
}

const InfoContentPopOver = ({ heading }: InfoContentPopOverProps) => {
  const infoHeading: Record<InfoHeadingKey, string> = {
    "Revenue per Employee":
      "This chart shows the revenue generated per employee over time.",
    "Revenue Per Employee":
      "This chart shows the revenue generated per employee over time.",
    "Retention Rate":
      "This chart shows the percentage of employees staying with the organization over a specific period.",
    "First Year Retention Rate":
      "This chart shows the percentage of new employees who remain with the organization after their first year of employment.",
    "Internal Mobility Rate":
      "This chart shows the percentage of employees who moved to different positions within the organization during a specific period.",
    "Turnover Rate":
      "This chart shows the rate at which employees leave the company over a specific period. It is a key indicator of workforce stability and organizational health.",
    "Absenteeism Rate":
      "This chart shows the average number of days employees are absent from work. It is a key indicator of workforce health and engagement levels.",
    "Cost of Vacancy":
      "This chart shows the financial impact of vacant positions by calculating the potential revenue loss per day of vacancy.",
    "Turnover Cost":
      "This chart shows the total cost associated with employee turnover, including separation costs, recruitment, training, lost productivity, and operational disruption.",
    "Performance Deficit":
      "This chart shows the Performance Deficit Impact (PDI), which quantifies the impact of low-performing employees on overall company performance. It helps estimate potential revenue or productivity losses from below-average performance.",
    "Absenteeism Cost":
      "This chart shows the total costs associated with employee absences, including both direct costs (wages, overtime, temporary replacements) and indirect costs (reduced productivity, administrative costs, morale impact, training costs).",
  };

  const infoFormula: Record<InfoHeadingKey, string> = {
    "Revenue per Employee":
      "Revenue per Employee = Total Revenue / Number of Employees",
    "Revenue Per Employee":
      "Revenue per Employee = Total Revenue / Number of Employees",
    "Retention Rate":
      "Retention Rate = ((Number of Employees at End of Period - Number of New Hires During Period) / Number of Employees at Start of Period) × 100%",
    "First Year Retention Rate":
      "First Year Retention Rate = (Number of New Hires Who Completed One Year / Total Number of New Hires from Previous Year) × 100%",
    "Internal Mobility Rate":
      "Internal Mobility Rate = (Number of Internal Moves / Total Number of Employees) × 100%",
    "Turnover Rate":
      "Turnover Rate = (Number of Employees who Left during the Period / Average Number of Employees during the Period) × 100%",
    "Absenteeism Rate":
      "Absenteeism Rate = (Total Number of Days Absent / Total Number of Working Days) × 100%",
    "Cost of Vacancy":
      "Cost of Vacancy = (Annual Revenue / Total Number of Employees) × Number of days the role is vacant",
    "Turnover Cost":
      "Turnover Cost = Separation Costs (Exit Interviews + Administrative Costs + Severance Pay) + Recruitment Costs + Training and Onboarding Costs (Orientation + Training Programs + Mentorship) + Lost Productivity Costs (Vacancy Period + Reduced Efficiency) + Operational Disruption Costs (Team Disruption + Project Delays)",
    "Performance Deficit":
      "PDI = (Total Performance Deficit × Revenue per Performance Unit) / Total Company Revenue × 100",
    "Absenteeism Cost":
      "Absenteeism Cost = Direct Costs (Days of Absence × Average daily salary + Overtime Costs + Temporary Replacement Costs) + Indirect Costs (Reduced Productivity + Administrative Costs + Training Costs + Morale Impact)",
  };

  const infoCompanyAverage: Record<InfoHeadingKey, string> = {
    "Revenue per Employee":
      "Company average represents the average revenue per employee across the entire company during the selected time period.",
    "Revenue Per Employee":
      "Company average represents the average revenue per employee across the entire company during the selected time period.",
    "Retention Rate":
      "Company average represents the average retention rate across all departments during the selected time period.",
    "First Year Retention Rate":
      "Company average represents the typical percentage of new employees who complete their first year across all departments.",
    "Internal Mobility Rate":
      "Company average represents the typical percentage of internal position changes across all departments during the selected time period.",
    "Turnover Rate":
      "Company average represents the typical employee turnover rate across all departments during the selected time period.",
    "Absenteeism Rate":
      "Company average represents the typical absenteeism rate across all departments during the selected time period, helping identify departments that may need additional support.",
    "Cost of Vacancy":
      "Company average represents the typical cost of vacancy across all departments during the selected time period, helping identify the financial impact of unfilled positions.",
    "Turnover Cost":
      "Company average represents the typical cost of employee turnover across all departments, helping identify areas where retention strategies may need improvement.",
    "Performance Deficit":
      "Company average represents the typical performance deficit impact across all departments, helping identify areas where performance improvement initiatives may be needed.",
    "Absenteeism Cost":
      "Company average represents the typical cost of absenteeism across all departments, helping identify areas where attendance management strategies may need improvement.",
  };

  const infoPredictedValue: Record<InfoHeadingKey, string> = {
    "Revenue per Employee":
      "Predicted Value is a forecast generated by a neural network model. It is based on historical data from this chart as well as patterns observed across all related performance charts.",
    "Revenue Per Employee":
      "Predicted Value is a forecast generated by a neural network model. It is based on historical data from this chart as well as patterns observed across all related performance charts.",
    "Retention Rate":
      "Predicted Value is a forecast of future retention rates based on historical trends, employee satisfaction metrics, and other relevant factors analyzed by our neural network model.",
    "First Year Retention Rate":
      "Predicted Value forecasts future first-year retention rates based on current onboarding practices, employee satisfaction surveys, and industry benchmarks.",
    "Internal Mobility Rate":
      "Predicted Value forecasts future internal mobility trends based on career development programs, skill matrices, and historical promotion patterns analyzed by our neural network model.",
    "Turnover Rate":
      "Predicted Value forecasts future turnover rates based on historical patterns, employee satisfaction metrics, industry trends, and other relevant factors analyzed by our neural network model.",
    "Absenteeism Rate":
      "Predicted Value forecasts future absenteeism trends based on historical patterns, seasonal factors, workplace wellness programs, and other relevant metrics analyzed by our neural network model.",
    "Cost of Vacancy":
      "Predicted Value forecasts future vacancy costs based on historical hiring patterns, turnover rates, and revenue trends analyzed by our neural network model.",
    "Turnover Cost":
      "Predicted Value forecasts future turnover costs based on historical turnover patterns, hiring trends, training costs, and productivity impact analyzed by our neural network model.",
    "Performance Deficit":
      "Predicted Value forecasts future performance deficit trends based on historical performance patterns, training effectiveness, and productivity metrics analyzed by our neural network model.",
    "Absenteeism Cost":
      "Predicted Value forecasts future absenteeism costs based on historical absence patterns, salary trends, temporary staffing costs, and productivity impact analyzed by our neural network model.",
  };

  console.log("Heading in InfoContentPopOver", heading);
  if (heading.includes("World Map")) {
    return (
      <div className="text-[12px]/[14px] font-[400] text-[#1E293B] w-[300px]">
        The world map shows employee performance across regions, color-coded by
        three key metrics:{" "}
        <span className="text-[#c847e8] font-[500]">Revenue per Employee</span>,{" "}
        <span className="text-[#c847e8] font-[500]">Turnover Rate</span>, and{" "}
        <span className="text-[#c847e8] font-[500]">Absenteeism Rate</span>.{" "}
        {/* <span className="text-[#22c55e] font-[500]"> */}
          Green
          {/* </span>  */}
          indicates strong
        performance,{" "}
        {/* <span className="text-[#eab308] font-[500]"> */}
          Yellow
          {/* </span>  */}
          signals
        moderate, and
        {/* <span className="text-[#ef4444] font-[500]"> */}
           Red
           {/* </span> */}
            marks areas
        needing attention. This helps spot regional trends and focus areas.
      </div>
    );
  }
  return (
    <div className="gap-[16px] w-[300px] flex flex-col">
      <div className="text-[12px]/[14px] font-[400] text-[#1E293B]">
        {infoHeading[heading] || "No information available for this chart."}
      </div>

      {/* formula */}
      <div className="gap-[8px] flex flex-col">
        <div className="text-[12px]/[14px] font-[600] text-[#1E293B]">
          Formula:
        </div>
        <div className="text-[12px]/[14px] font-[400] text-[#1E293B]">
          {infoFormula[heading] || "No formula available for this chart."}
        </div>
      </div>

      {/* Company Average */}
      <div className="gap-[8px] flex flex-col">
        <div className="text-[12px]/[14px] font-[600] text-[#1E293B]">
          Company Average:
        </div>
        <div className="text-[12px]/[14px] font-[400] text-[#1E293B]">
          {infoCompanyAverage[heading] ||
            "No company average available for this chart."}
        </div>
      </div>

      {/* Predicted Value */}

      <div className="gap-[8px] flex flex-col">
        <div className="text-[12px]/[14px] font-[600] text-[#c847e8]">
          Predicted Value:
        </div>
        <div className="text-[12px]/[14px] font-[400] text-[#1E293B]">
          {infoPredictedValue[heading] ||
            "No company average available for this chart."}
        </div>
      </div>
    </div>
  );
};

export default InfoContentPopOver;
