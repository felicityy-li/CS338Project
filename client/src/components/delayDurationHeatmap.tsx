import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { fetchDelayDuration } from "../services/fancyFeatureServices.ts";

interface HeatmapDataPoint {
  x: string;
  y: number;
}

interface HeatmapSeries {
  name: string;
  data: HeatmapDataPoint[];
}

const DelayDurationHeatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<HeatmapSeries[]>([]);

  useEffect(() => {
    const getDelayData = async () => {
      try {
        const data = await fetchDelayDuration();
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const formattedData: HeatmapSeries[] = daysOfWeek.map((day) => ({
          name: day,
          data: [],
        }));

        data.forEach((item) => {
          const dayIndex = new Date(item.DelayDate).getDay();
          formattedData[dayIndex].data.push({
            x: new Date(item.DelayDate).toLocaleDateString(),
            y: item.TotalDelayDuration,
          });
        });
        setHeatmapData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
    getDelayData();
  }, []);

  const chartOptions = {
    chart: {
      type: "heatmap",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB"],
    title: {
      text: "Delay Duration Times of the Year 2023",
      style: {
        fontSize: "16x",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "yyyy-MM-dd",
      },
      title: {
        text: "Date",
        style: {
          fontSize: "16x",
        },
      },
    },
    yaxis: {
      title: {
        text: "Days of the Week",
        style: {
          fontSize: "16x",
        },
      },
      labels: {
        formatter: (value: number) => {
          const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          return daysOfWeek[value];
        },
      },
    },
  };

  if (heatmapData.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <Chart
        options={chartOptions}
        series={heatmapData}
        type="heatmap"
        height={350}
      />
    </div>
  );
};

export default DelayDurationHeatmap;
