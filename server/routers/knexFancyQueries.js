const db = require("../config/knexDbConfig");

// feature 6
const fancyFeature1 = () => {
  const query = db("PLANE")
    .select(
      "PLANE.PlaneId",
      "PLANE.ModelNum",
      db.raw("COUNT(CARGO.CargoId) AS TotalCargos"),
      db.raw("SUM(CARGO.Weight) AS TotalWeight"),
      db.raw("AVG(CARGO.Weight) AS AverageWeight")
    )
    .join("CARGO", "PLANE.PlaneId", "CARGO.PlaneId")
    .where("CARGO.CargoType", "Freight")
    .groupBy("PLANE.PlaneId", "PLANE.ModelNum")
    .orderBy("TotalWeight", "desc");
  return query;
};

/**
 * service
 * @returns knex object
 */
// feature 2
const fancyFeature2 = () => {
  const subquery1 = db("PASSENGER")
    .join("FLIGHTS", "PASSENGER.FlightId", "FLIGHTS.FlightId")
    .where("FLIGHTS.Departure", 1)
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
    .where("FLIGHTS.Departure", 1)
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

const fancyFeature3 = () => {
  const query = knex
    .select("ModelNum", "Manufacturer", "ManufacturerYear")
    .from(function () {
      this.select("*")
        .rowNumber("rn_newest", function () {
          this.partitionBy("Manufacturer").orderBy("ManufacturerYear", "desc");
        })
        .rowNumber("rn_oldest", function () {
          this.partitionBy("Manufacturer").orderBy("ManufacturerYear", "asc");
        })
        .from("PLANE")
        .as("t");
    })
    .where("t.rn_newest", 1)
    .orWhere("t.rn_oldest", 1)
    .orderBy("Manufacturer")
    .orderBy("ManufacturerYear");
  return query;
};
const fancyFeature4 = () => {};
const fancyFeature5 = () => {};

module.exports = {
  fancyFeature1,
  fancyFeature2,
  fancyFeature3,
  fancyFeature4,
  fancyFeature5,
};
