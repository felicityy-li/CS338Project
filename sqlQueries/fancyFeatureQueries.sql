-- fancy feature 1
SELECT 
  PLANE.PlaneId, 
  PLANE.ModelNum, 
  COUNT(CARGO.CargoId) AS TotalCargos,
  SUM(CARGO.Weight) AS TotalWeight, 
  AVG(CARGO.Weight) AS AverageWeight
FROM PLANE
JOIN CARGO ON PLANE.PlaneId = CARGO.PlaneId
GROUP BY PLANE.PlaneId
ORDER BY TotalWeight DESC;



-- fancy feature 2
WITH PassengerTravelFrequency AS (
  SELECT 
    PASSENGER.PassengerId, 
    PASSENGER.FirstName, 
    PASSENGER.LastName, 
    COUNT(FLIGHTS.FlightId) AS NumTravels
  FROM PASSENGER
  JOIN FLIGHTS ON PASSENGER.FlightId = FLIGHTS.FlightId
  WHERE FLIGHTS.Departure = 1
  GROUP BY PASSENGER.PassengerId, PASSENGER.FirstName, PASSENGER.LastName
),
PassengerAirlinesFrequency AS (
  SELECT 
    PASSENGER.PassengerId, 
    FLIGHTS.Airline, 
    COUNT(FLIGHTS.FlightId) AS NumFlights
  FROM PASSENGER
  JOIN FLIGHTS ON PASSENGER.FlightId = FLIGHTS.FlightId
  WHERE FLIGHTS.Departure = 1
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
ORDER BY ptf.NumTravels DESC, paf.NumFlights DESC;



-- fancy feature 3
SELECT ModelNum, Manufacturer, ManufacturerYear
FROM (
  SELECT *,
         ROW_NUMBER() OVER (
         PARTITION BY Manufacturer 
         ORDER BY ManufacturerYear DESC
  ) as rn_newest,
         ROW_NUMBER() OVER (
         PARTITION BY Manufacturer 
         ORDER BY ManufacturerYear ASC
  ) as rn_oldest
  FROM PLANE
) t
WHERE rn_newest = 1 OR rn_oldest = 1
ORDER BY Manufacturer, ManufacturerYear;



-- fancy feature 4

-- fancy feature 5