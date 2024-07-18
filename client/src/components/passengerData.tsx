import React, { useEffect, useState } from "react";
import { fetchPassengerData } from "../services/services.ts";
import { Passenger } from "../types/passengerTypes.ts";

const PassengerData: React.FC = () => {
  const [passengerData, setPassengerData] = useState<Passenger[]>([]);

  useEffect(() => {
    const getPassengerData = async () => {
      try {
        const data = await fetchPassengerData();
        setPassengerData(data);
      } catch (e) {
        console.error(e);
      }
    };
    getPassengerData();
  }, []);
  return (
    <div>
      <ul>
        {passengerData.map((x) => (
          <li>
            {x.Airline}, {x.City},{x.FirstName},{x.FlightsWithAirline},
            {x.LastName},{x.PassengerId}, {x.State}, {x.TotalFlights}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PassengerData;
