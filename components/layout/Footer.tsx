"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_INFO } from "@/data/brandInfo";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/Icons";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  // If on /admin page, render ONLY the clean minimal bottom copyright strip (no big consumer footer)
  if (pathname?.startsWith("/admin")) {
    return (
      <footer className="border-t border-[#EFE7DD] bg-[#EFE7DD] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#555555]">
          <p>© {new Date().getFullYear()} Chachiji&apos;s Homemade Cuisine. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2.5 font-medium text-[11px] sm:text-xs">
            <span>
              FSSAI Lic. No: <strong className="text-[#8C201C]">{BRAND_INFO.fssaiNumber}</strong>
            </span>
            <span>•</span>
            <span>
              GSTIN: <strong>{BRAND_INFO.gstNumber}</strong>
            </span>
            <span>•</span>
            <span>Vaishali, Bihar</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#FFF9F3] text-[#231F20] border-t border-[#EFE7DD] relative overflow-hidden">
      {/* 16. Promotional / Newsletter Strip - Solid #8C201C background with #E07A4A CTA */}
      <div className="border-b border-[#6B1815] bg-[#8C201C] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left max-w-xl">
            <span className="text-[11px] uppercase tracking-widest text-[#E07A4A] font-bold flex items-center justify-center lg:justify-start gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Join the Chachiji Family
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-2">
              Get 10% Off Your First Order
            </h3>
            <p className="text-xs sm:text-sm text-[#FFF9F3] leading-relaxed font-medium">
              Subscribe for new seasonal pickle batches, Mithila harvesting stories, and exclusive community discounts.
            </p>
          </div>

          <div className="w-full max-w-md">
            {isSubscribed ? (
              <div className="bg-[#8C201C] border border-[#E07A4A] rounded-2xl p-4 text-center text-xs text-[#FFF9F3] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E07A4A]" />
                <span>Dhanyawad! Use code <strong>CHACHIJI10</strong> at checkout for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-[#FFFFFF] border-2 border-[#EFE7DD] focus:border-[#8C201C] rounded-xl px-4 py-3 text-xs text-[#231F20] placeholder:text-[#999999] font-medium focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#E07A4A] hover:bg-[#C96635] text-[#231F20] font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-md active:scale-95"
                >
                  <span>Get 10% Off</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 17. Main Footer Links - Rich Solid #8C201C */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-3xl font-bold tracking-tight text-[#8C201C]">
                CHACHIJI
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#E07A4A] font-bold mt-0.5">
                Homemade Cuisine
              </span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed max-w-sm font-medium">
              Handcrafting traditional Indian culinary treasures in small batches. Sun-cured in ceramic martabans with pure wood-pressed mustard oil and harvested from the sacred wetlands of Mithila, Bihar.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-[#555555]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E07A4A] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">
                  {BRAND_INFO.address.line1}, {BRAND_INFO.address.landmark}, {BRAND_INFO.address.milestone}, {BRAND_INFO.address.city}, {BRAND_INFO.address.state} - {BRAND_INFO.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E07A4A] shrink-0" />
                <a href={`tel:${BRAND_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#E07A4A] transition-colors font-medium">
                  {BRAND_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E07A4A] shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-[#E07A4A] transition-colors font-medium">
                  {BRAND_INFO.email}
                </a>
              </div>
            </div>

            {/* FSSAI & GST Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#555555] font-semibold">
              <span className="bg-[#FFFFFF] border border-[#EFE7DD] px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C201C]" />
                <span>FSSAI Lic: <strong className="text-[#8C201C]">{BRAND_INFO.fssaiNumber}</strong></span>
              </span>
              <span className="bg-[#FFFFFF] border border-[#EFE7DD] px-3 py-1.5 rounded-xl shadow-2xs">
                GSTIN: <strong>{BRAND_INFO.gstNumber}</strong>
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#8C201C] hover:bg-[#E07A4A] hover:text-[#231F20] flex items-center justify-center text-[#FFFFFF] transition-all shadow-xs"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#8C201C] hover:bg-[#E07A4A] hover:text-[#231F20] flex items-center justify-center text-[#FFFFFF] transition-all shadow-xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#8C201C] hover:bg-[#25D366] hover:text-white flex items-center justify-center text-[#FFFFFF] transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E07A4A]">
              Shop Flavours
            </h4>
            <ul className="space-y-2 text-xs text-[#444444]">
              <li>
                <Link href="/shop/achar" className="hover:text-[#E07A4A] transition-colors">
                  Handcrafted Achar
                </Link>
              </li>
              <li>
                <Link href="/shop/makhana" className="hover:text-[#E07A4A] transition-colors">
                  Mithila Makhana
                </Link>
              </li>
              <li>
                <Link href="/product/traditional-kacha-aam-ka-achar" className="hover:text-[#E07A4A] transition-colors">
                  Kacha Aam Ka Achar
                </Link>
              </li>
              <li>
                <Link href="/product/mithila-bharwa-lal-mirch-achar" className="hover:text-[#E07A4A] transition-colors">
                  Bharwa Lal Mirch
                </Link>
              </li>
              <li>
                <Link href="/product/grade-a-mithila-phool-makhana" className="hover:text-[#E07A4A] transition-colors">
                  Grade A+ Raw Makhana
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Brand Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E07A4A]">
              Our Heritage
            </h4>
            <ul className="space-y-2 text-xs text-[#444444]">
              <li>
                <Link href="/about" className="hover:text-[#E07A4A] transition-colors">
                  About Us &amp; Roots
                </Link>
              </li>
              <li>
                <Link href="/about#process" className="hover:text-[#E07A4A] transition-colors">
                  Sun-Curing Process
                </Link>
              </li>
              <li>
                <Link href="/about#mithila" className="hover:text-[#E07A4A] transition-colors">
                  The Mithila Wetland Connection
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E07A4A] transition-colors">
                  Contact Our Kitchen
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#E07A4A] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Policies Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E07A4A]">
              Help &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#444444]">
              <li>
                <Link href="/track-order" className="hover:text-[#E07A4A] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#E07A4A] transition-colors">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#E07A4A] transition-colors">
                  Returns &amp; Replacements
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#E07A4A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#E07A4A] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#E07A4A] transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#EFE7DD] bg-[#EFE7DD] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#555555]">
          <p>© {new Date().getFullYear()} Chachiji&apos;s Homemade Cuisine. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2.5 font-medium text-[11px] sm:text-xs">
            <span>FSSAI Lic. No: <strong className="text-[#8C201C]">{BRAND_INFO.fssaiNumber}</strong></span>
            <span>•</span>
            <span>GSTIN: <strong>{BRAND_INFO.gstNumber}</strong></span>
            <span>•</span>
            <span>Vaishali, Bihar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

