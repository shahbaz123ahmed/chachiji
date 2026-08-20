import { Coupon } from "@/types/ecommerce";

export const BRAND_INFO = {
  name: "Chachiji's Homemade Cuisine",
  shortName: "Chachiji",
  tagline: "Crafted by Heart. Rooted in Tradition.",
  subTagline: "Authentic handcrafted flavours from the heart of India, made in small batches and delivered to your home.",
  phone: "+91 88604 88004",
  whatsappNumber: "918860488004",
  whatsappFormatted: "+91 88604 88004",
  whatsappUrl: "https://wa.me/918860488004?text=Namaste%20Chachiji,%20I%20have%20an%20inquiry%20regarding%20authentic%20pickles%20and%20makhana.",
  email: "info@chachiji.in",
  address: {
    line1: "Ground Floor, Hajipur-Muzaffarpur Highway (NH 22)",
    landmark: "Near Sheet Basant Petrol Pump, Gorhia Chaman",
    milestone: "Mile Stone: 23/7",
    city: "Vaishali",
    state: "Bihar",
    pincode: "844114",
    country: "India",
  },
  fssaiNumber: "10426999000206",
  gstNumber: "10AEYPJ2255C3ZQ",
  socials: {
    instagram: "https://instagram.com/chachiji.in",
    facebook: "https://facebook.com/chachiji.in",
    whatsapp: "https://wa.me/918860488004",
  },
  operatingHours: "Monday to Saturday: 9:00 AM – 7:00 PM IST",
  freeShippingThreshold: 599,
  standardShippingFee: 49,
};

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "CHACHIJI10",
    discountType: "percentage",
    value: 10,
    minOrderValue: 499,
    description: "10% OFF on orders above ₹499",
  },
  {
    code: "MITHILA50",
    discountType: "fixed",
    value: 50,
    minOrderValue: 799,
    description: "Flat ₹50 OFF on orders above ₹799",
  },
  {
    code: "HERITAGE100",
    discountType: "fixed",
    value: 100,
    minOrderValue: 1299,
    description: "Flat ₹100 OFF on orders above ₹1299",
  },
];
