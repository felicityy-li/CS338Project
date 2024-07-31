# LAX Air Traffic Analysis System - Sample Database Setup Guide

### Development file
`./client/src` for UI code __
`./server` for routers __
`./sqlQueries` for the feature queries __

## Prerequisites
- MySQL: [Install MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
- Node.js: [Install Node.js](https://nodejs.org/)

## Steps to Create and Load Sample Database
1. Set Up MySQL Database: `mysql.server start` 
- Start the MySQL server on your local machine.
- Create a new database for the project.
- Create the necessary tables in the database by running [these queries](https://github.com/felicityy-li/CS338Project/blob/main/sqlQueries/creatTableQueries.sql).

2. Load Sample Data:
- Insert sample data into the tables using ```INSERT INTO``` statements.

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
- Landing page for users to login to access the other features.

![unnamed](https://github.com/user-attachments/assets/fa1729f6-a404-4021-92cd-6fae62831b07)

2. Destination Recommender
- Fill out required fields for a desired airline, destination, and citizenship. Then click the “Enter” button and a favourable destination will be generated, calculated with the user's personalized data.

![unnamed (1)](https://github.com/user-attachments/assets/ba4b6f83-c4f0-46b5-a22d-fb3e75157839)

3. Delay Duration Heatmap
- Click the “Delay” tab and users can interact with a heatmap, which displays all the days in the year with delay durations. The map uses a color gradient where heavier delay times are represented by darker shades of blue.

![Picture1](https://github.com/user-attachments/assets/9b101df1-5115-4bd6-bf64-27dc33e26087)

4. Cargo Analysis Bubble Graph
- Click the “Plane” tab. Two data types are available: “Freight” and “Mail.” Upon selection, a bubble graph is generated with the x-axis representing plane IDs and the y-axis representing an index value. The distribution of either freight or mail cargo is displayed for the selected planes. Each bubble’s size corresponds to the volume of cargo, providing a visual comparison between the freight and mail distributions.

![Screenshot 2024-07-24 at 6 52 30 PM](https://github.com/user-attachments/assets/66daaf9b-4b9f-4f00-bb13-9fbdb180d364)

5. All Flights Graph
- A table of all flights sorted by scheduled date and time. Users can interact with a draggable slider, which allows them to adjust the number of flights shown in the list.

![Screenshot 2024-07-24 at 7 01 28 PM](https://github.com/user-attachments/assets/e41beb40-fc9c-4856-8778-0795d0b82782)

6. Popular Destinations Map
- Click the “Flight” tab. A Google Maps display will show the most traveled destinations worldwide. The map is populated with pins representing various travel destinations, where the size of each pin indicates the popularity of the destination where larger pins represent more frequently traveled destinations.

![Screenshot 2024-07-24 at 7 02 48 PM](https://github.com/user-attachments/assets/13bec99c-2e84-4fed-8026-ef84784244b1)


## Fancy Features
1. Passenger Search
- Click the “Plane” tab. Users can enter their passenger ID into the search bar. The application retrieves and displays a chart below, listing all flights associated with the passenger ID, including flight number, terminal, airline, and scheduled date.

![Screenshot 2024-07-24 at 7 10 19 PM](https://github.com/user-attachments/assets/0c0aa714-446c-43ee-a06f-37c187cbe2c4)

2. Manufacturers Line Graph
- Click the “Plane” tab. Users can select from seven of the top manufacturing companies, each represented by a clickable bubble. Users can select multiple manufacturers to visually compare trends in passenger capacity across different manufacturing years for multiple companies.

![Screenshot 2024-07-24 at 7 12 11 PM](https://github.com/user-attachments/assets/655298d1-ca62-4faf-bc2b-261ebfb69d61)

3. Graph Animation of Delays
- Click the “Delay” tab. Users can view an animated graph where the x-axis represents flight dates and the y-axis represents the number of delays. Moving the mouse onto the graph allows the user to stop the animation and inspect the details of the specific bar; moving the mouse away resumes the animation.

![Screenshot 2024-07-24 at 7 13 41 PM](https://github.com/user-attachments/assets/922ef50f-d44a-4348-a6b8-f38637779c13)

4. Old vs. New Planes Analysis
- Click the “Plane” tab. Users can interact with a double bar graph where the x-axis represents different manufacturers and the y-axis represents passenger capacity. The graph compares each manufacturer’s oldest plane’s capacity with their newest plane’s capacity.

![Screenshot 2024-07-24 at 6 56 03 PM](https://github.com/user-attachments/assets/1c220ba5-4fbc-4117-a0ac-ba235adef982)

5. Popularity of Destinations and Airlines Per Citizenship Region
-  This feature displays pie graphs for each continent, showing the most popular international travel destinations and the airlines used from each citizenship region. Each graph represents a continent, highlighting the preferred destinations and associated airlines. This feature provides users a visual representation of travel trends.

<img width="512" alt="Screenshot 2024-07-30 at 8 19 32 PM" src="https://github.com/user-attachments/assets/8ac02b5c-eba4-46a5-962f-709c5d84039c">

## Generating the "Production" Dataset and Loading Into Database 
1. Follow the same steps as the sample database to begin the application using the production dataset below.
- Dataset Source URL: [Link to Dataset](https://docs.google.com/spreadsheets/d/17Yw6M64DnXAd3H8bzVjYxYuBQZWKBg9eiUowmcuEjhU/edit?usp=sharing)
- Features Code: [Link to SQLQueries](https://github.com/felicityy-li/CS338Project/blob/main/sqlQueries/featureQueries.sql)
