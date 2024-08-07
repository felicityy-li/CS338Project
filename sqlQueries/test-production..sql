-- feature 1
SELECT COUNT(*) AS count
FROM Accounts
WHERE
  UserEmail = ?
  AND UserPassword LIKE ?;



-- feature 2
CREATE INDEX idx_flightid_flights ON Flights(FlightId);

CREATE INDEX idx_flightid_passenger ON Passenger(FlightId);

SELECT Flights.Airline, Flights.Destination
FROM Flights
JOIN Passenger ON Flights.FlightId = Passenger.FlightId
WHERE
  Flights.Airline = ?
  OR Flights.Destination = ?
  OR Passenger.Citizenship = ?;




-- feature 3
CREATE INDEX idx_delay_date ON DELAY (DelayDate, DelayDuration);


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
ORDER BY DELAY.DelayDate;



-- feature 4
CREATE INDEX idx_planeid_cargotype ON Cargo (PlaneId, CargoType);

SELECT
  PlaneId,
  COUNT(CargoId) AS TotalCargos,
  SUM(Weight) AS TotalWeight,
  AVG(Weight) AS AverageWeight
FROM Cargo
WHERE CargoType = ?
GROUP BY PlaneId
HAVING COUNT(CargoId) > 0
ORDER BY TotalCargos ASC;



-- feautre 5 
CREATE INDEX idx_scheduled_date_time ON Flights (ScheduledDate, ScheduledTime);

SELECT 
  FlightNum, 
  Airline, 
  ScheduledDate, 
  ScheduledTime, 
  FlightId, 
  PlaneId 
FROM Flights
ORDER BY ScheduledDate, ScheduledTime; 



-- feature 6
CREATE INDEX idx_num_destinations ON Flights (NumberOfDestinations);

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
ORDER BY NumberOfDestinations DESC;




-- fancy feature 1
SELECT
  FLIGHTS.FlightNum,
  FLIGHTS.Airline,
  FLIGHTS.Terminal,
  FLIGHTS.ScheduledDate,
  FLIGHTS.ScheduledDate,
  FLIGHTS.ScheduledTime,
  FLIGHTS.Destination
FROM FLIGHTS
JOIN PASSENGER ON PASSENGER.FlightId = FLIGHTS.FlightId
WHERE PASSENGER.PassengerId IN (/* list of passengerIds */)
  OR PASSENGER.PassengerId LIKE CONCAT(/* list of passengerIds */, '0%')
ORDER BY FLIGHTS.ScheduledDate DESC;



-- fancy feature 2
CREATE INDEX idx_manufacturer_year ON PLANE (Manufacturer, ManufacturerYear);

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
  ManufacturerYear;



-- fancy feature 3
CREATE INDEX idx_flight_id ON DELAY (FlightId);

​​SELECT
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



-- fancy feature 4
CREATE INDEX idx_manufacturer_year ON PLANE (Manufacturer, ManufacturerYear);

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



-- fancy feature 5
CREATE INDEX idx_passenger_citizenship ON Passenger (Citizenship);

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
  fp.Popularity DESC;
