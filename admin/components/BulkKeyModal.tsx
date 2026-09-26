"use client";

import React, { useState, useEffect } from "react";
import { useAdminData } from "../context/AdminDataContext";

interface BulkKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProductId?: string;
  preselectedVariantId?: string;
}

export const BulkKeyModal: React.FC<BulkKeyModalProps> = ({
  isOpen,
  onClose,
  preselectedProductId,
  preselectedVariantId
}) => {
  const { products, keys, addBulkKeys, addSingleKey } = useAdminData();
  const [selectedProductId, setSelectedProductId] = useState<string>(preselectedProductId || products[0]?.id || "");
  const [selectedVariantId, setSelectedVariantId] = useState<string>(preselectedVariantId || "");
  const [mode, setMode] = useState<"bulk" | "single">("bulk");
  const [rawKeysText, setRawKeysText] = useState("");
  const [singleKeyText, setSingleKeyText] = useState("");
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Sync selected IDs if props change or modal opens
  useEffect(() => {
    if (preselectedProductId) {
      setSelectedProductId(preselectedProductId);
    } else if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }
  }, [preselectedProductId, isOpen, products]);

  useEffect(() => {
    if (preselectedVariantId) {
      setSelectedVariantId(preselectedVariantId);
    }
  }, [preselectedVariantId, isOpen]);

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const variants = currentProduct?.variants || [];
  const currentVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];
  const currentVariantId = currentVariant?.id || "";

  // Available keys count for selected product & variant
  const availableCount = keys.filter(
    (k) => k.productId === currentProduct?.id && k.variantId === currentVariantId && k.status === "AVAILABLE"
  ).length;

  // Parse keys in bulk mode for live preview
  const parsedKeys = rawKeysText
    .split(/[\n,]+/)
    .map((k) => k.trim())
    .filter((k) => k.length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!selectedProductId || !currentVariantId) {
      setFeedback({ msg: "Please choose both a product and variant.", type: "error" });
      return;
    }

    if (mode === "single") {
      if (!singleKeyText.trim()) {
        setFeedback({ msg: "Please enter a valid license key string.", type: "error" });
        return;
      }
      addSingleKey({
        productId: selectedProductId,
        variantId: currentVariantId,
        keyString: singleKeyText.trim(),
        notes: notes.trim()
      });
      setSingleKeyText("");
      setNotes("");
      setFeedback({ msg: "License key successfully vaulted! 🛡️", type: "success" });
      setTimeout(() => {
        onClose();
        setFeedback(null);
      }, 1200);
    } else {
      if (parsedKeys.length === 0) {
        setFeedback({ msg: "Please paste at least one valid key string.", type: "error" });
        return;
      }
      const result = addBulkKeys(selectedProductId, currentVariantId, parsedKeys);
      setRawKeysText("");
      setFeedback({
        msg: `Successfully imported ${result.added} keys! ${result.duplicates > 0 ? `(${result.duplicates} duplicates skipped)` : ""}`,
        type: "success"
      });
      setTimeout(() => {
        onClose();
        setFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-sky-100 max-w-xl w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Vault Digital License Keys</h2>
            <p className="text-xs text-slate-500">Inject single or bulk activation codes into fulfillment inventory.</p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-lg mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode("bulk")}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              mode === "bulk" ? "bg-white text-sky-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📋 Bulk Import (Paste Multiple)
          </button>
          <button
            type="button"
            onClick={() => setMode("single")}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              mode === "single" ? "bg-white text-sky-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🔑 Single Key Entry
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Target Product & Variant Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Antivirus Product</label>
              <select
                value={selectedProductId}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  const prod = products.find((p) => p.id === e.target.value);
                  if (prod && prod.variants.length > 0) {
                    setSelectedVariantId(prod.variants[0].id);
                  }
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.brand} - {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target License Variant</label>
              <select
                value={currentVariantId}
                onChange={(e) => setSelectedVariantId(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
              >
                {variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.deviceCount} PC{v.deviceCount > 1 ? "s" : ""} / {v.durationYears} Year{v.durationYears > 1 ? "s" : ""} (₹{v.sellingPrice})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ⚡ Fetched Product Details Strip (Supported OS, Official Download Link, Stock) */}
          {currentProduct && (
            <div className="bg-sky-50/80 rounded-xl p-3 border border-sky-100 text-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                {/* Supported OS Badges */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-600">Supported OS:</span>
                  <div className="flex flex-wrap gap-1">
                    {currentProduct.supportedOS?.map((os) => (
                      <span
                        key={os}
                        className="bg-white px-2 py-0.5 rounded-md text-[10px] font-bold text-sky-700 border border-sky-200 shadow-2xs"
                      >
                        ✓ {os}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stock Indicator */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-[11px] text-slate-500">Current Stock:</span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold ${
                      availableCount > 0
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {availableCount} Available Keys
                  </span>
                </div>
              </div>

              {/* Official Download URL */}
              <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate pt-1 border-t border-sky-100/60">
                <span className="font-semibold text-slate-600">Official Setup:</span>
                <span className="text-sky-700 font-mono truncate">{currentProduct.officialDownloadUrl}</span>
              </div>
            </div>
          )}

          {/* Mode Inputs */}
          {mode === "bulk" ? (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Paste License Keys (One per line or comma separated)
                </label>
                <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                  {parsedKeys.length} Keys Detected
                </span>
              </div>
              <textarea
                rows={5}
                value={rawKeysText}
                onChange={(e) => setRawKeysText(e.target.value)}
                placeholder={`Example:
${currentProduct?.brand.toUpperCase().slice(0, 4) || "KEY"}-2026-XXXX-YYYY-1234
${currentProduct?.brand.toUpperCase().slice(0, 4) || "KEY"}-2026-AAAA-BBBB-5678
${currentProduct?.brand.toUpperCase().slice(0, 4) || "KEY"}-2026-CCCC-DDDD-9012`}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
              ></textarea>
              <p className="text-[11px] text-slate-400 mt-1">
                Tip: Duplicate keys already inside the vault are automatically filtered out during insertion.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">License Key Code</label>
                <input
                  type="text"
                  value={singleKeyText}
                  onChange={(e) => setSingleKeyText(e.target.value)}
                  placeholder={`e.g. ${currentProduct?.brand.toUpperCase().slice(0, 4) || "KEY"}-2026-9988-7766-5544`}
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800 uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Optional Notes / Batch Tag</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Purchased from official distributor Batch #409"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                />
              </div>
            </div>
          )}

          {/* Feedback message */}
          {feedback && (
            <div
              className={`p-2.5 rounded-lg text-xs font-medium ${
                feedback.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {feedback.msg}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm shadow-sky-600/30 transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>{mode === "bulk" ? `Inject ${parsedKeys.length || 0} Keys` : "Save License Key"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
