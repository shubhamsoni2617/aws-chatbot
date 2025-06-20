
import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";
import { useLocation } from "react-router-dom";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
//   Legend,
} from "recharts";

// type Props = {
//   fillSec: boolean;
//   height: number;
//   data: {
//     quarter: string;
//     "2023": number;
//     "2024": number;
//   }[];
//   marginLeft: number;
//   color2023: string;
//   color2024: string;
//   hideAxis: boolean;
//   isPercentage: boolean;
// };

// Mapping of month ranges to quarter strings

const useIsPredictiveAnalytics = () => {
  const location = useLocation();
  return location.pathname.includes("predictive-analytics");
};

const AbsenteeismCostGraphReports = (props: any) => {
  const {
    fillSec,
    height,
    data,
    color2023,
    color2024,
    hideAxis,
    isPercentage,
    isReportAndNotCompare,
  } = props;
  const isPredictiveAnalytics = useIsPredictiveAnalytics();

  console.log("area data", data);
  const firstTwoKeys = data?.length > 0 ? Object.keys(data[0]).slice(0, 3) : [];
  // console.log("Keys", firstTwoKeys);

  let firstYear = "";
  let secondYear = "";
  // let currentYear = "";

  if (isReportAndNotCompare) {
    firstYear = firstTwoKeys[0];
    // currentYear = firstTwoKeys[1];
  } else {
    firstYear = firstTwoKeys[0];
    secondYear = firstTwoKeys[1];
    // currentYear = firstTwoKeys[2];
  }

  const GradVal = fillSec ? "url(#color2023)" : "#FFFFFF";

  // Get the last data point index
//   const lastIndex = data && data?.length > 0 ? data?.length - 1 : 0;

  // Custom dot function for 2024
  const customDot2024 = (dotProps: any, year: any) => {
    const { cx, cy } = dotProps;
    if (!dotProps.payload[year] && dotProps.payload[year] !== 0) {
      return <circle cx={0} cy={0} r={0} fill="none" />;
    }

    // console.log("dotprops", dotProps);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5} // Adjust size if needed
        fill={
           color2024
        }
        stroke="white"
        strokeWidth={2}
      />
    );
  };

  interface DotProps {
    cx: number;
    cy: number;
    index: number;
    payload: Record<string, any>;
  }

  const customDot2025 = (dotProps: DotProps, year: string) => {
    const { cx, cy, index } = dotProps;
    if (!dotProps.payload[year] && dotProps.payload[year] !== 0) {
      return <circle cx={0} cy={0} r={0} fill="none" />;
    }

    // console.log("dotprops", dotProps);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5} // Adjust size if needed
        fill={
          // index === lastIndex && !isReportAndNotCompare
          //   ? "#C847E8"
          //   : isPredictiveAnalytics || isReportAndNotCompare
          //   ? "#c847e8"
          //   : isPredictiveAnalytics && index===0? "#fcb748":
          index <= getCurrentQuarterNumber()-1 ? "#fbc748" : "#c847e8"
        }
        stroke="white"
        strokeWidth={2}
      />
    );
  };

  const customDot2023 = (dotProps: any, year: any) => {
    const { cx, cy } = dotProps;

    if (!dotProps.payload[year] && dotProps.payload[year] !== 0) {
      return <circle cx={0} cy={0} r={0} fill="none" />;
    }
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5} // Adjust size if needed
        fill={color2023}
        stroke="white"
        strokeWidth={2}
      />
    );
  };




  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        className="areaChart"
        width={370}
        height={290}
        data={data ? data : []}
        margin={{ right: 20, left: -10 }}
      >
        {/* Define gradients */}
        <defs>
          <linearGradient id="color2023" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color2023} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color2023} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color2024} stopOpacity={0.9} />
            <stop offset="95%" stopColor={color2024} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          horizontal
          vertical={false}
          stroke="#e5e5ef"
          strokeDasharray="3 3"
        />
        <XAxis
          hide={hideAxis}
          dataKey="quarter"
          axisLine={false}
          tickMargin={4}
          tickLine={false}
          padding={{ left: 40 }}
          tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
        />
        <YAxis
          hide={hideAxis}
          type="number"
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          tickMargin={2}
          // tick={{ color: "#615E83", fontSize: "14px" }}
          tickFormatter={(tick) => (isPercentage ? `${tick}%` : `${tick}£`)}
          tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
        />
        <Tooltip />
        

        {/* Areas with gradient fills */}
        <Area
          dataKey={firstYear}
          // stroke={isPredictiveAnalytics ? "#fbc748" : color2023}
          stroke={color2023}
          fill={isPredictiveAnalytics ? "url(#color2024)" : GradVal}
          dot={(props: any) =>
            isPredictiveAnalytics
              ? customDot2025(props, firstYear)
              : customDot2023(props, firstYear)
          }
        />
        {secondYear && (
          <Area
            dataKey={isPredictiveAnalytics ? "2025" : secondYear}
            stroke={isPredictiveAnalytics ? "#c857e8" : color2024}
            fill={isPredictiveAnalytics ? "#fff" : "url(#color2024)"}
            dot={(props: DotProps) =>
              isPredictiveAnalytics
                ? customDot2025(props, firstYear) || <></>
                : customDot2024(props, firstYear) || <></>
            }
          />
        )}

        {/* <Area
          dataKey={currentYear}
          stroke={"#c857e8"}
          fill={isPredictiveAnalytics ? "#fff" : "url(#color2024)"}
          dot={customDot2024} // Custom dot function for 2024
        /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AbsenteeismCostGraphReports;
