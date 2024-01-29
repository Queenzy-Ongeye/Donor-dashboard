"use client";

import { ImLocation } from "react-icons/im";
import { CgBowl } from "react-icons/cg";
import { Tooltip } from "react-tooltip";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import Link from "next/link";
import ProgressBar from "../progressBar";

const SummaryCards = () => {
  const records = [
    {
      id: 1,
      title: "Total Sub-Counties",
      figure: 17,
      icon: <ImLocation className="h-full w-full" />,
      bgColour: "bg-green-400",
      totalSupported: 7,
      totalCount: 17,
      totalSupportedText: "Supported sub-counties",
      totalCountText: "Targeted sub-counties",
    },
    {
      id: 2,
      title: "Total number of Wards",
      figure: 85,
      icon: <ImLocation className="h-full w-full" />,
      bgColour: "bg-blue-400",
      totalSupported: 42, // Add actual data
      totalCount: 85,
      totalSupportedText: "Supported Wards",
      totalCountText: "Targeted Wards",
    },
    {
      id: 3,
      title: "Number of schools",
      figure: 413,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-indigo-400",
      totalSupported: 150, // Add actual data
      totalCount: 413,
      totalSupportedText: "Supported schools",
      totalCountText: "Targeted schools",
    },
    {
      id: 4,
      title: "Number of Meals Served",
      figure: "2,055,900",
      icon: <CgBowl className="h-full w-full" />,
      bgColour: "bg-red-400",
      totalSupported: "2,055,900", // Add actual data
      totalCount: "11,543,117",
      totalSupportedText: "Meals consumed",
      totalCountText: "Target meals",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap mt-2 mx-4">
      {records.map((record, index) => (
        <div
          key={record.id}
          id={`summary-card-${index}`}
          className="flex flex-col min-w-0 mb-3 border border-f4e-f4e-green break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border"
        >
          <div className="flex-auto p-2">
            <div className="flex flex-wrap justify-between px-2">
              <div className="flex-none w-2/3 max-w-full px-2">
                <div>
                  <Link href="">
                    <p className="mb-0 font-sans font-semibold leading-normal text-xs">
                      {record.title}
                    </p>
                    <h5 className="mb-0 font-bold">{record.figure}</h5>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-gradient-to-tl from-f4e-orange to-f4e-green shadow-soft-2xl">
                <div className="h-[60%] w-[60%] text-sm relative text-white">
                  {record.icon}
                </div>
              </div>
              <ProgressBar
                totalSupported={record.totalSupported}
                totalCount={record.totalCount}
                supportedText={record.totalSupportedText}
                remainingText={record.totalCountText}
              />
            </div>
          </div>
        </div>
      ))}

      <Tooltip
        anchorSelect={`#summary-card-0`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of the Sub Counties in Nairobi county
      </Tooltip>
      <Tooltip
        anchorSelect={`#summary-card-1`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of the Wards in Nairobi county
      </Tooltip>
      <Tooltip
        anchorSelect={`#summary-card-2`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of the schools in Nairobi county
      </Tooltip>
      <Tooltip
        anchorSelect={`#summary-card-3`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of the meals served in Nairobi county since the program
        started
      </Tooltip>
    </div>
  );
};

export default SummaryCards;
