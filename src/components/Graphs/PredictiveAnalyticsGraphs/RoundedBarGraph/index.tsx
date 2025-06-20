import { getCurrentQuarterString } from "@/utils/helper/CurrentQuarterGraphHelper";
import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Bar shape with rounded corners
const RoundedBar = (props: any) => {
  const { x = 0, y = 0, width = 0, height = 0, dataKey, colors } = props;

  const segmentHeights = [
    height * 0.4,
    height * 0.3,
    height * 0.2,
    height * 0.1,
  ];
  const clipPathId = `clipPath-${dataKey}-${x}-${y}`;

  return (
    <g>
      <defs>
        <clipPath id={clipPathId}>
          <path
            d={`M${x},${y + height} h${width} v-${Math.max(height - 10, 10)} 
                a10,10 0 0 0 -10,-10 h-${Math.max(width - 20, 0)} 
                a10,10 0 0 0 -10,10 v${Math.max(height - 10, 0)} z`}
          />
        </clipPath>
      </defs>

      {segmentHeights.map((segHeight, i) => (
        <rect
          key={i}
          x={x}
          y={y + segmentHeights.slice(i + 1).reduce((a, b) => a + b, 0)}
          width={width}
          height={segHeight}
          fill={colors[i]}
          clipPath={`url(#${clipPathId})`}
        />
      ))}
    </g>
  );
};

const GradientBarGraph = ({ data, isReportAndNotCompare }: { data: any[] , isReportAndNotCompare:boolean}) => {
  if (!data || data.length === 0) return null;

  console.log("Rounded bar graph data", data);

  const isCountryData = data[0]?.hasOwnProperty("quarter");

  const xAxisKey = isCountryData ? "quarter" : "name";
  const availableKeys = Object.keys(data[0]).filter(
    (key) => key !== xAxisKey && key !== "quarter"
  );

  if (availableKeys.length < 2) return <p>Not enough data to display</p>;

  const [key1, key2, key3] = availableKeys.slice(0, 3);

  let firstYear = "";
  let secondYear = "";
  // let currentYear = "";

  if (isReportAndNotCompare) {
    firstYear = availableKeys[0];
    // currentYear = availableKeys[1];
  } else {
    firstYear = availableKeys[0];
    secondYear = availableKeys[1];
    // currentYear = availableKeys[2];
  }
  const colorPalettes: Record<string, string[]> = {
    [key1]: ["#A5B4FF", "#C9D2FF", "#DBE1FF", "#EDF0FF"],
    [key2]: ["#FBC748", "#FDDD91", "#FDE9B6", "#FEF4DA"],
    [key3]: ["#c847e8", "#de91f1", "#e9b5f6", "#f4daff"],
  };

  const CustomTooltip = ({ active, payload}: any) => {
    if (active && payload && payload.length) {
      
      const isHighlighted = (payload[1]?.payload.quarter === getCurrentQuarterString()) && (payload[1]?.dataKey === "2024");
      console.log(active, "🚀 ~ CustomTooltip ~ payload:", getCurrentQuarterString(), isHighlighted);
      return (
        <div
          className="custom-tooltip"
          style={{
            background: "#fff",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          <p>{payload[0].payload[xAxisKey]}</p>
          {payload.map((entry: any, index: number) =>{ 
            // console.log("entry reounde bar graph",entry, index)
            const forPredictiveAnalytics = isPredictiveAnalytics && (entry?.payload?.quarter === getCurrentQuarterString()) && entry?.dataKey ===2025
            return(
            <p key={index} style={{ color: isHighlighted && index===1? "#c847e8": forPredictiveAnalytics? "#fcb748":entry.color }}>
              {isHighlighted && index===1 ? "2025":forPredictiveAnalytics?"2024":entry.dataKey}: {entry.value}
            </p>
          )})}
        </div>
      );
    }
    return null;
  };

  // Mapping of month ranges to quarter strings
  
  const useIsPredictiveAnalytics = () => {
    const location = useLocation();
    return location.pathname.includes("predictive-analytics");
  };
  const isPredictiveAnalytics = useIsPredictiveAnalytics();
  return (
    <ResponsiveContainer width="100%" height={310}>
      <BarChart
        height={250}
        width={429}
        data={data}
        margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
      >
        <CartesianGrid
          horizontal
          vertical={false}
          stroke="#e5e5ef"
          strokeDasharray="3 3"
        />
        <YAxis
          type="number"
          // domain={[0, Math.ceil(Math.max(...data.map(item => item.values)))]} // Dynamically setting max domain
          allowDecimals={false} // Ensures only integer values appear
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => `${tick}%`}
          tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
        />

        <XAxis
          dataKey={xAxisKey}
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
        />
        <Tooltip content={<CustomTooltip />} />

        {/* Bar for 2023 */}
        <Bar
          key={key1}
          dataKey={firstYear}
          fill={colorPalettes[key1][0]}
          shape={(props: any) => {
            // const isHighlighted = entry[xAxisKey] === currentQuarterString;
            // console.log("props for rounded bar graph", props);
            return (
              <RoundedBar
                {...props}
                dataKey={key1}
                colors={colorPalettes[key1]}
              />
            );
          }}
        ></Bar>

        {/* Bar for 2024 */}
        {secondYear && (
          <Bar
            key={key2}
            dataKey={secondYear}
            fill={isPredictiveAnalytics? colorPalettes[key3][0]:colorPalettes[key2][0]}
            shape={(props: any) =>{
              // console.log("rounded bar graph props", props); 
              return (<RoundedBar
                {...props}
                dataKey={key2}
                colors={
                  (isPredictiveAnalytics &&
                  props?.["quarter"] !== getCurrentQuarterString()) || 
                  (!isPredictiveAnalytics && props?.["quarter"] === getCurrentQuarterString())
                    ? colorPalettes[key3]
                    : colorPalettes[key2]
                }
              />)
            }}
          >
            {/* {data.map((entry: any, index: number) => {
            const isHighlighted = entry[xAxisKey] === currentQuarterString && entry.year === 2024;
            return (
              <Cell
                key={`cell-${index}`}
                fill={isHighlighted ? colorPalettes[key3][0] : colorPalettes[key2][0]}
              />
            );
          })} */}
          </Bar>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GradientBarGraph;
