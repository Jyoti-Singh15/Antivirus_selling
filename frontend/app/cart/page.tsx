"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShieldCheckIcon, ZapIcon, LockIcon } from "@/components/Icons";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotalMrp,
    cartTotalSavings,
    cartCount,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm p-12 text-center shadow-xs my-6 max-w-2xl mx-auto">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Your Cart is Empty!</h2>
        <p className="text-xs text-gray-500 mb-6">
          Explore our wide range of genuine antivirus licenses and get instant protection today.
        </p>
        <Link
          href="/products"
          className="fk-btn-yellow px-6 py-2.5 rounded-xs text-xs font-extrabold uppercase tracking-wider inline-block"
        >
          Shop Antivirus Software
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start my-2">
      
      {/* ================= LEFT COLUMN: CART ITEMS ================= */}
      <div className="lg:col-span-8 bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            My Cart ({cartCount} {cartCount === 1 ? "Item" : "Items"})
          </h1>
          <span className="text-xs text-[#388e3c] font-bold flex items-center gap-1">
            <ZapIcon className="w-3.5 h-3.5" />
            <span>Instant Digital Delivery</span>
          </span>
        </div>

        {/* Cart Item Rows */}
        <div className="divide-y divide-gray-200">
          {cart.map((item) => {
            const itemPrice = item.selectedVariant.sellingPrice * item.quantity;
            const itemMrp = item.selectedVariant.mrp * item.quantity;

            return (
              <div key={`${item.product.id}-${item.selectedVariant.id}`} className="p-4 flex flex-col sm:flex-row gap-4">
                
                {/* Product Thumbnail */}
                <div className="w-24 h-24 bg-gray-50 rounded-xs border border-gray-200 p-1 flex-shrink-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-sm font-semibold text-gray-900 hover:text-[#2874f0] line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                        Delivery: <strong className="text-[#388e3c]">Instant (5 Sec)</strong>
                      </span>
                    </div>

                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                      <span className="bg-gray-100 px-2 py-0.5 rounded-xs font-semibold text-gray-700">
                        Validity: {item.selectedVariant.durationYears} Year{item.selectedVariant.durationYears > 1 ? "s" : ""}
                      </span>
                      <span>•</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded-xs font-semibold text-gray-700">
                        Devices: {item.selectedVariant.deviceCount} PC{item.selectedVariant.deviceCount > 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 mt-0.5">
                      Brand: <strong className="text-gray-700">{item.product.brand}</strong>
                    </div>
                  </div>

                  {/* Price Row + Quantity Controls */}
                  <div className="flex items-center justify-between flex-wrap gap-3 mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-gray-900">
                        ₹{itemPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{itemMrp.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-[#388e3c]">
                        {item.selectedVariant.discountPercent}% Off
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant.id)}
                        className="text-xs font-bold text-gray-700 hover:text-red-600 uppercase tracking-wide"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Bar with Place Order button */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/products"
            className="text-xs font-bold text-[#2874f0] hover:underline"
          >
            ← Add More Antivirus Software
          </Link>

          <button
            onClick={() => router.push("/checkout")}
            className="fk-btn-orange px-8 py-3 rounded-xs uppercase font-black text-sm tracking-wider shadow-sm"
          >
            Place Order
          </button>
        </div>

      </div>


      {/* ================= RIGHT COLUMN: FLIPKART PRICE DETAILS SIDEBAR ================= */}
      <div className="lg:col-span-4 space-y-3">
        
        <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
          
          {/* Header */}
          <div className="p-3.5 border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Price Details
            </h2>
          </div>

          {/* Breakdown */}
          <div className="p-4 space-y-3 text-xs text-gray-800">
            
            <div className="flex items-center justify-between">
              <span>Price ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
              <span>₹{cartTotalMrp.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-[#388e3c]">
              <span>Discount</span>
              <span>- ₹{cartTotalSavings.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Delivery Charges</span>
              <span className="text-[#388e3c] font-bold">FREE (Digital Delivery)</span>
            </div>

            <div className="pt-3 border-t border-dashed border-gray-200 flex items-center justify-between text-sm font-black text-gray-900">
              <span>Total Amount</span>
              <span className="text-lg">₹{cartSubtotal.toLocaleString()}</span>
            </div>

            {/* Savings Banner */}
            <div className="pt-2 text-xs text-[#388e3c] font-bold">
              You will save ₹{cartTotalSavings.toLocaleString()} on this order 🎉
            </div>

          </div>

        </div>

        {/* Safe & Secure Tag */}
        <div className="p-3 bg-gray-100/80 border border-gray-200 rounded-xs flex items-center gap-2.5 text-xs text-gray-600">
          <ShieldCheckIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <span>Safe and Secure Payments. 100% Authentic Digital License Keys Guaranteed.</span>
        </div>

      </div>

    </div>
  );
}
