import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    originalPrice: { type: Number, min: 0 },
    badge: { type: String, trim: true },
    image: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);