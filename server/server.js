const express = require("express");
const app = express();

// app.post("/post", (req, res) => {
//   console.log("Connected to React");
// });
app.get("/", (req, res) => {
  res.send("base hit!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
