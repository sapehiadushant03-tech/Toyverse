import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-zA-Z0-9]+$/, // Only alphanumeric
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Enforce uniqueness at DB level
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

export const Auth = mongoose.model("Auth", authSchema);