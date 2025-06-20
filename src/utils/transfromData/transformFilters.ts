export const transformDepartmentsFilterData = (apiData: any) => {
    if (!apiData || apiData.length === 0) {
      return { data: [] };
    }
    const departmentsFilterData: any = [];
  
    const uniqueDepartments = new Set<string>();
  
    for (const departmentsData of apiData) {
      if (
        departmentsData.name &&
        !uniqueDepartments.has(departmentsData.name) &&
        departmentsData.name !== null
      ) {
        uniqueDepartments.add(departmentsData.name);
        departmentsFilterData.push({
          label: departmentsData.name,
          key: departmentsData.name,
        });
      }
    }
  
    departmentsFilterData.sort((a: any, b: any) =>
      a.label?.localeCompare(b.label)
    );
  
    // Add "All" option at the beginning
    departmentsFilterData.unshift({ label: "All Departments", key: "All Departments" });
    return {
      data: departmentsFilterData,
    };
  };

  export const transfromLocationsFilterData = (
    apiData: any,
    filterByCountry: any,
    filterByState: any,
    filterByAddress: any
  ) => {
    if (!apiData || apiData.length === 0) {
      return { data: [] };
    }
  
    // console.log("address in Tranform util file", filterByCountry);
    const uniqueCountries = new Set<string>();
    const locationsFilterData: any = [];
  
    // Case 1: No filters applied (all null)
    if (
      filterByCountry === null &&
      filterByState === null &&
      filterByAddress === null
    ) {
      for (const countryData of apiData) {
        if (
          countryData.country_name &&
          !uniqueCountries.has(countryData.country_name) &&
          countryData.country_name !== null
        ) {
          uniqueCountries.add(countryData.country_name);
          locationsFilterData.push({
            label: countryData.country_name,
            key: countryData.country_name,
            id:countryData?.id,
          });
          // console.log("check in tranfrom for id", countryData)
        }
      }
      locationsFilterData.sort((a: any, b: any) =>
        a.label?.localeCompare(b.label)
      );
      locationsFilterData.unshift({ label: "All", key: "All" });
      return { data: locationsFilterData };
    }
  
    // Case 2: Only filterByCountry is set
    if (
      filterByCountry !== null &&
      filterByState === null &&
      filterByAddress === null
    ) {
      for (const countryData of apiData) {
        if (
          countryData.country_name === filterByCountry &&
          !uniqueCountries.has(countryData.state) &&
          countryData !== null &&
          countryData.state !== null
        ) {
          uniqueCountries.add(countryData.state);
          locationsFilterData.push({
            label: countryData.state,
            key: countryData.state,
            id: countryData?.id,
          });
          // console.log("check in tranfrom for id", countryData)
        }
      }
      locationsFilterData.sort((a: any, b: any) =>
        a.label?.localeCompare(b.label)
      );
      locationsFilterData.unshift({ label: "All", key: "All" });
      return { data: locationsFilterData };
    }
  
    // Case 3: filterByCountry and filterByState are set
    if (
      filterByCountry !== null &&
      filterByState !== null &&
      filterByAddress === null
    ) {
      for (const stateData of apiData) {
        const address =
          // stateData.street_1 + " " + stateData.street_2 + " " + stateData.state;
          stateData.street_1 + " " + stateData.street_2 + " " + stateData.state;

          if (
          stateData.state === filterByState &&
          !uniqueCountries.has(address) &&
          stateData.street_1 !== null
        ) {
          locationsFilterData.push({
            label:
              stateData.street_1 +
              "/" +
              stateData.street_2 +
              "/" +
              stateData.state +
              "/" +
              stateData.country_name,
            key:
              stateData.street_1 +
              "/" +
              stateData.street_2 +
              "/" +
              stateData.state +
              "/" +
              stateData.country_name,
              id:stateData?.id,
          });
          // console.log("check in tranfrom for id", countryData)
        }
      }
      locationsFilterData.sort((a: any, b: any) =>
        a.label?.localeCompare(b.label)
      );
      locationsFilterData.unshift({ label: "All", key: "All" });
      return { data: locationsFilterData };
    }
  
    // Case 4: All filters are set
    if (
      filterByCountry !== null &&
      filterByState !== null &&
      filterByAddress !== null
    ) {
      // console.log(
      //   "The last filter data is processed",
      //   filterByAddress + "-" + filterByState + "-" + filterByCountry
      // );
      const streetsArray = filterByAddress?.split("/");
      
      const locationid = apiData?.find((item:any) => (item?.street_1 === streetsArray[0]&& (item?.street_2 ===streetsArray[1] || streetsArray[1]==='null' )) );
      // console.log("this is the strrs array", locationid)
      locationsFilterData.push({
        label: filterByAddress + "/" + filterByState + "/" + filterByCountry,
        key: filterByAddress + "/" + filterByState + "/" + filterByCountry,
        id:locationid?.id
      });
      // console.log("check in tranfrom for id", locationid)
      // console.log("this is the value of locaitons check",locationsFilterData)
      // locationsFilterData.sort((a:any, b:any) => a.label?.localeCompare(b.label));
      locationsFilterData.unshift({ label: "All", key: "All" });
      return { data: locationsFilterData };
    }
  
    // Default return if no conditions match (shouldn't typically reach here given the logic)
    return { data: locationsFilterData };
  };