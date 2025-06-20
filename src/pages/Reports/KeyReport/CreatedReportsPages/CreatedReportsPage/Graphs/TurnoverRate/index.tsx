// import { getCurrentQuarterNumber } from "@/components/helper/CurrentQuarterGraphHelper";
// import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // Legend,
} from "recharts";


type Props = {
  data: any;
  isReport: boolean;
  isPercentage: boolean;
  isReportAndNotCompare: boolean;
};

// const useIsPredictiveAnalytics = () => {
//   const location = useLocation();
//   return location.pathname.includes("predictive-analytics");
// };

const TurnoverRateReportsGraph = ({
  data,
  isReport,
  isPercentage,
  isReportAndNotCompare,
}: Props) => {
  // const isPredictiveAnalytics = useIsPredictiveAnalytics();
  if (!data || data.length === 0)
    return (
      <div className="flex flex-row justify-center align-center">
        No Data Available
      </div>
    );

  console.log("data in dual line graph", data);
  // Extract year keys and sort them
  const years = Object.keys(data[0])
    .filter(
      (key) =>
        key !== "quarter" && key !== "api_quarter" && key !== "quarter_number"
    )
    .sort((a, b) => parseInt(a) - parseInt(b)); // Sort numerically but keep as strings

  if (years.length < 2) return null;
  console.log("year data", years);
  // const [firstYear, secondYear,currentYear] = years;

  let firstYear = "";
  let secondYear = "";
//   let currentYear = "";

  if (isReportAndNotCompare) {
    firstYear = years[0];
    // currentYear = years[1];
  } else {
    firstYear = years[0];
    secondYear = years[1];
    // currentYear = years[2];
  }


  const customDot2024 = (dotProps: any) => {
    const { cx, cy } = dotProps;
    // console.log("dotprops", dotProps);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="white"
        stroke={
            "#FCC439"
        } // Highlight only the next quarter
        strokeWidth={2}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={isReport ? 300 : 310}>
      <LineChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: isReport ? -20 : -20, bottom: 5 }}
      >
        <CartesianGrid
          horizontal
          vertical={false}
          stroke="#e5e5ef"
          strokeDasharray="3 3"
        />
        <YAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => (isPercentage ? `${tick}%` : `£${tick}`)}
          tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
        />
        <XAxis
          dataKey="quarter"
          type="category"
          axisLine={false}
          tickLine={false}
          padding={{ left: 40 }}
          tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
        />
        <Tooltip />
        {/* <Legend iconSize={10} iconType="circld"/> */}
        {/* Line for the first (earlier) year - Always Blue */}
        <Line
          dataKey={firstYear}
          stroke={ "#A5B4FF"}
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        {/* Line for the second (later) year - Mostly Yellow, next quarter Purple */}
        {/* <Line dataKey={isPredictiveAnalytics ? 2025:secondYear} stroke={isPredictiveAnalytics ? "#c847e8" : "#FCC439"} strokeWidth={2} dot={customDot2024} /> */}
        {secondYear && (
          <Line
            dataKey={secondYear}
            stroke={ "#FCC439"}
            strokeWidth={2}
            dot={ customDot2024}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TurnoverRateReportsGraph;
