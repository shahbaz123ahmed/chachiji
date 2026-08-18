"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import {
  User,
  Package,
  Heart,
  MapPin,
  ArrowRight,
} from "lucide-react";

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "orders";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const mockPastOrders = [
    {
      id: "CH-791024",
      date: "12 Feb 2026",
      status: "Delivered",
      total: 899,
      items: [
        {
          name: "Pickle Lover's Heritage 3-Jar Box",
          weight: "1.2kg (3 x 400g)",
          price: 899,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80",
        },
      ],
    },
    {
      id: "CH-649102",
      date: "18 Jan 2026",
      status: "Delivered",
      total: 738,
      items: [
        {
          name: "Mithila Bharwa Lal Mirch Achar",
          weight: "400g",
          price: 349,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Grade A+ Raw Mithila Phool Makhana",
          weight: "250g",
          price: 389,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Account Header */}
        <div className="border-b border-[rgba(51,51,51,0.10)] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Personal Account
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231F20] mt-1">
              Namaste, Food Connoisseur
            </h1>
            <p className="text-xs text-[#555555] font-medium">
              Manage your orders, saved addresses, and favorite Mithila flavours.
            </p>
          </div>

          <div className="bg-[#FFF9F3] px-4 py-2 rounded-xl border border-[rgba(51,51,51,0.10)] text-xs text-[#231F20] font-bold flex items-center gap-2 self-start sm:self-auto shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Chachiji Privilege Member</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 bg-[#FFFFFF] p-4 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-1.5">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "orders"
                  ? "bg-[#8C201C] text-[#FFFFFF] shadow-sm"
                  : "text-[#231F20] hover:bg-[#FFF9F3]"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Past Orders</span>
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "wishlist"
                  ? "bg-[#8C201C] text-[#FFFFFF] shadow-sm"
                  : "text-[#231F20] hover:bg-[#FFF9F3]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4" />
                <span>My Wishlist</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === "wishlist" ? "bg-white/20 text-white" : "bg-[#E07A4A] text-[#231F20]"
              }`}>
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "addresses"
                  ? "bg-[#8C201C] text-[#FFFFFF] shadow-sm"
                  : "text-[#231F20] hover:bg-[#FFF9F3]"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "profile"
                  ? "bg-[#8C201C] text-[#FFFFFF] shadow-sm"
                  : "text-[#231F20] hover:bg-[#FFF9F3]"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-9">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-[#231F20]">
                    Order History
                  </h3>
                  <Link
                    href="/track-order"
                    className="text-xs font-bold text-[#8C201C] hover:text-[#6B1815] flex items-center gap-1"
                  >
                    <span>Track with Order ID</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockPastOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#FFFFFF] rounded-3xl border-2 border-[rgba(51,51,51,0.10)] p-6 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(51,51,51,0.08)] pb-3 text-xs">
                        <div>
                          <span className="font-bold text-[#231F20] text-sm">Order #{order.id}</span>
                          <span className="text-[#555555] font-medium ml-2">• Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-bold text-xs">
                            {order.status}
                          </span>
                          <span className="font-serif text-lg font-bold text-[#8C201C]">₹{order.total}</span>
                        </div>
                      </div>

                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#FFF9F3] border border-[rgba(51,51,51,0.10)]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-base font-bold text-[#231F20] truncate">
                              {item.name}
                            </h4>
                            <span className="text-xs text-[#555555] font-medium">
                              {item.weight} • Qty: {item.quantity}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              const prod = PRODUCTS.find((p) => p.name === item.name);
                              if (prod) addToCart(prod);
                            }}
                            className="bg-[#FFF9F3] hover:bg-[#E07A4A] text-[#231F20] text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-2xs"
                          >
                            Reorder
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#231F20]">
                  My Saved Flavours ({wishlistedProducts.length})
                </h3>

                {wishlistedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistedProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#FFF9F3] p-10 rounded-3xl border border-[rgba(51,51,51,0.10)] text-center shadow-xs">
                    <Heart className="w-10 h-10 text-[#8C201C] mx-auto mb-2" />
                    <p className="font-serif text-xl font-bold text-[#231F20]">
                      No flavours saved yet
                    </p>
                    <p className="text-xs text-[#555555] font-medium mb-4">
                      Browse our handcrafted pickles and makhana to save your favorites.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-1.5 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs px-6 py-3 rounded-xl shadow-md"
                    >
                      <span>Explore Shop</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#231F20]">
                  Saved Addresses
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#FFFFFF] p-5 rounded-2xl border-2 border-[#8C201C] shadow-xs relative">
                    <span className="bg-[#8C201C] text-[#FFFFFF] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md absolute top-4 right-4">
                      Default Delivery
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#231F20] mb-1">
                      Ramesh Sharma
                    </h4>
                    <p className="text-xs text-[#555555] font-medium leading-relaxed mb-3">
                      Flat 302, Green Meadows Apartment, MG Road, Patna, Bihar - 800001
                      <br />
                      Phone: +91 98765 43210
                    </p>
                    <button className="text-xs font-bold text-[#8C201C] hover:underline">
                      Edit Address
                    </button>
                  </div>

                  <div className="bg-[#FFF9F3] p-5 rounded-2xl border-2 border-dashed border-[rgba(51,51,51,0.20)] flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-[#E07A4A]/40 transition-colors">
                    <MapPin className="w-6 h-6 text-[#8C201C] mb-1" />
                    <span className="text-xs font-bold text-[#231F20]">
                      + Add New Delivery Address
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === "profile" && (
              <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#231F20]">
                  Personal Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#231F20] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Ramesh Sharma"
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#231F20] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="ramesh@example.com"
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#231F20] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 9876543210"
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#231F20] mb-1">
                      Preferred Language
                    </label>
                    <select className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#231F20] font-bold focus:outline-none focus:border-[#8C201C]">
                      <option>English</option>
                      <option>Hindi (हिंदी)</option>
                      <option>Maithili (मैथिली)</option>
                    </select>
                  </div>
                </div>

                <button className="bg-[#8C201C] text-[#FFFFFF] font-bold text-xs px-6 py-3 rounded-xl hover:bg-[#6B1815] transition-colors shadow-md">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FFFFFF] min-h-screen py-20 text-center font-serif text-lg text-[#8C201C]">
          Loading Account...
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}

