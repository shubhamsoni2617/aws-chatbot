import { Spin } from "antd";
import CardWrapper from "@/components/CardWrapper";
import MapFilterConatiner from "@/components/MapFilterComponent";
import GeoChart from "@/components/GeoChart";
import HighChartsOrganizationCharts from "@/components/HighChartsOrganizationChart";
import RotatingGlobeMap from "@/components/NewWorldMap";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";

type WorldMapCardProps = {
  userRole: string;
  hasFilterParams: boolean;
  isFetching: boolean;
  innerFilterLoading: boolean;
  setInnerFilterHighlightedState: (state: any) => void;
  setInnerFilterLoading: (loading: boolean) => void;
  fadeVariants: any;
  compareModalDateReciever: any;
};

const WorldMapCard = ({
  userRole,
  hasFilterParams,
  isFetching,
  innerFilterLoading,
  setInnerFilterHighlightedState,
  setInnerFilterLoading,
  fadeVariants,
  compareModalDateReciever,
}: WorldMapCardProps) => {

  const {
      isLoadingLocationMatrics,
      showGlobe,
      innerFilterMarkers,
      innerFilterLocationCountry,
      innerFilterLocationAddress,
      innerFilterDepartment,
      // innerFilterLocationState,
    } = useAppSelector((store) => store.userData);
  const GeoChartConditionalRendering = useMemo(() => {
    let key = "default";
    let chartComponent: JSX.Element;

    if (innerFilterDepartment) {
      key = "department";
      chartComponent = <HighChartsOrganizationCharts />;
    } else {
      key = "filteredMarkers";
      chartComponent = <GeoChart />;
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8 }}
          className="w-full h-full overflow-hidden flex flex-row justify-center items-center"
        >
          {chartComponent}
        </motion.div>
      </AnimatePresence>
    );
  }, [innerFilterMarkers, innerFilterDepartment, fadeVariants]);

  return (
    <CardWrapper
      classes={`flex flex-col col-span-1 sm:col-span-4 lg:col-span-4 xl:col-span-4 h-[455px] overflow-hidden ${
        showGlobe && !hasFilterParams
          ? "bg-[radial-gradient(circle,_#fff_0%,_#e5eaf0_100%)]"
          : ""
      }`}
      heading={`World Map${
        (innerFilterLocationCountry !== "All" ? innerFilterLocationCountry : "")
          ? " / " + innerFilterLocationCountry
          : ""
      } ${
        innerFilterLocationAddress
          ? " / " + innerFilterLocationAddress?.split("/")[0]
          : ""
      }`}
      compareModalDateReciever={compareModalDateReciever}
    >
      {userRole === "CEO" || userRole === "Country Head" ? (
        isLoadingLocationMatrics ? (
          <div className="flex justify-center items-center h-[300px]">
            <Spin size="large" tip="Loading GeoChart..." />
          </div>
        ) : !showGlobe ? (
          isFetching ? (
            <Spin
              className="flex flex-row justify-center items-center h-full"
              size="large"
              tip="Loading GeoChart..."
              spinning={innerFilterLoading}
            />
          ) : (
            <div className={` h-full w-full mt-[-20px] flex flex-col gap-[20px]`}>
              <div className={` top-2 left-2 z-100 flex flex-row justify-center w-full `}>
                <MapFilterConatiner
                  setInnerFilterHighlightedState={setInnerFilterHighlightedState}
                  setInnerFilterLoading={setInnerFilterLoading}
                />
              </div>
              {innerFilterLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <Spin size="large" tip="Loading GeoChart..." />
                </div>
              ) : (
                <div className="w-full overflow-hidden h-[370px]">
                  {GeoChartConditionalRendering}
                </div>
              )}
            </div>
          )
        ) : (
          <RotatingGlobeMap />
        )
      ) : (
        <>
          <div className={` top-2 left-2 z-100 flex flex-row justify-center w-full mt-[-20px] `}>
            <MapFilterConatiner
              setInnerFilterHighlightedState={setInnerFilterHighlightedState}
              setInnerFilterLoading={setInnerFilterLoading}
            />
          </div>
          <HighChartsOrganizationCharts />
        </>
      )}
    </CardWrapper>
  );
};

export default WorldMapCard;
