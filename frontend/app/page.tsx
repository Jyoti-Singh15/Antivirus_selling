"use client";

import React from "react";
import Link from "next/link";
import { TOP_BRANDS } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";
import { HeroBanner } from "@/components/HeroBanner";
import { TrustBar } from "@/components/TrustBar";
import { ProductCard } from "@/components/ProductCard";
import { ChevronRightIcon, ZapIcon, ShieldCheckIcon, KeyIcon } from "@/components/Icons";

export default function HomePage() {
  const { products, hotDeals, bestSellers } = useProducts();

  return (
    <div className="space-y-6">
      
      {/* Hero Carousel */}
      <HeroBanner />

      {/* Trust & Guarantee Strip */}
      <TrustBar />

      {/* Deals of the Day Strip (Only shown when live hot deals exist) */}
      {hotDeals.length > 0 && (
        <section className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                <span className="text-red-500">🔥</span> Deals of the Day
              </h2>
            </div>
            <Link
              href="/products"
              className="fk-btn-yellow px-4 py-1.5 rounded-xs text-xs font-extrabold uppercase flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotDeals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Top Antivirus Brands Banner Grid */}
      <section className="bg-white border border-gray-200 rounded-sm p-4 shadow-xs">
        <h2 className="text-base font-black text-gray-900 tracking-tight mb-4 uppercase text-xs tracking-wider text-gray-600">
          Shop By Official Security Brand
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {TOP_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="border border-gray-200 rounded-xs p-3 flex flex-col items-center justify-center text-center hover:border-[#2874f0] hover:shadow-md transition-all group bg-gray-50/50 hover:bg-white"
            >
              <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                {brand.logo}
              </div>
              <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#2874f0]">
                {brand.name}
              </h3>
              <span className="text-[10px] text-[#388e3c] font-bold mt-0.5">
                {brand.discountText}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers in Total Security */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight">
              Best Sellers in Antivirus & Total Security
            </h2>
            <p className="text-xs text-gray-500">
              Trusted by PC and Laptop users across India & worldwide
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-[#2874f0] hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Explore All</span>
            <ChevronRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <div className="text-sm font-bold text-gray-800">Fresh Store Catalog</div>
              <p className="text-xs text-gray-500 mt-1">
                New antivirus products and digital keys are being added to our catalog.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* How Digital Key Activation Works (3 Steps) */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-sm p-6 sm:p-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="bg-yellow-400 text-gray-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs tracking-wider">
            Super Simple 3-Step Process
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-2">
            How Does Buying Antivirus Online Work?
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            No waiting for physical courier packages. Get activated in less than 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-sm p-5 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-yellow-400 text-gray-950 font-black text-lg flex items-center justify-center mb-3">
              1
            </div>
            <h3 className="text-sm font-bold mb-1">Select & Checkout</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Choose your antivirus validity (1/2/3 Years) & PC count (1/3/5 Devices) and complete payment securely via UPI or Card.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-sm p-5 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-400 text-gray-950 font-black text-lg flex items-center justify-center mb-3">
              2
            </div>
            <h3 className="text-sm font-bold mb-1 flex items-center gap-1.5">
              <KeyIcon className="w-4 h-4 text-emerald-300" />
              <span>Instant Key on Screen</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Your genuine digital activation code is revealed immediately with a 1-click copy button and sent to your email.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-sm p-5 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-400 text-gray-950 font-black text-lg flex items-center justify-center mb-3">
              3
            </div>
            <h3 className="text-sm font-bold mb-1 flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-blue-300" />
              <span>Enter Key & Activate</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Download the official installer from the provided manufacturer link, type your product key, and your PC is 100% protected!
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
