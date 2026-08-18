"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { Search, X, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useSearch();
  const { addToCart } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  const popularSearches = [
    "Bharwa Lal Mirch",
    "Mithila Makhana",
    "Kacha Aam Achar",
    "Bihari Oal",
    "Pink Salt Makhana",
    "Heritage Box",
  ];

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchQuery.trim() === ""
    ? []
    : PRODUCTS.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          (item.hindiName && item.hindiName.toLowerCase().includes(query)) ||
          item.category.toLowerCase().includes(query) ||
          item.shortDescription.toLowerCase().includes(query) ||
          item.ingredients.some((ing) => ing.toLowerCase().includes(query))
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FFFFFF] text-[#333333]">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-6 sm:pt-10 pb-4">
        <div className="flex items-center justify-between border-b border-[rgba(51,51,51,0.10)] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#8B3E3E] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F7A77A]" />
              Discover Authentic Flavours
            </span>
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="flex items-center gap-1.5 text-xs text-[#333333] hover:text-[#8B3E3E] bg-[#FCE9D6] hover:bg-[#F7A77A] px-4 py-2 rounded-full transition-colors border border-[rgba(51,51,51,0.10)] font-bold shadow-2xs"
            aria-label="Close search"
          >
            <span className="hidden sm:inline">Close (Esc)</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Search Input */}
        <div className="relative mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#8B3E3E]" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Bharwa Lal Mirch, Mithila Makhana, Aam Achar..."
            className="w-full bg-[#FFFFFF] border-2 border-[rgba(51,51,51,0.20)] focus:border-[#8B3E3E] rounded-2xl pl-14 pr-12 py-4 text-base sm:text-lg text-[#333333] font-semibold placeholder:text-[#777777] shadow-sm focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#8B3E3E] p-1"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#777777] font-semibold">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="bg-[#FCE9D6] hover:bg-[#F7A77A] text-[#333333] border border-[rgba(51,51,51,0.10)] px-3 py-1 rounded-full transition-colors font-semibold shadow-2xs"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Container */}
      <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full px-4 py-6">
        {searchQuery.trim() === "" ? (
          <div className="text-center py-12">
            <p className="font-serif text-2xl font-bold text-[#8B3E3E] mb-2">
              Taste the authentic heritage of Mithila
            </p>
            <p className="text-sm text-[#555555] font-medium max-w-md mx-auto">
              Type ingredients like &apos;mustard oil&apos;, &apos;amla&apos;, &apos;yam&apos;, or browse our artisanal pickles and GI-tagged makhana.
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-[#8B3E3E] font-bold">
                Found {filteredProducts.length} handcrafted products
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#FFFFFF] border-2 border-[rgba(51,51,51,0.10)] hover:border-[#8B3E3E] rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex gap-3.5 mb-3"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#FCE9D6]">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#8B3E3E] tracking-wider block">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-base text-[#333333] font-bold leading-snug line-clamp-1 group-hover:text-[#8B3E3E] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#555555] font-medium line-clamp-1 mt-0.5">
                        {product.tagline}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-base font-bold text-[#8B3E3E]">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-[#888888] line-through">
                          ₹{product.mrp}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-2 pt-2 border-t border-[rgba(51,51,51,0.08)]">
                    <button
                      onClick={() => {
                        addToCart(product);
                        setIsSearchOpen(false);
                      }}
                      className="flex-1 bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#FFFFFF]" />
                      <span>Quick Add</span>
                    </button>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="bg-[#FCE9D6] hover:bg-[#F7A77A] text-[#333333] p-2.5 rounded-xl transition-colors border border-[rgba(51,51,51,0.10)]"
                      aria-label="View product details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-serif text-xl font-bold text-[#333333] mb-2">
              No exact flavours found for &quot;{searchQuery}&quot;
            </p>
            <p className="text-sm text-[#555555] font-medium mb-6">
              Try searching for &quot;Achar&quot;, &quot;Makhana&quot;, &quot;Mirch&quot;, or &quot;Gift Box&quot;.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="inline-flex items-center gap-2 bg-[#8B3E3E] text-[#FFFFFF] text-xs font-bold py-3 px-6 rounded-xl hover:bg-[#733232] transition-colors shadow-md"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
