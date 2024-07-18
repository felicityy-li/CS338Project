import React, { useEffect, useState } from "react";
import { fetchCargo } from "../services/services.ts";
import { Cargo } from "../types/cargoType.ts";

const CargoManagement: React.FC = () => {
  const [cargoData, setCargoData] = useState<Cargo[]>([]);

  useEffect(() => {
    const getCargoData = async () => {
      try {
        const data = await fetchCargo();
        setCargoData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCargoData();
  }, []);
  console.log(cargoData);
  return <div></div>;
};

export default CargoManagement;
