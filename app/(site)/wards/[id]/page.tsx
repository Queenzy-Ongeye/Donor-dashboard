"use client";
import { useEffect, useMemo, useState } from "react";
import ReusableTable from "../../Components/ReusableTable";
import {
  SchoolHeadersFim,
  SchoolHeadersFimNcc,
  schoolDataFim,
  schoolsCSVHeaders,
} from "../../utils/data";
import { Chart, registerables } from "chart.js";
import * as Sentry from "@sentry/nextjs";
import { FaChildren, FaSchoolCircleCheck } from "react-icons/fa6";
import { CgBowl } from "react-icons/cg";
import {
  monthTrendOptions,
  paymentOptions,
} from "../../Components/ReusableCharts/GraphOptions";
import LineGraph from "../../Components/ReusableCharts/LineGraph";
import PieCharts from "../../Components/ReusableCharts/PieCharts";
import { getSession } from "next-auth/react";
import { useFilterContext } from "../../context/FilterContext";
import { Tooltip } from "react-tooltip";
import { apiPost } from "@/app/helpers/http-api";
import DateFilter from "../../Components/Filter/filter";
import { useAppContext } from "@/app/context/AppContext";

Chart.register(...registerables);

const state = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      backgroundColor: ["#7EA829", "#eab308"],
      data: [78, 82, 56, 44, 80, 78, 60, 67, 60, 0, 0, 0],
    },
  ],
};

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
  ward_id: any;
}
const WardDetailPage = ({ params }: any) => {
  const { view } = useAppContext();
  let SchoolHeaders;
  if (view === "fim") {
    SchoolHeaders = [...SchoolHeadersFimNcc, ...SchoolHeadersFim];
  } else {
    SchoolHeaders = [...SchoolHeadersFimNcc];
  }

  const id = params?.id;
  const { filters, apiData, setApiData } = useFilterContext();
  const [totalSchool, setTotalSchool] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const [data, setData] = useState<any>();
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date("2023/08/28"),
    endDate: new Date(),
  });

  useEffect(() => {
    const fetchWardData = async () => {
      const session = await getSession();
      if (id !== undefined && id !== null) {
        try {
          setApiData(
            await apiPost(`/ciff/web/group-by/search`, {
              startDate: dateFilter.startDate,
              endDate: dateFilter.endDate,
              wardId: id,
            })
          );
        } catch (error) {
          Sentry.captureException(error);
        }
      }
    };
    fetchWardData();
  }, [setApiData, dateFilter, id]);

  const handleDateChange = (selectedDates: any) => {
    setDateFilter({
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
    });
  };

  const wardName = apiData?.[0]?.ward_name || "";

  const chartData = useMemo(() => {
    if (apiData?.length > 0) {
      setTotalSchool(apiData.length);
      let data: any = [];
      data.childrenPopulation = 0;
      data.totalMealsServed = 0;
      data.kitchensPerWard = 0;
      apiData.forEach((ward: any) => {
        data.kitchensPerWard += ward.total_kitchens;
        data.childrenPopulation += ward.total_population;
        data.totalMealsServed +=
          ward.served_meal_count_female_nonsponsored +
          ward.served_meal_count_male_nonsponsored +
          ward.served_meal_count_male_sponsored +
          ward.served_meal_count_female_sponsored;
      });
      setData(data);
      const activeTagCount = apiData.reduce(
        (total: number, analysis: IWard) => {
          return total + analysis.active_tag_count;
        },
        0
      );

      const failedTapDoubleTapCount = apiData.reduce(
        (total: number, analysis: IWard) => {
          return total + analysis.failed_tap_count_doubletap;
        },
        0
      );

      const failedTapLocalBalanceCount = apiData.reduce(
        (total: number, analysis: IWard) => {
          return total + analysis.failed_tap_count_lobalance;
        },
        0
      );

      return {
        labels: ["Payments On Time", "Accounts with Insufficient Balance"],
        datasets: [
          {
            label: "",
            data: [1, 7],
            backgroundColor: ["#eab308", "#1E6D3B"],
          },
        ],
      };
    }
  }, [apiData, id]);

  const fimNcc = [
    {
      id: 1,
      title: "Total Schools Enrolled",
      figure: `${totalSchool}`,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-indigo-400",
    },
    {
      id: 2,
      title: "Total Students Enrolled",
      figure: `${data?.childrenPopulation?.toLocaleString()}`,
      icon: <FaChildren className="h-full w-full" />,
      bgColour: "bg-indigo-400",
    },
    {
      id: 3,
      title: "Total Meals Produced",
      figure: `${data?.totalMealsProduced?.toLocaleString()}`,
      icon: <CgBowl className="h-full w-full" />,
      bgColour: "bg-red-400",
    },
  ];

  const fimOnly = [
    {
      id: 3,
      title: "Total Meals Served",
      figure: `${data?.totalMealsServed?.toLocaleString()}`,
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
    <div>
      <div className="mt-2">
        <h1 className="text-gray-800 justify-center font-semibold text-center text-3xl">
          {`${wardName.toUpperCase()}`}
        </h1>
      </div>
      <DateFilter onFilter={handleDateChange} />
      <div
        className={`grid grid-cols-1 ${
          view == "ncc"
            ? "md:grid-cols-3 lg:grid-cols-3 gap-4"
            : "md:grid-cols-2 lg:grid-cols-2 gap-4"
        } mt-2 mx-4`}
      >
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
                      <p className="mb-0 font-sans font-semibold leading-normal text-xs">
                        {record.title}
                      </p>
                      <h5 className="mb-0 font-bold">{record.figure}</h5>
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
      <div className="mx-4">
        <div className="z-2 grid grid-cols-1 gap-2 sm:grid-cols-2 my-2 w-full h-[400px]">
          <LineGraph data={state} options={monthTrendOptions} />

          {chartData && chartData.labels && chartData.datasets ? (
            <PieCharts data={chartData} options={paymentOptions} />
          ) : (
            <div>Chart data is not available</div>
          )}
        </div>
        <ReusableTable
          tableColumns={SchoolHeaders}
          tableData={apiData}
          path={id ? `/schools/` : ""}
          headers={schoolsCSVHeaders}
          title={`Schools in ${
            apiData[0]?.ward_name?.toUpperCase() ?? ""
          } ward`}
        />
      </div>

      <Tooltip
        anchorSelect={`#ward-card-0`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of Schools enrolled into the feeding program in this Ward.
      </Tooltip>
      <Tooltip
        anchorSelect={`#ward-card-1`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of students enrolled into the feeding program in this Ward.
      </Tooltip>
      <Tooltip
        anchorSelect={`#ward-card-2`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of meals served in this Ward.
      </Tooltip>
    </div>
  );
};

export default WardDetailPage;
