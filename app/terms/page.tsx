import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FileText,
  Scale,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Mail,
  AlertCircle,
  Award,
} from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions | Chachiji Homemade Cuisine",
  description:
    "Terms of service, purchasing agreements, handcrafted food disclaimers, and warranty policies for Chachiji's Homemade Cuisine.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FFF9F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#777777] mb-8">
          <Link href="/" className="hover:text-[#8C201C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#8C201C] font-bold">Terms &amp; Conditions</span>
        </div>

        {/* Hero Header Card */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal direction="up" delay={0}>
            <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A4A]" />
              Artisan Purchase Agreement
            </span>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] tracking-tight mb-3">
              Terms &amp; Conditions
            </h1>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed max-w-lg mx-auto">
              Please review these transparent terms and handcrafted food handling guidelines before ordering from Chachiji&apos;s kitchen.
            </p>
          </Reveal>
        </div>

        {/* 3 Core Commitments Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <Award className="w-5 h-5 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">Small-Batch Authentic</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">Sun-cured naturally without synthetic chemicals or artificial ripening.</p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <Scale className="w-5 h-5 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">Transparent Pricing</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">All prices listed in INR and inclusive of applicable GST taxes.</p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-5 h-5 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">100% Transit Guarantee</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">Immediate replacement if glass jars arrive damaged or leaked.</p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border border-[#EFE7DD] shadow-sm space-y-8 text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed mb-12">
          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">1. Handcrafted Artisanal Variations</h2>
            <p className="text-[#555555]">
              All Chachiji products (Bharwa Lal Mirch, Kacha Aam, Bihari Oal Achar, Mithila Makhana, Masala Chana) are prepared in artisanal batches using heirloom family recipes. Because we do not use artificial color stabilizers or chemical thickeners, natural minor variations in oil color, pungency level, and spice coarseness are expected and signify genuine sunlight-curing.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">2. Pricing, Taxes &amp; Invoices</h2>
            <p className="text-[#555555]">
              All product prices on chachiji.in are stated in Indian Rupees (INR) and are inclusive of all applicable Goods and Services Tax (GST). A digital tax invoice is generated upon order confirmation and emailed to your registered address.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">3. Customer Storage &amp; Usage Care</h2>
            <p className="text-[#555555]">
              To preserve the natural longevity of wood cold-pressed mustard oil pickles:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-xs text-[#555555]">
              <li>Always use a clean, bone-dry wooden or stainless steel spoon. Never introduce moisture into the jar.</li>
              <li>Ensure the pickle pieces remain submerged below the top mustard oil barrier.</li>
              <li>Store jars in a cool, dry place away from direct humidity. Refrigeration is optional but recommended after opening in humid seasons.</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">4. Intellectual Property</h2>
            <p className="text-[#555555]">
              The brand name &quot;Chachiji&quot;, the tagline &quot;Pyaar Bhara, Ghar Jaisa&quot;, the illustrated logo, and all product photographs and descriptions on this website are protected under Indian intellectual property laws. Any unauthorized commercial reproduction is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">5. Governing Law &amp; Jurisdiction</h2>
            <p className="text-[#555555]">
              These terms of service and any agreements shall be governed by and construed in accordance with the laws of India. Any legal disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the competent courts in Vaishali / Patna, Bihar, India.
            </p>
          </section>
        </div>

        {/* Contact Strip */}
        <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#EFE7DD] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="font-serif text-xl font-bold text-[#231F20]">Questions Regarding Our Terms?</h4>
            <p className="text-xs text-[#555555] font-medium mt-0.5">
              Contact our legal and kitchen compliance desk for any inquiries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Legal Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
