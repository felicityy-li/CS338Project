import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import NumDelaysGraph from "./numberOfDelaysGraph.tsx";
import PassengerDestinations from "./passengerDestinations.tsx";
import DelayDurationHeatmap from "./delayDurationHeatmap.tsx";
import delay from "../images/delay.jpg";

const DelayDashboard: React.FC = () => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <NumDelaysGraph />
        </Grid>
        <Grid item xs={4}>
          <img
            src={delay}
            alt="Delay"
            style={{ width: "80%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12}>
          <DelayDurationHeatmap />
        </Grid>
      </Grid>
    </div>
  );
};

export default DelayDashboard;
