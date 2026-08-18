"use client";

import React, { useState } from "react";
import { BRAND_INFO } from "@/data/brandInfo";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Order Inquiry",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
            Connect With Our Kitchen
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231F20] mt-1 mb-3">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
            Have questions regarding our sun-curing batch schedules, bulk corporate gifting, or order tracking? Reach out to our Vaishali kitchen directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Kitchen Address Card */}
            <div className="bg-[#FFF9F3] p-6 sm:p-7 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C201C] block">
                Direct Kitchen Facility
              </span>

              <div className="flex items-start gap-3 text-xs">
                <MapPin className="w-5 h-5 text-[#8C201C] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="text-[#231F20] font-bold block text-sm">
                    Chachiji&apos;s Homemade Cuisine
                  </strong>
                  <p className="text-[#555555] font-medium leading-relaxed">
                    {BRAND_INFO.address.line1}, {BRAND_INFO.address.landmark},
                    <br />
                    {BRAND_INFO.address.milestone}, {BRAND_INFO.address.city},
                    <br />
                    {BRAND_INFO.address.state} - {BRAND_INFO.address.pincode}, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs pt-2 border-t border-[rgba(51,51,51,0.10)]">
                <Phone className="w-4 h-4 text-[#8C201C] shrink-0" />
                <a href="tel:+918860488004" className="text-[#231F20] font-bold hover:text-[#8C201C]">
                  {BRAND_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <Mail className="w-4 h-4 text-[#8C201C] shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="text-[#231F20] font-bold hover:text-[#8C201C]">
                  {BRAND_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <Clock className="w-4 h-4 text-[#8C201C] shrink-0" />
                <span className="text-[#555555] font-medium">Mon - Sat: 9:00 AM to 7:00 PM IST</span>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C201C] block">
                Instant WhatsApp Assistance
              </span>
              <p className="text-xs text-[#555555] font-medium leading-relaxed">
                Connect directly with our care coordinator for urgent order modifications, gifting customisation, or culinary recommendations.
              </p>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm w-full justify-center"
              >
                <MessageCircle className="w-4 h-4 text-[#E07A4A]" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#231F20] mb-2">
              Send a Note to Our Kitchen
            </h3>
            <p className="text-xs text-[#555555] font-medium mb-6">
              We respond to all customer inquiries within 12 business hours.
            </p>

            {isSubmitted ? (
              <div className="bg-[#FFF9F3] border border-[#E07A4A] rounded-2xl p-6 text-center text-[#8C201C] space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-[#8C201C]" />
                <h4 className="font-serif text-lg font-bold">Dhanyawad! Message Sent.</h4>
                <p className="text-xs text-[#555555] font-medium">
                  We have received your message and will reach out promptly via email or phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#231F20] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#231F20] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#231F20] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#231F20] mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3.5 py-2.5 text-xs text-[#231F20] font-bold focus:outline-none focus:border-[#8C201C]"
                    >
                      <option>Order Inquiry</option>
                      <option>Bulk / Corporate Gifting</option>
                      <option>Product &amp; Ingredient Question</option>
                      <option>Distribution / Partnership</option>
                      <option>Other Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#231F20] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you today? Feel free to mention any specific questions..."
                    className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl p-3 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs sm:text-sm py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#FFFFFF]" />
                  <span>Send Message to Kitchen</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

