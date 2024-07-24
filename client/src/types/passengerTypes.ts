export interface Passenger {
  PassengerId: number;
  FirstName: string;
  LastName: string;
  City: string;
  State: string;
  TotalFlights: number;
  Airline: string;
  FlightsWithAirline: number;
}

export interface CheckIn {
  FlightNum: number;
  Airline: string;
  ScheduledDate: string;
  ScheduledTime: string;
}
