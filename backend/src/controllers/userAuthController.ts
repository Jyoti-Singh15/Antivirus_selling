import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import { AuthenticatedUserRequest } from "../middleware/userAuth.js";

export const registerCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Full Name, Email address, and Password are required.",
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
      return;
    }

    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      res.status(400).json({
        success: false,
        message: "An account with this email already exists. Please log in.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "CUSTOMER",
      status: "ACTIVE",
    });

    await user.save();

    const secret = process.env.JWT_SECRET || "super_secret_jwt_customer_key_2026_antivirus";
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: "CUSTOMER",
      },
      secret,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      success: true,
      message: "Customer account created successfully.",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: "CUSTOMER",
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

export const loginCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide Email and Password.",
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user || !user.password) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    if (user.status === "INACTIVE") {
      res.status(403).json({
        success: false,
        message: "Your account is currently disabled. Please contact support.",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    const secret = process.env.JWT_SECRET || "super_secret_jwt_customer_key_2026_antivirus";
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: "CUSTOMER",
      },
      secret,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      success: true,
      message: "Customer logged in successfully.",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: "CUSTOMER",
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const getCustomerProfile = async (
  req: AuthenticatedUserRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Not authenticated" });
      return;
    }

    const user = await User.findById(req.user.userId).select("-password").lean();
    if (!user) {
      res.status(404).json({ success: false, message: "Customer account not found" });
      return;
    }

    // Fetch customer's orders and all their digital license keys
    const orders = await Order.find({ customerEmail: user.email.toLowerCase() })
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((o) => ({
      ...o,
      id: o._id.toString(),
    }));

    res.status(200).json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      orders: formattedOrders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch customer profile",
    });
  }
};
