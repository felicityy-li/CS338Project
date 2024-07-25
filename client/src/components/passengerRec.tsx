import React, { useState } from "react";
import { fetchPassengerRecs } from "../services/fancyFeatureServices.ts";
import { Passenger } from "../types/passengerTypes.ts";
import vacation from "../images/vacation.jpg";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const Recommendator: React.FC = () => {
  const [airline, setAirline] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [citizenship, setCitizenship] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleFetchRecommendations = async () => {
    if (airline && citizenship) {
      setLoading(true);
      try {
        const data = await fetchPassengerRecs(
          airline,
          destination,
          citizenship
        );
        setRecommendations(data);
        setOpen(true);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleFetchRecommendations();
    }
  };

  return (
    <div>
      <TextField
        label="Airline"
        variant="outlined"
        value={airline}
        onChange={(e) => setAirline(e.target.value)}
        onKeyDown={handleKeyPress}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Destination"
        variant="outlined"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        onKeyDown={handleKeyPress}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Citizenship"
        variant="outlined"
        value={citizenship}
        onChange={(e) => setCitizenship(e.target.value)}
        onKeyDown={handleKeyPress}
        fullWidth
        margin="normal"
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Recommendations</DialogTitle>
          <DialogContent>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">Fiji</Typography>
                <img
                  src={vacation}
                  alt="Vacation"
                  style={{ width: "100%", height: "auto" }}
                />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Recommendator;
