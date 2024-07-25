import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import PlaneManufactureYearsGraph from "./planeManufactureYearsGraph.tsx";
import CargoManagement from "./cargoBubbleGraph.tsx";
import PlaneManufacturedDoubleBarGraph from "./oldNewPlaneBarGraph.tsx";
import airplane from "../images/airplane.jpg";

const PlaneDashboard: React.FC = () => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          <PlaneManufactureYearsGraph />
        </Grid>
        <Grid item xs={7}>
          <CargoManagement />
        </Grid>
        <Grid item xs={8}>
          <PlaneManufacturedDoubleBarGraph />
        </Grid>
        <Grid item xs={4}>
          <img
            src={airplane}
            alt="Airplane"
            style={{ width: "30%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PlaneDashboard;
