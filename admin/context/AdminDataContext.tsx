"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, LicenseKey, Order, Customer, KeyStatus, PaymentStatus, Brand } from "../types";
import { initialProducts, initialKeys, initialOrders, initialCustomers } from "../data/initialData";

export interface SingleKeyInput {
  productId: string;
  variantId: string;
  keyString: string;
  notes?: string;
}

export interface BulkKeyResult {
  added: number;
  duplicates: number;
}

export interface LowStockItem {
  productTitle: string;
  variantLabel: string;
  stock: number;
  productId: string;
  variantId: string;
}

export interface AdminMetrics {
  totalRevenue: number;
  totalOrders: number;
  availableKeys: number;
  soldKeys: number;
  totalProducts: number;
  totalCustomers: number;
  lowStockCount: number;
  lowStockItems: LowStockItem[];
}

export interface AdminDataContextType {
  products: Product[];
  keys: LicenseKey[];
  orders: Order[];
  customers: Customer[];

  // Product Actions
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Key Actions
  addSingleKey: (keyData: SingleKeyInput) => Promise<void>;
  addBulkKeys: (productId: string, variantId: string, rawKeys: string[]) => Promise<BulkKeyResult>;
  deleteKey: (id: string) => Promise<void>;
  updateKeyStatus: (id: string, status: KeyStatus) => Promise<void>;

  // Order Actions
  updateOrderStatus: (orderId: string, status: PaymentStatus) => void;
  resendOrderKey: (orderId: string) => boolean;

  // Utilities
  resetToDefaults: () => void;
  refreshData: () => Promise<void>;

  // Computed / Analytics
  metrics: AdminMetrics;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

const STORAGE_KEY = "antivirus_admin_live_data_v5";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_API_URL ||
  "http://localhost:5000/api";

const ALLOWED_BRANDS: Brand[] = ["Quick Heal", "Kaspersky", "Norton", "McAfee", "Bitdefender"];

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [keys, setKeys] = useState<LicenseKey[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch live data from backend
  const fetchLiveData = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("rapiddefend_admin_token_v1") : null;

      // 1. Fetch public products from backend
      try {
        const prodRes = await fetch(`${API_BASE_URL}/products`);
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData.success && Array.isArray(prodData.products)) {
            setProducts(
              prodData.products.map((p: any) => ({
                ...p,
                id: p._id || p.id,
              }))
            );
          }
        }
      } catch (prodErr) {
        console.warn("Backend products sync skipped:", prodErr);
      }

      // If admin is not logged in, do not spam protected admin endpoints
      if (!token) return;

      const authHeaders: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      // 2. Fetch live customers from backend
      try {
        const custRes = await fetch(`${API_BASE_URL}/admin/customers`, {
          headers: authHeaders,
        });
        if (custRes.ok) {
          const custData = await custRes.json();
          if (custData.success && Array.isArray(custData.customers)) {
            setCustomers(custData.customers);
          }
        }
      } catch (custErr) {
        console.warn("Backend customers sync skipped:", custErr);
      }

      // 3. Fetch live orders from backend
      try {
        const ordRes = await fetch(`${API_BASE_URL}/admin/orders`, {
          headers: authHeaders,
        });
        if (ordRes.ok) {
          const ordData = await ordRes.json();
          if (ordData.success && Array.isArray(ordData.orders)) {
            setOrders(ordData.orders);
          }
        }
      } catch (ordErr) {
        console.warn("Backend orders sync skipped:", ordErr);
      }

      // 4. Fetch live license keys from backend
      try {
        const keyRes = await fetch(`${API_BASE_URL}/admin/keys`, {
          headers: authHeaders,
        });
        if (keyRes.ok) {
          const keyData = await keyRes.json();
          if (keyData.success && Array.isArray(keyData.keys)) {
            setKeys(keyData.keys);
          } else {
            setKeys([]);
          }
        } else {
          setKeys([]);
        }
      } catch (keyErr) {
        console.warn("Backend keys sync skipped:", keyErr);
      }
    } catch (e) {
      console.warn("Backend live sync completed with local fallbacks.", e);
    }
  };

  // Purge legacy demo keys from browser storage and sync
  useEffect(() => {
    try {
      // Remove any previously stored demo mock objects
      const legacyKeys = [
        "rapiddefend_store_live_v1",
        "rapiddefend_admin_data",
        "rapiddefend_admin_data_v2",
        "rapiddefend_keys_v1",
        "rapiddefend_products_v1",
        "rapiddefend_store_live_v2",
      ];
      legacyKeys.forEach((k) => localStorage.removeItem(k));

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.products && Array.isArray(parsed.products)) {
          const validProducts = parsed.products.filter((p: Product) => ALLOWED_BRANDS.includes(p.brand));
          setProducts(validProducts);
        }
        if (parsed.keys && Array.isArray(parsed.keys)) setKeys(parsed.keys);
        if (parsed.orders && Array.isArray(parsed.orders)) setOrders(parsed.orders);
        if (parsed.customers && Array.isArray(parsed.customers)) setCustomers(parsed.customers);
      } else {
        setProducts([]);
        setKeys([]);
        setOrders([]);
        setCustomers([]);
      }
    } catch (e) {
      console.error("Failed to load admin data from storage", e);
    } finally {
      setIsLoaded(true);
      fetchLiveData();
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          products,
          keys,
          orders,
          customers,
        })
      );
    } catch (e) {
      console.error("Failed to save admin data to storage", e);
    }
  }, [products, keys, orders, customers, isLoaded]);

  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("rapiddefend_admin_token_v1");
    return token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : { "Content-Type": "application/json" };
  };

  // Product CRUD
  const addProduct = async (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);

    // Async sync to backend
    try {
      const res = await fetch(`${API_BASE_URL}/admin/products`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.product) {
          setProducts((prev) =>
            prev.map((p) => (p.id === newProduct.id ? { ...data.product, id: data.product._id || data.product.id } : p))
          );
        }
      }
    } catch (e) {
      console.warn("Backend addProduct sync skipped, saved locally.", e);
    }
  };

  const updateProduct = async (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

    // Async sync to backend
    try {
      await fetch(`${API_BASE_URL}/admin/products/${updated.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn("Backend updateProduct sync skipped, updated locally.", e);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    try {
      await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
    } catch (e) {
      console.warn("Backend deleteProduct sync skipped, removed locally.", e);
    }
  };

  // Key Actions
  const addSingleKey = async (data: SingleKeyInput) => {
    const product = products.find((p) => p.id === data.productId);
    const variant = product?.variants.find((v) => v.id === data.variantId);
    const variantLabel = variant ? `${variant.deviceCount} PC / ${variant.durationYears} Year` : "1 PC / 1 Year";

    const newKey: LicenseKey = {
      id: `key-${Date.now()}`,
      keyString: data.keyString,
      productId: data.productId,
      productTitle: product ? product.title : "Unknown Antivirus",
      variantId: data.variantId,
      variantLabel,
      status: "AVAILABLE",
      notes: data.notes,
      createdAt: new Date().toISOString(),
    };

    setKeys((prev) => [newKey, ...prev]);

    // Backend sync
    try {
      await fetch(`${API_BASE_URL}/admin/keys/bulk`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          productId: data.productId,
          variantId: data.variantId,
          rawKeys: [data.keyString],
          keys: [data.keyString],
          notes: data.notes || "",
        }),
      });
      fetchLiveData();
    } catch (e) {
      console.warn("Backend addSingleKey sync skipped, saved locally.", e);
    }
  };

  const addBulkKeys = async (productId: string, variantId: string, rawKeys: string[]): Promise<BulkKeyResult> => {
    const product = products.find((p) => p.id === productId);
    const variant = product?.variants.find((v) => v.id === variantId);
    const variantLabel = variant ? `${variant.deviceCount} PC / ${variant.durationYears} Year` : "1 PC / 1 Year";

    const existingKeyStrings = new Set(keys.map((k) => k.keyString.trim().toUpperCase()));
    let duplicates = 0;
    const validKeys: LicenseKey[] = [];
    const keysToSend: string[] = [];

    for (const raw of rawKeys) {
      const clean = raw.trim().toUpperCase();
      if (!clean) continue;
      if (existingKeyStrings.has(clean)) {
        duplicates++;
        continue;
      }
      existingKeyStrings.add(clean);
      keysToSend.push(clean);
      validKeys.push({
        id: `key-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        keyString: clean,
        productId,
        productTitle: product ? product.title : "Unknown Antivirus",
        variantId,
        variantLabel,
        status: "AVAILABLE",
        createdAt: new Date().toISOString(),
      });
    }

    if (validKeys.length > 0) {
      setKeys((prev) => [...validKeys, ...prev]);
    }

    // Backend sync
    if (keysToSend.length > 0) {
      try {
        await fetch(`${API_BASE_URL}/admin/keys/bulk`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            productId,
            variantId,
            rawKeys: keysToSend,
            keys: keysToSend,
          }),
        });
        fetchLiveData();
      } catch (e) {
        console.warn("Backend bulk keys sync skipped, added to local state.", e);
      }
    }

    return { added: validKeys.length, duplicates };
  };

  const deleteKey = async (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    try {
      await fetch(`${API_BASE_URL}/admin/keys/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
    } catch (e) {
      console.warn("Backend deleteKey sync skipped, deleted locally.", e);
    }
  };

  const updateKeyStatus = async (id: string, status: KeyStatus) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status } : k)));
  };

  // Order Actions
  const updateOrderStatus = (orderId: string, status: PaymentStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o)));
  };

  const resendOrderKey = (orderId: string): boolean => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;
    return true;
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setKeys(initialKeys);
    setOrders(initialOrders);
    setCustomers(initialCustomers);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Compute metrics
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "SUCCESS")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const availableKeys = keys.filter((k) => k.status === "AVAILABLE").length;
  const soldKeys = keys.filter((k) => k.status === "SOLD").length;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = customers.length;

  // Calculate low stock items (threshold: < 3 available keys per variant)
  const lowStockItems: LowStockItem[] = [];
  products.forEach((p) => {
    p.variants.forEach((v) => {
      const stock = keys.filter((k) => k.productId === p.id && k.variantId === v.id && k.status === "AVAILABLE").length;
      if (stock < 3) {
        lowStockItems.push({
          productTitle: p.title,
          variantLabel: `${v.deviceCount} PC / ${v.durationYears} Year`,
          stock,
          productId: p.id,
          variantId: v.id,
        });
      }
    });
  });

  const metrics: AdminMetrics = {
    totalRevenue,
    totalOrders,
    availableKeys,
    soldKeys,
    totalProducts,
    totalCustomers,
    lowStockCount: lowStockItems.length,
    lowStockItems,
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        keys,
        orders,
        customers,
        addProduct,
        updateProduct,
        deleteProduct,
        addSingleKey,
        addBulkKeys,
        deleteKey,
        updateKeyStatus,
        updateOrderStatus,
        resendOrderKey,
        resetToDefaults,
        refreshData: fetchLiveData,
        metrics,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};
