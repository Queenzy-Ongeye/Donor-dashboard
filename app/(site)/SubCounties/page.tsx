"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import { CgBowl } from "react-icons/cg";
import { Chart, registerables } from "chart.js";
import ReusableTable from "../Components/ReusableTable";
import {
  CountyHeaderFim,
  CountyHeaderFimNcc,
  subcountyHeaders,
} from "../utils/data";
import LoaderSpinner from "@/app/LoadingSpinner";
import { ImLocation } from "react-icons/im";
import { Tooltip } from "react-tooltip";
import ProgressBar from "../Components/progressBar";
import { apiPost } from "@/app/helpers/http-api";
import DateFilter from "../Components/Filter/filter";
import NccCleanMap from "../Components/CountyMap";
import { useAppContext } from "@/app/context/AppContext";

Chart.register(...registerables);

interface IRecords {
  id: number;
  title: string;
  figure: string;
  icon: any;
  bgColour: string;
  totalSupported?: number;
  totalCount?: number;
  totalSupportedText?: string;
  totalCountText?: string;
}

const Subcounties = () => {
  const { view } = useAppContext();
  let CountyHeader;
  if (view === "fim") {
    CountyHeader = [...CountyHeaderFimNcc, ...CountyHeaderFim];
  } else {
    CountyHeader = [...CountyHeaderFimNcc];
  }

  const [subCounties, setSubCounties] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date("2023/08/28"),
    endDate: new Date(),
  });
  const subCountyList = async () => {
    setLoading(false);
    setSubCounties(
      await apiPost("/ciff/web/group-by/search", {
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
        county: "Nairobi",
      })
    );
  };

  useEffect(() => {
    subCountyList();
  }, [dateFilter.startDate]);

  const handleDateChange = (selectedDates: any) => {
    setDateFilter({
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
    });
  };

  const summaryData = useMemo(() => {
    let totalMeals = 0;
    let totalStudents = 0;
    let totalSchools = 0;
    let mealsProduced = 0;
    subCounties.forEach((t: any) => {
      totalSchools += t.total_schools;
      totalStudents += t.total_population;
      mealsProduced += t.meals_produced;
      totalMeals +=
        t.served_meal_count_female_nonsponsored +
        t.served_meal_count_male_nonsponsored +
        t.served_meal_count_male_sponsored +
        t.served_meal_count_female_sponsored;
    });

    return {
      totalSchool: totalSchools,
      totalStudent: totalStudents,
      totalMeals: totalMeals,
      mealsProduced: mealsProduced,
      totalSubCounty: subCounties.length,
    };
  }, [subCounties]);

  const fimNcc = [
    {
      id: 1,
      title: "Total Sub-Counties supported",
      figure: summaryData.totalSubCounty,
      icon: <ImLocation className="h-full w-full" />,
      bgColour: "bg-green-400",
      totalSupported: summaryData.totalSubCounty,
      totalCount: 17,
      totalSupportedText: "Supported sub-counties",
      totalCountText: "Targeted sub-counties",
    },
    {
      id: 2,
      title: "Total Schools Enrolled",
      figure: summaryData.totalSchool,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-indigo-400",
      totalSupported: summaryData.totalSchool,
      totalCount: 234,
      totalSupportedText: "Supported schools",
      totalCountText: "Targeted schools",
    },
    {
      id: 3,
      title: "Total Students Enrolled",
      figure: `${summaryData.totalStudent.toLocaleString()}`,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-indigo-400",
      totalSupported: `${summaryData.totalStudent}`,
      totalCount: 250000,
      totalSupportedText: "Enrolled Students",
      totalCountText: "Target",
    },

    {
      id: 5,
      title: "Total Meals produced",
      figure: `${summaryData?.mealsProduced?.toLocaleString()}`,
      icon: <CgBowl className="h-full w-full" />,
      bgColour: "bg-red-400",
    },
  ];

  const fimOnly = [
    {
      id: 4,
      title: "Total Meals Served",
      figure: `${summaryData.totalMeals.toLocaleString()}`,
      icon: <CgBowl className="h-full w-full" />,
      bgColour: "bg-red-400",
    },
  ];

  let records;
  if (view === "fim") {
    records = [...fimNcc, ...fimOnly];
  } else {
    records = [...fimNcc];
  }

  return (
    <div className="mx-4">
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className="mt-2">
          <DateFilter onFilter={handleDateChange} />

          <div className="border-b pb-4 border border-gray-200 rounded-md mt-4 bg-gray-100">
            <div className="flex relative justify-center items-center ">
              <NccCleanMap />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-1 mt-4 ">
                {records.map((record: IRecords, index) => (
                  <div
                    key={record.id}
                    id={`sub-county-card-${index}`}
                    className="flex flex-col min-w-0 w-[95%] mb-3 border border-f4e-f4e-green break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border"
                  >
                    <div className="flex-auto p-2">
                      <div className="flex flex-wrap justify-between px-2">
                        <div className="flex-none w-2/3 max-w-full px-2">
                          <div>
                            <div>
                              <p
                                className={`mb-0 font-sans font-semibold leading-normal text-xs ${
                                  record.title === "Total Meals Served" ||
                                  "Total Meals Produced"
                                    ? "text-lg"
                                    : ""
                                }`}
                              >
                                {record.title}
                              </p>
                              <h5
                                className={`mb-0 font-bold ${
                                  record.title === "Total Meals Served" ||
                                  "Total Meals Produced"
                                    ? "text-xl"
                                    : ""
                                }`}
                              >
                                {record.figure}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-gradient-to-tl from-f4e-orange to-f4e-green shadow-soft-2xl mt-1">
                          <div className="h-[60%] w-[60%] text-sm relative text-white">
                            {record.icon}
                          </div>
                        </div>
                        {record.title !== "Total Meals Served" &&
                          "Total Meals Produced" && (
                            <ProgressBar
                              totalSupported={record.totalSupported}
                              totalCount={record.totalCount}
                              supportedText={record.totalSupportedText}
                              remainingText={record.totalCountText}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            <ReusableTable
              tableColumns={CountyHeader}
              tableData={subCounties}
              path={"/SubCounties"}
              headers={subcountyHeaders}
              title={"Sub-County List"}
              routerAccess={"sub_county"}
              onRowClick={undefined}
            />
          </div>
        </div>
      )}
      <Tooltip
        anchorSelect={`#sub-county-card-0`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of the Sub Counties in Nairobi county enrolled into the
        feeding program
      </Tooltip>
      <Tooltip
        anchorSelect={`#sub-county-card-1`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of Schools enrolled into the feeding program.
      </Tooltip>
      <Tooltip
        anchorSelect={`#sub-county-card-2`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of students enrolled into the feeding program.
      </Tooltip>
      <Tooltip
        anchorSelect={`#sub-county-card-3`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of meals served in the supported sub-counties.
      </Tooltip>
    </div>
  );
};
export default Subcounties;
