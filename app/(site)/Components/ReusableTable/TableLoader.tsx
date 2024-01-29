import React from "react";

const RawLoader = () => (
  <div className="flex items-center justify-between pt-4">
    <div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
  </div>
);

const TableLoader = () => {
  return (
    <div
      role="status"
      className="w-full mt-6 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-2xl shadow animate-pulse dark:divide-gray-700 md:my-6 dark:border-gray-700 "
    >
      <RawLoader />
      <RawLoader />
      <RawLoader />
      <RawLoader />
      <RawLoader />
      <RawLoader />

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TableLoader;
