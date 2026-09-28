"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import {
  StarIcon,
  HeartIcon,
  ShieldCheckIcon,
  ZapIcon,
  CartIcon,
  CheckIcon,
  DownloadIcon,
  KeyIcon,
  TagIcon,
  LaptopIcon,
  ChevronDownIcon,
} from "@/components/Icons";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { products, getProductBySlug } = useProducts();
  const product = getProductBySlug(slug) || products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="bg-white rounded-lg p-12 text-center border border-gray-200 shadow-sm max-w-lg mx-auto my-8">
        <div className="text-4xl mb-3">🛡️</div>
        <h2 className="text-lg font-bold text-gray-900">Product Not Found</h2>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          This antivirus product is currently not listed in our catalog.
        </p>
        <Link
          href="/products"
          className="fk-btn-yellow px-5 py-2.5 rounded-sm text-xs font-bold uppercase inline-flex items-center gap-1.5"
        >
          <span>Browse All Antivirus Products</span>
        </Link>
      </div>
    );
  }

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWished = isInWishlist(product.id);

  // Variant States
  const [selectedDuration, setSelectedDuration] = useState<number>(
    product.variants?.[0]?.durationYears || 1
  );
  const [selectedDevices, setSelectedDevices] = useState<number>(
    product.variants?.[0]?.deviceCount || 1
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"features" | "activation" | "specs">("features");

  // Find active variant matching selected duration & device count
  const activeVariant =
    product.variants.find(
      (v) => v.durationYears === selectedDuration && v.deviceCount === selectedDevices
    ) || product.variants[0];

  const availableDurations = Array.from(
    new Set(product.variants.map((v) => v.durationYears))
  ).sort((a, b) => a - b);

  const availableDeviceCounts = Array.from(
    new Set(product.variants.map((v) => v.deviceCount))
  ).sort((a, b) => a - b);

  const finalPrice = couponApplied
    ? Math.max(activeVariant.sellingPrice - 50, 100)
    : activeVariant.sellingPrice;

  const isVariantOutOfStock = !(activeVariant?.inStock ?? true) || ((activeVariant as any)?.availableKeysCount === 0);

  const handleAddToCart = () => {
    if (isVariantOutOfStock) return;
    addToCart(product, activeVariant, 1);
  };

  const handleBuyNow = () => {
    if (isVariantOutOfStock) return;
    addToCart(product, activeVariant, 1);
    router.push("/checkout");
  };

  return (
    <div className="space-y-4">
      
      {/* Breadcrumb Strip */}
      <nav className="text-xs text-gray-500 py-1 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:underline">Antivirus Software</Link>
        <span>/</span>
        <Link href={`/products?brand=${encodeURIComponent(product.brand)}`} className="hover:underline">
          {product.brand}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-semibold line-clamp-1">{product.title}</span>
      </nav>

      {/* Main Product Container */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-xs p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ================= LEFT COLUMN: IMAGES + STICKY ACTIONS ================= */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Gallery + Main Preview */}
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xs border-2 overflow-hidden flex-shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? "border-[#2874f0] shadow-sm"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${product.title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image Display */}
              <div className="relative flex-1 bg-gray-50 border border-gray-200 rounded-xs overflow-hidden flex items-center justify-center p-4 min-h-[340px]">
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.title}
                  className={`w-full h-80 object-contain transition-transform duration-300 ${
                    isVariantOutOfStock ? "opacity-60 grayscale-[30%]" : "hover:scale-105"
                  }`}
                />

                {isVariantOutOfStock ? (
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="bg-red-600 text-white text-sm font-black px-4 py-1.5 rounded-xs uppercase tracking-wider shadow-xl">
                      SOLD OUT
                    </span>
                  </div>
                ) : (
                  <div className="absolute bottom-3 left-3 bg-black/75 text-white text-xs px-2.5 py-1 rounded-xs flex items-center gap-1.5 backdrop-blur-xs">
                    <ZapIcon className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Instant Electronic License (ESD)</span>
                  </div>
                )}
              </div>

            </div>

            {/* Sticky Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {isVariantOutOfStock ? (
                <button
                  disabled
                  className="col-span-2 bg-gray-200 text-gray-500 py-3.5 px-4 rounded-xs uppercase font-extrabold text-sm flex items-center justify-center gap-2 tracking-wider cursor-not-allowed"
                >
                  <span>Currently Sold Out</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="fk-btn-yellow py-3.5 px-4 rounded-xs uppercase font-extrabold text-sm flex items-center justify-center gap-2 tracking-wider"
                  >
                    <CartIcon className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="fk-btn-orange py-3.5 px-4 rounded-xs uppercase font-extrabold text-sm flex items-center justify-center gap-2 tracking-wider"
                  >
                    <ZapIcon className="w-5 h-5 text-white" />
                    <span>Buy at ₹{finalPrice.toLocaleString()}</span>
                  </button>
                </>
              )}
            </div>

            {/* Instant Delivery Promise Card */}
            <div className="mt-4 bg-blue-50/70 border border-blue-200 rounded-xs p-3 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#2874f0] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <KeyIcon className="w-4 h-4" />
              </div>
              <div className="text-xs text-gray-800">
                <p className="font-bold text-[#1c5ecc]">Instant Digital Delivery Guaranteed</p>
                <p className="text-gray-600 mt-0.5">
                  License key + official manufacturer installer link will be shown immediately on screen & delivered to your email upon payment.
                </p>
              </div>
            </div>

          </div>


          {/* ================= RIGHT COLUMN: PRODUCT DETAILS & VARIANTS ================= */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Header: Title & Brand */}
            <div>
              <div className="flex items-center justify-between">
                <Link
                  href={`/products?brand=${encodeURIComponent(product.brand)}`}
                  className="text-xs font-bold text-[#2874f0] uppercase tracking-wider hover:underline"
                >
                  Visit {product.brand} Store
                </Link>

                {isVariantOutOfStock ? (
                  <span className="bg-red-100 text-red-700 text-xs font-bold uppercase px-2.5 py-0.5 rounded-xs border border-red-300">
                    Sold Out
                  </span>
                ) : (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase px-2 py-0.5 rounded-xs border border-emerald-200">
                    In Stock • Ready to Deliver
                  </span>
                )}
              </div>

              <h1 className="text-lg sm:text-xl font-bold text-gray-900 mt-1 leading-snug">
                {product.title}
              </h1>
              <p className="text-xs text-gray-600 mt-1 font-normal">
                {product.tagline}
              </p>
            </div>

            {/* Guarantee Strip & ShieldAssured */}
            <div className="flex items-center gap-3">
              {product.isAssured && (
                <div className="fk-assured-badge">
                  <span>Shield</span>Assured
                </div>
              )}
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheckIcon className="w-3.5 h-3.5" />
                100% Genuine Retail License Guarantee
              </span>
            </div>

            {/* Special Price Display (Flipkart Style) */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-bold text-[#388e3c]">Special Price</span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-black text-gray-900">
                  ₹{finalPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{activeVariant.mrp.toLocaleString()}
                </span>
                <span className="text-base font-extrabold text-[#388e3c]">
                  {activeVariant.discountPercent}% off
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Inclusive of all taxes • No shipping or packaging charges
              </p>
            </div>

            {/* ================= VARIANT SELECTORS (Flipkart Style) ================= */}
            <div className="bg-gray-50 border border-gray-200 rounded-xs p-4 space-y-4">
              
              {/* Duration Selector */}
              <div>
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wide block mb-2">
                  Select License Validity:
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {availableDurations.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`px-4 py-2 text-xs font-bold rounded-xs border transition-all ${
                        selectedDuration === duration
                          ? "border-[#2874f0] bg-blue-50 text-[#2874f0] shadow-xs"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {duration} Year{duration > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Device Count Selector */}
              <div>
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wide block mb-2">
                  Select Number of Devices / PCs:
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {availableDeviceCounts.map((count) => (
                    <button
                      key={count}
                      onClick={() => setSelectedDevices(count)}
                      className={`px-4 py-2 text-xs font-bold rounded-xs border transition-all ${
                        selectedDevices === count
                          ? "border-[#2874f0] bg-blue-50 text-[#2874f0] shadow-xs"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {count} Device{count > 1 ? "s" : ""} ({count === 1 ? "1 PC" : `${count} PCs`})
                    </button>
                  ))}
                </div>
              </div>

            </div>


            {/* ================= FLIPKART WOW DEAL / OFFERS CONTAINER ================= */}
            <div className="border border-blue-200 bg-blue-50/40 rounded-xs overflow-hidden">
              <div className="bg-[#2874f0] text-white text-xs font-bold px-3 py-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <TagIcon className="w-4 h-4 text-yellow-300" />
                  <span>Available Offers & Coupons</span>
                </span>
                <span className="text-[10px] bg-yellow-400 text-gray-950 px-1.5 py-0.5 rounded-xs font-black">
                  WOW DEAL
                </span>
              </div>

              <div className="p-3 space-y-2 text-xs">
                {/* Bank Offer 1 */}
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xs border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💳</span>
                    <div>
                      <span className="font-bold text-gray-900">Instant Extra ₹50 Off</span>
                      <p className="text-[11px] text-gray-500">Apply coupon code <strong>SECURE50</strong></p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCouponApplied(!couponApplied)}
                    className="text-xs font-bold text-[#2874f0] hover:text-[#1c5ecc] uppercase border border-[#2874f0] px-3 py-1 rounded-xs"
                  >
                    {couponApplied ? "Remove" : "Apply"}
                  </button>
                </div>

                {/* Bank Offer 2 */}
                <div className="flex items-center gap-2 text-gray-700 text-[11px]">
                  <span className="text-green-600 font-bold">● Bank Offer:</span>
                  <span>5% Cashback on Flipkart Axis Bank Card</span>
                </div>
              </div>
            </div>


            {/* ================= INTERACTIVE TABS: FEATURES / ACTIVATION / SPECS ================= */}
            <div className="pt-4 border-t border-gray-200">
              
              {/* Tab navigation */}
              <div className="flex items-center border-b border-gray-200 gap-6 text-xs font-bold">
                <button
                  onClick={() => setActiveTab("features")}
                  className={`pb-2.5 transition-all ${
                    activeTab === "features"
                      ? "text-[#2874f0] border-b-2 border-[#2874f0]"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  Key Protection Features
                </button>

                <button
                  onClick={() => setActiveTab("activation")}
                  className={`pb-2.5 transition-all flex items-center gap-1 ${
                    activeTab === "activation"
                      ? "text-[#2874f0] border-b-2 border-[#2874f0]"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  <KeyIcon className="w-3.5 h-3.5" />
                  <span>How to Activate on Laptop</span>
                </button>

                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-2.5 transition-all ${
                    activeTab === "specs"
                      ? "text-[#2874f0] border-b-2 border-[#2874f0]"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  System Requirements
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-4">
                
                {/* 1. Features */}
                {activeTab === "features" && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {product.keyFeatures.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 bg-gray-50 p-2 rounded-xs border border-gray-100 text-xs text-gray-800"
                        >
                          <CheckIcon className="w-4 h-4 text-[#388e3c] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Activation Guide */}
                {activeTab === "activation" && (
                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-xs p-4 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                      <ShieldCheckIcon className="w-4 h-4 text-emerald-700" />
                      <span>Step-by-Step Activation Guide for Windows & Mac</span>
                    </h4>
                    <ol className="space-y-2.5 text-xs text-gray-800">
                      {product.activationSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="pt-2 flex items-center gap-3">
                      <a
                        href={product.officialDownloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xs transition-colors"
                      >
                        <DownloadIcon className="w-3.5 h-3.5" />
                        <span>Official Manufacturer Download Portal</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* 3. System Requirements */}
                {activeTab === "specs" && (
                  <div className="border border-gray-200 rounded-xs overflow-hidden text-xs">
                    <table className="w-full text-left divide-y divide-gray-200">
                      <tbody className="divide-y divide-gray-100">
                        <tr className="bg-gray-50">
                          <td className="py-2 px-3 font-bold text-gray-700 w-1/3">Operating System</td>
                          <td className="py-2 px-3 text-gray-900">{product.systemRequirements.os}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-bold text-gray-700">Processor</td>
                          <td className="py-2 px-3 text-gray-900">{product.systemRequirements.processor}</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-3 font-bold text-gray-700">RAM Memory</td>
                          <td className="py-2 px-3 text-gray-900">{product.systemRequirements.ram}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-bold text-gray-700">Hard Disk Space</td>
                          <td className="py-2 px-3 text-gray-900">{product.systemRequirements.diskSpace}</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-2 px-3 font-bold text-gray-700">Internet Connection</td>
                          <td className="py-2 px-3 text-gray-900">
                            Required for instant license activation & virus definition updates
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            </div>


            {/* ================= RATINGS & REVIEWS SECTION ================= */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                Ratings & Customer Reviews
              </h3>

              {/* Score Breakdown Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gray-50 p-4 rounded-xs border border-gray-200">
                <div className="text-center sm:border-r border-gray-200 sm:pr-6">
                  <div className="text-4xl font-black text-gray-900 flex items-center justify-center gap-1">
                    <span>{product.rating}</span>
                    <StarIcon className="w-6 h-6 text-[#388e3c]" fill="#388e3c" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-semibold">
                    {product.ratingCount.toLocaleString()} Ratings &amp; <br />
                    {product.reviewCount.toLocaleString()} Reviews
                  </p>
                </div>

                <div className="flex-1 w-full space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 font-semibold">5 ★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#388e3c] w-[82%]"></div>
                    </div>
                    <span className="text-gray-500 w-10 text-right">82%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 font-semibold">4 ★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#388e3c] w-[12%]"></div>
                    </div>
                    <span className="text-gray-500 w-10 text-right">12%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 font-semibold">3 ★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 w-[4%]"></div>
                    </div>
                    <span className="text-gray-500 w-10 text-right">4%</span>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="divide-y divide-gray-100 mt-4">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="py-3 text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="rating-pill-green text-[10px]">
                        <span>{rev.rating}</span>
                        <StarIcon className="w-2.5 h-2.5" fill="white" />
                      </div>
                      <span className="font-bold text-gray-900">{rev.title}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{rev.comment}</p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 pt-1">
                      <span className="font-bold text-gray-800">{rev.userName}</span>
                      <span>• {rev.date}</span>
                      {rev.verifiedBuyer && (
                        <span className="text-[#388e3c] font-bold flex items-center gap-0.5">
                          ✓ Certified Buyer
                        </span>
                      )}
                      <span>• 👍 {rev.likes} helpful</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
