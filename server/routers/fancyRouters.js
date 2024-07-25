const express = require("express");
const router = express.Router();
const queries = require("./knexFancyQueries");

router.get("/delay_dureation", async (req, res) => {
  try {
    const results = await queries.fancyFeature1();
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/passenger_rec", async (req, res) => {
  const { airline, destination, citizenship } = req.query;
  try {
    const results = await queries.fancyFeature2(
      airline,
      destination,
      citizenship
    );
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/oldest_newest_manufactured", async (req, res) => {
  try {
    const results = await queries.fancyFeature3();
    res.json(results[0]);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.query;
    const results = await queries.fancyFeature4(email, password);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

router.get("/destination_popularities", async (req, res) => {
  try {
    const citizenships = req.query.citizenships;
    const results = await queries.fancyFeature5(citizenships);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Error executing query");
  }
});

module.exports = router;
