"use client";

import React from "react";

interface RapidDefendLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export const RapidDefendLogo: React.FC<RapidDefendLogoProps> = ({
  variant = "dark",
  size = "md",
  showTagline = true,
  className = "",
}) => {
  const isDark = variant === "dark";

  const emblemSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-base leading-none",
    md: "text-lg leading-none",
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
          className="w-full h-full drop-shadow-xs"
        >
          <defs>
            <linearGradient id="adminGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd166" />
              <stop offset="50%" stopColor="#ffb703" />
              <stop offset="100%" stopColor="#fb8500" />
            </linearGradient>

            <linearGradient id="adminCyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Outer Shield Border (Gold) */}
          <path
            d="M50 8 L85 24 C85 60 50 88 50 88 C50 88 15 60 15 24 L50 8 Z"
            fill="#0f172a"
            stroke="url(#adminGoldGradient)"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Inner Shield (Cyan outline) */}
          <path
            d="M50 18 L76 30 C76 56 50 78 50 78 C50 78 24 56 24 30 L50 18 Z"
            fill="#1e293b"
            stroke="url(#adminCyanGradient)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* High-Voltage Lightning Bolt */}
          <path
            d="M56 12 L30 50 L48 50 L42 86 L72 44 L52 44 L64 12 Z"
            fill="url(#adminGoldGradient)"
            stroke="#ffffff"
            strokeWidth="1.5"
          />

          <circle cx="50" cy="46" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Typography: RAPID + DEFEND */}
      <div className="flex flex-col">
        <div className={`font-black italic tracking-tight uppercase flex items-center ${textSizes[size]}`}>
          <span className="text-sky-600">RAPID</span>
          <span className={`ml-1 ${isDark ? "text-slate-900" : "text-white"}`}>DEFEND</span>
        </div>

        {showTagline && (
          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-100 mt-0.5 inline-block w-fit">
            Admin Suite
          </span>
        )}
      </div>
    </div>
  );
};
