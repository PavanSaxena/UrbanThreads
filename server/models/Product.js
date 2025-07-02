import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true, // Ensures productId is unique
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    image: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      trim: true,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    sizes: [
      {
        type: String,
        trim: true,
      },
    ],
    colors: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
