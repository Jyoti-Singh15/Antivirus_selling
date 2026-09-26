import mongoose, { Schema, Document } from "mongoose";
import { IProductVariant } from "./Product.js";

export type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED" | "REFUNDED";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  productTitle: string;
  productImage: string;
  brand: string;
  variant: IProductVariant;
  quantity: number;
  pricePerUnit: number;
  licenseKeys: string[];
  officialDownloadUrl: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  userId?: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  tax: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productTitle: { type: String, required: true },
    productImage: { type: String, default: "" },
    brand: { type: String, required: true },
    variant: {
      id: { type: String, required: true },
      durationYears: { type: Number, required: true },
      deviceCount: { type: Number, required: true },
      mrp: { type: Number, required: true },
      sellingPrice: { type: Number, required: true },
      discountPercent: { type: Number, required: true },
    },
    quantity: { type: Number, required: true, min: 1 },
    pricePerUnit: { type: Number, required: true },
    licenseKeys: [{ type: String }],
    officialDownloadUrl: { type: String, default: "" },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    couponCode: { type: String, default: null },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "Instant UPI / Cards" },
    paymentStatus: {
      type: String,
      enum: ["SUCCESS", "PENDING", "FAILED", "REFUNDED"],
      default: "SUCCESS",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
