import { Request, Response } from "express";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";

export const getAdminCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({ role: "CUSTOMER" }).sort({ createdAt: -1 }).lean();

    const customersWithOrderStats = await Promise.all(
      users.map(async (u) => {
        const orders = await Order.find({
          customerEmail: u.email.toLowerCase(),
          paymentStatus: "SUCCESS",
        }).sort({ createdAt: -1 });

        const totalSpent = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
        const lastOrderDate = orders.length > 0 ? orders[0].createdAt.toISOString() : "";

        return {
          id: u._id.toString(),
          name: u.name,
          email: u.email,
          phone: "",
          totalOrders: orders.length,
          totalSpent,
          lastOrderDate,
          createdAt: u.createdAt.toISOString(),
          status: u.status,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: customersWithOrderStats.length,
      customers: customersWithOrderStats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch customers",
    });
  }
};
