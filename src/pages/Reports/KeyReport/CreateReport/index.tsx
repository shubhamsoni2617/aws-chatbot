import { Popover, Tabs, TabsProps } from "antd";
import { useState } from "react";
import ReportsCreateReport from "../CreateReportTabs/Reports";
import ComparisonCreateReport from "../CreateReportTabs/Comparison";
import UIButton from "@/components/ui/UIButton";
import './index.css'

const CreateReport = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [filterData, setFilterData] = useState<any>([null]);
  // const [checkBoxData, setCheckBoxData] = useState([]);
  // const [comparisonData, setComparisonData] = useState([]);

  const getFilterData = (filterParameters: any) => {
    setFilterData(filterParameters);
  };

  // const getCheckBoxDataFromReports = (seletedItems: []) => {
  //   setCheckBoxData(seletedItems);
  // };

  // const getCheckBoxDataFromComparison = (selectedItems: any) => {
  //   setCheckBoxData(selectedItems);
  // };

  // const getComparisonData = (compareDate: any) => {
  //   setComparisonData(compareDate);
  // };

  const onChange = (key: string) => {
    console.log(key);
    setActiveTab(key);
  };

  // const hide = () => {
  //   setOpen(false);
  // };

  const TabsOfCreateReport = () => {
    // const onChange = (key: string) => {
    //   console.log(key);
    //   setActiveTab(key);
    // };

    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Reports",
        children: (
          <ReportsCreateReport
            isComparision={false}
            filterData={filterData}
            getFilterData={getFilterData}
            getCheckBoxData={() => {}}
          />

          // <>hi</>
        ),
      },
      {
        key: "2",
        label: "Comparision",
        children: (
          <ComparisonCreateReport
            isComparision={true}
            getCheckBoxData={() => {}}
            getComparisonData={() => {}}
          />

          // <>hi</>
        ),
      },
    ];

    return (
      <Tabs
        defaultActiveKey="1"
        centered
        tabBarGutter={300}
        indicator={{
          size: 300,
        }}
        className="create-report-tabs"
        items={items}
        onChange={onChange}
        style={{
          // height: "467px",
          width: "700px",
          justifyContent: "space-evenly",
          // minHeight: "467px",
        }}
        activeKey={activeTab}
      />
    );
  };

  const content = (
    <div className="flex flex-col justify-center items-center">
      <TabsOfCreateReport />
      {/* <div className={`${+activeTab === 1 ? "h-[0px]" : "h-[40px]"}`}></div> */}
    </div>
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={content}
      title=""
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomRight"
      overlayInnerStyle={{
      boxShadow: 'none',
      border: '1px solid #CBD5E1',
      borderRadius: "12px"
    }}
    
    >
      {/* <Button type="primary">Click me</Button> */}
      <div className="w-full md:w-fi">
        <UIButton
          background="#c847e8"
          text="Create Report"
          color="#fff"
          borderColor="#c847e8"
          onClick={() => {}}
        />
      </div>
    </Popover>
  );
};

export default CreateReport;
