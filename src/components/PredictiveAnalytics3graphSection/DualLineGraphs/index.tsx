// import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";
// // import { useLocation } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// type Props = {
//   data: any;
//   isReport: boolean;
//   isPercentage: boolean;
//   isReportAndNotCompare: boolean;
// };

// // const useIsPredictiveAnalytics = () => {
// //   const location = useLocation();
// //   return location.pathname.includes("predictive-analytics");
// // };

// const DualLineGraph = ({
//   data,
//   isReport,
//   isPercentage,
//   isReportAndNotCompare,
// }: Props) => {
//   // const isPredictiveAnalytics = useIsPredictiveAnalytics();

//   // if (!data || data.length === 0) {
//   //   return (
//   //     <div className="flex flex-row justify-center align-center">
//   //       No Data Available
//   //     </div>
//   //   );
//   // }

//   // Extract year keys and sort them
//   const years = Object.keys(data?.[0] || {})
//     .filter(
//       (key) =>
//         key !== "quarter" && key !== "api_quarter" && key !== "quarter_number"
//     )
//     .sort((a, b) => parseInt(a) - parseInt(b)); // Sort numerically but keep as strings

//   // if (years.length < 2) return null;

//   // console.log("data in dual line graph", data);
//   // console.log("year data", years);

//   let firstYear = "";
//   let secondYear = "";
//   // let currentYear = "";

//   if (isReportAndNotCompare) {
//     firstYear = years[0];
//     // currentYear = years[1];
//   } else {
//     firstYear = years[0];
//     secondYear = years[1];
//     // currentYear = years[2];
//   }

//   // console.log(data, "🚀 ~ DualLineGraph ~ currentYear:", currentYear);

//   // Custom dot function for the latest year's line
//   const customDot2024 = ({ cx, cy }: any) => {
//     return (
//       <g>
//         <circle
//           cx={cx}
//           cy={cy}
//           r={10} // outer glow
//           fill="#c847e8"
//           fillOpacity={0.2}
//         />
//         <circle
//           cx={cx}
//           cy={cy}
//           r={4} // inner solid
//           fill="#c847e8"
//           stroke="#fff"
//           strokeWidth={2}
//         />
//       </g>
//     );
//   };

//   const customDot2023 = ({ cx, cy }: any) => {
//     return (
//       <g>
//         <circle cx={cx} cy={cy} r={10} fill="#fcb784" fillOpacity={0.3} />
//         <circle cx={cx} cy={cy} r={4} fill="#fcb784" stroke="#fff" strokeWidth={2} />
//       </g>
//     );
//   };

//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div
//           className="custom-tooltip"
//           style={{
//             background: "#fff",
//             padding: "10px",
//             border: "1px solid #ddd",
//           }}
//         >
//           {payload.map((entry: any, index: number) => {
//             const isHighlighted =
//               entry.dataKey === "2024" &&
//               entry?.payload?.quarter_number === getCurrentQuarterNumber();
//             const forYear =
//               entry.dataKey === "2024" &&
//               entry?.payload?.quarter_number <= getCurrentQuarterNumber();

//             // console.log("payload", entry);

//             // const forPredictiveAnalytics =
//             //   isPredictiveAnalytics &&
//             //   entry?.payload?.quarter_number <= getCurrentQuarterNumber() &&
//             //   entry?.dataKey === 2025;

//             return (
//               <p
//                 key={index}
//                 style={{
//                   color: isHighlighted ? "#c847e8" : entry?.color,
//                 }}
//               >
//                 {forYear
//                   ? "2025"
//                   : entry?.payload?.quarter_number <= getCurrentQuarterNumber()
//                   ? "2024"
//                   : entry.dataKey}{" "}
//                 : {entry.value}%
//               </p>
//             );
//           })}
//         </div>
//       );
//     }
//     return null;
//   };

//   // return <h1>sadfgcbh</h1>;

//   return (
//     <ResponsiveContainer width="100%" height={256}>
//       <LineChart
//         width={600}
//         height={400}
//         data={data}
//         margin={{ top: 10, right: 30, left: isReport ? -20 : -20, bottom: 0}}
//       >
//         <CartesianGrid
//           horizontal
//           vertical
//           stroke="#e5e5ef"
//           strokeDasharray="3 4"
//         />
//         <YAxis
//           type="number"
//           axisLine={false}
//           tickLine={false}
//           tickFormatter={(tick) => (isPercentage ? `${tick}%` : `£${tick}`)}
//           tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
//           domain={data?.[0] ? undefined : [0, 100]}
//         />
//         <XAxis
//           dataKey="quarter"
//           type="category"
//           axisLine={false}
//           tickLine={false}
//           padding={{ left: 40 }}
//           tick={{ fill: "#615e83", fontSize: "12px", fontFamily: "Inter" }}
//         />
//         <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
//         {/* Line for the first (earlier) year - Always Blue */}
//         <Line
//           dataKey={firstYear}
//           stroke="#fbc748"
//           strokeWidth={1}
//           dot={customDot2023}
//         />
//         {/* Line for the second (later) year - Mostly Yellow, next quarter Purple */}
//         {secondYear && (
//           <Line
//             dataKey={secondYear}
//             stroke="#c847e8"
//             strokeWidth={1}
//             dot={customDot2024}
//           />
//         )}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default DualLineGraph;


import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";

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

const DualLineGraphPA = ({
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
  // Custom dot function for the latest year's line
  const customDot2024 = (dotProps: any) => {
    const {cx,cy} = dotProps;
    const val = dotProps?.payload[dotProps?.dataKey];
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={10} // outer glowl
          fill={(dotProps?.index===3 || dotProps?.index===2) ? "#c847e8" :'#fcb784'}
          // stroke={(dotProps?.index===3 || dotProps?.index===2) ? "#c847e8" :'#fcb784'}
          fillOpacity={0.2}
          style={{ display: val || val === 0 ? 'block' : 'none' }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={4} // inner solid
          fill={(dotProps?.index===3 || dotProps?.index===2) ? "#c847e8" :'#fcb784'}
          stroke="#fff"
          // stroke={(dotProps?.index===3 || dotProps?.index===2) ? "#c847e8" :'#fcb784'}
          strokeWidth={2}
          style={{ display: val || val === 0 ? 'block' : 'none' }}
        />
      </g>
    );
  };

  const customDot2023 = (dotProps: any) => {
    const { cx, cy } = dotProps;
    const shouldRender = dotProps?.payload?.[`${firstYear}`] !== undefined && dotProps?.payload?.[`${firstYear}`] !== null;
    return (
      <g style={{ display: shouldRender ? 'block' : 'none' }}>
        <circle cx={cx} cy={cy} r={10} fill="#a5b4ff" fillOpacity={0.3} />
        <circle cx={cx} cy={cy} r={4} fill="#a5b4ff" stroke="#fff" strokeWidth={2} />
      </g>
    );
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
        margin={{ top: 10, right: 10, left: -12, bottom: 5 }}
      >
        {/* <CartesianGrid
          horizontal
          vertical
          stroke="#e5e5ef"
          strokeDasharray="3 4"
        /> */}
        <YAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => (isPercentage ? `${tick} %` : `£${tick}`)}
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
          // dot={{ r: 4 }}
          dot ={customDot2023}
        />
        {/* Line for the second (later) year - Mostly Yellow, next quarter Purple */}
        {/* <Line dataKey={isPredictiveAnalytics ? 2025:secondYear} stroke={isPredictiveAnalytics ? "#c847e8" : "#FCC439"} strokeWidth={2} dot={customDot2024} /> */}
        {secondYear && (
          <Line
            dataKey={ secondYear}
            stroke={ "#FCC439"}
            strokeWidth={2}
            // dot={customDotCurrentYear}
            dot ={customDot2024}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DualLineGraphPA;
