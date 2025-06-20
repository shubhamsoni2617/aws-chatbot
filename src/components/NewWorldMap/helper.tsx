
import { transfromLocationsFilterData } from '@/utils/transfromData/transformFilters';
import countryLocations from '../../utils/countriesLocation.json'
import { GetLocationForGlobe } from './GetLocationHelper';
// import store from '@/store'

// [
    // {
    //   geometry: { type: "Point", coordinates: [-74.006, 40.7128] }, // New York
    //   title: "New York"
    // },
//     {
//       geometry: { type: "Point", coordinates: [-0.1276, 51.5072] }, // London
//       title: "London"
//     }
//   ]
interface MapObject {
    geometry: {
        type: "Point";
        coordinates: [number | null | undefined, number | null | undefined];
    };
    title: string | undefined;
}
export const locationPointerForMap = (locations: any) => {
    const mapLocations: MapObject[] = [];
  
    if (!Array.isArray(locations)) {
      console.warn("Expected locations to be an array, but got:", locations);
      return mapLocations;
    }
  
    locations.forEach((location: any) => {
      const elem = countryLocations?.find(
        (data) => data?.tooltipName === location?.country_name
      );
  
      if (!elem || elem?.lon == null || elem?.lat == null) return;
  
      const mapObject: MapObject = {
        geometry: { type: "Point", coordinates: [elem.lon, elem.lat] },
        title: elem.tooltipName,
      };
  
      mapLocations.push(mapObject);
    });
  
    return mapLocations;
  };
  

export const stateLocationPointsForMap = async (locations:any, countryName:any) => {
    const transformLocationData = transfromLocationsFilterData(locations,countryName, null,null);
    const stateLocations = await GetLocationForGlobe(transformLocationData,countryName);
    const mapLocations: MapObject[] = []

    locations?.forEach((location:any) => {
        if(location?.country_name === countryName){
        const elem = stateLocations?.find((data) => data?.tooltipName === location?.state)
        const mapObject: MapObject = {
            geometry: { type: "Point", coordinates: [elem?.lon, elem?.lat] as [number, number] }, // New York
            title: elem?.tooltipName
          }

        mapLocations.push(mapObject);
        }
        // console.log("New map Locations imm main page",elem);

    })
    // console.log("new function map elements ", mapLocations)

    return mapLocations;
}