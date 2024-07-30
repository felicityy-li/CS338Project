-- feature 1
SELECT COUNT(*) AS count
FROM Accounts
WHERE
  BINARY UserEmail = ?
  AND UserPassword LIKE ?;



-- feature 2
SELECT Flights.Airline, Flights.Destination
FROM Flights
JOIN Passenger ON Flights.FlightId = Passenger.FlightId
WHERE
  Flights.Airline = ?
  OR Flights.Destination = ?
  OR Passenger.Citizenship = ?;



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
ORDER BY DELAY.DelayDate;



-- feature 4 
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



-- feature 5
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
