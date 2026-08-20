"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Truck,
  CheckCircle2,
  Package,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  MessageCircle,
  ChevronRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";
import Reveal from "@/components/ui/Reveal";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(Boolean(initialOrderId));
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSearched(true);
      }, 500);
    }
  };

  return (
    <div className="bg-[#FFF9F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#777777] mb-8">
          <Link href="/" className="hover:text-[#8C201C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#8C201C] font-bold">Track Shipment</span>
        </div>

        {/* Hero Header Card */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal direction="up" delay={0}>
            <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A4A]" />
              Live Kitchen-to-Doorstep Tracking
            </span>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] tracking-tight mb-3">
              Track Your Shipment
            </h1>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed max-w-lg mx-auto">
              Every jar is handcrafted and packed with 5-layer honeycomb protection at our Vaishali kitchen before express courier handover.
            </p>
          </Reveal>
        </div>

        {/* Tracking Input Card */}
        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border border-[#EFE7DD] shadow-sm mb-12 max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#231F20] mb-2">
                  Order ID / AWB Number <span className="text-[#8C201C]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. CH-892104"
                    className="w-full bg-[#FFF9F3] border border-[#EFE7DD] focus:border-[#8C201C] rounded-2xl px-4 py-3.5 text-xs text-[#231F20] font-bold uppercase tracking-wider focus:outline-none transition-colors"
                  />
                  <Package className="w-4 h-4 text-[#999999] absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
                <span className="text-[10px] text-[#777777] font-medium mt-1 block">
                  Found in your SMS / WhatsApp confirmation.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#231F20] mb-2">
                  Registered Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[#FFF9F3] border border-[#EFE7DD] focus:border-[#8C201C] rounded-2xl px-4 py-3.5 text-xs text-[#231F20] font-semibold focus:outline-none transition-colors"
                  />
                  <Phone className="w-4 h-4 text-[#999999] absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
                <span className="text-[10px] text-[#777777] font-medium mt-1 block">
                  Used for OTP / address verification.
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs sm:text-sm py-4 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4 text-[#FFFFFF]" />
                  <span>Fetch Real-Time Status</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Tracking Result Box */}
        {searched && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#EFE7DD] p-6 sm:p-10 shadow-md mb-12 space-y-8 animate-in fade-in max-w-4xl mx-auto">
            {/* Header info strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE7DD] pb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C201C] bg-[#FFF9F3] px-2.5 py-0.5 rounded-md border border-[#EFE7DD]">
                    Live Shipment
                  </span>
                  <span className="text-xs text-[#777777] font-medium">Order #{orderId || "CH-892104"}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
                  Estimated Delivery: <span className="text-[#8C201C]">In 2 Days (By Friday)</span>
                </h3>
                <p className="text-xs text-[#555555] font-medium mt-1 flex items-center gap-2">
                  <span>Courier: <strong>BlueDart Express Air</strong></span>
                  <span>•</span>
                  <span>AWB: <strong>BD9842103IN</strong></span>
                </p>
              </div>

              <div className="bg-[#FFF9F3] border border-[#E07A4A] text-[#8C201C] px-4 py-2.5 rounded-2xl font-bold text-xs self-start sm:self-auto flex items-center gap-2 shadow-2xs">
                <Truck className="w-4 h-4 text-[#E07A4A] animate-pulse" />
                <span>On The Way • In Transit</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-8 relative pl-7 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EFE7DD]">
              {/* Step 1 - Completed */}
              <div className="relative">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-[#231F20]">Order Verified &amp; Hand-Selected</span>
                    <span className="text-[10px] bg-[#FFF9F3] text-[#8C201C] font-bold px-2 py-0.5 rounded border border-[#EFE7DD]">Completed</span>
                  </div>
                  <span className="text-[11px] text-[#777777] font-semibold block mt-0.5">Vaishali Kitchen Hub • 18 Aug 2026, 11:20 AM</span>
                  <p className="text-xs text-[#555555] font-medium mt-1.5 leading-relaxed">
                    Fresh batch of sun-cured pickles and GI-tagged makhana retrieved from temperature-controlled storage and inspected for seal integrity.
                  </p>
                </div>
              </div>

              {/* Step 2 - Completed */}
              <div className="relative">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-[#231F20]">Artisan Shockproof Packaging</span>
                    <span className="text-[10px] bg-[#FFF9F3] text-[#8C201C] font-bold px-2 py-0.5 rounded border border-[#EFE7DD]">Completed</span>
                  </div>
                  <span className="text-[11px] text-[#777777] font-semibold block mt-0.5">Hajipur Dispatch Center • 18 Aug 2026, 04:45 PM</span>
                  <p className="text-xs text-[#555555] font-medium mt-1.5 leading-relaxed">
                    Packed inside 5-layer honeycomb shockproof buffer with tamper-evident seal and heavy-duty outer corrugated carton.
                  </p>
                </div>
              </div>

              {/* Step 3 - In Progress */}
              <div className="relative">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center ring-4 ring-[#FFF9F3] shadow-xs">
                  <Truck className="w-3.5 h-3.5 text-[#E07A4A] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-[#8C201C]">In Flight • Air Cargo Transit</span>
                    <span className="text-[10px] bg-[#E07A4A] text-[#231F20] font-bold px-2 py-0.5 rounded shadow-2xs">Active</span>
                  </div>
                  <span className="text-[11px] text-[#777777] font-semibold block mt-0.5">Patna Cargo Airport Hub • 19 Aug 2026, 09:15 AM</span>
                  <p className="text-xs text-[#555555] font-medium mt-1.5 leading-relaxed">
                    Bagged for scheduled air cargo transit to destination metro hub for same-day regional dispatch.
                  </p>
                </div>
              </div>

              {/* Step 4 - Pending */}
              <div className="relative opacity-50">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-[#FFFFFF] border-2 border-[#EFE7DD] flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-[#999999]" />
                </div>
                <div>
                  <span className="font-serif text-base font-bold text-[#231F20]">Out for Final Delivery</span>
                  <span className="text-[11px] text-[#777777] font-semibold block mt-0.5">Destination Local Delivery Station</span>
                  <p className="text-xs text-[#777777] font-medium mt-1">Delivery partner will call prior to door delivery.</p>
                </div>
              </div>
            </div>

            {/* Quick Dispatch Guarantee Banner */}
            <div className="bg-[#FFF9F3] p-5 rounded-2xl border border-[#EFE7DD] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#8C201C] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#E07A4A]" />
                </div>
                <div>
                  <span className="font-bold text-[#231F20] block">100% Transit Glass Safety Guarantee</span>
                  <span className="text-[#555555]">Damaged in transit? Instant replacement with zero return questions asked.</span>
                </div>
              </div>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Logistics</span>
              </a>
            </div>
          </div>
        )}

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-4">
              <Clock className="w-5 h-5 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20] mb-1">24-48 Hour Dispatch</h4>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Every jar is freshly packaged and dispatched directly from our Vaishali kitchen within 48 hours.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-5 h-5 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20] mb-1">5-Layer Protection</h4>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Engineered honeycomb sleeves and airtight seals ensure pristine delivery with zero leakages.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-4">
              <Truck className="w-5 h-5 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20] mb-1">19,000+ Pin Codes</h4>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Fast, reliable delivery across Metro, Tier-2, and Tier-3 cities in India via BlueDart &amp; Delhivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FFF9F3] min-h-screen py-20 text-center font-serif text-lg text-[#8C201C]">
          Loading Tracker...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
