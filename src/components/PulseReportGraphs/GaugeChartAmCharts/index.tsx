import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const RadarGaugeChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = am5.Root.new(chartRef.current!);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      startAngle: 160,
      endAngle: 380
    }));

    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -40
    });

    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8
    });

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: -40,
      max: 100,
      strictMinMax: true,
      renderer: axisRenderer
    }));

    const axisDataItem = xAxis.makeDataItem({});

    const clockHand = am5radar.ClockHand.new(root, {
      pinRadius: am5.percent(20),
      radius: am5.percent(100),
      bottomWidth: 40
    });

    const bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: clockHand
    }));

    xAxis.createAxisRange(axisDataItem);

    const label = chart.radarContainer.children.push(am5.Label.new(root, {
      fill: am5.color(0xffffff),
      centerX: am5.percent(50),
      textAlign: "center",
      centerY: am5.percent(50),
      fontSize: "3em"
    }));

    axisDataItem.set("value", 50);

    bullet.get("sprite")?.on("rotation", () => {
      const value = axisDataItem.get("value") ?? 0;
      let fill = am5.color(0x000000);

      xAxis.axisRanges.each((range :any) => {
        const start = range.get("value");
        const end = range.get("endValue");

        if (value >= start && value <= end) {
          const axisFill = range.get("axisFill");
          const fillColor = axisFill?.get("fill");
          if (fillColor) {
            fill = fillColor;
          }
        }
      });

      label.set("text", Math.round(value).toString());

      clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) });
      clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) });
    });

    const interval = setInterval(() => {
      axisDataItem.animate({
        key: "value",
        to: Math.round(Math.random() * 140 - 40),
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic)
      });
    }, 2000);

    chart.bulletsContainer.set("mask", undefined);

    const bandsData = [
      { title: "Unsustainable", color: "#ee1f25", lowScore: -40, highScore: -20 },
      { title: "Volatile", color: "#f04922", lowScore: -20, highScore: 0 },
      { title: "Foundational", color: "#fdae19", lowScore: 0, highScore: 20 },
      { title: "Developing", color: "#f3eb0c", lowScore: 20, highScore: 40 },
      { title: "Maturing", color: "#b0d136", lowScore: 40, highScore: 60 },
      { title: "Sustainable", color: "#54b947", lowScore: 60, highScore: 80 },
      { title: "High Performing", color: "#0f9747", lowScore: 80, highScore: 100 }
    ];

    bandsData.forEach(data => {
      const axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));

      axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore
      });

      axisRange.get("axisFill")?.setAll({
        visible: true,
        fill: am5.color(data.color),
        fillOpacity: 0.8
      });

      axisRange.get("label")?.setAll({
        text: data.title,
        inside: true,
        paddingTop: 15,
        fontSize: "0.9em",
        fill: root.interfaceColors.get("background")
      });
    });

    chart.appear(1000, 100);

    return () => {
      clearInterval(interval);
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default RadarGaugeChart;
