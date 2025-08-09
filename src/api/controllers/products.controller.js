const mongoose = require("mongoose");
const Product = require("../../lib/models/products.model");
const createError = require("http-errors");

const ProductNotFound = createError(404, "product not found");
const ProductAlreadyExists = createError(409, {
  message: "Product validation failed: name: Product name already exists",
  errors: { username: "Product already exists" },
});

module.exports.list = async (req, res, next) => {
  const products = await Product.find().populate("comments").populate("images");
  res.json(products);
};

module.exports.detail = async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("comments").populate("images");
  if (product) res.json(product);
  else next(ProductNotFound);
};

module.exports.create = async (req, res, next) => {
  const { name } = req.body;
  let product = await Product.findOne({ name });
  if (product) next(ProductAlreadyExists);
  else {
    product = await Product.create(req.body);
    res.status(201).json(product);
  }
};

module.exports.update = async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (product) res.json(product);
  else next(ProductNotFound);
};

module.exports.delete = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) res.status(204).send();
  else next(ProductNotFound);
};
