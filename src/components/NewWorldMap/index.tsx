import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import * as am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { locationPointerForMap } from "./helper";
import { useAppSelector } from "@/store/hooks";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGlobeView, setLocation } from "@/store/reducers/user";
import "./index.css";
import { message } from "antd";

const RotatingGlobeMap = (props: any) => {
  const { mapData } = props;
  const { locations } = useAppSelector((store) => store.userData);
  const dispatch = useDispatch();

  const handleMapClick = () => {
    dispatch(setGlobeView(false));
  };

  const [locationPoints, setLocationPoints] = useState<any[]>([]);
  const location = useLocation();

  const rootRef = useRef<am5.Root | null>(null);
  const pointSeriesRef = useRef<am5map.MapPointSeries | null>(null);
  const chartRef = useRef<any>(null);
  const rotationRef = useRef<any>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialZoomRef = useRef<number | null>(null);
  const zoomClickedRef = useRef<boolean>(false); // Add this with other refs at the top of the component
  const defaultZoomLevel = useRef<number>(1); // Add this near the top of the component with other refs

  useEffect(() => {
    setLocationPoints(locationPointerForMap(locations));
  }, [locations, mapData]);

  // Helper function to find marker point for a country
  const findMarkerForCountry = (countryName: string) => {
    return locationPoints.find(
      (point) =>
        point.title === countryName ||
        point.country === countryName ||
        // Add more matching logic based on your data structure
        point.name === countryName
    );
  };

  // Helper function to handle country selection (similar to marker click)
  const handleCountrySelection = (countryName: string) => {
    const markerPoint = findMarkerForCountry(countryName);

    if (!markerPoint) {
      // alert(`No office found in ${countryName}`);
      message.warning(
        `No office found in ${countryName}`
      );
      return;
    }

    // Simulate marker click behavior
    const params = new URLSearchParams(location.search);

    if (params.get("filterByCountry")) {
      if (params.get("filterByState")) {
        if (!params.get("filterByAddress")) {
          params.set("filterByAddress", markerPoint.title);
        }
      } else {
        params.set("filterByState", markerPoint.title);
      }
    } else {
      params.set("filterByCountry", markerPoint.title);
    }

    dispatch(
      setLocation({
        filterByCountry: markerPoint.title,
        filterByState: null,
        filterByAddress: null,
      })
    );

    handleMapClick();
  };

  // Update the handleZoomIn function
  const handleZoomIn = useCallback(() => {
    if (chartRef.current) {
      const currentZoom = chartRef.current.get("zoomLevel");

      // Stop rotation when zooming in
      if (rotationRef.current) {
        rotationRef.current.stop();
        rotationRef.current = null;
      }

      if (currentZoom > defaultZoomLevel.current) {
        zoomClickedRef.current = true;
      }

      chartRef.current.zoomIn();
    }
  }, []);

  // Update the handleZoomOut function
  const handleZoomOut = useCallback(() => {
    if (chartRef.current) {
      const currentZoom = chartRef.current.get("zoomLevel");

      if (initialZoomRef.current && currentZoom <= initialZoomRef.current) {
        return;
      }

      chartRef.current.zoomOut();

      // If zooming out to default level, allow rotation to resume
      if (currentZoom <= defaultZoomLevel.current) {
        zoomClickedRef.current = false;

        // Resume rotation after a delay
        if (resumeTimeoutRef.current) {
          clearTimeout(resumeTimeoutRef.current);
        }

        resumeTimeoutRef.current = setTimeout(() => {
          if (!rotationRef.current && !zoomClickedRef.current) {
            const currentRotation = chartRef.current.get("rotationX") || 0;
            rotationRef.current = chartRef.current.animate({
              key: "rotationX",
              from: currentRotation,
              to: currentRotation + 360,
              duration: 30000,
              loops: Infinity,
            });
          }
        }, 1500);
      }
    }
  }, []);

  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        // Keep original size - no padding changes
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        // touchZoom: false, // Disable touch zoom (property removed)
      })
    );

    chartRef.current = chart;

    // Store the initial zoom level
    initialZoomRef.current = chart.get("zoomLevel") ?? null;

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow.default,
      })
    );

    const rotationAnimation = chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 30000,
      loops: Infinity,
    });
    rotationRef.current = rotationAnimation;

    // ========== HOVER EFFECT CONFIGURATION ==========
    // Globe keeps original size, but hover effect only triggers on countries
    // This creates a more precise interaction area without changing globe size

    chart.set("interactive", true);

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
      fill: am5.color("#C380DE"),
      // cursorOverStyle: "pointer", // Add pointer cursor for countries
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });

    // ========== HOVER EFFECT ON COUNTRIES ONLY ==========
    // STOP rotation when hovering over any country (not empty space)
    polygonSeries.mapPolygons.template.events.on("pointerover", function () {
      if (rotationRef.current) {
        rotationRef.current.stop();
        rotationRef.current = null; // Set to null to prevent resume
      }

      // Clear any existing resume timeout
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    });

    // RESUME rotation when mouse leaves any country
    polygonSeries.mapPolygons.template.events.on("pointerout", function () {
      // Don't resume rotation if zoom was clicked
      if (zoomClickedRef.current) {
        return;
      }

      // Clear any existing timeout first
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }

      // Set new timeout to resume rotation
      resumeTimeoutRef.current = setTimeout(() => {
        const currentRotation = chart.get("rotationX") || 0;

        if (!rotationRef.current && !zoomClickedRef.current) {
          rotationRef.current = chart.animate({
            key: "rotationX",
            from: currentRotation,
            to: currentRotation + 360,
            duration: 30000,
            loops: Infinity,
          });
        }
      }, 1500);
    });
    // ===================================================

    // Add click event for countries
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const target = ev.target;
      let countryName = (target.dataItem?.dataContext as { name?: string })
        ?.name;

      if (countryName === "United States") {
        countryName = "United States of America"; // Handle specific case for USA
      }

      console.log("Country clicked:", countryName);
      if (countryName) {
        handleCountrySelection(countryName);
      }
    });

    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color("#EAEAEA"),
      fillOpacity: 0.1,
      strokeOpacity: 0,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {})
    );
    graticuleSeries.mapLines.template.setAll({
      strokeOpacity: 0.1,
      stroke: root.interfaceColors.get("alternativeBackground"),
    });

    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeriesRef.current = pointSeries;

    pointSeries.bullets.push(() => {
      const bullet = am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color("#B950E0"),
          tooltipText: "{title}",
          interactive: true,
        }),
      });

      // bullet.get("sprite").setAll({
      //   cursorOverStyle: "pointer",
      // });

      // Existing marker click handler
      bullet.get("sprite").events.on("click", (ev) => {
        const dataItem = ev.target.dataItem;
        if (dataItem) {
          const params = new URLSearchParams(location.search);
          const tooltipName = (dataItem.dataContext as { title: string }).title;

          if (params.get("filterByCountry")) {
            if (params.get("filterByState")) {
              if (!params.get("filterByAddress")) {
                params.set("filterByAddress", tooltipName);
              }
            } else {
              params.set("filterByState", tooltipName);
            }
          } else {
            params.set("filterByCountry", tooltipName);
          }

          dispatch(
            setLocation({
              filterByCountry: tooltipName,
              filterByState: null,
              filterByAddress: null,
            })
          );

          handleMapClick();
        }
      });

      return bullet;
    });

    // const zoomCoordinates: Record<
    //   string,
    //   { longitude: number; latitude: number; zoomLevel: number }
    // > = {};

    let previousPolygon: any = null;

    // Keep existing polygon active logic but modify it
    polygonSeries.mapPolygons.template.on(
      "active",
      async function (active: any, target: any) {
        if (previousPolygon && previousPolygon !== target) {
          previousPolygon.set("active", false);
        }

        console.log(active);

        if (target && target.get("active")) {
          const countryId = target.dataItem?.dataContext?.id;
          if (typeof countryId === "string") selectCountry(countryId);
        }

        previousPolygon = target;
      }
    );

    function selectCountry(id: string) {
      const dataItem = polygonSeries.getDataItemById(id);
      const target = dataItem?.get("mapPolygon");

      if (target) {
        const centroid = target.geoCentroid();
        if (centroid) {
          rotationRef.current?.stop();

          // // Animation code - commented for future reference
          // chart.animate({
          //   key: "rotationX",
          //   to: -centroid.longitude,
          //   duration: 1500,
          //   easing: am5.ease.inOut(am5.ease.cubic),
          // });
          // chart.animate({
          //   key: "rotationY",
          //   to: -centroid.latitude,
          //   duration: 1500,
          //   easing: am5.ease.inOut(am5.ease.cubic),
          // });
        }

        // // Zoom animation code - commented for future reference
        // setTimeout(() => {
        //   const coordinates = zoomCoordinates[id];
        //   if (coordinates) {
        //     chart.zoomToGeoPoint(coordinates, coordinates.zoomLevel, true);
        //   } else {
        //     if (dataItem) {
        //       polygonSeries.zoomToDataItem(dataItem);
        //     }
        //   }
        // }, 1500);
      }
    }

    // Add these event listeners after chart creation
    const chartBackground = chart.get("background");
    if (chartBackground) {
      chartBackground.events.on("pointerdown", function () {
        if (rotationRef.current) {
          rotationRef.current.stop();
        }
      });
    }

    // Stop rotation on chart drag
    // Drag rotation is already enabled via panX and panY in chart initialization
    chart.events.on("dragged", function () {
      if (rotationRef.current) {
        rotationRef.current.stop();
      }
    });

    // Stop rotation on wheel event (zoom)
    chart.events.on("wheel", function () {
      if (rotationRef.current) {
        rotationRef.current.stop();
      }

      // Get current zoom level after wheel event
      const currentZoom = chart.get("zoomLevel") || 1;

      // If zoomed in beyond default level, stop rotation permanently
      if (currentZoom > defaultZoomLevel.current) {
        if (rotationRef.current) {
          rotationRef.current.stop();
          rotationRef.current = null;
        }
        zoomClickedRef.current = true;
      } else {
        // If back to default zoom level, allow rotation to resume
        zoomClickedRef.current = false;

        // Clear any existing timeout
        if (resumeTimeoutRef.current) {
          clearTimeout(resumeTimeoutRef.current);
        }

        // Set timeout to resume rotation
        resumeTimeoutRef.current = setTimeout(() => {
          if (!rotationRef.current && !zoomClickedRef.current) {
            const currentRotation = chart.get("rotationX") || 0;
            rotationRef.current = chart.animate({
              key: "rotationX",
              from: currentRotation,
              to: currentRotation + 360,
              duration: 30000,
              loops: Infinity,
            });
          }
        }, 1500);
      }
    });

    // Modify the existing click handler on chartdiv
    const chartdiv = document.getElementById("chartdiv");
    if (chartdiv) {
      chartdiv.addEventListener("click", function () {
        if (rotationRef.current) {
          rotationRef.current.stop();
        }
      });
    }

    // You can also add touch events for mobile
    chart.events.on("pointerdown", function () {
      if (rotationRef.current) {
        rotationRef.current.stop();
      }
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
      rootRef.current = null;
      pointSeriesRef.current = null;
      chartRef.current = null;
      // Clear timeout on cleanup
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [location, locationPoints]); // Added locationPoints to dependencies

  useEffect(() => {
    if (pointSeriesRef.current && locationPoints.length > 0) {
      pointSeriesRef.current.data.setAll(locationPoints);
    }
  }, [locationPoints]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        id="chartdiv"
        style={{ width: "100%", height: "100%" }}
        onClick={() => {}}
      />
      <div className="zoom-controls">
        <button className="zoom-button" onClick={handleZoomIn}>
          +
        </button>
        <button className="zoom-button" onClick={handleZoomOut}>
          −
        </button>
      </div>
    </div>
  );
};

export default RotatingGlobeMap;
