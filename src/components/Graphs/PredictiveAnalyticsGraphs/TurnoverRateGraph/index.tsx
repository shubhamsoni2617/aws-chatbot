import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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

const TurnoverRateGraph = ({
  data,
  // isReport,
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

  // console.log("data in dual line graph", data);
  // Extract year keys and sort them
  const years = Object.keys(data[0])
    .filter(
      (key) =>
        key !== "quarter" && key !== "api_quarter" && key !== "quarter_number"
    )
    .sort((a, b) => parseInt(a) - parseInt(b)); // Sort numerically but keep as strings

  if (years.length < 2) return null;
  // console.log("year data", years);
  // const [firstYear, secondYear,currentYear] = years;

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
  // console.log(data, "🚀 ~ DualLineGraph ~ currentYear:", currentYear);/

  // Get the current quarter string

  // Find the index of the current quarter in the data
  // const lastIndex = data.findIndex(
  //   (entry: any) => entry.quarter === getCurrentQuarterString()
  // );

  // If the quarter is not found, fall back to the last item
  // const validLastIndex = lastIndex !== -1 ? lastIndex : data.length - 1;

  // Custom dot function for the latest year's line
  // const customDot2024 = (dotProps: any) => {
  //   const { cx, cy } = dotProps;
  //   console.log("dotprops", dotProps);
  //   return (
  //     <circle
  //       cx={cx}
  //       cy={cy}
  //       r={4}
  //       fill="white"
  //       stroke={dotProps?.index === 3 ? "#c847e8" : "#FCC439"} // Highlight only the next quarter
  //       strokeWidth={2}
  //     />
  //   );
  // };

  const customDotCurrentYear = (dotProps: any) => {
    const { cx, cy } = dotProps;
    
    const val = dotProps?.payload[dotProps?.dataKey];
    // console.log("dotprops", dotProps);

    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="white"
        stroke={(dotProps?.index===3 || dotProps?.index===2) ? "#c847e8" :'#fcb784'}
        strokeWidth={2}
        style={{ display: val || val === 0 ? 'block' : 'none' }}
      />
    );
  };

  // Custom Tooltip formatter
  // const customTooltipFormatter = (value: any, name: any, props: any) => {
  //   const { payload } = props;
  //   console.log ("value of payload", payload);
  //   const quarter = payload?.quarter;
  //   const isHighlightedQuarter = quarter === data[validLastIndex + 1]?.quarter;
  //   const displayYear =
  //     isHighlightedQuarter && name === firstYear
  //       ? String(parseInt(name) + 1)
  //       : name;
  //   // return [`${value}${isPercentage ? "%" : "£"}`, displayYear];
  // };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            background: "#fff",
            padding: "10px",
            border: "1px solid #ddd",
            // borderRadius: "8px",
          }}
        >
          {/* <p>{payload[0].payload.year}</p> */}
          {payload.map((entry: any, index: number) => {
            // const isHighlighted =
            //   entry.dataKey === "2024" &&
            //   entry?.payload?.quarter_number === getCurrentQuarterNumber();
            // const forYear =
            //   entry.dataKey === "2024" &&
            //   entry?.payload?.quarter_number <= getCurrentQuarterNumber();

            // console.log("payload", entry);

            // const forPredictiveAnalytics =
            //   isPredictiveAnalytics &&
            //   entry?.payload?.quarter_number <= getCurrentQuarterNumber() && //TODO SET COLOR CONDITON
            //   entry?.dataKey === 2025;
            // const tolltipColor = index === 0 ? "#a5b4ff" :  index === 1 ? "#fbc748":"#c847e8";
            return (
              <p
                key={index}
                style={{
                  color:
                    //   isHighlighted
                    //     ? "#c847e8"
                    //     : forPredictiveAnalytics
                    //     ? "#fcb784"
                    //     :
                    entry?.color,
                }}
              >
                {
                  // forYear
                  //   ? "2025"
                  //   : forPredictiveAnalytics
                  //   ? "2024"
                  //   : entry?.payload?.quarter_number <= getCurrentQuarterNumber() ? "2024":

                  // entry?.payload?.quarter_number ===
                  // getCurrentQuarterNumber() - 1
                  //   ? index === getCurrentQuarterNumber() - 2
                  //     ? "2024"
                  //     : "2025"
                  //   : 
                    entry?.payload?.quarter_number<=getCurrentQuarterNumber()+1 ? index ===0 ? 2024 :2025: 
                    entry.dataKey
                }
                :{entry.value}%
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: -20, bottom: 5 }}
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
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }}/>
        {/* Line for the first (earlier) year - Always Blue */}
        <Line
          dataKey={ firstYear}
          stroke={ "#A5B4FF"}
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        {/* Line for the second (later) year - Mostly Yellow, next quarter Purple */}
        {/* <Line dataKey={isPredictiveAnalytics ? 2025:secondYear} stroke={isPredictiveAnalytics ? "#c847e8" : "#FCC439"} strokeWidth={2} dot={customDot2024} /> */}
        {secondYear && (
          <Line
            dataKey={ secondYear}
            stroke={ "#FCC439"}
            strokeWidth={2}
            dot={customDotCurrentYear}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TurnoverRateGraph;
