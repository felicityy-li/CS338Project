const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const featureRoutes = require("./routers/routers");
const fancyFeatureRoutes = require("./routers/fancyRouters");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", featureRoutes);
app.use("/api", fancyFeatureRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
