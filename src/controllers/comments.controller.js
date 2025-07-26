const createError = require("http-errors");
const Comment = require("../models/comments.model");

module.exports.create = (req, res, next) => {
  Comment.create({
    ...req.body,
    product: req.params.id,
  })
    .then((address) => {
      res.status(201).json(address);
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body, {
    new: true,
    runValidators: true
  })
    .populate("product")
    .then((comment) => {
      if (comment) {
        res.json(comment);
      } else {
        next(createError(404, "Comment not found"));
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
