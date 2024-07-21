const db = require("../config/knexDbConfig");

const feature1 = (limitVal) => {
  const query = db("Flights")
    .select("FlightNum", "Airline", "ScheduledDate", "ScheduledTime")
    .orderBy(["ScheduledDate", "ScheduledTime"]);
  if (limitVal) {
    query.limit(limitVal);
  }
  return query;
};

const feature2 = () => {
  const subquery1 = db("PASSENGER")
    .join("FLIGHTS", "PASSENGER.FlightId", "FLIGHTS.FlightId")
    .select(
      "PASSENGER.PassengerId",
      "PASSENGER.FirstName",
      "PASSENGER.LastName"
    )
    .count("FLIGHTS.FlightId as NumTravels")
    .groupBy(
      "PASSENGER.PassengerId",
      "PASSENGER.FirstName",
      "PASSENGER.LastName"
    )
    .as("PassengerTravelFrequency");

  const subquery2 = db("PASSENGER")
    .join("FLIGHTS", "PASSENGER.FlightId", "FLIGHTS.FlightId")
    .select("PASSENGER.PassengerId", "FLIGHTS.Airline")
    .count("FLIGHTS.FlightId as NumFlights")
    .groupBy("PASSENGER.PassengerId", "FLIGHTS.Airline")
    .as("PassengerAirlinesFrequency");

  const query = db("PASSENGER")
    .join(
      "PassengerAddresses",
      "PassengerAddresses.PassengerId",
      "PASSENGER.PassengerId"
    )
    .leftJoin(
      subquery1,
      "PASSENGER.PassengerId",
      "PassengerTravelFrequency.PassengerId"
    )
    .leftJoin(
      subquery2,
      "PASSENGER.PassengerId",
      "PassengerAirlinesFrequency.PassengerId"
    )
    .select(
      "PASSENGER.PassengerId",
      "PASSENGER.FirstName",
      "PASSENGER.LastName",
      "PassengerAddresses.City",
      "PassengerAddresses.State",
      "PassengerTravelFrequency.NumTravels as TotalFlights",
      "PassengerAirlinesFrequency.Airline",
      "PassengerAirlinesFrequency.NumFlights as FlightsWithAirline"
    )
    .orderBy([
      { column: "PassengerTravelFrequency.NumTravels", order: "desc" },
      { column: "PassengerAirlinesFrequency.NumFlights", order: "desc" },
    ]);

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

const feature6 = (weight) => {
  const query = db("PLANE")
    .select(
      "PLANE.PlaneId",
      "PLANE.ModelNum",
      db.raw("COUNT(CARGO.CargoId) AS TotalCargos"),
      db.raw("SUM(CARGO.Weight) AS TotalWeight"),
      db.raw("AVG(CARGO.Weight) AS AverageWeight")
    )
    .join("CARGO", "PLANE.PlaneId", "CARGO.PlaneId")
    .groupBy("PLANE.PlaneId", "PLANE.ModelNum")
    .having(db.raw("SUM(CARGO.Weight) > ?", [weight]))
    .orderBy("TotalWeight", "desc");
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
