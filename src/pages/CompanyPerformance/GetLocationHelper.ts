

// function normalizeText(input: string): string {
//     return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
//   }
export const GetLocation = async (transformedLocation: any, filterByCountry: any, filterData: any) => {
    if (!transformedLocation.data) {
        // console.log("No location data available.");
        return;
    }

    const newMarkers: {
        name: string;
        lat: number;
        lon: number;
        tooltipName: string;
        id:any;
    }[] = [];

    if (filterByCountry !== null) {
        // console.log("Transformed Locations", transformedLocation.data);
        for (const element of transformedLocation.data) {
            if (element.key !== "All") {
                let location = (element.key);
                // if(filterByCountry!==null && filterByCountry!==""){
                //   location = location+" "+filterByCountry;
                // }
                // console.log("Location items throuhg api",location)
                let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location},+CA&key=AIzaSyA3PyHPTNxzbDgu9mwPkF7smCSd9p-EL6U`;

                try {
                    let lat, lon;
                    const getLatLong = async () => {
                        const response = await fetch(url);
                        const data = await response.json();
                        if (data?.results[0]?.geometry?.location !== null) {
                            const loca = data?.results[0]?.geometry?.location;
                            if (loca) {
                                lat = loca.lat;
                                lon = loca.lng;
                            }                            
                        }
                    };
                    await getLatLong();
                    if (lat === 36.778261 && lon === -119.4179324) {
                        // location = location + " " + filterByCountry;
                        location = (location + " " + filterByCountry);

                        url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location},+CA&key=AIzaSyA3PyHPTNxzbDgu9mwPkF7smCSd9p-EL6U`;
                        await getLatLong();
                    }
                    if (lat !== undefined && lon !== undefined) {
                        newMarkers.push({
                            name: "",
                            lat,
                            lon,
                            tooltipName: element.key.toString(),
                            id:element?.id,
                        });

                        // console.log("id of new markers in function",element);
                    } else {
                        console.error(
                            "Latitude or Longitude is undefined for location:",
                            location
                        );
                    }
                } catch (error) {
                    console.error("Error fetching location for", location, ":", error);
                }
            }
        }
        if (newMarkers.length === 0) {
            const location = filterData.filterByCountry;
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location},+CA&key=AIzaSyA3PyHPTNxzbDgu9mwPkF7smCSd9p-EL6U`;
            try {
                let lat, lon;
                const getLatLong = async () => {
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data?.results[0]?.geometry?.location !== null) {
                        const loca = data?.results[0]?.geometry?.location;
                        if (loca) {
                            lat = loca.lat;
                            lon = loca.lng;
                        }                        
                    }
                };
                await getLatLong();
                if (lat !== undefined && lon !== undefined) {
                    if (filterData.filterByCountry) {
                        newMarkers.push({
                            name: "",
                            lat,
                            lon,
                            tooltipName: filterData.filterByCountry.toString(),
                            id: "",
                        });
                    }
                } else {
                    console.error(
                        "Latitude or Longitude is undefined for location:",
                        location
                    );
                }
            } catch (error) {
                console.error("Error fetching location for", location, ":", error);
            }
        }
        // } else {
        //   if (transformedLocation) {
        //     transformedLocation.data.forEach((item: any) => {
        //       const arr = countriesLocation.find(
        //         (country:any) => country.tooltipName === item.key
        //       );
        //       if (arr) newMarkers.push(arr);
        //     });
        //   }
        // }
    }
    // setMarkers(newMarkers);
    // console.log("new markers data",newMarkers);
    return newMarkers;
};