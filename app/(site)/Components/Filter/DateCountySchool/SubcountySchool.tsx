import React, { useState } from "react";
import Select from "react-tailwindcss-select";
const ConstituencyWard = () => {
  const [subCounty, setSubCounty] = useState(null);
  const [school, setSchool] = useState(null);
  const handleSubCounty = (value: any) => {
    setSubCounty(value);
  };
  const handleSchool = (value: any) => {
    setSchool(value);
  };
  const wards = [
    { value: "1", label: "School 1" },
    { value: "2", label: "School 2" },
    { value: "3", label: "School 3" },
    { value: "4", label: "School 4" },
    { value: "5", label: "School 5" },
  ];
  return (
    <div className="flex gap-4 justify-between w-[500px] h-10">
      <Select
        primaryColor={"green"}
        placeholder={"Select Sub-County"}
        value={subCounty}
        onChange={handleSubCounty}
        options={[]}
        isSearchable={true}
      />
      <Select
        primaryColor={"green"}
        placeholder={"Select School"}
        value={school}
        onChange={handleSchool}
        options={wards}
        isSearchable={true}
      />
    </div>
  );
};
export default ConstituencyWard;
