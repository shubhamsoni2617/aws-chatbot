import { useAppSelector } from "@/store/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Breadcrumb, Spin } from "antd";
import { useEffect, useState } from "react";
import CardWrapper from "@/components/CardWrapper";
import AreaGradientChart from "@/components/Graphs/DashboardGraphs/AreaGradientChart";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import TurnoverRateGraph from "@/components/Graphs/PredictiveAnalyticsGraphs/TurnoverRateGraph";
import AbsenteeismRatePA from "@/components/Graphs/PredictiveAnalyticsGraphs/AbsenteeismRateGraphPA";
// import GeoChart from "@/components/GeoChart";
import HighChartsOrganizationCharts from "@/components/HighChartsOrganizationChart";
import RotatingGlobeMap from "@/components/NewWorldMap";

const RiskAlertGraphSection = (props: any) => {
  const {
    // mapData,
    compareModalDateReciever,
    filterData,
    revenuePerEmployee,
    mapGeoData,
    turnoverRate,
    absenteeismRate,
    // highlightState,
  } = props;

  const { profileLoading, profileData } = useAppSelector(
    (store) => store.profile
  );

  const {isLoadingTurnoverRate, isLoadingAbsenteesimRate, isLoadingRevenuePerEmployee} =useAppSelector(store => store.companyPerformanceData)
  const [searchParams, setSearchParams] = useSearchParams();
  const [geoChartLoading, setGeoChartLoading] = useState(false);
  const [localFilterByCountry, setLocalFilterByCountry] = useState(
    searchParams.get("filterByCountry")
  );

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
      <Breadcrumb
        items={[
          ...(navigationRouteArray[0]
            ? [
                {
                  title: (
                    <div
                      onClick={() => handleBreadCrumNavigation("/predictive-analytics/RiskAlert", "")}
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
                          `/predictive-analytics/RiskAlert`,
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
                          `/predictive-analytics/RiskAlert`,
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

  const createUrlParams = (paramsObj: any) => {
    const searchParams = new URLSearchParams();
    Object.keys(paramsObj).forEach((key) => {
      if (paramsObj[key]) {
        searchParams.append(key, paramsObj[key]);
      }
    });
    return searchParams.toString();
  };

  console.log(profileData); // TODO need to remove this when the API for UserRole has been implemented
  let userRole = "Country Head";
  userRole = "CEO";

  useEffect(() => {
    if (userRole === "Country Head" && !localFilterByCountry) {
      setGeoChartLoading(true);
      const newParams = createUrlParams({ filterByCountry: "India" });
      setSearchParams(newParams);
      setLocalFilterByCountry("India");
      setTimeout(() => setGeoChartLoading(false), 1000); // Simulate loading time
    }
  }, [userRole, localFilterByCountry, setSearchParams]);

  console.log("Map Data", mapGeoData);
  return profileLoading ? (
    <div className="flex justify-center items-center w-full h-[calc(80vh-100px)] bg-background">
      <Spin size="large" tip="Loading..." />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
      <CardWrapper
        classes="flex flex-col col-span-1 sm:col-span-4 lg:col-span-4 xl:col-span-4"
        compareModalDateReciever={compareModalDateReciever}
        heading={MapHeading()}
      >
        {userRole === "CEO" || userRole === "Country Head" ? (
          !filterData.filterByDepartment ? (
            geoChartLoading ? (
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
            <HighChartsOrganizationCharts />
          )
        ) : (
          <HighChartsOrganizationCharts />
        )}
      </CardWrapper>

      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2"
        heading={"Revenue per Employee"}
        predictedValue={revenuePerEmployee?.predictedValue}
        companyAverage={revenuePerEmployee?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingRevenuePerEmployee ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : (
          <>
            <AreaGradientChart
              height={291}
              gradientColor={"#c847e8"}
              data={revenuePerEmployee?.data}
            />
            <div style={{ marginTop: "16px" }}>
              <Legend comparisonYear={2024} year={2025}/>
            </div>
          </>
        )}
      </CardWrapper>

      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3"
        heading={"Turnover Rate"}
        predictedValue={turnoverRate?.predictedValue}
        companyAverage={turnoverRate?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingTurnoverRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : (
          <>
            <TurnoverRateGraph
              data={turnoverRate?.data}
              isReport={false}
              isPercentage={true}
              isReportAndNotCompare={false}
            />
            <Legend comparisonYear={2024} year={2025}/>
          </>
        )}
      </CardWrapper>

      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3"
        heading={"Absenteeism Rate"}
        predictedValue={absenteeismRate?.predictedValue}
        companyAverage={absenteeismRate?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingAbsenteesimRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : (
          <>
            <AbsenteeismRatePA 
              data={absenteeismRate?.data} 
              isReportAndNotCompare={false} 
            />
            <Legend comparisonYear={2024} year={2025}/>
          </>
        )}
      </CardWrapper>
    </div>
  );
};

export default RiskAlertGraphSection;
