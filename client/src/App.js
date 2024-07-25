import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NumDelaysGraph from "./components/numberOfDelaysGraph.tsx";
import FlightStatus from "./components/flightDetails.tsx";
import PassengerDestinations from "./components/passengerDestinations.tsx";
import PassengerCheckIn from "./components/passengerCheckIn.tsx";
import PlaneManufactureYearsGraph from "./components/planeManufactureYearsGraph.tsx";
import CargoManagement from "./components/cargoBubbleGraph.tsx";
import DelayDurationHeatmap from "./components/delayDurationHeatmap.tsx";
import PlaneManufacturedDoubleBarGraph from "./components/oldNewPlaneBarGraph.tsx";
import Login from "./components/login.tsx";
import Chatbot from "./components/chatbot.tsx";
import PopularDestinationsPieGraphs from "./components/popularDestinationPieCharts.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PopularDestinationsPieGraphs />} />
          {/* <Route path="/" element={<FlightStatus />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/passenger_check_in" element={<PassengerCheckIn />} />
          <Route
            path="/passenger_destinations"
            element={<PassengerDestinations />}
          />
          <Route path="/number_delays" element={<NumDelaysGraph />} />
          <Route path="/plane_years" element={<PlaneManufactureYearsGraph />} />
          <Route path="/cargo" element={<CargoManagement />} />
          <Route path="/delay_duration" element={<DelayDurationHeatmap />} />
          <Route
            path="/plane_old_new"
            element={<PlaneManufacturedDoubleBarGraph />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
