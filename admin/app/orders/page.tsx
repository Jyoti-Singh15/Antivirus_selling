"use client";

import React, { useState, useEffect } from "react";
import { useAdminData } from "../../context/AdminDataContext";
import { OrderDetailModal } from "../../components/OrderDetailModal";
import { Order, PaymentStatus } from "../../types";

export default function OrdersPage() {
  const { orders, refreshData } = useAdminData();
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = selectedStatus === "ALL" || o.paymentStatus === selectedStatus;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.productTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "SUCCESS")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Orders & Fulfillment</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track license key allocations, customer transaction history, and resend digital activation credentials.
          </p>
        </div>
      </div>

      {/* Orders Quick Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Delivered Revenue</div>
          <div className="text-xl font-bold text-slate-900 mt-1">₹{totalRevenue.toLocaleString("en-IN")}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Orders</div>
          <div className="text-xl font-bold text-sky-700 mt-1">{orders.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Avg. Order Value</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">₹{avgOrderValue}</div>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by order #, customer name, email address, or antivirus product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pt-1 border-t border-slate-100">
          <span className="text-slate-400 text-[11px] font-semibold uppercase mr-1">Filter:</span>
          {(["ALL", "SUCCESS", "PENDING", "REFUNDED", "FAILED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                selectedStatus === status
                  ? "bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent"
              }`}
            >
              {status === "ALL" ? "All Orders" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Products & Keys</th>
                <th className="py-3 px-4">Total (₹)</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const firstItem = order.items[0];
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {order.orderNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                        <div className="text-[10px] text-slate-400">
                          {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{order.customerName}</div>
                        <div className="text-[11px] text-sky-700">{order.customerEmail}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 line-clamp-1">{firstItem?.productTitle}</div>
                        <div className="text-[11px] text-slate-500">
                          {order.items.length > 1 ? `+${order.items.length - 1} other item(s)` : `${firstItem?.variant.deviceCount} PC • ${firstItem?.variant.durationYears} Yr`}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">₹{order.totalAmount}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.paymentStatus === "SUCCESS"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : order.paymentStatus === "PENDING"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{order.paymentMethod}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 text-[11px] font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
                        >
                          View Details
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

      {/* Order Detail Modal */}
      <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
}
