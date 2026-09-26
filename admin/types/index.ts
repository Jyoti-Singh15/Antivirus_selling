export type Brand =
  | "Quick Heal"
  | "Kaspersky"
  | "Norton"
  | "McAfee"
  | "Bitdefender";

export type SecurityCategory =
  | "Total Security"
  | "Internet Security"
  | "Antivirus Pro"
  | "Mobile Security"
  | "Multi-Device"
  | "Business / Server";

export type OperatingSystem = "Windows" | "macOS" | "Android" | "iOS";

export interface ProductVariant {
  id: string;
  durationYears: number; // 1, 2, 3
  deviceCount: number; // 1, 3, 5, 10
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  inStock: boolean;
  isDefault?: boolean;
}

export interface SystemRequirements {
  os: string;
  processor: string;
  ram: string;
  diskSpace: string;
  internetConnection: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: Brand;
  category: SecurityCategory;
  tagline: string;
  description: string;
  keyFeatures: string[];
  images: string[];
  supportedOS: OperatingSystem[];
  variants: ProductVariant[];
  systemRequirements: SystemRequirements;
  officialDownloadUrl: string;
  rating: number;
  ratingCount: number;
  reviewCount: number;
  isAssured: boolean;
  isHotDeal?: boolean;
  isBestSeller?: boolean;
  activationSteps: string[];
}

export type KeyStatus = "AVAILABLE" | "SOLD" | "RESERVED";

export interface LicenseKey {
  id: string;
  keyString: string;
  productId: string;
  productTitle: string;
  variantId: string;
  variantLabel: string; // e.g., "1 PC / 1 Year"
  status: KeyStatus;
  orderId?: string;
  customerEmail?: string;
  customerName?: string;
  soldAt?: string;
  createdAt: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  brand: Brand;
  variant: ProductVariant;
  quantity: number;
  pricePerUnit: number;
  licenseKeys: string[];
  officialDownloadUrl: string;
}

export type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED" | "REFUNDED";

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  createdAt: string;
  status: "ACTIVE" | "INACTIVE";
}
