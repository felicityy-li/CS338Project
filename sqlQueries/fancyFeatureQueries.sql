-- fancy feature 1
SELECT
  Flights.FlightId,
  Delay.DelayDate,
  SUM(CASE WHEN DelayDuration > 0 THEN DelayDuration ELSE 0 END) AS TotalDelayDuration
FROM DELAY
JOIN Flights ON Delay.FlightId = Flights.FlightId
GROUP BY Flights.FlightId, Delay.DelayDate
ORDER BY Delay.DelayDate;



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
WHERE ptf.NumTravels IS NOT NULL
AND paf.NumFlights IS NOT NULL
ORDER BY ptf.NumTravels DESC, paf.NumFlights DESC;



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
SELECT COUNT(*) AS Count
FROM Accounts
WHERE UserEmail = LOWER('edwardsmith24@mail.com')
AND UserPassword LIKE '%passES24word%';





-- fancy feature 5