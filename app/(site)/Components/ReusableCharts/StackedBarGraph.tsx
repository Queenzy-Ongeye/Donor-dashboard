import React from "react";
import { Bar } from "react-chartjs-2";

interface IBarData {
  data: any;
  options: any;
  id?: any;
}
const StackedBarGraph = ({ data, options }: IBarData) => {
  return (
    <div className="bg-gray-100 p-4 border rounded-lg">
      <Bar data={data} height="400px" options={options} />
    </div>
  );
};

export default StackedBarGraph;
