"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheckIcon, KeyIcon } from "@/components/Icons";
import { RapidDefendLogo } from "@/components/RapidDefendLogo";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    const res = await signup(name, email, phone, password);
    setLoading(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setErrorMessage(res.error || "Failed to create account.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 bg-white shadow-xl rounded-sm overflow-hidden flex flex-col md:flex-row border border-gray-200">
      {/* Left Blue Flipkart Banner */}
      <div className="bg-[#2874f0] text-white p-8 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
        <div className="space-y-3 z-10">
          <Link href="/">
            <RapidDefendLogo variant="light" size="lg" showPlus={false} />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-4">Sign Up</h1>
          <p className="text-blue-100 text-xs leading-relaxed">
            Looks like you&apos;re new here! Sign up with your details to get started with instant antivirus key delivery and Plus rewards.
          </p>

          <div className="pt-6 space-y-2.5 text-xs text-blue-100">
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 font-bold">✓</span>
              <span>100% Genuine Retail Activation Keys</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 font-bold">✓</span>
              <span>Instant Digital License Delivery 24x7</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 font-bold">✓</span>
              <span>Free Official Setup Downloads & Guides</span>
            </div>
          </div>
        </div>

        <div className="mt-8 z-10 pt-4 border-t border-blue-400/50 flex items-center gap-2 text-[11px] text-blue-200">
          <KeyIcon className="w-4 h-4 text-yellow-300" />
          <span>India&apos;s #1 Antivirus Superstore</span>
        </div>

        {/* Decorative Circle */}
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-blue-600 rounded-full opacity-60"></div>
      </div>

      {/* Right Signup Form */}
      <div className="p-8 md:w-3/5 flex flex-col justify-between bg-white">
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-1">Create an Account</h2>
          <p className="text-xs text-gray-500 mb-5">
            Fill in your details below to activate your RapidDefend member profile.
          </p>

          {errorMessage && (
            <div className="mb-4 p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xs text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Malhotra"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-xs p-2.5 focus:outline-hidden focus:border-[#2874f0]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-xs p-2.5 focus:outline-hidden focus:border-[#2874f0]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-xs p-2.5 focus:outline-hidden focus:border-[#2874f0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Set Password *</label>
              <input
                type="password"
                required
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-xs p-2.5 focus:outline-hidden focus:border-[#2874f0]"
              />
            </div>

            <p className="text-[11px] text-gray-500 leading-tight">
              By clicking Sign Up, you agree to RapidDefend&apos;s{" "}
              <span className="text-[#2874f0] cursor-pointer">Terms of Use</span> and{" "}
              <span className="text-[#2874f0] cursor-pointer">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full fk-btn-orange py-3 rounded-xs text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              {loading ? "Creating Account..." : "Continue to Sign Up"}
            </button>
          </form>
        </div>

        {/* Bottom Login Switch */}
        <div className="mt-6 text-center pt-4 border-t border-gray-100 text-xs">
          <span className="text-gray-500">Existing User? </span>
          <Link
            href={`/login${redirectPath !== "/" ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
            className="text-[#2874f0] font-bold hover:underline"
          >
            Log in to your account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto my-12 p-8 bg-white text-center text-xs text-gray-500">Loading sign up page...</div>}>
      <SignupForm />
    </Suspense>
  );
}
