import React, { useEffect, useState } from "react";
import { fetchDelays } from "../services/services.ts";
import { Delay, DelayGraphProps } from "../types/delayType.ts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NumDelaysGraph: React.FC<DelayGraphProps> = ({ days }) => {
  const [delays, setDelays] = useState<Delay[]>([]);

  useEffect(() => {
    const getDelays = async () => {
      try {
        const data = await fetchDelays(days);
        setDelays(data);
      } catch (e) {
        console.error(e);
      }
    };
    getDelays();
  }, [days]);

  const data = {
    labels: delays.map((delay) => delay.FlightDate),
    datasets: [
      {
        type: "bar" as const,
        label: "Number of Delays",
        data: delays.map((delay) => delay.NumDelays),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        type: "line" as const,
        label: "Total Delay Duration",
        data: delays.map((delay) => delay.NumDelays),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Number of Delays and Total Delay Duration Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  console.log(delays);
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default NumDelaysGraph;
