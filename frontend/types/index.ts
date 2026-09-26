export type Brand =
  | "Quick Heal"
  | "Kaspersky"
  | "Norton"
  | "McAfee"
  | "Bitdefender"
  | "Malwarebytes"
  | "AVG"
  | "Avast"
  | "ESET";

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

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  likes: number;
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
  reviews: Review[];
  isAssured: boolean;
  isHotDeal?: boolean;
  isBestSeller?: boolean;
  activationSteps: string[];
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
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
  paymentStatus: "SUCCESS" | "PENDING" | "FAILED";
}

export interface FilterState {
  categories: SecurityCategory[];
  brands: Brand[];
  deviceCounts: number[];
  validities: number[];
  osList: OperatingSystem[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  searchQuery: string;
  sortBy: "relevance" | "popularity" | "price_asc" | "price_desc" | "newest";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isPlusMember?: boolean;
  createdAt: string;
}

