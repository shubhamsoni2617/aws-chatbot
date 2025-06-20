import CardWrapper from "@/components/CardWrapper";
import AreaChartGraph from "@/components/Graphs/DashboardGraphs/AreaChartGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";

const InternalMobilityCardCPFI = (props:any) => {
    const {transformedData} = props;
    console.log("transformedData?.internalMobilityRate?.data",transformedData?.internalMobilityRate?.data)
  return (
    <>
      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2"
        heading={"Internal Mobility Rate"}
        predictedValue={transformedData?.internalMobilityRate?.predictedValue}
        companyAverage={transformedData?.internalMobilityRate?.companyAverage}
        // compareModalDateReciever={compareModalDateReciever}
      >
        {transformedData?.internalMobilityRate?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <AreaChartGraph
              marginLeft={-10}
              color2023={"#A5B4FF"}
              color2024={"#FCC439"}
              hideAxis={false}
              fillSec={false}
              height={310}
              data={transformedData?.internalMobilityRate?.data}
              isPercentage={true}
            />
            <Legend comparisonYear={2024} year={2025} />
          </>
        )}
      </CardWrapper>
    </>
  );
};

export default InternalMobilityCardCPFI;
