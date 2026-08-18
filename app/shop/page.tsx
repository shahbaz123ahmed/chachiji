"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import {
  SlidersHorizontal,
  X,
  Search,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSpice, setSelectedSpice] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("bestsellers");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "achar", name: "Handcrafted Achar" },
    { id: "makhana", name: "Mithila Makhana" },
    { id: "bundles", name: "Curated Boxes & Gifts" },
  ];

  const spiceLevels = ["all", "Mild", "Medium", "Hot & Tangy", "Extra Spicy"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Spice level filter
      if (selectedSpice !== "all" && product.spiceLevel !== selectedSpice) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        const matchesHindi = product.hindiName?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesHindi) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "bestsellers") {
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      }
      if (sortBy === "price-low") {
        return a.price - b.price;
      }
      if (sortBy === "price-high") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [selectedCategory, selectedSpice, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedSpice("all");
    setSearchQuery("");
    setSortBy("bestsellers");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedSpice !== "all" || searchQuery !== "";

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
            The Complete Pantry
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#231F20] mt-1.5 mb-3">
            Handcrafted Flavours of Bihar
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
            Sun-cured pickles in ceramic martabans, GI-tagged Mithila wetland makhana, and curated gift boxes. Free shipping above ₹599.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-[#FFF9F3] p-4 rounded-2xl border border-[rgba(51,51,51,0.10)] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search inside shop */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C201C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or ingredients..."
              className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.15)] focus:border-[#8C201C] rounded-xl pl-10 pr-8 py-2.5 text-xs text-[#231F20] font-semibold placeholder:text-[#777777] focus:outline-none shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#8C201C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs (Desktop) - Solid #8C201C active vs Solid White */}
          <div className="hidden lg:flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#8C201C] text-[#FFFFFF] shadow-sm"
                    : "bg-[#FFFFFF] text-[#231F20] border border-[rgba(51,51,51,0.12)] hover:border-[#8C201C]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & Mobile Filter Toggle */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-[#FFFFFF] border border-[rgba(51,51,51,0.15)] px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#231F20]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C201C]" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#8C201C]" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#231F20] font-bold hidden sm:inline flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3 text-[#8C201C]" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.15)] rounded-xl px-3 py-2 text-xs font-bold text-[#231F20] focus:outline-none focus:border-[#8C201C]"
              >
                <option value="bestsellers">Bestsellers First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-[#555555] font-bold">Active filters:</span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 bg-[#8C201C] text-[#FFFFFF] font-bold px-3 py-1 rounded-lg shadow-2xs">
                Category: {categories.find((c) => c.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("all")}>
                  <X className="w-3.5 h-3.5 ml-1" />
                </button>
              </span>
            )}
            {selectedSpice !== "all" && (
              <span className="inline-flex items-center gap-1 bg-[#8C201C] text-[#FFFFFF] font-bold px-3 py-1 rounded-lg shadow-2xs">
                Spice: {selectedSpice}
                <button onClick={() => setSelectedSpice("all")}>
                  <X className="w-3.5 h-3.5 ml-1" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-[#8C201C] text-[#FFFFFF] font-bold px-3 py-1 rounded-lg shadow-2xs">
                Query: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-3.5 h-3.5 ml-1" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#8C201C] hover:underline ml-2 font-bold"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main Layout: Sidebar (Desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block space-y-6 bg-[#FFFFFF] p-6 rounded-2xl border-2 border-[rgba(51,51,51,0.10)] h-fit shadow-xs">
            <div className="flex items-center justify-between border-b border-[rgba(51,51,51,0.10)] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#231F20]">
                Filter Flavours
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#8C201C] hover:underline font-bold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C201C] mb-3">
                Category
              </h4>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? "bg-[#8C201C] text-[#FFFFFF]"
                        : "text-[#231F20] hover:bg-[#FFF9F3]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-80">
                      {cat.id === "all"
                        ? PRODUCTS.length
                        : PRODUCTS.filter((p) => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spice Level Filter */}
            <div className="pt-4 border-t border-[rgba(51,51,51,0.10)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C201C] mb-3">
                Spice Intensity
              </h4>
              <div className="space-y-1.5">
                {spiceLevels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSpice(lvl)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      selectedSpice === lvl
                        ? "bg-[#8C201C] text-[#FFFFFF]"
                        : "text-[#231F20] hover:bg-[#FFF9F3]"
                    }`}
                  >
                    {lvl === "all" ? "All Spice Levels" : lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Craftsmanship Assurance Box */}
            <div className="bg-[#FFF9F3] text-[#231F20] p-4 rounded-xl text-xs space-y-2 border border-[rgba(51,51,51,0.08)]">
              <span className="font-serif font-bold text-sm text-[#8C201C] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E07A4A]" />
                Pure Quality Promise
              </span>
              <p className="text-[11px] text-[#555555] font-medium leading-relaxed">
                All pickles naturally cured in sun-warmed ceramic martabans with 100% pure kachchi ghani mustard oil.
              </p>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between text-xs text-[#555555] font-semibold mb-4">
              <span>Showing {filteredProducts.length} handcrafted products</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#FFF9F3] rounded-3xl border border-[rgba(51,51,51,0.10)] p-8 shadow-xs">
                <p className="font-serif text-2xl font-bold text-[#231F20] mb-2">
                  No matching flavours found
                </p>
                <p className="text-xs text-[#555555] font-medium mb-6">
                  Try clearing some filter criteria to discover our full pantry.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#8C201C] text-[#FFFFFF] text-xs font-bold py-3 px-6 rounded-xl hover:bg-[#6B1815] transition-colors shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#FFFFFF] h-full ml-auto shadow-2xl flex flex-col justify-between p-6 border-l border-[rgba(51,51,51,0.10)]">
            <div>
              <div className="flex items-center justify-between border-b border-[rgba(51,51,51,0.10)] pb-4 mb-6">
                <h3 className="font-serif text-lg font-bold text-[#231F20]">
                  Filter Flavours
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#231F20] hover:text-[#8C201C]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C201C] mb-2">
                  Category
                </h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${
                        selectedCategory === cat.id
                          ? "bg-[#8C201C] text-[#FFFFFF]"
                          : "text-[#231F20] hover:bg-[#FFF9F3]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spice */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C201C] mb-2">
                  Spice Intensity
                </h4>
                <div className="space-y-1">
                  {spiceLevels.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedSpice(lvl)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${
                        selectedSpice === lvl
                          ? "bg-[#8C201C] text-[#FFFFFF]"
                          : "text-[#231F20] hover:bg-[#FFF9F3]"
                      }`}
                    >
                      {lvl === "all" ? "All Spice Levels" : lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-[#8C201C] text-[#FFFFFF] font-bold text-xs py-3.5 rounded-xl shadow-md"
            >
              Apply Filters ({filteredProducts.length} results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FFFFFF] min-h-screen py-20 text-center font-serif text-lg text-[#8C201C]">
          Loading Pantry...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

