import CardWrapper from "@/components/CardWrapper";
import GeoChart from "@/components/GeoChart";
import HighChartsOrganizationCharts from "@/components/HighChartsOrganizationChart";
import MapFilterConatiner from "@/components/MapFilterComponent";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

const fadeVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const WorlMapCard = (props: any) => {
  const [innerFilterLoading, setInnerFilterLoading] = useState(false);
  const {
    innerFilterMarkers,
    innerFilterDepartment,
    innerFilterLocationAddress,
    innerFilterLocationCountry,
  } = useAppSelector((store) => store.userData);
  const { setInnerFilterHighlightedState } = props;

  const GeoChartConditionalRendering = useMemo(() => {
    let key = "default";
    let chartComponent: JSX.Element;

    // console.log("Final markers: for inner dropdowns fff", innerFilterMarkers,innerFilterDepartment);

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
          className="w-full h-full overflow-hidden"
        >
          {chartComponent}
        </motion.div>
      </AnimatePresence>
    );
  }, [
    innerFilterMarkers,
    // innerFilterHighlightedState,
    innerFilterDepartment,
    fadeVariants,
  ]);

  return (
    <CardWrapper
      classes={`flex flex-col col-span-6 sm:col-span-6 lg:col-span-6 xl:col-span-4 h-[455px] `}
      heading={`World Map${
        (innerFilterLocationCountry !== "All" ? innerFilterLocationCountry : "")
          ? " / " + innerFilterLocationCountry
          : ""
      } ${
        innerFilterLocationAddress
          ? " / " + innerFilterLocationAddress?.split("/")[0]
          : // +
            // innerFilterLocationAddress?.split("/")[1]
            ""
      }`}
    >
      <div className="top-2 left-2 z-10 flex flex-row justify-center w-full mt-[-20px]">
        {/* {!showGlobe && ( */}
        <MapFilterConatiner
          setInnerFilterHighlightedState={setInnerFilterHighlightedState}
          // setInnerFilterDepartment={setInnerFilterDepartment}
          setInnerFilterLoading={setInnerFilterLoading}
        />
        {/* )} */}
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
    </CardWrapper>
  );
};

export default WorlMapCard;
