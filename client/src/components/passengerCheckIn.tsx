import React, { useEffect, useState } from "react";
import { fetchPassengerCheckIn } from "../services/services.ts";
import { CheckIn } from "../types/passengerTypes.ts";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const PassengerCheckIn: React.FC = () => {
  const [passengerData, setPassengerData] = useState<CheckIn[]>([]);
  const [passengerIds, setPassengerIds] = useState<string[]>([]);
  const [inputIds, setInputIds] = useState<string>("");

  useEffect(() => {
    const getPassengerData = async () => {
      try {
        const data = await fetchPassengerCheckIn(passengerIds);
        setPassengerData(data);
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

  const columns = [
    { field: "FlightNum", headerName: "Flight Number", width: 210 },
    { field: "Terminal", headerName: "Terminal", width: 150 },
    { field: "Airline", headerName: "Airline", width: 230 },
    { field: "ScheduledDate", headerName: "Scheduled Date", width: 300 },
    { field: "ScheduledTime", headerName: "Scheduled Time", width: 230 },
  ];

  return (
    <div style={{ width: "90%", margin: "auto", marginBottom: "5%" }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          mb: 2,
        }}
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

      <div style={{ width: "100%" }}>
        <DataGrid
          rows={passengerData}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row.FlightNum}
        />
      </div>
    </div>
  );
};

export default PassengerCheckIn;
