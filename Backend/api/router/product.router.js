import express from "express";
import {
  getProductsByCategory,
  getProductById,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getProductsByCategory);
router.get("/getProducts", getProductsByCategory);
router.get("/:id", getProductById);


export default router;