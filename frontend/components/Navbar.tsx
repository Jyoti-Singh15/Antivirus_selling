"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { SearchIcon, CartIcon, ShieldCheckIcon, UserIcon, HeartIcon, KeyIcon } from "./Icons";
import { RapidDefendLogo } from "./RapidDefendLogo";
import { useProducts } from "@/context/ProductsContext";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { cartCount, wishlist } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const suggestions = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#2874f0] text-white shadow-md">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex-shrink-0">
            <RapidDefendLogo variant="light" size="md" showPlus={false} />
          </Link>

          {/* Search Bar with live autocomplete */}
          <div className="relative flex-1 max-w-2xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for Quick Heal, Kaspersky, Norton, McAfee, Total Security..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-white text-gray-900 placeholder-gray-500 text-sm rounded-sm py-2 pl-4 pr-10 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3 text-[#2874f0] hover:text-[#1c5ecc] transition-colors flex items-center justify-center"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white text-gray-800 rounded-sm shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="py-1">
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center justify-between px-4 py-2 hover:bg-blue-50 text-sm border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <SearchIcon className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{p.title}</p>
                          <span className="text-xs text-gray-500 font-normal">{p.brand} • {p.category}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#388e3c] text-sm">₹{p.variants[0].sellingPrice}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-5 text-sm font-semibold flex-shrink-0">
            
            {/* Flipkart Iconic Login / Account Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              {isAuthenticated && user ? (
                <div className="flex items-center gap-1.5 cursor-pointer py-1.5 text-white hover:text-yellow-200 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-blue-700 border border-blue-400 flex items-center justify-center text-[11px] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-sm hidden sm:inline">{user.name.split(" ")[0]}</span>
                  <svg className="w-3.5 h-3.5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-white text-[#2874f0] font-bold px-6 py-1.5 rounded-sm hover:bg-gray-100 transition-all shadow-sm block text-center"
                >
                  Login
                </Link>
              )}

              {/* Account Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute right-0 sm:left-0 top-full pt-1.5 w-60 z-50">
                  <div className="bg-white text-gray-800 rounded-xs shadow-2xl border border-gray-200 overflow-hidden text-xs">
                    {!isAuthenticated ? (
                      <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-blue-50/50">
                        <span className="font-bold text-gray-700">New customer?</span>
                        <Link
                          href="/signup"
                          className="font-bold text-[#2874f0] hover:underline"
                        >
                          Sign Up
                        </Link>
                      </div>
                    ) : (
                      <div className="p-3 border-b border-gray-100 bg-blue-50/50">
                        <div className="font-bold text-gray-900">{user?.name}</div>
                        <div className="text-[11px] text-gray-500">{user?.email}</div>
                        <div className="mt-1 text-[10px] font-bold text-yellow-800 bg-yellow-100 border border-yellow-200 inline-block px-1.5 py-0.2 rounded-xs">
                          ✦ RapidDefend Plus Member
                        </div>
                      </div>
                    )}

                    <div className="py-1">
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 font-medium text-gray-700 hover:text-[#2874f0] transition-colors"
                      >
                        <KeyIcon className="w-4 h-4 text-[#2874f0]" />
                        <span>My Orders & License Keys</span>
                      </Link>
                      
                      <Link
                        href="/products"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 font-medium text-gray-700 hover:text-[#2874f0] transition-colors"
                      >
                        <HeartIcon className="w-4 h-4 text-red-500" />
                        <span>Wishlist ({wishlist.length})</span>
                      </Link>

                      <Link
                        href="/products"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 font-medium text-gray-700 hover:text-[#2874f0] transition-colors"
                      >
                        <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                        <span>24x7 Activation Help</span>
                      </Link>

                      {isAuthenticated && (
                        <button
                          type="button"
                          onClick={logout}
                          className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 font-bold border-t border-gray-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Log Out</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* All Products Link */}
            <Link
              href="/products"
              className="hidden md:flex items-center gap-1 hover:text-yellow-200 transition-colors"
            >
              All Antivirus
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-white text-[#2874f0] px-3.5 py-1.5 rounded-sm hover:bg-gray-100 transition-all shadow-sm"
            >
              <div className="relative">
                <CartIcon className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#fb641b] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-bold">Cart</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

