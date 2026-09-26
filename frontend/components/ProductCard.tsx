"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { StarIcon, HeartIcon, ZapIcon, ShieldCheckIcon } from "./Icons";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useCart();
  const isWished = isInWishlist(product.id);

  const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultVariant, 1);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group overflow-hidden p-3.5">
      
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute right-3 top-3 z-20 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
        title="Add to Wishlist"
      >
        <HeartIcon className="w-5 h-5" filled={isWished} />
      </button>

      {/* Top Badges */}
      <div className="flex items-center gap-1.5 mb-2">
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

      <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
        {/* Product Visual Boxshot */}
        <div className="relative w-full h-48 mb-3 bg-gray-50 rounded-xs overflow-hidden flex items-center justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-1 left-1 bg-black/70 backdrop-blur-xs text-white text-[10px] px-1.5 py-0.5 rounded-xs flex items-center gap-1">
            <ZapIcon className="w-3 h-3 text-yellow-400" />
            <span>Instant Digital Key</span>
          </div>
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
          <span className="bg-gray-100 px-2 py-0.5 rounded-xs text-gray-700 font-medium">
            {defaultVariant.durationYears} Year • {defaultVariant.deviceCount} PC
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">{product.supportedOS.join(", ")}</span>
        </div>

        {/* Assured Badge & Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="rating-pill-green">
            <span>{product.rating}</span>
            <StarIcon className="w-3 h-3" fill="white" />
          </div>
          <span className="text-xs text-gray-500 font-normal">
            ({product.ratingCount.toLocaleString()})
          </span>
          
          {product.isAssured && (
            <div className="fk-assured-badge ml-auto">
              <span>Shield</span>Assured
            </div>
          )}
        </div>

        {/* Pricing Section (Flipkart style) */}
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
      </Link>

      {/* Quick Add to Cart button */}
      <button
        onClick={handleQuickAdd}
        className="w-full mt-3 bg-[#ff9f00] hover:bg-[#e68f00] text-white text-xs font-bold py-2 rounded-xs transition-colors shadow-xs flex items-center justify-center gap-1"
      >
        <span>Add to Cart</span>
      </button>

    </div>
  );
};
