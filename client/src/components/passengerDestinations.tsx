import React, { useEffect, useState } from "react";
import { AirlineDestinations } from "../types/flightType.ts";
import { fetchPassengerData } from "../services/services.ts";
import { airlineToLocationMap, Location } from "./airlineToLocationMap.ts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import marker from "../images/marker.png";
import "leaflet/dist/leaflet.css";

const getIconSize = (numDestinations: number): [number, number] => {
  if (numDestinations >= 90) return [25, 30];
  if (numDestinations >= 80) return [20, 25];
  if (numDestinations >= 70) return [15, 20];
  return [10, 15];
};

const PassengerDestinations: React.FC = () => {
  const [destinationsData, setDestinationsData] = useState<
    (AirlineDestinations & { location: Location })[]
  >([]);

  useEffect(() => {
    const getDistinctAirlines = async () => {
      try {
        const data = await fetchPassengerData();
        const combinedData = data
          .map((airline) => ({
            ...airline,
            location: airlineToLocationMap[airline.Airline],
          }))
          .filter((item) => item.location);
        setDestinationsData(combinedData);
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
        style={{ height: "800px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinationsData.map((item, index) => {
          const iconSize = getIconSize(item.NumberOfDestinations);
          const dynamicIcon = new Icon({
            iconUrl: marker,
            iconSize: iconSize,
          });
          return (
            <Marker
              key={index}
              position={[item.location.lat, item.location.lng]}
              icon={dynamicIcon}
            >
              <Popup>{item.Airline}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PassengerDestinations;
