import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';

// Load the Highcharts More module
HighchartsMore(Highcharts);

const EngagementGauge = ({ score = 45 }: { score: number }) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'gauge',
      plotBackgroundColor: undefined,
      plotBackgroundImage: undefined,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '80%',
    },
    title: {
      text: ''
    },
    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [],
      center: ['50%', '85%'],
      size: '100%',
    },
    yAxis: {
      min: 0,
      max: 100,
      tickPosition: 'inside',
      tickColor: '#fff',
      tickLength: 0,
      tickWidth: 0,
      minorTickInterval: undefined,
      labels: {
        enabled: false,
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 0,
          to: 50,
          color: '#DF5353',
          thickness: 20,
          borderRadius: 10,
        },
        {
          from: 50,
          to: 75,
          color: '#F9C80E',
          thickness: 20,
          borderRadius: 10,
        },
        {
          from: 75,
          to: 100,
          color: '#55BF3B',
          thickness: 20,
          borderRadius: 10,
        },
      ],
    },
    series: [
      {
        type: 'gauge',
        name: 'Engagement',
        data: [score],
        tooltip: {
        //   enabled: false,
        },
        dataLabels: {
          useHTML: true,
          formatter: function (this: Highcharts.PointLabelObject) {
            return `
              <div style="text-align: center;">
                <div style="color: #5a5670; font-size: 16px; margin-bottom: 5px;">Engagement Score:</div>
                <div style="font-size: 28px; color: #1a1d26; font-weight: bold;">${this.point.y}</div>
              </div>
            `;
          },
          y: 20,
          borderWidth: 0,
        },
        dial: {
          radius: '100%',
          backgroundColor: '#55BF3B',
          baseWidth: 8,
          topWidth: 4,
          baseLength: '0%',
          rearLength: '0%',
        },
        pivot: {
          radius: 10,
          backgroundColor: '#fff',
          borderWidth: 3,
          borderColor: '#55BF3B',
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementGauge;
