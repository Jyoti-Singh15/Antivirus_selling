import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/Product.js";
import { LicenseKey } from "../models/LicenseKey.js";
import { Order } from "../models/Order.js";
import { Coupon } from "../models/Coupon.js";
import { User } from "../models/User.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/antivirus_ecommerce";

const clearAllData = async () => {
  try {
    console.log("[Clean-Up] Connecting to MongoDB to purge all demo data...");
    await mongoose.connect(MONGODB_URI);
    console.log("[Clean-Up] Connected.");

    const p = await Product.deleteMany({});
    const k = await LicenseKey.deleteMany({});
    const o = await Order.deleteMany({});
    const c = await Coupon.deleteMany({});
    // Remove sample user accounts (keep any real ones if needed, or clear all)
    const u = await User.deleteMany({});

    console.log("==================================================");
    console.log("🧹 All Demo & Mock Data Cleared Successfully!");
    console.log(`   Products Deleted:     ${p.deletedCount}`);
    console.log(`   License Keys Deleted: ${k.deletedCount}`);
    console.log(`   Orders Deleted:       ${o.deletedCount}`);
    console.log(`   Coupons Deleted:      ${c.deletedCount}`);
    console.log(`   Users Cleared:        ${u.deletedCount}`);
    console.log("==================================================");
    process.exit(0);
  } catch (err) {
    console.error("[Clean-Up Error] Failed to clear data:", err);
    process.exit(1);
  }
};

clearAllData();
