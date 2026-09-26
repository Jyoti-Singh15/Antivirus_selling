import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AdminRequest } from "../middleware/adminAuth.js";

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, id, password } = req.body;

    const envEmail = (process.env.ADMIN_EMAIL || "admin@antivirus.com").trim().toLowerCase();
    const envPassword = process.env.ADMIN_PASSWORD || "Admin@Security2026!";
    const envAdminId = (process.env.ADMIN_ID || "admin_master_01").trim();

    if (!password || (!email && !id)) {
      res.status(400).json({
        success: false,
        message: "Please provide Admin ID/Email and Password.",
      });
      return;
    }

    const inputIdentifier = (email || id || "").trim().toLowerCase();
    const isIdMatch = inputIdentifier === envAdminId.toLowerCase();
    const isEmailMatch = inputIdentifier === envEmail;

    if ((!isIdMatch && !isEmailMatch) || password !== envPassword) {
      res.status(401).json({
        success: false,
        message: "Invalid Admin credentials.",
      });
      return;
    }

    const secret = process.env.JWT_ADMIN_SECRET || "super_secret_jwt_admin_master_key_2026_antivirus";
    const token = jwt.sign(
      {
        adminId: envAdminId,
        email: envEmail,
        role: "ADMIN",
      },
      secret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Admin authenticated successfully.",
      token,
      admin: {
        id: envAdminId,
        email: envEmail,
        name: "Master Administrator",
        role: "ADMIN",
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Admin login failed",
    });
  }
};

export const getAdminMe = async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({ success: false, message: "Not authenticated" });
      return;
    }

    res.status(200).json({
      success: true,
      admin: {
        id: req.admin.adminId,
        email: req.admin.email,
        name: "Master Administrator",
        role: "ADMIN",
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch admin profile",
    });
  }
};
