import greenPin from "../../assets/svg/greenPin-3.svg";
import redPin from "../../assets/svg/redPin-3.svg";
import yellowPin from "../../assets/svg/yellowPin-3.svg";
import countriesLocation from "./../../utils/countriesLocation.json";

export const pins = [
  {
    color: "red",
    icon: redPin,
    description:
      "Revenue per employee is below company average for 10% or more, turnover rate is above company average for 10 % or more, and absenteeism is above company average for 10 % or more.",
  },
  {
    color: "green",
    icon: greenPin,
    description:
      "Revenue per employee is above company average for 10% or more, turnover rate is below company average for 10 % or more, and absenteeism is below company average for 10 % or more.",
  },
  {
    color: "yellow",
    icon: yellowPin,
    description:
      "All 3 relevant parameters (revenue per employee, turnover rate and absenteeism rate) are on the company average or within the range of +/- 10%.",
  },
];


export const getWorldPinLocation = (locationMatrics:any) => {
  const isRiskAlertPage = window.location.pathname.includes("RiskAlert");

  let data = [];

  const newMarkers: {
    [key: string]: {
      name: string;
      lat: number;
      lon: number;
      tooltipName: string;
      abseentism_rate: number;
      turnover_rate: number;
      average_revenue_per_employee: number;
      id: any;
      locationsInCountry: number;
    };
  } = {};

  locationMatrics?.data?.forEach((item: any) => {
    const arr = countriesLocation.find(
      (country) => country.tooltipName === item.country_name
    );
    if (arr) {
      if (!newMarkers[item.country_name]) {
        newMarkers[item.country_name] = {
          name: "",
          lat: arr.lat,
          lon: arr.lon,
          tooltipName: item.country_name,
          abseentism_rate: extractSignedNumber(item.abseentism_rate),
          turnover_rate: extractSignedNumber(item.turnover_rate),
          average_revenue_per_employee: extractSignedNumber(
            item.average_revenue_per_employee
          ),
          id: item.id,
          locationsInCountry: 1,
        };
      } else {
        newMarkers[item.country_name].abseentism_rate += extractSignedNumber(
          item.abseentism_rate
        );
        newMarkers[item.country_name].turnover_rate += extractSignedNumber(
          item.turnover_rate
        );
        newMarkers[item.country_name].average_revenue_per_employee +=
          extractSignedNumber(item.average_revenue_per_employee);
        newMarkers[item.country_name].locationsInCountry += 1;
      }
    }
  });
  const markersInArray = Object.values(newMarkers);

  // console.log(
  //   locationMatrics,
  //   "🚀 ~ locationMatrics?.forEach ~ newMarkers:",
  //   markersInArray,
  //   newMarkers
  // );

  if (markersInArray.length) {
    data = markersInArray?.map((item: any) => ({
      ...item,
      tooltipName: item.tooltipName,
      color: findPinColor(item.tooltipName, newMarkers, locationMatrics)?.color, //TODO condition color
      marker: {
        symbol: `url(${
          findPinColor(item.tooltipName, newMarkers, locationMatrics)?.icon
        })`,
        height: 30,
        width: 30,
      },
      description: findPinColor(item.tooltipName, newMarkers, locationMatrics)
        ?.description,
    }));
  }

  let riskAlertdata = [];
  if(isRiskAlertPage){
    riskAlertdata = data?.filter((items:any) => items?.color==='red');
    return(riskAlertdata);
  }
  return data;
};

export const getCountryPinLocation = (locationMatrics:any, markers:any) => {
  let data = [];
console.log("verifying markres in geo data", markers)
  const newMarkers: {
    [key: string]: {
      name: string;
      lat: number;
      lon: number;
      tooltipName: string;
      abseentism_rate: number;
      turnover_rate: number;
      average_revenue_per_employee: number;
      id: any;
      locationsInCountry: number;
    };
  } = {};

  locationMatrics?.data?.forEach((item: any) => {
    const arr = markers.find(
      (country:any) => country.id === item.id
    );

    console.log("arr in location matrics", arr,item?.turnover_rate)
    if (arr) {
      if (!newMarkers[arr.tooltipName]) {
        newMarkers[arr.tooltipName] = {
          name: "",
          lat: arr.lat,
          lon: arr.lon,
          tooltipName: arr.tooltipName,
          abseentism_rate: extractSignedNumber(item.abseentism_rate),
          turnover_rate: extractSignedNumber(item.turnover_rate),
          average_revenue_per_employee: extractSignedNumber(
            item.average_revenue_per_employee
          ),
          id: item.id,
          locationsInCountry: 1,
        };
      } else {
        newMarkers[arr.tooltipName].abseentism_rate += extractSignedNumber(
          item.abseentism_rate
        );
        newMarkers[arr.tooltipName].turnover_rate += extractSignedNumber(
          item.turnover_rate
        );
        newMarkers[arr.tooltipName].average_revenue_per_employee +=
          extractSignedNumber(item.average_revenue_per_employee);
        newMarkers[arr.tooltipName].locationsInCountry += 1;
      }
    }
  });
  const markersInArray = Object.values(newMarkers);

  // console.log(
  //   // locationMatrics,
  //   "🚀 ~ locationMatrics?.forEach ~ newMarkers:",
  //   markersInArray,
  //   newMarkers,markers
  // );

  if (markersInArray.length) {
    data = markersInArray?.map((item: any) => ({
      ...item,
      tooltipName: item.tooltipName,
      color: findStatePinColor(item.tooltipName, newMarkers, locationMatrics)?.color, //TODO condition color
      marker: {
        symbol: `url(${
          findStatePinColor(item.tooltipName, newMarkers, locationMatrics)?.icon
        })`,
        height: 30,
        width: 30,
      },
      description: findStatePinColor(item.tooltipName, newMarkers, locationMatrics)
        ?.description,
    }));
  }

  console.log("data in geo graph adasdad",data)
  return data;
};

const findStatePinColor = (locationName: string, newMarkers:any, locationMatrics:any) => {
  const data = newMarkers[locationName];

  const clonedPins = structuredClone(pins);

  console.log("data check for maps pin color",locationName,"afsdadsgasdg",newMarkers, "vavafvafva", locationMatrics)


  const avgTurnoverRate = data.turnover_rate / data.locationsInCountry;
  const avgAbsenteeismRate = data.abseentism_rate / data.locationsInCountry;
  const avgRevenuePerEmployee =
    data.average_revenue_per_employee / data.locationsInCountry;

  const companyTurnoverRate = extractSignedNumber(
    locationMatrics.company_turnover_rate
  );
  const companyAbsenteeismRate = extractSignedNumber(
    locationMatrics.company_abseentism_rate
  );
  const companyRevenuePerEmployee = extractSignedNumber(
    locationMatrics.company_average_revenue_per_employee
  );

  const companyRevenueThreshold =
    companyRevenuePerEmployee + 0.1 * companyRevenuePerEmployee;
  const isAvgRevenuePerEmployeeAboveThreshold =
    avgRevenuePerEmployee > companyRevenueThreshold;

  const turnoverRateThreshold = companyTurnoverRate - 0.1 * companyTurnoverRate;
  const isAvgTurnoverRateBelowThreshold =
    avgTurnoverRate < turnoverRateThreshold;

  const absenteeismRateThreshold =
    companyAbsenteeismRate - 0.1 * companyAbsenteeismRate;
  const isAvgAbsenteeismRateBelowThreshold =
    avgAbsenteeismRate < absenteeismRateThreshold;

  const conditionGreen =
    avgRevenuePerEmployee > companyRevenueThreshold &&
    avgTurnoverRate < turnoverRateThreshold &&
    avgAbsenteeismRate < absenteeismRateThreshold;

  const description = `Revenue per employee ${
    avgRevenuePerEmployee?.toFixed(2) || 0
  } is ${
    isAvgRevenuePerEmployeeAboveThreshold ? "above" : "below"
  } company average i.e. ${formattedData(
    companyRevenuePerEmployee
  )}, turnover rate ${formattedData(avgTurnoverRate)}% is ${
    isAvgTurnoverRateBelowThreshold ? "below" : "above"
  } company average i.e ${formattedData(
    companyTurnoverRate
  )}%, and absenteeism rate ${formattedData(avgAbsenteeismRate)}% is ${
    isAvgAbsenteeismRateBelowThreshold ? "below" : "above"
  } company average i.e ${formattedData(companyAbsenteeismRate)}%.`;
  // console.log("🚀 ~ findPinColor ~ description:", description);

  if (conditionGreen) {
    clonedPins[1].description = description;
    return clonedPins[1];
  }

  const yellowRevenueCondition =
    companyRevenueThreshold >= avgRevenuePerEmployee &&
    avgRevenuePerEmployee >=
      companyRevenuePerEmployee - 0.1 * companyRevenuePerEmployee;

  const yellowTurnoverCondition =
    companyTurnoverRate + 0.1 * companyTurnoverRate >= avgTurnoverRate &&
    avgTurnoverRate >= turnoverRateThreshold;

  const yellowAbsenteeismCondition =
    companyAbsenteeismRate + 0.1 * companyAbsenteeismRate >=
      avgAbsenteeismRate && avgAbsenteeismRate >= absenteeismRateThreshold;

  const conditionYellow =
    yellowRevenueCondition &&
    yellowTurnoverCondition &&
    yellowAbsenteeismCondition;

  if (conditionYellow) {
    clonedPins[2].description = description;
    return clonedPins[2];
  }

  clonedPins[0].description = description;

  return clonedPins[0];
};

const extractSignedNumber = (input: any): number => {
  const strInput = String(input);
  const match = strInput.match(/[-+]?\d+/);
  return match ? Number(match[0]) : 0;
};

const findPinColor = (locationName: string, newMarkers:any, locationMatrics:any) => {
  const data = newMarkers[locationName];

  const clonedPins = structuredClone(pins);

  const avgTurnoverRate = data.turnover_rate / data.locationsInCountry;
  const avgAbsenteeismRate = data.abseentism_rate / data.locationsInCountry;
  const avgRevenuePerEmployee =
    data.average_revenue_per_employee / data.locationsInCountry;

  const companyTurnoverRate = extractSignedNumber(
    locationMatrics.company_turnover_rate
  );
  const companyAbsenteeismRate = extractSignedNumber(
    locationMatrics.company_abseentism_rate
  );
  const companyRevenuePerEmployee = extractSignedNumber(
    locationMatrics.company_average_revenue_per_employee
  );

  const companyRevenueThreshold =
    companyRevenuePerEmployee + 0.1 * companyRevenuePerEmployee;
  const isAvgRevenuePerEmployeeAboveThreshold =
    avgRevenuePerEmployee > companyRevenueThreshold;

  const turnoverRateThreshold = companyTurnoverRate - 0.1 * companyTurnoverRate;
  const isAvgTurnoverRateBelowThreshold =
    avgTurnoverRate < turnoverRateThreshold;

  const absenteeismRateThreshold =
    companyAbsenteeismRate - 0.1 * companyAbsenteeismRate;
  const isAvgAbsenteeismRateBelowThreshold =
    avgAbsenteeismRate < absenteeismRateThreshold;

  const conditionGreen =
    avgRevenuePerEmployee > companyRevenueThreshold &&
    avgTurnoverRate < turnoverRateThreshold &&
    avgAbsenteeismRate < absenteeismRateThreshold;

  const description = `Revenue per employee ${
    avgRevenuePerEmployee?.toFixed(2) || 0
  } is ${
    isAvgRevenuePerEmployeeAboveThreshold ? "above" : "below"
  } company average i.e. ${formattedData(
    companyRevenuePerEmployee
  )}, turnover rate ${formattedData(avgTurnoverRate)}% is ${
    isAvgTurnoverRateBelowThreshold ? "below" : "above"
  } company average i.e ${formattedData(
    companyTurnoverRate
  )}%, and absenteeism rate ${formattedData(avgAbsenteeismRate)}% is ${
    isAvgAbsenteeismRateBelowThreshold ? "below" : "above"
  } company average i.e ${formattedData(companyAbsenteeismRate)}%.`;
  // console.log("🚀 ~ findPinColor ~ description:", description);

  if (conditionGreen) {
    clonedPins[1].description = description;
    return clonedPins[1];
  }

  const yellowRevenueCondition =
    companyRevenueThreshold >= avgRevenuePerEmployee &&
    avgRevenuePerEmployee >=
      companyRevenuePerEmployee - 0.1 * companyRevenuePerEmployee;

  const yellowTurnoverCondition =
    companyTurnoverRate + 0.1 * companyTurnoverRate >= avgTurnoverRate &&
    avgTurnoverRate >= turnoverRateThreshold;

  const yellowAbsenteeismCondition =
    companyAbsenteeismRate + 0.1 * companyAbsenteeismRate >=
      avgAbsenteeismRate && avgAbsenteeismRate >= absenteeismRateThreshold;

  const conditionYellow =
    yellowRevenueCondition &&
    yellowTurnoverCondition &&
    yellowAbsenteeismCondition;

  if (conditionYellow) {
    clonedPins[2].description = description;
    return clonedPins[2];
  }

  clonedPins[0].description = description;

  return clonedPins[0];
};

const formattedData = (value: any) => {
  if (!value && value !== 0) {
    return "-";
  }

  if (value == 0) {
    return "0";
  }

  if (Number.isInteger(value)) {
    return value;
  }

  return +value.toFixed(2);
};

export const setSelectedCountryCodeForUserAndTeams = (locationMatrics:any, marker:any) => {
  
  const countryCode = locationMatrics?.data?.find((elem:any) => elem.country_name === marker?.point?.tooltipName)?.country_code;
  // console.log("for user and teams screen check",countryCode);
  if(!countryCode) {
    return null;
   }

  return countryCode;
}
