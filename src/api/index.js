const express = require("express");
const router = express.Router();
const { storage } = require("../lib/storage");

const products = require("./controllers/products.controller");
const comments = require("./controllers/comments.controller");
const productsImages = require("./controllers/productsImages.controller");

// PRODUCTS CRUD

// CREATE
router.post("/products", products.create);

// READ 
router.get("/products", products.list);
router.get("/products/:id", products.detail);

// UPDATE
router.patch("/products/:id", products.update);

// DELETE
router.delete("/products/:id", products.delete);


// COMENTARIES CRUD

router.post("/products/:id/comments", comments.create);
router.patch("/products/:id/comments/:commentId", comments.update);
router.delete("/products/:id/comments/:commentId", comments.delete);

// PRODUCT IMAGE CRUD
router.post("/products/:id/images", storage.single("image"), productsImages.create);
router.delete("/products/:id/images/:imageId", productsImages.delete);

module.exports = router;