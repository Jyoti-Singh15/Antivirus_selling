"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductsContext";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Brand, SecurityCategory, OperatingSystem } from "@/types";
import { SlidersIcon } from "@/components/Icons";

function ProductsContent() {
  const { products } = useProducts();
  const searchParams = useSearchParams();

  const initialBrand = searchParams.get("brand") as Brand | null;
  const initialCategory = searchParams.get("category") as SecurityCategory | null;
  const initialSearch = searchParams.get("search") || "";

  const [selectedBrands, setSelectedBrands] = useState<Brand[]>(
    initialBrand ? [initialBrand] : []
  );
  const [selectedCategories, setSelectedCategories] = useState<SecurityCategory[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
  const [selectedValidities, setSelectedValidities] = useState<number[]>([]);
  const [selectedOS, setSelectedOS] = useState<OperatingSystem[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([300, 3500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<"relevance" | "popularity" | "price_asc" | "price_desc" | "newest">("relevance");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const brand = searchParams.get("brand") as Brand | null;
    if (brand) setSelectedBrands([brand]);
    const cat = searchParams.get("category") as SecurityCategory | null;
    if (cat) setSelectedCategories([cat]);
    const search = searchParams.get("search");
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const handleClearAll = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedDevices([]);
    setSelectedValidities([]);
    setSelectedOS([]);
    setPriceRange([300, 3500]);
    setMinRating(0);
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.title.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.tagline.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Device count filter
      if (selectedDevices.length > 0) {
        const hasDevice = product.variants.some((v) => selectedDevices.includes(v.deviceCount));
        if (!hasDevice) return false;
      }

      // Validity filter
      if (selectedValidities.length > 0) {
        const hasValidity = product.variants.some((v) => selectedValidities.includes(v.durationYears));
        if (!hasValidity) return false;
      }

      // OS filter
      if (selectedOS.length > 0) {
        const hasOS = product.supportedOS.some((os) => selectedOS.includes(os));
        if (!hasOS) return false;
      }

      // Price filter (on default or min variant)
      const minProductPrice = Math.min(...product.variants.map((v) => v.sellingPrice));
      if (minProductPrice < priceRange[0] || minProductPrice > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.variants[0].sellingPrice;
      const priceB = b.variants[0].sellingPrice;

      if (sortBy === "price_asc") return priceA - priceB;
      if (sortBy === "price_desc") return priceB - priceA;
      if (sortBy === "popularity") return b.ratingCount - a.ratingCount;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return 0; // relevance
    });
  }, [
    searchQuery,
    selectedBrands,
    selectedCategories,
    selectedDevices,
    selectedValidities,
    selectedOS,
    priceRange,
    minRating,
    sortBy,
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start">
      
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden w-full bg-white p-3 border border-gray-200 rounded-sm shadow-xs flex items-center justify-between">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase"
        >
          <span className="text-[#2874f0]">⚙️</span>
          <span>{mobileFilterOpen ? "Hide Filters" : "Show Filters & Categories"}</span>
        </button>
        <span className="text-xs text-gray-500">{filteredProducts.length} items found</span>
      </div>

      {/* Left Sidebar Filter Column */}
      <div
        className={`w-full lg:w-64 flex-shrink-0 ${
          mobileFilterOpen ? "block" : "hidden"
        } lg:block`}
      >
        <FilterSidebar
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedDevices={selectedDevices}
          setSelectedDevices={setSelectedDevices}
          selectedValidities={selectedValidities}
          setSelectedValidities={setSelectedValidities}
          selectedOS={selectedOS}
          setSelectedOS={setSelectedOS}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minRating={minRating}
          setMinRating={setMinRating}
          onClearAll={handleClearAll}
        />
      </div>

      {/* Right Column: Sort Bar + Products Grid */}
      <div className="flex-1 w-full space-y-3">
        
        {/* Flipkart Style Sort & Stats Bar */}
        <div className="bg-white border border-gray-200 rounded-sm p-3 shadow-xs">
          
          {/* Breadcrumb / Title */}
          <div className="mb-2.5 pb-2.5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs text-gray-500 font-medium">
                Home &gt; Software &gt; Security &gt; Antivirus
              </span>
              <h1 className="text-sm font-bold text-gray-900 mt-0.5">
                Antivirus & Internet Security Licenses{" "}
                <span className="text-xs font-normal text-gray-500">
                  (Showing 1 – {filteredProducts.length} of {filteredProducts.length} products)
                </span>
              </h1>
            </div>

            {searchQuery && (
              <span className="text-xs bg-blue-50 text-[#2874f0] px-2.5 py-1 rounded-sm border border-blue-100">
                Searching for: <strong>&ldquo;{searchQuery}&rdquo;</strong>
              </span>
            )}
          </div>

          {/* Flipkart Style Sorting Tabs */}
          <div className="flex items-center gap-2 sm:gap-6 text-xs overflow-x-auto no-scrollbar font-medium text-gray-700">
            <span className="font-bold text-gray-900 flex-shrink-0">Sort By</span>
            
            <button
              onClick={() => setSortBy("relevance")}
              className={`pb-1 px-1 transition-all whitespace-nowrap ${
                sortBy === "relevance"
                  ? "text-[#2874f0] font-bold border-b-2 border-[#2874f0]"
                  : "hover:text-black"
              }`}
            >
              Relevance
            </button>

            <button
              onClick={() => setSortBy("popularity")}
              className={`pb-1 px-1 transition-all whitespace-nowrap ${
                sortBy === "popularity"
                  ? "text-[#2874f0] font-bold border-b-2 border-[#2874f0]"
                  : "hover:text-black"
              }`}
            >
              Popularity
            </button>

            <button
              onClick={() => setSortBy("price_asc")}
              className={`pb-1 px-1 transition-all whitespace-nowrap ${
                sortBy === "price_asc"
                  ? "text-[#2874f0] font-bold border-b-2 border-[#2874f0]"
                  : "hover:text-black"
              }`}
            >
              Price -- Low to High
            </button>

            <button
              onClick={() => setSortBy("price_desc")}
              className={`pb-1 px-1 transition-all whitespace-nowrap ${
                sortBy === "price_desc"
                  ? "text-[#2874f0] font-bold border-b-2 border-[#2874f0]"
                  : "hover:text-black"
              }`}
            >
              Price -- High to Low
            </button>

            <button
              onClick={() => setSortBy("newest")}
              className={`pb-1 px-1 transition-all whitespace-nowrap ${
                sortBy === "newest"
                  ? "text-[#2874f0] font-bold border-b-2 border-[#2874f0]"
                  : "hover:text-black"
              }`}
            >
              Newest First
            </button>
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-sm p-12 text-center shadow-xs">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">No Antivirus Products Found</h3>
            <p className="text-xs text-gray-500 mb-4">
              Try removing some filters or search for another brand like Quick Heal or Kaspersky.
            </p>
            <button
              onClick={handleClearAll}
              className="fk-btn-yellow px-4 py-2 rounded-xs text-xs font-bold uppercase"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Loading Antivirus Catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
