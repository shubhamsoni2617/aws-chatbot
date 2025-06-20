import DefaultLayout from "@/components/DefaultLayout";
import CircularGauge from "@/components/Graphs/CircularGauge";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";

const CompanyPulse = () => {
  const { loading } = useAppSelector((store) => store.financiaImpact);

  return (
    <DefaultLayout isFilter={false} heading="Company Pulse">
      {loading ? (
        <div className="flex justify-center items-center w-full h-[calc(80vh-100px)] bg-background">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full ">
          <div className="bg-white shadow-sm rounded-xl p-[20px]">
            <CircularGauge score={25} title="Engagement Score:" />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default CompanyPulse;
