import React, { useEffect, useState } from "react";
import { fetchPassengerData } from "../services/services.ts";
import { Passenger } from "../types/passengerTypes.ts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const PassengerIdSearch: React.FC = () => {
  const [passengerData, setPassengerData] = useState<Passenger[]>([]);
  const [passengerIds, setPassengerIds] = useState<string[]>([]);
  const [inputIds, setInputIds] = useState<string>("");

  useEffect(() => {
    const getPassengerData = async () => {
      try {
        const data = await fetchPassengerData(passengerIds);
        setPassengerData(data[0]);
      } catch (e) {
        console.error(e);
      }
    };
    if (passengerIds.length > 0) {
      getPassengerData();
    }
  }, [passengerIds]);

  const handleSearch = () => {
    const idsArray = inputIds.split(",").map((id) => id.trim());
    setPassengerIds(idsArray);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Passenger IDs"
          inputProps={{ "aria-label": "search passenger IDs" }}
          value={inputIds}
          onChange={(e) => setInputIds(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <TableContainer component={Paper}>
        <Table aria-label="passenger data table">
          <TableHead>
            <TableRow>
              <TableCell>Passenger ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Airline</TableCell>
              <TableCell>Total Flights</TableCell>
              <TableCell>Flights with Airline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengerData.map((passenger) => (
              <TableRow key={passenger.PassengerId}>
                <TableCell>{passenger.PassengerId}</TableCell>
                <TableCell>{passenger.FirstName}</TableCell>
                <TableCell>{passenger.LastName}</TableCell>
                <TableCell>{passenger.City}</TableCell>
                <TableCell>{passenger.State}</TableCell>
                <TableCell>{passenger.Airline}</TableCell>
                <TableCell>{passenger.TotalFlights}</TableCell>
                <TableCell>{passenger.FlightsWithAirline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PassengerIdSearch;
