drop table Delay;
drop table PassengerAddresses;
drop table Passenger;
drop table Flights;
drop table Cargo;
drop table Plane;

create TABLE Plane (
  PlaneId VARCHAR(10) PRIMARY KEY,
  ModelNum int,
  Manufacturer VARCHAR(100),
  ManufacturerYear YEAR,
  PassengerCapacity int
);

CREATE TABLE Cargo (
  CargoId INT PRIMARY KEY,
  PlaneId VARCHAR(10),
  CargoType VARCHAR(20),
  Weight INT,
  FOREIGN KEY (PlaneId) REFERENCES Plane(PlaneId)
);

create table Flights (
  FlightId VARCHAR(10) PRIMARY KEY,
  FlightNum INT not null,
  Airline VARCHAR(100),
  PassengerCount INT,
  Departure BOOLEAN,
  ScheduledDate DATE,
  ScheduledTime VARCHAR(50),
  Terminal VARCHAR(50),
  PlaneId VARCHAR(10),
  International BOOLEAN,
  Destination VARCHAR(100),
  FOREIGN KEY (PlaneId) REFERENCES Plane(PlaneId)
);

CREATE TABLE Delay (
  DelayId VARCHAR(10) PRIMARY KEY,
  FlightId VARCHAR(10),
  DelayType VARCHAR(100),
  DelayDuration INT,
  DelayDate DATE,
  FOREIGN KEY (FlightId) REFERENCES Flights(FlightId)
);

CREATE TABLE Passenger (
  PassengerId VARCHAR(10) PRIMARY KEY,
  FlightId VARCHAR(10),
  FirstName VARCHAR(100),
  LastName VARCHAR(100),
  Citizenship VARCHAR(100),
  FOREIGN KEY (FlightId) REFERENCES Flights(FlightId)
);

CREATE TABLE PassengerAddresses (
  AddressId INT AUTO_INCREMENT PRIMARY KEY,
  PassengerId VARCHAR(10),
  Street VARCHAR(100),
  City VARCHAR(100),
  State VARCHAR(2),
  FOREIGN KEY (PassengerId) REFERENCES Passenger(PassengerId),
  LastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Accounts (
  PassengerId VARCHAR(10) PRIMARY KEY,
  UserEmail VARCHAR(100),
  UserPassword VARCHAR(100),
  FOREIGN KEY (PassengerId) REFERENCES Passenger(PassengerId)
);

load data infile 'datasets/Plane.csv' 
INTO TABLE Plane
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(PlaneId, ModelNum, Manufacturer, ManufacturerYear, PassengerCapacity);

load data infile 'datasets/Cargo.csv' 
INTO TABLE Cargo
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(CargoId, PlaneId, CargoType, Weight);

load data infile 'datasets/Flights.csv' 
INTO TABLE Flights
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(FlightId, FlightNum, Airline, PassengerCount, Departure, ScheduledDate, ScheduledTime, Terminal, PlaneId, International, Destination);

load data infile 'datasets/Delay.csv' 
INTO TABLE Delay
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(DelayId, FlightId, DelayType, DelayDuration, DelayDate);

load data infile 'datasets/Passenger.csv' 
INTO TABLE Passenger
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(PassengerId, FlightId, FirstName, LastName, Citizenship);

load data infile 'datasets/PassengerAddresses.csv' 
INTO TABLE PassengerAddresses
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(Street, PassengerId, City, State);

load data infile 'datasets/Accounts.csv' 
INTO TABLE Accounts
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(PassengerId, UserEmail, UserPassword);
