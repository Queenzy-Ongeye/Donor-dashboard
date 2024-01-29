import React from "react";

const ColorCode = () => {
  return (
    <>
      <h3 className="mb-4 ml-4 text-lg">Keys</h3>
      <div className="flex gap-4 ml-4 ">
        <div className="bg-white p-2 rounded-md border border-gray-200">
          <div className="bg-[#f47d38] h-6 w-12 rounded-sm border border-gray-200"></div>
          <p>F4E Covered Sub County</p>
        </div>
        <div className="bg-white p-2 rounded-md border border-gray-200">
          <div className="bg-[#b6b6b6] h-6 w-12 rounded-sm border border-gray-200"></div>
          <p>Future Targeted Sub-County</p>
        </div>
      </div>
    </>
  );
};

export default ColorCode;
