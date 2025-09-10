const config = require("./config");
const mongoose = require("mongoose");

const db = mongoose
  .connect(config.get("db"))
  .then(() =>
    console.info("Connected to products-api mongo database", config.get("db"))
  )
  .catch((error) => console.error("Failed to connect to the database", error));

module.exports.clearDB = async () => {
  // wait for db setup
  await db;

  // now drop database
  await mongoose.connection.db.dropDatabase();

  console.log("DB clear");
};

module.exports.closeDBConnection = async () => {
  await mongoose.connection.close();
  console.log("DB connection closed");
}