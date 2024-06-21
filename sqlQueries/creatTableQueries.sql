create table Flights (
  FlightId int not null unique,
  FlightNum int not null,
  Airline VARCHAR(100),
  PassengerCount int,
  Arrival boolean,
  ScheduledDate date,
  ScheduledTime VARCHAR(100),
  TerminalNum VARCHAR(100),
  Domestic boolean
);

load data infile 'datasets/Flights.csv' 
into table Flights
FIELDS TERMINATED BY ','
ENCLOSED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

create TABLE Passengers (
  PassengerId char(10) unique not null,
  FirstName char(50),
  LastName char(50),
  Citizenship char(50)
);

load data infile 'datasets/Passengers.csv' 
into table Passengers
FIELDS TERMINATED BY ','
ENCLOSED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

create TABLE Planes (
  PlaneId CHAR(5) not NULL unique,
  ModelNum int,
  Manufacturer text,
  ManufacturerYear YEAR,
  PassengerCapacity int
);

load data infile 'datasets/Planes.csv'
into table Planes
FIELDS TERMINATED BY ','
ENCLOSED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

create table IF NOT EXISTS Delay (
  DelayId VARCHAR(4) not NULL unique, 
  DelayType VARCHAR(20), 
  DelayDuration bigint, 
  DelayDate date
);

LOAD DATA INFILE 'datasets/Delay.csv' 
into table Delay
FIELDS TERMINATED BY ','
ENCLOSED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
