import React from "react";
import { IGraph } from "../../utils/types";
import { Line } from "react-chartjs-2";

const LineGraph = ({ data, options }: IGraph) => {
  return (
    <div className="bg-gray-100 p-4 border rounded-lg w-[100%]">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
