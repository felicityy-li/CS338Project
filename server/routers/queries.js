const feature1 = `SELECT FlightNum, Airline, ScheduledDate, ScheduledTime 
FROM Flights 
ORDER BY ScheduledDate, ScheduledTime
LIMIT 10`;

const feature2 = `WITH PassengerTravelFrequency AS (
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
ORDER BY ptf.NumTravels DESC, paf.NumFlights DESC`;

const feature3 = `SELECT 
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
ORDER BY FLIGHTS.ScheduledDate DESC`;

const feature4 = `SELECT ModelNum, Manufacturer, ManufacturerYear
FROM (
  SELECT *, 
         ROW_NUMBER() OVER (
    PARTITION BY Manufacturer 
    ORDER BY ManufacturerYear DESC
  ) as rn
  FROM PLANE 
  WHERE ManufacturerYear > 2017
) t
WHERE rn = 1`;

const feature5 = `SELECT DATE(FLIGHTS.ScheduledDate) AS FlightDate,
  COUNT(*) AS NumDelays,
  SUM(IF(DELAY.DelayDuration > 0, DELAY.DelayDuration, 0)) AS TotalDelayDuration
FROM FLIGHTS
LEFT JOIN DELAY ON FLIGHTS.FlightId = DELAY.FlightId
GROUP BY FLIGHTS.ScheduledDate
ORDER BY FLIGHTS.ScheduledDate DESC
LIMIT 5`;

const feature6 = `SELECT 
  PLANE.PlaneId, 
  PLANE.ModelNum, 
  COUNT(CARGO.CargoId) AS TotalCargos,
  SUM(CARGO.Weight) AS TotalWeight, 
  AVG(CARGO.Weight) AS AverageWeight
FROM PLANE
JOIN CARGO ON PLANE.PlaneId = CARGO.PlaneId
GROUP BY PLANE.PlaneId, PLANE.ModelNum
HAVING SUM(CARGO.Weight) > 300000
ORDER BY TotalWeight DESC`;

module.exports = {
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6,
};
