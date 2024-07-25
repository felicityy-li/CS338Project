import React, { useEffect, useState } from "react";
import { PlaneManufactureYears } from "../types/planeType";
import { fetchOldestNewestManufacture } from "../services/fancyFeatureServices.ts";
import { Bar } from "react-chartjs-2";
import { IconButton, Grid } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PlaneManufacturedDoubleBarGraph: React.FC = () => {
  const [filteredData, setFilteredData] = useState<PlaneManufactureYears[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getPlaneData = async () => {
      try {
        const data = await fetchOldestNewestManufacture();
        setFilteredData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPlaneData();
  }, []);

  const processData = () => {
    const oldestMap = new Map<string, PlaneManufactureYears>();
    const newestMap = new Map<string, PlaneManufactureYears>();

    filteredData.forEach((plane) => {
      if (!oldestMap.has(plane.Manufacturer)) {
        oldestMap.set(plane.Manufacturer, plane);
      }
      newestMap.set(plane.Manufacturer, plane);
    });

    return {
      oldest: Array.from(oldestMap.values()),
      newest: Array.from(newestMap.values()),
    };
  };

  const { oldest, newest } = processData();

  const labels = Array.from(
    new Set([...oldest, ...newest].map((p) => p.Manufacturer))
  );
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLabels = labels.slice(startIndex, endIndex);

  const oldestData = paginatedLabels.map((label) => {
    const plane = oldest.find((p) => p.Manufacturer === label);
    return plane ? plane.PassengerCapacity : 0;
  });
  const newestData = paginatedLabels.map((label) => {
    const plane = newest.find((p) => p.Manufacturer === label);
    return plane ? plane.PassengerCapacity : 0;
  });

  const data = {
    labels: paginatedLabels,
    datasets: [
      {
        label: "Oldest Year Capacity",
        data: oldestData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Newest Year Capacity",
        data: newestData,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    const maxPage = Math.ceil(labels.length / itemsPerPage) - 1;
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  };

  return (
    <div style={{ margin: "auto"}}>
      <div style={{ overflowX: "auto" }}>
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: "Passenger Capacity by Manufacturer Year",
                padding: {
                  bottom: 18,
                },
                font: {
                  size: 26,
                  weight: "bold",
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.dataset.label}: ${context.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                stacked: false,
                ticks: {
                  autoSkip: false,
                },
                title: {
                  display: true,
                  text: "Manufacturer",
                  font: {
                    size: 18,
                    weight: "bold",
                  },
                },
              },
              y: {
                stacked: false,
                title: {
                  display: true,
                  text: "Passenger Capacity",
                  font: {
                    size: 18,
                    weight: "bold",
                  },
                },
              },
            },
          }}
        />
      </div>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "0.8%" }}
      >
        <Grid item>
          <IconButton onClick={handlePrev} disabled={currentPage === 0}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={handleNext}
            disabled={(currentPage + 1) * itemsPerPage >= labels.length}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlaneManufacturedDoubleBarGraph;
