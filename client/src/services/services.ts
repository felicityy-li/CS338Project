/**
 * frontend fetch functions to fetch the data from the backend
 * fetches all the data for the features implemented
 */

import axios from "axios";

import { Flight, AirlineTypes, AirlineDestinations } from "../types/flightType";
import { Delay } from "../types/delayType";
import { CheckIn } from "../types/passengerTypes";
import { PlaneManufactureYears } from "../types/planeType";
import { CargoBasedType } from "../types/cargoType";

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

export const fetchPassengerData = async (): Promise<AirlineDestinations[]> => {
  try {
    const response = await api.get<AirlineDestinations[]>("/passenger_data");
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

export const fetchPlaneManufactureYears = async (): Promise<
  PlaneManufactureYears[]
> => {
  try {
    const response = await api.get<PlaneManufactureYears[]>("/plane_details");
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

export const fetchCargoTypesData = async (
  type: string
): Promise<CargoBasedType[]> => {
  try {
    const response = await api.get<CargoBasedType[]>("/cargo_types_data", {
      params: {
        type: type,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
