// import { getCurrentQuarterNumber, getCurrentQuarterString } from "@/components/helper/CurrentQuarterGraphHelper";
// import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
//   Cell,
//   Legend,
} from "recharts";

// type DataPoint = {
//   quarter: string;  // Explicitly set quarter to string
// } & { [key: number]: number }; // Other numeric keys

type Props = {
  data: any;
  isReport: boolean;
  isPercentage: boolean;
};


const ReportsBarGraph = ({ data, isReport, isPercentage }: Props) => {
  // const {startDate, endDate } = compareModalDateReciever;
  console.log("Modal data in graph", data);
 
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
  const lastYear = sortedYears[1];
 
  return (
    <ResponsiveContainer
      width="100%"
      height={isReport ? 300 : 310}
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
        <Tooltip />
          {/* <Legend iconType="circle" iconSize={10}/> */}
        <Bar dataKey={sortedYears[0]} radius={[15, 15, 0, 0]} barSize={10} fill="#a5b4ff">
          
        </Bar>

        <Bar
          dataKey={ lastYear}
          radius={[15, 15, 0, 0]}
          barSize={10}
          fill="#fcb748"
        >
        </Bar>

    
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportsBarGraph;
