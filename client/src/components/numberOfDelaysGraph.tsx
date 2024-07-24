import React, { useEffect, useState, useRef } from "react";
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

const NumDelaysGraph: React.FC<DelayGraphProps> = () => {
  const [delays, setDelays] = useState<Delay[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const dayOptions = [60, 30, 20, 10, 5];
  const [days, setDays] = useState(30);
  const intervalRef = useRef(null);

  useEffect(() => {
    const getDelays = async () => {
      try {
        const data = await fetchDelays(days);
        const sortedData = data.sort(
          (a, b) =>
            new Date(a.FlightDate).getTime() - new Date(b.FlightDate).getTime()
        );
        setDelays(sortedData);
      } catch (e) {
        console.error(e);
      }
    };
    getDelays();
  }, [days]);

  useEffect(() => {
    const cycleDays = () => {
      setDays((prevDays) => {
        const currentIndex = dayOptions.indexOf(prevDays);
        const nextIndex = (currentIndex + 1) % dayOptions.length;
        return dayOptions[nextIndex];
      });
    };

    const startTimer = () => {
      intervalRef.current = setInterval(cycleDays, 3000);
    };

    if (!isHovered) {
      startTimer();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
        display: false,
      },
      title: {
        display: true,
        text: "Number of Delays Certain Time Periods",
        font: {
          size: 30,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Flight Dates",
          font: {
            size: 18,
          },
        },
        ticks: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Delays",
          font: {
            size: 18,
          },
        },
      },
    },
  };

  return (
    <div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default NumDelaysGraph;
