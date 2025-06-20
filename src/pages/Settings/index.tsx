import DefaultLayout from "../../components/DefaultLayout";
import { Tabs, TabsProps } from "antd";
import Details from "./Details";
// import Security from './Security';
// import FilterContainer from '@/components/FilterContainer';
import Account from "./Account";
// import Security from "./Security";
import FilterContainer from "@/components/FilterContainer";
import './index.css'

const Label = (props: any) => {
  const { heading } = props;
  return (
    <div className="h-[20px] font-[500] text-[14px] text-[#1e293b]">
      {heading}
    </div>
  );
};
const Settings = () => {
  const items: TabsProps["items"] = [
    {
      key: "Details",
      label: <Label heading="Details" />,
      children: <Details />,
    },
    // {
    //   key: 'Personal',
    //   label: 'Personal',
    //   children: 'Content of Tab Pane 2',
    // },
    {
      key: "Account",
      label: <Label heading="Account" />,
      children: <Account />,
    },
    // {
    //   key: 'Profile',
    //   label: 'Profile',
    //   children: 'Content of Tab Pane 3',
    // },
    // {
    //   key: "Security",
    //   label: <Label heading="Security" />,
    //   children: <Security />,
    // },
    // {
    //   key: 'Appearance',
    //   label: 'Appearance',
    //   children: 'Content of Tab Pane 3',
    // },
    // {
    //   key: 'API',
    //   label: 'API',
    //   children: 'Content of Tab Pane 3',
    // },
  ];

  return (
    <DefaultLayout
      // noUserName={true}
      FilterComponent={
        <FilterContainer heading="Settings" mapDataReload={() => {}} noFilter />
      }
      heading="Settings"
    >
      <div className="bg-white shadow-md rounded-xl p-[16px] lg:p-[32px] w-full">
        <Tabs defaultActiveKey="1" items={items} className="tab" />
      </div>
    </DefaultLayout>
  );
};

export default Settings;
