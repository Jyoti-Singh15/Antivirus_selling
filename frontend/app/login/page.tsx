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

  const { login, loginWithOtp } = useAuth();

  const [authMode, setAuthMode] = useState<"PASSWORD" | "OTP">("OTP");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!identifier.trim()) {
      setErrorMessage("Please enter your registered Email or Mobile Number.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      setOtp("123456"); // Pre-fill mock OTP for easy demonstration
    }, 600);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const res = await loginWithOtp(identifier, otp);
    setLoading(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setErrorMessage(res.error || "Failed to verify OTP.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const res = await login(identifier, password);
    setLoading(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setErrorMessage(res.error || "Login failed. Please check credentials.");
    }
  };

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    await login("rahul.sharma@gmail.com");
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
            Get access to your Orders, 100% Genuine Digital License Keys, Instant Setup Downloads & Exclusive Bank Offers.
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
          {/* Mode Switch Tabs */}
          <div className="flex border-b border-gray-200 mb-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthMode("OTP");
                setOtpSent(false);
                setErrorMessage(null);
              }}
              className={`pb-2.5 px-4 transition-all ${
                authMode === "OTP"
                  ? "border-b-2 border-[#2874f0] text-[#2874f0]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              📱 Mobile / Email OTP
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("PASSWORD");
                setErrorMessage(null);
              }}
              className={`pb-2.5 px-4 transition-all ${
                authMode === "PASSWORD"
                  ? "border-b-2 border-[#2874f0] text-[#2874f0]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              🔒 Password Login
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xs text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* OTP Flow */}
          {authMode === "OTP" && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleRequestOtp} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Enter Email / Mobile Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. rahul.sharma@gmail.com or 9876543210"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
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
                    {loading ? "Sending OTP..." : "Request OTP"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xs text-xs text-blue-900">
                    <div>
                      OTP sent to <strong>{identifier}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] text-[#2874f0] font-bold mt-1 hover:underline block"
                    >
                      Change Mobile / Email
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-700">Enter 6-digit OTP</label>
                      <span className="text-[11px] text-emerald-600 font-bold">Auto-filled demo code</span>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full text-center tracking-widest font-mono text-base font-bold border border-gray-300 rounded-xs p-2.5 focus:outline-hidden focus:border-[#2874f0]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full fk-btn-orange py-3 rounded-xs text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Password Flow */}
          {authMode === "PASSWORD" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email / Mobile Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. rahul.sharma@gmail.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-xs p-3 focus:outline-hidden focus:border-[#2874f0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-xs p-3 focus:outline-hidden focus:border-[#2874f0]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full fk-btn-orange py-3 rounded-xs text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* Quick Demo 1-Click Login Button */}
          <div className="mt-5 pt-4 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full text-xs font-bold text-[#2874f0] bg-blue-50 hover:bg-blue-100 border border-blue-200 py-2.5 rounded-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>⚡ 1-Click Instant Demo Login (Rahul Sharma)</span>
            </button>
          </div>
        </div>

        {/* Bottom Signup Switch */}
        <div className="mt-8 text-center pt-4 border-t border-gray-100 text-xs">
          <span className="text-gray-500">New to RapidDefend? </span>
          <Link
            href={`/signup${redirectPath !== "/" ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
            className="text-[#2874f0] font-bold hover:underline"
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
    <Suspense fallback={<div className="max-w-4xl mx-auto my-12 p-8 bg-white text-center text-xs text-gray-500">Loading sign in page...</div>}>
      <LoginForm />
    </Suspense>
  );
}
