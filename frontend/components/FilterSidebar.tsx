"use client";

import React, { useState } from "react";
import { Brand, SecurityCategory, OperatingSystem } from "@/types";
import { ChevronDownIcon, StarIcon } from "./Icons";

interface FilterSidebarProps {
  selectedBrands: Brand[];
  setSelectedBrands: (brands: Brand[]) => void;
  selectedCategories: SecurityCategory[];
  setSelectedCategories: (categories: SecurityCategory[]) => void;
  selectedDevices: number[];
  setSelectedDevices: (devices: number[]) => void;
  selectedValidities: number[];
  setSelectedValidities: (validities: number[]) => void;
  selectedOS: OperatingSystem[];
  setSelectedOS: (os: OperatingSystem[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  onClearAll: () => void;
}

const ALL_BRANDS: Brand[] = [
  "Quick Heal",
  "Kaspersky",
  "Norton",
  "McAfee",
  "Bitdefender",
  "Malwarebytes",
  "ESET",
  "AVG",
  "Avast",
];

const ALL_CATEGORIES: SecurityCategory[] = [
  "Total Security",
  "Internet Security",
  "Antivirus Pro",
  "Mobile Security",
  "Multi-Device",
  "Business / Server",
];

const ALL_DEVICES = [1, 3, 5, 10];
const ALL_VALIDITIES = [1, 2, 3];
const ALL_OS: OperatingSystem[] = ["Windows", "macOS", "Android", "iOS"];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  selectedDevices,
  setSelectedDevices,
  selectedValidities,
  setSelectedValidities,
  selectedOS,
  setSelectedOS,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  onClearAll,
}) => {
  const [brandSearch, setBrandSearch] = useState("");
  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    devices: true,
    validity: true,
    os: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBrandToggle = (brand: Brand) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  const handleCategoryToggle = (category: SecurityCategory) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  const handleDeviceToggle = (device: number) => {
    setSelectedDevices(
      selectedDevices.includes(device)
        ? selectedDevices.filter((d) => d !== device)
        : [...selectedDevices, device]
    );
  };

  const handleValidityToggle = (validity: number) => {
    setSelectedValidities(
      selectedValidities.includes(validity)
        ? selectedValidities.filter((v) => v !== validity)
        : [...selectedValidities, validity]
    );
  };

  const handleOSToggle = (os: OperatingSystem) => {
    setSelectedOS(
      selectedOS.includes(os)
        ? selectedOS.filter((item) => item !== os)
        : [...selectedOS, os]
    );
  };

  const filteredBrands = ALL_BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedDevices.length > 0 ||
    selectedValidities.length > 0 ||
    selectedOS.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000 ||
    minRating > 0;

  return (
    <aside className="w-full bg-white border border-gray-200 rounded-sm shadow-sm divide-y divide-gray-200">
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900 tracking-wide uppercase text-sm">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs font-bold text-[#2874f0] hover:text-[#1c5ecc] uppercase tracking-wider"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="p-3 bg-gray-50 flex flex-wrap gap-1.5">
          {selectedBrands.map((b) => (
            <span
              key={b}
              onClick={() => handleBrandToggle(b)}
              className="inline-flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-100"
            >
              ✕ {b}
            </span>
          ))}
          {selectedCategories.map((c) => (
            <span
              key={c}
              onClick={() => handleCategoryToggle(c)}
              className="inline-flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-100"
            >
              ✕ {c}
            </span>
          ))}
          {selectedDevices.map((d) => (
            <span
              key={d}
              onClick={() => handleDeviceToggle(d)}
              className="inline-flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-100"
            >
              ✕ {d} Device{d > 1 ? "s" : ""}
            </span>
          ))}
          {selectedValidities.map((v) => (
            <span
              key={v}
              onClick={() => handleValidityToggle(v)}
              className="inline-flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-100"
            >
              ✕ {v} Year{v > 1 ? "s" : ""}
            </span>
          ))}
        </div>
      )}

      {/* Price Range Slider */}
      <div className="p-4">
        <div
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between cursor-pointer mb-3"
        >
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Price Range (₹)
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform ${
              openSections.price ? "rotate-180" : ""
            }`}
          />
        </div>

        {openSections.price && (
          <div className="space-y-3">
            <input
              type="range"
              min="300"
              max="3500"
              step="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-[#2874f0] cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs text-gray-700">
              <span className="border border-gray-300 px-2 py-1 rounded-xs bg-gray-50 font-semibold">
                Min: ₹{priceRange[0]}
              </span>
              <span className="text-gray-400">to</span>
              <span className="border border-gray-300 px-2 py-1 rounded-xs bg-gray-50 font-semibold text-[#2874f0]">
                Max: ₹{priceRange[1]}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Categories Accordion */}
      <div className="p-4">
        <div
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between cursor-pointer mb-3"
        >
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Security Category
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform ${
              openSections.categories ? "rotate-180" : ""
            }`}
          />
        </div>

        {openSections.categories && (
          <div className="space-y-2">
            {ALL_CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="rounded-xs text-[#2874f0] focus:ring-[#2874f0] w-3.5 h-3.5"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Selection with search */}
      <div className="p-4">
        <div
          onClick={() => toggleSection("brands")}
          className="flex items-center justify-between cursor-pointer mb-3"
        >
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Brand
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform ${
              openSections.brands ? "rotate-180" : ""
            }`}
          />
        </div>

        {openSections.brands && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search Brand..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-xs px-2 py-1 mb-2 focus:outline-none focus:border-[#2874f0]"
            />
            <div className="max-h-40 overflow-y-auto space-y-2">
              {filteredBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-black"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded-xs text-[#2874f0] focus:ring-[#2874f0] w-3.5 h-3.5"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Number of Devices */}
      <div className="p-4">
        <div
          onClick={() => toggleSection("devices")}
          className="flex items-center justify-between cursor-pointer mb-3"
        >
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Number of Devices
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform ${
              openSections.devices ? "rotate-180" : ""
            }`}
          />
        </div>

        {openSections.devices && (
          <div className="space-y-2">
            {ALL_DEVICES.map((count) => (
              <label
                key={count}
                className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={selectedDevices.includes(count)}
                  onChange={() => handleDeviceToggle(count)}
                  className="rounded-xs text-[#2874f0] focus:ring-[#2874f0] w-3.5 h-3.5"
                />
                <span>{count} Device {count === 1 ? "(1 PC)" : `(${count} PCs)`}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Validity / Duration */}
      <div className="p-4">
        <div
          onClick={() => toggleSection("validity")}
          className="flex items-center justify-between cursor-pointer mb-3"
        >
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            License Validity
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform ${
              openSections.validity ? "rotate-180" : ""
            }`}
          />
        </div>

        {openSections.validity && (
          <div className="space-y-2">
            {ALL_VALIDITIES.map((year) => (
              <label
                key={year}
                className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={selectedValidities.includes(year)}
                  onChange={() => handleValidityToggle(year)}
                  className="rounded-xs text-[#2874f0] focus:ring-[#2874f0] w-3.5 h-3.5"
                />
                <span>{year} Year{year > 1 ? "s" : ""}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Operating System */}
      <div className="p-4">
        <div
          onClick={() => toggleSection("os")}
          className="flex items-center justify-between cursor-pointer mb-3"
        >
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Operating System
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform ${
              openSections.os ? "rotate-180" : ""
            }`}
          />
        </div>

        {openSections.os && (
          <div className="space-y-2">
            {ALL_OS.map((os) => (
              <label
                key={os}
                className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={selectedOS.includes(os)}
                  onChange={() => handleOSToggle(os)}
                  className="rounded-xs text-[#2874f0] focus:ring-[#2874f0] w-3.5 h-3.5"
                />
                <span>{os}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Customer Ratings */}
      <div className="p-4">
        <div
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between cursor-pointer mb-3"
        >
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Customer Ratings
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform ${
              openSections.rating ? "rotate-180" : ""
            }`}
          />
        </div>

        {openSections.rating && (
          <div className="space-y-2">
            {[4, 3].map((r) => (
              <label
                key={r}
                className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-black"
              >
                <input
                  type="radio"
                  name="ratingFilter"
                  checked={minRating === r}
                  onChange={() => setMinRating(minRating === r ? 0 : r)}
                  onClick={() => minRating === r && setMinRating(0)}
                  className="text-[#2874f0] focus:ring-[#2874f0]"
                />
                <span className="flex items-center gap-1 font-semibold">
                  {r} <StarIcon className="w-3.5 h-3.5 text-yellow-400" /> & above
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

    </aside>
  );
};
