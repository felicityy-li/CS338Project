-- feature 1
Select FlightNum, Airline, ScheduledDate, ScheduledTime 
from Flights order by ScheduledDate, ScheduledTime
limit 10;



-- feature 2
SELECT Airline, COUNT(*) as NumberOfDestinations
FROM Flights 
WHERE Departure = 1
GROUP BY Airline
ORDER BY NumberOfDestinations DESC;



-- feature 3
SELECT 
  FLIGHTS.FlightNum, 
  FLIGHTS.Airline, 
  FLIGHTS.Terminal, 
  FLIGHTS.ScheduledDate, 
  FLIGHTS.ScheduledTime, 
  FLIGHTS.International, 
  FLIGHTS.Destination
FROM FLIGHTS
JOIN PASSENGER ON PASSENGER.FlightId = FLIGHTS.FlightId
WHERE PASSENGER.PassengerId in ('P100', 'P101', 'P102', 'P1', 'P104', 'P82', 'P123')
  AND FLIGHTS.ScheduledDate BETWEEN '2023-06-01' AND '2024-08-30'
ORDER BY FLIGHTS.ScheduledDate DESC;



-- feature 4 
Select ModelNum, Manufacturer, ManufacturerYear
from (
  Select *, 
         ROW_NUMBER() OVER (
      PARTITION BY Manufacturer 
      ORDER BY ManufacturerYear DESC
    ) as rn
  FROM PLANE 
  WHERE ManufacturerYear > 2017
) t
WHERE rn = 1;



-- feature 5
SELECT DATE(FLIGHTS.ScheduledDate) AS FlightDate,
  COUNT(*) AS NumDelays,
  SUM(IF(DELAY.DelayDuration > 0, DELAY.DelayDuration, 0)) AS TotalDelayDuration
FROM FLIGHTS
LEFT JOIN DELAY ON FLIGHTS.FlightId = DELAY.FlightId
GROUP BY FLIGHTS.ScheduledDate
ORDER BY FLIGHTS.ScheduledDate DESC
LIMIT 5;



-- feature 6
SELECT 
  PlaneId, 
  COUNT(CargoId) AS TotalCargos,
  SUM(Weight) AS TotalWeight, 
  AVG(Weight) AS AverageWeight
FROM Cargo
WHERE CargoType = 'Freight'
GROUP BY PlaneId 
