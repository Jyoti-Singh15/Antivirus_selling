import { Request, Response } from "express";
import { LicenseKey } from "../models/LicenseKey.js";
import { Product } from "../models/Product.js";
import mongoose from "mongoose";

export const getAdminKeys = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, variantId, status, search, page = 1, limit = 50 } = req.query;

    const query: any = {};

    if (productId && mongoose.Types.ObjectId.isValid(productId as string)) {
      query.productId = new mongoose.Types.ObjectId(productId as string);
    }

    if (variantId) {
      query.variantId = variantId;
    }

    if (status && ["AVAILABLE", "SOLD", "RESERVED"].includes(status as string)) {
      query.status = status;
    }

    if (search) {
      const searchStr = (search as string).trim();
      query.$or = [
        { keyString: { $regex: searchStr, $options: "i" } },
        { customerEmail: { $regex: searchStr, $options: "i" } },
        { customerName: { $regex: searchStr, $options: "i" } },
        { orderNumber: { $regex: searchStr, $options: "i" } },
        { productTitle: { $regex: searchStr, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [keys, total] = await Promise.all([
      LicenseKey.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      LicenseKey.countDocuments(query),
    ]);

    const formattedKeys = keys.map((k) => ({
      ...k,
      id: k._id.toString(),
    }));

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      keys: formattedKeys,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch license keys",
    });
  }
};

export const bulkAddKeys = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, variantId, rawKeys, keys, keyString, notes } = req.body;
    const incomingKeys = rawKeys || keys || keyString;

    if (!productId || !incomingKeys) {
      res.status(400).json({
        success: false,
        message: "Product ID and Raw Keys are required.",
      });
      return;
    }

    let product = null;
    if (mongoose.Types.ObjectId.isValid(productId)) {
      product = await Product.findById(productId);
    }
    if (!product) {
      product = await Product.findOne({
        $or: [{ _id: productId }, { id: productId }, { slug: productId }, { title: productId }],
      });
    }

    if (!product) {
      res.status(404).json({ success: false, message: "Selected product does not exist in database." });
      return;
    }

    let variant = product.variants.find((v) => v.id === variantId);
    if (!variant && product.variants.length > 0) {
      variant = product.variants[0];
    }
    const targetVariantId = variant ? variant.id : (variantId || "default");
    const variantLabel = variant
      ? `${variant.deviceCount} ${variant.deviceCount > 1 ? "Devices" : "Device"} / ${variant.durationYears} ${variant.durationYears > 1 ? "Years" : "Year"}`
      : "1 Device / 1 Year";

    // Parse keys from raw text or array
    let parsedKeys: string[] = [];
    if (Array.isArray(incomingKeys)) {
      parsedKeys = incomingKeys.map((k: any) => String(k).trim()).filter(Boolean);
    } else if (typeof incomingKeys === "string") {
      parsedKeys = incomingKeys
        .split(/[\r\n,;]+/)
        .map((k) => k.trim())
        .filter((k) => k.length > 0);
    }

    // Remove duplicates from the batch
    const uniqueKeys = Array.from(new Set(parsedKeys));

    if (uniqueKeys.length === 0) {
      res.status(400).json({
        success: false,
        message: "No valid license keys found in the input.",
      });
      return;
    }

    // Check which keys already exist in the database
    const existingKeysInDb = await LicenseKey.find({
      keyString: { $in: uniqueKeys },
    }).select("keyString");

    const existingKeySet = new Set(existingKeysInDb.map((k) => k.keyString));
    const newKeysToInsert = uniqueKeys.filter((k) => !existingKeySet.has(k));

    if (newKeysToInsert.length === 0) {
      res.status(400).json({
        success: false,
        message: "All provided keys already exist in the database vault.",
      });
      return;
    }

    const docsToInsert = newKeysToInsert.map((key) => ({
      keyString: key,
      productId: product._id,
      productTitle: product.title,
      variantId: targetVariantId,
      variantLabel,
      status: "AVAILABLE",
      notes: notes || "",
    }));

    await LicenseKey.insertMany(docsToInsert);

    res.status(201).json({
      success: true,
      message: `Successfully imported ${docsToInsert.length} license keys into the vault.`,
      addedCount: docsToInsert.length,
      skippedDuplicatesCount: uniqueKeys.length - docsToInsert.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to bulk upload license keys",
    });
  }
};

export const deleteKey = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const key = await LicenseKey.findById(id);
    if (!key) {
      res.status(404).json({ success: false, message: "License key not found." });
      return;
    }

    if (key.status === "SOLD") {
      res.status(400).json({
        success: false,
        message: "Cannot delete a key that has already been SOLD to a customer.",
      });
      return;
    }

    await LicenseKey.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "License key removed from vault successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete key",
    });
  }
};

export const getKeyStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [totalKeys, availableKeys, soldKeys] = await Promise.all([
      LicenseKey.countDocuments(),
      LicenseKey.countDocuments({ status: "AVAILABLE" }),
      LicenseKey.countDocuments({ status: "SOLD" }),
    ]);

    // Check variant stock levels
    const products = await Product.find().lean();
    const lowStockAlerts: any[] = [];

    for (const prod of products) {
      for (const variant of prod.variants) {
        const count = await LicenseKey.countDocuments({
          productId: prod._id,
          variantId: variant.id,
          status: "AVAILABLE",
        });

        if (count < 5) {
          lowStockAlerts.push({
            productId: prod._id.toString(),
            productTitle: prod.title,
            variantId: variant.id,
            variantLabel: `${variant.deviceCount} Device / ${variant.durationYears} Year`,
            availableCount: count,
            status: count === 0 ? "OUT_OF_STOCK" : "LOW_STOCK",
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      stats: {
        totalKeys,
        availableKeys,
        soldKeys,
        lowStockAlerts,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get key stats",
    });
  }
};
