"use client";

import React, { useState } from "react";
import { Order, PaymentStatus } from "../types";
import { useAdminData } from "../context/AdminDataContext";

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  const { updateOrderStatus } = useAdminData();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!order) return null;

  const handleCopy = (keyString: string) => {
    navigator.clipboard.writeText(keyString);
    setCopiedKey(keyString);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleResend = () => {
    setToastMessage(`✓ License key email resent to ${order.customerEmail}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-sky-100 max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-5 pr-8">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Order #{order.orderNumber}</h2>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  order.paymentStatus === "SUCCESS"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : order.paymentStatus === "PENDING"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleString("en-IN")} via {order.paymentMethod}
            </p>
          </div>
        </div>

        {toastMessage && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center justify-between">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Customer & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Customer Details</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Name:</span>
                <span className="font-semibold text-slate-800">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="font-medium text-sky-700">{order.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="text-slate-700">{order.customerPhone}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Payment Summary</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal:</span>
                <span className="text-slate-700">₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Discount:</span>
                <span>-₹{order.discount}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-sky-700">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Products & License Keys */}
        <div className="mb-5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Fulfillment & License Key Allocation
          </h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl border border-sky-100 shadow-2xs">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.productTitle}</h4>
                    <p className="text-xs text-slate-500">
                      {item.brand} • {item.variant.deviceCount} Device(s) • {item.variant.durationYears} Year(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">₹{item.pricePerUnit * item.quantity}</div>
                    <div className="text-[11px] text-slate-400">Qty: {item.quantity}</div>
                  </div>
                </div>

                {/* Assigned License Keys */}
                <div className="p-3 bg-sky-50/70 rounded-lg border border-sky-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-sky-800">
                    <span>Delivered Digital License Key(s):</span>
                    <a
                      href={item.officialDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:text-sky-800 underline"
                    >
                      Official Installer Setup ↗
                    </a>
                  </div>
                  {item.licenseKeys && item.licenseKeys.length > 0 ? (
                    item.licenseKeys.map((key, kIdx) => (
                      <div
                        key={kIdx}
                        className="flex items-center justify-between bg-white px-3 py-2 rounded-md border border-sky-200"
                      >
                        <span className="font-mono font-bold text-xs text-slate-800 tracking-wider select-all">
                          {key}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(key)}
                          className="px-2 py-1 text-[11px] font-semibold text-sky-700 hover:bg-sky-50 rounded transition-colors"
                        >
                          {copiedKey === key ? "✓ Copied" : "Copy Key"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-amber-700">No key allocated yet</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Update & Resend Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Change Status:</span>
            <select
              value={order.paymentStatus}
              onChange={(e) => updateOrderStatus(order.id, e.target.value as PaymentStatus)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-md p-1.5 font-medium"
            >
              <option value="SUCCESS">SUCCESS (Paid & Active)</option>
              <option value="PENDING">PENDING (Awaiting Confirmation)</option>
              <option value="REFUNDED">REFUNDED</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResend}
              className="px-3 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Resend Key to Customer</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
