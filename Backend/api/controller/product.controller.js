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

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    if (error?.name === "CastError") {
      return res.status(404).json({ message: "Product not found" });
    }
    console.error("Product detail error:", error);
    return res.status(500).json({
      message: "Failed to fetch product. Please try again.",
    });
  }
};