import { Request, Response } from "express";
import { Order } from "../models/Order.js";

export const getAdminOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, paymentStatus, page = 1, limit = 50 } = req.query;

    const query: any = {};

    if (paymentStatus && ["SUCCESS", "PENDING", "FAILED", "REFUNDED"].includes(paymentStatus as string)) {
      query.paymentStatus = paymentStatus;
    }

    if (search) {
      const searchStr = (search as string).trim();
      query.$or = [
        { orderNumber: { $regex: searchStr, $options: "i" } },
        { customerEmail: { $regex: searchStr, $options: "i" } },
        { customerName: { $regex: searchStr, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Order.countDocuments(query),
    ]);

    const formattedOrders = orders.map((o) => ({
      ...o,
      id: o._id.toString(),
    }));

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      orders: formattedOrders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
};

export const getAdminOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).lean();

    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
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
