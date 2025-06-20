import CardWrapper from "../CardWrapper";
// import GeoChart from "../GeoChart";

// import HighChartsOrganizationChats from "../HighChartsOrganizationChart";
import { useAppSelector } from "@/store/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Breadcrumb, Spin } from "antd";
import { useEffect, useState } from "react";
import AreaGradientChart from "../Graphs/DashboardGraphs/AreaGradientChart";
import Legend from "../Graphs/DashboardGraphs/Legend";
// import BarGraph from "../Graphs/DashboardGraphs/BarGraph";
import AreaChartGraph from "../Graphs/DashboardGraphs/AreaChartGraph";
// import DualLineGraph from "../Graphs/DashboardGraphs/DualLineGraph";
// import RoundedBarGraph from "../Graphs/DashboardGraphs/RoundedBarGraph";
import AbsenteeismRatePA from "../Graphs/PredictiveAnalyticsGraphs/AbsenteeismRateGraphPA";
import TurnoverRateGraph from "../Graphs/PredictiveAnalyticsGraphs/TurnoverRateGraph";
import RetentionRateGraphPA from "../Graphs/PredictiveAnalyticsGraphs/RetentionRateGraph";
import RotatingGlobeMap from "../NewWorldMap";

const PredictiveAnalyticsCompanyPerformanceGraphSection = (props: any) => {
  const {
    // mapData,
    compareModalDateReciever,
    filterData,
    // mapGeoData,
    retentionRate,
    revenuePerEmployee,
    // highlightState,
    firstYearRetentionRate,
    internalMobilityRate,
    turnoverRate,
    absenteeismRate,
    // isFetching,
  } = props;

  const { profileLoading } = useAppSelector((store) => store.profile);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [geoChartLoading, setGeoChartLoading] = useState(0);
  const [localFilterByCountry, setLocalFilterByCountry] = useState(
    searchParams.get("filterByCountry")
  );
  const { isLoadingLocationMatrics, periodSelected } = useAppSelector(
    (store) => store.userData
  );

  const {
    isLoadingTurnoverRate,
    isLoadingAbsenteesimRate,
    isLoadingFirstYearRetentionRate,
    isLoadingInternalMobilityRate,
    isLoadingRetentionRate,
    isLoadingRevenuePerEmployee,
  } = useAppSelector((store) => store.companyPerformanceData);

  const currentYear = new Date().getFullYear();

  const createUrlParams = (paramsObj: any) => {
    const searchParams = new URLSearchParams();
    Object.keys(paramsObj).forEach((key) => {
      if (paramsObj[key]) {
        searchParams.append(key, paramsObj[key]);
      }
    });
    return searchParams.toString();
  };

  // console.log(profileData); // TODO need to remove this when the API for UserRole has been implemented
  // const userRole = profileData?.["permissions"]?.["pages"][0];
  let userRole = "Country Head";
  userRole = "CEO";

  useEffect(() => {
    if (userRole === "Country Head" && !localFilterByCountry) {
      // setGeoChartLoading(prev=>prev+1);
      const newParams = createUrlParams({ filterByCountry: "India" });
      setSearchParams(newParams);
      setLocalFilterByCountry("India");
      // setTimeout(() => setGeoChartLoading(false), 1000); // Simulate loading time
    }
  }, [userRole, localFilterByCountry, setSearchParams]);

  const navigate = useNavigate();
  const handleBreadCrumNavigation = (
    navigationString: string,
    params: string
  ) => {
    const url = `${navigationString}?${params}`; // Append params to URL
    navigate(url);
    window.location.reload();
  };

  const MapHeading = () => {
    const navigationRoute = searchParams.get("filterByAddress")
      ? "World View" +
        "/" +
        searchParams.get("filterByCountry") +
        "/" +
        searchParams.get("filterByState") +
        "/" +
        searchParams.get("filterByAddress")?.split("-")[0]
      : searchParams.get("filterByState")
      ? "World View" +
        "/" +
        searchParams.get("filterByCountry") +
        "/" +
        searchParams.get("filterByState")
      : searchParams.get("filterByCountry")
      ? "World View" + "/" + searchParams.get("filterByCountry")
      : "World View";
    const navigationRouteArray = navigationRoute.split("/");
    console.log("navigation route", navigationRoute, navigationRouteArray);
    return (
      // <div>{searchParams.get("filterByAddress") ? searchParams.get("filterByCountry") +" / " +searchParams.get("filterByState") + " / "+ searchParams.get("filterByAddress")?.split('-')[0] :searchParams.get("filterByState")? searchParams.get("filterByCountry") +" / " +searchParams.get("filterByState") : searchParams.get("filterByCountry") ? searchParams.get("filterByCountry"): "World View"}</div>
      <Breadcrumb
        items={[
          ...(navigationRouteArray[0]
            ? [
                {
                  title: (
                    <div
                      onClick={() => handleBreadCrumNavigation("/", "")}
                      style={{ cursor: "pointer" }}
                    >
                      {navigationRouteArray[0]}
                    </div>
                  ),
                },
              ]
            : []),
          ...(navigationRouteArray[1]
            ? [
                {
                  title: (
                    <div
                      onClick={() =>
                        handleBreadCrumNavigation(
                          `/`,
                          `filterByCountry=${navigationRouteArray[1]}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {navigationRouteArray[1]}
                    </div>
                  ),
                },
              ]
            : []),
          ...(navigationRouteArray[2]
            ? [
                {
                  title: (
                    <div
                      onClick={() =>
                        handleBreadCrumNavigation(
                          `/`,
                          `filterByCountry=${navigationRouteArray[1]}&filterByState=${navigationRouteArray[2]}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {navigationRouteArray[2]}
                    </div>
                  ),
                },
              ]
            : []),
          ...(navigationRouteArray[3]
            ? [{ title: <div>{navigationRouteArray[3]}</div> }]
            : []),
        ]}
      />
    );
  };

  // console.log("Map Data", mapGeoData, mapData);
  return profileLoading ? (
    <div className="flex justify-center items-center w-full h-[calc(80vh-100px)] bg-background">
      <Spin size="large" tip="Loading..." />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
      <CardWrapper
        classes="flex flex-col col-span-1 sm:col-span-4 lg:col-span-4 xl:col-span-4 h-[455px]"
        // companyAverage={"5.2"}
        heading={MapHeading()}
        compareModalDateReciever={compareModalDateReciever}
      >
        {userRole === "CEO" || userRole === "Country Head" ? (
          !filterData.filterByDepartment ? (
            isLoadingLocationMatrics ? (
              <div className="flex justify-center items-center h-[300px]">
                <Spin size="large" tip="Loading GeoChart..." />
              </div>
            ) : (
              // <GeoChart
              //   markers={mapData}
              //   mapData={mapGeoData}
              //   highlightState={highlightState}
              // />
              <RotatingGlobeMap/>
            )
          ) : (
            // <HighChartsOrganizationCharts />
            <></>
          )
        ) : (
          // <HighChartsOrganizationCharts />
          <></>
        )}
        {/* {isLoadingLocationMatrics ? (
          <div className="flex justify-center items-center h-[300px]">
            <Spin size="large" tip="Loading GeoChart..." />
          </div>
        ) : (
          <GeoChart
            markers={mapData}
            mapData={mapGeoData}
            highlightState={highlightState}
          />
        )} */}
      </CardWrapper>

      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 h-[455px]"
        heading={"Revenue per Employee"}
        predictedValue={revenuePerEmployee?.predictedValue}
        companyAverage={revenuePerEmployee?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingRevenuePerEmployee ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : (
          <AreaGradientChart
            height={291}
            gradientColor={"#c847e8"}
            data={revenuePerEmployee?.data}
          />
        )}
        <div style={{ marginTop: "16px" }}>
          <Legend year={periodSelected} comparisonYear={currentYear - 1} />
        </div>
      </CardWrapper>

      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 h-[414px]"
        heading={"Retention Rate"}
        predictedValue={retentionRate?.predictedValue}
        companyAverage={retentionRate?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingRetentionRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : (
          <RetentionRateGraphPA
          data={retentionRate?.data}
          isReport={false}
          isPercentage={true}
        />
        )}
        <Legend year={periodSelected} comparisonYear={currentYear - 1} />
      </CardWrapper>

      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 h-[414px]"
        heading={"First Year Retention Rate"}
        predictedValue={firstYearRetentionRate?.predictedValue}
        companyAverage={firstYearRetentionRate?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingFirstYearRetentionRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : (
          <RetentionRateGraphPA
          data={firstYearRetentionRate?.data}
          isReport={false}
          isPercentage={true}
        />
        )}
        <Legend year={periodSelected} comparisonYear={currentYear - 1} />
      </CardWrapper>

      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 h-[414px]"
        heading={"Internal Mobility Rate"}
        predictedValue={internalMobilityRate?.predictedValue}
        companyAverage={internalMobilityRate?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingInternalMobilityRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : (
          <AreaChartGraph
            marginLeft={-10}
            color2023={"#A5B4FF"}
            color2024={"#FCC439"}
            hideAxis={false}
            fillSec={false}
            height={250}
            data={internalMobilityRate?.data}
            isPercentage={true}
          />
        )}
        <Legend year={periodSelected} comparisonYear={currentYear - 1} />
      </CardWrapper>

      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3 h-[414px]"
        heading={"Turnover Rate"}
        predictedValue={turnoverRate?.predictedValue}
        companyAverage={turnoverRate?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingTurnoverRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : (
          <TurnoverRateGraph
          data={turnoverRate?.data}
          isReport={false}
          isPercentage={true}
          isReportAndNotCompare={false}
        />
        )}
        <Legend year={periodSelected} comparisonYear={currentYear - 1} />
      </CardWrapper>

      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3 h-[414px]"
        heading={"Absenteeism Rate"}
        predictedValue={absenteeismRate?.predictedValue}
        companyAverage={absenteeismRate?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingAbsenteesimRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : (
          <AbsenteeismRatePA data={absenteeismRate?.data} isReportAndNotCompare={false} />

        )}
        <Legend year={periodSelected} comparisonYear={currentYear - 1} />
      </CardWrapper>
    </div>
  );
};

export default PredictiveAnalyticsCompanyPerformanceGraphSection;
