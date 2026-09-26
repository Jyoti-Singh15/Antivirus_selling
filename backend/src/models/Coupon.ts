import mongoose, { Schema, Document } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: "PERCENT" | "FLAT";
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  validUntil: Date;
  usageCount: number;
  usageLimit: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ["PERCENT", "FLAT"], required: true },
    discountValue: { type: Number, required: true, min: 1 },
    minOrderValue: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: null },
    validUntil: { type: Date, required: true },
    usageCount: { type: Number, default: 0 },
    usageLimit: { type: Number, default: 1000 },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const Coupon = mongoose.model<ICoupon>("Coupon", CouponSchema);
