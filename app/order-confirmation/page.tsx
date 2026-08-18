"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "CH-948210";

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#8B3E3E", "#F7A77A", "#FCE9D6", "#333333"],
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FCE9D6] rounded-3xl border border-[rgba(51,51,51,0.10)] p-8 sm:p-12 text-center shadow-lg space-y-8">
          {/* Top Success Badge */}
          <div>
            <div className="w-16 h-16 rounded-full bg-[#FFFFFF] text-[#8B3E3E] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-[#8B3E3E]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3E3E]">
              Order Placed Successfully
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333] mt-1">
              Dhanyawad for Trusting Chachiji!
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-2 max-w-md mx-auto font-medium">
              Your order <strong className="text-[#8B3E3E] font-bold">#{orderId}</strong> has been received by our kitchen in Vaishali and is being prepared with heartfelt care.
            </p>
          </div>

          {/* Timeline Milestones */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[rgba(51,51,51,0.10)] p-6 text-left space-y-6 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-[#333333] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B3E3E]" />
              <span>What Happens Next?</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#8B3E3E] text-[#FFFFFF] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-[#333333]">Order Confirmed</h4>
                  <p className="text-[#555555] font-medium mt-0.5">We have received your order details and reserved your fresh batch.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FFFFFF] border-2 border-[#8B3E3E] text-[#8B3E3E] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-[#333333]">Artisan Packing &amp; Cushioning</h4>
                  <p className="text-[#555555] font-medium mt-0.5">Bottled in food-grade glass with multi-layer shockproof protection.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FFFFFF] border-2 border-[rgba(51,51,51,0.15)] text-[#777777] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-[#333333]">Dispatched via Express Courier</h4>
                  <p className="text-[#555555] font-medium mt-0.5">Shipped via BlueDart / Delhivery with SMS &amp; WhatsApp tracking.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={`/track-order?orderId=${orderId}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] font-bold text-xs px-8 py-3.5 rounded-xl transition-all shadow-md"
            >
              <span>Track Live Shipment</span>
              <ArrowRight className="w-4 h-4 text-[#FFFFFF]" />
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-white/80 text-[#333333] border border-[rgba(51,51,51,0.12)] font-bold text-xs px-8 py-3.5 rounded-xl transition-colors shadow-2xs"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Support Strip */}
          <div className="border-t border-[rgba(51,51,51,0.10)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#555555] font-medium">
            <span>Need any changes to your order?</span>
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#8B3E3E] hover:underline font-bold"
            >
              <MessageCircle className="w-4 h-4 text-[#8B3E3E]" />
              <span>WhatsApp Support (+91 88604 88004)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FFFFFF] min-h-screen py-20 text-center font-serif text-lg text-[#8B3E3E]">
          Loading Confirmation...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
