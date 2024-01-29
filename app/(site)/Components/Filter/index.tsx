import React from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import SummaryDatePicker from "./SummaryDate";
import { useFilterContext } from "../../context/FilterContext";
import ActionButton from "./ActionButton";

const Filter = () => {
  const { filters, setFilters } = useFilterContext();

  const handleFilter = () => {
    const selectedStartDate = filters.startDate;
    const selectedEndDate = filters.endDate;

    setFilters({
      ...filters,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center max-w-7xl mx-auto z-10 top-0 bg-white p-2 lg:px-8 border border-gray-300 rounded-md">
        <div className="flex w-auto justify-start ml-2 gap-6">
          <SummaryDatePicker />
        </div>
        <div className="flex justify-between mr-2">
          <ActionButton
            onClick={handleFilter}
            className="flex gap-x-2 bg-green-600 hover:bg-green-400 hover:text-white text-white   justify-center items-center border hover:border-white px-4 py-0.5 rounded-md shadow-md hover:shadow-sm"
          >
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            <span>Filter</span>
          </ActionButton>
        </div>
      </div>
    </>
  );
};

export default Filter;
