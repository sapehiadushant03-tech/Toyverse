import { Product } from "../models/product.Schema.js";

export const getProductsByCategory = async (req, res, next) => {
  try {
    const category = req.query.category;
    
    // Sanitize query - prevent NoSQL injection
    const query = category ? { category: category.trim() } : {};

    const products = await Product.find(query).lean(); // lean() for better performance

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products || [],
    });
  } catch (error) {
    console.error("Product fetch error:", error);
    return res.status(500).json({
      message: "Failed to fetch products. Please try again.",
    });
  }
};