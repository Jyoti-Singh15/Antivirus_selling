"use client";

import React from "react";
import Link from "next/link";
import { TOP_BRANDS } from "@/data/products";

export const CategoryStrip: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-4 sm:gap-6 text-center">
          
          {/* All Antivirus */}
          <Link
            href="/products"
            className="flex flex-col items-center group min-w-[75px] transition-all"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center text-xl mb-1.5 group-hover:bg-[#2874f0] group-hover:text-white group-hover:scale-110 group-hover:shadow-md transition-all duration-200 shadow-2xs">
              🛡️
            </div>
            <span className="text-xs sm:text-[13px] font-extrabold text-gray-950 group-hover:text-[#2874f0] tracking-tight leading-tight">
              All Antivirus
            </span>
            <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded-xs border border-sky-100 mt-0.5">
              Top Deals
            </span>
          </Link>

          {/* Top Brands */}
          {TOP_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="flex flex-col items-center group min-w-[80px] transition-all"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-xl mb-1.5 group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:scale-110 group-hover:shadow-md transition-all duration-200 shadow-2xs">
                {brand.logo}
              </div>
              <span className="text-xs sm:text-[13px] font-extrabold text-gray-950 group-hover:text-[#2874f0] whitespace-nowrap tracking-tight leading-tight">
                {brand.name}
              </span>
              <span className="text-[10px] font-black text-[#2e7d32] bg-emerald-50 px-1.5 py-0.2 rounded-xs border border-emerald-200 mt-0.5 inline-block">
                {brand.discountText}
              </span>
            </Link>
          ))}

          {/* Total Security */}
          <Link
            href="/products?category=Total+Security"
            className="flex flex-col items-center group min-w-[85px] transition-all"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-xl mb-1.5 group-hover:bg-orange-100 group-hover:scale-110 group-hover:shadow-md transition-all duration-200 shadow-2xs">
              🏆
            </div>
            <span className="text-xs sm:text-[13px] font-extrabold text-gray-950 group-hover:text-[#2874f0] whitespace-nowrap tracking-tight leading-tight">
              Total Security
            </span>
            <span className="text-[10px] font-black text-[#c2410c] bg-orange-50 px-1.5 py-0.2 rounded-xs border border-orange-200 mt-0.5 inline-block">
              Best Value
            </span>
          </Link>

          {/* Internet Security */}
          <Link
            href="/products?category=Internet+Security"
            className="flex flex-col items-center group min-w-[95px] transition-all"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-xl mb-1.5 group-hover:bg-teal-100 group-hover:scale-110 group-hover:shadow-md transition-all duration-200 shadow-2xs">
              🌐
            </div>
            <span className="text-xs sm:text-[13px] font-extrabold text-gray-950 group-hover:text-[#2874f0] whitespace-nowrap tracking-tight leading-tight">
              Internet Security
            </span>
            <span className="text-[10px] font-black text-[#2e7d32] bg-emerald-50 px-1.5 py-0.2 rounded-xs border border-emerald-200 mt-0.5 inline-block">
              Web Shield
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};
