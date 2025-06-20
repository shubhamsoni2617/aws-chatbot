import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  transformDepartmentsFilterData,
  // transfromLocationsFilterData, /* Preserved for future complex location filter transformations */
} from "@/utils/transfromData/transformFilters";
// import { countries } from "@/utils/countries";

import { useEffect, useMemo, useState } from "react";

import { Button, Collapse, ConfigProvider, Select, Spin } from "antd";

import { GoChevronDown } from "react-icons/go";
import { useSearchParams } from "react-router-dom";
import { PiGlobeLight } from "react-icons/pi";
import "./index.css";

// import { setGlobeView } from "@/store/reducers/user";
import Notification from "@/components/Notification";

import {
  setDrillDown,
  setGlobeView,
  setDepartment,
  // setInnerFilterCountry,
  setInnerFilterDepartment,
  // setInnerFilterLoadingRedux,
  // setInnerFilterLocationAddress,
  setInnerFilterMarker,
  // setInnerFilterState,
  setLocation,
  setMapDataFilterMarkers,
} from "@/store/reducers/user";

import { DownOutlined } from "@ant-design/icons";
// import { GetLocation } from "@/pages/CompanyPerformance/GetLocationHelper"; /* Preserved for future location helper functionality */
import {
  // LocationMarkerData,
  transfromCountryFilter,
  transfromLocationsFilter,
} from "@/utils/transfromFilterData/transformInnerFilterLocations";
// import { filter } from "d3";
// import { MdFilterBAndW } from "react-icons/md";

const MapFilterConatiner = (props: any) => {
  const {
    // setInnerFilterMarkers,
    // setMapDataFilterMarkers,
    setInnerFilterHighlightedState,
    // setInnerFilterDepartment,
    // setInnerFilterLoading,
  } = props;
  const {
    locations,
    departments,
    innerFilterLocationCountry,
    innerFilterLocationState,
    innerFilterLocationAddress,
    // selectedLocationCountry,
    // selectedLocationAddress
    // innerFilterMarkers,
  } = useAppSelector((store) => store.userData);

  const [filtersParams] = useSearchParams();
  const [filterParameters, setFilterParameters] = useState({
    filterByPeriod: filtersParams.get("filterByPeriod") || "",
    filterByCountry: filtersParams.get("filterByCountry") || "",
    filterByState: filtersParams.get("filterByState") || "",
    filterByAddress: filtersParams.get("filterByAddress") || "",
    filterByDepartment: filtersParams.get("filterByDepartment") || "",
    filterByKpi: filtersParams.get("filterByKpi") || "",
  });

  const [country, setCountry] = useState(filterParameters.filterByCountry);
  const [state, setState] = useState(filterParameters.filterByState);
  const [city, setCity] = useState(
    filterParameters.filterByAddress.split("/")[1] ||
      filterParameters.filterByAddress
  );
  const [filterDepartment, setFilterDepartment] = useState(
    filterParameters.filterByDepartment
  );
  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "warning" as "success" | "info" | "warning" | "error",
    title: "",
    message: "",
  });

  const transformedLocations = useMemo(
    () =>
      Array.isArray(locations)
        ? transfromCountryFilter(locations)
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [locations]
  );

  const transformLocationLocations = useMemo(
    () =>
      Array.isArray(locations)
        ? transfromLocationsFilter(locations, country)
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [locations, country, innerFilterLocationCountry]
  );

  const transformedDepartments = useMemo(
    () =>
      Array.isArray(departments)
        ? transformDepartmentsFilterData(departments)
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [departments]
  );

  const dispatch = useAppDispatch();
  const handleGlobeClick = () => {
    console.log("glopbe icon clicked");
    // setInnerFilterMarker([]);
    // setInnerFilterDepartment("");
    setInnerFilterHighlightedState("");
    setCountry("");
    setState("");
    setCity("");
    setFilterDepartment("");
    dispatch(
      setLocation({
        filterByCountry: null,
        filterByState: null,
        filterByAddress: null,
        // filterByDepartment: "",
      })
    );
    dispatch(setDrillDown(true));
    dispatch(setMapDataFilterMarkers(null));
    dispatch(setDepartment(null));

    dispatch(setInnerFilterMarker([]));
    dispatch(setGlobeView(true));
    dispatch(setInnerFilterDepartment(null));
  };

  useEffect(() => {
    setCountry(innerFilterLocationCountry);
    setState(innerFilterLocationState);
    setCity(innerFilterLocationAddress);
  }, [
    innerFilterLocationCountry,
    innerFilterLocationState,
    innerFilterLocationAddress,
  ]);

  const handleApplyButton = async () => {
    // dispatch(setInnerFilterLoadingRedux(true));
    // dispatch(setInnerFilterCountry(country === "" || country==='All' ? null : country));
    // dispatch(setInnerFilterState(state === "" ? null : state));
    // dispatch(setInnerFilterLocationAddress(city === "" || city === "All" ? null : city));
    dispatch(
      setLocation({
        filterByCountry: country,
        filterByState: null,
        filterByAddress: city,
        // filterByDepartment: "",
      })
    );
    // const mapDataCountry = countries.find(
    //   (countryElem: any) => countryElem.name === innerFilterLocationCountry
    // );

    // dispatch(setMapDataFilterMarkers(mapDataCountry));

    // console.log("mapDataCountry", mapDataCountry?.mapData);
    // dispatch(
    //   setInnerFilterMarker(
    //     await LocationMarkerData(
    //       locations,
    //       innerFilterLocationCountry,
    //       innerFilterLocationAddress,
    //       setInnerFilterLoading
    //     )
    //   )
    // );
    console.log("on Apply button check", filterParameters, filterDepartment);
    // dispatch(setInnerFilterDepartment(filterDepartment));
    if (filterDepartment === "All Departments") {
      dispatch(setDepartment(null));
    } else {
      dispatch(setDepartment(filterDepartment));
    }
    setInnerFilterHighlightedState(state);

    // dispatch(setInnerFilterLoadingRedux(false));
  };

  // useEffect(() => {
  //   // console.log(innerFilterMarkers, "innerFilterMarkers");
  // }, [innerFilterMarkers]);

  const renderSelect = (
    value: any,
    onChange: any,
    options: any[],
    showSearch = false,
    placehoder: any
  ) => (
    <div className="flex flex-col flex-1 w-full cursor-pointer">
      <ConfigProvider renderEmpty={() => <Spin tip="Loading..." />}>
        <Select
          // dropdownClassName="custom-select-dropdown"
          suffixIcon={<GoChevronDown size={16} />}
          className="custom-rounded-select cursor-pointer"
          placeholder={placehoder}
          value={value}
          onChange={onChange}
          options={options}
          showSearch={showSearch}
          dropdownStyle={{ borderRadius: 4 }}
          onFocus={() => {
            const input = document.querySelector(
              "#disable-autofill-select input"
            );
            if (input) {
              input.setAttribute("autocomplete", "off");
            }
          }}
        />
      </ConfigProvider>
    </div>
  );

  const renderFilter = () => {
    return (
      <>
        {renderSelect(
          country || innerFilterLocationCountry || <div>All</div>,
          (value: string) => {
            setFilterParameters((prev: any) => ({
              ...prev,
              filterByCountry: value,
              filterByState: "",
              filterByAddress: "",
              // filterByDepartment: prev.filterByDepartment
            }));
            // dispatch(setInnerFilterLocationCountry(value))
            // console.log("country name veification for map data",value)
            // dispatch(setInnerFilterCountry(value))
            setCountry(value);
            // dispatch(innerFilterLocationAddress(null))
            setCity("");
          },
          transformedLocations.data.map((item: any) => ({
            value: item.key,
            label: item.label,
          })),
          true,
          <div className="font-[400] text-[14px] text-[#1e293b]">
            Select Country
          </div>
        )}

        {/* {renderSelect(
          innerFilterLocationState || state || <div>All</div>,
          (value: string) => {
            setFilterParameters((prev: any) => ({
              ...prev,
              filterByState: value,
              filterByAddress: "",
            }));
            // setState(value);
            dispatch(setInnerFilterState(value));
          },
          transformedLocationsState.data.map((item: any) => ({
            value: item.key,
            label: item.label,
          })),
          true,
          <div className="font-[400] text-[14px] text-[#1e293b]">
            Select State
          </div>
        )} */}

        {renderSelect(
          city?.split("/")[0] || innerFilterLocationAddress?.split("/")[0] || (
            <div>All</div>
          ),
          (value: string) => {
            setFilterParameters((prev: any) => ({
              ...prev,
              filterByCountry: prev.filterByCountry,
              filterByState: "",
              filterByAddress: value,
              filterByDepartment: prev.filterByDepartment,
            }));
            setCity(value);
            // dispatch(setInnerFilterLocationAddress(value));
          },
          transformLocationLocations.data.map((item: any) => ({
            value: item.key,
            label: item.label,
          })),
          true,
          <div className="font-[400] text-[14px] text-[#1e293b]">
            Select Location
          </div>
        )}

        {renderSelect(
          filterDepartment || <div>All Departments</div>,
          (value: string) => {
            setFilterParameters((prev: any) => ({
              ...prev,
              filterByDepartment: value,
            }));
            setFilterDepartment(value);
          },
          transformedDepartments.data.map((dept: any) => ({
            value: dept.label,
            label: dept.label,
          })),
          true,
          <div className="font-[400] text-[14px] text-[#1e293b]">
            Select Department
          </div>
        )}

        <Button
          className="flex items-center justify-center rounded-full border border-secondary px-[24px] py-[10px] text-secondary md:w-auto w-full h-[36px]"
          onClick={handleApplyButton}
        >
          <div>Apply</div>
        </Button>
      </>
    );
  };

  return (
    <>
      <div className="flex md:flex-row flex-col justify-center items-center md:gap-[8px] gap-[16px] relative w-full z-1000">
        <div className="flex items-center justify-between w-full md:w-auto">
         { location.pathname === "/" && <Button
            className="rounded-[30px] pl-[9px] pr-[9px] h-[36px]"
            onClick={() => handleGlobeClick()}
          >
            <PiGlobeLight size={23} />
          </Button>}
          <div className="flex w-full max-w-[90%] md:hidden">
            <Collapse
              accordion
              className="ml-[8px] border border-[#d9d9d9] rounded-[25px] h-[35px] w-full filter-collapse"
              expandIcon={({ isActive }) => (
                <DownOutlined
                  style={{ color: "#c847e8" }}
                  rotate={isActive ? 180 : 0}
                />
              )}
              items={[
                {
                  key: "1",
                  label: "Select Location",
                  styles: {
                    header: {
                      padding: "5px 16px",
                      backgroundColor: "#FFF",
                      borderRadius: "25px",
                      borderColor: "#d9d9d9",
                      color: "rgba(0, 0, 0, 0.8)",
                    },
                    body: {
                      border: "1px solid #d9d9d9",
                      borderRadius: "5px",
                    },
                  },
                  children: (
                    <div className="flex flex-col gap-[16px]">
                      {renderFilter()}
                    </div>
                  ),
                },
              ]}
              expandIconPosition="end"
            />
          </div>
        </div>
        {window.innerWidth >= 1024 && renderFilter()}
      </div>

      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />
    </>
  );
};

export default MapFilterConatiner;
