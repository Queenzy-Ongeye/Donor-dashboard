import React from "react";
import { Pie } from "react-chartjs-2";

interface IPie {
  data: number[] | any;
  options: string | any;
}

const PieCharts = ({ data, options }: IPie) => {
  return (
    <div className="bg-gray-100 p-4 border rounded-lg">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieCharts;
