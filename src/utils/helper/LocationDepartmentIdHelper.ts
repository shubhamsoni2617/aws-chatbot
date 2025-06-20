export const DepartemtIdHelper = (departmentsApi: any, departmentName: any) => {
  const department = departmentsApi?.find(
    (item: any) => item?.name === departmentName
  );
  return department?.id;
};

export const LocationIdHelper = (
  locationsApi: any,
  country: any,
  state: any,
  address: any
) => {
  const locationIds: string[] = [];
  if (address) {
    const locationNameArr = address.split("/");
    // console.log(locationNameArr[0]);
    const locationData = locationsApi?.find(
      (item: any) =>
        item?.street_1 === locationNameArr[0]
       &&
        (item?.street_2 === locationNameArr[1] || 'null')
        &&
        item?.city === locationNameArr[2] 
        &&
        item?.state === locationNameArr[3] 
        &&
        item?.country_name === locationNameArr[4]
    );
    locationIds.push(locationData?.external_id);
    // console.log("locationNameArr in all", locationIds);
    return locationIds;
  }

  if (state) {
    locationsApi.forEach((element: any) => {
      if (element.state === state) {
        locationIds.push(element.external_id);
      }
    });

    // console.log("locationNameArr in state", locationIds);
    return locationIds;
  }

  if (country) {
    locationsApi?.forEach((elem: any) => {
      if (elem?.country_name === country) {
        locationIds.push(elem?.external_id);
      }
    });

    // console.log("locationNameArr in country", locationIds);
    return locationIds;
  }

  // console.log("locationNameArr in nothing");
  return [];
};
