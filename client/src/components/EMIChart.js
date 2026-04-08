import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend);

function EMIChart({ data }) {
  const chartData = {
    labels: data.map((d) => `M${d.month}`),
    datasets: [
      {
        label: "Principal",
        data: data.map((d) => d.principal),
      },
      {
        label: "Interest",
        data: data.map((d) => d.interest),
      },
    ],
  };

  return <Bar data={chartData} />;
}

export default EMIChart;