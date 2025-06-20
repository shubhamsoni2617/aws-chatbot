import BulletPoints from "./BulletPoints";
import Heading from "./Heading";

const KeyTakeAwaySection = (props: any) => {
  const { reportsRecommendation } = props;
  return (
    <div className="mt-[40px]">
      <Heading heading="Key Takeaway" color="#1e293b" />
      {Array.isArray(reportsRecommendation?.[0]?.["key_takeaways"]) &&
        (reportsRecommendation?.[0]?.["key_takeaways"] as string[]).map(
          (item: string, idx: number) => {
            return <BulletPoints key={idx} text={item} />;
          }
        )}
    </div>
  );
};

export default KeyTakeAwaySection;
