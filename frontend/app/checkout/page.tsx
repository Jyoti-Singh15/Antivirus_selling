"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheckIcon, LockIcon, ZapIcon, KeyIcon } from "@/components/Icons";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, cartTotalMrp, cartTotalSavings, cartCount, createOrder } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || "Rahul Sharma");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "rahul.sharma@gmail.com");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "+91 98765 43210");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm p-8 text-center my-6 max-w-xl mx-auto">
        <h2 className="text-base font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-gray-500 mb-4">Please add an antivirus product before proceeding to checkout.</p>
        <button
          onClick={() => router.push("/products")}
          className="fk-btn-yellow px-4 py-2 rounded-xs text-xs font-bold uppercase"
        >
          Browse Antivirus
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim() || !customerName.trim() || !customerPhone.trim()) {
      alert("Please fill in your delivery name, email, and phone number.");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing & license key allocation
    setTimeout(() => {
      const order = createOrder({
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        paymentMethod: paymentMethod,
      });
      setIsProcessing(false);
      router.push(`/order-success/${order.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto my-4 space-y-4">
      
      {/* Checkout Steps Header */}
      <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900 uppercase tracking-wide">
            Secure Digital Checkout
          </h1>
          <p className="text-xs text-gray-500">
            Digital software keys are dispatched automatically after payment.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#388e3c] font-bold">
          <LockIcon className="w-4 h-4" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* ================= LEFT COLUMN: FORM ================= */}
        <div className="md:col-span-7 space-y-4">
          
          {/* 1. Digital Delivery Details */}
          <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="w-5 h-5 rounded-full bg-[#2874f0] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Digital License Delivery Details
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                  placeholder="e.g. Rajesh Kumar"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Email Address for Key Delivery *
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                  placeholder="name@gmail.com"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  ⚡ Your 20/25-digit activation key & official download links will be sent here.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Mobile Number (for SMS confirmation) *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="w-5 h-5 rounded-full bg-[#2874f0] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Select Payment Mode
              </h2>
            </div>

            <div className="space-y-2 text-xs">
              
              {/* UPI */}
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xs cursor-pointer hover:bg-blue-50/50">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-[#2874f0]"
                />
                <div className="flex-1">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span>⚡ UPI / QR Code (Instant Activation)</span>
                    <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded-xs">
                      FASTEST
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">Google Pay, PhonePe, Paytm, BHIM</p>
                </div>
              </label>

              {/* Cards */}
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xs cursor-pointer hover:bg-blue-50/50">
                <input
                  type="radio"
                  name="payment"
                  value="Cards"
                  checked={paymentMethod === "Cards"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-[#2874f0]"
                />
                <div>
                  <div className="font-bold text-gray-900">Credit / Debit Cards</div>
                  <p className="text-[11px] text-gray-500">Visa, MasterCard, RuPay</p>
                </div>
              </label>

              {/* NetBanking */}
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xs cursor-pointer hover:bg-blue-50/50">
                <input
                  type="radio"
                  name="payment"
                  value="NetBanking"
                  checked={paymentMethod === "NetBanking"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-[#2874f0]"
                />
                <div>
                  <div className="font-bold text-gray-900">Net Banking</div>
                  <p className="text-[11px] text-gray-500">All Indian Banks Supported</p>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: ORDER SUMMARY ================= */}
        <div className="md:col-span-5 space-y-4">
          
          <div className="bg-white border border-gray-200 rounded-sm shadow-xs p-4 space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-2">
              Order Summary ({cartCount} Items)
            </h3>

            <div className="space-y-2 text-xs divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVariant.id}`} className="pt-2 first:pt-0">
                  <p className="font-bold text-gray-900 line-clamp-1">{item.product.title}</p>
                  <div className="flex items-center justify-between text-gray-500 mt-0.5">
                    <span>
                      {item.selectedVariant.durationYears} Year • {item.selectedVariant.deviceCount} PC × {item.quantity}
                    </span>
                    <span className="font-bold text-gray-900">
                      ₹{(item.selectedVariant.sellingPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-dashed border-gray-200 space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>Total MRP:</span>
                <span className="line-through">₹{cartTotalMrp.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#388e3c] font-bold">
                <span>Total Savings:</span>
                <span>- ₹{cartTotalSavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Digital Delivery Fee:</span>
                <span className="text-[#388e3c] font-bold">FREE</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between text-base font-black text-gray-900">
                <span>Amount to Pay:</span>
                <span className="text-[#2874f0]">₹{cartSubtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full fk-btn-orange py-3 rounded-xs uppercase font-black text-sm tracking-wider shadow-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Generating Digital Key...</span>
                </>
              ) : (
                <>
                  <KeyIcon className="w-4 h-4" />
                  <span>Pay ₹{cartSubtotal.toLocaleString()} & Get Key</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-[#388e3c]" />
              <span>100% Genuine Activation Guarantee</span>
            </div>

          </div>

        </div>

      </form>

    </div>
  );
}
