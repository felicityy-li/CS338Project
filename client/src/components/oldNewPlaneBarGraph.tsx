import React, { useEffect, useState } from "react";
import { PlaneManufactureYears } from "../types/planeType";
import { fetchOldestNewestManufacture } from "../services/fancyFeatureServices.ts";

const DelayDurationHeatmap: React.FC = () => {
  const [planeData, setPlaneData] = useState<PlaneManufactureYears[]>([]);

  useEffect(() => {
    const getPlaneData = async () => {
      try {
        const data = await fetchOldestNewestManufacture();
        setPlaneData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPlaneData();
  }, []);

  return <div></div>;
};

export default DelayDurationHeatmap;
