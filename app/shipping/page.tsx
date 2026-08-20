import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  Package,
  ChevronRight,
  Sparkles,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Chachiji Homemade Cuisine",
  description:
    "Learn about Chachiji's domestic shipping rates, express delivery timelines, safe multi-layer glass jar packaging, and free shipping on orders above ₹599.",
};

export default function ShippingPage() {
  return (
    <div className="bg-[#FFF9F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#777777] mb-8">
          <Link href="/" className="hover:text-[#8C201C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#8C201C] font-bold">Shipping &amp; Delivery</span>
        </div>

        {/* Hero Header Card */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal direction="up" delay={0}>
            <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A4A]" />
              Safe Pan-India Fulfilment
            </span>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] tracking-tight mb-3">
              Shipping &amp; Delivery Policy
            </h1>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed max-w-lg mx-auto">
              Prepared fresh in small batches at our Vaishali kitchen and delivered safely across 19,000+ Indian pincodes in shockproof glass-protection packaging.
            </p>
          </Reveal>
        </div>

        {/* 4 Feature Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs hover:border-[#8C201C] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <Truck className="w-6 h-6 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">Free Shipping</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">On all orders above ₹599 across India.</p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs hover:border-[#8C201C] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">24-48 Hr Dispatch</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">Bottled fresh and packed within 48 hours.</p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs hover:border-[#8C201C] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">Shockproof Glass</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">Multi-layer 5-ply honeycomb buffer.</p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs hover:border-[#8C201C] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">19,000+ Pin Codes</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">Delivered via BlueDart &amp; Delhivery Air.</p>
          </div>
        </div>

        {/* Regional Timelines Table Card */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#EFE7DD] p-6 sm:p-10 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE7DD] pb-6 mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C201C]">
                Estimated Transit Timelines
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20] mt-0.5">
                Delivery Schedule by Region
              </h3>
            </div>
            <span className="text-xs bg-[#FFF9F3] border border-[#EFE7DD] text-[#8C201C] font-bold px-3 py-1.5 rounded-xl self-start sm:self-auto">
              Origin: Vaishali Kitchen, Bihar
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EFE7DD] text-[#777777] uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3 px-4">Destination Region</th>
                  <th className="py-3 px-4">Key Cities Covered</th>
                  <th className="py-3 px-4">Estimated Delivery</th>
                  <th className="py-3 px-4">Express Courier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DD] text-[#231F20] font-medium">
                <tr className="hover:bg-[#FFF9F3] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#8C201C]">Bihar, Jharkhand &amp; UP</td>
                  <td className="py-3.5 px-4 text-xs text-[#555555]">Patna, Ranchi, Varanasi, Lucknow, Muzaffarpur</td>
                  <td className="py-3.5 px-4 font-semibold">2 - 3 Working Days</td>
                  <td className="py-3.5 px-4 text-xs text-[#777777]">Surface Priority</td>
                </tr>
                <tr className="hover:bg-[#FFF9F3] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#8C201C]">Metro Cities</td>
                  <td className="py-3.5 px-4 text-xs text-[#555555]">Delhi NCR, Mumbai, Bengaluru, Hyderabad, Kolkata</td>
                  <td className="py-3.5 px-4 font-semibold">3 - 4 Working Days</td>
                  <td className="py-3.5 px-4 text-xs text-[#777777]">Express Air Cargo</td>
                </tr>
                <tr className="hover:bg-[#FFF9F3] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#8C201C]">Rest of India (Tier 2/3)</td>
                  <td className="py-3.5 px-4 text-xs text-[#555555]">Pune, Ahmedabad, Jaipur, Chandigarh, Kochi, Indore</td>
                  <td className="py-3.5 px-4 font-semibold">4 - 6 Working Days</td>
                  <td className="py-3.5 px-4 text-xs text-[#777777]">Air / Priority Ground</td>
                </tr>
                <tr className="hover:bg-[#FFF9F3] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#8C201C]">North-East &amp; Remote</td>
                  <td className="py-3.5 px-4 text-xs text-[#555555]">Guwahati, Imphal, Agartala, Leh, Port Blair</td>
                  <td className="py-3.5 px-4 font-semibold">6 - 8 Working Days</td>
                  <td className="py-3.5 px-4 text-xs text-[#777777]">Specialty Air Transit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border border-[#EFE7DD] shadow-sm space-y-8 text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed mb-12">
          <section className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8C201C] text-white text-xs font-bold flex items-center justify-center">1</span>
              <h2 className="font-serif text-xl font-bold text-[#8C201C]">Shipping Rates &amp; Free Delivery Threshold</h2>
            </div>
            <p className="pl-8 text-[#555555]">
              We offer complimentary <strong>Free Standard Shipping</strong> on all domestic orders of <strong>₹599 or more</strong>. For orders below ₹599, a nominal handling fee of <strong>₹49</strong> is automatically applied at checkout to cover glass packaging and courier charges.
            </p>
          </section>

          <section className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8C201C] text-white text-xs font-bold flex items-center justify-center">2</span>
              <h2 className="font-serif text-xl font-bold text-[#8C201C]">5-Layer Honeycomb Glass Protection</h2>
            </div>
            <p className="pl-8 text-[#555555]">
              Traditional pickles cure and preserve best in authentic glass jars. To ensure your order reaches you in pristine condition without leaks or breakage, we wrap each individual jar in:
            </p>
            <ul className="pl-14 list-disc space-y-1 text-xs text-[#555555]">
              <li>Induction-sealed, airtight leakproof cap protection.</li>
              <li>Custom 5-ply honeycomb shock-absorbent sleeves.</li>
              <li>Inner carton partitioning so jars never touch each other.</li>
              <li>Heavy-duty outer corrugated shipping carton with fragile stickers.</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8C201C] text-white text-xs font-bold flex items-center justify-center">3</span>
              <h2 className="font-serif text-xl font-bold text-[#8C201C]">Order Tracking &amp; Notifications</h2>
            </div>
            <p className="pl-8 text-[#555555]">
              Once your shipment is handed over to our courier partner (BlueDart, Delhivery, or Xpressbees), you will receive automated tracking updates via SMS, Email, and WhatsApp. You can also track your live shipment anytime on our{" "}
              <Link href="/track-order" className="text-[#8C201C] font-bold underline">
                Track Order Page
              </Link>.
            </p>
          </section>

          <section className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8C201C] text-white text-xs font-bold flex items-center justify-center">4</span>
              <h2 className="font-serif text-xl font-bold text-[#8C201C]">Address Changes &amp; Rescheduling</h2>
            </div>
            <p className="pl-8 text-[#555555]">
              If you need to change your delivery address or hold delivery dates, please contact us within 4 hours of placing the order via WhatsApp at{" "}
              <a href={BRAND_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#8C201C] font-bold underline">
                +91 88604 88004
              </a>{" "}
              or email{" "}
              <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8C201C] font-bold underline">
                {BRAND_INFO.email}
              </a>.
            </p>
          </section>
        </div>

        {/* Direct Help CTA Strip */}
        <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#EFE7DD] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="font-serif text-xl font-bold text-[#231F20]">Have a Shipping Query?</h4>
            <p className="text-xs text-[#555555] font-medium mt-0.5">
              Our Vaishali kitchen fulfillment team is available Monday to Saturday, 9 AM – 7 PM.
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
              <span>WhatsApp Support</span>
            </a>
            <Link
              href="/track-order"
              className="bg-[#FFF9F3] hover:bg-[#EFE7DD] text-[#8C201C] border border-[#EFE7DD] font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
