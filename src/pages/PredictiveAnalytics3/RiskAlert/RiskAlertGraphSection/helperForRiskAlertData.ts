import { companyPerformanceServices } from "@/services";

const end_year = new Date().getFullYear();
export const RiskAlertGraphSectionData = async (
  RiskAlertLocations: any,
  locations: any,
  start_year: any,
  // end_year: any,
  department_id: any
) => {
  // console.log("RiskAlertGraphSectionData props", RiskAlertLocations,locations);

  const locationIds = locations
    .filter((location: any) =>
      RiskAlertLocations.includes(location.country_name)
    )
    .map((location: any) => location?.external_id);

  const turnoverRateRAData = await companyPerformanceServices?.getTurnoverRate({
    org_id: "2",
    location_id: JSON.stringify(locationIds),
    start_year: start_year,
    end_year: end_year,
    department_id: department_id,
  });

  const absenteeismRateRAData =
    await companyPerformanceServices?.getAbsenteeismRate({
      org_id: "2",
      start_year: start_year,
      end_year: end_year,
      department_id: department_id,
      location_id: locationIds,
    });

  console.log(
    "RiskAlertGraphSectionData locationIds",
    turnoverRateRAData,
    absenteeismRateRAData
  );

  // console.log("RiskAlertGraphSectionData", riskAlertLocationPoints);
  return {
    turnoverRateRAData:
      turnoverRateRAData?.status === 200 ? turnoverRateRAData?.data : [],
    absenteeismRateRAData:
      absenteeismRateRAData?.status === 200 ? absenteeismRateRAData?.data : [],
  };
};
