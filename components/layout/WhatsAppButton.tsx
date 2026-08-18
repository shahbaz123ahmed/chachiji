"use client";

import React, { useState } from "react";
import { BRAND_INFO } from "@/data/brandInfo";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Small Chat Bubble */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#EBD7C5] p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-[#EBD7C5] pb-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C201C]">
                Chachiji Support
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#777777] hover:text-[#8C201C] p-0.5"
              aria-label="Close message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#231F20] leading-relaxed mb-3">
            Namaste! 🙏 Need help choosing authentic pickles or placing a bulk order? Chat with our kitchen in Vaishali.
          </p>
          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#8C201C] text-[#FFF9F3] hover:text-white shadow-xl hover:shadow-2xl border border-[#6B1815] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
        </span>
        <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110 text-[#FFFFFF]" />
      </button>
    </div>
  );
}

