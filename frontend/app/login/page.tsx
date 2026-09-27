"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheckIcon, KeyIcon, LockIcon, CheckIcon } from "@/components/Icons";
import { RapidDefendLogo } from "@/components/RapidDefendLogo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage("Please enter both Email and Password.");
      return;
    }

    setLoading(true);
    const res = await login(identifier, password);
    setLoading(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setErrorMessage(res.error || "Login failed. Please check your credentials.");
    }
  };

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    await login("rahul.sharma@gmail.com", "Security2026!");
    setLoading(false);
    router.push(redirectPath);
  };

  return (
    <div className="max-w-4xl mx-auto my-6 bg-white shadow-xl rounded-sm overflow-hidden flex flex-col md:flex-row border border-gray-200">
      {/* Left Blue Flipkart Banner */}
      <div className="bg-[#2874f0] text-white p-8 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
        <div className="space-y-3 z-10">
          <Link href="/">
            <RapidDefendLogo variant="light" size="lg" showPlus={false} />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-4">Login</h1>
          <p className="text-blue-100 text-xs leading-relaxed">
            Get access to your Orders, 100% Genuine Digital License Keys, Instant Setup Downloads & Exclusive Security Offers.
          </p>

          <div className="pt-6 space-y-2.5 text-xs text-blue-100">
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 font-bold">✓</span>
              <span>Instant Key Reveal in 5 Seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 font-bold">✓</span>
              <span>Official Antivirus Download Links</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 font-bold">✓</span>
              <span>Permanent License Vault in Account</span>
            </div>
          </div>
        </div>

        <div className="mt-8 z-10 pt-4 border-t border-blue-400/50 flex items-center gap-2 text-[11px] text-blue-200">
          <KeyIcon className="w-4 h-4 text-yellow-300" />
          <span>India&apos;s Most Trusted Antivirus Store</span>
        </div>

        {/* Decorative Circle Background */}
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-blue-600 rounded-full opacity-60"></div>
      </div>

      {/* Right Login Form */}
      <div className="p-8 md:w-3/5 flex flex-col justify-between bg-white">
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-1">Customer Sign In</h2>
          <p className="text-xs text-gray-500 mb-5">
            Log in with your registered email address and password.
          </p>

          {errorMessage && (
            <div className="mb-4 p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xs text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Password Flow */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. rahul.sharma@gmail.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-xs p-3 focus:outline-hidden focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-700">Password *</label>
              </div>
              <input
                type="password"
                required
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-xs p-3 focus:outline-hidden focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]"
              />
            </div>

            <p className="text-[11px] text-gray-500 leading-tight">
              By continuing, you agree to RapidDefend&apos;s{" "}
              <span className="text-[#2874f0] cursor-pointer">Terms of Use</span> and{" "}
              <span className="text-[#2874f0] cursor-pointer">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full fk-btn-orange py-3 rounded-xs text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Signing In..." : "Sign In & Continue"}
            </button>
          </form>

          {/* Quick Demo Login Link */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-400 text-[11px]">Testing demo account?</span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-[#2874f0] font-semibold hover:underline text-[11px]"
            >
              ⚡ 1-Click Demo Login
            </button>
          </div>
        </div>

        {/* Bottom Signup Switch */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs">
          <span className="text-gray-500">New to RapidDefend? </span>
          <Link
            href={`/signup?redirect=${encodeURIComponent(redirectPath)}`}
            className="text-[#2874f0] font-bold hover:underline ml-1"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-gray-500">
          Loading authentication form...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
