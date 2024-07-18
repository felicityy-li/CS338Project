import React, { useEffect, useState } from "react";
import { fetchPlaneDetails } from "../services/services.ts";
import { Plane } from "../types/planeType.ts";

const PlaneDetails: React.FC = () => {
  const [planeData, setPlaneData] = useState<Plane[]>([]);

  useEffect(() => {
    const getPlaneData = async () => {
      try {
        const data = await fetchPlaneDetails();
        setPlaneData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPlaneData();
  }, []);
  console.log("here", planeData);
  return <div></div>;
};

export default PlaneDetails;
