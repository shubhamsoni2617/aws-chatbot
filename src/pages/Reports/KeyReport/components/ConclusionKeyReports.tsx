import Heading from "./Heading";
import TextString from "./TextString";

const ConclusionKeyReports = (props:any) => {
    const {reportsRecommendation} = props;
  return (
    <div className="mt-[44px]">
      <Heading heading="Conclusion" color="#1e293b" />
      <div className="mt-[16px]">
        <TextString data={reportsRecommendation?.[0]?.["conclusion"]} />
      </div>
    </div>
  );
};

export default ConclusionKeyReports;