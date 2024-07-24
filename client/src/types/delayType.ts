export interface Delay {
  FlightDate: string;
  NumDelays: number;
  TotalDelayDuration: number;
}

export interface DelayGraphProps {
  days: number;
}

export interface DelayDuration {
  DelayDate: string;
  TotalDelayDuration: number;
}
