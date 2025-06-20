import CardWrapper from "@/components/CardWrapper";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import RoundedBarGraph from "@/components/Graphs/DashboardGraphs/RoundedBarGraph";
import NoData from "@/components/NoData";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const AbsernteeismRateCard = (props:any) => {
    const {absenteeismRate,compareModalDateReciever} = props;
    const {isLoadingAbsenteesimRate} = useAppSelector(store => store.companyPerformanceData);
    const {periodSelected} = useAppSelector(store => store.userData);
    const currentYear = new Date().getFullYear();
    return(
        <CardWrapper
        classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3 h-[414px]"
        heading={"Absenteeism Rate"}
        predictedValue={absenteeismRate?.predictedValue}
        companyAverage={absenteeismRate?.companyAverage}
        compareModalDateReciever={compareModalDateReciever}
      >
        {isLoadingAbsenteesimRate ? (
          <Spin className="h-[250px] flex justify-center items-center" />
        ) : absenteeismRate?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <RoundedBarGraph
              data={absenteeismRate?.data}
              isReportAndNotCompare={false}
            />
            <Legend year={periodSelected} comparisonYear={currentYear - 1} />
          </>
        )}
      </CardWrapper>
    )
}

export default AbsernteeismRateCard;