const config = require("./lib/config");

const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const mongoose = require("mongoose");
const { deleteFile } = require("./lib/storage");

require("./lib/db");

const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());

// Load API routes
app.use("/api/v1", require("./api"));

app.use((req, res, next) => {
  next(createError(400, "Route not found"));
});

app.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  ) {
    error = createError(404, "Resource not found");
  }
  if (req.file) {
    console.log("removed uploaded file");
    deleteFile(req.file.filename);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ errors: error.errors });
  }

  console.error(error);

  if (!error.status) {
    error = createError(500, error.message);
  }

  res.status(error.status).json({ message: error.message });
});

app.listen(config.get("port"), () =>
  console.info(`Applicaiton listening at port ${config.get("port")}`)
);

module.exports = app;
