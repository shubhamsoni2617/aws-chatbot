import { Tabs, TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "@/components/DefaultLayout";
import KeyReportComponent from "./KeyReport";
import CreateReport from "./CreateReport";
import { useAppSelector } from "@/store/hooks";
import FilterContainer from "@/components/FilterContainer";

const KeyReports = () => {
  const { reportsCount, starReportCount } = useAppSelector(
    (store) => store.reportsData
  ) as any;
  type LabelProps = {
    label: string;
    number: string;
  };

  const TabsLabel = (props: LabelProps) => {
    const { label, number } = props;
    return (
      <div className="flex flex-row gap-[8px]">
        <div className="font-[500] text-[14px] text-[#475569] ml-[16px]">
          {label}
        </div>
        <div className="font-[500] text-[14px] text-[#c847e8] mr-[16px]">
          {number}
        </div>
      </div>
    );
  };
  const navigate = useNavigate();

  const items: TabsProps["items"] = [
    {
      key: "/key-report",
      label: <TabsLabel label="Key Reports" number="10" />,
    },
    {
      key: "/my-report",
      label: <TabsLabel label="My Reports" number={reportsCount?.toString()} />,
    },
    {
      key: "/saved-report",
      label: <TabsLabel label="Saved" number={starReportCount?.toString()} />,
    },
  ];

  const location = useLocation();

  const onChange = (key: string) => {
    navigate(key);
  };


  return (
    <DefaultLayout
      FilterComponent={
        <FilterContainer heading="Reports" mapDataReload={() => {}} noFilter />
      }
      heading="Reports"
    >
      <Tabs
        activeKey={location?.pathname || "/key-report"}
        // tabPosition={mode}
        tabBarStyle={
          window.innerWidth < 1024
            ? {
                background: "white",
                padding: "15px 32px 64px 32px",
                borderRadius: 13,
                boxShadow: "0px 0px 8px 0px #00000014",
                // marginTop: "-24px",
              }
            : {
                background: "white",
                padding: "32px 32px 16px 32px",
                borderRadius: 13,
                boxShadow: "0px 0px 8px 0px #00000014",
                marginTop: "-24px",
              }
        }
        tabBarExtraContent={
          <div className="hidden md:block">
            {/* Only show on md+ screens */}
            <CreateReport />
          </div>
        }
        items={items}
        onChange={onChange}
      />

      {/* Mobile version shown below tabs */}
      <div className="block md:hidden px-4 md:mt-0 md-md-0 mt-[-70px] mb-[30px]">
        <CreateReport />
      </div>

      <KeyReportComponent />
    </DefaultLayout>
  );
};

export default KeyReports;
