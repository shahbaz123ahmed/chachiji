"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRAND_INFO } from "@/data/brandInfo";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#8B3E3E] text-[#FFFFFF] border-t-2 border-[#733232] relative overflow-hidden">
      {/* 16. Promotional / Newsletter Strip - Solid #733232 background with #F7A77A CTA */}
      <div className="border-b border-[#733232] bg-[#733232] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left max-w-xl">
            <span className="text-[11px] uppercase tracking-widest text-[#F7A77A] font-bold flex items-center justify-center lg:justify-start gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Join the Chachiji Family
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-2">
              Get 10% Off Your First Order
            </h3>
            <p className="text-xs sm:text-sm text-[#FCE9D6] leading-relaxed font-medium">
              Subscribe for new seasonal pickle batches, Mithila harvesting stories, and exclusive community discounts.
            </p>
          </div>

          <div className="w-full max-w-md">
            {isSubscribed ? (
              <div className="bg-[#8B3E3E] border border-[#F7A77A] rounded-2xl p-4 text-center text-xs text-[#FCE9D6] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F7A77A]" />
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
                  className="flex-1 bg-[#8B3E3E] border-2 border-[#FCE9D6] focus:border-[#F7A77A] rounded-xl px-4 py-3 text-xs text-[#FFFFFF] placeholder:text-[#FCE9D6] font-medium focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#F7A77A] hover:bg-[#E89565] text-[#333333] font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-md active:scale-95"
                >
                  <span>Get 10% Off</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 17. Main Footer Links - Rich Solid #8B3E3E */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-3xl font-bold tracking-tight text-[#FFFFFF]">
                CHACHIJI
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#F7A77A] font-bold mt-0.5">
                Homemade Cuisine
              </span>
            </div>
            <p className="text-xs text-[#FCE9D6] leading-relaxed max-w-sm font-medium">
              Handcrafting traditional Indian culinary treasures in small batches. Sun-cured in ceramic martabans with pure wood-pressed mustard oil and harvested from the sacred wetlands of Mithila, Bihar.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-[#FCE9D6]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F7A77A] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">
                  {BRAND_INFO.address.line1}, {BRAND_INFO.address.landmark}, {BRAND_INFO.address.milestone}, {BRAND_INFO.address.city}, {BRAND_INFO.address.state} - {BRAND_INFO.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F7A77A] shrink-0" />
                <a href="tel:+918860488004" className="hover:text-[#F7A77A] transition-colors font-medium">
                  {BRAND_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F7A77A] shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-[#F7A77A] transition-colors font-medium">
                  {BRAND_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#733232] hover:bg-[#F7A77A] hover:text-[#333333] flex items-center justify-center text-[#FFFFFF] transition-all shadow-xs"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#733232] hover:bg-[#F7A77A] hover:text-[#333333] flex items-center justify-center text-[#FFFFFF] transition-all shadow-xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#733232] hover:bg-[#25D366] hover:text-white flex items-center justify-center text-[#FFFFFF] transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F7A77A]">
              Shop Flavours
            </h4>
            <ul className="space-y-2 text-xs text-[#FFFFFF]">
              <li>
                <Link href="/shop" className="hover:text-[#F7A77A] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop/achar" className="hover:text-[#F7A77A] transition-colors">
                  Handcrafted Achar
                </Link>
              </li>
              <li>
                <Link href="/shop/makhana" className="hover:text-[#F7A77A] transition-colors">
                  Mithila Makhana
                </Link>
              </li>
              <li>
                <Link href="/shop/bundles" className="hover:text-[#F7A77A] transition-colors">
                  Gift Boxes &amp; Bundles
                </Link>
              </li>
              <li>
                <Link href="/product/mithila-bharwa-lal-mirch-achar" className="hover:text-[#F7A77A] transition-colors">
                  Bharwa Lal Mirch
                </Link>
              </li>
              <li>
                <Link href="/product/grade-a-mithila-phool-makhana" className="hover:text-[#F7A77A] transition-colors">
                  Grade A+ Raw Makhana
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Brand Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F7A77A]">
              Our Heritage
            </h4>
            <ul className="space-y-2 text-xs text-[#FFFFFF]">
              <li>
                <Link href="/about" className="hover:text-[#F7A77A] transition-colors">
                  Our Story &amp; Roots
                </Link>
              </li>
              <li>
                <Link href="/about#process" className="hover:text-[#F7A77A] transition-colors">
                  Sun-Curing Process
                </Link>
              </li>
              <li>
                <Link href="/about#mithila" className="hover:text-[#F7A77A] transition-colors">
                  The Mithila Wetland Connection
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F7A77A] transition-colors">
                  Contact Our Kitchen
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#F7A77A] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Policies Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F7A77A]">
              Help &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#FFFFFF]">
              <li>
                <Link href="/track-order" className="hover:text-[#F7A77A] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#F7A77A] transition-colors">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#F7A77A] transition-colors">
                  Returns &amp; Replacements
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#F7A77A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F7A77A] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#F7A77A] transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#733232] bg-[#733232] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FCE9D6]">
          <p>© {new Date().getFullYear()} Chachiji&apos;s Homemade Cuisine. All rights reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            <span>Crafted with devotion in Vaishali &amp; Mithila, Bihar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
