"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminData } from "../context/AdminDataContext";
import { RapidDefendLogo } from "./RapidDefendLogo";

export const AdminShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { metrics, resetToDefaults } = useAdminData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActionMenu, setShowQuickActionMenu] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: "Products Catalog",
      href: "/products",
      badge: metrics.totalProducts,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      name: "License Key Vault",
      href: "/keys",
      badge: metrics.availableKeys,
      badgeColor: metrics.availableKeys < 5 ? "bg-amber-100 text-amber-800" : "bg-sky-100 text-sky-800",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      )
    },
    {
      name: "Orders & Fulfillment",
      href: "/orders",
      badge: metrics.totalOrders,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      name: "Customers",
      href: "/customers",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-slate-200 shadow-sm shrink-0">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100 bg-linear-to-r from-sky-50/50 via-white to-sky-50/30">
          <Link href="/">
            <RapidDefendLogo variant="dark" size="sm" showTagline={true} />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Store Management
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-sky-50 text-sky-700 shadow-xs border border-sky-200/70"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? "text-sky-600" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      item.badgeColor || (isActive ? "bg-sky-200/80 text-sky-800" : "bg-slate-100 text-slate-600")
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Vault Live Status Box */}
        <div className="p-4 m-3 bg-linear-to-b from-sky-50 to-blue-50/50 rounded-xl border border-sky-100/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700">Digital Key Vault</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white p-2 rounded-lg border border-sky-100 shadow-2xs">
              <div className="text-sky-600 font-bold text-sm">{metrics.availableKeys}</div>
              <div className="text-slate-500 text-[10px]">In Stock</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-sky-100 shadow-2xs">
              <div className="text-emerald-600 font-bold text-sm">{metrics.soldKeys}</div>
              <div className="text-slate-500 text-[10px]">Delivered</div>
            </div>
          </div>
          {metrics.lowStockCount > 0 && (
            <Link
              href="/keys"
              className="mt-2.5 block text-center text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 p-1.5 rounded-md border border-amber-200 transition-colors"
            >
              ⚠️ {metrics.lowStockCount} Low Stock Alert{metrics.lowStockCount > 1 ? "s" : ""}
            </Link>
          )}
        </div>

        {/* User Footer & Reset */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 font-bold text-xs">
              AD
            </div>
            <div className="text-xs">
              <div className="font-semibold text-slate-800">Admin User</div>
              <div className="text-slate-400 text-[11px]">admin@rapiddefend.in</div>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm("Reset all store products and keys to initial defaults?")) {
                resetToDefaults();
              }
            }}
            title="Reset Mock Store Data"
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <header className="md:hidden h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30">
        <Link href="/">
          <RapidDefendLogo variant="dark" size="sm" showTagline={false} />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-1 shadow-lg z-20">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                  isActive ? "bg-sky-50 text-sky-700 font-semibold" : "text-slate-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Online Fulfillment Engine</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-700 font-semibold">Store Status: Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Link to Storefront */}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-2 rounded-lg border border-sky-200 transition-colors"
            >
              <span>View Storefront</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Low stock notifications button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative transition-colors"
                title="Notifications"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {metrics.lowStockCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
                  <div className="font-semibold text-slate-800 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Stock & System Alerts</span>
                    <span className="text-[10px] text-slate-400">{metrics.lowStockCount} alert(s)</span>
                  </div>
                  <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                    {metrics.lowStockItems.length === 0 ? (
                      <div className="text-center py-4 text-slate-400">All license key inventories are healthy! 🎉</div>
                    ) : (
                      metrics.lowStockItems.map((item, idx) => (
                        <div key={idx} className="p-2 bg-amber-50 rounded-lg border border-amber-200/80 flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold text-amber-900">{item.productTitle}</div>
                            <div className="text-amber-700 text-[11px]">{item.variantLabel}</div>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded">
                            {item.stock} left
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-center">
                    <Link
                      href="/keys"
                      onClick={() => setShowNotifications(false)}
                      className="text-sky-600 hover:text-sky-700 font-semibold block"
                    >
                      Go to Key Vault →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Add Button */}
            <div className="relative">
              <button
                onClick={() => setShowQuickActionMenu(!showQuickActionMenu)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-sm shadow-sky-600/20 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Quick Actions</span>
              </button>

              {showQuickActionMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  <Link
                    href="/keys"
                    onClick={() => setShowQuickActionMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-sky-50 text-slate-700 hover:text-sky-700"
                  >
                    <span>🔑</span>
                    <span>Import License Keys</span>
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setShowQuickActionMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-sky-50 text-slate-700 hover:text-sky-700"
                  >
                    <span>📦</span>
                    <span>Create New Product</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
