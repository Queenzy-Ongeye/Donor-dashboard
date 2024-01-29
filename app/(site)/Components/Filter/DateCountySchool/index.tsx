import React, { useEffect } from "react";
import { useFilterContext } from "../../../context/FilterContext";
import { FunnelIcon } from "@heroicons/react/24/outline";
import SubcountySchool from "./SubcountySchool";
import DatePickerFilter from "./DateRange";
import * as Sentry from "@sentry/nextjs";

export const onBoardingMoreFilter = [
  {
    element: "#more-filter",
    intro: "Filter by Constituency -> Wards -> Year -> Term",
  },
];

const DateCountySchool = () => {
  const { apiData, setApiData, filters, setFilters } = useFilterContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://tap2eat.org/v1/ciff/web/search", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const resData = await response.json();
          // Access the data from the "filters" key
          setApiData(resData.filters);
        }
      } catch (error) {
        Sentry.captureException(error);
      }
    };
    fetchData();
  }, [filters]);

  // if (!apiData) {
  //   return <div>Loading...</div>;
  // }

  const handleFilter = () => {
    // setFiltered("");
  };

  return (
    <div className="flex flex-wrap items-center max-w-7xl mx-auto z-10 sticky top-0 bg-white p-2 lg:px-8 border-b">
      <div id="more-filter" className="float-left mt-1 pr-1 flex items-center">
        <div className="flex gap-3 relative">
          <SubcountySchool />
          <DatePickerFilter />
        </div>
      </div>
      <div className="flex justify-between mr-2">
        <button
          onClick={handleFilter}
          id="filter-data"
          className="flex gap-x-2 bg-green-600 hover:bg-green-400 text-white   justify-center items-center border hover:text-gray-900 hover:border hover:border-yellow-500 px-4 py-0.5 rounded-md shadow-md hover:shadow-sm"
        >
          <FunnelIcon className="h-5 w-5" aria-hidden="true" />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
};

export default DateCountySchool;
