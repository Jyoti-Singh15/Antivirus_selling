"use client";

import React, { useState, useEffect } from "react";
import { useAdminData } from "../context/AdminDataContext";
import { Product, ProductVariant, Brand, SecurityCategory, OperatingSystem } from "../types";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const BRANDS: Brand[] = [
  "Quick Heal",
  "Kaspersky",
  "Norton",
  "McAfee",
  "Bitdefender"
];

const CATEGORIES: SecurityCategory[] = [
  "Total Security",
  "Internet Security",
  "Antivirus Pro",
  "Mobile Security",
  "Multi-Device",
  "Business / Server"
];

// Verified official data preset for each company
export const BRAND_PRESETS: Record<
  Brand,
  {
    title: string;
    category: SecurityCategory;
    tagline: string;
    description: string;
    officialDownloadUrl: string;
    imageUrl: string;
    supportedOS: OperatingSystem[];
    keyFeatures: string[];
    activationSteps: string[];
    systemRequirements: {
      os: string;
      processor: string;
      ram: string;
      diskSpace: string;
      internetConnection: boolean;
    };
    defaultVariants: ProductVariant[];
  }
> = {
  "Quick Heal": {
    title: "Quick Heal Total Security 2026",
    category: "Total Security",
    tagline: "India's #1 Most Trusted Cyber Protection with AI Threat Shield",
    description:
      "Quick Heal Total Security provides robust multi-layered protection against complex ransomware, malicious malware, phishing attacks, and online financial fraud. Features automated data backup, parental safety control, and zero-day threat prevention.",
    officialDownloadUrl: "https://www.quickheal.co.in/installer",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    supportedOS: ["Windows", "macOS", "Android"],
    keyFeatures: [
      "Ransomware Protection with Auto Data Backup",
      "Safe Banking & Secure Online Payments",
      "Parental Control & Web Content Filtering",
      "Advanced Wi-Fi Network & Camera Shield",
      "Track Your PC & Anti-Theft Protection"
    ],
    activationSteps: [
      "Download Quick Heal Setup from official link: https://www.quickheal.co.in/installer",
      "Run the installer and follow on-screen instructions.",
      "When prompted, enter your 20-character product key.",
      "Register with your email to activate uninterrupted protection."
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1 (32 & 64 bit), macOS 11+, Android 8.0+",
      processor: "1.4 GHz or higher",
      ram: "2 GB RAM (4 GB recommended)",
      diskSpace: "2.3 GB free disk space",
      internetConnection: true
    },
    defaultVariants: [
      { id: "qh-1pc-1yr", durationYears: 1, deviceCount: 1, mrp: 1899, sellingPrice: 849, discountPercent: 55, inStock: true, isDefault: true },
      { id: "qh-1pc-3yr", durationYears: 3, deviceCount: 1, mrp: 3499, sellingPrice: 1549, discountPercent: 56, inStock: true },
      { id: "qh-3pc-1yr", durationYears: 1, deviceCount: 3, mrp: 3299, sellingPrice: 1399, discountPercent: 58, inStock: true }
    ]
  },
  "Kaspersky": {
    title: "Kaspersky Plus Internet & Privacy Security",
    category: "Internet Security",
    tagline: "Next-Gen Cybersecurity with Unlimited Fast VPN & Password Manager",
    description:
      "Kaspersky Plus combines state-of-the-art cyber protection against crypto-lockers, trojans, and phishing with privacy tools including high-speed unlimited VPN, data leak checker, and secure payment sandbox.",
    officialDownloadUrl: "https://www.kaspersky.com/downloads",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    keyFeatures: [
      "Real-time Antivirus & Anti-Ransomware Shield",
      "Ultra-fast Unlimited VPN Included",
      "Hardened Browser for Safe Money Transactions",
      "Smart Data Leak & Password Compromise Monitor",
      "Performance Optimizer & HDD Health Checker"
    ],
    activationSteps: [
      "Download official installer from Kaspersky (https://www.kaspersky.com/downloads).",
      "Launch setup and sign in or create your My Kaspersky account.",
      "Input your 20-digit activation code.",
      "Protection is activated across all your selected devices."
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1, macOS 11+, Android 8+, iOS 15+",
      processor: "1 GHz x86 or x64",
      ram: "2 GB RAM",
      diskSpace: "2.7 GB available disk space",
      internetConnection: true
    },
    defaultVariants: [
      { id: "ks-1pc-1yr", durationYears: 1, deviceCount: 1, mrp: 1999, sellingPrice: 899, discountPercent: 55, inStock: true, isDefault: true },
      { id: "ks-3pc-1yr", durationYears: 1, deviceCount: 3, mrp: 3499, sellingPrice: 1499, discountPercent: 57, inStock: true },
      { id: "ks-5pc-2yr", durationYears: 2, deviceCount: 5, mrp: 6499, sellingPrice: 2899, discountPercent: 55, inStock: true }
    ]
  },
  "Norton": {
    title: "Norton 360 Deluxe Multi-Device Protection",
    category: "Total Security",
    tagline: "Comprehensive Multi-Layered Protection with 50GB Cloud Backup & Secure VPN",
    description:
      "Norton 360 Deluxe gives you robust defense for PCs, Macs, smartphones and tablets. Includes Secure VPN, Dark Web Monitoring, Password Manager, and 50 GB PC Cloud Backup.",
    officialDownloadUrl: "https://norton.com/setup",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    keyFeatures: [
      "50 GB Secure PC Cloud Storage Backup",
      "No-Log Secure VPN for All Devices",
      "Dark Web Monitoring Powered by LifeLock",
      "Smart Firewall for PC & Mac",
      "Parental Control & School Time Management"
    ],
    activationSteps: [
      "Go to https://norton.com/setup in your browser.",
      "Sign in or create a free Norton account.",
      "Enter your 25-character product key.",
      "Download and install on your devices."
    ],
    systemRequirements: {
      os: "Windows 11/10/8.1, macOS current and previous 2 versions, Android 8+, iOS",
      processor: "1 GHz processor",
      ram: "2 GB RAM",
      diskSpace: "1.5 GB available space",
      internetConnection: true
    },
    defaultVariants: [
      { id: "nr-3pc-1yr", durationYears: 1, deviceCount: 3, mrp: 3299, sellingPrice: 1299, discountPercent: 60, inStock: true, isDefault: true },
      { id: "nr-5pc-1yr", durationYears: 1, deviceCount: 5, mrp: 4499, sellingPrice: 1799, discountPercent: 60, inStock: true }
    ]
  },
  "McAfee": {
    title: "McAfee Total Protection 2026",
    category: "Total Security",
    tagline: "Award-Winning Antivirus, Identity Monitoring & Safe Web Browsing",
    description:
      "McAfee Total Protection provides premium antivirus, identity theft resolution, web protection, and performance optimization for all your family devices.",
    officialDownloadUrl: "https://mcafee.com/activate",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80",
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    keyFeatures: [
      "Protection Score & Guidance",
      "Personal Data Cleanup & Dark Web Scan",
      "Automated Secure VPN",
      "File Shredder & Password Manager",
      "Color-Coded Web Advisor for Safe Browsing"
    ],
    activationSteps: [
      "Visit https://mcafee.com/activate.",
      "Enter your 25-digit code and email address.",
      "Download the customized installer and run it."
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1, macOS 10.15+, Android 8+, iOS 14+",
      processor: "1 GHz Processor",
      ram: "2 GB RAM",
      diskSpace: "1.3 GB available space",
      internetConnection: true
    },
    defaultVariants: [
      { id: "mc-1pc-1yr", durationYears: 1, deviceCount: 1, mrp: 1799, sellingPrice: 699, discountPercent: 61, inStock: true, isDefault: true },
      { id: "mc-3pc-1yr", durationYears: 1, deviceCount: 3, mrp: 2999, sellingPrice: 1199, discountPercent: 60, inStock: true }
    ]
  },
  "Bitdefender": {
    title: "Bitdefender Total Security Multi-Device",
    category: "Total Security",
    tagline: "Uncompromising Security with Zero System Slowdown",
    description:
      "Complete 4-in-1 security for Windows, macOS, iOS and Android without dragging down your system performance. Features advanced ransomware remediation and webcam protection.",
    officialDownloadUrl: "https://central.bitdefender.com",
    imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=80",
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    keyFeatures: [
      "Multi-Layer Ransomware Protection",
      "Microphone & Webcam Privacy Guard",
      "Bitdefender Photon Performance Optimizer",
      "Anti-tracker & Anti-phishing engine",
      "Real-time Behavioral Threat Defense"
    ],
    activationSteps: [
      "Sign in to Bitdefender Central (https://central.bitdefender.com).",
      "Select 'Install Bitdefender Products' or 'Activate with Code'.",
      "Enter your purchased license code.",
      "Download and install setup on your devices."
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 7 with SP1, macOS 10.12+, Android 5.0+, iOS 12+",
      processor: "Dual Core 2.0 GHz",
      ram: "2 GB RAM",
      diskSpace: "2.5 GB free hard disk space",
      internetConnection: true
    },
    defaultVariants: [
      { id: "bd-5pc-1yr", durationYears: 1, deviceCount: 5, mrp: 3999, sellingPrice: 1699, discountPercent: 57, inStock: true, isDefault: true },
      { id: "bd-5pc-2yr", durationYears: 2, deviceCount: 5, mrp: 5999, sellingPrice: 2199, discountPercent: 63, inStock: true }
    ]
  }
};

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, productToEdit }) => {
  const { addProduct, updateProduct } = useAdminData();

  const [brand, setBrand] = useState<Brand>("Kaspersky");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<SecurityCategory>("Total Security");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [officialDownloadUrl, setOfficialDownloadUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [supportedOS, setSupportedOS] = useState<OperatingSystem[]>(["Windows"]);
  const [featuresText, setFeaturesText] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const applyBrandPreset = (selectedBrand: Brand) => {
    const preset = BRAND_PRESETS[selectedBrand];
    if (!preset) return;
    setBrand(selectedBrand);
    setTitle(preset.title);
    setCategory(preset.category);
    setTagline(preset.tagline);
    setDescription(preset.description);
    setOfficialDownloadUrl(preset.officialDownloadUrl);
    setImageUrl(preset.imageUrl);
    setSupportedOS(preset.supportedOS);
    setFeaturesText(preset.keyFeatures.join("\n"));
    if (!productToEdit) {
      setVariants(preset.defaultVariants);
    }
  };

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setBrand(productToEdit.brand);
      setCategory(productToEdit.category);
      setTagline(productToEdit.tagline);
      setDescription(productToEdit.description);
      setOfficialDownloadUrl(productToEdit.officialDownloadUrl);
      setImageUrl(productToEdit.images[0] || "");
      setSupportedOS(productToEdit.supportedOS);
      setFeaturesText(productToEdit.keyFeatures.join("\n"));
      setVariants(productToEdit.variants);
    } else {
      // Auto pre-fill with Quick Heal or Kaspersky default preset
      applyBrandPreset("Quick Heal");
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleBrandChange = (newBrand: Brand) => {
    applyBrandPreset(newBrand);
  };

  const toggleOS = (os: OperatingSystem) => {
    if (supportedOS.includes(os)) {
      if (supportedOS.length > 1) {
        setSupportedOS(supportedOS.filter((item) => item !== os));
      }
    } else {
      setSupportedOS([...supportedOS, os]);
    }
  };

  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      id: `v-custom-${Date.now()}`,
      durationYears: 1,
      deviceCount: 3,
      mrp: 2999,
      sellingPrice: 1299,
      discountPercent: 57,
      inStock: true
    };
    setVariants([...variants, newVariant]);
  };

  const handleRemoveVariant = (id: string) => {
    if (variants.length <= 1) return;
    setVariants(variants.filter((v) => v.id !== id));
  };

  const handleVariantChange = (id: string, field: keyof ProductVariant, value: any) => {
    setVariants(
      variants.map((v) => {
        if (v.id === id) {
          const updated = { ...v, [field]: value };
          if (field === "mrp" || field === "sellingPrice") {
            const mrp = field === "mrp" ? Number(value) : v.mrp;
            const sp = field === "sellingPrice" ? Number(value) : v.sellingPrice;
            if (mrp > 0 && sp <= mrp) {
              updated.discountPercent = Math.round(((mrp - sp) / mrp) * 100);
            }
          }
          return updated;
        }
        return v;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const preset = BRAND_PRESETS[brand];

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const keyFeatures = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const productPayload = {
      title: title.trim(),
      slug,
      brand,
      category,
      tagline: tagline.trim() || preset.tagline,
      description: description.trim() || preset.description,
      keyFeatures: keyFeatures.length > 0 ? keyFeatures : preset.keyFeatures,
      images: [imageUrl || preset.imageUrl],
      supportedOS,
      variants,
      systemRequirements: preset.systemRequirements,
      officialDownloadUrl: officialDownloadUrl.trim() || preset.officialDownloadUrl,
      rating: productToEdit?.rating || 4.8,
      ratingCount: productToEdit?.ratingCount || 1420,
      reviewCount: productToEdit?.reviewCount || 320,
      isAssured: true,
      activationSteps: preset.activationSteps
    };

    if (productToEdit) {
      updateProduct({ ...productPayload, id: productToEdit.id });
    } else {
      addProduct(productPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-sky-100 max-w-3xl w-full p-6 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {productToEdit ? "Edit Product Catalog & Pricing" : "Quick Add Antivirus Product"}
            </h2>
            <p className="text-xs text-slate-500">
              Select 1 of the 5 verified companies. Download links and specs are automatically pre-filled!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Verified Company Selection (5 Verified Brands) */}
          <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Select Verified Antivirus Company <span className="text-sky-600 font-normal">(Auto-loads official verified details)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {BRANDS.map((b) => {
                const isSelected = brand === b;
                return (
                  <button
                    type="button"
                    key={b}
                    onClick={() => handleBrandChange(b)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border text-center ${
                      isSelected
                        ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20 scale-[1.02]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50"
                    }`}
                  >
                    <span className="truncate w-full">{b}</span>
                    {isSelected && (
                      <span className="text-[10px] font-medium text-sky-100 flex items-center gap-0.5">
                        ✓ Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Notification Badge of Pre-filled data */}
            <div className="mt-3 flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-sky-100 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <span className="text-emerald-500 text-sm">✓</span>
                <span className="text-[11px] truncate">
                  Official Download URL: <strong className="text-sky-700">{officialDownloadUrl}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-[11px] text-sky-600 font-semibold hover:underline shrink-0 ml-2"
              >
                {showAdvanced ? "Hide Pre-filled Details" : "View / Edit Specs"}
              </button>
            </div>
          </div>

          {/* 2. Supported Operating Systems */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Supported Operating Systems *
            </label>
            <p className="text-[11px] text-slate-500 mb-2.5">
              Click to select which devices this product license supports:
            </p>
            <div className="flex flex-wrap gap-2">
              {(["Windows", "macOS", "Android", "iOS"] as OperatingSystem[]).map((os) => {
                const isSelected = supportedOS.includes(os);
                return (
                  <button
                    type="button"
                    key={os}
                    onClick={() => toggleOS(os)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-sky-50 text-sky-700 border-sky-400 shadow-2xs font-semibold"
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span>{isSelected ? "✓" : "+"}</span>
                    <span>{os}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Price & Variant Matrix */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Price Variants & Device Matrix *</h3>
                <p className="text-[11px] text-slate-500">Set Device count, Duration (Years), MRP, and Selling Price.</p>
              </div>
              <button
                type="button"
                onClick={handleAddVariant}
                className="px-2.5 py-1 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-md border border-sky-200 transition-colors"
              >
                + Add Custom Price Option
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-6 gap-2 items-center text-xs"
                >
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Device Count</label>
                    <select
                      value={variant.deviceCount}
                      onChange={(e) => handleVariantChange(variant.id, "deviceCount", Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-medium"
                    >
                      <option value={1}>1 Device / PC</option>
                      <option value={2}>2 Devices</option>
                      <option value={3}>3 Devices</option>
                      <option value={5}>5 Devices</option>
                      <option value={10}>10 Devices</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Validity</label>
                    <select
                      value={variant.durationYears}
                      onChange={(e) => handleVariantChange(variant.id, "durationYears", Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-medium"
                    >
                      <option value={1}>1 Year</option>
                      <option value={2}>2 Years</option>
                      <option value={3}>3 Years</option>
                      <option value={5}>5 Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">MRP (₹)</label>
                    <input
                      type="number"
                      value={variant.mrp}
                      onChange={(e) => handleVariantChange(variant.id, "mrp", Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Selling Price (₹)</label>
                    <input
                      type="number"
                      value={variant.sellingPrice}
                      onChange={(e) => handleVariantChange(variant.id, "sellingPrice", Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-bold text-sky-700"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      {variant.discountPercent}% OFF
                    </span>
                  </div>

                  <div className="flex items-center justify-end">
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(variant.id)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove Variant"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Expandable Pre-filled Specs (Optional Advanced Tweak) */}
          {showAdvanced && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Verified Metadata (Pre-filled for {brand})</span>
                <button
                  type="button"
                  onClick={() => applyBrandPreset(brand)}
                  className="text-[11px] text-sky-600 hover:underline"
                >
                  ↻ Reset to Official Defaults
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Security Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SecurityCategory)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-sky-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Official Download Link</label>
                  <input
                    type="url"
                    value={officialDownloadUrl}
                    onChange={(e) => setOfficialDownloadUrl(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-sky-500 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-sky-500 font-mono text-[11px]"
                ></textarea>
              </div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{productToEdit ? "Save Changes" : "Create & Add Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
