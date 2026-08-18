"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/types/ecommerce";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/product/ProductCard";
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  Droplets,
  Sun,
  CheckCircle2,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
  MapPin,
  MessageSquarePlus,
  X,
} from "lucide-react";

interface ProductClientViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductClientView({
  product,
  relatedProducts,
}: ProductClientViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: "default",
      weight: product.weight,
      price: product.price,
      mrp: product.mrp,
      inStock: true,
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const [openAccordion, setOpenAccordion] = useState<string>("ingredients");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleAddToCart = (openDrawer = true) => {
    addToCart(product, selectedVariant, quantity, openDrawer);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity, false);
    router.push("/checkout");
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus("✓ Available! Standard delivery in 3-5 business days.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian postal pincode.");
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSubmitted(false);
      setReviewAuthor("");
      setReviewText("");
    }, 2000);
  };

  const savings = Math.max(0, selectedVariant.mrp - selectedVariant.price);

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 sm:pb-28">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-xs text-[#777777] flex items-center gap-1.5 font-medium">
        <Link href="/" className="hover:text-[#8C201C]">Home</Link>
        <span>/</span>
        <Link href={`/shop/${product.category}`} className="hover:text-[#8C201C] capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#8C201C] font-bold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Big Active Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FFF9F3] border-2 border-[rgba(51,51,51,0.10)] shadow-md">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isBestseller && (
                  <span className="bg-[#8C201C] text-[#FFFFFF] text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#E07A4A]" />
                    Bestseller
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="bg-[#E07A4A] text-[#231F20] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#231F20] hover:text-[#8C201C] shadow-sm transition-all border border-[rgba(51,51,51,0.10)]"
                aria-label="Toggle wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-[#8C201C] text-[#8C201C]" : "text-[#777777]"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-[#8C201C] scale-105 shadow-md"
                        : "border-[rgba(51,51,51,0.15)] opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8C201C]">
                  {product.category === "achar"
                    ? "Sun-Cured Mithila Pickle"
                    : product.category === "makhana"
                    ? "Mithila GI-Tagged Fox Nuts"
                    : "Curated Box Set"}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#F3A83B]">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-[#F3A83B]"
                            : "text-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[#231F20]">{product.rating}</span>
                  <span className="text-[#777777] font-medium">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title & Hindi Subtitle */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] leading-tight">
                {product.name}
              </h1>
              {product.hindiName && (
                <p className="text-base text-[#777777] font-serif italic mt-1">
                  {product.hindiName}
                </p>
              )}
            </div>

            {/* Price & Savings - Solid Crisp White Card */}
            <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-[#FFFFFF] border-2 border-[rgba(51,51,51,0.10)] shadow-xs">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#8C201C]">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <>
                  <span className="text-base text-[#888888] line-through font-medium">
                    ₹{selectedVariant.mrp}
                  </span>
                  <span className="bg-[#E07A4A] text-[#231F20] text-xs font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                    Save ₹{savings}
                  </span>
                </>
              )}
              <span className="text-[11px] text-[#777777] font-medium ml-auto">
                (Inclusive of all taxes)
              </span>
            </div>

            {/* Tagline & Short Description */}
            <p className="text-sm text-[#231F20] leading-relaxed font-medium">
              {product.shortDescription}
            </p>

            {/* Weight / Variant Selection */}
            {product.variants.length > 1 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C201C] mb-2.5">
                  Select Weight / Packaging
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                        selectedVariant.id === v.id
                          ? "bg-[#8C201C] text-[#FFFFFF] border-[#8C201C] shadow-sm"
                          : "bg-white text-[#231F20] border-[rgba(51,51,51,0.18)] hover:border-[#8C201C]"
                      }`}
                    >
                      <span>{v.weight}</span>
                      <span className="block text-[10px] font-normal opacity-90 mt-0.5">
                        ₹{v.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Modifier */}
                <div className="flex items-center border border-[rgba(51,51,51,0.15)] rounded-xl bg-white p-1 shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#231F20] hover:bg-[#FFF9F3] rounded-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#231F20]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#231F20] hover:bg-[#FFF9F3] rounded-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart: Solid #8C201C */}
                <button
                  onClick={() => handleAddToCart(true)}
                  className="flex-1 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs sm:text-sm py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#FFFFFF]" />
                  <span>Add to Basket</span>
                </button>
              </div>

              {/* Buy Now: Solid Vibrant #E07A4A */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#E07A4A] hover:bg-[#C96635] text-[#231F20] font-bold text-xs sm:text-sm py-4 px-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Zap className="w-4 h-4 fill-[#231F20]" />
                <span>Buy Now • Instant Checkout</span>
              </button>
            </div>

            {/* Pincode Estimator */}
            <div className="bg-[#FFF9F3] p-4 rounded-2xl border border-[rgba(51,51,51,0.10)] space-y-2 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C201C] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8C201C]" />
                Delivery Pincode Checker
              </span>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 560001)"
                  className="flex-1 bg-[#FFFFFF] border border-[rgba(51,51,51,0.15)] rounded-xl px-3 py-2 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                />
                <button
                  type="submit"
                  className="bg-[#8C201C] text-[#FFFFFF] text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#6B1815] transition-colors shadow-xs"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-xs font-bold text-[#8C201C]">{pincodeStatus}</p>
              )}
            </div>

            {/* Trust Badges Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#231F20]">
              <div className="flex items-center gap-2 bg-[#FFFFFF] p-3 rounded-xl border border-[rgba(51,51,51,0.10)] shadow-2xs">
                <Sun className="w-4 h-4 text-[#8C201C] shrink-0" />
                <span className="text-[11px] font-bold">100% Sun Cured in Martabans</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FFFFFF] p-3 rounded-xl border border-[rgba(51,51,51,0.10)] shadow-2xs">
                <Droplets className="w-4 h-4 text-[#8C201C] shrink-0" />
                <span className="text-[11px] font-bold">Kachchi Ghani Mustard Oil</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FFFFFF] p-3 rounded-xl border border-[rgba(51,51,51,0.10)] shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#8C201C] shrink-0" />
                <span className="text-[11px] font-bold">Zero Chemical Preservatives</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FFFFFF] p-3 rounded-xl border border-[rgba(51,51,51,0.10)] shadow-2xs">
                <Truck className="w-4 h-4 text-[#8C201C] shrink-0" />
                <span className="text-[11px] font-bold">Safe Glass Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why You'll Love It Highlight Section - Solid Cream */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#FFF9F3] text-[#231F20] p-8 sm:p-10 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C] block mb-1">
            Craftsmanship Highlights
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-6 text-[#231F20]">
            Why You&apos;ll Love {product.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.whyYouWillLoveIt.map((reason, i) => (
              <div key={i} className="bg-[#FFFFFF] p-4 rounded-2xl border border-[rgba(51,51,51,0.10)] flex items-start gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#8C201C] shrink-0 mt-0.5" />
                <p className="text-xs text-[#231F20] font-medium leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Tabs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#FFFFFF] rounded-3xl border border-[rgba(51,51,51,0.10)] p-6 sm:p-10 shadow-sm space-y-4">
          {/* 1. Description & Story */}
          <div className="border-b border-[rgba(51,51,51,0.10)] pb-4">
            <button
              onClick={() => setOpenAccordion(openAccordion === "story" ? "" : "story")}
              className="w-full flex items-center justify-between text-left py-2 font-serif text-xl font-bold text-[#231F20] hover:text-[#8C201C]"
            >
              <span>Heritage &amp; Description</span>
              <ChevronDown
                className={`w-5 h-5 text-[#8C201C] transition-transform duration-200 ${
                  openAccordion === "story" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "story" && (
              <div className="pt-3 text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed space-y-3">
                <p>{product.description}</p>
                {product.curingProcess && (
                  <p>
                    <strong className="text-[#8C201C]">Curing Method:</strong> {product.curingProcess}
                  </p>
                )}
                {product.harvestOrigin && (
                  <p>
                    <strong className="text-[#8C201C]">Harvest Origin:</strong> {product.harvestOrigin}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 2. Ingredients */}
          <div className="border-b border-[rgba(51,51,51,0.10)] pb-4">
            <button
              onClick={() => setOpenAccordion(openAccordion === "ingredients" ? "" : "ingredients")}
              className="w-full flex items-center justify-between text-left py-2 font-serif text-xl font-bold text-[#231F20] hover:text-[#8C201C]"
            >
              <span>Handcrafted Ingredients</span>
              <ChevronDown
                className={`w-5 h-5 text-[#8C201C] transition-transform duration-200 ${
                  openAccordion === "ingredients" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "ingredients" && (
              <div className="pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#231F20]">
                  {product.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#FFF9F3] p-3 rounded-xl border border-[rgba(51,51,51,0.08)] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#8C201C]" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Nutrition Facts */}
          <div className="border-b border-[rgba(51,51,51,0.10)] pb-4">
            <button
              onClick={() => setOpenAccordion(openAccordion === "nutrition" ? "" : "nutrition")}
              className="w-full flex items-center justify-between text-left py-2 font-serif text-xl font-bold text-[#231F20] hover:text-[#8C201C]"
            >
              <span>Nutrition Facts (Per 100g)</span>
              <ChevronDown
                className={`w-5 h-5 text-[#8C201C] transition-transform duration-200 ${
                  openAccordion === "nutrition" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "nutrition" && (
              <div className="pt-3">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="bg-[#FFF9F3] p-3.5 rounded-xl border border-[rgba(51,51,51,0.08)]">
                    <span className="block text-[11px] text-[#555555] font-semibold">Energy</span>
                    <span className="font-serif text-xl font-bold text-[#8C201C]">
                      {product.nutritionPer100g.energyKcal} kcal
                    </span>
                  </div>
                  <div className="bg-[#FFF9F3] p-3.5 rounded-xl border border-[rgba(51,51,51,0.08)]">
                    <span className="block text-[11px] text-[#555555] font-semibold">Protein</span>
                    <span className="font-serif text-xl font-bold text-[#8C201C]">
                      {product.nutritionPer100g.proteinG}g
                    </span>
                  </div>
                  <div className="bg-[#FFF9F3] p-3.5 rounded-xl border border-[rgba(51,51,51,0.08)]">
                    <span className="block text-[11px] text-[#555555] font-semibold">Carbohydrates</span>
                    <span className="font-serif text-xl font-bold text-[#8C201C]">
                      {product.nutritionPer100g.carbsG}g
                    </span>
                  </div>
                  <div className="bg-[#FFF9F3] p-3.5 rounded-xl border border-[rgba(51,51,51,0.08)]">
                    <span className="block text-[11px] text-[#555555] font-semibold">Fat</span>
                    <span className="font-serif text-xl font-bold text-[#8C201C]">
                      {product.nutritionPer100g.fatG}g
                    </span>
                  </div>
                  <div className="bg-[#FFF9F3] p-3.5 rounded-xl border border-[rgba(51,51,51,0.08)]">
                    <span className="block text-[11px] text-[#555555] font-semibold">Sodium</span>
                    <span className="font-serif text-xl font-bold text-[#8C201C]">
                      {product.nutritionPer100g.sodiumMg}mg
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Serving Pairings */}
          <div className="border-b border-[rgba(51,51,51,0.10)] pb-4">
            <button
              onClick={() => setOpenAccordion(openAccordion === "pairings" ? "" : "pairings")}
              className="w-full flex items-center justify-between text-left py-2 font-serif text-xl font-bold text-[#231F20] hover:text-[#8C201C]"
            >
              <span>Traditional Pairings &amp; How to Savor</span>
              <ChevronDown
                className={`w-5 h-5 text-[#8C201C] transition-transform duration-200 ${
                  openAccordion === "pairings" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "pairings" && (
              <div className="pt-3 space-y-2 text-xs sm:text-sm text-[#231F20] font-medium">
                <ul className="space-y-2">
                  {product.pairings.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E07A4A] shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 5. Storage Instructions */}
          <div>
            <button
              onClick={() => setOpenAccordion(openAccordion === "storage" ? "" : "storage")}
              className="w-full flex items-center justify-between text-left py-2 font-serif text-xl font-bold text-[#231F20] hover:text-[#8C201C]"
            >
              <span>Storage &amp; Shelf Life ({product.shelfLife})</span>
              <ChevronDown
                className={`w-5 h-5 text-[#8C201C] transition-transform duration-200 ${
                  openAccordion === "storage" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "storage" && (
              <div className="pt-3 text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed">
                <p>{product.storageInstructions}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="bg-[#FFFFFF] rounded-3xl border border-[rgba(51,51,51,0.10)] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(51,51,51,0.10)] pb-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C201C]">
                Verified Feedback
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20] mt-1">
                Customer Reviews
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-[#F3A83B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F3A83B]" />
                  ))}
                </div>
                <span className="font-bold text-sm text-[#231F20]">{product.rating} out of 5</span>
                <span className="text-xs text-[#777777] font-medium">({product.reviewCount} customer ratings)</span>
              </div>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs px-5 py-3 rounded-xl transition-colors self-start sm:self-auto shadow-sm"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#FFFFFF]" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-4">
            <div className="bg-[#FFF9F3] p-5 rounded-2xl border border-[rgba(51,51,51,0.10)]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-[#F3A83B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F3A83B]" />
                  ))}
                </div>
                <span className="text-[10px] text-[#777777] font-medium">14 Feb 2026</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#231F20] mb-1">
                Authentic taste that brought back childhood memories!
              </h4>
              <p className="text-xs text-[#231F20] font-medium leading-relaxed mb-3">
                The mustard oil pungency is just right, and you can tell it has been sun-cured rather than chemically prepared. Outstanding quality.
              </p>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-bold text-[#8C201C]">Rakesh N. (Verified Purchaser)</span>
                <span className="text-[#777777]">•</span>
                <span className="text-[#555555]">Bengaluru</span>
              </div>
            </div>

            <div className="bg-[#FFF9F3] p-5 rounded-2xl border border-[rgba(51,51,51,0.10)]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-[#F3A83B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F3A83B]" />
                  ))}
                </div>
                <span className="text-[10px] text-[#777777] font-medium">02 Feb 2026</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#231F20] mb-1">
                Packaging was completely safe and leakproof.
              </h4>
              <p className="text-xs text-[#231F20] font-medium leading-relaxed mb-3">
                I was worried about glass jars shipping from Bihar to Mumbai, but it was double-boxed with thick honeycomb padding. Arrived in perfect condition.
              </p>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-bold text-[#8C201C]">Meera S. (Verified Purchaser)</span>
                <span className="text-[#777777]">•</span>
                <span className="text-[#555555]">Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-[rgba(51,51,51,0.10)]">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C201C]">
              More from Our Kitchen
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20] mt-1">
              Flavours You May Also Love
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Add to Cart Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-[#FFFFFF] border-t border-[rgba(51,51,51,0.15)] p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="font-serif text-xl font-bold text-[#8C201C]">
            ₹{selectedVariant.price}
          </span>
          <span className="block text-[10px] text-[#555555] font-semibold">
            {selectedVariant.weight}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAddToCart(true)}
            className="bg-[#8C201C] text-[#FFFFFF] text-xs font-bold py-3 px-4 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-[#E07A4A] text-[#231F20] text-xs font-bold py-3 px-4 rounded-xl flex items-center gap-1 shadow-md active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-[#231F20]" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-[#FFFFFF] rounded-3xl max-w-md w-full p-6 border border-[rgba(51,51,51,0.15)] shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[rgba(51,51,51,0.10)] pb-3 mb-4">
              <h4 className="font-serif text-xl font-bold text-[#231F20]">
                Review {product.name}
              </h4>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-[#231F20] hover:text-[#8C201C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-8 text-center text-[#8C201C]">
                <CheckCircle2 className="w-12 h-12 text-[#8C201C] mx-auto mb-2" />
                <p className="font-serif text-lg font-bold">Dhanyawad!</p>
                <p className="text-xs text-[#555555] mt-1 font-medium">
                  Your feedback has been submitted for our kitchen review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#231F20] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#231F20] mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-1 text-[#F3A83B]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewRating
                              ? "fill-[#F3A83B] text-[#F3A83B]"
                              : "text-stone-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#231F20] mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us what you loved about the flavour, aroma, or packaging..."
                    className="w-full bg-[#FFFFFF] border border-[rgba(51,51,51,0.18)] rounded-xl px-3 py-2 text-xs text-[#231F20] font-semibold focus:outline-none focus:border-[#8C201C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs py-3.5 rounded-xl transition-colors shadow-md"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

