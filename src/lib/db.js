const config = require("./config");
const mongoose = require("mongoose");

mongoose
  .connect(config.get("db"))
  .then(() => console.info("Connected to products-api mongo database"))
  .catch((error) => console.error("Failed to connect to the database", error));
