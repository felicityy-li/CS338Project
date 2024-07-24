import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import NumDelaysGraph from "./components/numberOfDelaysGraph.tsx";
import FlightStatus from "./components/flightDetails.tsx";
import PassengerDestinations from "./components/passengerDestinations.tsx";
import PassengerCheckIn from "./components/passengerCheckIn.tsx";
import PlaneManufactureYearsGraph from "./components/planeManufactureYearsGraph.tsx";
import CargoManagement from "./components/cargoBubbleGraph.tsx";
import DelayDurationHeatmap from "./components/delayDurationHeatmap.tsx";
import PlaneManufacturedDoubleBarGraph from './components/oldNewPlaneBarGraph.tsx'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const dayOptions = [90, 60, 30, 10, 5];
  const [value, setValue] = useState(0);
  const [days, setDays] = useState(30);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const cycleDays = () => {
      setDays((prevDays) => {
        const currentIndex = dayOptions.indexOf(prevDays);
        const nextIndex = (currentIndex + 1) % dayOptions.length;
        return dayOptions[nextIndex];
      });
    };

    const startTimer = () => {
      intervalRef.current = setInterval(cycleDays, 3000);
    };

    if (!isHovered) {
      startTimer();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="App">
      <main>
        <PlaneManufacturedDoubleBarGraph />
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Feature One" {...a11yProps(0)} />
            <Tab label="Feature Two" {...a11yProps(1)} />
            <Tab label="Feature Three" {...a11yProps(2)} />
            <Tab label="Feature Four" {...a11yProps(3)} />
            <Tab label="Feature Five" {...a11yProps(4)} />
            <Tab label="Feature Six" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <FlightStatus />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <PassengerDestinations />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <PassengerCheckIn />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <PlaneManufactureYearsGraph />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NumDelaysGraph days={days} />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <CargoManagement />
        </CustomTabPanel> */}
      </main>
    </div>
  );
}

export default App;
