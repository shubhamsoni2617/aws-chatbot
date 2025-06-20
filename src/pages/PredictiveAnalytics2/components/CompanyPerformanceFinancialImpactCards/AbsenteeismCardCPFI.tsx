import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import CardWrapper from "@/components/CardWrapper";
import AbsenteeismRatePA from "@/components/Graphs/PredictiveAnalyticsGraphs/AbsenteeismRateGraphPA";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";
import AbsenteeismCostGraphPA from "@/components/PredictiveAnalytics3graphSection/AreaChartGraphs";
import { transformDataforPredictiveAnalytics } from "../../transformHelper";

const AbsenteeismCardCPFI = () => {
  const { absenteesimRate } = useAppSelector(
    (store) => store.companyPerformanceData
  );
  const { absenteesimCostData } = useAppSelector(
    (store) => store.financiaImpact
  );
  const { periodSelected } = useAppSelector((store) => store.userData);
  const transformedAbsenteeismRate = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        absenteesimRate,
        periodSelected,
        "absenteeism_rate"
      ),
    [absenteesimRate]
  );
  const transformedAbsenteeismCostData = useMemo(
    () =>
      transformDataforPredictiveAnalytics(
        absenteesimCostData,
        periodSelected,
        "absenteeism_cost"
      ),
    [absenteesimCostData]
  );
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <CardWrapper
        // classes="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3"
        classes="graph1"
        heading={"Absenteeism Rate"}
        predictedValue={transformedAbsenteeismRate.predictedValue}
        companyAverage={transformedAbsenteeismRate.companyAverage}
        // compareModalDateReciever={compareModalDateReciever}
      >
        <AbsenteeismRatePA
          data={transformedAbsenteeismRate.data}
          isReportAndNotCompare={false}
        />
        <Legend comparisonYear={2024} year={2025} />
      </CardWrapper>
      <CardWrapper
        // classes="col-span-1 sm:col-span-2 lg:col-span-4"
        classes="graph2"
        predictedValue={transformedAbsenteeismCostData?.predictedValue}
        companyAverage={transformedAbsenteeismCostData?.predictedValue}
        heading={"Absenteeism Cost"}
      >
        {/* <AbsenteeismCostGraphPA
                        marginLeft={0}
                        color2023={"#A5B4FF"}
                        color2024={"#FCC439"}
                        hideAxis={false}
                        fillSec={false}
                        height={310}
                        data={transformedAbsenteeismCostData?.predictedValue}
                        isPercentage={false}
                      /> */}

        <AbsenteeismCostGraphPA
          marginLeft={0}
          color2023={"#A5B4FF"}
          color2024={"#FCC439"}
          hideAxis={false}
          fillSec={false}
          height={250}
          data={transformedAbsenteeismCostData?.data}
          isPercentage={false}
        />
        <Legend comparisonYear={2024} year={2025} />
      </CardWrapper>
    </div>
  );
};

export default AbsenteeismCardCPFI;
