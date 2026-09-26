import { Request, Response } from "express";
import { Coupon } from "../models/Coupon.js";

export const getAdminCoupons = async (req: Request, res: Response): Promise<void> => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
    const formattedCoupons = coupons.map((c) => ({
      ...c,
      id: c._id.toString(),
    }));

    res.status(200).json({
      success: true,
      count: formattedCoupons.length,
      coupons: formattedCoupons,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch coupons",
    });
  }
};

export const createCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, discountType, discountValue, minOrderValue, maxDiscount, validUntil, usageLimit } =
      req.body;

    if (!code || !discountType || !discountValue || !validUntil) {
      res.status(400).json({
        success: false,
        message: "Code, Discount Type, Discount Value, and Valid Until date are required.",
      });
      return;
    }

    const cleanCode = code.trim().toUpperCase();
    const existing = await Coupon.findOne({ code: cleanCode });

    if (existing) {
      res.status(400).json({
        success: false,
        message: "A coupon with this promo code already exists.",
      });
      return;
    }

    const coupon = new Coupon({
      code: cleanCode,
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue) || 0,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      validUntil: new Date(validUntil),
      usageLimit: Number(usageLimit) || 1000,
      isActive: true,
    });

    await coupon.save();

    res.status(201).json({
      success: true,
      message: "Coupon created successfully.",
      coupon: {
        ...coupon.toObject(),
        id: coupon._id.toString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create coupon",
    });
  }
};

export const updateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.code) {
      updateData.code = updateData.code.trim().toUpperCase();
    }

    const coupon = await Coupon.findByIdAndUpdate(id, updateData, { new: true });
    if (!coupon) {
      res.status(404).json({ success: false, message: "Coupon not found." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully.",
      coupon: {
        ...coupon.toObject(),
        id: coupon._id.toString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update coupon",
    });
  }
};

export const deleteCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      res.status(404).json({ success: false, message: "Coupon not found." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete coupon",
    });
  }
};
