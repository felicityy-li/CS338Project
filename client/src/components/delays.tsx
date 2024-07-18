import React, { useEffect, useState } from "react";
import { fetchDelays } from "../services/services.ts";
import { Delay } from "../types/delayType.ts";

const Delays: React.FC = () => {
  const [delays, setDelays] = useState<Delay[]>([]);

  useEffect(() => {
    const getDelays = async () => {
      try {
        const data = await fetchDelays();
        setDelays(data);
      } catch (e) {
        console.error(e);
      }
    };
    getDelays();
  }, []);
  console.log(delays[0]);
  return (
    <div>
      <div>{}</div>
    </div>
  );
};

export default Delays;
