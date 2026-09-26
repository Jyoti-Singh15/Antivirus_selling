import { Request, Response } from "express";
import { Order } from "../models/Order.js";
import { LicenseKey } from "../models/LicenseKey.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalOrdersCount,
      successfulOrders,
      totalKeysCount,
      availableKeysCount,
      soldKeysCount,
      totalProductsCount,
      totalCustomersCount,
      recentOrders,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.find({ paymentStatus: "SUCCESS" }).lean(),
      LicenseKey.countDocuments(),
      LicenseKey.countDocuments({ status: "AVAILABLE" }),
      LicenseKey.countDocuments({ status: "SOLD" }),
      Product.countDocuments(),
      User.countDocuments({ role: "CUSTOMER" }),
      Order.find().sort({ createdAt: -1 }).limit(8).lean(),
    ]);

    const totalRevenue = successfulOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // Calculate low stock alerts
    const products = await Product.find().lean();
    let lowStockCount = 0;

    for (const prod of products) {
      for (const variant of prod.variants) {
        const count = await LicenseKey.countDocuments({
          productId: prod._id,
          variantId: variant.id,
          status: "AVAILABLE",
        });
        if (count < 5) {
          lowStockCount++;
        }
      }
    }

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: totalOrdersCount,
        successfulOrdersCount: successfulOrders.length,
        totalKeys: totalKeysCount,
        availableKeys: availableKeysCount,
        soldKeys: soldKeysCount,
        totalProducts: totalProductsCount,
        totalCustomers: totalCustomersCount,
        lowStockAlertsCount: lowStockCount,
        recentOrders: recentOrders.map((o) => ({
          ...o,
          id: o._id.toString(),
        })),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch dashboard metrics",
    });
  }
};
