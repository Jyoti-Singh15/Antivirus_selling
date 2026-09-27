import { Request, Response } from "express";
import mongoose from "mongoose";
import { Order, IOrderItem } from "../models/Order.js";
import { LicenseKey } from "../models/LicenseKey.js";
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
      const productId = item.productId;
      const variantId = item.variant?.id || item.variantId;
      const quantity = Number(item.quantity) || 1;
      const productTitle = item.productTitle || "Product";

      const keyQuery: any = {
        variantId,
        status: "AVAILABLE",
      };

      if (mongoose.Types.ObjectId.isValid(productId)) {
        keyQuery.productId = new mongoose.Types.ObjectId(productId);
      }

      const availableKeysCount = await LicenseKey.countDocuments(keyQuery);

      if (availableKeysCount < quantity) {
        res.status(400).json({
          success: false,
          message: `Insufficient stock for '${productTitle}'. Requested: ${quantity}, Available: ${availableKeysCount}.`,
        });
        return;
      }
    }

    let subtotal = 0;
    const orderItems: IOrderItem[] = [];
    const allAllocatedKeyDocs: any[] = [];
    const orderNumber = generateOrderNumber();

    // Perform atomic key reservation and allocation
    for (const item of items) {
      const {
        productId,
        variant,
        variantId: rawVariantId,
        quantity = 1,
        pricePerUnit,
        productTitle,
        productImage,
        brand,
        officialDownloadUrl,
      } = item;

      const variantId = variant?.id || rawVariantId;
      const itemTotal = Number(pricePerUnit) * Number(quantity);
      subtotal += itemTotal;

      const allocatedKeysForItem: string[] = [];

      for (let i = 0; i < Number(quantity); i++) {
        const findQuery: any = {
          variantId,
          status: "AVAILABLE",
        };

        if (mongoose.Types.ObjectId.isValid(productId)) {
          findQuery.productId = new mongoose.Types.ObjectId(productId);
        }

        const claimedKey = await LicenseKey.findOneAndUpdate(
          findQuery,
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
          // Rollback any claimed keys if an item ran out of stock
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

      const targetProductId = mongoose.Types.ObjectId.isValid(productId)
        ? new mongoose.Types.ObjectId(productId)
        : new mongoose.Types.ObjectId();

      orderItems.push({
        productId: targetProductId,
        productTitle: productTitle || "Antivirus",
        productImage: productImage || "",
        brand: brand || "Antivirus",
        variant: {
          id: variantId,
          durationYears: Number(variant?.durationYears) || 1,
          deviceCount: Number(variant?.deviceCount) || 1,
          mrp: Number(variant?.mrp) || Number(pricePerUnit),
          sellingPrice: Number(pricePerUnit),
          discountPercent: Number(variant?.discountPercent) || 0,
        },
        quantity: Number(quantity),
        pricePerUnit: Number(pricePerUnit),
        licenseKeys: allocatedKeysForItem,
        officialDownloadUrl: officialDownloadUrl || "https://www.quickheal.co.in/installer",
      });
    }

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

    const newOrder = new Order({
      orderNumber,
      userId: req.user && mongoose.Types.ObjectId.isValid(req.user.userId)
        ? new mongoose.Types.ObjectId(req.user.userId)
        : undefined,
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
        id: (newOrder._id as mongoose.Types.ObjectId).toString(),
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
      query._id = new mongoose.Types.ObjectId(id);
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
        id: ((order as any)._id).toString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch order",
    });
  }
};
