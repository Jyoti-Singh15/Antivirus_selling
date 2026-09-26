"use client";

import React, { useState } from "react";
import { useAdminData } from "../../context/AdminDataContext";
import { BulkKeyModal } from "../../components/BulkKeyModal";
import { KeyStatus } from "../../types";

export default function LicenseKeyVaultPage() {
  const { keys, products, deleteKey, updateKeyStatus, metrics } = useAdminData();
  const [selectedStatus, setSelectedStatus] = useState<KeyStatus | "ALL">("ALL");
  const [selectedProductId, setSelectedProductId] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Filter keys
  const filteredKeys = keys.filter((k) => {
    const matchesStatus = selectedStatus === "ALL" || k.status === selectedStatus;
    const matchesProduct = selectedProductId === "ALL" || k.productId === selectedProductId;
    const matchesSearch =
      k.keyString.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (k.customerEmail && k.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (k.orderId && k.orderId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesProduct && matchesSearch;
  });

  const handleCopy = (keyId: string, keyString: string) => {
    navigator.clipboard.writeText(keyString);
    setCopiedKeyId(keyId);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">License Key Vault & Inventory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Store, audit, and inject digital activation codes for automated real-time customer delivery.
          </p>
        </div>
        <button
          onClick={() => setIsBulkModalOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm shadow-sky-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>🔑</span>
          <span>+ Import License Keys</span>
        </button>
      </div>

      {/* Top Inventory Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Available in Vault</div>
          <div className="text-xl font-bold text-sky-700 mt-1">{metrics.availableKeys}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Delivered / Sold</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">{metrics.soldKeys}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Reserved Keys</div>
          <div className="text-xl font-bold text-amber-600 mt-1">
            {keys.filter((k) => k.status === "RESERVED").length}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Keys Tracked</div>
          <div className="text-xl font-bold text-slate-800 mt-1">{keys.length}</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative md:col-span-2">
            <input
              type="text"
              placeholder="Search by key code, product title, order #, or customer email..."
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

          {/* Product Dropdown Filter */}
          <div>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
            >
              <option value="ALL">All Antivirus Products</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} - {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pt-1 border-t border-slate-100">
          <span className="text-slate-400 text-[11px] font-semibold uppercase mr-1">Status:</span>
          {(["ALL", "AVAILABLE", "SOLD", "RESERVED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                selectedStatus === status
                  ? "bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent"
              }`}
            >
              {status === "ALL" ? "All Keys" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Keys Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold">
                <th className="py-3 px-4">License Key Code</th>
                <th className="py-3 px-4">Product & Variant</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Fulfillment Details</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredKeys.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No license keys found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredKeys.map((key) => (
                  <tr key={key.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Key String */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                          {key.keyString}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(key.id, key.keyString)}
                          className="text-slate-400 hover:text-sky-600 p-1"
                          title="Copy Key"
                        >
                          {copiedKeyId === key.id ? (
                            <span className="text-[10px] font-bold text-emerald-600">✓ Copied</span>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Product & Variant */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 line-clamp-1">{key.productTitle}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-bold text-sky-700">{key.variantLabel}</span>
                        {(() => {
                          const prod = products.find((p) => p.id === key.productId);
                          if (prod && prod.supportedOS) {
                            return (
                              <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                {prod.supportedOS.join(", ")}
                              </span>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          key.status === "AVAILABLE"
                            ? "bg-sky-50 text-sky-700 border border-sky-200"
                            : key.status === "SOLD"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {key.status}
                      </span>
                    </td>

                    {/* Order / Sold Details */}
                    <td className="py-3.5 px-4">
                      {key.status === "SOLD" ? (
                        <div>
                          <div className="font-semibold text-slate-900">{key.customerName || key.customerEmail}</div>
                          <div className="text-[11px] text-slate-400">Order: {key.orderId || "N/A"}</div>
                        </div>
                      ) : key.notes ? (
                        <div className="text-slate-500 italic text-[11px]">{key.notes}</div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Ready in vault for customer</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {key.status !== "SOLD" && (
                          <button
                            onClick={() =>
                              updateKeyStatus(key.id, key.status === "AVAILABLE" ? "RESERVED" : "AVAILABLE")
                            }
                            className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                          >
                            {key.status === "AVAILABLE" ? "Reserve" : "Make Available"}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm("Delete this license key from the vault?")) {
                              deleteKey(key.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Key"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Importer Modal */}
      <BulkKeyModal isOpen={isBulkModalOpen} onClose={() => setIsBulkModalOpen(false)} />
    </div>
  );
}
