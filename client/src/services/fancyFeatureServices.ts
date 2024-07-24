import axios from "axios";

import { DelayDuration } from "../types/delayType";
import { Passenger, PassengerLogin } from "../types/passengerTypes";
import { PlaneManufactureYears } from "../types/planeType";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const fetchDelayDuration = async (): Promise<DelayDuration[]> => {
  try {
    const response = await api.get<DelayDuration[]>("/delay_dureation");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchPassengerRecs = async (): Promise<Passenger[]> => {
  try {
    const response = await api.get<Passenger[]>("/passenger_rec");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchOldestNewestManufacture = async (): Promise<
  PlaneManufactureYears[]
> => {
  try {
    const response = await api.get<PlaneManufactureYears[]>(
      "/oldest_newest_manufactured"
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchPassengerLogin = async (
  email: string,
  password: string
): Promise<PassengerLogin[]> => {
  try {
    const response = await api.get<PassengerLogin[]>("/login", {
      params: {
        email: email,
        password: password,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
