import { Spin } from "antd";
import CardWrapper from "@/components/CardWrapper";
import AreaGradientChart from "@/components/Graphs/DashboardGraphs/AreaGradientChart";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import NoData from "@/components/NoData";

type RevenuePerEmployeeCardProps = {
  isLoadingRevenuePerEmployee: boolean;
  revenuePerEmployee: any;
  periodSelected: number;
  currentYear: number;
  compareModalDateReciever: any;
};

const RevenuePerEmployeeCard = ({
  isLoadingRevenuePerEmployee,
  revenuePerEmployee,
  periodSelected,
  currentYear,
  compareModalDateReciever,
}: RevenuePerEmployeeCardProps) => {
  return (
    <CardWrapper
      classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 h-[455px]"
      heading={"Revenue per Employee"}
      predictedValue={revenuePerEmployee?.predictedValue}
      companyAverage={revenuePerEmployee?.companyAverage}
      compareModalDateReciever={compareModalDateReciever}
    >
      {isLoadingRevenuePerEmployee ? (
        <Spin className="h-[250px] flex justify-center items-center" />
      ) : revenuePerEmployee?.data.length === 0 ? (
        <NoData />
      ) : (
        <>
          <AreaGradientChart
            height={300}
            gradientColor={"#c847e8"}
            data={revenuePerEmployee?.data}
          />
          <div>
            <Legend year={periodSelected} comparisonYear={currentYear - 1} />
          </div>
        </>
      )}
    </CardWrapper>
  );
};

export default RevenuePerEmployeeCard;
