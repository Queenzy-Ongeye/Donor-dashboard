"use client";

import { FaChildren, FaSchoolCircleCheck } from "react-icons/fa6";
import ReusableTable from "../Components/ReusableTable";
import { CgBowl } from "react-icons/cg";
import {
  SchoolHeadersFimNcc,
  SchoolHeadersFim,
  schoolsHeaders,
} from "../utils/data";
import LoaderSpinner from "@/app/LoadingSpinner";
import * as Sentry from "@sentry/nextjs";
import { Tooltip } from "react-tooltip";
import ProgressBar from "../Components/progressBar";
import { useGetData } from "../utils/fetcher";
import API_URL from "../utils/helpers/api_url";
import { useAppContext } from "@/app/context/AppContext";

interface ISchools {
  ward_name: string;
  name: string;
  total_population: number;
  active_tag_count: number;
  failed_tap_count_lobalance: number;
  failed_tap_count_doubletap: number;
  parent_count_male: number;
  parent_count_female: number;
  school_id: string;
  served_meal_count_male_sponsored: number;
  served_meal_count_female_sponsored: number;
  served_meal_count_male_nonsponsored: number;
  served_meal_count_female_nonsponsored: number;
  student_count_male_nonsponsored: number;
  student_count_female_nonsponsored: number;
  student_count_male_sponsored: number;
  student_count_female_sponsored: number;
  population: number;
  meals_produced: number;
}
const Schools = () => {
  const { view } = useAppContext();
  let SchoolHeaders;
  if (view === "fim") {
    SchoolHeaders = [...SchoolHeadersFimNcc, ...SchoolHeadersFim];
  } else {
    SchoolHeaders = [...SchoolHeadersFimNcc];
  }

  const {
    data: schoolData,
    isLoading,
    error,
  } = useGetData<ISchools[]>(API_URL.SCHOOLDATA);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return Sentry.captureException(error);
  }

  const totalSchools = schoolData.length;
  const totalEnrolledStudents = schoolData.reduce(
    (acc, school) =>
      acc +
      school.student_count_male_nonsponsored +
      school.student_count_female_nonsponsored,
    0
  );
  const totalMealsServed = schoolData.reduce(
    (acc, school) =>
      acc +
      school.served_meal_count_female_nonsponsored +
      school.served_meal_count_female_sponsored +
      school.served_meal_count_male_nonsponsored +
      school.served_meal_count_male_sponsored,
    0
  );

  const totalMealsProduced = schoolData.reduce(
    (acc, school) => acc + school.meals_produced,
    0
  );

  const totalActiveCount = schoolData.reduce(
    (acc, tag) => acc + tag.active_tag_count,
    0
  );
  const totalPopulation = schoolData.reduce(
    (acc, population) => acc + population.total_population,
    0
  );

  const averageUtilization = (
    (totalActiveCount / totalPopulation) *
    100
  ).toFixed();

  const fimNcc = [
    {
      id: 1,
      title: "Total Schools enrolled",
      figure: totalSchools,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-indigo-400",
      totalSupported: totalSchools,
      totalCount: 234,
      totalSupportedText: "Supported schools",
      totalCountText: "Target",
    },
    {
      id: 2,
      title: "Total Students enrolled",
      //TODO: understand why this is causing an error
      figure: `${79286?.toLocaleString()}`,
      icon: <FaChildren className="h-full w-full" />,
      bgColour: "bg-indigo-400",
      totalSupported: 79286,
      totalCount: 250000,
      totalSupportedText: "Enrolled Students",
      totalCountText: "Target",
    },
    {
      id: 3,
      title: "Total Meals Produced",
      figure: `${totalMealsProduced ? totalMealsProduced.toLocaleString() : 0}`,
      icon: <CgBowl className="h-full w-full" />,
      bgColour: "bg-red-400",
    },
  ];

  const fimOnly = [
    {
      id: 4,
      title: "Total Utilisation",
      figure: averageUtilization + "%",
      totalSupported: averageUtilization,
      totalCount: 100,
      totalSupportedText: "Utilization Covered",
      totalCountText: "Target",
    },
    {
      id: 5,
      title: "Total Meals Served",
      figure: `${totalMealsServed.toLocaleString()}`,
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
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-2 sm:grid-cols-1">
        {records.map((record: any, index: any) => (
          <div
            key={record.id}
            id={`school-card-${index}`}
            className="flex flex-col min-w-0 mb-3 border border-f4e-f4e-green break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border"
          >
            <div className="flex-auto p-2">
              <div className="flex flex-wrap justify-between px-2">
                <div className="flex-none w-2/3 max-w-full px-2">
                  <div>
                    <div>
                      <p
                        className={`mb-0 font-sans font-semibold leading-normal text-xs ${
                          record.title === "Total Meals Served" ? "text-lg" : ""
                        }`}
                      >
                        {record.title}
                      </p>
                      <h5
                        className={`mb-0 font-bold ${
                          record.title === "Total Meals Served"
                            ? "text-xl mt-6"
                            : ""
                        }`}
                      >
                        {record.figure}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-gradient-to-tl from-f4e-orange to-f4e-green shadow-soft-2xl">
                  <div className="h-[60%] w-[60%] text-sm relative text-white">
                    {record.icon}
                  </div>
                </div>
                {record.title !== "Total Meals Served" && (
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
      <ReusableTable
        tableColumns={SchoolHeaders}
        tableData={schoolData}
        path={`/schools`}
        headers={schoolsHeaders}
        title={"Schools List"}
      />

      <Tooltip
        anchorSelect={`#school-card-0`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of Schools enrolled into the feeding program.
      </Tooltip>
      <Tooltip
        anchorSelect={`#school-card-1`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of students enrolled into the feeding program.
      </Tooltip>
      <Tooltip
        anchorSelect={`#school-card-2`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of meals served in the supported schools.
      </Tooltip>
    </div>
  );
};
export default Schools;
