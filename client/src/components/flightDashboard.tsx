import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import PassengerDestinations from "./passengerDestinations.tsx";
import FlightStatus from "./flightDetails.tsx";
import PassengerCheckIn from "./passengerCheckIn.tsx";

const FlightsDashboard: React.FC = () => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <PassengerDestinations />
        </Grid>
        <Grid item xs={8}>
          <PassengerCheckIn />
          <FlightStatus />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
};

export default FlightsDashboard;
