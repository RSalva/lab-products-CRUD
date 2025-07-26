const mongoose = require("mongoose");
const Product = require("../models/products.model");

module.exports.list = (req, res, next) => {
  Product.find()
    .populate("comments")
    .then((products) => {
      res.json(products);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate("comments")
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        next(createError(404, "User not found"));
      }
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  Product.create(req.body)
    .then((product) => {
      res.status(201).json(product);
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, 
    runValidators: true
  })
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        next(createError(404, "Product not found"));
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        res.status(204).send();
      } else {
        next(createError(404, "Product not found"));
      }
    })
    .catch(next);
};