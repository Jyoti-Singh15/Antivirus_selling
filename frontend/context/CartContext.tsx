"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product, ProductVariant, Order } from "@/types";

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // product ids
  orders: Order[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  cartTotalMrp: number;
  cartTotalSavings: number;
  createOrder: (customerDetails: { name: string; email: string; phone: string; paymentMethod: string }) => Order;
  getOrderById: (orderId: string) => Order | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function generateLicenseKey(brand: string): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const prefix = brand.substring(0, 3).toUpperCase();
  return `${prefix}-${part(4)}-${part(4)}-${part(4)}-${part(4)}`;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("fk_antivirus_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("fk_antivirus_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem("fk_antivirus_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.error("Failed loading from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fk_antivirus_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed saving cart", e);
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fk_antivirus_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed saving wishlist", e);
    }
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fk_antivirus_orders", JSON.stringify(orders));
    } catch (e) {
      console.error("Failed saving orders", e);
    }
  }, [orders, isLoaded]);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.id === variant.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedVariant: variant, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedVariant.id === variantId)));
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedVariant.id === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.selectedVariant.sellingPrice * item.quantity, 0);
  const cartTotalMrp = cart.reduce((acc, item) => acc + item.selectedVariant.mrp * item.quantity, 0);
  const cartTotalSavings = cartTotalMrp - cartSubtotal;

  const createOrder = (customerDetails: { name: string; email: string; phone: string; paymentMethod: string }): Order => {
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: orderId,
      orderNumber: "FK-" + Math.floor(10000000 + Math.random() * 90000000),
      createdAt: new Date().toISOString(),
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      customerPhone: customerDetails.phone,
      paymentMethod: customerDetails.paymentMethod,
      paymentStatus: "SUCCESS",
      items: cart.map((item) => {
        const keys: string[] = [];
        for (let i = 0; i < item.quantity; i++) {
          keys.push(generateLicenseKey(item.product.brand));
        }
        return {
          productId: item.product.id,
          productTitle: item.product.title,
          productImage: item.product.images[0],
          brand: item.product.brand,
          variant: item.selectedVariant,
          quantity: item.quantity,
          pricePerUnit: item.selectedVariant.sellingPrice,
          licenseKeys: keys,
          officialDownloadUrl: item.product.officialDownloadUrl,
        };
      }),
      subtotal: cartSubtotal,
      discount: cartTotalSavings,
      tax: 0,
      totalAmount: cartSubtotal,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartSubtotal,
        cartTotalMrp,
        cartTotalSavings,
        createOrder,
        getOrderById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
