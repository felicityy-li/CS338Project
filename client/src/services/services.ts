import axios from "axios";

import { Flight, AirlineTypes } from "../types/flightType";
import { Delay } from "../types/delayType";
import { Passenger, CheckIn } from "../types/passengerTypes";
import { Plane } from "../types/planeType";
import { Cargo } from "../types/cargoType";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const fetchFlightStatus = async (limit?: number): Promise<Flight[]> => {
  try {
    const response = await api.get<Flight[]>("/flight_status", {
      params: { limit },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchPassengerData = async (): Promise<Passenger[]> => {
  try {
    const response = await api.get<Passenger[]>("/passenger_data");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchDistinctAirlines = async (): Promise<AirlineTypes[]> => {
  try {
    const response = await api.get<AirlineTypes[]>("/distinct_airlines");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchPassengerCheckIn = async (
  passengerIds: string[]
): Promise<CheckIn[]> => {
  try {
    const response = await api.get<CheckIn[]>("/passenger_check_in", {
      params: {
        passengerIds: passengerIds,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchPlaneDetails = async (): Promise<Plane[]> => {
  try {
    const response = await api.get<Plane[]>("/plane_details");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchDelays = async (numDays: number): Promise<Delay[]> => {
  try {
    const response = await api.get<Delay[]>("/delays", {
      params: {
        numDays: numDays,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchCargo = async (): Promise<Cargo[]> => {
  try {
    const response = await api.get<Cargo[]>("/cargo");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
