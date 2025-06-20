import { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Select, Spin } from "antd";
import { GoChevronDown } from "react-icons/go";
import { useSearchParams } from "react-router-dom";
import {
  // useAppDispatch,
  useAppSelector,
} from "@/store/hooks";
import {
  transformDepartmentsFilterData,
  transfromLocationsFilterData,
} from "@/utils/transfromData/transformFilters";
import { GoChevronUp } from "react-icons/go";

// import { setKpi, setPeriod } from "@/store/reducers/user";

const today = new Date();
const currentYear = today.getFullYear();

const Year = Array.from({ length: 4 }, (_, i) => ({
  label: (currentYear - (i + 1)).toString(),
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

const ReportsFilterView = ({
  // filterParameters,
  // setFilterParameters,
  // isReport,
  // mapDataReload,
  // to,
  // dataForFilterParametersOnParantPage,
  // onClose,
  setPeriodReport,
  setCountryReport,
  setDepartmentReport,
}: any) => {
  const [searchParams] = useSearchParams();

  const [country, setCountry] = useState();
  const [department, setDepartment] = useState();
  const [period, setPeriod] = useState<{ value?: string }>();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  // const dispatch = useAppDispatch();
  const { locations, departments } = useAppSelector((store) => store.userData);

  const transformedLocations = useMemo(
    () =>
      Array.isArray(locations)
        ? transfromLocationsFilterData(
            locations,
            searchParams.get("filterByCountry"),
            searchParams.get("filterByState"),
            searchParams.get("FilterByAddress")
          )
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [locations]
  );

  const transformedDepartments = useMemo(
    () =>
      Array.isArray(departments)
        ? transformDepartmentsFilterData(departments)
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [departments]
  );

  // const isAllOrEmpty = (value: any, param: string) =>
  //   value === "" || value === "All" || value === searchParams.get(param);

  // const shouldShowButton =
  //   isAllOrEmpty(filterParameters.filterByCountry, "filterByCountry") &&
  //   isAllOrEmpty(filterParameters.filterByState, "filterByState") &&
  //   isAllOrEmpty(filterParameters.filterByAddress, "filterByAddress") &&
  //   filterParameters.filterByDepartment === "";

  // const handleApplyButton = () => {
  //   const startYear = filterParameters.filterByPeriod || currentYear - 2;
  //   const kpi = filterParameters.filterByKpi || null;
  //   const urlParams = createUrlParams({
  //     filterByPeriod: filterParameters.filterByPeriod,
  //     filterByCountry: filterParameters.filterByCountry,
  //     filterByState: filterParameters.filterByState,
  //     filterByAddress: filterParameters.filterByAddress,
  //     filterByDepartment: filterParameters.filterByDepartment,
  //     filterByKpi: filterParameters.filterByKpi,
  //   });

  //   window.history.pushState(
  //     null,
  //     "",
  //     `${window.location.pathname}?${urlParams}`
  //   );

  //   mapDataReload({ start_year: parseInt(startYear), end_year: currentYear });
  //   // dispatch(setPeriod(parseInt(startYear)));
  //   dispatch(setKpi(kpi));

  //   if (
  //     filterParameters.filterByCountry &&
  //     filterParameters.filterByCountry !== "All"
  //   ) {
  //     dataForFilterParametersOnParantPage(filterParameters);
  //   }

  //   onClose();
  // };

  useEffect(() => {
    setPeriodReport(period);
    setCountryReport(country);
    setDepartmentReport(department);
    console.log(period, country);
  }, [period, country, department]);
  const renderSelect = (
    label: string,
    value: any,
    onChange: any,
    options: any[],
    showSearch = false
  ) => (
    <div className="flex flex-col gap-1 flex-1">
      <span className="text-[12px] font-[500] text-[#1e293b]">{label}</span>
      <ConfigProvider renderEmpty={() => <Spin tip="Loading..." />}>
        <Select
          suffixIcon={
            openDropdowns[label] ? (
              <GoChevronUp size={16} />
            ) : (
              <GoChevronDown size={16} />
            )
          }
          className="dropdownObject"
          placeholder="All"
          value={value}
          onChange={onChange}
          options={options}
          showSearch={showSearch}
          style={{ width: 640 / 3 }}
          open={openDropdowns[label]} // Add this line to control the open state
          onDropdownVisibleChange={(open) => {
            setOpenDropdowns((prev) => ({
              ...Object.keys(prev).reduce(
                (acc, key) => ({
                  ...acc,
                  [key]: false,
                }),
                {}
              ),
              [label]: open,
            }));
          }}
        />
      </ConfigProvider>
    </div>
  );

  return (
    <div className="flex flex-row justify-stretch w-full gap-4 items-center">
      {renderSelect(
        "Filter by Country",
        country || null,
        setCountry,
        transformedLocations.data.map((item: any) => ({
          value: item.key,
          label: item.label,
        })),
        true
      )}

      {renderSelect(
        "Filter by Period",
        period || null,
        setPeriod,
        Year.map((item) => ({ value: item.label, label: item.label })),
        false
      )}

      {renderSelect(
        "Filter by Department",
        department || null,
        setDepartment,
        transformedDepartments.data.map((dept: any) => ({
          value: dept.label,
          label: dept.label,
        })),
        true
      )}
    </div>
  );
};

export default ReportsFilterView;

// return (
//   <div className="flex flex-row justify-stretch w-full gap-4 items-center">
//     {renderSelect(
//       "Filter by Country",
//       filterParameters.filterByAddress ||
//         filterParameters.filterByState ||
//         filterParameters.filterByCountry ||
//         "All",
//       (value: string) =>
//         searchParams.get("filterByState")
//           ? setFilterParameters((prev: any) => ({
//               ...prev,
//               filterByAddress: value,
//             }))
//           : searchParams.get("filterByCountry")
//           ? setFilterParameters((prev: any) => ({
//               ...prev,
//               filterByState: value,
//             }))
//           : setFilterParameters((prev: any) => ({
//               ...prev,
//               filterByCountry: value,
//             })),
//       transformedLocations.data.map((item: any) => ({
//         value: item.key,
//         label: item.label,
//       })),
//       true // showSearch enabled
//     )}

//     {renderSelect(
//       "Filter by Year",
//       filterParameters.filterByPeriod || undefined,
//       (value: string) =>
//         setFilterParameters((prev: any) => ({
//           ...prev,
//           filterByPeriod: value,
//         })),
//       Year.map((item) => ({ value: item.label, label: item.label }))
//     )}

//     {renderSelect(
//       "Filter by Department",
//       filterParameters.filterByDepartment || "All Departments",
//       (value: string) =>
//         setFilterParameters((prev: any) => ({
//           ...prev,
//           filterByDepartment: value,
//         })),
// transformedDepartments.data.map((dept:any) => ({
//   value: dept.label,
//   label: dept.label,
// })),
//       true // showSearch enabled
//     )}

//     {!isReport &&
//       renderSelect(
//         "Filter by KPI",
//         filterParameters.filterByKpi || undefined,
//         (value: string) =>
//           setFilterParameters((prev: any) => ({
//             ...prev,
//             filterByKpi: value,
//           })),
//         Kpi.map((kpi) => ({
//           value: kpi.label,
//           label: kpi.label,
//         }))
//       )}

//     {shouldShowButton ? (
//       <Button
//         className="flex items-center justify-center rounded-full border border-secondary px-[24px] py-[10px] text-secondary mt-[15px]"
//         onClick={handleApplyButton}

//       >
//         <div >Apply</div>
//       </Button>
//     ) : to ? (
//       <Link
//         className="flex items-center justify-center rounded-full border border-secondary px-[24px] py-[4px] text-secondary mt-[15px]"
//         to={`${to}?${createUrlParams(filterParameters)}`}
//         target="_blank"
//         onClick={() => console.log("clicked")}
//       >
//         <div >Apply</div>
//       </Link>
//     ) : null}
//   </div>
// );
