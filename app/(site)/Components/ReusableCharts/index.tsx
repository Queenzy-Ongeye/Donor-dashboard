"use client";

import BarGraph from "./BarGraph";
import {
  genderPropotionOptions,
  paymentOptions,
  utilizationOptions,
} from "./GraphOptions";
import DoughnutCharts from "./DoughnutCharts";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Tooltip as ReactTooltip } from "react-tooltip";

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
      label: "Boys Propotion by sub-county",
      backgroundColor: "#7EA829",
      data: [
        38, 47, 19, 20, 40, 50, 39, 38, 47, 19, 20, 38, 47, 19, 20, 67, 98,
      ],
    },
    {
      label: "Girls Propotion by sub-county",
      backgroundColor: "#eab308",
      data: [
        42, 40, 15, 30, 59, 50, 39, 38, 47, 19, 20, 32, 49, 12, 37, 75, 80,
      ],
    },
  ],
};

const ReusableCharts = () => {
  const records = [
    {
      id: 10,
      options: utilizationOptions,
      data: state,
    },
    {
      id: 12,
      options: genderPropotionOptions,
      data: stateData,
    },
    {
      id: 13,
      options: paymentOptions,
      data: parentData,
    },
  ];
  return (
    <>
      <div className="z-2 grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-3 mt-4 w-full">
        <DoughnutCharts
          data-tooltip-id="utilize"
          data={state}
          options={utilizationOptions}
        />

        <BarGraph stateData={stateData} options={genderPropotionOptions} />

        <DoughnutCharts data={parentData} options={paymentOptions} />
      </div>

      <ReactTooltip
        id="utilize"
        place="top"
        content="Hello world! I'm a Tooltip"
      />
    </>
  );
};
export default ReusableCharts;
