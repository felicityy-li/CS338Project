import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

const AppBarComponent: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#81d4fa", marginBottom: 2 }}
    >
      <Toolbar>
        <Button color="inherit" component={Link} to="/" sx={{ marginLeft: 2 }}>
          <img
            src={logo}
            alt="Airplane Logo"
            style={{ height: 70, marginRight: 16 }}
          />
        </Button>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>

        <Button
          color={currentPath === "/delay_dashboard" ? "primary" : "inherit"}
          component={Link}
          to="/delay_dashboard"
          sx={{ marginLeft: 2 }}
        >
          Delay
        </Button>

        <Button
          color={currentPath === "/flight_dashboard" ? "primary" : "inherit"}
          component={Link}
          to="/flight_dashboard"
          sx={{ marginLeft: 2 }}
        >
          Flight
        </Button>

        <Button
          color={currentPath === "/plane_dashboard" ? "primary" : "inherit"}
          component={Link}
          to="/plane_dashboard"
          sx={{ marginLeft: 2 }}
        >
          Plane
        </Button>

        <Button
          color={currentPath === "/recommender" ? "primary" : "inherit"}
          component={Link}
          to="/recommender"
          sx={{ marginLeft: 2 }}
        >
          Recommender
        </Button>

        <Button
          color={
            currentPath === "/popular_destinations" ? "primary" : "inherit"
          }
          component={Link}
          to="/popular_destinations"
          sx={{ marginLeft: 2 }}
        >
          Airlines
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
