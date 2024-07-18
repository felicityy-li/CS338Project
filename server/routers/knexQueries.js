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
  const query = db.raw(
    `WITH PassengerTravelFrequency AS (
      SELECT 
        PASSENGER.PassengerId, 
        PASSENGER.FirstName, 
        PASSENGER.LastName, 
        COUNT(FLIGHTS.FlightId) AS NumTravels
      FROM PASSENGER
      JOIN FLIGHTS ON PASSENGER.FlightId = FLIGHTS.FlightId
      WHERE PASSENGER.PassengerId IN (?)
      GROUP BY PASSENGER.PassengerId, PASSENGER.FirstName, PASSENGER.LastName
    ),
    PassengerAirlinesFrequency AS (
      SELECT 
        PASSENGER.PassengerId, 
        FLIGHTS.Airline, 
        COUNT(FLIGHTS.FlightId) AS NumFlights
      FROM PASSENGER
      JOIN FLIGHTS ON PASSENGER.FlightId = FLIGHTS.FlightId
      WHERE PASSENGER.PassengerId IN (?)
      GROUP BY PASSENGER.PassengerId, FLIGHTS.Airline
    )
    SELECT 
      PASSENGER.PassengerId, 
      PASSENGER.FirstName, 
      PASSENGER.LastName, 
      PassengerAddresses.City, 
      PassengerAddresses.State, 
      ptf.NumTravels AS TotalFlights,
      paf.Airline,
      paf.NumFlights AS FlightsWithAirline
    FROM PASSENGER
    JOIN PassengerAddresses ON PassengerAddresses.PassengerId = PASSENGER.PassengerId
    LEFT JOIN PassengerTravelFrequency ptf ON PASSENGER.PassengerId = ptf.PassengerId
    LEFT JOIN PassengerAirlinesFrequency paf ON PASSENGER.PassengerId = paf.PassengerId
    WHERE PASSENGER.PassengerId IN (?)
    ORDER BY ptf.NumTravels DESC, paf.NumFlights DESC`
  );
  return query;
};

const feature3 = (passengerIds, startDate, endDate) => {
  const query = db.raw(
    `SELECT 
      FLIGHTS.FlightNum, 
      FLIGHTS.Airline, 
      FLIGHTS.Terminal, 
      FLIGHTS.ScheduledDate, 
      FLIGHTS.ScheduledTime, 
      FLIGHTS.International, 
      FLIGHTS.Destination
    FROM FLIGHTS
    JOIN PASSENGER ON PASSENGER.FlightId = FLIGHTS.FlightId
    WHERE PASSENGER.PassengerId in (?)
      AND FLIGHTS.ScheduledDate BETWEEN ? AND ?
    ORDER BY FLIGHTS.ScheduledDate DESC`,
    [passengerIds, startDate, endDate]
  );
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

const feature5 = () => {
  const query = db("FLIGHTS")
    .select(
      db.raw("DATE(FLIGHTS.ScheduledDate) AS FlightDate"),
      db.raw("COUNT(*) AS NumDelays"),
      db.raw(
        "SUM(IF(DELAY.DelayDuration > 0, DELAY.DelayDuration, 0)) AS TotalDelayDuration"
      )
    )
    .leftJoin("DELAY", "FLIGHTS.FlightId", "DELAY.FlightId")
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
  feature3,
  feature4,
  feature5,
  feature6,
};
