import React from "react";
import type { Metadata } from "next";
import { BRAND_INFO } from "@/data/brandInfo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of service, purchasing agreements, and handcrafted food disclaimers for Chachiji's Homemade Cuisine.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3E3E]">
            Terms of Service
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#333333] mt-1 mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] font-medium max-w-xl mx-auto">
            Please read these terms carefully before placing orders on Chachiji&apos;s digital storefront.
          </p>
        </div>

        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-6 text-xs sm:text-sm text-[#333333] font-medium leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8B3E3E]">1. Small-Batch Handcrafted Variations</h2>
            <p>
              Our culinary products (Bharwa Mirch, Kacha Aam, Oal, Raw Makhana) are handcrafted in small seasonal batches without synthetic color enhancers or artificial ripening agents. Minor natural variations in pungency, oil color, and fruit texture are characteristic of authentic traditional curing and indicate zero artificial tampering.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8B3E3E]">2. Pricing &amp; Order Acceptance</h2>
            <p>
              All prices listed on chachiji.in are in Indian Rupees (INR) and are inclusive of applicable goods and services taxes. Chachiji reserves the right to accept or cancel orders in cases of stock depletion or logistical non-serviceability.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8B3E3E]">3. Food Storage Responsibility</h2>
            <p>
              To maintain the integrity of wood cold-pressed mustard oil pickles, always use clean, dry spoons and ensure the fruit pieces remain submerged under the oil layer. Keep stored in a cool, dry area away from direct moisture.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8B3E3E]">4. Legal Jurisdiction</h2>
            <p>
              Any disputes or legal claims arising from transactions on this website shall be subject to the exclusive jurisdiction of the competent courts in Vaishali / Patna, Bihar, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
