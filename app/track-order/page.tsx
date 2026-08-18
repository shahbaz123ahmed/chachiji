"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(Boolean(initialOrderId));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
            Live Dispatch Updates
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] mt-1 mb-2">
            Track Your Shipment
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
            Enter your Order ID (from your confirmation email or SMS) to check the live packing and courier status.
          </p>
        </div>

        {/* Search Box - Solid Cream */}
        <div className="bg-[#FFF9F3] p-6 sm:p-8 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-sm mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#231F20] mb-1">
                  Order ID *
                </label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. CH-948210"
                  className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-4 py-2.5 text-xs text-[#231F20] font-bold uppercase focus:outline-none focus:border-[#8C201C]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#231F20] mb-1">
                  Phone Number or Email (Optional)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-4 py-2.5 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#FFFFFF]" />
              <span>Track Order Status</span>
            </button>
          </form>
        </div>

        {/* Results Timeline (Simulated) */}
        {searched && (
          <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[rgba(51,51,51,0.10)] p-6 sm:p-10 shadow-md space-y-8 animate-in fade-in">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(51,51,51,0.10)] pb-6 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C201C]">
                  Tracking Summary
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#231F20] mt-0.5">
                  Order #{orderId || "CH-948210"}
                </h3>
                <p className="text-[#555555] font-medium mt-0.5">
                  Carrier: <strong>BlueDart Express Logistics</strong> • Tracking AWB: <strong>BD83910249IN</strong>
                </p>
              </div>

              <div className="bg-[#E07A4A] text-[#231F20] px-4 py-2 rounded-xl font-bold text-xs self-start sm:self-auto shadow-2xs">
                In Transit — Expected by Friday
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[rgba(51,51,51,0.12)]">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#231F20] block text-sm">Order Received &amp; Verified</span>
                  <span className="text-[#777777] font-medium">Vaishali Kitchen, Bihar • 16 Feb 2026, 10:30 AM</span>
                  <p className="text-[#555555] font-medium mt-1">Batch reserved and transferred to packing queue.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#231F20] block text-sm">Artisan Packaged with Glass Protection</span>
                  <span className="text-[#777777] font-medium">Hajipur Hub • 16 Feb 2026, 04:15 PM</span>
                  <p className="text-[#555555] font-medium mt-1">Sealed with tamper-evident strip and honeycomb padding.</p>
                </div>
              </div>

              {/* Step 3 (Active) */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center animate-pulse">
                  <Truck className="w-3.5 h-3.5 text-[#E07A4A]" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#8C201C] block text-sm">In Transit via Express Air</span>
                  <span className="text-[#777777] font-medium">Patna Cargo Airport Hub • 17 Feb 2026, 08:20 AM</span>
                  <p className="text-[#555555] font-medium mt-1">Package in flight to destination regional distribution center.</p>
                </div>
              </div>

              {/* Step 4 (Pending) */}
              <div className="relative opacity-40">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#FFFFFF] border-2 border-[rgba(51,51,51,0.20)] flex items-center justify-center" />
                <div className="text-xs">
                  <span className="font-bold text-[#231F20] block text-sm">Out for Delivery</span>
                  <span className="text-[#777777] font-medium">Destination Courier Center</span>
                </div>
              </div>
            </div>

            {/* Help box */}
            <div className="bg-[#FFF9F3] p-4 rounded-2xl border border-[rgba(51,51,51,0.10)] flex items-center justify-between text-xs">
              <span className="text-[#231F20] font-medium">Need assistance with delivery location or rescheduling?</span>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8C201C] font-bold hover:underline"
              >
                Chat with Logistics Team
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FFFFFF] min-h-screen py-20 text-center font-serif text-lg text-[#8C201C]">
          Loading Tracker...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}

