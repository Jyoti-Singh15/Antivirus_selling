import { Router } from "express";
import { adminLogin, getAdminMe } from "../controllers/adminAuthController.js";
import {
  getAdminProducts,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminProductController.js";
import {
  getAdminKeys,
  bulkAddKeys,
  deleteKey,
  getKeyStats,
} from "../controllers/adminKeyController.js";
import { getAdminOrders, getAdminOrderById } from "../controllers/adminOrderController.js";
import {
  getAdminCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/adminCouponController.js";
import { getAdminCustomers } from "../controllers/adminCustomerController.js";
import { getDashboardStats } from "../controllers/adminDashboardController.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

// ==========================================
// 1. Admin Authentication (Strictly .env based - NO SIGNUP)
// ==========================================
router.post("/auth/login", adminLogin);
router.get("/auth/me", requireAdmin as any, getAdminMe as any);

// ==========================================
// 2. Dashboard Analytics & Summary
// ==========================================
router.get("/dashboard/stats", requireAdmin as any, getDashboardStats as any);

// ==========================================
// 3. Products Catalog Management (Admin Only)
// ==========================================
router.get("/products", requireAdmin as any, getAdminProducts as any);
router.get("/products/:id", requireAdmin as any, getAdminProductById as any);
router.post("/products", requireAdmin as any, createProduct as any);
router.put("/products/:id", requireAdmin as any, updateProduct as any);
router.delete("/products/:id", requireAdmin as any, deleteProduct as any);

// ==========================================
// 4. Digital License Key Vault (Admin Only)
// ==========================================
router.get("/keys", requireAdmin as any, getAdminKeys as any);
router.get("/keys/stats", requireAdmin as any, getKeyStats as any);
router.post("/keys/bulk", requireAdmin as any, bulkAddKeys as any);
router.delete("/keys/:id", requireAdmin as any, deleteKey as any);

// ==========================================
// 5. Orders Management (Admin Only)
// ==========================================
router.get("/orders", requireAdmin as any, getAdminOrders as any);
router.get("/orders/:id", requireAdmin as any, getAdminOrderById as any);

// ==========================================
// 6. Promotional Coupons (Admin Only)
// ==========================================
router.get("/coupons", requireAdmin as any, getAdminCoupons as any);
router.post("/coupons", requireAdmin as any, createCoupon as any);
router.put("/coupons/:id", requireAdmin as any, updateCoupon as any);
router.delete("/coupons/:id", requireAdmin as any, deleteCoupon as any);

// ==========================================
// 7. Customers Audit (Admin Only)
// ==========================================
router.get("/customers", requireAdmin as any, getAdminCustomers as any);

export default router;
