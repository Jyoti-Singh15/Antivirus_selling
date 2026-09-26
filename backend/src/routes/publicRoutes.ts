import { Router } from "express";
import {
  getPublicProducts,
  getPublicProductBySlug,
  getTopDeals,
} from "../controllers/productController.js";
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
} from "../controllers/userAuthController.js";
import {
  validateCoupon,
  processCheckout,
  getOrderById,
} from "../controllers/orderController.js";
import { requireUser, optionalUserAuth } from "../middleware/userAuth.js";

const router = Router();

// ==========================================
// 1. Storefront Products Catalog (Public)
// ==========================================
router.get("/products", getPublicProducts);
router.get("/products/deals/top", getTopDeals);
router.get("/products/:slug", getPublicProductBySlug);

// ==========================================
// 2. Customer Authentication (Email Only - No Phone Number)
// ==========================================
router.post("/auth/register", registerCustomer);
router.post("/auth/login", loginCustomer);
router.get("/auth/me", requireUser as any, getCustomerProfile as any);

// ==========================================
// 3. Coupons (Public)
// ==========================================
router.post("/coupons/validate", validateCoupon);

// ==========================================
// 4. Checkout & Order Fulfillment (Public / Optional User)
// ==========================================
router.post("/orders/checkout", optionalUserAuth as any, processCheckout as any);
router.get("/orders/:id", getOrderById);

export default router;
