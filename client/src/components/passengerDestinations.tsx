import React, { useEffect, useState } from "react";
import { Passenger } from "../types/passengerTypes.ts";
import { AirlineTypes } from "../types/flightType.ts";
import {
  fetchPassengerData,
  fetchDistinctAirlines,
} from "../services/services.ts";
import { airlineToLocationMap, Location } from "./airlineToLocationMap.ts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import marker from "../images/marker.png";
import "leaflet/dist/leaflet.css";

const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [10, 15],
});

const PassengerDestinations: React.FC = () => {
  const [passengerData, setPassengerData] = useState<Passenger[]>([]);
  const [airlineNamesData, setAirlineNamesData] = useState<AirlineTypes[]>([]);
  const [destinations, setDestinations] = useState<Location[]>([]);

  useEffect(() => {
    const getPassengerData = async () => {
      try {
        const data = await fetchPassengerData();
        setPassengerData(data);
      } catch (e) {
        console.error(e);
      }
    };
    getPassengerData();
  }, []);

  useEffect(() => {
    const getDistinctAirlines = async () => {
      try {
        const data = await fetchDistinctAirlines();
        const mappedLocations = data.map(
          (airline) => airlineToLocationMap[airline.Airline]
        );
        setAirlineNamesData(data);
        setDestinations(mappedLocations);
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
    getDistinctAirlines();
  }, []);

  return (
    <div>
      <MapContainer
        center={[33.9416, -118.4085]}
        zoom={2}
        // scrollWheelZoom={false}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map(
          (location, index) =>
            location && (
              <Marker
                key={index}
                position={[location.lat, location.lng]}
                icon={myIcon}
              >
                <Popup>{airlineNamesData[index]?.Airline}</Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
};

export default PassengerDestinations;
