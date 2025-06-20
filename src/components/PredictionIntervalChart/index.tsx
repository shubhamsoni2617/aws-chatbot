import { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { getCurrentQuarterNumber } from "@/utils/helper/CurrentQuarterGraphHelper";
import { ResponsiveContainer } from "recharts";
import { useAppSelector } from "@/store/hooks";
import { transformDataforPredictiveAnalytics } from "@/pages/PredictiveAnalytics2/transformHelper";

HighchartsMore(Highcharts);

interface PredictionIntervalGraphProps {
  heading: string;
  data: Record<string, any>;
  dataKeyMappingInitialApiData: Record<string, any>;
}

const PredictionIntervalGraph: React.FC<PredictionIntervalGraphProps> = ({
  heading,
  data,
  dataKeyMappingInitialApiData,
}) => {
  const { performanceDefecitImpactData } = useAppSelector(
    (store) => store.financiaImpact
  );
  const [formattedHistoricData, setFormattedHistoricData] = useState<any[]>([]);
  const [formattedPredictedData, setFormattedPredictedData] = useState<any[]>(
    []
  );
  // data =[]
  // useEffect(() => {
  //   if (data && data['Performance Deficit']) {
  //     data['Performance Deficit'].data = transformData(performanceDefecitImpactData, new Date().getFullYear() - 2, "pdi");
  //   }
  // }, []);

  const pdiData = transformDataforPredictiveAnalytics(
    performanceDefecitImpactData,
    new Date().getFullYear() - 2,
    "pdi"
  )?.data;
  // pdiData = moveFirstToLast(pdiData);

  // console.log("heading", data, pdiData);
  const [lower95Data, setLower95Data] = useState<any[]>([]);

  const [lower99Data, setLower99Data] = useState<any[]>([]);

  // const [maxY, setMaxY] = useState<any[]>(100);
  // console.log(
  //   formattedPredictedData,
  //   "formattedHistoricData",
  //   formattedHistoricData
  // );

  const MappingQuarters = {
    Q1: "Jan-Mar",
    Q2: "Apr-Jun",
    Q3: "Jul-Sep",
    Q4: "Oct-Dec",
  };

  useEffect(() => {
    let graphData =
      heading === "Performance Deficit" ? pdiData : data[heading]?.data || [];
    const rangeData =
      dataKeyMappingInitialApiData[heading]?.prediction_data || [];
    // console.log(
    //   dataKeyMappingInitialApiData,
    //   "🚀 ~ useEffect ~ rangeData:",
    //   graphData
    // );

    const formattedLower95Data: [string, number, number][] = [];
    const formattedLower99Data: [string, number, number][] = [];
    const finalHistoricData: [string, number | null][] = [];
    const finalPredictedData: [string, number | null][] = [];

    // console.log("prediction data retention rate testing", dataKeyMappingInitialApiData[heading]?.prediction_data, graphData)
    if (graphData.length === 0 || heading === "Revenue per Employee") {
      //TODO CHANGE RPE WHEN QUARTERLY DATA IS DONE BY BACKEND
      // Default quarters when no data is received
      finalHistoricData.push(
        ["Jan-Mar", null],
        ["Apr-Jun", null],
        ["Jul-Sep", null],
        ["Oct-Dec", null]
      );
      finalPredictedData.push(
        ["Jan-Mar", null],
        ["Apr-Jun", null],
        ["Jul-Sep", null],
        ["Oct-Dec", null]
      );
    } else {
      graphData?.forEach((item: any, i: any) => {
        finalHistoricData.push([item.quarter, item[2024]]);
        if (i > 0) {
          finalPredictedData.push([item.quarter, item[2025]]);
        }
      });

      rangeData?.[0]?.quarters?.forEach((item: any, i: any) => {
        // console.log(
        //   "🚀 ~ rangeData?.quarters?.forEach ~ item:",
        //   item,
        //   getCurrentQuarterNumber(),
        //   heading
        // );
        if (i > 0 && i < 3) {
          formattedLower95Data.push([
            MappingQuarters[item.quarter as keyof typeof MappingQuarters],
            i === getCurrentQuarterNumber() - 1
              ? graphData?.[2][2025]
              : item.lower_95,
            i === getCurrentQuarterNumber() - 1
              ? graphData?.[2][2025]
              : item.upper_95,
          ]);
          formattedLower99Data.push([
            MappingQuarters[item.quarter as keyof typeof MappingQuarters],
            i === getCurrentQuarterNumber() - 1
              ? graphData?.[2][2025]
              : item.lower_99,
            i === getCurrentQuarterNumber() - 1
              ? graphData?.[2][2025]
              : item.upper_99,
          ]);
        }
      });
    }

    setFormattedHistoricData(finalHistoricData);
    setFormattedPredictedData(finalPredictedData);
    setLower95Data(formattedLower95Data);
    setLower99Data(formattedLower99Data);
  }, [data]);

  const chartRef = useRef<HighchartsReact.RefObject | null>(null);
  // const colors = Highcharts.getOptions().colors || [];

  // console.log(
  //   "formattedData",
  //   formattedHistoricData,
  //   formattedPredictedData,
  //   "adcasdcas"
  // );
  const options: Highcharts.Options = {
    chart: {
      type: "arearange",
      // zooming: {
      //   type: "x",
      // },
      height: 250,
      
    },
    title: {
      text: "",
    },
    subtitle: {
      // text: '<a href="https://economy-finance.ec.europa.eu/system/files/2023-05/SF_2023_Statistical%20Annex.pdf" target="_blank">European Economic Forecast, Spring 2023</a>'
    },
    xAxis: {
      type: "category",
      accessibility: {
        rangeDescription: "",
      },
      min: 0,
      max: 3,
      // endOnTick: false,
      // crosshair: true,
      // plotBands: [
      //   {
      //     color: "rgba(126, 63, 149, 0.07)",
      //     from: 5.5,
      //     to: 99,
      //     label: {
      //       text: "Forecast",
      //     },
      //   },
      // ],
      // plotLines: [
      //   {
      //     dashStyle: "Dash",
      //     color: typeof colors[4] === "string" ? colors[4] : "#000000", // Fallback to black if not a string
      //     width: 2,
      //     value: 5.5,
      //   },
      // ],
    },
    yAxis: {
      // opposite: false,
      title: {
        text: "",
      },
      labels: {
        format: "{value}%",
      },
      tickAmount: 3,
      // max: 100,
      // min:1,
      // max:100
    },
    tooltip: {
      shared: false,
      valueSuffix: "%",
      // valuePrefix: "+",
    },
    responsive: {
      rules: [
        {
          chartOptions: {
            // xAxis: {
            //   labels: {
            //     staggerLines: 2,
            //   },
            // },
          },
          condition: {
            // minWidth: 540,
          },
        },
      ],
    },
    exporting: {
      enabled: false,
    },
    plotOptions: {
      series: {
        // marker: {
        //   enabled: false,
        // },
      },
      arearange: {
        // enableMouseTracking: false,
        states: {
          inactive: {
            enabled: false,
          },
        },
        color: "#a5b4ff",
        fillOpacity: 1 / 3,
        lineWidth: 0,
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "2024",
        type: "line",
        data: formattedHistoricData,
        zIndex: 2,
        color: "#fcb784",
        lineWidth: 1.5,
        marker: {
          enabled: false, // Disable markers for this specific series
        },
      },
      {
        name: "2025",
        type: "line",
        data: formattedPredictedData,
        zIndex: 2,
        color: "#c847e8",
        lineWidth: 1.5,
        marker: {
          enabled: false, // Disable markers for this specific series
        },
      },
      {
        name: "95",
        type: "arearange",
        data: lower95Data,
        marker: {
          enabled: false, // Disable markers for this specific series
        },
      },
      {
        name: "99",
        type: "arearange",
        data: lower99Data,
        marker: {
          enabled: false, // Disable markers for this specific series
        },
      },
    ],
  };

  // console.log("Lower95 higher 95", lower95Data, lower99Data);

  return (
    <ResponsiveContainer>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </ResponsiveContainer>
  );
};

export default PredictionIntervalGraph;
