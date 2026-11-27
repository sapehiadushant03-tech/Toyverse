import { Auth } from "../models/authschema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  return jwt.sign(
    { userId, timestamp: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );
};

export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUserName = userName.trim();

    // Check if user already exists
    const isUserExist = await Auth.findOne({ email: normalizedEmail });
    if (isUserExist) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    // Hash password with salt
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await Auth.create({
      userName: normalizedUserName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    return res.status(201).json({
      message: "Account created successfully",
      data: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    if (err?.code === 11000) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }
    return res.status(500).json({
      message: "An error occurred during signup. Please try again.",
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const identifier = email.trim();
    const user = await Auth.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { userName: identifier },
      ],
    }).collation({ locale: "en", strength: 2 });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      data: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({
      message: "An error occurred during login. Please try again.",
    });
  }
};