export type ProductCategory = string;

export interface SubCategoryInfo {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  hindiName?: string;
  headline?: string;
  description?: string;
  heroImage?: string;
  heroImages?: string[];
  imagePosition?: "right" | "left";
  textAlign?: "left" | "right";
  highlights?: string[];
}

export interface ProductVariant {
  id: string;
  weight: string; // e.g. "250g", "500g", "1kg"
  price: number;
  mrp: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  category: ProductCategory;
  subCategory?: string;
  tagline: string;
  shortDescription: string;
  description: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  weight: string;
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
  badges: string[]; // e.g. ["Bestseller", "Sun Cured", "Traditional Recipe", "GI Tag Region"]
  isBestseller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  inStock: boolean;
  stockCount?: number;
  ingredients: string[];
  spiceLevel?: "Mild" | "Medium" | "Hot & Tangy" | "Extra Spicy";
  shelfLife: string; // e.g. "12 Months from MFD"
  oilUsed?: string; // e.g. "100% Wood Cold-Pressed Mustard Oil"
  curingProcess?: string; // e.g. "14-Day Natural Sunlight Fermentation"
  harvestOrigin?: string; // e.g. "Vaishali & Darbhanga, Bihar"
  nutritionPer100g?: {
    energyKcal: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    sodiumMg: number;
  };
  pairings?: string[];
  storageInstructions?: string;
  whyYouWillLoveIt?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface CategoryInfo {
  id: ProductCategory;
  slug: string;
  name: string;
  hindiName: string;
  headline: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroImages?: string[];
  imagePosition?: "left" | "right" | "center";
  textAlign?: "left" | "right";
  hideText?: boolean;
  seoTitle: string;
  seoDescription: string;
  highlights: string[];
}

export interface BundleItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  mrp: number;
  discount: number;
  image: string;
  rating: number;
  reviewCount: number;
  includedProducts: string[];
  badges: string[];
  isBestseller?: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  productName: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  id: string; // `${productId}-${variantId}`
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  weight: string;
  price: number;
  mrp: number;
  image: string;
  quantity: number;
  category: ProductCategory;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  value: number;
  minOrderValue: number;
  description: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  weight: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "cod" | "online";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered" | "Cancelled";
  createdAt: string;
}

export interface HeroSlideItem {
  id: string;
  image: string;
  badge?: string;
  headingPrimary: string;
  headingSecondary: string;
  subtitle: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  imagePosition: "right" | "left" | "center";
  textAlign: "left" | "right";
  hideText?: boolean;
}

export interface HeroConfig {
  slides: HeroSlideItem[];
}

export interface AboutConfig {
  slides: HeroSlideItem[];
}
