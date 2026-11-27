import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./api/router/auth.router.js";
import productRouter from "./api/router/product.router.js";

const app = express();

// Config
dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

// Security Middlewares
app.use(helmet()); // Set security headers

// CORS with environment variable
const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  process.env.FRONTEND_URL ||
  "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());
app.use(cors({ 
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed by CORS"));
  },
  credentials: true, // Allow cookies
}));

// Body parsing with size limits
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Don't expose internal error details
  const status = err.status || 500;
  const message = process.env.NODE_ENV === "production" 
    ? "An error occurred. Please try again later."
    : err.message;

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { error: err.message }),
  });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

export default app;