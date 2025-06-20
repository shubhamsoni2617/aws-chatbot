import { GoDotFill } from "react-icons/go";

interface BulletPointsProps {
  text: string;
}

const TextString = ({ data }: { data: string }) => (
  <div className="font-[400] font-[Inter] text-[#1e293b] text-[14px]">{data}</div>
);

const BulletPoints = ({ text }: BulletPointsProps) => {
  return (
    <div className="flex flex-row items-center mt-[16px]">
      <GoDotFill color="#c847e8" style={{ marginRight: "14px" }} size={16} />
      <TextString data={text} />
    </div>
  );
};

export default BulletPoints;
