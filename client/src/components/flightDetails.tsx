import React, { useEffect, useState } from "react";
import { fetchFlightStatus } from "../services/services.ts";
import { Flight } from "../types/flightType.ts";

const FlightStatus: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const getFlights = async () => {
      try {
        const data = await fetchFlightStatus();
        setFlights(data);
      } catch (error) {
        console.error(error);
      }
    };
    getFlights();
  }, []);

  return (
    <div>
      <ul>
        {flights.map((flight) => (
          <li key={flight.FlightNum}>
            {flight.FlightNum} - {flight.Airline} - {flight.ScheduledDate} -{" "}
            {flight.ScheduledTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightStatus;
