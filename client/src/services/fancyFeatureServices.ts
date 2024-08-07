/**
 * frontend services for the fancy features implemented
 */

import axios from "axios";

import { DelayDuration } from "../types/delayType";
import { Passenger } from "../types/passengerTypes";
import { PlaneManufactureYears } from "../types/planeType";
import { PopularDestinations } from "../types/flightType";

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

export const fetchPassengerRecs = async (
  airline: string,
  destination: string,
  citizenship: string
): Promise<Passenger[]> => {
  try {
    const response = await api.get<Passenger[]>("/passenger_rec", {
      params: {
        airline: airline,
        destination: destination,
        citizenship: citizenship,
      },
    });
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
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await api.get<{ success: boolean; message?: string }>(
      "/login",
      {
        params: {
          email: email,
          password: password,
        },
      }
    );

    if (response.data.success) {
      return { success: true };
    } else {
      return {
        success: false,
        message: response.data.message || "Invalid login details.",
      };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchPopularDestinations = async (
  citizenships: string[]
): Promise<PopularDestinations[]> => {
  try {
    const response = await api.get<PopularDestinations[]>(
      "/destination_popularities",
      {
        params: { citizenships: citizenships },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
