require("dotenv").config();

const validator = require("validator");
const convict = require("convict");
const externalFormats = require("convict-format-with-validator");
const { format } = require("morgan");

convict.addFormats(externalFormats);

convict.addFormat({
  name: "mongodb-uri",
  validate: function (uri) {
    if (!validator.isURL(uri, { protocols: "mongodb" })) {
      throw new Error("Invalid mongodb uri");
    }
  },
});

convict.addFormat({
  name: "string-array",
  validate: function (elements) {
    if (!Array.isArray(elements)) {
      throw new Error("Must be an array of strings or comma separated");
    }
  },
  coerce: function (value) {
    if (Array.isArray(value)) return value;
    else if (typeof value === "string")
      return value.split(",").map((element) => element.trim());
    else return value;
  },
});

const config = convict({
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT",
  },
  db: {
    doc: "MongoDB URI.",
    format: "mongodb-uri",
    default: "mongodb://127.0.0.1:27017/products-api",
    env: "MONGODB_URI",
  },
  cloudinary: {
    cloudName: {
      doc: "Cloudinary cloud name.",
      format: String,
      default: "xxx",
      env: "CLOUDINARY_CLOUD_NAME",
      sensitive: true,
    },
    apiKey: {
      doc: "Cloudinary API key.",
      format: String,
      default: "xxx",
      env: "CLOUDINARY_API_KEY",
      sensitive: true,
    },
    apiSecret: {
      doc: "Cloudinary API secret",
      format: String,
      default: "xxx",
      env: "CLOUDINARY_API_SECRET",
      sensitive: true,
    },
  },
});

config.validate({ allowed: "strict" });

module.exports = config;
