import { DatePicker, DatePickerProps } from "antd";
// import React from "react";
import { CiCalendar } from "react-icons/ci";
import dayjs from "dayjs";

function DateFeilds(props: any) {
  const { setStartDate, setEndDate, startDate, endDate } = props;
  const onStartDateChange: DatePickerProps["onChange"] = (date) => {
    setStartDate(date ? date.format("YYYY-MM-DD") : null);
  };

  const onEndDateChange: DatePickerProps["onChange"] = (date) => {
    setEndDate(date ? date.format("YYYY-MM-DD") : null);
  };
  return (
    <div className="flex flex-row items-center">
      <div>Date:</div>
      <div className="flex items-center border pl-[10px] rounded-[4px] ml-[10px]">
        <CiCalendar />
        <DatePicker
          onChange={onStartDateChange}
          suffixIcon={null}
          style={{ border: "none" }}
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
          value={startDate ? dayjs(startDate) : null}
        />
      </div>
      <div className="mx-[5px]">to</div>
      <div className="flex items-center border pl-[10px] rounded-[4px]">
        <CiCalendar />
        <DatePicker
          onChange={onEndDateChange}
          suffixIcon={null}
          style={{ border: "none" }}
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
          value={endDate ? dayjs(endDate) : null}
        />
      </div>
    </div>
  );
}

export default DateFeilds;
