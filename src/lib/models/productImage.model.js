const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
  imageUrl: {
    type: String
  },
  imageId: {
    type: String
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

const ProductImage = mongoose.model("ProductImage", schema);

module.exports = ProductImage;