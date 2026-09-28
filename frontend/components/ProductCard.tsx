"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ZapIcon, ShieldCheckIcon } from "./Icons";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  // Check if any variant has available stock
  const hasAvailableStock = product.variants && product.variants.some(
    (v) => (v.inStock === true) || ((v as any).availableKeysCount > 0)
  );
  const isOutOfStock = !hasAvailableStock;

  const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || !defaultVariant) return;
    addToCart(product, defaultVariant, 1);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group overflow-hidden p-3.5">
      
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-1.5 mb-2">
        <div className="flex items-center gap-1.5">
          {product.isHotDeal && (
            <span className="bg-red-50 text-red-600 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-xs tracking-wider border border-red-200">
              Hot Deal
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-xs tracking-wider border border-amber-200">
              Best Seller
            </span>
          )}
        </div>

        {/* Live Stock Badge */}
        {isOutOfStock ? (
          <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs border border-red-300">
            Sold Out
          </span>
        ) : (
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-xs border border-emerald-200">
            In Stock
          </span>
        )}
      </div>

      <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
        {/* Product Visual Boxshot */}
        <div className="relative w-full h-48 mb-3 bg-gray-50 rounded-xs overflow-hidden flex items-center justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isOutOfStock ? "opacity-60 grayscale-[40%]" : "group-hover:scale-105"
            }`}
          />
          
          {isOutOfStock ? (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-red-600 text-white text-xs font-black px-3.5 py-1 rounded-xs uppercase tracking-wider shadow-lg">
                SOLD OUT
              </span>
            </div>
          ) : (
            <div className="absolute bottom-1 left-1 bg-black/70 backdrop-blur-xs text-white text-[10px] px-1.5 py-0.5 rounded-xs flex items-center gap-1">
              <ZapIcon className="w-3 h-3 text-yellow-400" />
              <span>Instant Digital Key</span>
            </div>
          )}
        </div>

        {/* Brand & Title */}
        <div className="mb-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            {product.brand}
          </span>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-[#2874f0] transition-colors leading-snug">
            {product.title}
          </h3>
        </div>

        {/* Variant Info Pill */}
        <div className="text-[11px] text-gray-500 mb-2 flex items-center gap-2">
          {defaultVariant && (
            <span className="bg-gray-100 px-2 py-0.5 rounded-xs text-gray-700 font-medium">
              {defaultVariant.durationYears} Year • {defaultVariant.deviceCount} PC
            </span>
          )}
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">{product.supportedOS?.join(", ")}</span>
        </div>

        {/* Assured Guarantee Strip */}
        <div className="flex items-center justify-between mb-2">
          {product.isAssured ? (
            <div className="fk-assured-badge">
              <span>Shield</span>Assured
            </div>
          ) : (
            <span className="text-[11px] text-gray-500 font-medium">100% Genuine License</span>
          )}
        </div>

        {/* Pricing Section (Flipkart style) */}
        {defaultVariant && (
          <div className="mt-auto pt-2 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-gray-900">
                ₹{defaultVariant.sellingPrice.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 line-through">
                ₹{defaultVariant.mrp.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-[#388e3c]">
                {defaultVariant.discountPercent}% off
              </span>
            </div>
            <p className="text-[10px] text-[#388e3c] font-semibold mt-0.5 flex items-center gap-1">
              <ShieldCheckIcon className="w-3 h-3 text-[#388e3c]" />
              Official Software License Guarantee
            </p>
          </div>
        )}
      </Link>

      {/* Quick Add to Cart button / Sold Out state */}
      {isOutOfStock ? (
        <button
          disabled
          className="w-full mt-3 bg-gray-200 text-gray-500 text-xs font-bold py-2 rounded-xs cursor-not-allowed shadow-none flex items-center justify-center gap-1 uppercase tracking-wider"
        >
          <span>Sold Out</span>
        </button>
      ) : (
        <button
          onClick={handleQuickAdd}
          className="w-full mt-3 bg-[#ff9f00] hover:bg-[#e68f00] text-white text-xs font-bold py-2 rounded-xs transition-colors shadow-xs flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider"
        >
          <span>Add to Cart</span>
        </button>
      )}

    </div>
  );
};
