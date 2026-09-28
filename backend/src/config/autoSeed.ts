import { Product } from "../models/Product.js";
import { LicenseKey } from "../models/LicenseKey.js";
import { Coupon } from "../models/Coupon.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const autoSeedIfEmpty = async (): Promise<void> => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      return; // Already populated
    }

    console.log("[Auto-Seed] Empty database detected. Populating initial antivirus catalog and keys...");

    const productsData = [
      {
        slug: "quick-heal-total-security",
        title: "Quick Heal Total Security 2026",
        brand: "Quick Heal",
        category: "Total Security",
        tagline: "India's #1 Most Trusted Cyber Protection with AI Threat Shield",
        description:
          "Quick Heal Total Security provides robust multi-layered protection against complex ransomware, malicious malware, phishing attacks, and online financial fraud.",
        keyFeatures: [
          "Ransomware Protection with Auto Data Backup",
          "Safe Banking & Secure Online Payments",
          "Parental Control & Web Content Filtering",
          "Advanced Wi-Fi Network & Camera Shield",
          "Track Your PC & Anti-Theft Protection",
        ],
        images: [
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1618060932014-4deda4932554?w=800&auto=format&fit=crop&q=80",
        ],
        supportedOS: ["Windows", "macOS", "Android"],
        variants: [
          { id: "qh-1pc-1yr", durationYears: 1, deviceCount: 1, mrp: 1899, sellingPrice: 849, discountPercent: 55, inStock: true, isDefault: true },
          { id: "qh-1pc-3yr", durationYears: 3, deviceCount: 1, mrp: 3499, sellingPrice: 1549, discountPercent: 56, inStock: true, isDefault: false },
          { id: "qh-3pc-1yr", durationYears: 1, deviceCount: 3, mrp: 3299, sellingPrice: 1399, discountPercent: 58, inStock: true, isDefault: false },
          { id: "qh-3pc-3yr", durationYears: 3, deviceCount: 3, mrp: 5999, sellingPrice: 2499, discountPercent: 58, inStock: true, isDefault: false },
        ],
        systemRequirements: {
          os: "Windows 11, 10, 8.1 (32-bit and 64-bit)",
          processor: "1.4 GHz or higher",
          ram: "2 GB (4 GB recommended for 64-bit)",
          diskSpace: "2.3 GB free disk space",
          internetConnection: true,
        },
        officialDownloadUrl: "https://www.quickheal.co.in/installer",
        rating: 4.8,
        ratingCount: 14250,
        reviewCount: 2310,
        isAssured: true,
        isHotDeal: true,
        isBestSeller: true,
        activationSteps: [
          "Download Quick Heal Setup from the official link above.",
          "Run the installer and follow on-screen instructions.",
          "When prompted, enter your 20-character product key.",
          "Register with your email and enjoy uninterrupted protection.",
        ],
      },
      {
        slug: "kaspersky-plus-total-security",
        title: "Kaspersky Plus Internet & Privacy Security",
        brand: "Kaspersky",
        category: "Internet Security",
        tagline: "Next-Gen Cybersecurity with Unlimited Fast VPN & Password Manager",
        description:
          "Kaspersky Plus combines state-of-the-art cyber protection against crypto-lockers, trojans, and phishing with privacy tools including high-speed unlimited VPN.",
        keyFeatures: [
          "Real-time Antivirus & Zero-day Exploit Prevention",
          "Unlimited High-Speed Smart VPN",
          "Hardened Web Browser for Safe Online Banking",
          "Data Leak & Password Breach Monitor",
          "Hard Drive Health & PC Performance Booster",
        ],
        images: [
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
        ],
        supportedOS: ["Windows", "macOS", "Android", "iOS"],
        variants: [
          { id: "kasp-1pc-1yr", durationYears: 1, deviceCount: 1, mrp: 1499, sellingPrice: 699, discountPercent: 53, inStock: true, isDefault: true },
          { id: "kasp-1pc-2yr", durationYears: 2, deviceCount: 1, mrp: 2699, sellingPrice: 1199, discountPercent: 55, inStock: true, isDefault: false },
          { id: "kasp-3pc-1yr", durationYears: 1, deviceCount: 3, mrp: 2999, sellingPrice: 1299, discountPercent: 57, inStock: true, isDefault: false },
          { id: "kasp-5pc-1yr", durationYears: 1, deviceCount: 5, mrp: 4499, sellingPrice: 1899, discountPercent: 58, inStock: true, isDefault: false },
        ],
        systemRequirements: {
          os: "Windows 11/10/8.1, macOS 11+, Android 8.0+, iOS 15+",
          processor: "1 GHz or faster",
          ram: "2 GB RAM",
          diskSpace: "1.5 GB available space",
          internetConnection: true,
        },
        officialDownloadUrl: "https://www.kaspersky.co.in/downloads",
        rating: 4.9,
        ratingCount: 18920,
        reviewCount: 3410,
        isAssured: true,
        isHotDeal: true,
        isBestSeller: true,
        activationSteps: [
          "Visit my.kaspersky.com and create or log in to your account.",
          "Click on 'Subscriptions' -> 'Add Activation Code'.",
          "Enter the 20-character license key sent to your email.",
          "Download the application and it activates automatically.",
        ],
      },
      {
        slug: "norton-360-deluxe",
        title: "Norton 360 Deluxe All-in-One Security",
        brand: "Norton",
        category: "Total Security",
        tagline: "Comprehensive Multi-Layer Protection with Dark Web Monitoring & 50GB Cloud Backup",
        description:
          "Norton 360 Deluxe delivers complete peace of mind with real-time defense against malware, spyware, and ransomware, plus automatic PC Cloud Backup and Secure VPN.",
        keyFeatures: [
          "50GB Encrypted PC Cloud Backup",
          "Dark Web Monitoring for Identity Protection",
          "Smart Firewall for PC & Mac",
          "Secure VPN with Bank-grade Encryption",
          "SafeCam Webcam Hijacking Alert",
        ],
        images: [
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80",
        ],
        supportedOS: ["Windows", "macOS", "Android", "iOS"],
        variants: [
          { id: "norton-3dev-1yr", durationYears: 1, deviceCount: 3, mrp: 2999, sellingPrice: 1199, discountPercent: 60, inStock: true, isDefault: true },
          { id: "norton-5dev-1yr", durationYears: 1, deviceCount: 5, mrp: 4199, sellingPrice: 1599, discountPercent: 62, inStock: true, isDefault: false },
          { id: "norton-5dev-2yr", durationYears: 2, deviceCount: 5, mrp: 7999, sellingPrice: 2899, discountPercent: 64, inStock: true, isDefault: false },
        ],
        systemRequirements: {
          os: "Windows 11/10/8.1, macOS current and previous two versions",
          processor: "1 GHz processor",
          ram: "2 GB",
          diskSpace: "1 GB",
          internetConnection: true,
        },
        officialDownloadUrl: "https://my.norton.com/setup",
        rating: 4.7,
        ratingCount: 11500,
        reviewCount: 1840,
        isAssured: true,
        isHotDeal: false,
        isBestSeller: true,
        activationSteps: [
          "Go to my.norton.com/setup in your web browser.",
          "Sign in or create a new Norton account.",
          "Enter your product key and click 'Get Started'.",
          "Download and run the installer.",
        ],
      },
      {
        slug: "mcafee-total-protection",
        title: "McAfee Total Protection 2026",
        brand: "McAfee",
        category: "Total Security",
        tagline: "Award-winning Antivirus with Privacy Guard & Identity Theft Shield",
        description:
          "McAfee Total Protection safeguards your identity, family, and devices with cutting-edge defense against malware, fraudulent scams, and malicious links.",
        keyFeatures: [
          "Award-winning Cloud-assisted Threat Detection",
          "Identity Theft Protection & Dark Web Breach Alerts",
          "Wi-Fi Privacy Protection with Automated VPN",
          "File Shredder for Permanent Sensitive Document Deletion",
          "Password Manager with Cross-Device Sync",
        ],
        images: [
          "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=80",
        ],
        supportedOS: ["Windows", "macOS", "Android", "iOS"],
        variants: [
          { id: "mc-1dev-1yr", durationYears: 1, deviceCount: 1, mrp: 1999, sellingPrice: 599, discountPercent: 70, inStock: true, isDefault: true },
          { id: "mc-1dev-3yr", durationYears: 3, deviceCount: 1, mrp: 4499, sellingPrice: 1299, discountPercent: 71, inStock: true, isDefault: false },
          { id: "mc-3dev-1yr", durationYears: 1, deviceCount: 3, mrp: 2999, sellingPrice: 899, discountPercent: 70, inStock: true, isDefault: false },
          { id: "mc-5dev-1yr", durationYears: 1, deviceCount: 5, mrp: 3999, sellingPrice: 1199, discountPercent: 70, inStock: true, isDefault: false },
        ],
        systemRequirements: {
          os: "Windows 11, 10 (32 and 64-bit), macOS 10.15+, Android 8.0+",
          processor: "1 GHz processor",
          ram: "2 GB",
          diskSpace: "1.3 GB",
          internetConnection: true,
        },
        officialDownloadUrl: "https://www.mcafee.com/activate",
        rating: 4.6,
        ratingCount: 9800,
        reviewCount: 1420,
        isAssured: true,
        isHotDeal: true,
        isBestSeller: false,
        activationSteps: [
          "Visit www.mcafee.com/activate.",
          "Enter your 25-digit activation code.",
          "Log in or create your McAfee account.",
          "Download and install your protected suite.",
        ],
      },
      {
        slug: "bitdefender-total-security",
        title: "Bitdefender Total Security Multi-Device",
        brand: "Bitdefender",
        category: "Total Security",
        tagline: "World's Top Ranked Cybersecurity with Zero PC Performance Slowdown",
        description:
          "Bitdefender Total Security delivers top-tier protection without draining your battery or slowing down system resources.",
        keyFeatures: [
          "Unbeatable Threat Defense with Photonic Technology",
          "Multi-Layered Ransomware Remediation",
          "Microphone & Webcam Privacy Guard",
          "Advanced Anti-Phishing & Anti-Fraud Engine",
          "One-Click PC Speed Optimizer",
        ],
        images: [
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop&q=80",
        ],
        supportedOS: ["Windows", "macOS", "Android", "iOS"],
        variants: [
          { id: "bd-5dev-1yr", durationYears: 1, deviceCount: 5, mrp: 3499, sellingPrice: 1299, discountPercent: 63, inStock: true, isDefault: true },
          { id: "bd-5dev-2yr", durationYears: 2, deviceCount: 5, mrp: 5999, sellingPrice: 2199, discountPercent: 63, inStock: true, isDefault: false },
          { id: "bd-10dev-1yr", durationYears: 1, deviceCount: 10, mrp: 4999, sellingPrice: 1799, discountPercent: 64, inStock: true, isDefault: false },
        ],
        systemRequirements: {
          os: "Windows 11, 10, 8.1, 7 SP1, macOS 10.12+, Android 5.0+, iOS 12+",
          processor: "Dual Core 2.0 GHz",
          ram: "2 GB",
          diskSpace: "2.5 GB",
          internetConnection: true,
        },
        officialDownloadUrl: "https://central.bitdefender.com",
        rating: 4.9,
        ratingCount: 16700,
        reviewCount: 2980,
        isAssured: true,
        isHotDeal: false,
        isBestSeller: true,
        activationSteps: [
          "Go to central.bitdefender.com and log in to Bitdefender Central.",
          "Select 'My Subscriptions' -> 'Activate with Code'.",
          "Enter your license key code.",
          "Install protection on your chosen devices.",
        ],
      },
    ];

    const insertedProducts = await Product.insertMany(productsData);
    console.log(`[Auto-Seed] Inserted ${insertedProducts.length} antivirus products.`);

    // Seed Initial Keys for each product
    const keysToInsert: any[] = [];
    for (const prod of insertedProducts) {
      for (const variant of prod.variants) {
        for (let i = 1; i <= 3; i++) {
          const randHex = Math.random().toString(36).substring(2, 6).toUpperCase();
          const randHex2 = Math.random().toString(36).substring(2, 6).toUpperCase();
          const randHex3 = Math.random().toString(36).substring(2, 6).toUpperCase();
          const randHex4 = Math.random().toString(36).substring(2, 6).toUpperCase();
          const keyString = `${prod.brand.substring(0, 2).toUpperCase()}${randHex}-${randHex2}-${randHex3}-${randHex4}`;

          keysToInsert.push({
            keyString,
            productId: prod._id,
            productTitle: prod.title,
            variantId: variant.id,
            variantLabel: `${variant.deviceCount} PC / ${variant.durationYears} Year`,
            status: "AVAILABLE",
          });
        }
      }
    }

    await LicenseKey.insertMany(keysToInsert);
    console.log(`[Auto-Seed] Inserted ${keysToInsert.length} license keys into vault.`);
  } catch (err) {
    console.warn("[Auto-Seed] Warning: auto-seed check skipped:", err);
  }
};
