"use client";
import Image from "next/image";
import keMap from "@/public/assets/keMap.png";
import { useState, useEffect, useMemo } from "react";
import LoaderSpinner from "../LoadingSpinner";
import DoughnutCharts from "./Components/ReusableCharts/DoughnutCharts";
import {
  paymentOptions,
  genderRatioOptions,
  utilizationOptions,
} from "./Components/ReusableCharts/GraphOptions";
import { CgBowl } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import { useFilterContext } from "./context/FilterContext";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import ProgressBar from "./Components/progressBar";
import Chart, { registerables } from "chart.js/auto";
import { apiPost } from "../helpers/http-api";
import PieCharts from "./Components/ReusableCharts/PieCharts";
import DateFilter from "./Components/Filter/filter";
import { initGA, logPageView } from "./utils/analytics";
import { useAppContext } from "../context/AppContext";
Chart.register(...registerables);

const utilizationMetrics = {
  labels: ["Total utilization"],
  datasets: [
    {
      backgroundColor: ["#7EA829", "#eab308"],
      data: [78, 22],
    },
  ],
};

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

export default function Home() {
  const { view } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<any>();
  const [totalWard, setTotalWard] = useState(0);
  const [chartData, setChartData] = useState<any>();
  const [genderData, setGenderData] = useState<any>();
  const [statisticalData, setStatisticalData] = useState<any>();
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date("2023/08/28"),
    endDate: new Date(),
  });
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    const fetchData = async () => {
      setLoading(false);
      try {
        setApiData(
          await apiPost("/ciff/web/group-by/search", {
            startDate: dateFilter.startDate,
            endDate: dateFilter.endDate,
            county: "Nairobi",
          })
        );
        setTotalWard(
          (
            await apiPost("/ciff/web/ward/search/Nairobi", {
              startDate: dateFilter.startDate,
              endDate: dateFilter.endDate,
              county: "Nairobi",
            })
          ).length
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateFilter]);

  const handleDateChange = (selectedDates: any) => {
    setDateFilter({
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
    });
  };

  useMemo(() => {
    setLoading(true);
    if (apiData?.length > 0) {
      let data: any = [];
      data.totalSchools = 0;
      data.childrenPopulation = 0;
      data.totalMealsServed = 0;
      data.kitchensPerSubCounty = 0;
      data.totalmale = 0;
      data.failed_double_tap = 0;
      data.failed_low_balance = 0;
      data.meals_produced = 0;
      apiData.forEach((subCounty: any) => {
        data.failed_double_tap += subCounty.failed_tap_count_doubletap;
        data.failed_low_balance += subCounty.failed_tap_count_lobalance;
        data.kitchensPerSubCounty += subCounty.total_kitchens;
        data.totalSchools += subCounty.total_schools;
        data.meals_produced += subCounty.meals_produced;
        data.childrenPopulation += subCounty.total_population;
        data.totalmale += subCounty.total_male;
        data.totalMealsServed +=
          subCounty.served_meal_count_female_nonsponsored +
          subCounty.served_meal_count_male_nonsponsored +
          subCounty.served_meal_count_male_sponsored +
          subCounty.served_meal_count_female_sponsored;
      });
      data.totalfemale = data.childrenPopulation - data.totalmale;
      setGenderData({
        labels: ["Boys", "Girls"],
        datasets: [
          {
            backgroundColor: ["#7EA829", "#eab308"],
            data: [data.totalmale, data.totalfemale],
          },
        ],
      });
      setStatisticalData(data);
      setChartData({
        labels: ["Payment On Time", "Accounts with Insufficient Balance"],
        datasets: [
          {
            data: [9, 1],
            backgroundColor: ["#eab308", "#1E6D3B"],
          },
        ],
      });
      setLoading(false);
    }
  }, [apiData]);

  const fimNcc = [
    {
      id: 1,
      title: "Total Sub-Counties",
      figure: `${apiData?.length}`,
      icon: <ImLocation className="h-full w-full" />,
      bgColour: "bg-green-400",
      totalSupported: `${apiData?.length}`,
      totalCount: 17,
      totalSupportedText: "Supported sub-counties",
      totalCountText: "Targeted sub-counties",
    },
    {
      id: 2,
      title: "Total number of Wards",
      figure: `${totalWard}`,
      icon: <ImLocation className="h-full w-full" />,
      bgColour: "bg-blue-400",
      totalSupported: `${totalWard}`, // Add actual data
      totalCount: 85,
      totalSupportedText: "Supported Wards",
      totalCountText: "Targeted Wards",
    },
    {
      id: 3,
      title: "Number of schools",
      figure: `${statisticalData?.totalSchools}`,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-indigo-400",
      totalSupported: `${statisticalData?.totalSchools}`, // Add actual data
      totalCount: 234,
      totalSupportedText: "Supported schools",
      totalCountText: "Targeted schools",
    },
    {
      id: 5,
      title: "Number of Meals Produced",
      figure: `${statisticalData?.meals_produced?.toLocaleString()}`,
      icon: <CgBowl className="h-full w-full" />,
      bgColour: "bg-red-400",
    },
  ];

  const fimOnly = [
    {
      id: 4,
      title: "Number of Meals Served",
      figure: `${statisticalData?.totalMealsServed?.toLocaleString()}`,
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
    <div className="mx-4 mt-3">
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <DateFilter onFilter={handleDateChange} />
          <div className="grid grid-cols-2 gap-4 my-4 bg-gray-100 border border-gray-200 rounded-md md:grid-cols-2 sm:grid-cols-1">
            <div className="m-10">
              <Image src={keMap} alt="Kenya map" width={1500} height={1500} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-2 mx-4">
              {records.map((record: IRecords, index: number) => (
                <div
                  key={record.id}
                  id={`summary-card-${index}`}
                  className="flex flex-col min-w-0 mb-3 border border-f4e-f4e-green break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border"
                >
                  <div className="flex-auto p-2">
                    <div className="flex flex-wrap justify-between px-2">
                      <div className="flex-none w-2/3 max-w-full px-2">
                        <div>
                          <div>
                            <p
                              className={`mb-0 font-sans font-semibold leading-normal text-xs ${
                                record.title === "Number of Meals Served"
                                  ? "text-lg"
                                  : ""
                              }`}
                            >
                              {record.title}
                            </p>
                            <h5
                              className={`mb-0 font-bold ${
                                record.title === "Number of Meals Served"
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
                      {record.title !== "Number of Meals Served" && (
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
                Total number of the meals served in Nairobi county since the
                program started
              </Tooltip>
            </div>
          </div>

          {view == "fim" && (
            <div className="p-2">
              <div className="z-2 grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-3 mt-4 w-full h-[400px]">
                <>
                  {chartData && chartData.labels && chartData.datasets ? (
                    <DoughnutCharts data={chartData} options={paymentOptions} />
                  ) : (
                    <div>Chart data is not available</div>
                  )}
                  <DoughnutCharts
                    data={utilizationMetrics}
                    options={utilizationOptions}
                  />
                  {genderData && genderData.labels && genderData.datasets ? (
                    <PieCharts data={genderData} options={genderRatioOptions} />
                  ) : (
                    <div>Chart data is not available</div>
                  )}
                </>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
