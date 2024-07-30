-- feature 1
SELECT COUNT(*) AS count
FROM Accounts
WHERE
  UserEmail = ?
  AND UserPassword LIKE ?;



-- feature 2
SELECT Flights.Airline, Flights.Destination
FROM Flights
JOIN Passenger ON Flights.FlightId = Passenger.FlightId
WHERE
  Flights.Airline = ?
  OR Flights.Destination = ?
  OR Passenger.Citizenship = ?
LIMIT 5;



-- feature 3
SELECT
  DELAY.DelayDate,
  SUM(
    CASE 
      WHEN DELAY.DelayDuration > 0 
      THEN DELAY.DelayDuration 
      ELSE 0
    END) 
AS TotalDelayDuration
FROM DELAY
JOIN FLIGHTS ON DELAY.FlightId = FLIGHTS.FlightId
GROUP BY DELAY.DelayDate
ORDER BY DELAY.DelayDate
LIMIT 5;



-- feature 4
SELECT
  Plane.PlaneId,
  COUNT(Cargo.CargoId) AS TotalCargos,
  SUM(Cargo.Weight) AS TotalWeight,
  AVG(Cargo.Weight) AS AverageWeight
FROM Cargo
JOIN Plane ON Cargo.PlaneId = Plane.PlaneId
WHERE CargoType = ?
GROUP BY PlaneId
HAVING COUNT(CargoId) > 0
ORDER BY TotalCargos ASC
LIMIT 5;



-- feature 5
SELECT 
  FlightNum, 
  Airline,
  ScheduledDate, 
  ScheduledTime, 
  FlightId, 
  PlaneId
FROM Flights
ORDER BY ScheduledDate, ScheduledTime
LIMIT 5;



-- feature 6
WITH FlightDetails AS (
  SELECT 
    FLIGHTS.Airline,
    COUNT(DISTINCT FLIGHTS.Destination) AS NumberOfDestinations
  FROM FLIGHTS
  WHERE FLIGHTS.Departure = 1
  GROUP BY FLIGHTS.Airline
)
SELECT 
  Airline,
  NumberOfDestinations
FROM FlightDetails
ORDER BY NumberOfDestinations DESC
LIMIT 5;



-- fancy feature 1
SELECT
  FLIGHTS.FlightNum,
  FLIGHTS.Airline,
  FLIGHTS.Terminal,
  FLIGHTS.ScheduledDate,
  FLIGHTS.ScheduledDate,
  FLIGHTS.ScheduledTime,
  FLIGHTS.International,
  FLIGHTS.Destination
FROM FLIGHTS
JOIN PASSENGER ON PASSENGER.FlightId = FLIGHTS.FlightId
WHERE PASSENGER.PassengerId IN (/* list of passengerIds */)
  OR PASSENGER.PassengerId LIKE CONCAT(/* list of passengerIds */, '0%')
ORDER BY FLIGHTS.ScheduledDate DESC
LIMIT 5;



-- fancy feature 2
WITH ManufacturerFilter AS (
  SELECT Manufacturer
  FROM PLANE
  GROUP BY Manufacturer
  HAVING COUNT(*) > 5
)
SELECT
  PlaneId,
  ModelNum,
  Manufacturer,
  ManufacturerYear,
  PassengerCapacity
FROM PLANE
WHERE
  Manufacturer IN (SELECT Manufacturer FROM ManufacturerFilter)
ORDER BY
  Manufacturer,
  ManufacturerYear
LIMIT 5;



-- fancy feature 3
SELECT
  DATE(FLIGHTS.ScheduledDate) AS FlightDate,
  COUNT(*) AS NumDelays,
  SUM(
    CASE 
      WHEN DELAY.DelayDuration > 0 
      THEN DELAY.DelayDuration 
      ELSE 0 
    END) 
  AS TotalDelayDuration
FROM FLIGHTS
LEFT JOIN
  DELAY ON FLIGHTS.FlightId = DELAY.FlightId
WHERE
  FLIGHTS.ScheduledDate BETWEEN DATE_SUB('2023-12-31', INTERVAL ? DAY) 
  AND '2023-12-31'
GROUP BY DATE(FLIGHTS.ScheduledDate)
ORDER BY FlightDate DESC
LIMIT 5;



-- fancy feature 4
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
ORDER BY Manufacturer, ManufacturerYear
LIMIT 5;



-- fancy feature 5
WITH CleanedCitizenship AS (
  SELECT DISTINCT 
    REPLACE(Passenger.Citizenship, '\r', '') AS CleanedCitizenship
  FROM Passenger
  WHERE REPLACE(Passenger.Citizenship, '\r', '') IN (/* list of citizenships */)
),
FlightPopularity AS (
  SELECT
    REPLACE(Flights.Airline, '\r', '') AS CleanedAirline,
    REPLACE(Passenger.Citizenship, '\r', '') AS CleanedCitizenship,
    COUNT(*) AS Popularity
  FROM Flights
  JOIN Passenger ON Passenger.FlightId = Flights.FlightId
  WHERE Flights.International = 1
  GROUP BY 
    REPLACE(Flights.Airline, '\r', ''), 
    REPLACE(Passenger.Citizenship, '\r', '')
)
SELECT
  fp.CleanedAirline AS Airline,
  fp.CleanedCitizenship AS Citizenship,
  fp.Popularity
FROM FlightPopularity fp
JOIN CleanedCitizenship cc 
  ON fp.CleanedCitizenship = cc.CleanedCitizenship
ORDER BY 
  cc.CleanedCitizenship, 
  fp.Popularity DESC
LIMIT 5;
