import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";
// import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

const DualLineGraph = ({
  data,
  isReport,
  isPercentage,
  isReportAndNotCompare,
}: Props) => {
  // const isPredictiveAnalytics = useIsPredictiveAnalytics();

  // if (!data || data.length === 0) {
  //   return (
  //     <div className="flex flex-row justify-center align-center">
  //       No Data Available
  //     </div>
  //   );
  // }

  // Extract year keys and sort them
  const years = Object.keys(data?.[0] || {})
    .filter(
      (key) =>
        key !== "quarter" && key !== "api_quarter" && key !== "quarter_number"
    )
    .sort((a, b) => parseInt(a) - parseInt(b)); // Sort numerically but keep as strings

  // if (years.length < 2) return null;

  // console.log("data in dual line graph", data);
  // console.log("year data", years);

  let firstYear = "";
  let secondYear = "";
  // let currentYear = "";

  if (isReportAndNotCompare) {
    firstYear = years[0];
    // currentYear = years[1];
  } else {
    firstYear = years[0];
    secondYear = years[1];
    // currentYear = years[2];
  }

  // console.log(data, "🚀 ~ DualLineGraph ~ currentYear:", currentYear);

  // Custom dot function for the latest year's line
  const customDot2024 = (dotProps: any) => {
    const { cx, cy, index } = dotProps;
    // console.log("dotprops", dotProps?.payload?.[`${secondYear}`]);
    if(dotProps?.payload?.[`${secondYear}`]){
      return(
        <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="white"
        stroke={index === 3 ? "#c847e8" : "#FCC439"} // Highlight only the next quarter
        strokeWidth={2}
      />
      )
    }
    else {
      return <g />;
    }
    // return (
    //   <circle
    //     cx={cx}
    //     cy={cy}
    //     r={4}
    //     fill="white"
    //     stroke={index === 3 ? "#c847e8" : "#FCC439"} // Highlight only the next quarter
    //     strokeWidth={2}
    //   />
    // );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            background: "#fff",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          {payload.map((entry: any, index: number) => {
            const isHighlighted =
              entry.dataKey === "2024" &&
              entry?.payload?.quarter_number === getCurrentQuarterNumber();
            const forYear =
              entry.dataKey === "2024" &&
              entry?.payload?.quarter_number <= getCurrentQuarterNumber();

            // console.log("payload", entry);

            // const forPredictiveAnalytics =
            //   isPredictiveAnalytics &&
            //   entry?.payload?.quarter_number <= getCurrentQuarterNumber() &&
            //   entry?.dataKey === 2025;

            return (
              <p
                key={index}
                style={{
                  color: isHighlighted ? "#c847e8" : entry?.color,
                }}
              >
                {forYear
                  ? "2025"
                  : entry?.payload?.quarter_number <= getCurrentQuarterNumber()
                  ? "2024"
                  : entry.dataKey}{" "}
                : {entry.value}%
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  // return <h1>sadfgcbh</h1>;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 10, right: 20, left: isReport ? -20 : -15, bottom: 5 }}
      >
        {/* <CartesianGrid
          horizontal
          vertical={false}
          stroke="#e5e5ef"
          strokeDasharray="3 3"
        /> */}
        <YAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => (isPercentage ? `${tick} %` : `£${tick}`)}
          tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
          domain={data?.[0] ? undefined : [0, 100]}
        />
        <XAxis
          dataKey="quarter"
          type="category"
          axisLine={false}
          tickLine={false}
          padding={{ left: 40 }}
          tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        {/* Line for the first (earlier) year - Always Blue */}
        <Line
          dataKey={firstYear}
          stroke="#A5B4FF"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        {/* Line for the second (later) year - Mostly Yellow, next quarter Purple */}
        {secondYear && (
          <Line
            dataKey={secondYear}
            stroke="#FCC439"
            strokeWidth={2}
            dot={customDot2024}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DualLineGraph;
