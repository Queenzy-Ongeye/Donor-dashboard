import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SummaryDatePicker = ({ onDateChange }: any) => {
  const [startDate, setStartDate] = useState(new Date("2023/08/28"));
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    onDateChange({ startDate: date, endDate });
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
    onDateChange({ startDate, endDate: date });
  };

  return (
    <div className="flex justify-between w-full gap-2 z-50">
      <p className="hidden md:flex">Period</p>
      <div className="flex border gap-2 pl-2 rounded-md justify-around">
        <p>from</p>{" "}
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          className="outline-none border-0 rounded-md w-auto flex"
          tabIndex={1}
        />
      </div>
      <div className="flex border gap-2 pl-2 rounded-md justify-around">
        <p>to</p>
        <DatePicker
          className="outline-none border-0 rounded-md w-auto flex"
          selected={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default SummaryDatePicker;
