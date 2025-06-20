import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // Legend,
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
  const predicted = ["#FBC748", "#FDDD91", "#FDE9B6", "#FEF4DA"];

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
  const PDIGraphReports = (props:any) => {
    // console.log("single rounded bar graph data", props.data)
    const {data, isPercentage} = props;
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("Invalid or empty data received:", data);
      return null; // Or return a loading spinner / fallback UI
    }
    
    const key = Object?.keys(data[0]);
    const firstKey = key[0];
    const lastKey = key[1];


  return (
    // <ResponsiveContainer width="100%" height={props.isReport?380 :450}>  //Country Head View
    <ResponsiveContainer width="100%" height={props.isReport?300 :310}>

      <BarChart
        height={250}
        width={200}
        data={data}
        margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
        // barGap={props.isReport? 100 : 10} //Country Head View
        barGap={props.isReport? 40 : 50}

      >
        <CartesianGrid horizontal={true} vertical={false}  stroke="#e5e5ef" strokeDasharray="3 3"/>
        <YAxis
          type="number"
          domain={[0, 100]}
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
        <Tooltip />
        {/* <Legend iconSize={10} iconType="circle"/> */}
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

export default PDIGraphReports;
