import { Bar } from "react-chartjs-2";

interface IBarData {
  stateData: any;
  options: any;
  id?: any;
}
const BarGraph = ({ stateData, options }: IBarData) => {
  return (
    <div className="bg-gray-100 p-4 border rounded-lg">
      <Bar data={stateData} height="250px" options={options} />
    </div>
  );
};
export default BarGraph;
