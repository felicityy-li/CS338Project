import React, { useEffect, useState } from "react";
import { fetchFlightStatus } from "../services/services.ts";
import { Flight } from "../types/flightType.ts";

import {
  Slider,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Pagination,
} from "@mui/material";

function valuetext(value: number) {
  return `${value}`;
}

const FlightStatus: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getFlights = async () => {
      try {
        const data = await fetchFlightStatus(limit);
        setFlights(data);
      } catch (error) {
        console.error(error);
      }
    };
    getFlights();
  }, [limit]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setLimit(newValue as number);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(flights.length / itemsPerPage);
  const paginatedFlights =
    limit > 10
      ? flights.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : flights;

  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "3%" }}>
      <div style={{ height: "100%", marginBottom: "1.6%" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>FlightNum</TableCell>
                <TableCell>Airline</TableCell>
                <TableCell>ScheduledDate</TableCell>
                <TableCell>ScheduledTime</TableCell>
                <TableCell>FlightId</TableCell>
                <TableCell>PlaneId</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedFlights.map((flight) => (
                <TableRow key={flight.FlightId}>
                  <TableCell>{flight.FlightNum}</TableCell>
                  <TableCell>{flight.Airline}</TableCell>
                  <TableCell>{flight.ScheduledDate}</TableCell>
                  <TableCell>{flight.ScheduledTime}</TableCell>
                  <TableCell>{flight.FlightId}</TableCell>
                  <TableCell>{flight.PlaneId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={{ width: "98%", margin: "auto" }}>
        <Slider
          aria-label="Flight Limit"
          defaultValue={10}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={100}
          value={limit}
          onChange={handleSliderChange}
        />
      </div>
      {limit > 20 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </div>
  );
};

export default FlightStatus;
