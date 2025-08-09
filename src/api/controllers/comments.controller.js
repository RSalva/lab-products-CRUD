const Comment = require("../../lib/models/comments.model");
const Product = require("../../lib/models/products.model");

const createError = require("http-errors");

const ProductNotFound = createError(404, "product not found");
const ProductAlreadyExists = createError(409, {
  message: "Product validation failed: name: Product name already exists",
  errors: { name: "Product already exists" },
});
const CommentNotFound = createError(404, "comment not found");
const CommentAlreadyExists = createError(409, {
  message: "Comment validation failed: commentary: Comment already exists",
  errors: { commentary: "Comment already exists" },
});

module.exports.create = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const comment = await Comment.create({
      ...req.body,
      product: req.params.id,
    });
    if (comment) res.status(201).json(comment);
    else next();
  } else next(ProductNotFound);
};

module.exports.update = async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.commentId
  ).populate("product");
  if (comment) res.json(comment);
  else next(CommentNotFound);
};

module.exports.delete = async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.commentId);
  if (comment) res.status(204).send();
  else next(CommentNotFound);
};
