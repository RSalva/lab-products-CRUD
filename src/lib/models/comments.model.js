const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
  commentary: {
    type: String,
    require: [true, "Commentary is required"],
    minlength: [5, "Must be at least 5 characters long"],
    maxlength: [5000, "Can't exceed 5000 characters"]
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required"]
  },
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
}
);

const Comment = mongoose.model("Comment", schema);

module.exports = Comment;