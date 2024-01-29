"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const onBoardingDatePickerSteps = [
  {
    element: "#date-period",
    intro: "Select date range to filter the displayed data",
  },
];
function DatePickerFilter() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div id="date-period" className="flex items-center w-full gap-2">
      <div className="flex border shadow-sm gap-2 pl-2 rounded-md justify-around items-center h-10">
        <p>from</p>{" "}
        <DatePicker
          className="outline-none border-0 rounded-md"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </div>
      <div className="flex border shadow-sm gap-2 pl-2 rounded-md justify-around items-center h-10">
        <p>to</p>
        <DatePicker
          className="outline-none border-0 rounded-md w-auto flex"
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
        />
      </div>
    </div>
  );
}
export default DatePickerFilter;
