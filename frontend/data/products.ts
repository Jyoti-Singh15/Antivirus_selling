import { Product } from "@/types";

export const PRODUCTS_DATA: Product[] = [
  {
    id: "prod-qh-ts",
    slug: "quick-heal-total-security",
    title: "Quick Heal Total Security - Latest Edition (Email Delivery in 2 Hours)",
    brand: "Quick Heal",
    category: "Total Security",
    tagline: "Comprehensive 360° protection against ransomware, malware, spyware, and phishing threats for your PC.",
    description: "Quick Heal Total Security provides complete security for your laptops and desktop computers. It ensures robust protection against malicious cyber threats, secures your financial transactions with Safe Banking, protects your webcam from spying, and optimizes system speed with smart PC tune-up tools.",
    keyFeatures: [
      "Ransomware Protection with Automated Backup & Restore",
      "Safe Banking for secure online shopping & net banking",
      "Webcam Protection prevents unauthorized camera access",
      "Parental Control & Safe Search for kids",
      "Anti-Tracker & Data Theft Protection",
      "Track your laptop in case of loss or theft"
    ],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android"],
    variants: [
      { id: "qh-ts-1y-1pc", durationYears: 1, deviceCount: 1, mrp: 1899, sellingPrice: 489, discountPercent: 74, inStock: true, isDefault: true },
      { id: "qh-ts-1y-3pc", durationYears: 1, deviceCount: 3, mrp: 3499, sellingPrice: 949, discountPercent: 73, inStock: true },
      { id: "qh-ts-3y-1pc", durationYears: 3, deviceCount: 1, mrp: 3999, sellingPrice: 1199, discountPercent: 70, inStock: true },
      { id: "qh-ts-3y-3pc", durationYears: 3, deviceCount: 3, mrp: 6999, sellingPrice: 2199, discountPercent: 68, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1 / 7 (32-bit & 64-bit)",
      processor: "1 GHz or faster (32-bit or 64-bit)",
      ram: "2 GB minimum for 32-bit, 4 GB recommended for 64-bit",
      diskSpace: "2.5 GB free hard disk space",
      internetConnection: true
    },
    officialDownloadUrl: "https://www.quickheal.co.in/installer",
    rating: 4.6,
    ratingCount: 18450,
    reviewCount: 3240,
    isAssured: true,
    isHotDeal: true,
    isBestSeller: true,
    activationSteps: [
      "Download the official Quick Heal setup installer from the link provided in your order confirmation.",
      "Run the downloaded .exe installer and complete the setup wizard.",
      "When prompted during or after installation, select 'Register Now'.",
      "Enter your 20-character Product Key provided on your screen / email and your contact details.",
      "Click 'Activate' - your PC is now fully safeguarded!"
    ],
    reviews: [
      {
        id: "rev-1",
        userName: "Rajesh Sharma",
        rating: 5,
        date: "12 August 2026",
        title: "Genuine key, activated within 1 minute!",
        comment: "Received the license key instantly on screen after payment. Downloaded from official Quick Heal site and activated without any problem. 1 Year validity showing correctly.",
        verifiedBuyer: true,
        likes: 142
      },
      {
        id: "rev-2",
        userName: "Amit Verma",
        rating: 5,
        date: "04 September 2026",
        title: "Best price compared to retail shops",
        comment: "Local store was charging ₹1400 for 1 PC 1 Year. Got it here at just ₹489. Works smoothly on Windows 11.",
        verifiedBuyer: true,
        likes: 89
      }
    ]
  },
  {
    id: "prod-kas-ts",
    slug: "kaspersky-plus-total-security",
    title: "Kaspersky Plus / Total Security - Multi-Device Antivirus & Privacy Protection",
    brand: "Kaspersky",
    category: "Total Security",
    tagline: "Next-generation cybersecurity with award-winning antivirus, unlimited fast VPN, and identity protection.",
    description: "Kaspersky Plus delivers multi-layered protection against viruses, ransomware, hackers, and zero-day cyber threats. Features real-time anti-phishing, ultra-fast VPN, performance optimizer to clear junk files, and hardened payment browser.",
    keyFeatures: [
      "Award-winning Real-time Anti-Virus & Anti-Phishing",
      "Unlimited High-Speed Smart VPN",
      "Hardened Safe Money Browser for Banking",
      "Password Manager & Data Leak Checker",
      "Smart Performance Optimizer & Disk Space Cleaner",
      "Wi-Fi Network Security Scanner"
    ],
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    variants: [
      { id: "kas-1y-1pc", durationYears: 1, deviceCount: 1, mrp: 2199, sellingPrice: 599, discountPercent: 72, inStock: true, isDefault: true },
      { id: "kas-1y-3pc", durationYears: 1, deviceCount: 3, mrp: 3999, sellingPrice: 1149, discountPercent: 71, inStock: true },
      { id: "kas-2y-1pc", durationYears: 2, deviceCount: 1, mrp: 3499, sellingPrice: 999, discountPercent: 71, inStock: true },
      { id: "kas-3y-3pc", durationYears: 3, deviceCount: 3, mrp: 7499, sellingPrice: 2499, discountPercent: 66, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1, macOS 11+, Android 8.0+, iOS 15+",
      processor: "1.6 GHz or higher",
      ram: "2 GB RAM (Windows), 4 GB RAM (Mac)",
      diskSpace: "2.7 GB available hard drive space",
      internetConnection: true
    },
    officialDownloadUrl: "https://www.kaspersky.com/downloads",
    rating: 4.8,
    ratingCount: 24120,
    reviewCount: 4890,
    isAssured: true,
    isHotDeal: true,
    isBestSeller: true,
    activationSteps: [
      "Visit my.kaspersky.com or open your installed Kaspersky app.",
      "Sign in or create a free Kaspersky account.",
      "Click 'Enter Activation Code' or 'Subscriptions'.",
      "Enter the 20-character license key (XXXXX-XXXXX-XXXXX-XXXXX).",
      "Download the installer linked directly to your subscription."
    ],
    reviews: [
      {
        id: "rev-3",
        userName: "Pooja Hegde",
        rating: 5,
        date: "28 July 2026",
        title: "Kaspersky never lets you down",
        comment: "Key synced automatically with my.kaspersky account. Super light on RAM, does not slow down my laptop during gaming.",
        verifiedBuyer: true,
        likes: 95
      }
    ]
  },
  {
    id: "prod-nor-360",
    slug: "norton-360-deluxe",
    title: "Norton 360 Deluxe - Comprehensive Cyber Protection with Cloud Backup & Secure VPN",
    brand: "Norton",
    category: "Total Security",
    tagline: "Multiple layers of protection for your devices, online privacy with Secure VPN, and 50GB Cloud Backup.",
    description: "Norton 360 Deluxe gives you comprehensive malware protection for up to 5 PCs, Macs, Android or iOS devices, including 50GB of secure PC cloud backup and Secure VPN for your all-round privacy.",
    keyFeatures: [
      "Multi-layered Malware, Spyware & Ransomware Defense",
      "50 GB Secure PC Cloud Backup",
      "No-Log Secure VPN for WiFi Privacy",
      "Smart Firewall for PC and Mac",
      "Dark Web Monitoring powered by LifeLock",
      "SafeCam alerts you to unauthorized webcam attempts"
    ],
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    variants: [
      { id: "nor-1y-1pc", durationYears: 1, deviceCount: 1, mrp: 2499, sellingPrice: 699, discountPercent: 72, inStock: true, isDefault: true },
      { id: "nor-1y-3pc", durationYears: 1, deviceCount: 3, mrp: 4499, sellingPrice: 1299, discountPercent: 71, inStock: true },
      { id: "nor-1y-5pc", durationYears: 1, deviceCount: 5, mrp: 5999, sellingPrice: 1699, discountPercent: 71, inStock: true },
      { id: "nor-3y-3pc", durationYears: 3, deviceCount: 3, mrp: 8999, sellingPrice: 2899, discountPercent: 67, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8, macOS current and previous 2 versions, Android 8+, iOS 14+",
      processor: "1 GHz processor",
      ram: "2 GB RAM for Windows",
      diskSpace: "300 MB free space for core installer",
      internetConnection: true
    },
    officialDownloadUrl: "https://my.norton.com/setup",
    rating: 4.7,
    ratingCount: 15890,
    reviewCount: 2980,
    isAssured: true,
    isHotDeal: true,
    isBestSeller: false,
    activationSteps: [
      "Go to my.norton.com/setup in any browser.",
      "Sign in or click 'Create an Account'.",
      "Enter the 25-character Product Key shown on your screen.",
      "Follow on-screen instructions to download & activate Norton."
    ],
    reviews: [
      {
        id: "rev-4",
        userName: "Vikas Patel",
        rating: 5,
        date: "02 September 2026",
        title: "Cloud backup and VPN work flawlessly",
        comment: "The 50GB cloud backup is a lifesaver for all my office documents. Fast key dispatch.",
        verifiedBuyer: true,
        likes: 67
      }
    ]
  },
  {
    id: "prod-mca-tp",
    slug: "mcafee-total-protection",
    title: "McAfee Total Protection - Ultimate Antivirus, Identity Shield & Web Security",
    brand: "McAfee",
    category: "Total Security",
    tagline: "Premium protection for your data, identity, and privacy across all your PCs, Macs, smartphones & tablets.",
    description: "McAfee Total Protection provides trusted antivirus and privacy protection across all your devices. Includes automated scam protection, secure VPN, web protection against malicious downloads, and file shredder.",
    keyFeatures: [
      "Advanced Antivirus & Ransomware Shield",
      "Automated Scam & Dangerous Link Protection",
      "Secure Unlimited VPN for Public Wi-Fi",
      "Identity Protection & Dark Web Breach Alerts",
      "File Shredder permanently deletes sensitive files",
      "McAfee QuickClean tool to optimize PC speed"
    ],
    images: [
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    variants: [
      { id: "mca-1y-1pc", durationYears: 1, deviceCount: 1, mrp: 1999, sellingPrice: 399, discountPercent: 80, inStock: true, isDefault: true },
      { id: "mca-1y-3pc", durationYears: 1, deviceCount: 3, mrp: 3499, sellingPrice: 799, discountPercent: 77, inStock: true },
      { id: "mca-1y-5pc", durationYears: 1, deviceCount: 5, mrp: 4999, sellingPrice: 1099, discountPercent: 78, inStock: true },
      { id: "mca-3y-1pc", durationYears: 3, deviceCount: 1, mrp: 4499, sellingPrice: 899, discountPercent: 80, inStock: true },
      { id: "mca-3y-3pc", durationYears: 3, deviceCount: 3, mrp: 7999, sellingPrice: 1799, discountPercent: 77, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 (64-bit), macOS 10.15+, Android 7+, iOS 13+",
      processor: "1 GHz Processor",
      ram: "2 GB RAM",
      diskSpace: "1.3 GB available hard drive space",
      internetConnection: true
    },
    officialDownloadUrl: "https://www.mcafee.com/activate",
    rating: 4.5,
    ratingCount: 31200,
    reviewCount: 5670,
    isAssured: true,
    isHotDeal: true,
    isBestSeller: true,
    activationSteps: [
      "Open your web browser and go to www.mcafee.com/activate",
      "Type in your 25-digit activation code (provided upon purchase).",
      "Enter your email address to link the license to your McAfee account.",
      "Click 'Download' and follow instructions to install on your PC."
    ],
    reviews: [
      {
        id: "rev-5",
        userName: "Sanjay Gupta",
        rating: 5,
        date: "10 September 2026",
        title: "Unbeatable price of ₹399!",
        comment: "Great deal! Activated on mcafee.com/activate smoothly. Full 1 year validity. Recommended!",
        verifiedBuyer: true,
        likes: 121
      }
    ]
  },
  {
    id: "prod-bit-ts",
    slug: "bitdefender-total-security",
    title: "Bitdefender Total Security - Industry Leading Multi-Platform Antivirus & Zero Slowdown",
    brand: "Bitdefender",
    category: "Total Security",
    tagline: "Ranked #1 in independent test labs for maximum malware detection without impacting system battery or speed.",
    description: "Bitdefender Total Security delivers top-tier protection against e-threats across all major operating systems. It features multi-layer ransomware protection, complete real-time data protection, and advanced parental advisor.",
    keyFeatures: [
      "#1 Rated Malware Protection engine worldwide",
      "Zero Performance Impact with Bitdefender Photon technology",
      "Multi-Layer Ransomware Protection & Remediation",
      "Network Threat Prevention & Anti-Phishing",
      "Comprehensive Parental Controls",
      "Microphone & Webcam Hijack Monitor"
    ],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    variants: [
      { id: "bit-1y-1pc", durationYears: 1, deviceCount: 1, mrp: 2299, sellingPrice: 549, discountPercent: 76, inStock: true, isDefault: true },
      { id: "bit-1y-3pc", durationYears: 1, deviceCount: 3, mrp: 3999, sellingPrice: 1099, discountPercent: 72, inStock: true },
      { id: "bit-1y-5pc", durationYears: 1, deviceCount: 5, mrp: 5499, sellingPrice: 1499, discountPercent: 72, inStock: true },
      { id: "bit-3y-3pc", durationYears: 3, deviceCount: 3, mrp: 7999, sellingPrice: 2399, discountPercent: 70, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1 / 7 with SP1, macOS 10.14+, Android 5.0+, iOS 12+",
      processor: "Dual Core 1.6 GHz processor",
      ram: "2 GB RAM",
      diskSpace: "2.5 GB free space on hard disk",
      internetConnection: true
    },
    officialDownloadUrl: "https://central.bitdefender.com",
    rating: 4.9,
    ratingCount: 19400,
    reviewCount: 3870,
    isAssured: true,
    isHotDeal: true,
    isBestSeller: false,
    activationSteps: [
      "Visit central.bitdefender.com and log in or register an account.",
      "Navigate to 'My Subscriptions' on the left sidebar.",
      "Click '+ Activate with code' and enter your license key.",
      "Click 'Install Bitdefender' on your device."
    ],
    reviews: [
      {
        id: "rev-6",
        userName: "Karan Johar",
        rating: 5,
        date: "08 September 2026",
        title: "The best antivirus ever made",
        comment: "I am a programmer and gamer. Bitdefender is silent, does not popup unnecessary ads, and key activation was instantaneous.",
        verifiedBuyer: true,
        likes: 154
      }
    ]
  },
  {
    id: "prod-mb-prem",
    slug: "malwarebytes-premium",
    title: "Malwarebytes Premium - Advanced Cyber Threat & Zero-Hour Malware Cleaning",
    brand: "Malwarebytes",
    category: "Antivirus Pro",
    tagline: "Crushes malware, ransomware, and spyware that other traditional antivirus tools miss.",
    description: "Malwarebytes Premium cleans infected devices, shields vulnerable systems, and proactively blocks unknown zero-hour threats, phishing scams, and malicious websites before damage occurs.",
    keyFeatures: [
      "Cleans infections that traditional antivirus programs miss",
      "Proactive Real-time Shield against Zero-Day exploits",
      "Stops Ransomware dead in its tracks",
      "Malicious Website & Phishing Blocker",
      "Fast, lightweight scans with minimal CPU footprint"
    ],
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80"
    ],
    supportedOS: ["Windows", "macOS", "Android", "iOS"],
    variants: [
      { id: "mb-1y-1pc", durationYears: 1, deviceCount: 1, mrp: 2999, sellingPrice: 799, discountPercent: 73, inStock: true, isDefault: true },
      { id: "mb-1y-3pc", durationYears: 1, deviceCount: 3, mrp: 4999, sellingPrice: 1499, discountPercent: 70, inStock: true },
      { id: "mb-2y-1pc", durationYears: 2, deviceCount: 1, mrp: 4499, sellingPrice: 1299, discountPercent: 71, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1 / 7 (32/64 bit), macOS 10.12+, Android 7+",
      processor: "800 MHz or faster with SSE2 technology",
      ram: "2 GB RAM",
      diskSpace: "250 MB free disk space",
      internetConnection: true
    },
    officialDownloadUrl: "https://www.malwarebytes.com/mwb-download",
    rating: 4.8,
    ratingCount: 11200,
    reviewCount: 2190,
    isAssured: true,
    isHotDeal: false,
    isBestSeller: false,
    activationSteps: [
      "Download Malwarebytes from malwarebytes.com/mwb-download and install.",
      "Click the 'Activate License' key icon on the top-right of the dashboard.",
      "Enter your License Key and click Activate.",
      "Premium protection features will turn ON immediately."
    ],
    reviews: [
      {
        id: "rev-7",
        userName: "Devendra Singh",
        rating: 5,
        date: "01 September 2026",
        title: "Saved my laptop from a terrible malware attack",
        comment: "Windows Defender was not detecting a browser redirect virus. Malwarebytes cleaned it in 2 minutes. Key worked instantly.",
        verifiedBuyer: true,
        likes: 78
      }
    ]
  },
  {
    id: "prod-qh-is",
    slug: "quick-heal-internet-security",
    title: "Quick Heal Internet Security - Safe Surfing, Net Banking & Phishing Defense",
    brand: "Quick Heal",
    category: "Internet Security",
    tagline: "Essential online protection that shields your browsing, personal data, and downloads.",
    description: "Quick Heal Internet Security protects your PC from threats that originate from the Internet. Safe banking keeps your credit card numbers secure, while smart firewall blocks hackers from entering your home Wi-Fi.",
    keyFeatures: [
      "Robust Web & Phishing Protection",
      "Safe Banking environment for financial transactions",
      "Smart Firewall & Wi-Fi Protection",
      "Email Security against malicious attachments",
      "Automated Silent Gaming / Work Mode"
    ],
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    ],
    supportedOS: ["Windows"],
    variants: [
      { id: "qh-is-1y-1pc", durationYears: 1, deviceCount: 1, mrp: 1499, sellingPrice: 389, discountPercent: 74, inStock: true, isDefault: true },
      { id: "qh-is-1y-3pc", durationYears: 1, deviceCount: 3, mrp: 2799, sellingPrice: 799, discountPercent: 71, inStock: true },
      { id: "qh-is-3y-1pc", durationYears: 3, deviceCount: 1, mrp: 2999, sellingPrice: 899, discountPercent: 70, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1 / 7 (32/64 bit)",
      processor: "1 GHz processor",
      ram: "2 GB RAM",
      diskSpace: "2.1 GB free space",
      internetConnection: true
    },
    officialDownloadUrl: "https://www.quickheal.co.in/installer",
    rating: 4.6,
    ratingCount: 14200,
    reviewCount: 1980,
    isAssured: true,
    isHotDeal: false,
    isBestSeller: false,
    activationSteps: [
      "Download the installer from quickheal.co.in/installer.",
      "Install and launch Quick Heal.",
      "Click 'Register Now' and paste your 20-digit key.",
      "Done! Internet Security is activated."
    ],
    reviews: [
      {
        id: "rev-8",
        userName: "Deepak S.",
        rating: 4,
        date: "22 August 2026",
        title: "Very light on system",
        comment: "Using on my old i3 laptop, works like a charm. Got key within 5 seconds of payment.",
        verifiedBuyer: true,
        likes: 34
      }
    ]
  },
  {
    id: "prod-eset-nod",
    slug: "eset-nod32-antivirus",
    title: "ESET NOD32 Antivirus - Ultra-Lightweight & Powerful Gamer-Grade Protection",
    brand: "ESET",
    category: "Antivirus Pro",
    tagline: "Legendary NOD32 engine delivers world-class speed, zero lag, and unbeatable zero-day threat defense.",
    description: "ESET NOD32 Antivirus shields your Windows and macOS systems from viruses, ransomware, worms, and spyware with minimal CPU overhead. Perfect for gaming, streaming, and creative workstations.",
    keyFeatures: [
      "Legendary Antivirus & Antispyware Engine",
      "Anti-Phishing & Exploit Blocker",
      "Advanced Memory Scanner & UEFI Scanner",
      "Gamer Mode for zero interruption during games",
      "Extremely Low System Resource Usage"
    ],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    ],
    supportedOS: ["Windows", "macOS"],
    variants: [
      { id: "eset-1y-1pc", durationYears: 1, deviceCount: 1, mrp: 1799, sellingPrice: 449, discountPercent: 75, inStock: true, isDefault: true },
      { id: "eset-1y-3pc", durationYears: 1, deviceCount: 3, mrp: 3199, sellingPrice: 899, discountPercent: 72, inStock: true },
      { id: "eset-3y-1pc", durationYears: 3, deviceCount: 1, mrp: 3499, sellingPrice: 999, discountPercent: 71, inStock: true }
    ],
    systemRequirements: {
      os: "Windows 11 / 10 / 8.1, macOS 11+",
      processor: "1 GHz Intel or AMD 64-bit",
      ram: "512 MB RAM (1 GB recommended)",
      diskSpace: "350 MB free space",
      internetConnection: true
    },
    officialDownloadUrl: "https://www.eset.com/in/download/home",
    rating: 4.8,
    ratingCount: 9400,
    reviewCount: 1450,
    isAssured: true,
    isHotDeal: false,
    isBestSeller: false,
    activationSteps: [
      "Download the installer from eset.com/in/download/home.",
      "Install ESET NOD32.",
      "When prompted for license, select 'Use a purchased License Key'.",
      "Paste your 20-digit key and click Activate."
    ],
    reviews: [
      {
        id: "rev-9",
        userName: "Gaurav Malhotra",
        rating: 5,
        date: "14 August 2026",
        title: "Best for gaming PCs!",
        comment: "No fps drops while playing Valorant and GTA. Highly recommended if you want lightweight protection.",
        verifiedBuyer: true,
        likes: 56
      }
    ]
  }
];

export const TOP_BRANDS = [
  { name: "Quick Heal", logo: "🛡️", count: 4, discountText: "Up to 74% Off" },
  { name: "Kaspersky", logo: "🔒", count: 6, discountText: "Up to 72% Off" },
  { name: "Norton", logo: "⚡", count: 5, discountText: "Up to 72% Off" },
  { name: "McAfee", logo: "🌐", count: 8, discountText: "Up to 80% Off" },
  { name: "Bitdefender", logo: "🚀", count: 4, discountText: "Up to 76% Off" },
  { name: "Malwarebytes", logo: "🦠", count: 3, discountText: "Up to 73% Off" },
  { name: "ESET", logo: "🎯", count: 3, discountText: "Up to 75% Off" }
];
