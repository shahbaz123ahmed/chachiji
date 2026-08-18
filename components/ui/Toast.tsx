"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, X } from "lucide-react";

export default function Toast() {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 animate-bounce-short">
      <div className="bg-[#8C201C] text-[#FFFFFF] px-5 py-3.5 rounded-full shadow-2xl border border-[#6B1815] flex items-center gap-3 text-sm font-medium tracking-wide">
        <CheckCircle2 className="w-5 h-5 text-[#E07A4A] shrink-0" />
        <span>{toastMessage}</span>
        <button
          onClick={() => setToastMessage(null)}
          className="text-[#FFFFFF]/70 hover:text-white ml-2 p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

