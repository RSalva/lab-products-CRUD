const mongoose = require("mongoose");

require("./comments.model");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must have at least 3 characters"],
      maxLength: [50, "Name can't exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0
    },
    discount: {
      type: Number,
      required: [true, "Discount is required"],
      default: 0,
      min: 0,
      max: 100
    },
    category: {
      type: String,
      required: [true, "A category is required"],
      enum: {
        values: [
          "Electronics",
          "Clothing",
          "Home & Kitchen",
          "Sports & Outdoors",
          "Books",
          "Health & Beauty",
          "Toys & Games",
          "Automotive",
          "Grocery",
          "Pet Supplies",
        ],
        message: "Introduce a valid category"
      },
    },
    stock: {
      type: Number,
      required: [true, "Quantity of product is required"],
      min: 0
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        ret.currentCost = Math.round(ret.price * (1 - ret.discount / 100));
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "product"
});

const Product = mongoose.model("Product", schema);

module.exports = Product;