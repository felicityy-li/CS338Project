import React, { useEffect, useState } from "react";
import { fetchCargoTypesData } from "../services/services.ts";
import { CargoBasedType } from "../types/cargoType";

import { Bubble } from "react-chartjs-2";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  FormGroup,
} from "@mui/material";

const CargoManagement: React.FC = () => {
  const [cargoData, setCargoData] = useState<CargoBasedType[]>([]);
  const [selectedCargoType, setSelectedCargoType] = useState<string>("Mail");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCargoType(event.target.name);
  };

  useEffect(() => {
    const getCargoData = async () => {
      try {
        const data = await fetchCargoTypesData(selectedCargoType);
        setCargoData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCargoData();
  }, [selectedCargoType]);

  const transformation = selectedCargoType === "Freight" ? 5000 : 300;

  const chartData = {
    datasets: [
      {
        name: "Cargo Data",
        data: cargoData.map((item, index) => ({
          x: index,
          y: item.TotalWeight,
          r: item.AverageWeight / transformation,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Plane ID",
        },
      },
      y: {
        title: {
          display: true,
          text: "Index",
        },
      },
    },
  };

  return (
    <div>
      <Typography variant="h6">Select Cargo Type</Typography>
      <FormControl component="fieldset">
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCargoType === "Freight"}
                onChange={handleCheckboxChange}
                name="Freight"
              />
            }
            label="Freight"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCargoType === "Mail"}
                onChange={handleCheckboxChange}
                name="Mail"
              />
            }
            label="Mail"
          />
        </FormGroup>
      </FormControl>

      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default CargoManagement;
