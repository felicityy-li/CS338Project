import React, { useEffect, useState } from "react";
import { PopularDestinations } from "../types/flightType";
import { fetchPopularDestinations } from "../services/fancyFeatureServices.ts";
import { airlineToContinentMap } from "./airlineToLocationMap.ts";

import { Grid } from "@mui/material";
import ApexCharts from "react-apexcharts";

const continents = {
  asia: ["India", "Singapore"],
  europe: ["Germany", "UK", "France"],
  australia: ["Australia"],
  northAmerica: ["USA", "Canada"],
};

const PopularDestinationsPieGraphs: React.FC = () => {
  const [destinationsData, setDestinationsData] = useState<{
    australia: PopularDestinations[];
    europe: PopularDestinations[];
    northAmerica: PopularDestinations[];
    asia: PopularDestinations[];
  }>({
    australia: [],
    europe: [],
    northAmerica: [],
    asia: [],
  });

  useEffect(() => {
    const getDestinations = async () => {
      try {
        const fetchedData: {
          australia: PopularDestinations[];
          europe: PopularDestinations[];
          northAmerica: PopularDestinations[];
          asia: PopularDestinations[];
        } = {
          australia: [],
          europe: [],
          northAmerica: [],
          asia: [],
        };

        for (const [continent, countries] of Object.entries(continents)) {
          const result = await fetchPopularDestinations(countries);
          fetchedData[continent] = result;
        }
        setDestinationsData(fetchedData);
      } catch (e) {
        console.error(e);
      }
    };
    getDestinations();
  }, []);

  const getChartData = (continent: keyof typeof continents) => {
    const destinations = destinationsData[continent];
    const data = destinations.reduce(
      (acc: { [key: string]: number }, destination) => {
        const airlineContinent = airlineToContinentMap[destination.Airline];
        if (airlineContinent === continent) {
          acc[destination.Airline] =
            (acc[destination.Airline] || 0) + destination.Popularity;
        }
        return acc;
      },
      {}
    );
    const labels = Object.keys(data);
    const series = Object.values(data);

    return { labels, series };
  };

  return (
    <div>
      <Grid container spacing={2}>
        {Object.keys(continents).map((continent) => {
          const { labels, series } = getChartData(
            continent as keyof typeof continents
          );
          return (
            <Grid item xs={12} sm={6} md={6} key={continent}>
              <h2 style={{ marginLeft: "6%" }}>
                {continent.charAt(0).toUpperCase() + continent.slice(1)}
              </h2>
              <ApexCharts
                type="polarArea"
                series={series}
                options={{
                  chart: {
                    type: "polarArea",
                  },
                  labels: labels,
                  fill: {
                    colors: [
                      "#FF4560",
                      "#00E396",
                      "#008FFB",
                      "#775DD0",
                      "#FEB019",
                      "#FF66C3",
                    ],
                  },
                  legend: {
                    position: "bottom",
                  },
                  plotOptions: {
                    polarArea: {
                      rings: {
                        strokeWidth: 0,
                      },
                    },
                  },
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default PopularDestinationsPieGraphs;
