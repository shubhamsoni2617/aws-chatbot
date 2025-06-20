import { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";

// Initialize 3D module
Highcharts3D(Highcharts);

const ColumnChart = (props: any) => {
  const { dataRevenuePerEmployee, graphHeight, XAxisCategories } = props;
  const chartOptions = {
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 40,
        beta: 0,
        depth: 0,
        viewDistance: 400,
      },
      marginTop: -20,
      marginBottom: 0,
      height: graphHeight,
    },
    title: {
      text: "",
    },
    subtitle: {
      useHTML: false,
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: XAxisCategories,
      title: {
        text: "",
      },
      labels: {
        skew3d: true,
        style: {
          color: "#615e83",
          fontSize: "12px",
          fontWeight: "400px",

          // fontFamily: 'Arial'
        },
        y: 15,
      },
      visible: true,
      gridLineWidth: 0, // 👈 this removes vertical grid lines
      lineWidth: 0, // 👈 this removes the axis line itself (optional)
      tickLength: 0,
    },
    yAxis: {
      min: 0,
      minRange: 100,
      title: {
        text: "",
        margin: 0,
      },
      labels: {
        skew3d: false,
        style: {
          color: "#615e83",
          fontSize: "12px",
          fontWeight: "400px",

          // fontFamily: 'Arial'
        },
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject
        ): string {
          return (this.value ?? 0) + "%"; // Append the percentage sign
        },
      },
      gridLineWidth: 0, // 0 to hide, higher to make bolder
      // gridLineColor: "#ccc", // set your own color
      // gridLineDashStyle: "Dash",
      // // tickInterval: 50000,
    },
    tooltip: {
      headerFormat: "<b>Absenteeism Rate: {category}</b><br>", //Dynamic
    },
    plotOptions: {
      column: {
        groupPadding: 0.2,
        pointPadding: 0.1,
      },
      series: {
        depth: 25,
        colorByPoint: false,
        pointWidth: 35,
      },
    },

    exporting: {
      enabled: false,
    },
    series: dataRevenuePerEmployee,
  };

  useEffect(() => {
    // Ensures chart renders with correct dimensions on load
    setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ColumnChart;
