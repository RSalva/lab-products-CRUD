const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");

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
  if (!error.status) {
    error = createError(500, error.message);
  }
  console.error(error);

  res.status(error.status).json({ message: error.message });
});

app.listen(3000, () => console.info("Applicaiton listening at port 3000"));
