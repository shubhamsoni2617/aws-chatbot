import { useAppSelector } from "@/store/hooks";
import { transfromCountryFilter } from "@/utils/transfromFilterData/transformInnerFilterLocations";
import { Select } from "antd";
import { useMemo, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const CountryDropdown = (props: any) => {
  const { countrySelected, setCountrySelected,setCountryIds } = props;
  const { locations } = useAppSelector((store) => store.userData);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const transformedLocations = useMemo(
    () =>
      Array.isArray(locations)
        ? transfromCountryFilter(locations)
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [locations]
  );
  // console.log("countrySelected data inthis page", countrySelected);
  return (
    <Select
      suffixIcon={
        openDropdown === "countrySelected" ? (
          <GoChevronUp size={16} />
        ) : (
          <GoChevronDown size={16} />
        )
      }
      className={`${
        props.className ? props.className : "w-[80px]"
      } !border-none !shadow-none !bg-transparent custom-no-border-select`}
      placeholder="All"
      onChange={(value: string) => {
        const locationsOfSelectedCountries = locations?.filter((item:any) => item?.country_name === value);
        setCountryIds(locationsOfSelectedCountries?.map((item:any) => item?.external_id));
        setCountrySelected(value);
        // console.log("countrySelected data inthis page", value);
      }}
      value={countrySelected}
      options={transformedLocations?.data?.map((item: any) => ({
        value: item.label,
        label: item.label,
      }))}
      onDropdownVisibleChange={(open) => {
        setOpenDropdown(open ? "countrySelected" : null);
      }}
      style={{
        border: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default CountryDropdown;
