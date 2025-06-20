import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import Cylinder from "highcharts/modules/cylinder";
// import { min } from "lodash";

// Initialize modules
Highcharts3D(Highcharts);
Cylinder(Highcharts);

const CylinderChart = (props: any) => {
  const {
    dataRevenuePerEmployee,
    graphHeight,
    XAxisCategories,
    isPrecentage,
    groupPadding,
    tooltipName,
  } = props;
   
  // console.log("testing x aaxis",XAxisCategories);
  // const hieght = '300px';
  const chartOptions = {
    chart: {
      type: "cylinder",
      options3d: {
        enabled: true,
        alpha: 40,
        beta: 0,
        depth: 0,
        viewDistance: 0,
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
        skew3d: false,
        style: {
          color: "#615e83",
          fontSize: "12px",
          fontWeight: "400px",

          // fontFamily: 'Arial'
        },
        y: 15,
        // x: 0,
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
        },
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject
        ): string {
          const defaultLabel = this.axis.defaultLabelFormatter.call(this);
          return isPrecentage ? defaultLabel + "%" : "£" + defaultLabel;
        },
      },
      gridLineWidth: 0,
    },
    tooltip: {
      useHTML: true,
      formatter: function (
        this: Highcharts.TooltipFormatterContextObject
      ): string {
        return `<b>${tooltipName}</b><br/>${
          isPrecentage ? this.y + "%" : "£" + this.y
        }`;
      },
    },
    plotOptions: {
      series: {
        depth: 25,
        colorByPoint: false,
        pointWidth: 60, // increase this to reduce gap between bars
        groupPadding: groupPadding || 0, // reduces space between groups of bars
        pointPadding: 0,
      },
    },
    exporting: {
      enabled: false,
    },
    series: dataRevenuePerEmployee,
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default CylinderChart;
