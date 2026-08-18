"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { BRAND_INFO } from "@/data/brandInfo";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
  Tag,
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    freeShippingRemaining,
    totalItems,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    addToCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
  };

  const upsellProducts = PRODUCTS.filter(
    (p) => !cart.some((item) => item.productId === p.id)
  ).slice(0, 3);

  const freeShippingPercentage = Math.min(
    100,
    Math.round((subtotal / BRAND_INFO.freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] text-[#333333] shadow-2xl flex flex-col border-l border-[rgba(51,51,51,0.12)] animate-in slide-in-from-right duration-200">
          {/* Header - Solid #8B3E3E */}
          <div className="px-6 py-5 bg-[#8B3E3E] text-[#FFFFFF] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#F7A77A]" />
              <h2 className="font-serif text-xl font-bold tracking-wide">
                Your Flavour Basket ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="text-[#FFFFFF] hover:text-[#F7A77A] p-1 rounded-lg transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress - Solid Cream & Solid Red */}
          <div className="bg-[#FCE9D6] px-6 py-3.5 border-b border-[rgba(51,51,51,0.10)]">
            <div className="flex items-center justify-between text-xs font-bold text-[#333333] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8B3E3E]" />
                {freeShippingRemaining === 0 ? (
                  <span className="text-[#8B3E3E]">
                    🎉 You unlocked FREE Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#8B3E3E]">₹{freeShippingRemaining}</strong> more for Free Shipping
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

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#FFFFFF]">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#FCE9D6] flex items-center justify-center mx-auto mb-4 text-[#8B3E3E]">
                  <ShoppingBag className="w-8 h-8 text-[#8B3E3E]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#333333] mb-1">
                  Your basket is empty
                </h3>
                <p className="text-xs text-[#555555] max-w-xs mx-auto mb-6 font-medium">
                  Experience authentic sun-cured pickles and GI-tagged Mithila makhana handcrafted with love.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] text-xs font-bold py-3 px-6 rounded-xl transition-colors shadow-sm"
                >
                  Explore Flavours
                </button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="divide-y divide-[rgba(51,51,51,0.08)]">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3.5 flex gap-3.5 items-center">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#FCE9D6] border border-[rgba(51,51,51,0.10)]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-[#333333] leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-[#555555] block mt-0.5 font-medium">
                          Variant: {item.weight}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-[#8B3E3E]">
                            ₹{item.price}
                          </span>
                          <span className="text-[10px] text-[#888888] line-through">
                            ₹{item.mrp}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center border border-[rgba(51,51,51,0.15)] rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#333333] hover:bg-[#FCE9D6] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#333333]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#333333] hover:bg-[#FCE9D6] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#777777] hover:text-[#8B3E3E] text-[11px] font-medium flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Box */}
                <div className="bg-[#FFFFFF] rounded-xl p-3.5 border border-[rgba(51,51,51,0.12)] shadow-2xs">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between text-xs bg-[#FCE9D6] border border-[#F7A77A] rounded-lg p-2.5">
                      <div className="flex items-center gap-2 text-[#8B3E3E] font-bold">
                        <Tag className="w-3.5 h-3.5 text-[#8B3E3E]" />
                        <span>Code &quot;{appliedCoupon.code}&quot; applied</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-[#8B3E3E] hover:text-[#733232] font-bold underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Coupon code (e.g. CHACHIJI10)"
                          className="flex-1 text-xs bg-[#FFFFFF] border border-[rgba(51,51,51,0.15)] rounded-lg px-3 py-2 text-[#333333] placeholder:text-[#777777] font-semibold uppercase focus:outline-none focus:border-[#8B3E3E]"
                        />
                        <button
                          type="submit"
                          className="bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-xs"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-[#8B3E3E] font-semibold">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Upsell Recommendations */}
                {upsellProducts.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#8B3E3E] flex items-center gap-1 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#F7A77A]" />
                      You May Also Like
                    </span>
                    <div className="space-y-2">
                      {upsellProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center justify-between bg-[#FCE9D6] p-2.5 rounded-xl border border-[rgba(51,51,51,0.08)] shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white">
                              <Image
                                src={prod.images[0]}
                                alt={prod.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h5 className="font-serif text-xs font-bold text-[#333333] line-clamp-1">
                                {prod.name}
                              </h5>
                              <span className="text-[11px] font-bold text-[#8B3E3E]">
                                ₹{prod.price}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(prod, prod.variants[0], 1, false)}
                            className="bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Summary & CTAs */}
          {cart.length > 0 && (
            <div className="bg-[#FFFFFF] border-t border-[rgba(51,51,51,0.10)] px-6 py-4 space-y-3 shadow-lg">
              <div className="space-y-1.5 text-xs text-[#555555]">
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#333333]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8B3E3E] font-bold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium">
                  <span>Shipping</span>
                  <span className="font-bold text-[#333333]">
                    {shippingFee === 0 ? (
                      <span className="text-[#8B3E3E] font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#8B3E3E] pt-2 border-t border-[rgba(51,51,51,0.08)]">
                  <span>Estimated Total</span>
                  <span className="font-serif text-2xl font-bold">₹{totalAmount}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full text-center py-3 px-3 border border-[#8B3E3E] text-[#8B3E3E] hover:bg-[#FCE9D6] text-xs font-bold rounded-xl transition-colors"
                >
                  View Cart Page
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full text-center py-3 px-3 bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-[10px] text-center text-[#777777] font-medium">
                🔒 100% Secure Checkout • Safe Glass-Jar Packaging Guaranteed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
