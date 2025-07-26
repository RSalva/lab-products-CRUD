const mongoose = require("mongoose");
const Product = require("../models/products.model");

module.exports.list = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  Product.create(req.body)
    .then((product) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errors: error.errors })
      }
      next(error);
    });
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
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errors: error.errors });
      }
      next(error);
    });
};

module.exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        resizeTo.status(204).send();
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "Invalid request" });
    });
};