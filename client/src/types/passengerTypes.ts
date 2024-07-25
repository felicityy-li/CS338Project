export interface Passenger {
  Airline: string;
  Destination: string;
}

export interface CheckIn {
  FlightNum: number;
  Airline: string;
  ScheduledDate: string;
  ScheduledTime: string;
}

export interface PassengerLogin {
  Count: number;
}
