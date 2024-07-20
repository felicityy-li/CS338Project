import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import DelayGraph from "./components/delayGraph.tsx";
import FlightStatus from "./components/flightDetails.tsx";
import PassengerIdSearch from "./components/passengerIdSearch.tsx";
import PassengerCheckIn from "./components/passengerCheckIn.tsx";
import PlaneDetails from "./components/planeDetails.tsx";
import CargoManagement from "./components/cargoMgmt.tsx";

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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <main>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
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
          <PassengerIdSearch />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <PassengerCheckIn />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <PlaneDetails />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Delays />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <CargoManagement />
        </CustomTabPanel> */}
        <DelayGraph days={10}/>
      </main>
    </div>
  );
}

export default App;
