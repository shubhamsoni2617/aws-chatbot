import { getCurrentQuarterString } from "@/utils/helper/CurrentQuarterGraphHelper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Props for RoundedBar
type RoundedBarProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  dataKey: string;
  index: number;
  dataLength: number;
};

const RoundedBar = ({
  x,
  y,
  width,
  height,
  dataKey,
  index,
  dataLength,
}: RoundedBarProps) => {
  // Define color palettes
  const colors2023 = ["#A5B4FF", "#C9D2FF", "#DBE1FF", "#EDF0FF"];
  const colors2024 = ["#FBC748", "#FDDD91", "#FDE9B6", "#FEF4DA"];
  const predicted = ["#C847E8", "#DE91F1", "#E9B5F6", "#F4DAFA"];

  // Select color palette based on dataKey and index
  const isPredicted = dataKey === "2024" && index === dataLength - 1;
  const colors = isPredicted
    ? predicted
    : dataKey === "2023"
      ? colors2023
      : colors2024;

  // Define segment heights for smooth transition (bottom segments are larger)
  const segmentHeights = [
    height * 0.4,
    height * 0.3,
    height * 0.2,
    height * 0.1,
  ];

  // Clip path ID for rounded corners
  const clipPathId = `clipPath-${dataKey}-${x}-${y}`;

  return (
    <g>
      <defs>
        <clipPath id={clipPathId}>
          <path
            d={`M${x},${y + height} h${width} v-${Math.max(height - 10, 0)} 
                a10,10 0 0 0 -10,-10 h-${Math.max(width - 20, 0)} 
                a10,10 0 0 0 -10,10 v${Math.max(height - 10, 0)} z`}
          />
        </clipPath>
      </defs>

      {/* Render segments with progressively darker colors */}
      <rect
        x={x}
        y={y + segmentHeights.slice(1).reduce((a, b) => a + b, 0)}
        width={width}
        height={segmentHeights[0]}
        fill={colors[0]}
        clipPath={`url(#${clipPathId})`}
      />
      <line
        x1={x}
        y1={y + segmentHeights.slice(1).reduce((a, b) => a + b, 0)}
        x2={x + width}
        y2={y + segmentHeights.slice(1).reduce((a, b) => a + b, 0)}
        stroke="white"
        strokeWidth={1}
      />

      <rect
        x={x}
        y={y + segmentHeights.slice(2).reduce((a, b) => a + b, 0)}
        width={width}
        height={segmentHeights[1]}
        fill={colors[1]}
        clipPath={`url(#${clipPathId})`}
      />
      <line
        x1={x}
        y1={y + segmentHeights.slice(2).reduce((a, b) => a + b, 0)}
        x2={x + width}
        y2={y + segmentHeights.slice(2).reduce((a, b) => a + b, 0)}
        stroke="white"
        strokeWidth={1}
      />

      <rect
        x={x}
        y={y + segmentHeights.slice(3).reduce((a, b) => a + b, 0)}
        width={width}
        height={segmentHeights[2]}
        fill={colors[2]}
        clipPath={`url(#${clipPathId})`}
      />
      <line
        x1={x}
        y1={y + segmentHeights.slice(3).reduce((a, b) => a + b, 0)}
        x2={x + width}
        y2={y + segmentHeights.slice(3).reduce((a, b) => a + b, 0)}
        stroke="white"
        strokeWidth={1}
      />

      <rect
        x={x}
        y={y}
        width={width}
        height={segmentHeights[3]}
        fill={colors[3]}
        clipPath={`url(#${clipPathId})`}
      />
    </g>
  );
};


// const SingleRoundBarGraph = ({ data }: SingleRoundBarGraphProps) => {
  const SingleRoundBarGraph = (props:any) => {
    console.log("single rounded bar graph data", props.data)
    const {data, isPercentage} = props;
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("Invalid or empty data received:", data);
      // return null; // Or return a loading spinner / fallback UI
    }
    const currentQuarterString = getCurrentQuarterString();
    const key = Object?.keys(data?.[0] || {});
    const firstKey = key[0];
    const lastKey = key[1];

    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        console.log("entry parameter in rounded section", payload);
  
        // Define a color mapping based on `dataKey`
        const colorMap: Record<string, string> = {
          [firstKey]: "#A5B4FF", // First year color
          [lastKey]: "#c827e8", // Second year color
          ["currentYear"]: "#c847e8",
        };
  
        const currentYear = new Date().getFullYear();
        return (
          <div
            className="custom-tooltip"
            style={{
              background: "#fff",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <p>{payload[0].payload.quarter}</p>
  
            {payload.map((entry: any, index: number) => {
              const yearLabel = entry.dataKey; // Override year if highlighted
              const tooltipColor = colorMap[entry.dataKey] || "#000"; // Assign color based on dataKey
              // console.log("entry in bar graph", entry, currentQuarterString);
              return (
                <p
                  key={index}
                  style={{
                    color:
                      entry.payload.quarter === currentQuarterString &&
                      index === 1
                        ? "#c847e8"
                        : tooltipColor,
                  }}
                >
                  {entry.payload.quarter === currentQuarterString && index === 1
                    ? currentYear
                    : yearLabel}
                  : {entry.value}
                </p>
              );
            })}
          </div>
        );
      }
      return null;
    };


  return (
    // <ResponsiveContainer width="100%" height={props.isReport?380 :450}>  //Country Head View
    <ResponsiveContainer width="100%" height={250}>

      <BarChart
        height={250}
        width={200}
        data={data}
        margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
        // barGap={props.isReport? 100 : 10} //Country Head View
        barGap={props.isReport? 40 : 50}

      >
        {/* <CartesianGrid horizontal={true} vertical={false}  stroke="#e5e5ef" strokeDasharray="3 3"/> */}
        <YAxis
          type="number"
          // domain={[0, 100]}
          axisLine={false}
          // tick={{ color: "#615E83", fontSize: "14" }}
          tickLine={false}
          tickFormatter={(tick) => isPercentage ? `${tick}%` : `£${tick}`}
          tick={{ fill: "#615e83", fontSize:'12px', fontFamily:'Inter' }}
        />
        <XAxis
          dataKey="quarter"
          type="category"
          axisLine={false}
          // tick={{ color: "#615E83", fontSize: "14" }}
          tickLine={false}
          tick={{ fill: "#615e83", fontSize:'12px', fontFamily:'Inter' }}
        />
        <Tooltip content={<CustomTooltip/>}/>

        <Bar
          dataKey={firstKey}
          fill="#A5B4FF"
          shape={(props: any) => (
            <RoundedBar
              {...props}
              dataKey="2023"
              index={props.index}
              dataLength={data.length}
            />
          )}
          barSize={props.isReport? 50 : 60}
          
        />
        <Bar
          dataKey={lastKey}
          fill="#FCC439"
          barSize={props.isReport? 50 : 60}
          shape={(props:any) => (
            <RoundedBar
              {...props}
              dataKey="2024"
              index={props.index}
              dataLength={data.length}
            />
          )}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SingleRoundBarGraph;
