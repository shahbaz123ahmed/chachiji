import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldAlert,
  RefreshCw,
  CheckCircle2,
  Phone,
  MessageCircle,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  PackageX,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Returns & Replacement Policy | Chachiji Homemade Cuisine",
  description:
    "Chachiji's 100% transit guarantee and food hygiene replacement policy for damaged, leaked, or incorrect deliveries.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-[#FFF9F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#777777] mb-8">
          <Link href="/" className="hover:text-[#8C201C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#8C201C] font-bold">Returns &amp; Replacements</span>
        </div>

        {/* Hero Header Card */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal direction="up" delay={0}>
            <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A4A]" />
              100% Glass Transit Guarantee
            </span>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] tracking-tight mb-3">
              Returns &amp; Replacement Policy
            </h1>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed max-w-lg mx-auto">
              If your jar arrives damaged or leaked in transit, we promise an immediate 100% free replacement with zero return hassle.
            </p>
          </Reveal>
        </div>

        {/* 3 Step Resolution Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFFFFF] p-7 rounded-3xl border border-[#EFE7DD] text-center shadow-xs relative hover:border-[#8C201C] transition-all">
            <span className="w-9 h-9 rounded-full bg-[#8C201C] text-[#FFFFFF] text-xs font-bold flex items-center justify-center mx-auto mb-4 shadow-xs">
              1
            </span>
            <h4 className="font-serif text-lg font-bold text-[#231F20] mb-1">Click a Photo / Video</h4>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Take 1-2 clear photos of the damaged glass or seal upon unboxing within 48 hours.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-7 rounded-3xl border border-[#EFE7DD] text-center shadow-xs relative hover:border-[#8C201C] transition-all">
            <span className="w-9 h-9 rounded-full bg-[#8C201C] text-[#FFFFFF] text-xs font-bold flex items-center justify-center mx-auto mb-4 shadow-xs">
              2
            </span>
            <h4 className="font-serif text-lg font-bold text-[#231F20]">WhatsApp Kitchen Desk</h4>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Send the photo with your Order ID to our WhatsApp team. Verified in 2-4 hours.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-7 rounded-3xl border border-[#EFE7DD] text-center shadow-xs relative hover:border-[#8C201C] transition-all">
            <span className="w-9 h-9 rounded-full bg-[#8C201C] text-[#FFFFFF] text-xs font-bold flex items-center justify-center mx-auto mb-4 shadow-xs">
              3
            </span>
            <h4 className="font-serif text-lg font-bold text-[#231F20]">Instant Free Re-Dispatch</h4>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              A brand new jar is immediately packed and shipped to you via priority air courier.
            </p>
          </div>
        </div>

        {/* Dos and Don'ts Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Covered */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#EFE7DD] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#8C201C]">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-serif text-xl font-bold">100% Eligible for Free Replacement</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#555555] font-medium">
              <li className="flex items-start gap-2">
                <span className="text-[#8C201C] font-bold">✓</span>
                <span>Glass jar cracked, chipped, or broken during courier transit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8C201C] font-bold">✓</span>
                <span>Mustard oil leakage due to broken seal before delivery.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8C201C] font-bold">✓</span>
                <span>Incorrect product variant or weight dispatched by mistake.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8C201C] font-bold">✓</span>
                <span>Package lost in courier transit beyond guaranteed window.</span>
              </li>
            </ul>
          </div>

          {/* Not Covered */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#EFE7DD] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#777777]">
              <AlertTriangle className="w-5 h-5 text-[#E07A4A]" />
              <h3 className="font-serif text-xl font-bold text-[#231F20]">Food Hygiene Ineligibility</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#555555] font-medium">
              <li className="flex items-start gap-2">
                <span className="text-[#777777] font-bold">✕</span>
                <span>Opened and consumed jars cannot be returned due to FSSAI food safety laws.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#777777] font-bold">✕</span>
                <span>Natural artisanal variations in pungency or sunlight-cured color.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#777777] font-bold">✕</span>
                <span>Damage reported after 48 hours of doorstep delivery.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#777777] font-bold">✕</span>
                <span>Incorrect address provided resulting in repeated failed delivery.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Policy Text Sections */}
        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border border-[#EFE7DD] shadow-sm space-y-8 text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed mb-12">
          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">1. Food Safety &amp; Return Policy</h2>
            <p className="text-[#555555]">
              As an artisan food producer working under strict food safety and hygiene protocols, opened food products (Achar, Mithila Makhana, Masala Chana) cannot be physically shipped back to our kitchen once unsealed. However, if your order arrives damaged, leaked, or incorrect, our <strong>100% Transit Guarantee</strong> takes care of everything with immediate re-dispatch.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">2. Step-by-Step Replacement Claim</h2>
            <p className="text-[#555555]">
              To claim your replacement:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-xs text-[#555555]">
              <li>Take 2 clear photos or a short video showing the outer box label and the damaged jar.</li>
              <li>WhatsApp the photos with your Order ID to our kitchen desk at <a href={BRAND_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#8C201C] font-bold underline">+91 88604 88004</a>.</li>
              <li>Our team will verify the damage within 2 to 4 business hours and immediately generate a replacement tracking AWB.</li>
            </ol>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">3. Order Cancellations</h2>
            <p className="text-[#555555]">
              You can cancel your order free of charge anytime within <strong>4 to 6 hours</strong> of placing it on our website. Once your order has been packaged and handed over to BlueDart or Delhivery, cancellation is no longer possible.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">4. Refund Processing Timelines</h2>
            <p className="text-[#555555]">
              In cases where you opt for a monetary refund instead of a replacement jar, the full amount will be credited back to your original payment mode (UPI, Debit/Credit Card, Netbanking) within <strong>3 to 5 business days</strong>. For Cash on Delivery orders, refunds are issued directly via instant UPI transfer upon providing your UPI ID.
            </p>
          </section>
        </div>

        {/* Quick Action Box */}
        <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#EFE7DD] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="font-serif text-xl font-bold text-[#231F20]">Need Help with a Damaged Package?</h4>
            <p className="text-xs text-[#555555] font-medium mt-0.5">
              Send us a photo on WhatsApp and our kitchen team will dispatch a fresh jar immediately.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Claim on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="bg-[#FFF9F3] hover:bg-[#EFE7DD] text-[#8C201C] border border-[#EFE7DD] font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>Contact Desk</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
