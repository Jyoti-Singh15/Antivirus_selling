"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import { PRODUCTS_DATA } from "@/data/products";

interface ProductsContextType {
  products: Product[];
  hotDeals: Product[];
  bestSellers: Product[];
  isLoading: boolean;
  getProductBySlug: (slug: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_API_URL ||
  "http://localhost:5000/api";

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLiveProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          const mappedProducts = data.products.map((p: any) => ({
            ...p,
            id: p._id || p.id,
          }));
          setProducts(mappedProducts);
        }
      }
    } catch (err) {
      console.warn("Backend products fetch skipped, using initial catalog data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveProducts();

    // Auto-sync every 3.5 seconds so newly imported keys and stock are immediately live on the website
    const interval = setInterval(() => {
      fetchLiveProducts();
    }, 3500);

    const onFocus = () => fetchLiveProducts();
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const hotDeals = products.filter((p) => p.isHotDeal);
  const bestSellers = products.filter((p) => p.isBestSeller);

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        hotDeals,
        bestSellers,
        isLoading,
        getProductBySlug,
        refreshProducts: fetchLiveProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
