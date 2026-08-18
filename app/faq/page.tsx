"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAQS } from "@/data/faqs";
import { BRAND_INFO } from "@/data/brandInfo";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

export default function FAQPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Pickles & Craftsmanship",
    "Makhana & Sourcing",
    "Shipping & Delivery",
    "Orders & Shelf Life",
  ];

  const filteredFaqs = FAQS.filter((f) =>
    selectedCategory === "All" ? true : f.category === selectedCategory
  );

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3E3E]">
            Heritage Knowledge &amp; Guidance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#333333] mt-1 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] font-medium max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our traditional sun-curing methods, cold-pressed oils, Mithila wetland harvesting, and safe glass delivery.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                selectedCategory === cat
                  ? "bg-[#8B3E3E] text-[#FFFFFF] shadow-sm"
                  : "bg-[#FCE9D6] text-[#333333] hover:bg-[#F7A77A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion Items */}
        <div className="space-y-3.5 mb-14">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-2xl border-2 border-[rgba(51,51,51,0.10)] overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-[#333333] hover:text-[#8B3E3E] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8B3E3E] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#333333] font-medium leading-relaxed border-t border-[rgba(51,51,51,0.08)] bg-[#FCE9D6]/30">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-[#FCE9D6] rounded-3xl border border-[rgba(51,51,51,0.10)] p-8 text-center space-y-4 shadow-sm">
          <h3 className="font-serif text-2xl font-bold text-[#333333]">
            Still have a question?
          </h3>
          <p className="text-xs text-[#555555] font-medium max-w-md mx-auto">
            Our kitchen team in Vaishali is always delighted to assist with ingredient details, custom dietary queries, or order tracking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#F7A77A]" />
              <span>WhatsApp Our Kitchen</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-white/80 text-[#333333] font-bold text-xs px-6 py-3.5 rounded-xl border border-[rgba(51,51,51,0.12)] transition-colors shadow-2xs"
            >
              <span>Contact Us Form</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#333333]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
