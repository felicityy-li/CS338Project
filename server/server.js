const express = require("express");
const app = express();
const mysql = require("mysql");

app.get("/", (req, res) => {
  res.send("base hit!");
});

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "test",
  user: "root",
  password: "root",
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connection created with mysql server successfully");
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
