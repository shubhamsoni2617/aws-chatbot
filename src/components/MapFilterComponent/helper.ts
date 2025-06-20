export const transfromCountryFilter = (locationsApi:any) => {
    if(!locationsApi || locationsApi.length ===0){
        return{data: []};
    }

    const uniqueCountries = new Set<string>();   
    const locationsFilterData: any = [];
    for (const countryData of locationsApi) {
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
        }
      }
    
      locationsFilterData.sort((a:any, b:any) => a.label?.localeCompare(b.label));
      locationsFilterData.unshift({ label: "All", key: "All" });

      return {data: locationsFilterData};
}

export const transfromStateFilter = (locationsApi:any, countryName:any) => {
    if(!locationsApi || locationsApi.length ===0){
        return{data: []};
    }

    const uniqueCountries = new Set<string>();   
    const locationsFilterData: any = [];
    for (const countryData of locationsApi) {
        if (countryData?.country_name === countryName &&
          countryData.state &&
          !uniqueCountries.has(countryData.state) &&
          countryData.state !== null
        ) {
          uniqueCountries.add(countryData.state);
          locationsFilterData.push({
            label: countryData.state,
            key: countryData.state,
            id:countryData?.id,
          });
        }
      }
    
      locationsFilterData.sort((a:any, b:any) => a.label?.localeCompare(b.label));
      locationsFilterData.unshift({ label: "All", key: "All" });

      return {data: locationsFilterData};
}

export const transfromCityFilter = (locationsApi:any, stateName:any) => {
    // console.log("state name for filter", stateName)
    if(!locationsApi || locationsApi.length ===0){
        return{data: []};
    }

    const uniqueCountries = new Set<string>();   
    const locationsFilterData: any = [];
    for (const countryData of locationsApi) {
        if (countryData?.state === stateName &&
          countryData.city &&
          !uniqueCountries.has(countryData.city) &&
          countryData.city !== null
        ) {
          uniqueCountries.add(countryData.city);
          locationsFilterData.push({
            label: countryData.city,
            key: countryData.city,
            id:countryData?.id,
          });
        }
      }
    
      locationsFilterData.sort((a:any, b:any) => a.label?.localeCompare(b.label));
      locationsFilterData.unshift({ label: "All", key: "All" });

      return {data: locationsFilterData};
}

export const LocationMarkerData = async (
  locationsApi: any[],
  countryName: string,
  stateName: string,
  cityName: string,
  setInnerFilterLoading:any
  // apiKey: string
) => {
  const locationList: any[] = [];
  setInnerFilterLoading(true);
  const apiKey = `AIzaSyA3PyHPTNxzbDgu9mwPkF7smCSd9p-EL6U`;
  // Filter locations by country, state, and city

  // console.log("mapInnerFilterDataToOuterFilter,yvuyvugvugvugvhvjhvuyvuy",countryName, stateName, cityName)
  
  if(countryName && stateName && cityName ){
  locationsApi.forEach((location: any) => {
    if (
      location.country_name === countryName &&
      location.state === stateName &&
      location.street_1 === cityName.split('/')[0]
    ) {
      locationList.push(location);
    }
  });
  }

  else if(countryName && !stateName && !cityName){
    locationsApi.forEach((location:any) => {
      if(location.country_name === countryName){
        locationList.push(location);
      }
    })
  }

  if(countryName && stateName && !cityName){
    locationsApi.forEach((location:any) => {
      if(location.country_name === countryName && location.state === stateName){
        locationList.push(location);
      }
    })
  }

  // console.log("Location list for markers", locationList);

  const newMarkers: {
    name: string;
    lat: number;
    lon: number;
    tooltipName: string;
    id: any;
  }[] = [];

  for (const location of locationList) {
    // Construct full address
    const address = `${location.street_1}, ${location.name}, ${location.city}, ${location.state} ${location.zip_code}, ${location.country_name}`;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data?.results[0]?.geometry?.location) {
        const geo = data.results[0].geometry.location;
        if(countryName && !stateName && !cityName) {
          newMarkers.push({
            name: 
            location.state ,
            lat: geo.lat,
            lon: geo.lng,
            tooltipName: location.state ,
            id: location.id,
          })
        }
        else{
        newMarkers.push({
          name: location.street_1 +
          "/" +
          location.street_2 +
          "/" +
          location.state +
          "/" +
          location.country_name,
          lat: geo.lat,
          lon: geo.lng,
          tooltipName: location.street_1 +
          "/" +
          location.street_2 +
          "/" +
          location.state +
          "/" +
          location.country_name,
          id: location.id,
        })
        }

        ;
      } else {
        console.error("No valid location found for:", address);
      }
      
    } catch (error) {
      console.error("Error fetching geocode for:", address, error);
    }
  }
  setInnerFilterLoading(false);
  // console.log("Final markers: for inner dropdowns", newMarkers);
  return newMarkers;
};
