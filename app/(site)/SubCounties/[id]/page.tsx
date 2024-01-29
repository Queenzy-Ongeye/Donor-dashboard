"use client";
import React, { useEffect, useState } from "react";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import { ImLocation } from "react-icons/im";
import { Chart, registerables } from "chart.js";
import ReusableTable from "../../Components/ReusableTable";
import {
  WardHeaderFim,
  WardHeaderFimNcc,
  wardsHeaders,
} from "../../utils/data";
import { CgBowl } from "react-icons/cg";
import {
  paymentOptions,
  utilizationOptions,
} from "../../Components/ReusableCharts/GraphOptions";
import DoughnutCharts from "../../Components/ReusableCharts/DoughnutCharts";
import { Tooltip } from "react-tooltip";
import { apiPost } from "@/app/helpers/http-api";
import DateFilter from "../../Components/Filter/filter";
import { useAppContext } from "@/app/context/AppContext";

Chart.register(...registerables);

const state = {
  labels: ["Total utilization", "Total Population Unutilized"],
  datasets: [
    {
      backgroundColor: ["#7EA829", "#eab308"],
      data: [78, 22],
    },
  ],
};

const parentData = {
  labels: ["Inactive Accounts", "Payment on time", "No payments made"],
  datasets: [
    {
      backgroundColor: ["#7EA829", "#eab308", "#1E6D3B"],
      data: [25, 65, 10],
    },
  ],
};

const SubCountyDetail = ({ params }: any) => {
  const { view } = useAppContext();
  let WardHeader;
  if (view === "fim") {
    WardHeader = [...WardHeaderFimNcc, ...WardHeaderFim];
  } else {
    WardHeader = [...WardHeaderFimNcc];
  }

  const [subCountyData, setSubCountyData] = useState<any>([]);
  const [statisticalData, setStatisticalData] = useState<any>([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date("2023/08/28"),
    endDate: new Date(),
  });
  const id = params.id;
  useEffect(() => {
    const fetchData = async () => {
      setSubCountyData(
        await apiPost("/ciff/web/group-by/search", {
          startDate: dateFilter.startDate,
          endDate: dateFilter.endDate,
          subCounty: id.replace("%20", " "),
        })
      );
    };
    fetchData();
  }, [dateFilter.startDate, id]);

  useEffect(() => {
    let data: any = [];
    data.name = subCountyData[0]?.sub_county ?? id;
    data.totalWards = subCountyData.length;
    data.totalSchools = 0;
    data.childrenPopulation = 0;
    data.totalMealsServed = 0;
    data.kitchensPerSubCounty = 0;
    subCountyData.forEach((ward: any) => {
      data.kitchensPerSubCounty += ward.total_kitchens;
      data.totalSchools += ward.total_schools;
      data.childrenPopulation += ward.total_population;
      data.totalMealsServed +=
        ward.served_meal_count_female_nonsponsored +
        ward.served_meal_count_male_nonsponsored +
        ward.served_meal_count_male_sponsored +
        ward.served_meal_count_female_sponsored;
    });
    setStatisticalData(data);
  }, [subCountyData]);
  const handleDateChange = (selectedDates: any) => {
    setDateFilter({
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
    });
  };
  const fimNcc = [
    {
      id: 1,
      title: `Wards Enrolled`,
      figure: `${statisticalData?.totalWards}`,
      icon: <ImLocation className="h-full w-full" />,
      bgColour: "bg-blue-400",
    },
    {
      id: 2,
      title: "Total Schools Enrolled",
      figure: ` ${statisticalData?.totalSchools}`,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-green-400",
    },
    {
      id: 3,
      title: "Total Students Enrolled",
      figure: `${statisticalData?.childrenPopulation?.toLocaleString()}`,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-indigo-400",
    },
    {
      id: 5,
      title: "Total Meals Produced",
      figure: `${
        statisticalData?.totalMealsProduced
          ? statisticalData?.totalMealsProduced?.toLocaleString()
          : 0
      }`,
      icon: <CgBowl className="h-full w-full" />,
      bgColour: "bg-red-400",
    },
    {
      id: 6,
      title: `Number of kitchens`,
      figure: `${statisticalData?.kitchensPerSubCounty?.toLocaleString()}`,
      icon: <FaSchoolCircleCheck className="h-full w-full" />,
      bgColour: "bg-indigo-400",
    },
  ];

  const fimOnly = [
    {
      id: 4,
      title: "Total Meals Served",
      figure: `${statisticalData?.totalMealsServed?.toLocaleString()} `,
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
      <div className="font-semibold text-center">
        <h1 className="text-3xl">{statisticalData?.name} sub-county</h1>
      </div>
      <DateFilter onFilter={handleDateChange} />
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 mx-4">
        {records.map((record, index) => (
          <div
            key={record.id}
            id={`sub-card-${index}`}
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

      <div className="z-2 grid grid-cols-1 gap-8 sm:grid-cols-2 mt-4 w-full h-[400px]">
        <DoughnutCharts data={state} options={utilizationOptions} />
        <DoughnutCharts data={parentData} options={paymentOptions} />
      </div>
      <ReusableTable
        tableColumns={WardHeader}
        tableData={subCountyData}
        path={id ? `/wards/` : ""}
        headers={wardsHeaders}
        title={"Wards per sub-county list"}
      />
      <Tooltip
        anchorSelect={`#sub-card-0`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of wards enrolled into the feeding program for each
        Sub-County
      </Tooltip>
      <Tooltip
        anchorSelect={`#sub-card-1`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of Schools enrolled into the feeding program in this
        Sub-County.
      </Tooltip>
      <Tooltip
        anchorSelect={`#sub-card-2`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of students enrolled into the feeding program in this
        Sub-County.
      </Tooltip>
      <Tooltip
        anchorSelect={`#sub-card-3`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of meals served in this Sub-County.
      </Tooltip>
      <Tooltip
        anchorSelect={`#sub-card-4`}
        place="top"
        style={{ backgroundColor: "#357a38", color: "#fff" }}
      >
        Total number of kitchens in this Sub-County.
      </Tooltip>
    </div>
  );
};

export default SubCountyDetail;
