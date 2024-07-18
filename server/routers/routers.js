const express = require("express");
const router = express.Router();
const queries = require("./knexQueries");

router.get("/flight_status", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const results = await queries.feature1(limit);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/passenger_data", async (req, res) => {
  try {
    const results = await queries.feature2();
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/passenger_check_in", async (req, res) => {
  try {
    const { passengerIds, startDate, endDate } = req.query;
    const results = await queries.feature3(
      JSON.parse(passengerIds),
      startDate,
      endDate
    );
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/plane_details", async (req, res) => {
  try {
    const year = req.query.year;
    const results = await queries.feature4(year);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/delays", async (req, res) => {
  try {
    const results = await queries.feature5();
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/cargo", async (req, res) => {
  try {
    const weight = req.query.weight;
    const results = await queries.feature6(weight);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

module.exports = router;
