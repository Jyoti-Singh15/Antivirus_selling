import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserPayload {
  userId: string;
  email: string;
  role: "CUSTOMER";
}

export interface AuthenticatedUserRequest extends Request {
  user?: UserPayload;
}

export const requireUser = (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Customer authentication required. Please login with your email.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "super_secret_jwt_customer_key_2026_antivirus";

    const decoded = jwt.verify(token, secret) as UserPayload;

    if (!decoded || decoded.role !== "CUSTOMER") {
      res.status(403).json({
        success: false,
        message: "Invalid customer token.",
      });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Customer session expired or invalid. Please login again.",
    });
  }
};

export const optionalUserAuth = (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const secret = process.env.JWT_SECRET || "super_secret_jwt_customer_key_2026_antivirus";
      const decoded = jwt.verify(token, secret) as UserPayload;
      if (decoded && decoded.role === "CUSTOMER") {
        req.user = decoded;
      }
    }
  } catch {
    // Ignore invalid tokens for optional auth
  }
  next();
};
