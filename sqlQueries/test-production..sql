-- feature 1
Select FlightNum, Airline, ScheduledDate, ScheduledTime 
from Flights order by ScheduledDate, ScheduledTime
limit 10
INTO OUTFILE './cs338Project/est-production1.out'
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

-- feature 2
WITH PassengerTravelFrequency AS (
  SELECT 
    PASSENGER.PassengerId, 
    PASSENGER.FirstName, 
    PASSENGER.LastName, 
    COUNT(FLIGHTS.FlightId) AS NumTravels
  FROM PASSENGER
  JOIN FLIGHTS ON PASSENGER.FlightId = FLIGHTS.FlightId
  WHERE PASSENGER.PassengerId = 'P123'
  GROUP BY PASSENGER.PassengerId, PASSENGER.FirstName, PASSENGER.LastName
),
PassengerAirlinesFrequency AS (
  SELECT 
    PASSENGER.PassengerId, 
    FLIGHTS.Airline, 
    COUNT(FLIGHTS.FlightId) AS NumFlights
  FROM PASSENGER
  JOIN FLIGHTS ON PASSENGER.FlightId = FLIGHTS.FlightId
  WHERE PASSENGER.PassengerId = 'P123'
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
WHERE PASSENGER.PassengerId = 'P123'
ORDER BY ptf.NumTravels DESC, paf.NumFlights DESC
INTO OUTFILE './cs338Project/est-production2.out'
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';



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
WHERE PASSENGER.PassengerId in ('P100', 'P101', 'P102', 'P103', 'P104', 'P105')
  AND FLIGHTS.ScheduledDate BETWEEN '2023-07-01' AND '2024-08-30'
ORDER BY FLIGHTS.ScheduledDate DESC
INTO OUTFILE './cs338Project/est-production3.out'
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';





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
WHERE rn = 1
INTO OUTFILE './cs338Project/est-production4.out'
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';



-- feature 5
SELECT DATE(FLIGHTS.ScheduledDate) AS FlightDate,
  COUNT(*) AS NumDelays,
  SUM(IF(DELAY.DelayDuration > 0, DELAY.DelayDuration, 0)) AS TotalDelayDuration
FROM FLIGHTS
LEFT JOIN DELAY ON FLIGHTS.FlightId = DELAY.FlightId
GROUP BY FLIGHTS.ScheduledDate
ORDER BY FLIGHTS.ScheduledDate DESC
LIMIT 5
INTO OUTFILE './cs338Project/est-production5.out'
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';




-- feature 6
SELECT 
  PLANE.PlaneId, 
  PLANE.ModelNum, 
  COUNT(CARGO.CargoId) AS TotalCargos,
  SUM(CARGO.Weight) AS TotalWeight, 
  AVG(CARGO.Weight) AS AverageWeight
FROM PLANE
JOIN CARGO ON PLANE.PlaneId = CARGO.PlaneId
GROUP BY PLANE.PlaneId, PLANE.ModelNum
HAVING SUM(CARGO.Weight) > 300000
ORDER BY TotalWeight DESC
INTO OUTFILE './cs338Project/est-production6.out'
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

