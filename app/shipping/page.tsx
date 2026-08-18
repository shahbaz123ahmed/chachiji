import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "Learn about Chachiji's domestic shipping rates, delivery timelines, safe multi-layer glass jar packaging, and free shipping on orders above ₹599.",
};

export default function ShippingPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3E3E]">
            Fulfilment Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#333333] mt-1 mb-3">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] font-medium max-w-xl mx-auto">
            Dispatched fresh weekly from our kitchen in Vaishali, Bihar with multi-layer protective packaging for safe transit across all Indian pin codes.
          </p>
        </div>

        {/* 4 Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#FCE9D6] p-5 rounded-2xl border border-[rgba(51,51,51,0.10)] text-center shadow-xs">
            <Truck className="w-6 h-6 text-[#8B3E3E] mx-auto mb-2" />
            <h4 className="font-serif text-sm font-bold text-[#333333]">Free Shipping</h4>
            <p className="text-[11px] text-[#555555] font-medium mt-0.5">On all orders above ₹599 across India.</p>
          </div>
          <div className="bg-[#FCE9D6] p-5 rounded-2xl border border-[rgba(51,51,51,0.10)] text-center shadow-xs">
            <Clock className="w-6 h-6 text-[#8B3E3E] mx-auto mb-2" />
            <h4 className="font-serif text-sm font-bold text-[#333333]">Fast Dispatch</h4>
            <p className="text-[11px] text-[#555555] font-medium mt-0.5">Orders packed and dispatched in 24-48 hrs.</p>
          </div>
          <div className="bg-[#FCE9D6] p-5 rounded-2xl border border-[rgba(51,51,51,0.10)] text-center shadow-xs">
            <ShieldCheck className="w-6 h-6 text-[#8B3E3E] mx-auto mb-2" />
            <h4 className="font-serif text-sm font-bold text-[#333333]">Safe Glass Packing</h4>
            <p className="text-[11px] text-[#555555] font-medium mt-0.5">Multi-layer honeycomb shockproof boxes.</p>
          </div>
          <div className="bg-[#FCE9D6] p-5 rounded-2xl border border-[rgba(51,51,51,0.10)] text-center shadow-xs">
            <MapPin className="w-6 h-6 text-[#8B3E3E] mx-auto mb-2" />
            <h4 className="font-serif text-sm font-bold text-[#333333]">19,000+ Pincodes</h4>
            <p className="text-[11px] text-[#555555] font-medium mt-0.5">Delivered via BlueDart &amp; Delhivery.</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-6 text-xs sm:text-sm text-[#333333] font-medium leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8B3E3E]">1. Shipping Charges</h2>
            <p>
              We offer complimentary <strong>Standard Free Shipping</strong> on all domestic orders of <strong>₹599 or more</strong>. For orders below ₹599, a flat nominal handling &amp; shipping fee of <strong>₹49</strong> is applied automatically during checkout.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8B3E3E]">2. Delivery Timelines</h2>
            <p>
              All orders are prepared fresh in our kitchen facility located on the Hajipur-Muzaffarpur Highway (NH 22) in Vaishali, Bihar.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Bihar, Jharkhand, Eastern UP &amp; West Bengal:</strong> 2 to 4 business days.</li>
              <li><strong>Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 3 to 5 business days.</li>
              <li><strong>Rest of India (Tier 2/3 Cities &amp; Towns):</strong> 4 to 7 business days.</li>
              <li><strong>North-East &amp; Remote Island Territories:</strong> 6 to 9 business days.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8B3E3E]">3. Multi-Layer Protective Glass Packaging</h2>
            <p>
              Traditional pickles cure and preserve best in authentic glass and ceramic jars. To ensure your order reaches you in pristine condition without leaks or breakage, we wrap each individual jar in:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Induction-sealed, leak-proof airtight jar caps.</li>
              <li>Heavy-duty 5-ply honeycomb shock-absorbent sleeves.</li>
              <li>Outer corrugated transport boxes with fragile labelling.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8B3E3E]">4. Tracking Your Order</h2>
            <p>
              Once your shipment is handed over to our logistics partner (BlueDart, Delhivery, or Xpressbees), you will receive a tracking link via SMS and WhatsApp. You can also track your live shipment anytime on our <Link href="/track-order" className="text-[#8B3E3E] font-bold underline">Order Tracking Page</Link>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8B3E3E]">5. Queries &amp; Support</h2>
            <p>
              For any urgent address corrections or delivery rescheduling, please WhatsApp our support desk at <a href={BRAND_INFO.whatsappUrl} className="text-[#8B3E3E] font-bold underline">+91 88604 88004</a> or email <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8B3E3E] font-bold underline">{BRAND_INFO.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
