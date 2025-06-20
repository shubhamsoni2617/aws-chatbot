import CardWrapper from "@/components/CardWrapper";
import AreaGradientChart from "@/components/Graphs/DashboardGraphs/AreaGradientChart";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";

const RevenuePerEmployeeCPFI = (props:any) => {
    const {transformedData} = props
  return (
    <>
      <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2"
        heading={"Revenue per Employee"}
        predictedValue={transformedData?.revenuePerEmployee?.predictedValue}
        companyAverage={transformedData?.revenuePerEmployee?.companyAverage}
        // compareModalDateReciever={compareModalDateReciever}
      >
        {/* <RadialBarGraph data={transformedRevenuePerEmployee?.data} /> */}

        <AreaGradientChart
          height={291}
          gradientColor={"#c847e8"}
          data={transformedData?.revenuePerEmployee?.data}
        />
        <div style={{ marginTop: "16px" }}>
          <Legend comparisonYear={2024} year={2025} />
        </div>
      </CardWrapper>
    </>
  );
};

export default RevenuePerEmployeeCPFI;