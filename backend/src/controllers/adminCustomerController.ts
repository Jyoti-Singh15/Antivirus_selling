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
        const customerPhone = (u as any).phone || (orders.length > 0 ? orders[0].customerPhone : "") || "N/A";
        const formattedJoined = u.createdAt ? new Date(u.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
        const formattedLastOrder = orders.length > 0 && orders[0].createdAt ? new Date(orders[0].createdAt).toISOString().split("T")[0] : "No orders yet";

        return {
          id: u._id.toString(),
          name: u.name,
          email: u.email,
          phone: customerPhone,
          totalOrders: orders.length,
          totalSpent,
          lastOrderDate: formattedLastOrder,
          createdAt: formattedJoined,
          status: u.status || "ACTIVE",
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
