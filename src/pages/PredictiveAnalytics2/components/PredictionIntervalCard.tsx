import CardWrapper from "@/components/CardWrapper";
import PredictionIntervalGraph from "@/components/PredictionIntervalChart";
import LegendPredictionInterval from "@/components/PredictionIntervalChart/LegendPredictionInterval";
import UIButton from "@/components/ui/UIButton";

const PredictionIntervalCard = (props:any) => {
    const {heading, dataKeyMapping, dataKeyMappingInitialApiData} = props;
  return (
    <CardWrapper classes="md:h-[400px] h-[450px] mt-[16px] mb-[16px]">
      <div className="RiskAssesmentText flex flex-col md:flex-row justify-between mb-[25px]">
        <div style={{ fontWeight: "700", fontSize: "18px" }}>
          Prediction Interval
        </div>

        <div className="mt-[16px] md:mt-0">
          <UIButton
            background="#C847E8"
            text="Risk Alert"
            color="#fff"
            borderColor="#C847E8"
            onClick={() => {}}
          />
        </div>
      </div>
      <PredictionIntervalGraph
        heading={heading || ""}
        data={dataKeyMapping}
        dataKeyMappingInitialApiData={dataKeyMappingInitialApiData}
      />
      <LegendPredictionInterval />
    </CardWrapper>
  );
};

export default PredictionIntervalCard;
