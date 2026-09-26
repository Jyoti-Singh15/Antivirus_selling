import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AdminPayload {
  adminId: string;
  email: string;
  role: "ADMIN";
}

export interface AdminRequest extends Request {
  admin?: AdminPayload;
}

export const requireAdmin = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Unauthorized. Admin token missing.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_ADMIN_SECRET || "super_secret_jwt_admin_master_key_2026_antivirus";

    const decoded = jwt.verify(token, secret) as AdminPayload;

    if (!decoded || decoded.role !== "ADMIN") {
      res.status(403).json({
        success: false,
        message: "Forbidden. Admin privileges required.",
      });
      return;
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Session expired or invalid admin token. Please log in again.",
    });
  }
};
