const createError = require("http-errors");
const Comment = require("../models/comments.model");
const Product = require("../models/products.model");

module.exports.create = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        Comment.create({
          ...req.body,
          product: req.params.id,
        })
          .then((address) => {
            res.status(201).json(address);
          })
          .catch(next);
      } else {
        next(createError(404, "Product not found"));
      }
    })
    .catch(next);
  
};

module.exports.update = (req, res, next) => {
  Comment.findOne({ product: req.params.id, _id: req.params.commentId })
    .populate("product")
    .then((comment) => {
      if (comment) {
        comment.commentary = req.body.commentary;
        comment.save()
          .then((comment) => {
            if (comment) {
              res.json(comment);
            } else {
              next(createError(404, "Comment not found"));
            }
          })
          .catch(next);
      } else {
        next(createError(404, "Product or commentary id does not match"));
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.commentId)
    .then((comment) => {
      if (comment) {
        res.status(204).send();
      } else {
        next(createError(404, "Comment not found"));
      }
    })
    .catch(next);
};
