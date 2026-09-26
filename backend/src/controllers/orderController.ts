import { Request, Response } from "express";
import mongoose from "mongoose";
import { Order } from "../models/Order.js";
import { LicenseKey } from "../models/LicenseKey.js";
import { Product } from "../models/Product.js";
import { Coupon } from "../models/Coupon.js";
import { AuthenticatedUserRequest } from "../middleware/userAuth.js";

// Helper to generate readable Order Number
const generateOrderNumber = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `ORD-${dateStr}-${randomSuffix}`;
};

export const validateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, orderAmount } = req.body;

    if (!code) {
      res.status(400).json({ success: false, message: "Please enter a coupon code." });
      return;
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = await Coupon.findOne({ code: cleanCode, isActive: true });

    if (!coupon) {
      res.status(404).json({ success: false, message: "Invalid or expired coupon code." });
      return;
    }

    if (new Date(coupon.validUntil) < new Date()) {
      res.status(400).json({ success: false, message: "This coupon has expired." });
      return;
    }

    if (coupon.usageCount >= coupon.usageLimit) {
      res.status(400).json({
        success: false,
        message: "This coupon usage limit has been reached.",
      });
      return;
    }

    const subtotal = Number(orderAmount) || 0;
    if (subtotal < coupon.minOrderValue) {
      res.status(400).json({
        success: false,
        message: `Minimum order value of ₹${coupon.minOrderValue} required for this coupon.`,
      });
      return;
    }

    let discount = 0;
    if (coupon.discountType === "PERCENT") {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    // Ensure discount does not exceed order value
    discount = Math.min(discount, subtotal);

    res.status(200).json({
      success: true,
      message: `Coupon '${coupon.code}' applied! You saved ₹${discount}.`,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discount,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to validate coupon",
    });
  }
};

export const processCheckout = async (
  req: AuthenticatedUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { customerName, customerEmail, items, couponCode, paymentMethod } = req.body;

    if (!customerName || !customerEmail || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        message: "Customer Name, Customer Email, and Cart Items are required.",
      });
      return;
    }

    const cleanEmail = customerEmail.trim().toLowerCase();

    // Verify stock availability for all items before dedicating keys
    for (const item of items) {
      const { productId, variantId, quantity = 1, productTitle } = item;
      const availableKeysCount = await LicenseKey.countDocuments({
        productId,
        variantId,
        status: "AVAILABLE",
      });

      if (availableKeysCount < quantity) {
        res.status(400).json({
          success: false,
          message: `Insufficient stock for '${productTitle}'. Requested: ${quantity}, Available: ${availableKeysCount}.`,
        });
        return;
      }
    }

    // Calculate subtotal
    let subtotal = 0;
    const orderItems: any[] = [];
    const allAllocatedKeyDocs: any[] = [];

    const orderNumber = generateOrderNumber();

    // Perform atomic key reservation and allocation
    for (const item of items) {
      const {
        productId,
        variant,
        quantity = 1,
        pricePerUnit,
        productTitle,
        productImage,
        brand,
        officialDownloadUrl,
      } = item;

      const itemTotal = Number(pricePerUnit) * Number(quantity);
      subtotal += itemTotal;

      const allocatedKeysForItem: string[] = [];

      // Atomically pop and claim keys one by one (FIFO)
      for (let i = 0; i < quantity; i++) {
        const claimedKey = await LicenseKey.findOneAndUpdate(
          {
            productId: new mongoose.Types.ObjectId(productId),
            variantId: variant.id,
            status: "AVAILABLE",
          },
          {
            status: "SOLD",
            orderNumber,
            customerEmail: cleanEmail,
            customerName: customerName.trim(),
            soldAt: new Date(),
          },
          { new: true, sort: { createdAt: 1 } }
        );

        if (!claimedKey) {
          // If a race condition occurred and key wasn't available, rollback any claimed keys
          for (const kDoc of allAllocatedKeyDocs) {
            await LicenseKey.findByIdAndUpdate(kDoc._id, {
              status: "AVAILABLE",
              orderId: null,
              orderNumber: null,
              customerEmail: null,
              customerName: null,
              soldAt: null,
            });
          }

          res.status(400).json({
            success: false,
            message: `Stock ran out for '${productTitle}' during checkout. Please try again.`,
          });
          return;
        }

        allAllocatedKeyDocs.push(claimedKey);
        allocatedKeysForItem.push(claimedKey.keyString);
      }

      orderItems.push({
        productId: new mongoose.Types.ObjectId(productId),
        productTitle,
        productImage: productImage || "",
        brand: brand || "Antivirus",
        variant: {
          id: variant.id,
          durationYears: Number(variant.durationYears) || 1,
          deviceCount: Number(variant.deviceCount) || 1,
          mrp: Number(variant.mrp) || Number(pricePerUnit),
          sellingPrice: Number(pricePerUnit),
          discountPercent: Number(variant.discountPercent) || 0,
        },
        quantity: Number(quantity),
        pricePerUnit: Number(pricePerUnit),
        licenseKeys: allocatedKeysForItem,
        officialDownloadUrl: officialDownloadUrl || "https://www.quickheal.co.in/installer",
      });
    }

    // Apply Coupon discount if provided
    let discount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.trim().toUpperCase(),
        isActive: true,
      });

      if (coupon && new Date(coupon.validUntil) >= new Date() && subtotal >= coupon.minOrderValue) {
        if (coupon.discountType === "PERCENT") {
          discount = Math.round((subtotal * coupon.discountValue) / 100);
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }
        discount = Math.min(discount, subtotal);
        await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usageCount: 1 } });
      }
    }

    const totalAmount = Math.max(0, subtotal - discount);

    // Create and save Order
    const newOrder = new Order({
      orderNumber,
      userId: req.user ? new mongoose.Types.ObjectId(req.user.userId) : null,
      customerName: customerName.trim(),
      customerEmail: cleanEmail,
      items: orderItems,
      subtotal,
      discount,
      couponCode: discount > 0 ? couponCode : null,
      tax: 0,
      totalAmount,
      paymentMethod: paymentMethod || "Instant UPI / NetBanking / Cards",
      paymentStatus: "SUCCESS",
    });

    await newOrder.save();

    // Associate orderId on the allocated license keys
    for (const keyDoc of allAllocatedKeyDocs) {
      await LicenseKey.findByIdAndUpdate(keyDoc._id, {
        orderId: newOrder._id,
      });
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully! Your digital license keys are ready.",
      order: {
        ...newOrder.toObject(),
        id: newOrder._id.toString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to complete checkout order",
    });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email } = req.query;

    let query: any = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query._id = id;
    } else {
      query.orderNumber = id;
    }

    if (email) {
      query.customerEmail = (email as string).trim().toLowerCase();
    }

    const order = await Order.findOne(query).lean();

    if (!order) {
      res.status(404).json({ success: false, message: "Order not found." });
      return;
    }

    res.status(200).json({
      success: true,
      order: {
        ...order,
        id: order._id.toString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch order",
    });
  }
};
