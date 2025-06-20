import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";

// Enable 3D
Highcharts3D(Highcharts);

const PyramidGradientChart = (props: any) => {
  const { data, graphHeight } = props;
  const chartOptions = {
    chart: {
      type: "columnpyramid",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 0,
        depth: 0,
        viewDistance: 50,
      },
      //   marginTop: 0,
      //   marginBottom: 0,
      height: graphHeight,
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "category",
      categories: ["2023", "2025"],
      crosshair: true,
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
      gridLineWidth: 0, // 👈 this removes vertical grid lines
  lineWidth: 0,     // 👈 this removes the axis line itself (optional)
  tickLength: 0, 
    },
    yAxis: {
      min: 0,
      minRange: 100,
      title: {
        text: "",
      },
      gridLineWidth: 0, // 0 to hide, higher to make bolder
      // gridLineColor: "#ccc", // set your own color
      // gridLineDashStyle: "Dash",
      // skew3d: true,
      style: {
        color: "#615e83",
        fontSize: "12px",
        fontWeight: "400px",

        // fontFamily: 'Arial'
      },
    },
    tooltip: {
      valueSuffix: " m",
    },
    plotOptions: {
      series: {
        colorByPoint: false, // Disable to use custom color per point
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Performace Defecit Impact",
        showInLegend: false,
        data: data,
      },
    ],
    exporting: {
      enabled: false,
    },
  };

  //   useEffect(() => {
  //     // Fix for responsiveness
  //     setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
  //   }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default PyramidGradientChart;
