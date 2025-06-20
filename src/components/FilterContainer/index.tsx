import {  useState } from "react";
import { Button, Drawer } from "antd";
import { CiFilter } from "react-icons/ci";
import { useLocation, useSearchParams } from "react-router-dom";
import FilterView from "./FilterView";
import "./filter.css";
import {  useAppSelector } from "@/store/hooks";
// import { getOrganizationChartData } from "@/store/actions";

const FilterContainer = (props: any) => {
  const { to, mapDataReload } = props;
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;
  const [open, setOpen] = useState(false);
  const [filtersParams] = useSearchParams();

  const {selectedLocationCountry, selectedLocationAddress} = useAppSelector(store => store?.userData)

  const [filterParameters, setFilterParameters] = useState({
    filterByPeriod: filtersParams.get("filterByPeriod") || "",
filterByCountry: filtersParams.get("filterByCountry") || selectedLocationCountry || "",
    filterByState: filtersParams.get("filterByState") || "",
    filterByAddress: filtersParams.get("filterByAddress") || selectedLocationAddress,
    filterByDepartment: filtersParams.get("filterByDepartment") || "",
    filterByKpi: filtersParams.get("filterByKpi") || "",
  });

  const drawerHeader = () => (
    <div className="flex items-center">
      <CiFilter size={18} color="#C847E8" />
      <span className="text-[#C847E8] text-[14px] font-[400]">Filter</span>
    </div>
  );

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  
  const { profileData } = useAppSelector((store) => store.profile);
  const userName = profileData?.["user"]?.["name"] || "";
  const firstName = userName.split(" ")[0];

  

  return (
    <div className="w-full flex flex-row">
      {/* Large screen filter view */}
      {!props.noFilter && (
        <div className="w-full hidden lg:flex lg:flex-row justify-center items-center">
          <div className="w-full gap-3 pt-[24px] pb-[24px] items-end lg:flex lg:flex-row py-[20px] px-[40px] bg-[#fff]">
            <FilterView
              to={currentUrl}
              setFilterParameters={setFilterParameters}
              filterParameters={filterParameters}
              dataForFilterParametersOnParantPage={
                props.dataForFilterParameters
              }
              mapDataReload={mapDataReload}
              onClose={onClose}
            />
          </div>
        </div>
      )}

      {/* Mobile/tablet filter view */}
      <div className="flex lg:hidden justify-between w-full items-center py-2 px-4 bg-white ">
        {/* <span className="font-semibold text-[20px] font-[600] ">
          {props.heading}
        </span> */}
        {firstName && (
          <span className="font-semibold text-[20px] font-[600] mx-0 md:mx-[30px]">
            Welcome, {firstName}
          </span>
        )}
        {!props.noFilter && (
          <Button
            className="rounded-full border-secondary hover:text-[#C847E8] text-secondary py-2 px-6"
            onClick={showDrawer}
          >
            <CiFilter size={25} color="#C847E8" />
            Filter
          </Button>
        )}

        <Drawer
          title={drawerHeader()}
          onClose={onClose}
          open={open}
          width={240}
          placement="right"
          styles={{
            body: { padding: "16px" },
            header: { padding: "24px 16px 16px 16px", border: "none" },
          }}
          maskClosable={true}
        >
          <div className="flex flex-col gap-4 ">
            <FilterView
              to={to}
              setFilterParameters={setFilterParameters}
              filterParameters={filterParameters}
              onClose={onClose}
              mapDataReload={mapDataReload}
            />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default FilterContainer;
