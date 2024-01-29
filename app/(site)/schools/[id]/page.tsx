"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaChildren } from "react-icons/fa6";
import Schools from "../page";
import { Chart, registerables } from "chart.js";
import * as Sentry from "@sentry/nextjs";
import { CgBowl } from "react-icons/cg";
import { Tooltip } from "react-tooltip";
import { getSession } from "next-auth/react";
import LoaderSpinner from "@/app/LoadingSpinner";
import DoughnutCharts from "../../Components/ReusableCharts/DoughnutCharts";
import {
  genderRatioOptions,
  utilizationOptions,
} from "../../Components/ReusableCharts/GraphOptions";
import { apiGet, apiPost } from "@/app/helpers/http-api";
import { useAppContext } from "@/app/context/AppContext";

Chart.register(...registerables);

const SchoolDetailPage = ({ params }: any) => {
  const { view } = useAppContext();

  const id = params.id;
  const router = useRouter();
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [totalMeals, setTotalMeals] = useState(0);
  const [apiData, setApiData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [genderData, setGenderData] = useState<any>();
  const [utilizeData, setUtilizeData] = useState<any>();
  const [statisticalData, setStatisticalData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setLoading(false);
      try {
        setApiData(
          await apiPost(`/ciff/web/aggregate/search`, {
            schoolId: id.replace("%20", " "),
          })
        );
        setStatisticalData(
          await apiGet(`/ciff/web/schools/trends/${id.replace("%20", " ")}`)
        );
        setLoading(false);
      } catch (error) {
        Sentry.captureException(error);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    if (apiData?.length > 0) {
      let totalstudents = 0;
      apiData?.map((value: any) => {
        totalstudents +=
          value.student_count_male_nonsponsored +
          value.student_count_female_nonsponsored +
          value.student_count_male_sponsored +
          value.student_count_female_sponsored;
      });
      setTotalStudent(statisticalData[0].student_enrolled);
      setTotalPopulation(statisticalData[0].population);
      const calculateTotalMeals = () => {
        return apiData?.reduce(
          (
            total: any,
            meal: {
              served_meal_count_female_nonsponsored: any;
              served_meal_count_female_sponsored: any;
              served_meal_count_male_nonsponsored: any;
              served_meal_count_male_sponsored: any;
            }
          ) => {
            return (
              total +
              meal.served_meal_count_female_nonsponsored +
              meal.served_meal_count_female_sponsored +
              meal.served_meal_count_male_nonsponsored +
              meal.served_meal_count_male_sponsored
            );
          },
          0
        );
      };
      setTotalMeals(calculateTotalMeals());

      setGenderData({
        labels: ["Boys", "Girls"],
        datasets: [
          {
            backgroundColor: ["#7EA829", "#eab308"],
            data: [
              statisticalData[0]?.students_male,
              statisticalData[0]?.student_female,
            ],
          },
        ],
      });

      setUtilizeData({
        labels: ["Average utilization"],
        datasets: [
          {
            backgroundColor: ["#7EA829", "#eab308"],
            data: [
              statisticalData[0].student_enrolled,
              statisticalData[0].population -
                statisticalData[0].student_enrolled,
            ],
          },
        ],
      });
    }
  }, [statisticalData]);

  const fimNcc = [
    {
      id: 1,
      title: "Total student population",
      figure: `${totalPopulation.toLocaleString()}`,
      icon: <FaChildren className="h-full w-full" />,
      bgColour: "bg-indigo-400",
    },
    {
      id: 2,
      title: "Total number of students enrolled",
      figure: `${totalStudent.toLocaleString()}`,
      icon: <FaChildren className="h-full w-full" />,
      bgColour: "bg-indigo-400",
    },
    {
      id: 4,
      title: "Coverage",
      figure: `${Math.round((totalStudent / totalPopulation) * 100)}%`,
      icon: <CgBowl className="h-full w-full" />,
      bgColour: "bg-red-400",
    },
  ];

  const fimOnly = [
    {
      id: 3,
      title: "Cumulative number of Meals Served",
      figure: `${totalMeals.toLocaleString()}`,
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
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <Schools />
          <div className="fixed justify-center items-center inset-x-0 inset-y-0  bg-black bg-opacity-25 backdrop-blur-sm flex">
            <div className="bg-white w-[1000px] rounded-md h-full overflow-y-auto">
              <div
                className="text-orange-400 border border-orange-400 rounded-full mt-2 p-1 cursor-pointer w-10 h-10 flex items-center justify-center mx-2"
                onClick={() => router.back()}
              >
                <MdClose size={20} />
              </div>
              <div className="p-2">
                <div className="font-semibold text-center">
                  <div className="font-semibold text-center">
                    {apiData?.map((item: any, index: any) => (
                      <h1 key={index} className="text-3xl">
                        {item.name}
                      </h1>
                    ))}
                  </div>
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 ${
                    view == "ncc" ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  }  gap-4 mt-2 mx-4 sm:grid-cols-1`}
                >
                  {records.map((record, index) => (
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
                                <p className="mb-0 font-sans font-semibold leading-normal text-xs">
                                  {record.title}
                                </p>
                                <h5 className="mb-0 font-bold">
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2 h-[400px]">
                  {/* <BarGraph stateData={registerData} options={regOptions} />
              <BarGraph stateData={gradeData} options={gradeOptions} /> */}
                  {genderData && genderData.labels && genderData.datasets ? (
                    <DoughnutCharts
                      data={genderData}
                      options={genderRatioOptions}
                    />
                  ) : (
                    <div>Chart data is not available</div>
                  )}
                  {utilizeData && utilizeData.labels && utilizeData.datasets ? (
                    <DoughnutCharts
                      data={utilizeData}
                      options={utilizationOptions}
                    />
                  ) : (
                    <div>Chart data is not available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Tooltip
            anchorSelect={`#school-card-0`}
            place="top"
            style={{ backgroundColor: "#357a38", color: "#fff" }}
          >
            Students population in the school.
          </Tooltip>
          <Tooltip
            anchorSelect={`#school-card-1`}
            place="top"
            style={{ backgroundColor: "#357a38", color: "#fff" }}
          >
            Total number of students enrolled in the school into the feeding
            program.
          </Tooltip>
          <Tooltip
            anchorSelect={`#school-card-2`}
            place="top"
            style={{ backgroundColor: "#357a38", color: "#fff" }}
          >
            Total number of meals served in the school.
          </Tooltip>
          <Tooltip
            anchorSelect={`#school-card-3`}
            place="top"
            style={{ backgroundColor: "#357a38", color: "#fff" }}
          >
            Coverage refers to the % of children in the program enrolled
            compared to the total population of children in the school.
          </Tooltip>
        </>
      )}
    </>
  );
};

export default SchoolDetailPage;
