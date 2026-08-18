"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { BRAND_INFO } from "@/data/brandInfo";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Tag,
  Gift,
} from "lucide-react";

export default function FullCartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    freeShippingRemaining,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [giftNote, setGiftNote] = useState("");
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);

  const handleCouponApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponMsg(null);
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponMsg({ text: "Coupon applied successfully!", error: false });
      setCouponCode("");
    } else {
      setCouponMsg({ text: res.message, error: true });
    }
  };

  const freeShippingPercentage = Math.min(
    100,
    Math.round((subtotal / BRAND_INFO.freeShippingThreshold) * 100)
  );

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[rgba(51,51,51,0.10)] pb-6 mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3E3E]">
            Review Your Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#333333] mt-1">
            Shopping Basket
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-[#FCE9D6] rounded-3xl border border-[rgba(51,51,51,0.10)] p-12 text-center max-w-xl mx-auto my-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FFFFFF] flex items-center justify-center mx-auto mb-4 text-[#8B3E3E] shadow-2xs">
              <ShoppingBag className="w-8 h-8 text-[#8B3E3E]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#333333] mb-2">
              Your basket is currently empty
            </h2>
            <p className="text-xs text-[#555555] font-medium leading-relaxed mb-6">
              Looks like you haven&apos;t added any authentic sun-cured pickles or Mithila makhana to your order yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] font-bold text-xs px-8 py-3.5 rounded-xl shadow-md transition-all"
            >
              <span>Explore Our Flavours</span>
              <ArrowRight className="w-4 h-4 text-[#FFFFFF]" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Cart Items Table */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Indicator */}
              <div className="bg-[#FCE9D6] p-5 rounded-2xl border border-[rgba(51,51,51,0.10)] shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-[#333333] mb-2">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#8B3E3E]" />
                    {freeShippingRemaining === 0 ? (
                      <span className="text-[#8B3E3E]">
                        🎉 Congratulations! You have unlocked FREE Express Shipping!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#8B3E3E]">₹{freeShippingRemaining}</strong> more to qualify for Free Shipping!
                      </span>
                    )}
                  </span>
                  <span className="text-[#8B3E3E] font-bold">{freeShippingPercentage}%</span>
                </div>
                <div className="w-full bg-[#FFFFFF] rounded-full h-2 overflow-hidden border border-[rgba(51,51,51,0.08)]">
                  <div
                    className="bg-[#8B3E3E] h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingPercentage}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[rgba(51,51,51,0.10)] divide-y divide-[rgba(51,51,51,0.08)] overflow-hidden shadow-xs">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-[#FCE9D6] border border-[rgba(51,51,51,0.10)]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#333333] truncate">
                          {item.name}
                        </h3>
                        <span className="text-xs text-[#555555] block mt-0.5 font-medium">
                          Net Weight: {item.weight}
                        </span>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="font-serif text-lg font-bold text-[#8B3E3E]">
                            ₹{item.price}
                          </span>
                          {item.mrp > item.price && (
                            <span className="text-xs text-[#888888] line-through font-medium">
                              ₹{item.mrp}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-[rgba(51,51,51,0.15)] rounded-xl bg-white p-1 shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#333333] hover:bg-[#FCE9D6] rounded-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#333333]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#333333] hover:bg-[#FCE9D6] rounded-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <span className="font-serif text-xl font-bold text-[#8B3E3E] w-20 text-right">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#777777] hover:text-[#8B3E3E] p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Note Option */}
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs">
                <button
                  onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}
                  className="w-full flex items-center justify-between text-left text-xs font-bold text-[#8B3E3E]"
                >
                  <span className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#8B3E3E]" />
                    <span>Include a complimentary handwritten gift note</span>
                  </span>
                  <span className="text-[11px] underline font-bold">
                    {isGiftNoteOpen ? "Hide" : "+ Add Note"}
                  </span>
                </button>
                {isGiftNoteOpen && (
                  <div className="mt-3 pt-3 border-t border-[rgba(51,51,51,0.10)]">
                    <textarea
                      rows={2}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your special message for the recipient..."
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.15)] rounded-xl p-3 text-xs text-[#333333] font-medium focus:outline-none focus:border-[#8B3E3E]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary - Solid Cream Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#FCE9D6] p-6 sm:p-7 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-sm space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#333333] border-b border-[rgba(51,51,51,0.10)] pb-3">
                  Order Summary
                </h3>

                {/* Coupon input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8B3E3E] mb-2">
                    Apply Promotional Code
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-[#FFFFFF] border border-[#F7A77A] p-3 rounded-xl text-xs shadow-2xs">
                      <div className="flex items-center gap-2 text-[#8B3E3E] font-bold">
                        <Tag className="w-4 h-4 text-[#8B3E3E]" />
                        <span>Code &quot;{appliedCoupon.code}&quot; Active</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-[#8B3E3E] hover:underline font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCouponApply} className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="e.g. CHACHIJI10"
                          className="flex-1 bg-[#FFFFFF] border border-[rgba(51,51,51,0.15)] rounded-xl px-3 py-2 text-xs text-[#333333] font-bold uppercase focus:outline-none focus:border-[#8B3E3E]"
                        />
                        <button
                          type="submit"
                          className="bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs"
                        >
                          Apply
                        </button>
                      </div>
                      {couponMsg && (
                        <p
                          className={`text-[11px] font-bold ${
                            couponMsg.error ? "text-[#8B3E3E]" : "text-emerald-700"
                          }`}
                        >
                          {couponMsg.text}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Calculation Rows */}
                <div className="space-y-2.5 text-xs text-[#555555] border-t border-[rgba(51,51,51,0.10)] pt-4 font-medium">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-[#333333]">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#8B3E3E] font-bold">
                      <span>Discount Savings</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Standard Shipping</span>
                    <span className="font-bold text-[#333333]">
                      {shippingFee === 0 ? (
                        <span className="text-[#8B3E3E] font-bold">FREE</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-[#8B3E3E] pt-3 border-t border-[rgba(51,51,51,0.10)]">
                    <span>Total Payable</span>
                    <span className="font-serif text-2xl font-bold">₹{totalAmount}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] font-bold text-xs sm:text-sm py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#FFFFFF]" />
                </Link>

                <div className="space-y-2 text-[11px] text-[#555555] font-medium pt-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8B3E3E]" />
                    <span>100% Guaranteed safe and leak-proof delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#8B3E3E]" />
                    <span>Dispatched fresh within 24-48 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
