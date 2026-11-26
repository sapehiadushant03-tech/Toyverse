import mongoose from "mongoose";

export const db = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing in Backend/.env");
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
  } catch (err) {
    throw new Error(`MongoDB connection failed: ${err.message}`);
  }
};