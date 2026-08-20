import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Lock,
  Eye,
  Server,
  UserCheck,
  ChevronRight,
  Sparkles,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy | Chachiji Homemade Cuisine",
  description:
    "Privacy Policy for Chachiji's Homemade Cuisine. Transparent information regarding customer data protection, order processing, and payment security.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FFF9F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#777777] mb-8">
          <Link href="/" className="hover:text-[#8C201C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#8C201C] font-bold">Privacy Policy</span>
        </div>

        {/* Hero Header Card */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal direction="up" delay={0}>
            <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A4A]" />
              Data Trust &amp; Integrity
            </span>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] tracking-tight mb-3">
              Privacy Policy
            </h1>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed max-w-lg mx-auto">
              Your trust is our most treasured recipe. We treat your personal information with the same uncompromising honesty that goes into every jar of our achar.
            </p>
          </Reveal>
        </div>

        {/* 3 Privacy Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">256-Bit SSL Encryption</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">All checkout data is secured with bank-grade encryption.</p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <Eye className="w-5 h-5 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">Zero Data Selling</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">We never sell or rent your mobile number or email to third parties.</p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE7DD] text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-5 h-5 text-[#8C201C]" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#231F20]">RBI Authorized Payments</h4>
            <p className="text-xs text-[#555555] font-medium mt-1">Secure UPI and card processing via certified Indian payment gateways.</p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border border-[#EFE7DD] shadow-sm space-y-8 text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed mb-12">
          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">1. Information We Collect</h2>
            <p className="text-[#555555]">
              When you browse, create an account, or place an order on <strong>chachiji.in</strong>, we collect necessary customer details including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-xs text-[#555555]">
              <li><strong>Contact Information:</strong> Name, delivery address, pincode, phone number, and email address.</li>
              <li><strong>Order History:</strong> Product items ordered, quantities, dates of purchase, and delivery preferences.</li>
              <li><strong>Technical Data:</strong> IP address, device type, browser information, and session cookies to ensure cart functionality.</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">2. How We Use Your Data</h2>
            <p className="text-[#555555]">
              Your personal data is used solely for the following legitimate purposes:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-xs text-[#555555]">
              <li>Processing, packing, and dispatching your orders from our Vaishali kitchen.</li>
              <li>Sending live delivery tracking updates and shipment notifications via SMS, WhatsApp, and email.</li>
              <li>Providing customer support regarding delivery scheduling or flavor inquiries.</li>
              <li>Occasional seasonal harvest newsletters (you can unsubscribe anytime with one click).</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">3. Payment Processing &amp; Card Security</h2>
            <p className="text-[#555555]">
              All electronic payments on our website are handled through certified, PCI-DSS compliant Indian payment gateways (Razorpay / Cashfree). <strong>Chachiji never stores your complete debit/credit card numbers, CVVs, or Netbanking passwords on our servers.</strong>
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">4. Data Sharing with Courier Partners</h2>
            <p className="text-[#555555]">
              Your shipping name, destination address, and phone number are shared strictly with our contracted domestic courier partners (BlueDart, Delhivery, Xpressbees) solely to complete physical doorstep delivery and verification.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">5. Cookies &amp; Tracking</h2>
            <p className="text-[#555555]">
              We use minimal, essential browser cookies to remember the items in your shopping bag, applied coupon codes, and wishlist preferences. You can disable cookies in your browser settings, though it may affect your checkout experience.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-xl font-bold text-[#8C201C]">6. Your Data Rights &amp; Deletion</h2>
            <p className="text-[#555555]">
              You have the right to request a copy of your stored customer records or request complete deletion of your account. To do so, please write to our Data Privacy Desk at <a href={`mailto:${BRAND_INFO.email}`} className="text-[#8C201C] font-bold underline">{BRAND_INFO.email}</a>.
            </p>
          </section>
        </div>

        {/* Contact Strip */}
        <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#EFE7DD] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="font-serif text-xl font-bold text-[#231F20]">Questions About Your Data?</h4>
            <p className="text-xs text-[#555555] font-medium mt-0.5">
              Contact our grievance officer for any privacy or account assistance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email Privacy Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
