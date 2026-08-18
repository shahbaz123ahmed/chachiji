import React from "react";
import type { Metadata } from "next";
import { BRAND_INFO } from "@/data/brandInfo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Chachiji's Homemade Cuisine. Information regarding personal data, order processing, and payment security.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
            Data Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231F20] mt-1 mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] font-medium max-w-xl mx-auto">
            Your trust is our most treasured recipe. We respect your privacy and never sell or compromise your personal information.
          </p>
        </div>

        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-6 text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">1. Information We Collect</h2>
            <p>
              When you purchase or inquire on chachiji.in, we collect necessary customer details including your name, delivery address, phone number, and email address solely for order fulfillment, dispatch updates, and customer support.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">2. Payment Processing Security</h2>
            <p>
              All online payments (UPI, Debit/Credit Cards, Netbanking) are processed via RBI-authorized, 256-bit SSL encrypted payment gateways. Chachiji does not store or process your complete card credentials or bank PINs on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">3. Data Sharing with Courier Partners</h2>
            <p>
              Your contact number and delivery destination address are shared strictly with our contracted shipping carriers (e.g. BlueDart, Delhivery) for the sole purpose of delivery fulfillment and SMS tracking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">4. Contact Our Data Representative</h2>
            <p>
              If you wish to update or delete your customer account information, please email our support desk at <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8C201C] font-bold underline">{BRAND_INFO.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

