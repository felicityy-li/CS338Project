import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/login.tsx";
import PopularDestinationsPieGraphs from "./components/popularDestinationPieCharts.tsx";
import Recommendator from "./components/passengerRec.tsx";
import DelayDashboard from "./components/delaysDashboard.tsx";
import FlightsDashboard from "./components/flightDashboard.tsx";
import PlaneDashboard from "./components/planeDashboard.tsx";
import AppBarComponent from "./components/appBar.tsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <AppBarComponent />}
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          {isAuthenticated ? (
            <>
              <Route path="/delay_dashboard" element={<DelayDashboard />} />
              <Route path="/flight_dashboard" element={<FlightsDashboard />} />
              <Route path="/plane_dashboard" element={<PlaneDashboard />} />
              <Route path="/recommender" element={<Recommendator />} />
              <Route
                path="/popular_destinations"
                element={<PopularDestinationsPieGraphs />}
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
