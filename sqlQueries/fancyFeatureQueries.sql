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
SELECT 
  REPLACE(Destination, '\r', '') AS Destination, 
  REPLACE(Citizenship, '\r', '') AS Citizenship, 
  COUNT(*) AS Popularity
FROM Flights 
JOIN Passenger ON Passenger.FlightId = Flights.FlightId
WHERE REPLACE(Citizenship, '\r', '') IN ('Australia', 'Germany', 'UK', 'India', 'USA', 'France', 'Canada', 'Singapore')
GROUP BY Citizenship, Destination
ORDER BY Citizenship, Popularity DESC;
