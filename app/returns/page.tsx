import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ShieldAlert, RefreshCw, CheckCircle2, Phone } from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";

export const metadata: Metadata = {
  title: "Returns & Replacement Policy",
  description:
    "Chachiji's 100% transit guarantee and food hygiene replacement policy for damaged, leaked, or incorrect deliveries.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
            Consumer Assurance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231F20] mt-1 mb-3">
            Returns &amp; Replacement Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] font-medium max-w-xl mx-auto">
            Our 100% Hassle-Free Glass Transit Guarantee ensures immediate replacement in case of transit damage or quality discrepancies.
          </p>
        </div>

        {/* 3 Step Resolution */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#FFF9F3] p-6 rounded-2xl border border-[rgba(51,51,51,0.10)] text-center shadow-xs">
            <span className="w-8 h-8 rounded-full bg-[#8C201C] text-[#FFFFFF] text-xs font-bold flex items-center justify-center mx-auto mb-3">
              1
            </span>
            <h4 className="font-serif text-base font-bold text-[#231F20]">Share Photo / Video</h4>
            <p className="text-[11px] text-[#555555] font-medium mt-1">Within 48 hours of receiving your parcel.</p>
          </div>

          <div className="bg-[#FFF9F3] p-6 rounded-2xl border border-[rgba(51,51,51,0.10)] text-center shadow-xs">
            <span className="w-8 h-8 rounded-full bg-[#8C201C] text-[#FFFFFF] text-xs font-bold flex items-center justify-center mx-auto mb-3">
              2
            </span>
            <h4 className="font-serif text-base font-bold text-[#231F20]">Instant Kitchen Review</h4>
            <p className="text-[11px] text-[#555555] font-medium mt-1">Our support team approves within 2-4 hours.</p>
          </div>

          <div className="bg-[#FFF9F3] p-6 rounded-2xl border border-[rgba(51,51,51,0.10)] text-center shadow-xs">
            <span className="w-8 h-8 rounded-full bg-[#8C201C] text-[#FFFFFF] text-xs font-bold flex items-center justify-center mx-auto mb-3">
              3
            </span>
            <h4 className="font-serif text-base font-bold text-[#231F20]">Free Re-Dispatch or Refund</h4>
            <p className="text-[11px] text-[#555555] font-medium mt-1">Fresh replacement jar shipped immediately.</p>
          </div>
        </div>

        {/* Policy Text */}
        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-6 text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">1. Food Safety &amp; Return Eligibility</h2>
            <p>
              Due to strict food hygiene and safety standards, opened or consumed food jars (Pickles, Makhana) cannot be physically returned once delivered. However, if your order arrives damaged, leaked, expired, or with incorrect items, we offer a <strong>100% Free Replacement or Full Refund</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">2. How to Claim a Replacement</h2>
            <p>
              If your package arrived damaged in transit:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-xs">
              <li>Take 2-3 clear photos or a short unboxing video showing the damaged glass jar or leaked seal.</li>
              <li>WhatsApp the photos along with your Order ID to <a href={BRAND_INFO.whatsappUrl} className="text-[#8C201C] font-bold underline">+91 88604 88004</a>.</li>
              <li>Our kitchen coordinator will verify and immediately initiate a fresh expedited dispatch at zero additional cost to you.</li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">3. Cancellation Policy</h2>
            <p>
              Orders can be cancelled free of charge anytime prior to dispatch (within 4-6 hours of placing the order). Once an order has been dispatched from our Hajipur facility and handed over to the courier, it cannot be cancelled.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">4. Refund Processing Time</h2>
            <p>
              In cases where a refund is approved instead of a replacement, the full amount will be credited back to your original payment method (UPI, Bank Account, or Card) within <strong>3 to 5 working days</strong>. For COD orders, refund is processed via direct UPI transfer.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

