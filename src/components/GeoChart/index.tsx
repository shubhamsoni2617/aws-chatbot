import { useEffect, useMemo, useState } from "react";
import /* Link - preserved for future navigation functionality */ /* useSearchParams - preserved for future URL parameter handling */ "react-router-dom";
import {
  // Alert,
  Button,
  message,
  // Modal,
  /* Popover - preserved for future tooltip functionality */ Spin,
} from "antd";
// import { IoMdPin } from "react-icons/io"; /* Preserved for future map pin functionality */
// import { AiOutlineAim } from "react-icons/ai"; /* Preserved for future location targeting functionality */
// import { IoCloseOutline } from "react-icons/io5"; /* Preserved for future close button functionality */
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import proj4 from "proj4";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getCountryPinLocation,
  getWorldPinLocation,
  setSelectedCountryCodeForUserAndTeams,
} from "./helper";
import {
  drillDownFucntion,
  setInnerFilterCountry,
  // setInnerFilterLoadingRedux,
  setInnerFilterLocationAddress,
  setInnerFilterMarker,
  setInnerFilterState,
  setLocation,
  setMapDataFilterMarkers,
} from "@/store/reducers/user";

import { countries } from "@/utils/countries";
import { LocationMarkerData } from "@/utils/transfromFilterData/transformInnerFilterLocations";
import {
  transformData,
  mapInnerFilterDataToOuterFilter,
  tooltipFormatter,
} from "./geoChartLogic";
import { AnimatePresence, motion } from "framer-motion";
import {
  setSelectedCountryCodeFilter,
  showAllUser,
} from "@/store/reducers/userAndTeams";
import { setRiskAlertLocationPoints } from "@/store/reducers/predictiveAnalytics";
import { Variants } from "framer-motion";
// import { toast } from "react-toastify";

// Initialize Highcharts modules
HighchartsAccessibility(Highcharts);
HighchartsMap(Highcharts);

// Set up proj4 for map projections
if (typeof window !== "undefined") {
  window.proj4 = proj4;
}

// Define TypeScript interface for GeoChart props
// interface GeoChartProps {
//   mapData?: typeof worldMap;
//   markers?: any[];
//   highlightState?: string;
// }

// const GeoChart = (props: GeoChartProps) => {
const GeoChart = () => {
  // const {
  //   /* mapData and markers preserved for future map functionality */
  //   // mapData = worldMap,
  //   // markers,
  //   // highlightState
  // } = props;
  const [selectedMarker, setSelectedMarker] = useState<any>({});
  const [selectedMarkerUserAndTeams, setSelectedMarkerUserAndTeams] =
    useState<any>({});
  const [isUserAndTeamsScreen, setIsUserAndTeamsScreen] = useState<any>(false);
  // const location = useLocation();
  /* Preserved for future URL parameter handling */
  // const params = new URLSearchParams(location.search);
  /* Preserved for future URL parameter handling */
  // const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  // Redux state
  const {
    /* State variables preserved for future drill-down functionality */
    // drillDownEnabled,
    // selectedLocationCountry,
    // selectedLocationState,
    // selectedLocationAddress,
    innerFilterLocationAddress,
    /* innerFilterLocationState - preserved for future state-level filtering */
    innerFilterLocationCountry,
    locationMatrics,
    isLoadingLocationMatrics,
    isLoadingLocations,
    locations,
    innerFilterMarkers,
    mapDataFilterMarkers,
    selectedLocationAddress,
  } = useAppSelector((store) => store.userData);

  useEffect(() => {
    const currPageUrl = window.location.href;
    if (currPageUrl.includes("user-and-team")) {
      setIsUserAndTeamsScreen(true);
    }
  }, []);

  /* Preserved for future navigation linking */
  // const newUrl = `${location.pathname}?${params.toString()}`;

  // Generate marker data based on props

  const mapAnimationVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.04, 0.62, 0.23, 0.98], // Custom cubic bezier easing
      when: "beforeChildren" as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -10,
    transition: {
      duration: 0.4,
    },
  },
};

  const markerData = useMemo(() => {
    if (innerFilterMarkers.length > 0 && !isUserAndTeamsScreen) {
      return getCountryPinLocation(locationMatrics, innerFilterMarkers);
    } else {
      return getWorldPinLocation(locationMatrics);
    }
  }, [locationMatrics?.data?.length, innerFilterMarkers]);

  useEffect(() => {
    const countryNames: string[] = [];
    markerData.forEach((marker:any) => {
      if (marker.tooltipName) {
        countryNames.push(marker.tooltipName);
      }
    })
    dispatch(setRiskAlertLocationPoints(countryNames as string[]));
  }, markerData)

  useEffect(() => {
    if (isUserAndTeamsScreen) {
      const countryCode = setSelectedCountryCodeForUserAndTeams(
        locationMatrics,
        selectedMarkerUserAndTeams
      );
      // console.log(
      //   "Selected country code for User and Teams:",
      //   countryCode
      // );
      if (countryCode===null) {
        dispatch(setSelectedCountryCodeFilter(null));
        // dispatch(showAllUser(false));
      } else {
        dispatch(setSelectedCountryCodeFilter(countryCode));
        dispatch(showAllUser(false));
      }
      message.success(
        <span>
          <b>{selectedMarkerUserAndTeams?.point?.tooltipName}</b> selected as
          Country Code for User and Teams
        </span>
      );
    }
  }, [locationMatrics, selectedMarkerUserAndTeams]);

  // Generate country highlight data
  const countryHighlightData = useMemo(() => {
    const data = transformData(mapDataFilterMarkers?.mapData || worldMap);
    // console.log("entry",mapDataFilterMarkers)
    if (!Array.isArray(data)) return []; // Ensure it's an array before mapping

    return data.map((entry) => {
      // console.log("entry",entry["name"])
      return {
        ...entry,
        color:
          entry["name"] === innerFilterLocationAddress?.split("/")[3]
            ? "#D69ADE"
            : "#CDC2D6", // Highlight specific state
        borderColor:
          entry["hc-key"] === innerFilterLocationAddress?.split("/")[3]
            ? "#000000"
            : "#fff", // Add border for clarity
      };
    });
  }, [mapDataFilterMarkers, innerFilterLocationAddress]);

  // Handle marker click event
  const handleMarkerClick = (data: any) => {
    console.log("selected Marker", data?.point?.tooltipName);
  };

  // Handle country click event (new function)
  const handleCountryClick = (countryData: any) => {
    console.log("selected Country", countryData);

    if (isUserAndTeamsScreen) {
      // Find the corresponding marker data for this country
      const correspondingMarker = markerData.find(
        (marker) =>
          marker.tooltipName === countryData.name ||
          marker.tooltipName?.includes(countryData.name)
      );

      if (correspondingMarker) {
        // Create a mock event object similar to marker click
        const mockEvent = {
          point: {
            ...correspondingMarker,
            tooltipName: correspondingMarker.tooltipName || countryData.name,
          },
        };

        // Use the same logic as marker click
        setSelectedMarkerUserAndTeams(mockEvent);
        console.log("Country clicked - mock marker event:", mockEvent);
      } else {
        // If no corresponding marker found, create one based on country data
        const mockEvent = {
          point: {
            tooltipName: countryData.name,
            name: countryData.name,
            // Add any other properties that might be needed
          },
        };

        setSelectedMarkerUserAndTeams(mockEvent);
        console.log("Country clicked - created mock event:", mockEvent);
      }
    }
  };

  const [innerFilterLoading, setInnerFilterLoading] = useState(false);

  const setMarkerData = async () => {
    // console.log("mapInnerFilterDataToOuterFilter, change in location ins executed");
    // setInnerFilterLoading(true);
    const mapDataCountry = countries.find(
      (countryElem: any) => countryElem.name === innerFilterLocationCountry
    );

    dispatch(setMapDataFilterMarkers(mapDataCountry));
    dispatch(
      setInnerFilterMarker(
        await LocationMarkerData(
          locations,
          innerFilterLocationCountry,
          innerFilterLocationAddress,
          setInnerFilterLoading
        )
      )
    );
    // setInnerFilterLoading(false)
  };

  useEffect(() => {
    setMarkerData();
  }, [locations, innerFilterLocationCountry, innerFilterLocationAddress]);

  // Apply filter changes when user clicks the button
  const handleApplyChanges = async (data: any) => {
    const marker = data;
    if (marker?.tooltipName) {
      if (innerFilterLocationCountry) {
        dispatch(setInnerFilterLocationAddress(marker.tooltipName));
        dispatch(setInnerFilterState(marker.tooltipName?.split("/")[3]));
      } else dispatch(setInnerFilterCountry(marker.tooltipName));
    }

    mapInnerFilterDataToOuterFilter["filterByCountry"] =
      innerFilterLocationCountry;
    mapInnerFilterDataToOuterFilter["filterByState"] =
      innerFilterLocationAddress?.split("/")[3];
    mapInnerFilterDataToOuterFilter["filterByAddress"] =
      innerFilterLocationAddress;

    if (mapInnerFilterDataToOuterFilter?.filterByCountry === null) {
      mapInnerFilterDataToOuterFilter["filterByCountry"] = marker?.tooltipName;
    } else {
      mapInnerFilterDataToOuterFilter["filterByState"] =
        marker?.tooltipName?.split("/")[3];
      mapInnerFilterDataToOuterFilter["filterByAddress"] = marker?.tooltipName;
    }

    console.log(
      "mapInnerFilterDataToOuterFilter",
      mapInnerFilterDataToOuterFilter
    );
    dispatch(setLocation(mapInnerFilterDataToOuterFilter));
    dispatch(drillDownFucntion(mapInnerFilterDataToOuterFilter));
  };

  // Drill down content for popover - preserved for future drill-down functionality
  // const content = (
  //   <Link to={newUrl} target="_blank" onClick={handleMarkerClick}>
  //     Drill Down To{" "}
  //     {searchParams.get("filterByCountry")
  //       ? searchParams.get("filterByState")
  //         ? "City"
  //         : "State"
  //       : "Country"}{" "}
  //     View
  //   </Link>
  // );

  // Map configuration

  // useEffect(() => {
  //   console.log("inner filter Loading", innerFilterLoading)
  // },[innerFilterLoading])

  // console.log("mapDataFilterMarkers", structuredClone(mapDataFilterMarkers?.mapData));

  const mapOptions = {
    chart: {
      map: !isUserAndTeamsScreen
        ? Highcharts.maps[mapDataFilterMarkers?.mapData?.title] ||
          JSON.parse(JSON.stringify(mapDataFilterMarkers?.mapData || worldMap))
        : worldMap,
    },
    title: {
      text: "",
    },
    exporting: {
      enabled: false,
      buttons: {
        contextButton: {
          symbol:
            'url(data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" fill="black"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>)',
          symbolSize: 24,
          theme: {
            style: {},
            states: {
              hover: {
                fill: "none",
                stroke: "none",
              },
              select: {
                fill: "none",
                stroke: "none",
              },
            },
          },
          x: 30, // Horizontal offset
          y: 10, // Vertical offset
        },
      },
    },
    mapNavigation: {
      enabled: false,
      enableButtons: true,
      buttonOptions: {
        align: "right",
        x: 7,
        verticalAlign: "bottom",
        theme: {
          fill: "#fff",
          stroke: "#bcc0c4", // Light gray border
          "stroke-width": 1,
          style: {
            color: "#000",
            fontWeight: "bold",
          },
          r: 5, // Border radius for rounded buttons
        },
      },
    },
    mapView: {
      maxZoom: -2,
    },
    tooltip: {
      useHTML: true,
      formatter: tooltipFormatter,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      shadow: true,
      padding: 0, // We handle padding in the formatter
      crosshairs: false,
      shape: "rect",
    },
    plotOptions: {
      map: {
        inactiveOtherPoints: false,
        states: {
          inactive: {
            opacity: 1,
          },
          hover: {
            borderColor: "#FF5733", // Color for border when hovered
            borderWidth: 2, // Thickness of the highlighted border
          },
        },
      },
      series: {
        enableMouseTracking: true,
        allowPointSelect: true,
      },
    },
    point: {
      event: {
        click: (e: any) => {
          console.log("point clicked", e);
        },
      },
    },
    series: [
      {
        name: "Country",
        data: countryHighlightData,
        borderColor: "#eee",
        color: "#CDC2D6",
        nullColor: "#CDC2D6",
        showInLegend: false,
        dataLabels: {
          enabled: false,
          format: "{point.name}",
          style: {
            fontSize: "8px",
            fontWeight: "400",
            color: "#000",
            textOutline: "none",
          },
        },
        states: {
          hover: {
            borderColor: "#471E68", // Highlight border color
            color: "#bca1c5",
            borderWidth: 1, // Highlight border width
          },
        },
        // Add click event for countries when isUserAndTeamsScreen is true
        point: {
          events: {
            click: function () {
              if (isUserAndTeamsScreen) {
                console.log("Country clicked:", this);
                handleCountryClick(this);
              }
            },
          },
        },
      },
      {
        type: "mappoint",
        name: "Markers",
        showInLegend: false,
        data: isUserAndTeamsScreen ? [] : markerData, // Hide markers when isUserAndTeamsScreen is true
        marker: {
          height: 5,
          width: 5,
        },
        cursor: "pointer",
        point: {
          events: {
            click: (e: any) => {
              if (!isUserAndTeamsScreen) {
                handleMarkerClick(e);
                // Set the selected marker for the popup display

                if (!selectedLocationAddress) {
                  setSelectedMarker(e.point);
                  handleApplyChanges(e.point);
                }
                // console.log("id drilldown enabled", drillDownEnabled);
                else {
                  // Create a notification or alert that will be visible

                  // Or use Antd's message API
                  message.warning(
                    "You have reached the deepest drill-down level available."
                  );

                  // toast.warning("You have reached the deepest drill-down level available.");
                }
              } else {
                // dispatch(setSelectedCountryCodeFilter(e.point))
                // setSelectedCountryUserAndTeams
                // setSelectedCountryCodeForUserAndTeams(locationMatrics, e.point.tooltipName);
                setSelectedMarkerUserAndTeams(e);
                console.log(e.point);
              }
              console.log(e);
            },
          },
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="map-container w-full">
      {isLoadingLocationMatrics || isLoadingLocations || innerFilterLoading ? (
        <div className=" flex justify-center items-center bg-white bg-opacity-70">
          <Spin
            size="large"
            tip="Loading..."
            spinning={
              isLoadingLocationMatrics ||
              isLoadingLocations ||
              innerFilterLoading
            }
          />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            className="map-container"
            variants={mapAnimationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`${innerFilterLocationCountry}-${innerFilterLocationAddress}`} // This forces re-render on location change
          >
            <HighchartsReact
              highcharts={Highcharts}
              options={mapOptions}
              constructorType={"mapChart"}
            />
            <section className="absolute bottom-12">
              {selectedMarker?.color ? (
                <motion.div
                  className="border rounded-lg p-4 shadow-md bg-white w-full max-w-md flex flex-col justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button>Apply changes</Button>
                </motion.div>
              ) : null}
            </section>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default GeoChart;
