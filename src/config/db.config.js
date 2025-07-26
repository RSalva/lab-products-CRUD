const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/products-api")
  .then(() => {
    console.info("Connected to products-api mongo database");
  })
  .catch((error) => {
    console.error("Failed to conect to the database", error);
  });