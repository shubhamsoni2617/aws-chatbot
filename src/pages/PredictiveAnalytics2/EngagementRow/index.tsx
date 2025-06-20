import { useNavigate } from "react-router-dom";
import UIButton from "@/components/ui/UIButton";
import { Badge } from "antd";
import { taskStatusHelperObjectReverse, taskStatusHelperObjectReverseWarning } from "@/utils/helper/objectValuePairHelper";

type EngagementRowProps = {
  number: string;
  topic: string;
  status: any;
  description:any;
  engagementId: any;
  kpi:any;
  // status:any;
};

const EngagementRow = ({ number, topic ,description,engagementId,status, kpi}: EngagementRowProps) => {
  const navigate = useNavigate();
  const windowLocation = window.location.href;
  const peviousLocation = windowLocation.split("/")[3];

  console.log("locaiton address", peviousLocation);
  const handleNavigateToEngagementScreen = () => {
    navigate('/predictive-analytics/Engagement', {
      state: { number, topic, peviousLocation , description,engagementId, kpi},
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center items-start justify-between mt-[24px] h-[57px] pt-[10px] pb-[10px]">
      <div>
        <div className="flex justify-between items-center gap-[16px]">
          <div className="w-8 h-8 border-[1.5px] border-slate-300 rounded-full flex items-center justify-center text-sm font-normal">
            {number}
          </div>
          <div className=" font-bold text-sm text-[#1e293b] font-[600] text-[14px]">{topic}</div>
        </div>
      </div>
      <div className="flex md:items-center items-start flex-col md:flex-row justify-between  w-full md:w-[auto]">
        <div className="mr-[16px] text-sm my-[16px] md:my-0">
          {/* <span className="inline-block w-3 h-3 rounded-full bg-[#FFC107]"></span>{" "} */}
         {/* {status} */}
         <div>
                <Badge status={taskStatusHelperObjectReverseWarning?.[`${status}`]} text={taskStatusHelperObjectReverse?.[`${status}`]} />     
          </div>

                   
        </div>
        <div className="md:w-[fit-content] w-full">
          <UIButton
            text="Open Task"
            background="#fff"
            color="#C847E8"
            borderColor="#C847E8"
            onClick={handleNavigateToEngagementScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default EngagementRow;
