const express = require('express');
const router = express.Router();
const connection = require('../config/dbConfig');
const queries = require('./queries');

router.get("/flight_status", (req, res) => {
  connection.query(queries.feature1, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
    } else {
      res.json(results);
    }
  });
});

router.get("/passenger_data", (req, res) => {
  connection.query(queries.feature2, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
    } else {
      res.json(results);
    }
  });
});

router.get("/passenger_check_in", (req, res) => {
  connection.query(queries.feature3, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
    } else {
      res.json(results);
    }
  });
});

router.get("/plane_details", (req, res) => {
  connection.query(queries.feature4, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
    } else {
      res.json(results);
    }
  });
});

router.get("/delays", (req, res) => {
  connection.query(queries.feature5, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
    } else {
      res.json(results);
    }
  });
});

router.get("/cargo", (req, res) => {
  connection.query(queries.feature6, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;