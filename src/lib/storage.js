const convict = require("convict");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const config = require("../lib/config");

cloudinary.config({
  cloud_name: config.get("cloudinary.cloudName"),
  api_key: config.get("cloudinary.apiKey"),
  api_secret: config.get("cloudinary.apiSecret"),
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ironhack",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});

// Configure Multer
const upload = multer({ storage: storage });

module.exports.deleteFile = async (fileName) => {
  const result = await cloudinary.uploader.destroy(fileName);

  if (result.result === "ok") {
    console.log(`file deleted: ${fileName}`);
  } else {
    throw new Error("error deleting file", fileName, result);
  }
};

module.exports.storage = upload;
