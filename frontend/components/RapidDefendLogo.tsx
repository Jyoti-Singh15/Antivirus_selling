"use client";

import React from "react";

interface RapidDefendLogoProps {
  variant?: "light" | "dark"; // "light" for blue/dark backgrounds, "dark" for white backgrounds
  size?: "sm" | "md" | "lg";
  showPlus?: boolean;
  className?: string;
}

export const RapidDefendLogo: React.FC<RapidDefendLogoProps> = ({
  variant = "light",
  size = "md",
  showPlus = false,
  className = "",
}) => {
  const isLight = variant === "light";

  // Size configurations
  const emblemSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-base leading-none",
    md: "text-xl leading-none",
    lg: "text-2xl leading-none",
  };

  return (
    <div className={`flex items-center gap-2 select-none group ${className}`}>
      {/* ⚡ Dynamic Cyber Shield & Lightning Emblem */}
      <div className={`relative ${emblemSizes[size]} shrink-0 transition-transform duration-200 group-hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Gold / Yellow Gradient */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd166" />
              <stop offset="50%" stopColor="#ffb703" />
              <stop offset="100%" stopColor="#fb8500" />
            </linearGradient>

            {/* Electric Cyan Gradient */}
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Inner Glow */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Shield Border (Gold) */}
          <path
            d="M50 8 L85 24 C85 60 50 88 50 88 C50 88 15 60 15 24 L50 8 Z"
            fill="#06122b"
            stroke="url(#goldGradient)"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Inner Shield (Cyan outline) */}
          <path
            d="M50 18 L76 30 C76 56 50 78 50 78 C50 78 24 56 24 30 L50 18 Z"
            fill="#081d45"
            stroke="url(#cyanGradient)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* High-Voltage Lightning Bolt (Cutting through center) */}
          <path
            d="M56 12 L30 50 L48 50 L42 86 L72 44 L52 44 L64 12 Z"
            fill="url(#goldGradient)"
            stroke="#ffffff"
            strokeWidth="1.5"
            filter="url(#glow)"
          />

          {/* Central Highlight Spark */}
          <circle cx="50" cy="46" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Typography: RAPID + DEFEND */}
      <div className="flex flex-col">
        <div className={`font-black italic tracking-tight uppercase flex items-center ${textSizes[size]}`}>
          <span className="text-[#00e5ff] drop-shadow-xs">RAPID</span>
          <span className={`ml-1 ${isLight ? "text-white" : "text-slate-900"}`}>DEFEND</span>
        </div>

        {/* Optional Flipkart Plus Subtitle Tag */}
        {showPlus && (
          <span className="text-[10px] text-gray-200 italic -mt-0.5 flex items-center gap-1 font-medium">
            Explore <span className="text-yellow-300 font-bold">Plus ✦</span>
          </span>
        )}
      </div>
    </div>
  );
};
