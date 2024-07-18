import React, { useEffect, useState } from "react";
import { CheckIn } from "../types/passengerTypes";
import { fetchPassengerCheckIn } from "../services/services.ts";

const PassengerCheckIn: React.FC = () => {
  const [passengerData, setPassengerData] = useState<CheckIn[]>([]);
  useEffect(() => {
    const getPassengerCheckInData = async () => {
      try {
        const data = await fetchPassengerCheckIn();
        setPassengerData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPassengerCheckInData();
  }, []);
  console.log(passengerData);
  return <div>asdf</div>;
};

export default PassengerCheckIn;
