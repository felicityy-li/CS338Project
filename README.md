# LAX Air Traffic Analysis System - Sample Database Setup Guide

## Introduction

## Prerequisites
- MySQL: [Install MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
- Node.js: [Install Node.js](https://nodejs.org/)

## Steps to Create and Load Sample Database
1. Set Up MySQL Database: `mysql.server start` 
- Start the MySQL server on your local machine.
- Create a new database for the project.
- Create the necessary tables in the database.

2. Load Sample Data:
- Insert sample data into the tables.

3. Set Up Node.js Server: `node server.js`
- Initialize a Node.js project in your project directory.
- Install necessary dependencies such as Express and MySQL.
- Create a server file with basic server startup.

4. Set Up React.js Application: `npm start`
- Initialize a React.js project in your project directory.
- Install necessary dependencies such as React, React-DOM, and any other libraries needed.
- Create components and pages for the user interface.

5. Run the Application:
- Start the Node.js server.
- Start the React.js development server.

## Implemented Application Features
1. Login Page
2. Destination Recommender
3. Delay Duration Heatmap
4. Cargo Analysis
5. All Flights Graph
6. Popular Destinations Map


## Generating the "Production" Dataset and Loading Into Database 
1. Follow the same steps as the sample database to begin the application using the production dataset below.
- Dataset Source URL: [Link to Dataset](https://docs.google.com/spreadsheets/d/17Yw6M64DnXAd3H8bzVjYxYuBQZWKBg9eiUowmcuEjhU/edit?usp=sharing)
- Features Code: [Link to SQLQueries](https://github.com/felicityy-li/CS338Project/blob/main/sqlQueries/featureQueries.sql)
