const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const mongoose = require("mongoose");

require("./config/db.config");

const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());

// Load routes
const router = require("./config/routes.config");
app.use("/api/v1", router);

app.use((req, res, next) => {
  next(createError(400, "Route not found"));
});

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ errors: error.errors });
  }

  console.error(error);

  if (!error.status) {
    error = createError(500, error.message);
  }

  res.status(error.status).json({ message: error.message });
});

app.listen(3000, () => console.info("Applicaiton listening at port 3000"));
