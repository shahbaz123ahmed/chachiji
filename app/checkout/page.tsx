"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  ChevronRight,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, shippingFee, totalAmount, clearCart } =
    useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    firstName: "",
    lastName: "",
    address: "Flat 302, Green Meadows Apartment, MG Road",
    apartment: "Tower B",
    city: "Patna",
    state: "Bihar",
    pincode: "800001",
    phone: "9876543210",
    paymentMethod: "cod",
    giftWrap: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState("");

  // REDIRECT IF NOT AUTHENTICATED: Must login or register to place order
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account?redirect=/checkout");
    }
  }, [isAuthenticated, router]);

  // Sync user details to formData when user logs in
  useEffect(() => {
    if (user) {
      const parts = (user.name || "Valued Customer").split(" ");
      setFormData((prev) => ({
        ...prev,
        firstName: parts[0] || "Customer",
        lastName: parts.slice(1).join(" ") || "",
        emailOrPhone: user.email || user.phone || prev.emailOrPhone,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError("");

    if (!isAuthenticated || !user) {
      router.push("/account?redirect=/checkout");
      return;
    }

    setIsProcessing(true);

    try {
      const orderPayload = {
        customerName: `${formData.firstName} ${formData.lastName}`.trim() || user.name,
        customerEmail: user.email || formData.emailOrPhone,
        customerPhone: formData.phone || user.phone || "9876543210",
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        items: cart.map((i) => ({
          productId: i.product?.id || i.id,
          productName: i.product?.name || i.name,
          image: Array.isArray(i.product?.images) && i.product.images.length > 0 ? i.product.images[0] : "/achaar-clean.png",
          weight: i.variant?.weight || "400g",
          price: i.variant?.price || 249,
          quantity: i.quantity || 1,
        })),
        subtotal,
        discount: discountAmount,
        shippingFee,
        totalAmount,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success && data.order) {
        clearCart();
        const waParam = data.whatsappUrl ? `&wa=${encodeURIComponent(data.whatsappUrl)}` : "";
        router.push(`/order-confirmation?orderId=${data.order.id}${waParam}`);
      } else {
        setOrderError(data.message || "Failed to place order. Please try again.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      setOrderError("Network error. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen py-20 text-center">
        <div className="max-w-md mx-auto bg-[#FFF9F3] p-8 rounded-3xl border border-[#EFE7DD] shadow-sm space-y-4">
          <span className="w-6 h-6 border-2 border-[#8C201C] border-t-transparent rounded-full animate-spin inline-block" />
          <h2 className="font-serif text-xl font-bold text-[#231F20]">
            Redirecting to Sign In...
          </h2>
          <p className="text-xs text-[#555555]">
            Please sign in or create an account to complete your order.
          </p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen py-20 text-center">
        <div className="max-w-md mx-auto bg-[#FFF9F3] p-8 rounded-3xl border border-[#EFE7DD] shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#231F20] mb-2">
            No items in checkout
          </h2>
          <p className="text-xs text-[#555555] font-medium mb-6">
            Please add handcrafted products to your basket before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#8C201C] text-[#FFFFFF] text-xs font-bold px-6 py-3.5 rounded-xl shadow-md hover:bg-[#6B1815] transition-colors"
          >
            <span>Explore Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header / Stepper */}
        <div className="border-b border-[#EFE7DD] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Distraction-Free
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20] mt-0.5">
              Secure Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#231F20]">
            <span className="text-[#8C201C]">Cart</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
            <span className="text-[#8C201C]">Shipping &amp; Details</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
            <span className="text-[#777777]">Payment</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Input Forms */}
            <div className="lg:col-span-7 space-y-6">

              {/* Customer Account Verified Card */}
              {user && (
                <div className="bg-[#FFF9F3] p-5 rounded-3xl border-2 border-[#EFE7DD] shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#8C201C]/20 flex items-center justify-center text-[#8C201C] font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-xs text-[#231F20]">{user.name}</p>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Logged In
                        </span>
                      </div>
                      <p className="text-[11px] text-[#777777]">{user.email || user.phone}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="text-xs font-bold text-[#8C201C] hover:underline cursor-pointer"
                  >
                    Switch Account
                  </button>
                </div>
              )}

              {/* STEP 1: Delivery & Shipping Address */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[#EFE7DD] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#EFE7DD] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#231F20] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#8C201C] text-[#FFFFFF] text-xs flex items-center justify-center font-sans font-bold">
                      1
                    </span>
                    <span>Delivery Address</span>
                  </h3>
                  <span className="text-[11px] text-[#777777] font-medium">Safe glass-jar packaging</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                    Street Address &amp; House / Flat No. *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] font-bold text-[#231F20] uppercase tracking-wider mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FFFFFF] border border-[#EFE7DD] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: Payment Method */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[#EFE7DD] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#EFE7DD] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#231F20] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#8C201C] text-[#FFFFFF] text-xs flex items-center justify-center font-sans font-bold">
                      2
                    </span>
                    <span>Payment Method</span>
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> 256-Bit Encrypted
                  </span>
                </div>

                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "online"
                        ? "border-[#8C201C] bg-[#FFF9F3]"
                        : "border-[#EFE7DD] hover:border-[#8C201C]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === "online"}
                        onChange={handleInputChange}
                        className="accent-[#8C201C]"
                      />
                      <div>
                        <span className="font-bold text-xs text-[#231F20] block">
                          Instant Online Payment (UPI, Cards, Netbanking)
                        </span>
                        <span className="text-[11px] text-[#777777]">
                          Google Pay, PhonePe, Paytm, All Major Cards
                        </span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-[#8C201C]" />
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "border-[#8C201C] bg-[#FFF9F3]"
                        : "border-[#EFE7DD] hover:border-[#8C201C]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="accent-[#8C201C]"
                      />
                      <div>
                        <span className="font-bold text-xs text-[#231F20] block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-[#777777]">
                          Pay cash or UPI at your doorstep upon delivery
                        </span>
                      </div>
                    </div>
                    <Truck className="w-5 h-5 text-[#8C201C]" />
                  </label>
                </div>
              </div>

              {orderError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{orderError}</span>
                </div>
              )}

              {/* Submit / Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-sm py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order • ₹{totalAmount}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#777777] font-medium pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Authentic Mithila Recipes
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#8C201C]" /> Pan-India Express Delivery
                </span>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5 bg-[#FFF9F3] p-6 rounded-3xl border-2 border-[#EFE7DD] shadow-sm space-y-5 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-[#231F20] border-b border-[#EFE7DD] pb-3">
                Order Summary ({cart.reduce((s, i) => s + (i.quantity || 1), 0)} Items)
              </h3>

              <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const productImg =
                    Array.isArray(item.product?.images) && item.product.images.length > 0
                      ? item.product.images[0]
                      : (item.product as any)?.image || "/achaar-clean.png";
                  const productName = item.product?.name || "Authentic Mithila Flavour";
                  const itemWeight = item.variant?.weight || item.product?.weight || "400g";
                  const itemPrice = item.variant?.price || item.product?.price || 249;

                  return (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#EFE7DD] shrink-0 p-1">
                        <Image
                          src={productImg}
                          alt={productName}
                          fill
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-bold text-[#231F20] truncate">
                          {productName}
                        </h4>
                        <p className="text-[11px] text-[#777777]">
                          {itemWeight} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#8C201C] shrink-0">
                        ₹{itemPrice * item.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[#EFE7DD] pt-4 space-y-2 text-xs">
                <div className="flex justify-between font-medium text-[#555555]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#231F20]">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between font-bold text-[#8C201C]">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between font-medium text-[#555555]">
                  <span>Shipping</span>
                  <span className="font-bold text-[#231F20]">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="border-t border-[#EFE7DD] pt-3 flex justify-between items-baseline text-base font-bold text-[#8C201C]">
                  <span>Total Amount</span>
                  <span className="font-serif text-2xl font-bold">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
