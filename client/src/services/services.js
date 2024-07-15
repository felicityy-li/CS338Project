import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const fetchFlightStatus = async () => {
  try {
    const response = await api.get("/flight_status");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchPassengerData = async () => {
  try {
    const response = await api.get("/passenger_data");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchPassengerCheckIn = async () => {
  try {
    const response = await api.get("/passenger_check_in");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchPlaneDetails = async () => {
  try {
    const response = await api.get("/plane_details");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchDelays = async () => {
  try {
    const response = await api.get("/delays");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchCargo = async () => {
  try {
    const response = await api.get("/cargo");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
