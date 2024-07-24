export interface Flight {
  FlightNum: number;
  Airline: string;
  ScheduledDate: string;
  ScheduledTime: string;
  FlightId: number;
  PlaneId: string;
}

export interface AirlineTypes {
  Airline: string;
}

export interface AirlineDestinations {
  Airline: string;
  NumberOfDestinations: number;
}
