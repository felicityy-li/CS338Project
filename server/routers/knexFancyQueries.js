const db = require("../config/knexDbConfig");

// feature 6
/**
 * try a heatmap for delays
 * @returns knex object
 */
const fancyFeature1 = () => {
  const query = db("DELAY")
    .select(
      "DELAY.DelayDate",
      db.raw(
        "SUM(CASE WHEN DELAY.DelayDuration > 0 THEN DELAY.DelayDuration ELSE 0 END) AS TotalDelayDuration"
      )
    )
    .join("FLIGHTS", "DELAY.FlightId", "FLIGHTS.FlightId")
    .groupBy("DELAY.DelayDate")
    .orderBy("DELAY.DelayDate");

  return query;
};

/**
 * some ai thing maybe (eg recs or chatbot)
 * @returns knex object
 */
// feature 2
const fancyFeature2 = async (airline, destination, citizenship) => {
  const query = await db("Flights")
    .join("Passenger", "Flights.FlightId", "Passenger.FlightId")
    .select("Flights.Airline", "Flights.Destination")
    .where("Flights.Airline", airline)
    .orWhere("Flights.Destination", destination)
    .orWhere("Passenger.Citizenship", citizenship);
  return query;
};

/**
 * double bar graphs
 * @returns
 */
const fancyFeature3 = async () => {
  const result = await db.raw(`
    WITH ManufacturerCounts AS (
      SELECT Manufacturer
      FROM PLANE
      GROUP BY Manufacturer
      HAVING COUNT(*) > 1
    ),
    NewestAndOldest AS (
      SELECT PlaneId, ModelNum, Manufacturer, ManufacturerYear, PassengerCapacity
      FROM PLANE
      WHERE (Manufacturer, ManufacturerYear) IN (
        SELECT Manufacturer, MAX(ManufacturerYear)
        FROM PLANE
        WHERE Manufacturer IN (SELECT Manufacturer FROM ManufacturerCounts)
        GROUP BY Manufacturer
      )
      OR (Manufacturer, ManufacturerYear) IN (
        SELECT Manufacturer, MIN(ManufacturerYear)
        FROM PLANE
        WHERE Manufacturer IN (SELECT Manufacturer FROM ManufacturerCounts)
        GROUP BY Manufacturer
      )
    )
    SELECT PlaneId, ModelNum, Manufacturer, ManufacturerYear, PassengerCapacity
    FROM NewestAndOldest
    ORDER BY Manufacturer, ManufacturerYear;
  `);
  return result;
};

/**
 * login / security check feature
 * @param {string} email
 * @param {string} password
 * @returns
 */
const fancyFeature4 = async (email, password) => {
  try {
    const result = await db("Accounts")
      .count("* as count")
      .where({ UserEmail: email })
      .andWhereRaw("UserPassword LIKE ?", [`%${password}%`]);

    if (result[0].count > 0) {
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password." };
    }
  } catch (e) {
    console.error(e.stack);
    throw e;
  }
};

/**
 *
 * @param {*} citizenships
 * @returns
 */
const fancyFeature5 = async (citizenships) => {
  const query = await db("Flights")
    .join("Passenger", "Passenger.FlightId", "Flights.FlightId")
    .select(
      db.raw("REPLACE(Airline, '\r', '') AS Airline"),
      db.raw("REPLACE(Citizenship, '\r', '') AS Citizenship"),
      db.raw("COUNT(*) AS Popularity")
    )
    .whereIn(db.raw("REPLACE(Citizenship, '\r', '')"), citizenships)
    .andWhere("Flights.International", 1)
    .groupBy("Airline", "Citizenship")
    .orderBy(["Citizenship", { column: "Popularity", order: "desc" }]);
  return query;
};

module.exports = {
  fancyFeature1,
  fancyFeature2,
  fancyFeature3,
  fancyFeature4,
  fancyFeature5,
};
