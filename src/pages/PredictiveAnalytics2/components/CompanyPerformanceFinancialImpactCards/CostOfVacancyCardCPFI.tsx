import CardWrapper from "@/components/CardWrapper";
import BarGraph from "@/components/Graphs/DashboardGraphs/BarGraph";
import Legend from "@/components/Graphs/DashboardGraphs/Legend";

const CostOfVacancyCardCPFI = (props:any) => {
    const{transformedData} = props;
    return (
        <>
              <CardWrapper
                classes="col-span-1 sm:col-span-2 lg:col-span-2"
                companyAverage={transformedData?.costOfVacancy?.companyAverage}
                heading="Cost of Vacancy"
                predictedValue={transformedData?.costOfVacancy?.predictedValue}
              >
                <BarGraph
                  data={transformedData?.costOfVacancy?.data}
                  // isReport={false}
                  isPercentage={false}
                />
                <Legend comparisonYear={2024} year={2025} />
              </CardWrapper>
            </>
    )
}

export default CostOfVacancyCardCPFI;