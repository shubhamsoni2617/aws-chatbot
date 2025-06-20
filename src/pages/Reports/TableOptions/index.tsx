import {
  Collapse,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Input,
  MenuProps,
  Space,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { CiCalendar } from "react-icons/ci";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Admin",
  },
  {
    key: "2",
    label: "Anyone",
    // icon: <SmileOutlined />,
    // disabled: true,
  },
];

const TableOptions = (props:any) => {
  const {setStartDate, setEndDate} = props;
  const onChangeStartDate: DatePickerProps["onChange"] = (date) => {
    setStartDate(date);
    // console.log(date, dateString);
  };

  const onChangeEndDate: DatePickerProps["onChange"] = (date) => {
    setEndDate(date);
    // console.log(date, dateString);
  };

  return (
    <>
      {/* filter section */}
      <div className="flex flex-row ml-2 mt-5 items-center">
        {/* Desktop filter */}
        <div className="flex-row items-center md:flex hidden">
          <div className="UserNameSearchBar">
            <Input
              placeholder="Search"
              allowClear
              className="w-[200px] mr-[20px]"
              prefix={<SearchOutlined />}
            />
          </div>

          <div className="DepartmentSelection mr-[25px] flex flex-row">
            <div className="mr-[10px]">Owner:</div>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space className="text-[#C847E8]">
                  Anyone
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          <div>Last updated:</div>
          <div className="flex items-center border pl-[10px] rounded-[4px] ml-[10px]">
            <CiCalendar />
            <DatePicker
              onChange={onChangeStartDate}
              suffixIcon={null}
              style={{ border: "none" }}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="mx-[5px]">to</div>
          <div className="flex items-center border pl-[10px] rounded-[4px]">
            <CiCalendar />
            <DatePicker
              onChange={onChangeEndDate}
              suffixIcon={null}
              style={{ border: "none" }}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
      </div>

      {/* Mobile filter */}
      <div className="flex w-full md:hidden">
        <Collapse
          accordion
          className="border border-[#c847e8] rounded-[25px] text-center h-[35px] w-full filter-collapse"
          expandIcon={({ isActive }) => (
            <DownOutlined
              style={{ color: "#c847e8" }}
              rotate={isActive ? 180 : 0}
            />
          )}
          items={[
            {
              key: "1",
              label: "Filter",
              styles: {
                header: {
                  padding: "5px 16px",
                  backgroundColor: "#FFF",
                  borderRadius: "25px",
                  borderColor: "#c847e8",
                  color: "c847e8",
                },
                body: {
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  background: "#FFF",
                },
              },
              children: (
                <div className="flex flex-col gap-[16px]">
                  <Input
                    placeholder="Search"
                    allowClear
                    className="w-full"
                    prefix={<SearchOutlined />}
                  />

                  <div>
                    <div>
                      <div>Last updated:</div>
                      <div className="flex items-center border pl-[10px] rounded-[4px]">
                        <CiCalendar />
                        <DatePicker
                          onChange={onChangeStartDate}
                          suffixIcon={null}
                          style={{ border: "none" }}
                          placeholder="DD/MM/YYYY"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mx-[5px]">to</div>
                      <div className="flex items-center border pl-[10px] rounded-[4px]">
                        <CiCalendar />
                        <DatePicker
                          onChange={onChangeEndDate}
                          suffixIcon={null}
                          style={{ border: "none" }}
                          placeholder="DD/MM/YYYY"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="KPISelection flex flex-row">
                    <div className="mr-[10px]">Owner:</div>
                    <Dropdown menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space className="text-[#C847E8]">
                          All
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                </div>
              ),
            },
          ]}
          expandIconPosition="end"
        />
      </div>
    </>
  );
};

export default TableOptions;
