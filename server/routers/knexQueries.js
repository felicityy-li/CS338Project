const db = require("../config/knexDbConfig");

const feature1 = (limitVal) => {
  const query = db("Flights")
    .select(
      "FlightNum",
      "Airline",
      "ScheduledDate",
      "ScheduledTime",
      "FlightId",
      "PlaneId"
    )
    .orderBy(["ScheduledDate", "ScheduledTime"])
    .limit(limitVal);
  return query;
};

const feature2 = () => {
  const query = db("Flights")
    .select("Airline")
    .count("* as NumberOfDestinations")
    .where("Departure", 1)
    .groupBy("Airline")
    .orderBy("NumberOfDestinations", "desc");
  return query;
};

const airlineQuery = () => {
  const query = db("Flights").distinct("Airline");
  return query;
};

const feature3 = (passengerIds) => {
  const query = db("FLIGHTS")
    .select(
      "FLIGHTS.FlightNum",
      "FLIGHTS.Airline",
      "FLIGHTS.Terminal",
      "FLIGHTS.ScheduledDate",
      "FLIGHTS.ScheduledDate",
      "FLIGHTS.ScheduledTime",
      "FLIGHTS.International",
      "FLIGHTS.Destination"
    )
    .join("PASSENGER", "PASSENGER.FlightId", "FLIGHTS.FlightId")
    .whereIn("PASSENGER.PassengerId", passengerIds)
    .orderBy("FLIGHTS.ScheduledDate", "desc");
  return query;
};

const feature4 = (manufactureYear) => {
  const query = db.raw(
    `SELECT ModelNum, Manufacturer, ManufacturerYear
    FROM (
      SELECT *, 
            ROW_NUMBER() OVER (
            PARTITION BY Manufacturer 
            ORDER BY ManufacturerYear DESC
      ) as rn
    FROM PLANE 
    WHERE ManufacturerYear > ?
    ) t
    WHERE rn = 1`,
    manufactureYear
  );
  return query;
};

const feature5 = (numDays) => {
  const endDate = "2023-12-31";
  const query = db("FLIGHTS")
    .select(
      db.raw("DATE(FLIGHTS.ScheduledDate) AS FlightDate"),
      db.raw("COUNT(*) AS NumDelays"),
      db.raw(
        "SUM(IF(DELAY.DelayDuration > 0, DELAY.DelayDuration, 0)) AS TotalDelayDuration"
      )
    )
    .leftJoin("DELAY", "FLIGHTS.FlightId", "DELAY.FlightId")
    .whereBetween("FLIGHTS.ScheduledDate", [
      db.raw(`DATE_SUB('${endDate}', INTERVAL ? DAY)`, [numDays]),
      endDate,
    ])
    .groupBy("FLIGHTS.ScheduledDate")
    .orderBy("FLIGHTS.ScheduledDate", "desc");
  return query;
};

const feature6 = (cargoType) => {
  const query = db("Cargo")
    .select(
      "PlaneId",
      db.raw("COUNT(CargoId) AS TotalCargos"),
      db.raw("SUM(Weight) AS TotalWeight"),
      db.raw("AVG(Weight) AS AverageWeight")
    )
    .where("CargoType", cargoType)
    .groupBy("PlaneId")
    .orderBy("TotalCargos");
  return query;
};

module.exports = {
  feature1,
  feature2,
  airlineQuery,
  feature3,
  feature4,
  feature5,
  feature6,
};
