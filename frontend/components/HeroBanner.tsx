"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ZapIcon, ShieldCheckIcon, CheckIcon, KeyIcon } from "./Icons";

interface BannerSlide {
  id: number;
  badge: string;
  badgeSub: string;
  title: string;
  subtitle: string;
  offer: string;
  highlight: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  glowColor: string;
  accentBadgeColor: string;
  features: string[];
  visualType: "shield" | "firewall" | "cloud" | "vault";
}

const SLIDES: BannerSlide[] = [
  {
    id: 1,
    badge: "OFFICIAL AUTHORIZED RESELLER",
    badgeSub: "100% Guaranteed Activation",
    title: "MEGA ANTIVIRUS & CYBER DEFENSE SALE",
    subtitle: "Protect your PC, Laptop & Phone against Zero-Day Ransomware, Phishing and Hackers",
    offer: "UP TO 80% OFF",
    highlight: "5-Second Instant Digital License Key Delivery to your Screen & Email",
    ctaText: "EXPLORE TOTAL SECURITY",
    ctaLink: "/products?category=Total+Security",
    bgGradient: "from-[#0a1848] via-[#0e2466] to-[#050b1d]",
    glowColor: "rgba(56, 189, 248, 0.25)",
    accentBadgeColor: "bg-yellow-400 text-gray-950",
    features: ["Instant Key Delivery", "24/7 Activation Support", "Official OEM Links"],
    visualType: "shield",
  },
  {
    id: 2,
    badge: "TOP RATED CYBER DEFENSE",
    badgeSub: "India's #1 Antivirus Suite",
    title: "KASPERSKY & QUICK HEAL TOTAL SECURITY 2026",
    subtitle: "Bank-Grade Safe Money Encryption, Ultra-Fast Cloud VPN & Webcam Spyware Shield",
    offer: "STARTING AT JUST ₹389",
    highlight: "100% Genuine Retail Activation Codes with Official Setup Downloads",
    ctaText: "SHOP KASPERSKY & QUICK HEAL",
    ctaLink: "/products?brand=Kaspersky",
    bgGradient: "from-[#04281f] via-[#063e30] to-[#02140e]",
    glowColor: "rgba(52, 211, 153, 0.25)",
    accentBadgeColor: "bg-emerald-400 text-emerald-950",
    features: ["Ransomware File Shield", "Safe NetBanking", "GoDeep.AI Engine"],
    visualType: "firewall",
  },
  {
    id: 3,
    badge: "MULTI-DEVICE PROTECTION",
    badgeSub: "Windows • macOS • Android • iOS",
    title: "NORTON 360 DELUXE & BITDEFENDER PREMIUM",
    subtitle: "50GB Secure Cloud Backup + Multi-Device Threat Shield for 1, 3, 5 & 10 Devices",
    offer: "FLAT 72% DISCOUNT",
    highlight: "Ranked #1 by Independent Security Labs in 2026 with Zero Slowdown",
    ctaText: "VIEW NORTON & BITDEFENDER",
    ctaLink: "/products?brand=Norton",
    bgGradient: "from-[#351503] via-[#4d1f05] to-[#140601]",
    glowColor: "rgba(251, 146, 60, 0.25)",
    accentBadgeColor: "bg-amber-400 text-amber-950",
    features: ["50GB Cloud Backup", "Unlimited VPN", "Dark Web Monitor"],
    visualType: "cloud",
  },
  {
    id: 4,
    badge: "INSTANT AUTOMATED DISPATCH",
    badgeSub: "Real-Time License Vault",
    title: "INSTANT DIGITAL LICENSE KEY VAULT",
    subtitle: "Get your 25-digit authentic product license key revealed on-screen in under 5 seconds",
    offer: "UP TO 85% OFF",
    highlight: "1-Click Copy, Step-by-Step Installation Guide & 24/7 Activation Support",
    ctaText: "CLAIM INSTANT KEY DEALS",
    ctaLink: "/products",
    bgGradient: "from-[#082038] via-[#0d345a] to-[#030d17]",
    glowColor: "rgba(14, 165, 233, 0.25)",
    accentBadgeColor: "bg-sky-400 text-sky-950",
    features: ["FIFO Key Engine", "On-Screen Reveal", "Permanent Vault Record"],
    visualType: "vault",
  },
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = SLIDES[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div
      className="relative overflow-hidden rounded-xs shadow-md mb-6 border border-gray-200 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`bg-gradient-to-r ${slide.bgGradient} text-white py-8 px-6 sm:px-10 lg:px-14 transition-all duration-700 min-h-[340px] flex flex-col justify-between relative`}
        style={{
          boxShadow: `inset 0 0 120px ${slide.glowColor}`,
        }}
      >
        {/* Top Tag & Guarantee */}
        <div className="flex items-center gap-3 mb-2 flex-wrap z-10">
          <span
            className={`${slide.accentBadgeColor} text-[11px] font-black uppercase px-2.5 py-1 rounded-xs tracking-wider shadow-xs`}
          >
            {slide.badge}
          </span>
          <span className="text-xs text-blue-100 font-medium flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-xs border border-white/15">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
            <span>{slide.badgeSub}</span>
          </span>
        </div>

        {/* Center Grid: Content + Futuristic 3D Cyber Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-8 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-2 uppercase text-white drop-shadow-sm">
              {slide.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 mb-4 font-normal leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Offer Pill */}
            <div className="inline-flex items-center flex-wrap gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xs mb-5">
              <span className="text-yellow-400 font-black text-sm sm:text-base tracking-wide">
                {slide.offer}
              </span>
              <span className="text-white/40 hidden sm:inline">|</span>
              <span className="text-[11px] sm:text-xs text-gray-200 font-medium flex items-center gap-1">
                <span>⚡ {slide.highlight}</span>
              </span>
            </div>

            {/* Features checkmarks */}
            <div className="flex items-center gap-4 text-xs text-blue-100 mb-4 flex-wrap">
              {slide.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckIcon className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Hologram Container */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
            <div className="relative w-64 h-52 bg-white/5 border border-white/15 rounded-xl p-4 backdrop-blur-md flex flex-col justify-between shadow-2xl overflow-hidden">
              {/* Background ambient glow */}
              <div
                className="absolute inset-0 opacity-40 blur-2xl pointer-events-none"
                style={{ backgroundColor: slide.glowColor }}
              ></div>

              {/* Top Security Status */}
              <div className="flex items-center justify-between text-[11px] font-bold z-10">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                  SHIELD ACTIVE
                </span>
                <span className="text-yellow-300 font-mono">100% GENUINE</span>
              </div>

              {/* Center Holographic Graphic */}
              <div className="my-auto text-center z-10 space-y-1">
                {slide.visualType === "shield" && (
                  <div className="space-y-1">
                    <div className="text-4xl animate-bounce">🛡️</div>
                    <div className="text-xs font-bold text-white tracking-wider uppercase">Zero-Day Defense</div>
                    <div className="text-[10px] text-sky-300 font-mono">256-BIT ENCRYPTION</div>
                  </div>
                )}
                {slide.visualType === "firewall" && (
                  <div className="space-y-1">
                    <div className="text-4xl animate-pulse">🔒</div>
                    <div className="text-xs font-bold text-emerald-300 tracking-wider uppercase">Ransomware Blocker</div>
                    <div className="text-[10px] text-emerald-200 font-mono">ACTIVE SCANNER V26.4</div>
                  </div>
                )}
                {slide.visualType === "cloud" && (
                  <div className="space-y-1">
                    <div className="text-4xl animate-bounce">☁️</div>
                    <div className="text-xs font-bold text-amber-300 tracking-wider uppercase">Multi-Device Cloud</div>
                    <div className="text-[10px] text-amber-200 font-mono">WINDOWS • MAC • ANDROID</div>
                  </div>
                )}
                {slide.visualType === "vault" && (
                  <div className="space-y-1">
                    <div className="text-4xl animate-pulse">🔑</div>
                    <div className="text-xs font-bold text-sky-300 tracking-wider uppercase">Instant Key Engine</div>
                    <div className="text-[10px] text-sky-200 font-mono">XXXX-XXXX-XXXX-XXXX</div>
                  </div>
                )}
              </div>

              {/* Bottom Delivery Badge */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-300 z-10">
                <span>Dispatch Speed:</span>
                <span className="text-yellow-400 font-bold font-mono">&lt; 5 Seconds</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Button & Slide Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2 z-10">
          {/* User's Exact Orange CTA Button */}
          <Link
            href={slide.ctaLink}
            className="bg-[#ff9f00] hover:bg-[#e68f00] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3 rounded-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            <ZapIcon className="w-4 h-4 text-white" />
            <span>{slide.ctaText}</span>
          </Link>

          {/* Carousel Arrows & Dot Indicators */}
          <div className="flex items-center gap-3">
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors text-xs"
              aria-label="Previous Slide"
            >
              ❮
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-8 bg-yellow-400" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors text-xs"
              aria-label="Next Slide"
            >
              ❯
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
