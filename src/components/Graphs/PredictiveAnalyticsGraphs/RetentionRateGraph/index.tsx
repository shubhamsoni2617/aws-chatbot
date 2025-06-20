
// import { useLocation } from "react-router-dom";
import { getCurrentQuarterNumber, getCurrentQuarterString } from "@/utils/helper/CurrentQuarterGraphHelper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// type DataPoint = {
//   quarter: string;  // Explicitly set quarter to string
// } & { [key: number]: number }; // Other numeric keys

type Props = {
  data: any;
  isReport: boolean;
  isPercentage: boolean;
};

// const useIsPredictiveAnalytics = () => {
//   const location = useLocation();
//   return location.pathname.includes("predictive-analytics");
// };

const RetentionRateGraphPA = ({ data, isReport, isPercentage }: Props) => {
  // const {startDate, endDate } = compareModalDateReciever;
  console.log("Modal data in graph", data);
  // const isPredictiveAnalytics = useIsPredictiveAnalytics();
  if (!data || data.length === 0)
    return (
      <div
        className={`flex flex-row justify-center items-center h-[${
          isReport ? 300 : 310
        }px]`}
      >
        No Data Available
      </div>
    );

  const yearKeys = Object.keys(data[0]).filter(
    (key) =>
      key !== "quarter" && key !== "api_quarter" && key !== "quarter_number"
  );
  const sortedYears = yearKeys.sort((a, b) => Number(a) - Number(b));
  // const lastYear = sortedYears[1];
  // const currentYear = sortedYears[2];
  // // console.log("barGraph Data", data);
  // const currentMonth = new Date().getMonth() + 1;
  const currentQuarterString = getCurrentQuarterString();
  const currentQuarterNumber = getCurrentQuarterNumber();
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      console.log("entry parameter in bar graph section", payload);

      // Define a color mapping based on `dataKey`
      const colorMap: Record<string, string> = {
        [sortedYears[0]]: "#A5B4FF", // First year color
        [sortedYears[1]]: "#fbc748", // Second year color
        [sortedYears[2]]: "#c847e8",
      };

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
            console.log("entry in bar graph", entry, currentQuarterString);

            const isHighlighted =
              entry.payload.quarter_number <= currentQuarterNumber + 1 &&
              entry.payload.quarter_number > currentQuarterNumber - 1 &&
              index === 1;

            const yearText =
              entry.payload.quarter_number <= currentQuarterNumber + 1
                ? index === 1
                  ? "2025"
                  : "2024"
                : yearLabel;

            return (
              <p
                key={index}
                style={{
                  color: isHighlighted ? "#c847e8" : tooltipColor,
                }}
              >
                {yearText}: {entry.value}
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
      <BarChart data={data} width={100} height={450} margin={{ top: 10 }}>
        <CartesianGrid
          horizontal={true}
          vertical={false}
          stroke="#e5e5ef"
          strokeDasharray="3 3"
        />
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
          domain={[0, 100]}
          axisLine={false}
          tickFormatter={(tick) => (isPercentage ? `${tick}%` : `£${tick}`)}
          tick={{
            fill: "#615e83",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
          }}
        />
        <Tooltip content={<CustomTooltip color="#c847e8" />} cursor={{ fill: "transparent" }}/>

        <Bar dataKey={sortedYears[0]} radius={[15, 15, 0, 0]} barSize={10}>
          {data.map((index: number) => {
            // const isHighlighted = entry.quarter === currentQuarterString;
            return <Cell key={index} fill={"#a5b4ff"} />;
          })}
        </Bar>

        <Bar dataKey={sortedYears[1]} radius={[15, 15, 0, 0]} barSize={10}>
          {data.map((_: any, index: number) => {
            // const isHighlighted = entry.quarter === currentQuarterString;
            // const forPredictiveAnalytics =
            //   getCurrentQuarterNumber() === 1 ? index === 0 : index < 2;
            return <Cell key={index} fill={ (index === 3 || index ===2)? '#c847e8':"#fbc748"} />;
          })}
        </Bar>

        {/* <Bar dataKey={ currentYear} radius={[15, 15, 0, 0]} barSize={10}>
          {data.map((_:any, index:number) =>{ 
            // const isHighlighted = entry.quarter === currentQuarterString;
            return <Cell key={index} fill= {"#c847e8" } />
          })}
        </Bar> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RetentionRateGraphPA;
