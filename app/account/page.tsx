"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/types/ecommerce";
import ProductCard from "@/components/product/ProductCard";
import {
  User,
  Package,
  Heart,
  MapPin,
  ArrowRight,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "orders";
  const redirectTarget = searchParams.get("redirect");

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user, isAuthenticated, login, signup, logout } = useAuth();

  // Auth form states for unauthenticated users
  const [authMode, setAuthMode] = useState<"login" | "signup">(redirectTarget ? "signup" : "login");
  const [authName, setAuthName] = useState("");
  const [authEmailOrPhone, setAuthEmailOrPhone] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.products) {
          setAllProducts(data.products);
        }
      })
      .catch(() => {});
  }, []);

  const wishlistedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    let res;
    if (authMode === "login") {
      if (!authEmailOrPhone.trim()) {
        setAuthError("Please enter your email or mobile number.");
        setAuthLoading(false);
        return;
      }
      res = await login(authEmailOrPhone, authPassword);
    } else {
      if (!authName.trim() || !authEmailOrPhone.trim()) {
        setAuthError("Please provide your full name and email.");
        setAuthLoading(false);
        return;
      }
      res = await signup(authName, authEmailOrPhone, authPhone || "9876543210", authPassword);
    }

    setAuthLoading(false);

    if (res && !res.success) {
      setAuthError(res.message || "Authentication failed. Please try again.");
    } else if (res && res.success) {
      // If user came from checkout, redirect right back to checkout!
      if (redirectTarget) {
        router.push(redirectTarget);
      }
    }
  };

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
          image: "/achaar-clean.png",
        },
      ],
    },
  ];

  // If NOT Logged In: Show Clean Customer Login / Sign Up Page
  if (!isAuthenticated || !user) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen py-12 sm:py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-[#FFF9F3] p-6 sm:p-8 rounded-3xl border-2 border-[#EFE7DD] shadow-sm space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <span className="inline-block bg-white border border-[#EFE7DD] text-[#8C201C] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-2xs">
                Chachiji Family Account
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
                {redirectTarget ? "Sign In to Checkout" : authMode === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-xs text-[#555555]">
                {redirectTarget
                  ? "Please sign in or create an account to complete your order."
                  : authMode === "login"
                  ? "Sign in to track orders, save addresses & manage wishlist."
                  : "Join the Chachiji family for seamless orders & special offers."}
              </p>
            </div>

            {/* Order Alert Banner if redirected from checkout */}
            {redirectTarget && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 font-semibold flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#8C201C] shrink-0" />
                <span>Your cart is saved! Sign in to proceed to delivery details.</span>
              </div>
            )}

            {/* Toggle Tabs */}
            <div className="flex rounded-xl bg-white p-1 border border-[#EFE7DD]">
              <button
                type="button"
                onClick={() => { setAuthMode("signup"); setAuthError(""); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  authMode === "signup"
                    ? "bg-[#8C201C] text-white shadow-xs"
                    : "text-[#555555] hover:text-[#231F20]"
                }`}
              >
                New Customer (Sign Up)
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode("login"); setAuthError(""); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  authMode === "login"
                    ? "bg-[#8C201C] text-white shadow-xs"
                    : "text-[#555555] hover:text-[#231F20]"
                }`}
              >
                Existing (Sign In)
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === "signup" && (
                <div>
                  <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                  Email Address or Mobile *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ramesh@example.com"
                  value={authEmailOrPhone}
                  onChange={(e) => setAuthEmailOrPhone(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                />
              </div>

              {authMode === "signup" && (
                <div>
                  <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                    Mobile Number (For Delivery Updates)
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                  Password (Optional)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                />
              </div>

              {authError && (
                <p className="text-xs text-[#8C201C] font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{authLoading ? "Authenticating..." : authMode === "login" ? "Sign In & Continue" : "Create Account & Continue"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-[11px] text-center text-[#777777]">
              🔒 Your data is protected by 256-bit encryption. Zero spam policy.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If Logged In: Show Full Customer Portal
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Account Header */}
        <div className="border-b border-[#EFE7DD] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Personal Account
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231F20] mt-1">
              Namaste, {user.name}
            </h1>
            <p className="text-xs text-[#555555] font-medium">
              {user.email || user.phone} • Manage your orders, saved addresses, and favorite Mithila flavours.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="bg-[#FFF9F3] px-4 py-2 rounded-xl border border-[#EFE7DD] text-xs text-[#231F20] font-bold flex items-center gap-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Privilege Member</span>
            </div>
            <button
              onClick={logout}
              className="bg-white hover:bg-[#FFF9F3] border border-[#EFE7DD] text-[#8C201C] text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 bg-[#FFFFFF] p-4 rounded-3xl border-2 border-[#EFE7DD] shadow-xs space-y-1.5">
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "wishlist"
                  ? "bg-[#8C201C] text-[#FFFFFF] shadow-sm"
                  : "text-[#231F20] hover:bg-[#FFF9F3]"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>My Wishlist ({wishlist.length})</span>
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
              <span>Profile Details</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border-2 border-[#EFE7DD] shadow-xs">
            {/* TAB: Orders */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#EFE7DD] pb-4">
                  <h2 className="font-serif text-xl font-bold text-[#231F20]">Order History</h2>
                  <span className="text-xs text-[#777777] font-medium">1 order placed</span>
                </div>

                <div className="space-y-4">
                  {mockPastOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE7DD] pb-3 text-xs">
                        <div>
                          <span className="font-bold text-[#231F20]">Order #{order.id}</span>
                          <span className="text-[#777777] ml-2">• {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            {order.status}
                          </span>
                          <span className="font-bold text-[#8C201C]">₹{order.total}</span>
                        </div>
                      </div>

                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#EFE7DD] shrink-0 p-1">
                            <Image src={item.image} alt={item.name} fill className="object-contain" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-serif text-xs sm:text-sm font-bold text-[#231F20]">{item.name}</h4>
                            <p className="text-[11px] text-[#777777]">{item.weight} • Qty: {item.quantity}</p>
                          </div>
                          <Link
                            href="/shop"
                            className="text-xs font-bold text-[#8C201C] hover:underline"
                          >
                            Reorder
                          </Link>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Wishlist */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#EFE7DD] pb-4">
                  <h2 className="font-serif text-xl font-bold text-[#231F20]">Saved Favourites</h2>
                  <span className="text-xs text-[#777777] font-medium">{wishlistedProducts.length} items</span>
                </div>

                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <Heart className="w-12 h-12 text-[#CCCCCC] mx-auto" />
                    <p className="text-sm font-bold text-[#231F20]">Your Wishlist is Empty</p>
                    <p className="text-xs text-[#777777] max-w-sm mx-auto">
                      Explore authentic handcrafted Bihari achar and Mithila makhana to save your favourites.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-1.5 bg-[#8C201C] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs hover:bg-[#6B1815] transition-all mt-2"
                    >
                      <span>Explore Flavours</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {wishlistedProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: Profile */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="border-b border-[#EFE7DD] pb-4">
                  <h2 className="font-serif text-xl font-bold text-[#231F20]">Customer Profile</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#FFF9F3] rounded-2xl border border-[#EFE7DD]">
                    <span className="text-[#777777] block mb-1 font-medium">Full Name</span>
                    <span className="font-bold text-[#231F20] text-sm">{user.name}</span>
                  </div>

                  <div className="p-4 bg-[#FFF9F3] rounded-2xl border border-[#EFE7DD]">
                    <span className="text-[#777777] block mb-1 font-medium">Email / Contact</span>
                    <span className="font-bold text-[#231F20] text-sm">{user.email || user.phone}</span>
                  </div>
                </div>
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
    <Suspense fallback={<div className="min-h-screen bg-white py-20 text-center text-xs">Loading account...</div>}>
      <AccountContent />
    </Suspense>
  );
}
