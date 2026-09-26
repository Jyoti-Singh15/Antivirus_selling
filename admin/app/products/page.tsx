"use client";

import React, { useState } from "react";
import { useAdminData } from "../../context/AdminDataContext";
import { ProductModal } from "../../components/ProductModal";
import { BulkKeyModal } from "../../components/BulkKeyModal";
import { Product, Brand } from "../../types";

const BRANDS: (Brand | "ALL")[] = [
  "ALL",
  "Quick Heal",
  "Kaspersky",
  "Norton",
  "McAfee",
  "Bitdefender"
];

export default function ProductsPage() {
  const { products, deleteProduct, keys } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<Brand | "ALL">("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [keyVaultModal, setKeyVaultModal] = useState<{ isOpen: boolean; productId?: string }>({
    isOpen: false
  });

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesBrand = selectedBrand === "ALL" || p.brand === selectedBrand;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const handleEdit = (prod: Product) => {
    setProductToEdit(prod);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Antivirus Product Catalog</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage software titles, specifications, price matrices, and official installer links.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm shadow-sky-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Brand Filter Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search products by brand, title, or keywords..."
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
        </div>

        {/* Brand Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase mr-1">Brands:</span>
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedBrand === brand
                  ? "bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => {
          const totalStock = keys.filter(
            (k) => k.productId === product.id && k.status === "AVAILABLE"
          ).length;
          const minPrice = Math.min(...product.variants.map((v) => v.sellingPrice));
          const maxPrice = Math.max(...product.variants.map((v) => v.sellingPrice));

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col hover:border-sky-200 transition-all group"
            >
              {/* Product Top Header */}
              <div className="p-4 border-b border-slate-100 flex items-start justify-between gap-3 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-xl">🛡️</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 uppercase">
                      {product.brand}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1 mt-1">{product.title}</h3>
                  </div>
                </div>

                {/* Stock Indicator */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    totalStock < 3
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {totalStock} in stock
                </span>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                <div>
                  <p className="text-slate-500 text-[11px] line-clamp-2">{product.tagline}</p>

                  {/* Pricing Range & OS */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400">Price Range</div>
                      <div className="font-bold text-slate-900">
                        ₹{minPrice} - ₹{maxPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Variants</div>
                      <div className="font-semibold text-sky-700">{product.variants.length} Options</div>
                    </div>
                  </div>

                  {/* Supported OS tags */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {product.supportedOS.map((os) => (
                      <span key={os} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {os}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setKeyVaultModal({ isOpen: true, productId: product.id })}
                    className="text-[11px] font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-2.5 py-1.5 rounded-md border border-sky-200 transition-colors flex items-center gap-1"
                  >
                    <span>🔑</span>
                    <span>Vault Keys</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${product.title}?`)) {
                          deleteProduct(product.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Product"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
      />

      <BulkKeyModal
        isOpen={keyVaultModal.isOpen}
        onClose={() => setKeyVaultModal({ isOpen: false })}
        preselectedProductId={keyVaultModal.productId}
      />
    </div>
  );
}
