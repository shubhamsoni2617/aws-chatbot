import {
  getCurrentQuarterNumber,
  // getCurrentQuarterString,
} from "@/utils/helper/CurrentQuarterGraphHelper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Props = {
  data: any;
  isPercentage: boolean;
};

const BarGraph = ({ data, isPercentage }: Props) => {
  // console.log("Modal data in graph", data);
  // if (!data || data.length === 0)
  //   return (
  //     <div
  //       className={`flex flex-row justify-center items-center h-[${
  //         310
  //       }px]`}
  //     >
  //       No Data Available
  //     </div>
  //   );

  const yearKeys = Object.keys(data?.[0] || {}).filter(
    (key) =>
      key !== "quarter" && key !== "api_quarter" && key !== "quarter_number"
  );
  const sortedYears = yearKeys.sort((a, b) => Number(a) - Number(b));
  const lastYear = sortedYears[1];
  // const currentQuarterString = getCurrentQuarterString();
  const currentQuarterNumber = getCurrentQuarterNumber();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      // console.log("entry parameter in bar graph section", payload);

      // Define a color mapping based on `dataKey`
      const colorMap: Record<string, string> = {
        [sortedYears[0]]: "#A5B4FF", // First year color
        [sortedYears[1]]: "#fbc748", // Second year color
        [sortedYears[2]]: "#c847e8",
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
                    entry.payload.quarter_number === currentQuarterNumber &&
                    index === 1
                      ? "#c847e8"
                      : tooltipColor,
                }}
              >
                {entry.payload.quarter_number <= currentQuarterNumber &&
                index === 1
                  ? currentYear
                  : entry.payload.quarter_number <= currentQuarterNumber &&
                    index === 0
                  ? "2024"
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
    <ResponsiveContainer
      width="100%"
      height={250}
      style={{ marginLeft: "-10px" }}
    >
      <BarChart
        data={data}
        width={100}
        height={450}
        margin={{ top: 0, left: 0, right: 0 }}
      >
        {/* <CartesianGrid
          horizontal={true}
          vertical={false}
          stroke="#e5e5ef"
          strokeDasharray="3 3"
        /> */}
        <XAxis
          dataKey="quarter"
          tickLine={false}
          axisLine={false}
          tick={{
            fill: "#615e83",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
          }}
          style={{ fontFamily: "Inter, sans-serif" }}
        />
        <YAxis
          tickLine={false}
          // domain={[0, 100]}
          axisLine={false}
          tickFormatter={(tick) => (isPercentage ? `${tick} %` : `£${tick}`)}
          tick={{
            fill: "#615e83",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
          }}
        />
        <Tooltip
          content={<CustomTooltip color="#c847e8" />}
          cursor={{ fill: "transparent" }}
        />

        <Bar dataKey={sortedYears[0]} radius={[15, 15, 0, 0]} barSize={10}>
          {data.map((_: any, index: number) => {
            return <Cell key={index} fill={"#A5B4FF"} />;
          })}
        </Bar>

        <Bar dataKey={lastYear} radius={[15, 15, 0, 0]} barSize={10}>
          {data.map((_: any, index: number) => {
            return (
              <Cell key={index} fill={index === 3 ? "#c847e8" : "#fbc748"} />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
