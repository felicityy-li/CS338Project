import React, { useEffect, useState } from "react";
import { fetchPlaneManufactureYears } from "../services/services.ts";
import { PlaneManufactureYears } from "../types/planeType.ts";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
} from "@mui/material";
import { Line } from "react-chartjs-2";

const PlaneManufactureYearsGraph: React.FC = () => {
  const [planeData, setPlaneData] = useState<PlaneManufactureYears[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    []
  );
  const manufacturerColors: { [key: string]: string } = {};
  const manufacturers = [
    "Korean Aerospace Industries",
    "Airbus",
    "Beechcraft",
    "Tupolev",
    "Indonesian Aerospace",
    "Boeing",
    "Ilyushin",
  ];

  useEffect(() => {
    const getPlaneData = async () => {
      try {
        const data = await fetchPlaneManufactureYears();
        setPlaneData(data);
        processChartData(data, selectedManufacturers);
      } catch (error) {
        console.error(error);
      }
    };
    getPlaneData();
  }, []);

  useEffect(() => {
    processChartData(planeData, selectedManufacturers);
  }, [selectedManufacturers, planeData]);

  const getManufacturerColor = (manufacturer: string) => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F3FF33', '#FF8C33', '#8C33FF'];
    return colors[manufacturers.indexOf(manufacturer) % colors.length];
  };

  const processChartData = (
    data: PlaneManufactureYears[],
    selectedManufacturers: string[]
  ) => {
    const filteredData = data.filter((item) =>
      selectedManufacturers.includes(item.Manufacturer)
    );
    const manufacturersData: { [key: string]: { [key: number]: number } } = {};

    filteredData.forEach((item) => {
      const { Manufacturer, ManufacturerYear, PassengerCapacity } = item;
      if (!manufacturersData[Manufacturer]) {
        manufacturersData[Manufacturer] = {};
        manufacturerColors[Manufacturer] = getManufacturerColor(Manufacturer);
      }
      manufacturersData[Manufacturer][ManufacturerYear] = PassengerCapacity;
    });

    const chartLabels = Array.from(
      new Set(
        Object.values(manufacturersData).flatMap((data) =>
          Object.keys(data).map(Number)
        )
      )
    ).sort((a, b) => a - b);

    const chartDatasets = Object.keys(manufacturersData).map((manufacturer) => {
      const data = Object.entries(manufacturersData[manufacturer])
        .sort(([aYear], [bYear]) => Number(aYear) - Number(bYear))
        .map(([year, capacity]) => ({ x: Number(year), y: capacity }));

      return {
        label: manufacturer,
        data: data,
        borderColor: manufacturerColors[manufacturer],
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        fill: false
      };
    });
    setChartData({
      labels: chartLabels,
      datasets: chartDatasets,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const manufacturer = event.target.name;
    setSelectedManufacturers((prev) =>
      prev.includes(manufacturer)
        ? prev.filter((m) => m !== manufacturer)
        : [...prev, manufacturer]
    );
  };

  if (!chartData) return <div>Loading...</div>;

  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "3%" }}>
      <FormControl component="fieldset">
        <FormGroup style={{ flexDirection: "row" }}>
          {manufacturers.map((manufacturer) => (
            <FormControlLabel
              key={manufacturer}
              control={
                <Checkbox
                  checked={selectedManufacturers.includes(manufacturer)}
                  onChange={handleCheckboxChange}
                  name={manufacturer}
                />
              }
              label={manufacturer}
            />
          ))}
        </FormGroup>
      </FormControl>

      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed.y !== null) {
                      label += context.parsed.y;
                    }
                    return label;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Manufacturer Year",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Passenger Capacity",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default PlaneManufactureYearsGraph;
