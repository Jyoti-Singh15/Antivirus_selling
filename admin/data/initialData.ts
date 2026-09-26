import { Product, LicenseKey, Order, Customer } from "../types";

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    slug: "kaspersky-total-security",
    title: "Kaspersky Total Security 2025 Edition",
    brand: "Kaspersky",
    category: "Total Security",
    tagline: "Ultimate multi-device security with cloud VPN & Safe Money password manager.",
    description: "Kaspersky Total Security provides premium protection against viruses, ransomware, phishing, and online threats across all your devices. Includes parental controls, encrypted vault, and privacy tools.",
    keyFeatures: [
      "Real-time Antivirus & Zero-Day Threat Protection",
      "Safe Money Bank-Grade Browser Encryption",
      "Built-in High-Speed Secure VPN (300MB/day or unlimited)",
      "Premium Password Manager & Encrypted Cloud Backup",
      "Advanced Parental Control (GPS & Screen-Time Management)",
      "Webcam & Mic Spyware Blocker"
    ],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    variants: [
      { id: "v1-1", durationYears: 1, deviceCount: 1, mrp: 1999, sellingPrice: 699, discountPercent: 65, inStock: true, isDefault: true },
      { id: "v1-2", durationYears: 1, deviceCount: 3, mrp: 2999, sellingPrice: 1199, discountPercent: 60, inStock: true },
      { id: "v1-3", durationYears: 3, deviceCount: 1, mrp: 4499, sellingPrice: 1599, discountPercent: 64, inStock: true },
      { id: "v1-4", durationYears: 3, deviceCount: 3, mrp: 6999, sellingPrice: 2499, discountPercent: 64, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1 / macOS 11+ / Android 8.0+ / iOS 15+",
      processor: "1 GHz or higher (Intel/AMD/Apple Silicon)",
      ram: "2 GB RAM (4 GB recommended)",
      diskSpace: "1.5 GB available hard drive space",
      internetConnection: true
    },
    officialDownloadUrl: "https://www.kaspersky.com/downloads",
    rating: 4.8,
    ratingCount: 14250,
    reviewCount: 2310,
    isAssured: true,
    isHotDeal: true,
    isBestSeller: true,
    activationSteps: [
      "Download official setup from the provided download link.",
      "Install and launch Kaspersky on your device.",
      "Click 'Enter Activation Code' and paste your 20-digit license key.",
      "Sign in or register your free My Kaspersky account to sync your devices."
    ]
  },
  {
    id: "prod-2",
    slug: "quick-heal-total-security",
    title: "Quick Heal Total Security 2025 (Latest Version)",
    brand: "Quick Heal",
    category: "Total Security",
    tagline: "India's #1 Antivirus with Ransomware Protection, Safe Banking & Anti-Theft.",
    description: "Robust, lightweight, and engineered specifically for high threat detection with zero PC slowdown. Comes with automated cloud-backup and vulnerability scanner.",
    keyFeatures: [
      "GoDeep.AI Next-Gen Threat Hunting Engine",
      "Ransomware Protection with Instant File Backup",
      "Safe Banking Shield against Phishing & MITM Attacks",
      "Track, Lock & Wipe Remote Anti-Theft Protection",
      "Game Booster & High-Efficiency PC Performance Optimizer"
    ],
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80"
    ],
    supportedOS: ["Windows"],
    variants: [
      { id: "v2-1", durationYears: 1, deviceCount: 1, mrp: 2199, sellingPrice: 849, discountPercent: 61, inStock: true, isDefault: true },
      { id: "v2-2", durationYears: 3, deviceCount: 1, mrp: 4999, sellingPrice: 1899, discountPercent: 62, inStock: true },
      { id: "v2-3", durationYears: 1, deviceCount: 3, mrp: 3499, sellingPrice: 1549, discountPercent: 55, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1 / 7 SP1",
      processor: "1.4 GHz or higher",
      ram: "2 GB for 32-bit / 4 GB for 64-bit",
      diskSpace: "2.1 GB free space",
      internetConnection: true
    },
    officialDownloadUrl: "https://www.quickheal.co.in/installer",
    rating: 4.7,
    ratingCount: 19800,
    reviewCount: 3120,
    isAssured: true,
    isBestSeller: true,
    activationSteps: [
      "Download Quick Heal Setup Installer from official website.",
      "Run the installer and complete the wizard.",
      "Enter Product Key sent to your email / order screen.",
      "Register with your Name, Mobile, and Email."
    ]
  },
  {
    id: "prod-3",
    slug: "norton-360-deluxe",
    title: "Norton 360 Deluxe 2025 (5 Devices)",
    brand: "Norton",
    category: "Total Security",
    tagline: "Comprehensive 5-Device Protection with 50GB Cloud Backup & Secure VPN.",
    description: "Norton 360 Deluxe delivers multiple layers of protection for PCs, Macs, smartphones, and tablets against malware, ransomware, and identity theft.",
    keyFeatures: [
      "Multi-Device Protection for up to 5 PCs, Macs, or Phones",
      "Unlimited Secure VPN for Wi-Fi Encryption",
      "50GB PC Cloud Backup for Ransomware Prevention",
      "Dark Web Monitoring powered by LifeLock",
      "Smart Firewall & Password Manager"
    ],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    variants: [
      { id: "v3-1", durationYears: 1, deviceCount: 5, mrp: 3999, sellingPrice: 1299, discountPercent: 67, inStock: true, isDefault: true },
      { id: "v3-2", durationYears: 2, deviceCount: 5, mrp: 7499, sellingPrice: 2299, discountPercent: 69, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1, macOS current and previous 2 versions, Android 8.0+, iOS",
      processor: "1 GHz",
      ram: "2 GB minimum",
      diskSpace: "1 GB",
      internetConnection: true
    },
    officialDownloadUrl: "https://my.norton.com/setup",
    rating: 4.8,
    ratingCount: 11200,
    reviewCount: 1640,
    isAssured: true,
    isHotDeal: true,
    activationSteps: [
      "Visit my.norton.com/setup on your browser.",
      "Log in or create a free Norton account.",
      "Type the 25-character product activation key.",
      "Download and protect your registered devices."
    ]
  },
  {
    id: "prod-4",
    slug: "mcafee-total-protection",
    title: "McAfee Total Protection 2025 (Multi-Device)",
    brand: "McAfee",
    category: "Total Security",
    tagline: "All-in-one antivirus, privacy, and identity protection with automated VPN.",
    description: "Award-winning protection against viruses, phishing, and data breaches. Includes McAfee Shredder to permanently erase sensitive files.",
    keyFeatures: [
      "Award-Winning Antivirus Engine",
      "Integrated High-Speed Secure VPN",
      "Identity Protection & Breach Alerts",
      "McAfee File Shredder & Password Manager",
      "Color-Coded Web Advisor for Safe Searching"
    ],
    images: [
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&auto=format&fit=crop&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    variants: [
      { id: "v4-1", durationYears: 1, deviceCount: 1, mrp: 1899, sellingPrice: 599, discountPercent: 68, inStock: true, isDefault: true },
      { id: "v4-2", durationYears: 1, deviceCount: 3, mrp: 2799, sellingPrice: 999, discountPercent: 64, inStock: true },
      { id: "v4-3", durationYears: 3, deviceCount: 1, mrp: 4299, sellingPrice: 1399, discountPercent: 67, inStock: true },
      { id: "v4-4", durationYears: 3, deviceCount: 5, mrp: 6999, sellingPrice: 2199, discountPercent: 68, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 (64-bit), macOS 10.15+, Android 8+, iOS 14+",
      processor: "1 GHz Processor",
      ram: "2 GB RAM",
      diskSpace: "1.3 GB available space",
      internetConnection: true
    },
    officialDownloadUrl: "https://www.mcafee.com/activate",
    rating: 4.6,
    ratingCount: 16500,
    reviewCount: 2210,
    isAssured: true,
    activationSteps: [
      "Open https://www.mcafee.com/activate",
      "Enter your 25-digit code and valid email address.",
      "Click Submit and follow download instructions."
    ]
  },
  {
    id: "prod-5",
    slug: "bitdefender-total-security",
    title: "Bitdefender Total Security 2025",
    brand: "Bitdefender",
    category: "Total Security",
    tagline: "Unbeatable multi-layer ransomware defense with zero battery drain.",
    description: "Ranked #1 in multiple independent test labs. Features Photon technology that adapts to your hardware configuration to save processing power.",
    keyFeatures: [
      "Ranked #1 for Overall Malware Protection",
      "Zero Performance Slowdown with Bitdefender Photon",
      "Multi-Layer Ransomware Defense with Remediation",
      "Microphone Monitor & Webcam Shield",
      "Anti-Theft and Anti-Fraud tools"
    ],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    variants: [
      { id: "v5-1", durationYears: 1, deviceCount: 5, mrp: 3499, sellingPrice: 1349, discountPercent: 61, inStock: true, isDefault: true },
      { id: "v5-2", durationYears: 2, deviceCount: 5, mrp: 5999, sellingPrice: 2199, discountPercent: 63, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1 / 7, macOS 10.12+, Android 5.0+, iOS 12+",
      processor: "Dual Core 2.0 GHz",
      ram: "2 GB RAM",
      diskSpace: "2.5 GB free hard disk space",
      internetConnection: true
    },
    officialDownloadUrl: "https://central.bitdefender.com",
    rating: 4.9,
    ratingCount: 8900,
    reviewCount: 1450,
    isAssured: true,
    isHotDeal: true,
    activationSteps: [
      "Sign in to Bitdefender Central (https://central.bitdefender.com).",
      "Select 'My Subscriptions' -> 'Activate with Code'.",
      "Type your purchased License Code.",
      "Install Bitdefender on all 5 covered devices."
    ]
  }
];

export const initialKeys: LicenseKey[] = [
  // Kaspersky Keys
  {
    id: "key-101",
    keyString: "KASP-2025-ABCD-9876-QWER",
    productId: "prod-1",
    productTitle: "Kaspersky Total Security 2025 Edition",
    variantId: "v1-1",
    variantLabel: "1 PC / 1 Year",
    status: "SOLD",
    orderId: "ORD-94821",
    customerEmail: "rahul.sharma@gmail.com",
    customerName: "Rahul Sharma",
    soldAt: "2026-09-19T14:22:00Z",
    createdAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "key-102",
    keyString: "KASP-2025-EFGH-5432-TYUI",
    productId: "prod-1",
    productTitle: "Kaspersky Total Security 2025 Edition",
    variantId: "v1-1",
    variantLabel: "1 PC / 1 Year",
    status: "AVAILABLE",
    createdAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "key-103",
    keyString: "KASP-2025-IJKL-1122-OPAS",
    productId: "prod-1",
    productTitle: "Kaspersky Total Security 2025 Edition",
    variantId: "v1-1",
    variantLabel: "1 PC / 1 Year",
    status: "AVAILABLE",
    createdAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "key-104",
    keyString: "KASP-2025-MNOP-3344-DFGH",
    productId: "prod-1",
    productTitle: "Kaspersky Total Security 2025 Edition",
    variantId: "v1-2",
    variantLabel: "3 PCs / 1 Year",
    status: "SOLD",
    orderId: "ORD-94822",
    customerEmail: "priya.verma@outlook.com",
    customerName: "Priya Verma",
    soldAt: "2026-09-19T16:45:00Z",
    createdAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "key-105",
    keyString: "KASP-2025-QRST-7788-JKLZ",
    productId: "prod-1",
    productTitle: "Kaspersky Total Security 2025 Edition",
    variantId: "v1-2",
    variantLabel: "3 PCs / 1 Year",
    status: "AVAILABLE",
    createdAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "key-106",
    keyString: "KASP-2025-UVWX-9900-XCVB",
    productId: "prod-1",
    productTitle: "Kaspersky Total Security 2025 Edition",
    variantId: "v1-3",
    variantLabel: "1 PC / 3 Years",
    status: "AVAILABLE",
    createdAt: "2026-09-01T10:00:00Z"
  },

  // Quick Heal Keys
  {
    id: "key-201",
    keyString: "QH-TS25-9988-7766-5544",
    productId: "prod-2",
    productTitle: "Quick Heal Total Security 2025",
    variantId: "v2-1",
    variantLabel: "1 PC / 1 Year",
    status: "SOLD",
    orderId: "ORD-94823",
    customerEmail: "amit.patel@gmail.com",
    customerName: "Amit Patel",
    soldAt: "2026-09-20T08:15:00Z",
    createdAt: "2026-09-02T11:00:00Z"
  },
  {
    id: "key-202",
    keyString: "QH-TS25-1122-3344-5566",
    productId: "prod-2",
    productTitle: "Quick Heal Total Security 2025",
    variantId: "v2-1",
    variantLabel: "1 PC / 1 Year",
    status: "AVAILABLE",
    createdAt: "2026-09-02T11:00:00Z"
  },
  {
    id: "key-203",
    keyString: "QH-TS25-7788-9900-AA11",
    productId: "prod-2",
    productTitle: "Quick Heal Total Security 2025",
    variantId: "v2-1",
    variantLabel: "1 PC / 1 Year",
    status: "AVAILABLE",
    createdAt: "2026-09-02T11:00:00Z"
  },
  {
    id: "key-204",
    keyString: "QH-TS25-BB22-CC33-DD44",
    productId: "prod-2",
    productTitle: "Quick Heal Total Security 2025",
    variantId: "v2-2",
    variantLabel: "1 PC / 3 Years",
    status: "AVAILABLE",
    createdAt: "2026-09-02T11:00:00Z"
  },
  {
    id: "key-205",
    keyString: "QH-TS25-EE55-FF66-GG77",
    productId: "prod-2",
    productTitle: "Quick Heal Total Security 2025",
    variantId: "v2-3",
    variantLabel: "3 PCs / 1 Year",
    status: "RESERVED",
    notes: "Reserved for corporate customer enquiry",
    createdAt: "2026-09-02T11:00:00Z"
  },

  // Norton Keys
  {
    id: "key-301",
    keyString: "NORT-360D-9988-1122-3344",
    productId: "prod-3",
    productTitle: "Norton 360 Deluxe 2025",
    variantId: "v3-1",
    variantLabel: "5 PCs / 1 Year",
    status: "SOLD",
    orderId: "ORD-94824",
    customerEmail: "sneha.iyer@yahoo.com",
    customerName: "Sneha Iyer",
    soldAt: "2026-09-20T09:30:00Z",
    createdAt: "2026-09-03T09:00:00Z"
  },
  {
    id: "key-302",
    keyString: "NORT-360D-5566-7788-9900",
    productId: "prod-3",
    productTitle: "Norton 360 Deluxe 2025",
    variantId: "v3-1",
    variantLabel: "5 PCs / 1 Year",
    status: "AVAILABLE",
    createdAt: "2026-09-03T09:00:00Z"
  },
  {
    id: "key-303",
    keyString: "NORT-360D-AA11-BB22-CC33",
    productId: "prod-3",
    productTitle: "Norton 360 Deluxe 2025",
    variantId: "v3-2",
    variantLabel: "5 PCs / 2 Years",
    status: "AVAILABLE",
    createdAt: "2026-09-03T09:00:00Z"
  },

  // McAfee Keys
  {
    id: "key-401",
    keyString: "MCAF-2025-8899-7744-1122",
    productId: "prod-4",
    productTitle: "McAfee Total Protection 2025",
    variantId: "v4-1",
    variantLabel: "1 PC / 1 Year",
    status: "SOLD",
    orderId: "ORD-94825",
    customerEmail: "vikas.singh@techcorp.in",
    customerName: "Vikas Singh",
    soldAt: "2026-09-20T10:10:00Z",
    createdAt: "2026-09-04T12:00:00Z"
  },
  {
    id: "key-402",
    keyString: "MCAF-2025-4455-6677-8899",
    productId: "prod-4",
    productTitle: "McAfee Total Protection 2025",
    variantId: "v4-1",
    variantLabel: "1 PC / 1 Year",
    status: "AVAILABLE",
    createdAt: "2026-09-04T12:00:00Z"
  },
  {
    id: "key-403",
    keyString: "MCAF-2025-1133-5577-9911",
    productId: "prod-4",
    productTitle: "McAfee Total Protection 2025",
    variantId: "v4-2",
    variantLabel: "3 PCs / 1 Year",
    status: "AVAILABLE",
    createdAt: "2026-09-04T12:00:00Z"
  },

  // Bitdefender Keys
  {
    id: "key-501",
    keyString: "BITD-2025-TS05-9988-1122",
    productId: "prod-5",
    productTitle: "Bitdefender Total Security 2025",
    variantId: "v5-1",
    variantLabel: "5 PCs / 1 Year",
    status: "AVAILABLE",
    createdAt: "2026-09-05T08:00:00Z"
  }
];

export const initialOrders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "ORD-94821",
    createdAt: "2026-09-19T14:22:00Z",
    customerName: "Rahul Sharma",
    customerEmail: "rahul.sharma@gmail.com",
    customerPhone: "+91 98765 43210",
    items: [
      {
        productId: "prod-1",
        productTitle: "Kaspersky Total Security 2025 Edition",
        productImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        brand: "Kaspersky",
        variant: { id: "v1-1", durationYears: 1, deviceCount: 1, mrp: 1999, sellingPrice: 699, discountPercent: 65, inStock: true },
        quantity: 1,
        pricePerUnit: 699,
        licenseKeys: ["KASP-2025-ABCD-9876-QWER"],
        officialDownloadUrl: "https://www.kaspersky.com/downloads"
      }
    ],
    subtotal: 699,
    discount: 50,
    tax: 0,
    totalAmount: 649,
    paymentMethod: "UPI / PhonePe",
    paymentStatus: "SUCCESS"
  },
  {
    id: "ord-2",
    orderNumber: "ORD-94822",
    createdAt: "2026-09-19T16:45:00Z",
    customerName: "Priya Verma",
    customerEmail: "priya.verma@outlook.com",
    customerPhone: "+91 98123 45678",
    items: [
      {
        productId: "prod-1",
        productTitle: "Kaspersky Total Security 2025 Edition",
        productImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        brand: "Kaspersky",
        variant: { id: "v1-2", durationYears: 1, deviceCount: 3, mrp: 2999, sellingPrice: 1199, discountPercent: 60, inStock: true },
        quantity: 1,
        pricePerUnit: 1199,
        licenseKeys: ["KASP-2025-MNOP-3344-DFGH"],
        officialDownloadUrl: "https://www.kaspersky.com/downloads"
      }
    ],
    subtotal: 1199,
    discount: 100,
    tax: 0,
    totalAmount: 1099,
    paymentMethod: "Credit Card (HDFC)",
    paymentStatus: "SUCCESS"
  },
  {
    id: "ord-3",
    orderNumber: "ORD-94823",
    createdAt: "2026-09-20T08:15:00Z",
    customerName: "Amit Patel",
    customerEmail: "amit.patel@gmail.com",
    customerPhone: "+91 97234 56789",
    items: [
      {
        productId: "prod-2",
        productTitle: "Quick Heal Total Security 2025",
        productImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        brand: "Quick Heal",
        variant: { id: "v2-1", durationYears: 1, deviceCount: 1, mrp: 2199, sellingPrice: 849, discountPercent: 61, inStock: true },
        quantity: 1,
        pricePerUnit: 849,
        licenseKeys: ["QH-TS25-9988-7766-5544"],
        officialDownloadUrl: "https://www.quickheal.co.in/installer"
      }
    ],
    subtotal: 849,
    discount: 0,
    tax: 0,
    totalAmount: 849,
    paymentMethod: "Paytm Wallet",
    paymentStatus: "SUCCESS"
  },
  {
    id: "ord-4",
    orderNumber: "ORD-94824",
    createdAt: "2026-09-20T09:30:00Z",
    customerName: "Sneha Iyer",
    customerEmail: "sneha.iyer@yahoo.com",
    customerPhone: "+91 98450 12345",
    items: [
      {
        productId: "prod-3",
        productTitle: "Norton 360 Deluxe 2025 (5 Devices)",
        productImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        brand: "Norton",
        variant: { id: "v3-1", durationYears: 1, deviceCount: 5, mrp: 3999, sellingPrice: 1299, discountPercent: 67, inStock: true },
        quantity: 1,
        pricePerUnit: 1299,
        licenseKeys: ["NORT-360D-9988-1122-3344"],
        officialDownloadUrl: "https://my.norton.com/setup"
      }
    ],
    subtotal: 1299,
    discount: 130,
    tax: 0,
    totalAmount: 1169,
    paymentMethod: "Google Pay UPI",
    paymentStatus: "SUCCESS"
  },
  {
    id: "ord-5",
    orderNumber: "ORD-94825",
    createdAt: "2026-09-20T10:10:00Z",
    customerName: "Vikas Singh",
    customerEmail: "vikas.singh@techcorp.in",
    customerPhone: "+91 99001 22334",
    items: [
      {
        productId: "prod-4",
        productTitle: "McAfee Total Protection 2025",
        productImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&auto=format&fit=crop&q=80",
        brand: "McAfee",
        variant: { id: "v4-1", durationYears: 1, deviceCount: 1, mrp: 1899, sellingPrice: 599, discountPercent: 68, inStock: true },
        quantity: 1,
        pricePerUnit: 599,
        licenseKeys: ["MCAF-2025-8899-7744-1122"],
        officialDownloadUrl: "https://www.mcafee.com/activate"
      }
    ],
    subtotal: 599,
    discount: 0,
    tax: 0,
    totalAmount: 599,
    paymentMethod: "Net Banking (SBI)",
    paymentStatus: "SUCCESS"
  }
];

export const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    totalOrders: 3,
    totalSpent: 2840,
    lastOrderDate: "2026-09-19",
    createdAt: "2026-03-12",
    status: "ACTIVE"
  },
  {
    id: "cust-2",
    name: "Priya Verma",
    email: "priya.verma@outlook.com",
    phone: "+91 98123 45678",
    totalOrders: 2,
    totalSpent: 2498,
    lastOrderDate: "2026-09-19",
    createdAt: "2026-05-20",
    status: "ACTIVE"
  },
  {
    id: "cust-3",
    name: "Amit Patel",
    email: "amit.patel@gmail.com",
    phone: "+91 97234 56789",
    totalOrders: 1,
    totalSpent: 849,
    lastOrderDate: "2026-09-20",
    createdAt: "2026-09-20",
    status: "ACTIVE"
  },
  {
    id: "cust-4",
    name: "Sneha Iyer",
    email: "sneha.iyer@yahoo.com",
    phone: "+91 98450 12345",
    totalOrders: 4,
    totalSpent: 4980,
    lastOrderDate: "2026-09-20",
    createdAt: "2026-01-15",
    status: "ACTIVE"
  },
  {
    id: "cust-5",
    name: "Vikas Singh",
    email: "vikas.singh@techcorp.in",
    phone: "+91 99001 22334",
    totalOrders: 1,
    totalSpent: 599,
    lastOrderDate: "2026-09-20",
    createdAt: "2026-09-20",
    status: "ACTIVE"
  }
];
