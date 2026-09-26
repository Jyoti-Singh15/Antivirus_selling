import mongoose, { Schema, Document } from "mongoose";

export type KeyStatus = "AVAILABLE" | "SOLD" | "RESERVED";

export interface ILicenseKey extends Document {
  keyString: string;
  productId: mongoose.Types.ObjectId;
  productTitle: string;
  variantId: string;
  variantLabel: string;
  status: KeyStatus;
  orderId?: mongoose.Types.ObjectId;
  orderNumber?: string;
  customerEmail?: string;
  customerName?: string;
  soldAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LicenseKeySchema = new Schema<ILicenseKey>(
  {
    keyString: { type: String, required: true, trim: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    productTitle: { type: String, required: true },
    variantId: { type: String, required: true, index: true },
    variantLabel: { type: String, required: true },
    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD", "RESERVED"],
      default: "AVAILABLE",
      index: true,
    },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", default: null, index: true },
    orderNumber: { type: String, default: null },
    customerEmail: { type: String, default: null, lowercase: true, trim: true, index: true },
    customerName: { type: String, default: null },
    soldAt: { type: Date, default: null },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// High-speed compound index for FIFO license key querying & atomic allocation
LicenseKeySchema.index({ productId: 1, variantId: 1, status: 1, createdAt: 1 });

export const LicenseKey = mongoose.model<ILicenseKey>("LicenseKey", LicenseKeySchema);
