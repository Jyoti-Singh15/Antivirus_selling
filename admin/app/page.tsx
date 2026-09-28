"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminData } from "../context/AdminDataContext";
import { BulkKeyModal } from "../components/BulkKeyModal";
import { ProductModal } from "../components/ProductModal";
import { OrderDetailModal } from "../components/OrderDetailModal";
import { Order } from "../types";

export default function DashboardOverview() {
  const { metrics, orders, products, keys, refreshData } = useAdminData();
  const [bulkKeyOpen, setBulkKeyOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  // Group keys by Brand to show stock distribution
  const brandDistribution = [
    { brand: "Kaspersky", color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { brand: "Quick Heal", color: "bg-sky-500", light: "bg-sky-50 text-sky-700 border-sky-200" },
    { brand: "Norton", color: "bg-amber-500", light: "bg-amber-50 text-amber-700 border-amber-200" },
    { brand: "McAfee", color: "bg-rose-500", light: "bg-rose-50 text-rose-700 border-rose-200" },
    { brand: "Bitdefender", color: "bg-indigo-500", light: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ].map((b) => {
    const brandProducts = products.filter((p) => p.brand === b.brand);
    const prodIds = brandProducts.map((p) => p.id);
    const available = keys.filter((k) => prodIds.includes(k.productId) && k.status === "AVAILABLE").length;
    const sold = keys.filter((k) => prodIds.includes(k.productId) && k.status === "SOLD").length;
    return {
      ...b,
      available,
      sold,
      total: available + sold
    };
  });

  return (
    <div className="space-y-6">
      {/* Top Greeting & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Security Commerce Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time digital antivirus inventory, license key fulfillment & revenue metrics.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setBulkKeyOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <span>🔑</span>
            <span>Vault License Keys</span>
          </button>
          <button
            onClick={() => setProductModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm shadow-sky-600/30 transition-all flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Add Antivirus</span>
          </button>
        </div>
      </div>



      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
              ₹
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">₹{metrics.totalRevenue.toLocaleString("en-IN")}</div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 font-semibold">
              <span>● Live Revenue Tracking</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Orders Fulfilled</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{metrics.totalOrders}</div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 font-semibold">
              <span>100% Instant Delivery</span>
            </div>
          </div>
        </div>

        {/* Keys In Vault */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Vault Stock</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-sky-700">{metrics.availableKeys} Keys</div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
              <span>{metrics.soldKeys} keys allocated to date</span>
            </div>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Catalog Products</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{metrics.totalProducts}</div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-sky-600 font-semibold">
              <span>Security Catalog</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Brand Inventory Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-linear-to-r from-sky-50/30 via-white to-transparent">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Customer Orders</h2>
              <p className="text-[11px] text-slate-500">Instant digital key fulfillment log</p>
            </div>
            <Link
              href="/orders"
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold">
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Product & Variant</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                      No customer orders recorded yet. Live orders will appear here automatically.
                    </td>
                  </tr>
                ) : (
                  orders.slice(0, 5).map((order) => {
                    const firstItem = order.items[0];
                    return (
                      <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {order.orderNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{order.customerName}</div>
                          <div className="text-[11px] text-slate-400">{order.customerEmail}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-800 line-clamp-1">{firstItem?.productTitle}</div>
                          <div className="text-[11px] text-sky-700">
                            {firstItem?.variant.deviceCount} PC(s) • {firstItem?.variant.durationYears} Year(s)
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">₹{order.totalAmount}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              order.paymentStatus === "SUCCESS"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-sky-700 hover:bg-sky-50 rounded border border-sky-200 transition-colors"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brand Key Inventory Distribution (1 Column) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Brand Vault Inventory</h2>
                <p className="text-[11px] text-slate-500">Live license allocation health</p>
              </div>
              <Link href="/keys" className="text-xs font-semibold text-sky-600 hover:text-sky-700">
                Key Vault →
              </Link>
            </div>

            <div className="space-y-3.5">
              {brandDistribution.map((item) => (
                <div key={item.brand} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-800">{item.brand}</span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {item.available} Available / {item.sold} Sold
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full ${item.color}`}
                      style={{
                        width: `${item.total > 0 ? (item.available / item.total) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-sky-50 rounded-xl border border-sky-100 text-xs">
            <div className="font-bold text-sky-900 mb-1">⚡ Automated License Allocation</div>
            <p className="text-[11px] text-sky-700">
              When a customer completes payment on the storefront, the FIFO allocation engine locks an available key in &lt;100ms.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BulkKeyModal isOpen={bulkKeyOpen} onClose={() => setBulkKeyOpen(false)} />
      <ProductModal isOpen={productModalOpen} onClose={() => setProductModalOpen(false)} />
      <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
}
