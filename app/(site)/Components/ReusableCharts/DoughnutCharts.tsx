import { Doughnut } from "react-chartjs-2";

interface IDoughnut {
  data: number[] | any;
  options: string | any;
}
const DoughnutCharts = ({ data, options }: IDoughnut) => {
  return (
    <div className="bg-gray-100 p-4 border rounded-lg">
      <Doughnut data={data} options={options} />
    </div>
  );
};
export default DoughnutCharts;
