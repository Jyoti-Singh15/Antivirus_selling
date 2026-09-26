import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/Product.js";
import { LicenseKey } from "../models/LicenseKey.js";
import { Coupon } from "../models/Coupon.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/antivirus_ecommerce";

const seedData = async () => {
  try {
    console.log("[Seed] Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("[Seed] Connected successfully.");

    // Clear existing collections
    console.log("[Seed] Cleaning existing data...");
    await Product.deleteMany({});
    await LicenseKey.deleteMany({});
    await Coupon.deleteMany({});
    await User.deleteMany({});

    // 1. Seed Products
    console.log("[Seed] Inserting Antivirus Products...");
    const productsData = [
      {
        slug: "quick-heal-total-security",
        title: "Quick Heal Total Security 2026",
        brand: "Quick Heal",
        category: "Total Security",
        tagline: "India's #1 Most Trusted Cyber Protection with AI Threat Shield",
        description:
          "Quick Heal Total Security provides robust multi-layered protection against complex ransomware, malicious malware, phishing attacks, and online financial fraud. Features automated data backup, parental safety control, and zero-day threat prevention.",
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
          {
            id: "qh-1pc-1yr",
            durationYears: 1,
            deviceCount: 1,
            mrp: 1899,
            sellingPrice: 849,
            discountPercent: 55,
            inStock: true,
            isDefault: true,
          },
          {
            id: "qh-1pc-3yr",
            durationYears: 3,
            deviceCount: 1,
            mrp: 3499,
            sellingPrice: 1549,
            discountPercent: 56,
            inStock: true,
            isDefault: false,
          },
          {
            id: "qh-3pc-1yr",
            durationYears: 1,
            deviceCount: 3,
            mrp: 3299,
            sellingPrice: 1399,
            discountPercent: 58,
            inStock: true,
            isDefault: false,
          },
          {
            id: "qh-3pc-3yr",
            durationYears: 3,
            deviceCount: 3,
            mrp: 5999,
            sellingPrice: 2499,
            discountPercent: 58,
            inStock: true,
            isDefault: false,
          },
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
          "Kaspersky Plus combines state-of-the-art cyber protection against crypto-lockers, trojans, and phishing with privacy tools including high-speed unlimited VPN, data leak checker, and secure payment sandbox.",
        keyFeatures: [
          "Real-time Antivirus & Anti-Ransomware Shield",
          "Ultra-fast Unlimited VPN Included",
          "Hardened Browser for Safe Money Transactions",
          "Smart Data Leak & Password Compromise Monitor",
          "Performance Optimizer & HDD Health Checker",
        ],
        images: [
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
        ],
        supportedOS: ["Windows", "macOS", "Android", "iOS"],
        variants: [
          {
            id: "ks-1pc-1yr",
            durationYears: 1,
            deviceCount: 1,
            mrp: 1999,
            sellingPrice: 899,
            discountPercent: 55,
            inStock: true,
            isDefault: true,
          },
          {
            id: "ks-3pc-1yr",
            durationYears: 1,
            deviceCount: 3,
            mrp: 3499,
            sellingPrice: 1499,
            discountPercent: 57,
            inStock: true,
            isDefault: false,
          },
          {
            id: "ks-5pc-2yr",
            durationYears: 2,
            deviceCount: 5,
            mrp: 6499,
            sellingPrice: 2899,
            discountPercent: 55,
            inStock: true,
            isDefault: false,
          },
        ],
        systemRequirements: {
          os: "Windows 11 / 10 / 8.1 / macOS 11+ / Android 8+",
          processor: "1 GHz x86 or x64",
          ram: "2 GB RAM",
          diskSpace: "2.7 GB available disk space",
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
          "Download official installer from Kaspersky website.",
          "Launch setup and sign in or create your My Kaspersky account.",
          "Input your 20-digit activation code.",
          "Protection is activated across all your selected devices.",
        ],
      },
      {
        slug: "norton-360-deluxe",
        title: "Norton 360 Deluxe Multi-Device Protection",
        brand: "Norton",
        category: "Total Security",
        tagline: "Comprehensive Multi-Layered Protection with 50GB Cloud Backup & Secure VPN",
        description:
          "Norton 360 Deluxe gives you robust defense for PCs, Macs, smartphones and tablets. Includes Secure VPN, Dark Web Monitoring, Password Manager, and 50 GB PC Cloud Backup.",
        keyFeatures: [
          "50 GB Secure PC Cloud Storage Backup",
          "No-Log Secure VPN for All Devices",
          "Dark Web Monitoring Powered by LifeLock",
          "Smart Firewall for PC & Mac",
          "Parental Control & School Time Management",
        ],
        images: [
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
        ],
        supportedOS: ["Windows", "macOS", "Android", "iOS"],
        variants: [
          {
            id: "nr-3pc-1yr",
            durationYears: 1,
            deviceCount: 3,
            mrp: 3299,
            sellingPrice: 1299,
            discountPercent: 60,
            inStock: true,
            isDefault: true,
          },
          {
            id: "nr-5pc-1yr",
            durationYears: 1,
            deviceCount: 5,
            mrp: 4499,
            sellingPrice: 1799,
            discountPercent: 60,
            inStock: true,
            isDefault: false,
          },
        ],
        systemRequirements: {
          os: "Windows 11/10/8.1, macOS current and previous two versions",
          processor: "1 GHz processor",
          ram: "2 GB RAM",
          diskSpace: "1.5 GB available space",
          internetConnection: true,
        },
        officialDownloadUrl: "https://my.norton.com/extranet/setup",
        rating: 4.7,
        ratingCount: 9800,
        reviewCount: 1120,
        isAssured: true,
        isHotDeal: false,
        isBestSeller: true,
        activationSteps: [
          "Go to my.norton.com/setup in your browser.",
          "Sign in or create a free Norton account.",
          "Enter your 25-character product key.",
          "Download and install on your devices.",
        ],
      },
      {
        slug: "mcafee-total-protection",
        title: "McAfee Total Protection 2026",
        brand: "McAfee",
        category: "Total Security",
        tagline: "Award-Winning Antivirus, Identity Monitoring & Safe Web Browsing",
        description:
          "McAfee Total Protection provides premium antivirus, identity theft resolution, web protection, and performance optimization for all your family devices.",
        keyFeatures: [
          "Protection Score & Guidance",
          "Personal Data Cleanup & Dark Web Scan",
          "Automated Secure VPN",
          "File Shredder & Password Manager",
        ],
        images: [
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80",
        ],
        supportedOS: ["Windows", "macOS", "Android", "iOS"],
        variants: [
          {
            id: "mc-1pc-1yr",
            durationYears: 1,
            deviceCount: 1,
            mrp: 1799,
            sellingPrice: 699,
            discountPercent: 61,
            inStock: true,
            isDefault: true,
          },
          {
            id: "mc-3pc-1yr",
            durationYears: 1,
            deviceCount: 3,
            mrp: 2999,
            sellingPrice: 1199,
            discountPercent: 60,
            inStock: true,
            isDefault: false,
          },
        ],
        systemRequirements: {
          os: "Windows 11 / 10 / 8.1",
          processor: "1 GHz",
          ram: "2 GB",
          diskSpace: "1.3 GB",
          internetConnection: true,
        },
        officialDownloadUrl: "https://www.mcafee.com/activate",
        rating: 4.6,
        ratingCount: 8400,
        reviewCount: 950,
        isAssured: true,
        isHotDeal: true,
        isBestSeller: false,
        activationSteps: [
          "Visit mcafee.com/activate.",
          "Enter your 25-digit code and email address.",
          "Download the customized installer and run it.",
        ],
      },
      {
        slug: "bitdefender-total-security",
        title: "Bitdefender Total Security Multi-Device",
        brand: "Bitdefender",
        category: "Total Security",
        tagline: "Uncompromising Security with Zero System Slowdown",
        description:
          "Complete 4-in-1 security for Windows, macOS, iOS and Android without dragging down your system performance. Features advanced ransomware remediation and webcam protection.",
        keyFeatures: [
          "Multi-Layer Ransomware Protection",
          "Microphone & Webcam Privacy Guard",
          "Bitdefender Photon Performance Optimizer",
          "Anti-tracker & Anti-phishing engine",
        ],
        images: [
          "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=80",
        ],
        supportedOS: ["Windows", "macOS", "Android", "iOS"],
        variants: [
          {
            id: "bd-5pc-1yr",
            durationYears: 1,
            deviceCount: 5,
            mrp: 3999,
            sellingPrice: 1699,
            discountPercent: 57,
            inStock: true,
            isDefault: true,
          },
        ],
        systemRequirements: {
          os: "Windows 11 / 10 / 7 with SP1",
          processor: "Dual Core 2.0 GHz",
          ram: "2 GB",
          diskSpace: "2.5 GB",
          internetConnection: true,
        },
        officialDownloadUrl: "https://central.bitdefender.com",
        rating: 4.9,
        ratingCount: 11400,
        reviewCount: 1650,
        isAssured: true,
        isHotDeal: false,
        isBestSeller: true,
        activationSteps: [
          "Go to central.bitdefender.com and log in.",
          "Click 'My Subscriptions' -> 'Activate with Code'.",
          "Enter your 10 or 20 digit activation key.",
          "Install Bitdefender on your active devices.",
        ],
      },
    ];

    const insertedProducts = await Product.insertMany(productsData);
    console.log(`[Seed] Successfully inserted ${insertedProducts.length} products.`);

    // 2. Seed License Keys for each variant
    console.log("[Seed] Populating Digital License Key Vault...");
    const keysToInsert: any[] = [];

    const generateRandomKey = (brandPrefix: string): string => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const part = (len: number) =>
        Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      return `${brandPrefix}-${part(4)}-${part(4)}-${part(4)}-${part(4)}`;
    };

    for (const prod of insertedProducts) {
      const brandPrefix = prod.brand.slice(0, 4).toUpperCase().replace(/\s/g, "");

      for (const variant of prod.variants) {
        // Insert 15 ready-to-sell AVAILABLE keys for each variant
        for (let i = 1; i <= 15; i++) {
          keysToInsert.push({
            keyString: generateRandomKey(brandPrefix),
            productId: prod._id,
            productTitle: prod.title,
            variantId: variant.id,
            variantLabel: `${variant.deviceCount} Device / ${variant.durationYears} Year`,
            status: "AVAILABLE",
            notes: "Seed stock batch #1",
          });
        }
      }
    }

    await LicenseKey.insertMany(keysToInsert);
    console.log(`[Seed] Successfully populated ${keysToInsert.length} license keys into vault.`);

    // 3. Seed Promotional Coupons
    console.log("[Seed] Inserting Promotional Coupons...");
    const couponsData = [
      {
        code: "PROTECT10",
        discountType: "PERCENT",
        discountValue: 10,
        minOrderValue: 500,
        maxDiscount: 300,
        validUntil: new Date("2028-12-31"),
        usageLimit: 5000,
        isActive: true,
      },
      {
        code: "RAPID100",
        discountType: "FLAT",
        discountValue: 100,
        minOrderValue: 999,
        validUntil: new Date("2028-12-31"),
        usageLimit: 2000,
        isActive: true,
      },
      {
        code: "MEGA20",
        discountType: "PERCENT",
        discountValue: 20,
        minOrderValue: 1500,
        maxDiscount: 600,
        validUntil: new Date("2028-12-31"),
        usageLimit: 1000,
        isActive: true,
      },
    ];

    await Coupon.insertMany(couponsData);
    console.log(`[Seed] Inserted ${couponsData.length} active coupons.`);

    // 4. Seed Test Customer User
    console.log("[Seed] Creating sample customer account...");
    const hashedPassword = await bcrypt.hash("customer@123", 10);
    const testCustomer = new User({
      name: "Rohit Sharma",
      email: "customer@antivirus.com",
      password: hashedPassword,
      role: "CUSTOMER",
      status: "ACTIVE",
    });
    await testCustomer.save();

    console.log("==================================================");
    console.log("🎉 Database Seeding Completed Successfully!");
    console.log(`   Admin Login:   .env configured (admin@antivirus.com / Admin@Security2026!)`);
    console.log(`   Customer User: customer@antivirus.com / customer@123`);
    console.log("==================================================");

    process.exit(0);
  } catch (error) {
    console.error("[Seed Error] Failed to seed database:", error);
    process.exit(1);
  }
};

seedData();
