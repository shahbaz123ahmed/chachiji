"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, shippingFee, totalAmount, clearCart } =
    useCart();

  const [formData, setFormData] = useState({
    emailOrPhone: "ramesh.sharma@example.com",
    firstName: "Ramesh",
    lastName: "Sharma",
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

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `CH-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen py-20 text-center">
        <div className="max-w-md mx-auto bg-[#FCE9D6] p-8 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#333333] mb-2">
            No items in checkout
          </h2>
          <p className="text-xs text-[#555555] font-medium mb-6">
            Please add handcrafted products to your basket before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#8B3E3E] text-[#FFFFFF] text-xs font-bold px-6 py-3.5 rounded-xl shadow-md"
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
        <div className="border-b border-[rgba(51,51,51,0.10)] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3E3E]">
              Distraction-Free
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#333333] mt-0.5">
              Secure Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#333333]">
            <span className="text-[#8B3E3E]">Cart</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
            <span className="text-[#8B3E3E]">Shipping &amp; Details</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
            <span className="text-[#777777]">Payment</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Input Forms */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Contact Information */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[rgba(51,51,51,0.08)] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#333333] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#8B3E3E] text-[#FFFFFF] text-xs flex items-center justify-center font-sans font-bold">
                      1
                    </span>
                    <span>Contact Information</span>
                  </h3>
                  <span className="text-[11px] text-[#777777] font-medium">For order updates</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">
                    Email Address or Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    name="emailOrPhone"
                    value={formData.emailOrPhone}
                    onChange={handleInputChange}
                    className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3.5 py-2.5 text-xs text-[#333333] font-semibold focus:outline-none focus:border-[#8B3E3E]"
                  />
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[rgba(51,51,51,0.08)] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#333333] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#8B3E3E] text-[#FFFFFF] text-xs flex items-center justify-center font-sans font-bold">
                      2
                    </span>
                    <span>Shipping Address</span>
                  </h3>
                  <span className="text-[11px] text-[#8B3E3E] font-bold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#8B3E3E]" />
                    Safe Glass Delivery
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#333333] font-semibold focus:outline-none focus:border-[#8B3E3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#333333] font-semibold focus:outline-none focus:border-[#8B3E3E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">
                    Street Address &amp; House/Flat No.
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3.5 py-2.5 text-xs text-[#333333] font-semibold focus:outline-none focus:border-[#8B3E3E]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#333333] font-semibold focus:outline-none focus:border-[#8B3E3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">
                      State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#333333] font-bold focus:outline-none focus:border-[#8B3E3E]"
                    >
                      <option value="Bihar">Bihar</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Other">Other States</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#333333] font-bold focus:outline-none focus:border-[#8B3E3E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">
                    Phone Number (for Delivery Agent)
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3.5 py-2.5 text-xs text-[#333333] font-semibold focus:outline-none focus:border-[#8B3E3E]"
                  />
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[rgba(51,51,51,0.08)] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#333333] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#8B3E3E] text-[#FFFFFF] text-xs flex items-center justify-center font-sans font-bold">
                      3
                    </span>
                    <span>Payment Method</span>
                  </h3>
                  <span className="text-[11px] text-[#555555] font-semibold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-[#8B3E3E]" />
                    256-bit Encrypted
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {/* COD */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "border-[#8B3E3E] bg-[#FCE9D6] shadow-xs"
                        : "border-[rgba(51,51,51,0.15)] bg-[#FFFFFF]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="accent-[#8B3E3E] w-4 h-4"
                      />
                      <div>
                        <span className="font-bold text-[#333333] block text-sm">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-[#555555] font-medium">
                          Pay cash or UPI to courier upon arrival
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#8B3E3E]">Available</span>
                  </label>

                  {/* UPI */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "upi"
                        ? "border-[#8B3E3E] bg-[#FCE9D6] shadow-xs"
                        : "border-[rgba(51,51,51,0.15)] bg-[#FFFFFF]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === "upi"}
                        onChange={handleInputChange}
                        className="accent-[#8B3E3E] w-4 h-4"
                      />
                      <div>
                        <span className="font-bold text-[#333333] block text-sm">
                          UPI Instant (GPay / PhonePe / Paytm / QR)
                        </span>
                        <span className="text-[11px] text-[#555555] font-medium">
                          Instant payment via any UPI app
                        </span>
                      </div>
                    </div>
                    <span className="bg-[#F7A77A] text-[#333333] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                      Fastest
                    </span>
                  </label>

                  {/* Cards & Netbanking */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "card"
                        ? "border-[#8B3E3E] bg-[#FCE9D6] shadow-xs"
                        : "border-[rgba(51,51,51,0.15)] bg-[#FFFFFF]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className="accent-[#8B3E3E] w-4 h-4"
                      />
                      <div>
                        <span className="font-bold text-[#333333] block text-sm">
                          Credit / Debit Cards &amp; NetBanking
                        </span>
                        <span className="text-[11px] text-[#555555] font-medium">
                          Visa, Mastercard, RuPay, Maestro &amp; all major banks
                        </span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-[#8B3E3E]" />
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Review & Submit */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FCE9D6] p-6 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-sm space-y-5">
                <h3 className="font-serif text-xl font-bold text-[#333333] border-b border-[rgba(51,51,51,0.10)] pb-3">
                  Your Order ({cart.length} items)
                </h3>

                {/* Items preview */}
                <div className="divide-y divide-[rgba(51,51,51,0.10)] max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white border border-[rgba(51,51,51,0.10)]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-[#333333] line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-[#555555] font-medium">
                            Qty: {item.quantity} • {item.weight}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-[#8B3E3E] text-sm">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs text-[#555555] font-medium border-t border-[rgba(51,51,51,0.10)] pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#333333]">₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#8B3E3E] font-bold">
                      <span>Applied Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-bold text-[#333333]">
                      {shippingFee === 0 ? (
                        <span className="text-[#8B3E3E] font-bold">FREE</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#8B3E3E] pt-2 border-t border-[rgba(51,51,51,0.10)]">
                    <span>Total Amount</span>
                    <span className="font-serif text-2xl font-bold">₹{totalAmount}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#8B3E3E] hover:bg-[#733232] disabled:bg-[#8B3E3E]/60 text-[#FFFFFF] font-bold text-xs sm:text-sm py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {isProcessing ? (
                    <span>Securing Your Flavour Order...</span>
                  ) : (
                    <>
                      <span>Place Order • ₹{totalAmount}</span>
                      <ArrowRight className="w-4 h-4 text-[#FFFFFF]" />
                    </>
                  )}
                </button>

                <div className="text-[11px] text-[#555555] font-medium text-center space-y-1 pt-1">
                  <p className="flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B3E3E]" />
                    <span>Safe transit guaranteed • Glass replacement warranty</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
