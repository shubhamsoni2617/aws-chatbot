import { Spin } from "antd";
import EngagementRow from "../../EngagementRow";
import { useAppSelector } from "@/store/hooks";

const EngagementSteps = (props:any) => {
    const{ heading } = props;
  const { engagementData } = useAppSelector(
    (store) => store.predictiveAnalytics as any
  );
  const { isEngagementLoading } = useAppSelector(
    (store) => store.predictiveAnalytics
  );
  return (
    <div className=" flex flex-col justify-center w-full">
      <Spin spinning={isEngagementLoading}>
        {engagementData?.engagement_data?.length !== 0 && (
          <div
            style={{
              fontWeight: "400",
              fontSize: "14px",
              color: "#475569",
            }}
          >
            Based on the predictions, here are recommended actions to address
            the forecasted trends:
          </div>
        )}
        {
          engagementData?.engagement_data?.map((item: any, i: any) => {
            // console.log("engagement Pagedata", item);
            // indexNumber = i + 1;
            return (
              <EngagementRow
                number={i + 1}
                topic={item?.step_name}
                status={item?.status}
                description={item?.description}
                engagementId={item?.engagement_id}
                kpi={heading}
              />
            );
          })
          // console.log("engagement Pagedata",engagementData?.engagement_data)
        }
      </Spin>
    </div>
  );
};
export default EngagementSteps;
