import {
  AreaChart,
  Area,
  // CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const AreaGradientChart = (props: any) => {
  const {
    height,
    data,
    gradientColor,
    isReport,
  } = props;

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            background: "#000",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          {payload.map((entry: any, index: number) => {
            return (
              <p key={index} style={{ color: "#fff" }}>
                £{formatNumber(entry.value)}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const customDot2023 = (dotProps: any) => {
    const { cx, cy, index } = dotProps;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5} // Adjust size if needed
        fill={index === 0 ? "#a5b4ff" : index === 1 ? "#fbc748" : "#c847e8"}
        stroke="white"
        strokeWidth={2}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        className="areaChart"
        width={330}
        height={450}
        data={data ? data : []}
        margin={{ right: 5, left: -14, bottom: isReport ? 0 : 5 }}
      >
        {/* Define gradients */}
        <defs>
          <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* <CartesianGrid
          horizontal
          vertical={false}
          stroke="#e5e5ef"
          strokeDasharray="3 3"
        /> */}
        <XAxis
          // hide={true}
          hide={false}
          dataKey="year"
          axisLine={false}
          tickMargin={4}
          tickLine={false}
          padding={{ left: 40 }}
          // tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
          tick={false}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => `£${(tick >= 1000 ? tick/1000 : tick)}${tick >= 1000 ? 'k' : ''}`}
          tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
        />
        <Tooltip content={<CustomTooltip />} />

        {/* Areas with gradient fills */}
        <Area
          dataKey={"value"}
          fill={"url(#gradientColor)"}
          dot={customDot2023}
          stroke="#D2A5FF"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaGradientChart;
