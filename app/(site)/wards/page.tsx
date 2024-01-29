"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReusableTable from "../Components/ReusableTable";
import { WardHeaderFim, WardHeaderFimNcc, wardsHeaders } from "../utils/data";
import { Chart, registerables } from "chart.js";
import LoaderSpinner from "@/app/LoadingSpinner";
import { CgBowl } from "react-icons/cg";
import { FaChildren, FaSchoolCircleCheck } from "react-icons/fa6";
import { paymentOptions } from "../Components/ReusableCharts/GraphOptions";
import PieCharts from "../Components/ReusableCharts/PieCharts";
import { useFilterContext } from "../context/FilterContext";
import { ImLocation } from "react-icons/im";
import ProgressBar from "../Components/progressBar";
import { Tooltip } from "react-tooltip";
import { apiPost } from "@/app/helpers/http-api";
import DateFilter from "../Components/Filter/filter";
import { useAppContext } from "@/app/context/AppContext";
Chart.register(...registerables);

interface IWard {
  ward_name: string;
  school_name: string;
  student_count_male_nonsponsored: number;
  student_count_female_nonsponsored: number;
  student_count_male_sponsored: number;
  student_count_female_sponsored: number;
  active_tag_count: number;
  failed_tap_count_lobalance: number;
  failed_tap_count_doubletap: number;
}

const WardsPage = () => {
  const { view } = useAppContext();
  let WardHeader;
  if (view === "fim") {
    WardHeader = [...WardHeaderFimNcc, ...WardHeaderFim];
  } else {
    WardHeader = [...WardHeaderFimNcc];
  }
  const [loading, setLoading] = useState(true);
  const { filters, apiData, setApiData } = useFilterContext();
  const [totalSchool, setTotalSchool] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const [data, setData] = useState<any>();
  const [totalWard, setTotalWard] = useState(0);
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date("2023/08/28"),
    endDate: new Date(),
  });
  const fetchData = async () => {
    const response = await apiPost("/ciff/web/ward/search/Nairobi", {
      startDate: dateFilter.startDate,
      endDate: dateFilter.endDate,
      county: "Nairobi",
    });
    setApiData(response);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [dateFilter]);

  const handleDateChange = (selectedDates: any) => {
    setDateFilter({
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
    });
  };

  const chartData = useMemo(() => {
    setTotalWard(apiData?.length);
    let data: any = [];
    data.totalWards = apiData?.length;
    data.totalSchools = 0;
    data.childrenPopulation = 0;
    data.totalMealsServed = 0;
    data.meals_produced = 0;
    data.kitchensPerSubCounty = 0;
    apiData?.forEach((ward: any) => {
      data.kitchensPerSubCounty += ward.total_kitchens;
      data.totalSchools += ward.total_schools;
      data.childrenPopulation += ward.total_population;
      data.meals_produced += ward.meals_produced;
      data.totalMealsServed +=
        ward.served_meal_count_female_nonsponsored +
        ward.served_meal_count_male_nonsponsored +
        ward.served_meal_count_male_sponsored +
        ward.served_meal_count_female_sponsored;
    });
    setData(data);
    setTotalSchool(data.totalSchools);
    setTotalStudent(data.childrenPopulation);
    const dataChart = apiData;

    const failedTapDoubleTapCount = dataChart.reduce(
      (total: number, analysis: IWard) => {
        return total + analysis.failed_tap_count_doubletap;
      },
      0
    );

    const failedTapLocalBalanceCount = dataChart.reduce(
      (total: number, analysis: IWard) => {
        return total + analysis.failed_tap_count_lobalance;
      },
      0
    );

    return {
      labels: ["Payment on Time", "Accounts with Insufficient Balance"],
      datasets: [
        {
          label: "",
          data: [9, 1],
          backgroundColor: ["#1E6D3B", "#eab308"],
        },
      ],
    };
  }, [apiData]);
  const fimNcc = [
    {
      id: 1,
      title: "Wards Enrolled",
      figure: ` ${totalWard}`,
      icon: <ImLocation className="h-full w-full" />,
      bgColour: "bg-blue-400",
      totalSupported: `${totalWard}`, // Add actual data
      totalCount: 85,
      totalSupportedText: "Supported Wards",
      totalCountText: "Target",
    },
    {
      id: 2,
      title: "Total Schools  Enrolled",
      figure: `${totalSchool}`,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-indigo-400",
      totalSupported: `${totalSchool}`,
      totalCount: 234,
      totalSupportedText: "Supported schools",
      totalCountText: "Target",
    },
    {
      id: 3,
      title: "Total Students Enrolled",
      figure: `${totalStudent?.toLocaleString()}`,
      icon: <FaChildren className="h-full w-full" />,
      bgColour: "bg-indigo-400",
      totalSupported: `${totalStudent}`,
      totalCount: 250000,
      totalSupportedText: "Enrolled Students",
      totalCountText: "Target",
    },
    {
      id: 5,
      title: "Total Meals Produced",
      figure: `${data?.meals_produced?.toLocaleString()}`,
      icon: <CgBowl className="h-full w-full" />,
      totalSupported: `${data?.meals_produced}`,
      totalCount: 2000000,
      totalSupportedText: "Meals consumed",
      totalCountText: "Target",
    },
  ];

  const fimOnly = [
    {
      id: 4,
      title: "Total Meals Served",
      figure: `${data?.totalMealsServed?.toLocaleString()}`,
      icon: <CgBowl className="h-full w-full" />,
      totalSupported: `${data?.totalMealsServed}`,
      totalCount: 2000000,
      totalSupportedText: "Meals consumed",
      totalCountText: "Target",
    },
  ];

  let records;
  if (view === "fim") {
    records = [...fimNcc, ...fimOnly];
  } else {
    records = [...fimNcc];
  }

  return (
    <div className="w-[100%] min-w-0 max-w-full">
      {!loading ? (
        <div className="mt-2">
          <DateFilter onFilter={handleDateChange} />
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-3 my-2 md:mx-2 md:my-4 sm:my-4">
            {records.map((record, index) => (
              <div
                key={record.id}
                id={`ward-card-${index}`}
                className="flex flex-col min-w-0 mb-3 border border-f4e-f4e-green break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border"
              >
                <div className="flex-auto p-2">
                  <div className="flex flex-wrap justify-between px-2">
                    <div className="flex-none w-2/3 max-w-full px-2">
                      <div>
                        <div>
                          <p
                            className={`mb-0 font-sans font-semibold leading-normal text-xs ${
                              record.title === "Total Meals Served"
                                ? "text-lg"
                                : ""
                            }`}
                          >
                            {record.title}
                          </p>
                          <h5
                            className={`mb-0 font-bold ${
                              record.title === "Total Meals Served"
                                ? "text-xl"
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

          <div>
            <div className="z-1 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2 sm:grid-cols-2 my-4 h-[400px] min-w-[100px]">
              {/* <LineGraph data={[]} options={monthTrendOptions} /> */}
              {chartData && chartData.labels && chartData.datasets ? (
                <PieCharts data={chartData} options={paymentOptions} />
              ) : (
                <div>Chart data is not available</div>
              )}
            </div>
            <div className="mt-2">
              <ReusableTable
                tableColumns={WardHeader}
                tableData={apiData}
                path={`/wards/`}
                headers={wardsHeaders}
                title={"Wards List"}
              />
            </div>
          </div>
        </div>
      ) : (
        <LoaderSpinner />
      )}

      <Tooltip
        anchorSelect={`#ward-card-0`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of Wards enrolled into the feeding program.
      </Tooltip>
      <Tooltip
        anchorSelect={`#ward-card-1`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of Schools enrolled into the feeding program.
      </Tooltip>
      <Tooltip
        anchorSelect={`#ward-card-2`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of Students enrolled into the feeding program.
      </Tooltip>
      <Tooltip
        anchorSelect={`#ward-card-3`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of meals served in the supported wards.
      </Tooltip>
    </div>
  );
};

export default WardsPage;
