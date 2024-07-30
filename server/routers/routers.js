/**
 * routers for the backend 
 */

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

router.get("/distinct_airlines", async (req, res) => {
  try {
    const results = await queries.airlineQuery();
    res.json(results);
  } catch (e) {
    console.error(err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/passenger_check_in", async (req, res) => {
  try {
    const { passengerIds } = req.query;
    const results = await queries.feature3(passengerIds);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/plane_details", async (req, res) => {
  try {
    const results = await queries.feature4();
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/delays", async (req, res) => {
  try {
    const numDays = req.query.numDays;
    const results = await queries.feature5(numDays);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/cargo_types_data", async (req, res) => {
  try {
    const type = req.query.type;
    const results = await queries.feature6(type);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

module.exports = router;
