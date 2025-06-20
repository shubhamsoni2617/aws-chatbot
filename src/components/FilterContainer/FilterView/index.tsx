import {
  useEffect,
  /* useEffect - preserved for future filter synchronization */ useMemo,
  useState,
} from "react";
import { ConfigProvider, Select, Spin, Button } from "antd";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
// import { useSearchParams } from "react-router-dom"; /* Preserved for future URL parameter handling */
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  transformDepartmentsFilterData,
  // transfromLocationsFilterData, /* Preserved for future location filter transformation */
} from "@/utils/transfromData/transformFilters";
import {
  // setCountryList, /* Preserved for future country list state management */
  setDepartment,
  setGlobeView,
  setKpi,
  setLocation,
  setPeriod,
} from "@/store/reducers/user";
import {
  transfromCountryFilter,
  transfromLocationsFilter,
} from "@/utils/transfromFilterData/transformInnerFilterLocations";
// import { toast } from "react-toastify";

const today = new Date();
const currentYear = today.getFullYear();

const Year = Array.from({ length: 3 }, (_, i) => ({
  label: (currentYear - (i + 2)).toString(),
  key: (i + 1).toString(),
}));

// const Kpi = [
//   { label: "Revenue per Employee", key: "Revenue per Employee" },
//   { label: "Turnover Rate", key: "Turnover Rate" },
//   { label: "Absenteeism Rate", key: "Absenteeism Rate" },
// ];

// const createUrlParams = (paramsObj: any) => {
//   const searchParams = new URLSearchParams();
//   Object.entries(paramsObj).forEach(([key, value]) => {
//     if (value) searchParams.append(key, value.toString());
//   });
//   return searchParams.toString();
// };

const FilterView = ({
  filterParameters,
  setFilterParameters,
  // isReport,
  mapDataReload,
  // to,
  dataForFilterParametersOnParantPage,
  onClose,
}: any) => {
  // const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  const {
    locations,
    departments,
    // selectedLocationIds,
    // selectedDepartmentIds,
    selectedLocationCountry,
    // selectedLocationState, /* Preserved for future state-level filtering */
    selectedLocationAddress,
    // countryList, /* Preserved for future country filtering options */
    // stateList, /* Preserved for future state filtering options */
    // addressList, /* Preserved for future address filtering options */
  } = useAppSelector((store) => store.userData);

  // const transformedLocations = useMemo(
  //   () =>
  //     Array.isArray(locations)
  //       ? transfromLocationsFilterData(
  //           locations,
  //           selectedLocationCountry,
  //           selectedLocationState,
  //           selectedLocationAddress
  //         )
  //       : { data: [], companyAverage: "0%", predictedValue: "0%" },
  //   [
  //     locations,
  //     selectedLocationCountry,
  //     selectedLocationState,
  //     selectedLocationAddress,
  //   ]
  // );

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
        ? transfromLocationsFilter(
            locations,
            selectedLocationCountry || filterParameters.filterByCountry
          )
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [locations, filterParameters.filterByCountry, selectedLocationCountry]
  );

  // useEffect(() => {
  //   dispatch(setCountryList(transformedLocations?.data));
  // }, [transformedLocations]);

  const transformedDepartments = useMemo(
    () =>
      Array.isArray(departments)
        ? transformDepartmentsFilterData(departments)
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [departments]
  );

  const handleApplyButton = () => {
    const startYear = filterParameters.filterByPeriod || currentYear - 2;
    const kpi = filterParameters.filterByKpi || null;
    // const urlParams = createUrlParams({
    //   filterByPeriod: filterParameters.filterByPeriod,
    //   filterByCountry: filterParameters.filterByCountry,
    //   // filterByState: filterParameters.filterByState,
    //   filterByState: filterParameters.filterByAddress?.split("/")[3],
    //   filterByAddress: filterParameters.filterByAddress,
    //   filterByDepartment: filterParameters.filterByDepartment,
    //   filterByKpi: filterParameters.filterByKpi,
    // });

    // window.history.pushState(
    //   null,
    //   "",
    //   `${window.location.pathname}?${urlParams}`
    // );
    // console.log("filter parmas chack for location id soo", filterParameters.filterByAddress?.split("/")[3])

    // console.log("on Apply button check", filterParameters);
    mapDataReload({ start_year: parseInt(startYear), end_year: currentYear });
    dispatch(setPeriod(parseInt(startYear)));
    dispatch(setKpi(kpi));
    dispatch(setLocation(filterParameters));
    if(filterParameters?.filterByDepartment !== "All Departments"){
    dispatch(setDepartment(filterParameters?.filterByDepartment));
  }
  else{
    dispatch(setDepartment(null));
  }
    dispatch(setGlobeView(false));
    if (
      filterParameters.filterByCountry &&
      filterParameters.filterByCountry !== "All"
    ) {
      dataForFilterParametersOnParantPage(filterParameters);
    }

    onClose();
  // toast.warning("Task status updated successfully.");
  };

  useEffect(() => {
    if (filterParameters) {
      filterParameters.filterByAddress = selectedLocationAddress;
      filterParameters.filterByCountry = selectedLocationCountry;
    }
    

  },[selectedLocationCountry, selectedLocationAddress])

  const renderSelect = (
    label: string,
    value: any,
    onChange: any,
    options: any[],
    showSearch = false,
    placehoder: any,
    dropdownKey: string,
    disabled = false
  ) => (
    <div className="flex flex-col gap-1 flex-1 w-full cursor-pointer">
      <span className="text-xs">{label}</span>
      <ConfigProvider
        renderEmpty={() => (
          <div className="flex flex-col items-center py-4 text-gray-500">
            {options.length === 0 ? (
              <Spin tip="Loading..." />
            ) : (
              <span>No matches found</span>
            )}
          </div>
        )}
      >
        <Select
          disabled={disabled}
          open={openDropdowns[dropdownKey] || false}
          suffixIcon={
            openDropdowns[dropdownKey] ? (
              <GoChevronUp size={16} />
            ) : (
              <GoChevronDown size={16} />
            )
          }
          className="dropdownObject h-[37px] cursor-pointer"
          placeholder={placehoder}
          value={value}
          onChange={onChange}
          options={options}
          showSearch={showSearch}
          filterOption={(input, option) =>
            (option?.label?.toString().toLowerCase() ?? "").includes(
              input.toLowerCase()
            )
          }
          notFoundContent={
            <div className="flex items-center justify-center py-2 text-gray-500">
              No matches found
            </div>
          }
          onDropdownVisibleChange={(open) => {
            setOpenDropdowns((prev) => {
              const reset = Object.keys(prev).reduce(
                (acc, key) => ({ ...acc, [key]: false }),
                {}
              );
              return {
                ...reset,
                [dropdownKey]: open,
              };
            });
          }}
        />
      </ConfigProvider>
    </div>
  );

  return (
    <div className="flex md:flex-row flex-col justify-center w-full gap-4 items-center">
      {renderSelect(
        "Filter by Country",
        filterParameters.filterByCountry || selectedLocationCountry || (
          <div>All</div>
        ),
        (value: string) =>
          setFilterParameters((prev: any) => ({
            ...prev,
            filterByCountry: value,
            filterByState: "",
            filterByAddress: "",
          })),
        transformedLocations?.data?.map((item: any) => ({
          value: item.key,
          label: item.label,
        })),
        true,
        "All",
        "country"
      )}

      {/* {selectedLocationCountry && renderSelect(
        "Filter by State",
        filterParameters.filterByState || selectedLocationState || <div>All</div>,
        (value: string) =>
          setFilterParameters((prev: any) => ({
            ...prev,
            filterByState: value,
          })),
        stateList.map((item: any) => ({
          value: item.key,
          label: item.label,
        })),
        true,
        "All",
        "state"
      )} */}

      {
        // selectedLocationCountry &&
        renderSelect(
          "Filter by Location",
          filterParameters.filterByAddress?.split("/")[0] ||
            selectedLocationAddress?.split("/")[0] || <div>All</div>,
          (value: string) =>
            setFilterParameters((prev: any) => ({
              ...prev,
              // filterByState: "",
              filterByCountry: value !== "All" ? value?.split("/")[4] : "",
              filterByAddress: value !== "All" ? value : "",
            })
          ),

          transformLocationLocations?.data.map((item: any) => ({
            value:
              // item.key !== "All" ?
              item.key,
            // : ""
            label:
              // item.label !== "All" ?
              item.label,
            // : ""
          })),
          true,
          "All",
          "address"
          // !filterParameters.filterByCountry && !selectedLocationCountry
        )
      }

      {renderSelect(
        "Filter by Year",
        filterParameters.filterByPeriod || undefined,
        (value: string) =>
          setFilterParameters((prev: any) => ({
            ...prev,
            filterByPeriod: value,
          })),
        Year.map((item) => ({ value: item.label, label: item.label })),
        false,
        "2023",
        "year"
      )}

      {renderSelect(
        "Filter by Department",
        filterParameters.filterByDepartment || <div>All Departments</div>,
        (value: string) =>
          setFilterParameters((prev: any) => ({
            ...prev,
            filterByDepartment: value,
          })),
        transformedDepartments.data.map((dept: any) => ({
          value: dept.label,
          label: dept.label,
        })),
        true,
        "All Departments",
        "department"
      )}

      {/* {!isReport &&
        renderSelect(
          "Filter by KPI",
          filterParameters.filterByKpi || undefined,
          (value: string) =>
            setFilterParameters((prev: any) => ({
              ...prev,
              filterByKpi: value,
            })),
          Kpi.map((kpi) => ({
            value: kpi.label,
            label: kpi.label,
          })),
          false,
          "All",
          "kpi"
        )} */}

      <div className="md:w-auto w-full pt-[19px]">
        <Button
          className="flex items-center hover:!text-[#C847E8] hover:!border-[#C847E8] justify-center rounded-full border border-secondary px-[24px] py-[10px] text-secondary w-full h-[37px] w-[86px]"
          onClick={handleApplyButton}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterView;
