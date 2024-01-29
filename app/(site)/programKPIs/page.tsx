"use client";
import React, { useEffect, useState } from "react";
import LineGraph from "../Components/ReusableCharts/LineGraph";
import Chart from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);
import {
  AgeCoverage,
  AgeEnrollment,
  AgeUtilization,
  GradeCoverage,
  GradeEnrollment,
  GradeUtilization,
  coverageSubCounty,
  failedTaps,
  failedTapsAge,
  kitchenProductionOptions,
} from "../Components/ReusableCharts/GraphOptions";
import StackedBarGraph from "../Components/ReusableCharts/StackedBarGraph";
import BarGraph from "../Components/ReusableCharts/BarGraph";
import DateCountySchool from "../Components/Filter/DateCountySchool";
import LoadingSpinner from "@/app/LoadingSpinner";

const gradeUtilization = {
  labels: [
    "PP1",
    "PP2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
  ],
  datasets: [
    {
      label: "Total",
      data: [39, 33, 40, 56, 72, 60, 53, 45, 67],
      backgroundColor: "#1E6D3B",
      borderColor: "#1E6D3B",
      fill: false,
    },
    {
      label: "Girls",
      data: [21, 16, 19, 24, 45, 30, 22, 20, 30],
      backgroundColor: "#F56991",
      borderColor: "#F56991",
      fill: false,
    },
    {
      label: "Boys",
      data: [18, 17, 21, 32, 27, 30, 31, 25, 37],
      backgroundColor: "#4169e1",
      borderColor: "#4169e1",
      fill: false,
    },
  ],
};
const ageUtilization = {
  labels: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
  ],
  datasets: [
    {
      label: "Total",
      data: [0, 0, 15, 14, 18, 25, 34, 39, 35, 30, 43, 39, 56, 54, 23, 5, 0, 0],
      backgroundColor: "#1E6D3B",
      borderColor: "#1E6D3B",
      fill: false,
    },
    {
      label: "Girls",
      data: [0, 0, 7, 8, 10, 10, 22, 27, 20, 12, 20, 25, 26, 29, 10, 2, 0, 0],
      backgroundColor: "#F56991",
      borderColor: "#F56991",
      fill: false,
    },
    {
      label: "Boys",
      data: [0, 0, 8, 6, 8, 15, 12, 12, 15, 18, 23, 14, 30, 25, 13, 3, 0, 0],
      backgroundColor: "#4169e1",
      borderColor: "#4169e1",
      fill: false,
    },
  ],
};

const gradeEnrollment = {
  labels: [
    "PP1",
    "PP2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
  ],
  datasets: [
    {
      label: "Boys",
      data: [30, 21, 24, 23, 27, 19, 30, 23, 27],
      backgroundColor: "#4169e1",
      stack: "Stack 1",
    },
    {
      label: "Girls",
      data: [15, 26, 19, 10, 16, 26, 34, 29, 29],
      backgroundColor: "#F56991",
      stack: "Stack 1",
    },
  ],
};
const ageEnrollment = {
  labels: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
  ],
  datasets: [
    {
      label: "Boys",
      data: [0, 0, 8, 10, 14, 15, 27, 24, 30, 25, 27, 31, 24, 36, 22, 9, 0, 0],
      backgroundColor: "#4169e1",
      stack: "Stack 1",
    },
    {
      label: "Girls",
      data: [0, 0, 7, 8, 10, 10, 22, 27, 20, 12, 20, 25, 26, 29, 10, 2, 0, 0],
      backgroundColor: "#F56991",
      stack: "Stack 1",
    },
  ],
};

const unsuccessfulTaps = {
  labels: [
    "PP1",
    "PP2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
  ],
  datasets: [
    {
      label: "Total",
      data: [12, 18, 30, 30, 25, 20, 19, 17, 69],
      backgroundColor: "#1E6D3B",
      borderColor: "#1E6D3B",
    },
    {
      label: "Girls",
      data: [6, 9, 14, 16, 12, 11, 9, 9, 32],
      backgroundColor: "#F56991",
      borderColor: "#F56991",
    },
    {
      label: "Boys",
      data: [6, 8, 16, 14, 13, 9, 10, 8, 37],
      backgroundColor: "#4169e1",
      borderColor: "#4169e1",
    },
  ],
};
const unsuccessfulTapsAge = {
  labels: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
  ],
  datasets: [
    {
      label: "Total",
      data: [0, 0, 12, 18, 30, 30, 25, 20, 19, 17, 69, 54, 23, 12, 10, 9, 0, 0],
      backgroundColor: "#1E6D3B",
      borderColor: "#1E6D3B",
    },
    {
      label: "Girls",
      data: [0, 0, 6, 9, 14, 16, 12, 11, 9, 9, 32, 24, 10, 6, 4, 5, 0, 0],
      backgroundColor: "#F56991",
      borderColor: "#F56991",
    },
    {
      label: "Boys",
      data: [0, 0, 6, 8, 16, 14, 13, 9, 10, 8, 37, 30, 13, 6, 5, 4, 0, 0],
      backgroundColor: "#4169e1",
      borderColor: "#4169e1",
    },
  ],
};

const stateData = {
  labels: [
    "Westlands",
    "Langata",
    "Dagoretti South",
    "Dagoretti North",
    "Kibra",
    "Kamukunji",
    "Starehe",
    "Makadara",
    "Mathare",
    "Embakasi West",
    "Embakasi North",
    "Embakasi Central",
    "Embakasi East",
    "Embakasi South",
    "Ruaraka",
    "Roysambu",
    "Kasarani",
  ],
  datasets: [
    {
      label: "Coverage by Sub-County",
      backgroundColor: "#eab308",
      data: [
        42, 40, 15, 30, 59, 50, 39, 38, 47, 19, 20, 32, 49, 12, 37, 75, 80,
      ],
    },
  ],
};

const kitchenData = {
  labels: ["Kiambu", "Ruiru", "Juja", "Giga", "Dagoretti"],
  datasets: [
    {
      label: "Kitchen Production Trends",
      data: [30000, 22000, 45000, 80000, 30000],
      backgroundColor: ["#7EA829", "#eab308"],
    },
  ],
};
const ProgramKPIs = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const renderGraphs = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } finally {
        setLoading(false);
      }
    };

    renderGraphs();
  }, []);
  return (
    <div className="mx-4">
      {!loading ? (
        <>
          <div className="mt-2">
            <DateCountySchool />
          </div>
          <div>
            <h1 className="mt-2 font-bold text-lg">
              Utilization Analysis (Dummy Data)
            </h1>
            <div className="z-1 grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 w-[1000px] h-[300px]">
              <LineGraph data={gradeUtilization} options={GradeUtilization} />
              <LineGraph data={ageUtilization} options={AgeUtilization} />
            </div>
          </div>
          <div className="my-4 container">
            <h1 className="mt-2 font-bold text-lg">Enrollment Analysis</h1>
            <div className="z-1 grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
              <StackedBarGraph
                data={gradeEnrollment}
                options={GradeEnrollment}
              />
              <StackedBarGraph data={ageEnrollment} options={AgeEnrollment} />
            </div>
          </div>
          <div className="mt-4">
            <h1 className="mt-2 font-bold text-lg">Coverage Analysis</h1>
            <div className="z-1 grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 w-[1000px] h-[300px]">
              <LineGraph data={gradeUtilization} options={GradeCoverage} />
              <LineGraph data={ageUtilization} options={AgeCoverage} />
            </div>
          </div>
          <div className="mt-4">
            <h1 className="mt-2 font-bold text-lg">Failed Tap Analysis</h1>
            <div className="z-1 grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 w-[1000px] h-[300px]">
              <LineGraph data={unsuccessfulTaps} options={failedTaps} />
              <LineGraph data={unsuccessfulTapsAge} options={failedTapsAge} />
            </div>
          </div>
          <div className="mt-4">
            <div className="z-1 grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 w-[1000px] mb-2">
              <BarGraph stateData={stateData} options={coverageSubCounty} />
              <BarGraph
                stateData={kitchenData}
                options={kitchenProductionOptions}
              />
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ProgramKPIs;
