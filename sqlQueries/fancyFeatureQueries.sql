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
ORDER BY FLIGHTS.ScheduledDate DESC;



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
ORDER BY Manufacturer, ManufacturerYear;



-- fancy feature 3
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



-- fancy feature 4
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
ORDER BY FLIGHTS.ScheduledDate DESC;



-- fancy feature 5
WITH CleanedCitizenship AS (
  SELECT DISTINCT REPLACE(Passenger.Citizenship, '\r', '') AS CleanedCitizenship
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
  GROUP BY REPLACE(Flights.Airline, '\r', ''), REPLACE(Passenger.Citizenship, '\r', '')
)
SELECT
  CleanedAirline AS Airline,
  CleanedCitizenship AS Citizenship,
  Popularity
FROM FlightPopularity
JOIN CleanedCitizenship ON FlightPopularity.CleanedCitizenship = CleanedCitizenship.CleanedCitizenship
ORDER BY CleanedCitizenship, Popularity DESC;
