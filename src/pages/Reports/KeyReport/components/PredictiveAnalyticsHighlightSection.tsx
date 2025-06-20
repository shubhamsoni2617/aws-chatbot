import BulletPoints from "./BulletPoints";
import DropDownComponent from "./DropDownComponent";
import Heading from "./Heading";

const PredictiveAnalyticsHighlightSection = (props: any) => {
  const { reportsRecommendation } = props;
  return (
    <div>
      <DropDownComponent heading="Predictive Analytics Highlights">
        <div className="mt-[24px]">
          <Heading
            heading="Revamp Employee Retention Strategies"
            color="#1e293b"
          />
          <div className="ml-[20px]">
            {(
              reportsRecommendation?.[0]?.recommendations?.[
                "Revamp Employee Retention Strategies"
              ] ?? []
            ).map((items: string, index: number) => {
              return <BulletPoints key={index} text={items} />;
            })}
          </div>
        </div>

        <div className="mt-[40px]">
          <Heading heading="Improve Employee Engagement" color="#1e293b" />
          <div className="ml-[20px]">
            {reportsRecommendation?.[0]?.["recommendations"]?.[
              "Improve Employee Engagement"
            ]?.map((items: string) => {
              return <BulletPoints text={items} />;
            })}
          </div>
        </div>

        <div className="mt-[40px]">
          <Heading
            heading="Reduce Absenteeism & Stress Levels"
            color="#1e293b"
          />
          <div className="ml-[20px]">
            {reportsRecommendation?.[0]?.["recommendations"]?.[
              "Reduce Absenteeism & Stress Levels"
            ]?.map((items: string) => {
              return <BulletPoints text={items} />;
            })}
          </div>
        </div>

        <div className="mt-[40px]">
          <Heading
            heading="Enhance Career Development & Internal Mobility"
            color="#1e293b"
          />
          <div className="ml-[20px]">
            {reportsRecommendation?.[0]?.["recommendations"]?.[
              "Enhance Career Development & Internal Mobility"
            ]?.map((items: string) => {
              return <BulletPoints text={items} />;
            })}
          </div>
        </div>
      </DropDownComponent>
    </div>
  );
};

export default PredictiveAnalyticsHighlightSection;
