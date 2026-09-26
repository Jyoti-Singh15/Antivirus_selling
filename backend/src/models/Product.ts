import mongoose, { Schema, Document } from "mongoose";

export interface IProductVariant {
  id: string;
  durationYears: number;
  deviceCount: number;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  inStock?: boolean;
  isDefault?: boolean;
}

export interface ISystemRequirements {
  os: string;
  processor: string;
  ram: string;
  diskSpace: string;
  internetConnection: boolean;
}

export interface IProduct extends Document {
  slug: string;
  title: string;
  brand: string;
  category: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  images: string[];
  supportedOS: string[];
  variants: IProductVariant[];
  systemRequirements: ISystemRequirements;
  officialDownloadUrl: string;
  rating: number;
  ratingCount: number;
  reviewCount: number;
  isAssured: boolean;
  isHotDeal: boolean;
  isBestSeller: boolean;
  activationSteps: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariantSchema = new Schema<IProductVariant>(
  {
    id: { type: String, required: true },
    durationYears: { type: Number, required: true },
    deviceCount: { type: Number, required: true },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discountPercent: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const SystemRequirementsSchema = new Schema<ISystemRequirements>(
  {
    os: { type: String, default: "Windows 11 / 10 / 8.1" },
    processor: { type: String, default: "1 GHz or faster" },
    ram: { type: String, default: "2 GB minimum" },
    diskSpace: { type: String, default: "1.5 GB free space" },
    internetConnection: { type: Boolean, default: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    brand: {
      type: String,
      required: true,
      index: true,
      enum: [
        "Quick Heal",
        "Kaspersky",
        "Norton",
        "McAfee",
        "Bitdefender",
        "Malwarebytes",
        "AVG",
        "Avast",
        "ESET",
      ],
    },
    category: {
      type: String,
      required: true,
      index: true,
      enum: [
        "Total Security",
        "Internet Security",
        "Antivirus Pro",
        "Mobile Security",
        "Multi-Device",
        "Business / Server",
      ],
    },
    tagline: { type: String, default: "" },
    description: { type: String, required: true },
    keyFeatures: [{ type: String }],
    images: [{ type: String }],
    supportedOS: [{ type: String, enum: ["Windows", "macOS", "Android", "iOS"] }],
    variants: [ProductVariantSchema],
    systemRequirements: { type: SystemRequirementsSchema, default: () => ({}) },
    officialDownloadUrl: { type: String, default: "https://www.quickheal.co.in/installer" },
    rating: { type: Number, default: 4.8, min: 1, max: 5 },
    ratingCount: { type: Number, default: 120 },
    reviewCount: { type: Number, default: 35 },
    isAssured: { type: Boolean, default: true },
    isHotDeal: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    activationSteps: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Search indexes for title, brand, description
ProductSchema.index({ title: "text", tagline: "text", description: "text" });

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
