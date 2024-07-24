export interface CargoPlane {
  PlaneId: number;
  ModelNum: number;
  TotalCargo: number;
  TotalCargoWeight: number;
  AvergaeWeight: string;
}

export interface CargoBasedType {
  PlaneId: string;
  TotalCargo: number;
  TotalWeight: number;
  AverageWeight: number;
}
