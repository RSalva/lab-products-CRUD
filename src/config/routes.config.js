const express = require("express");
const router = express.Router();

const products = require("../controllers/products.controller");

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

module.exports = router;