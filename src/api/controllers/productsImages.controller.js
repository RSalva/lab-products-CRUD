const mongoose = require("mongoose");
const Product = require("../../lib/models/products.model");
const ProductImage = require("../../lib/models/productImage.model");
const createError = require("http-errors");
const { deleteFile } = require("../../lib/storage");


module.exports.create = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const productImage = await ProductImage.create({
      imageUrl: req.file.path,
      imageId: req.file.filename,
      product: req.params.id,
    });
    res.status(200).json(productImage);
  } else {
    next();
  }
};

/*module.exports.update = async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (product) res.json(product);
  else next(ProductNotFound);
};*/

module.exports.delete = async (req, res, next) => {
  const productImage = await ProductImage.findByIdAndDelete(req.params.imageId);
  deleteFile(productImage.imageId);
  if (productImage) res.status(204).send();
  else next();
};
