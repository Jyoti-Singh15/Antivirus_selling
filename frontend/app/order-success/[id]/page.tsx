"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  KeyIcon,
  ShieldCheckIcon,
  LaptopIcon,
  ZapIcon,
} from "@/components/Icons";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const { getOrderById } = useCart();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const order = getOrderById(orderId);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  if (!order) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm p-12 text-center my-6 max-w-xl mx-auto shadow-xs">
        <div className="text-4xl mb-3">📦</div>
        <h2 className="text-base font-bold text-gray-900 mb-2">Order Initializing</h2>
        <p className="text-xs text-gray-500 mb-6">
          If you just placed an order, you can review your digital license keys in your orders dashboard.
        </p>
        <Link
          href="/account/orders"
          className="fk-btn-yellow px-6 py-2.5 rounded-xs text-xs font-bold uppercase inline-block"
        >
          Go to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-4 space-y-4">
      
      {/* ================= SUCCESS BANNER ================= */}
      <div className="bg-emerald-600 text-white p-6 rounded-sm shadow-md flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-14 h-14 rounded-full bg-white text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-inner">
          <CheckIcon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <h1 className="text-xl font-black">Payment Confirmed & License Key Allocated!</h1>
            <span className="bg-yellow-400 text-gray-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
              Instant Fulfillment
            </span>
          </div>
          <p className="text-xs text-emerald-100 mt-1">
            Order #{order.orderNumber} • Key sent to: <strong>{order.customerEmail}</strong>
          </p>
        </div>
        <Link
          href="/account/orders"
          className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-xs border border-white/40 transition-colors"
        >
          View in My Orders
        </Link>
      </div>


      {/* ================= DIGITAL LICENSE KEYS VAULT CARDS ================= */}
      <div className="space-y-4">
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-blue-200 rounded-sm shadow-xs p-5 space-y-4"
          >
            {/* Item Title & Brand */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xs p-1 flex items-center justify-center flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.productImage}
                    alt={item.productTitle}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                    {item.brand} • {item.variant.durationYears} Year Validity • {item.variant.deviceCount} PC
                  </span>
                  <h2 className="text-sm font-bold text-gray-900">{item.productTitle}</h2>
                </div>
              </div>

              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-sm border border-emerald-200 flex items-center gap-1">
                <ZapIcon className="w-3.5 h-3.5" />
                <span>Active Digital License</span>
              </span>
            </div>

            {/* Generated License Keys Box */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                <KeyIcon className="w-4 h-4 text-[#2874f0]" />
                <span>Your Official Activation License Key(s):</span>
              </label>

              {item.licenseKeys.map((key, kIdx) => (
                <div
                  key={kIdx}
                  className="flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 p-3.5 rounded-xs"
                >
                  <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                    <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded-xs border border-gray-200">
                      Key #{kIdx + 1}
                    </span>
                    <span className="font-mono text-base sm:text-lg font-black text-gray-900 tracking-wider select-all">
                      {key}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyKey(key)}
                    className={`w-full sm:w-auto px-4 py-2 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      copiedKey === key
                        ? "bg-emerald-600 text-white"
                        : "bg-[#2874f0] text-white hover:bg-[#1c5ecc] shadow-xs"
                    }`}
                  >
                    {copiedKey === key ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-4 h-4" />
                        <span>Copy Key</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Official Software Installer Download Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 p-3 rounded-xs border border-gray-200">
              <div className="text-xs text-gray-700">
                <p className="font-bold text-gray-900">Official Software Installer:</p>
                <p className="text-gray-500 text-[11px]">
                  Direct download from verified {item.brand} servers (Virus-Free, Official Release)
                </p>
              </div>

              <a
                href={item.officialDownloadUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ff9f00] hover:bg-[#e68f00] text-white text-xs font-black px-4 py-2.5 rounded-xs transition-colors uppercase tracking-wide shadow-xs"
              >
                <DownloadIcon className="w-4 h-4" />
                <span>Download {item.brand} Setup</span>
              </a>
            </div>

          </div>
        ))}
      </div>


      {/* ================= STEP-BY-STEP LAPTOP ACTIVATION INSTRUCTIONS ================= */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-xs p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
          <LaptopIcon className="w-5 h-5 text-[#2874f0]" />
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            How to Activate This License Code on Your Laptop / PC
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          <div className="border border-gray-200 rounded-xs p-3.5 bg-gray-50 flex flex-col">
            <span className="w-6 h-6 rounded-full bg-[#2874f0] text-white font-bold flex items-center justify-center text-xs mb-2">
              1
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Download Installer</h4>
            <p className="text-gray-600 leading-relaxed">
              Click the orange &ldquo;Download Setup&rdquo; button above to download the official software installer file.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xs p-3.5 bg-gray-50 flex flex-col">
            <span className="w-6 h-6 rounded-full bg-[#2874f0] text-white font-bold flex items-center justify-center text-xs mb-2">
              2
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Run Installation</h4>
            <p className="text-gray-600 leading-relaxed">
              Double click the downloaded file on your computer and follow standard installation prompts.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xs p-3.5 bg-gray-50 flex flex-col">
            <span className="w-6 h-6 rounded-full bg-[#2874f0] text-white font-bold flex items-center justify-center text-xs mb-2">
              3
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Enter License Key</h4>
            <p className="text-gray-600 leading-relaxed">
              When the program opens, click &ldquo;Activate / Register&rdquo; and paste your copied product key into the field.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xs p-3.5 bg-emerald-50 border-emerald-200 flex flex-col">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2">
              4
            </span>
            <h4 className="font-bold text-emerald-950 mb-1">PC is Protected!</h4>
            <p className="text-emerald-800 leading-relaxed">
              Your license duration (1/2/3 Years) starts now. Automatic virus definition updates are activated.
            </p>
          </div>

        </div>

        {/* Support Help box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xs p-3 text-xs text-gray-700 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4 text-[#2874f0]" />
            <span>Need help activating on your laptop? Our 24/7 technical team is here to assist you.</span>
          </div>
          <span className="font-bold text-[#2874f0]">Helpline: 1800-200-SAFE</span>
        </div>
      </div>


      {/* Back to Home Button */}
      <div className="text-center pt-2">
        <Link
          href="/"
          className="fk-btn-yellow px-6 py-2.5 rounded-xs text-xs font-bold uppercase inline-block"
        >
          Return to RapidDefend Home
        </Link>
      </div>

    </div>
  );
}
