"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  KeyIcon,
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "@/components/Icons";

export default function MyOrdersPage() {
  const { orders } = useCart();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto my-4 space-y-4">
      
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <KeyIcon className="w-5 h-5 text-[#2874f0]" />
            <span>My Orders & Digital License Keys</span>
          </h1>
          <p className="text-xs text-gray-500">
            View your purchased antivirus activation codes, validity, and official download links.
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs font-bold text-[#2874f0] hover:underline"
        >
          + Buy New Antivirus
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-sm p-12 text-center shadow-xs">
          <div className="text-4xl mb-3">🔑</div>
          <h2 className="text-base font-bold text-gray-900 mb-1">No Orders Found Yet</h2>
          <p className="text-xs text-gray-500 mb-6">
            When you purchase an antivirus license, your keys and activation instructions will appear here.
          </p>
          <Link
            href="/products"
            className="fk-btn-yellow px-6 py-2.5 rounded-xs text-xs font-bold uppercase inline-block"
          >
            Explore Deals & Buy Antivirus
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden"
            >
              {/* Order Top Bar */}
              <div className="bg-gray-50 p-3.5 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Order Placed</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Total Amount</span>
                    <span className="font-bold text-gray-900">₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Delivered To</span>
                    <span className="text-gray-900 font-medium">{order.customerEmail}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Order ID: <strong>{order.orderNumber}</strong></span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                    FULFILLED
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-4 divide-y divide-gray-100 space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="pt-4 first:pt-0 space-y-3">
                    
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gray-50 border border-gray-200 rounded-xs p-1 flex items-center justify-center flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.productImage}
                            alt={item.productTitle}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                            {item.brand} • {item.variant.durationYears} Year • {item.variant.deviceCount} PC
                          </span>
                          <h3 className="text-xs font-bold text-gray-900">{item.productTitle}</h3>
                          <span className="text-xs text-[#388e3c] font-semibold">
                            ₹{item.pricePerUnit.toLocaleString()} × {item.quantity} Qty
                          </span>
                        </div>
                      </div>

                      <a
                        href={item.officialDownloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2874f0] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xs border border-blue-200 transition-colors"
                      >
                        <DownloadIcon className="w-3.5 h-3.5" />
                        <span>Download Setup</span>
                      </a>
                    </div>

                    {/* License Keys List */}
                    <div className="bg-blue-50/50 border border-blue-200 rounded-xs p-3 space-y-2">
                      <div className="text-[11px] font-bold text-gray-700 uppercase flex items-center gap-1">
                        <ZapIcon className="w-3.5 h-3.5 text-[#2874f0]" />
                        <span>Digital Activation License Code(s):</span>
                      </div>

                      {item.licenseKeys.map((k, kIdx) => (
                        <div
                          key={kIdx}
                          className="flex items-center justify-between bg-white border border-gray-200 px-3 py-2 rounded-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-gray-400 font-bold">#{kIdx + 1}</span>
                            <span className="font-mono text-xs sm:text-sm font-black text-gray-900 tracking-wider">
                              {k}
                            </span>
                          </div>

                          <button
                            onClick={() => handleCopyKey(k)}
                            className={`px-3 py-1 rounded-xs text-xs font-bold uppercase transition-all flex items-center gap-1 ${
                              copiedKey === k
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {copiedKey === k ? (
                              <>
                                <CheckIcon className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <CopyIcon className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
