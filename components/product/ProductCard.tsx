"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductVariant } from "@/types/ecommerce";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, Star, ShoppingBag, Sparkles, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: "default",
      weight: product.weight,
      price: product.price,
      mrp: product.mrp,
      inStock: true,
    }
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant, 1, true);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 2000);
  };

  const displayImage = isHovered && product.images.length > 1
    ? product.images[1]
    : product.images[0];

  return (
    <div
      className="group relative bg-[#FFFFFF] rounded-2xl border border-[rgba(51,51,51,0.12)] hover:border-[#8B3E3E] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Section - Clean #FCE9D6 backdrop */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FCE9D6]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badges - 100% Solid Colors */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#8B3E3E] text-[#FFFFFF] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#F7A77A]" />
              Bestseller
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="bg-[#F7A77A] text-[#333333] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#333333] hover:text-[#8B3E3E] shadow-sm transition-all border border-[rgba(51,51,51,0.10)]"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-[#8B3E3E] text-[#8B3E3E]" : "text-[#777777]"
            }`}
          />
        </button>

        {/* Quick Add Overlay on hover for desktop */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] font-bold text-xs py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4 text-[#F7A77A]" />
                <span>Added to Basket!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#FFFFFF]" />
                <span>Quick Add • ₹{selectedVariant.price}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Section - 100% Solid White */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#FFFFFF]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B3E3E]">
              {product.category === "achar"
                ? "Sun-Cured Achar"
                : product.category === "makhana"
                ? "Mithila Makhana"
                : "Curated Box"}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#E5A93C]">
              <Star className="w-3.5 h-3.5 fill-[#E5A93C]" />
              <span className="font-bold text-[#333333]">{product.rating}</span>
              <span className="text-[10px] text-[#777777]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#333333] leading-snug line-clamp-1 hover:text-[#8B3E3E] transition-colors">
              {product.name}
            </h3>
            {product.hindiName && (
              <p className="text-[11px] text-[#777777] font-serif italic line-clamp-1 mt-0.5">
                {product.hindiName}
              </p>
            )}
          </Link>

          {/* Short tagline */}
          <p className="text-xs text-[#555555] line-clamp-2 mt-1.5 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Variants / Weight Selector & Price */}
        <div className="mt-4 pt-3 border-t border-[rgba(51,51,51,0.08)]">
          {product.variants.length > 1 ? (
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`text-[10px] px-2.5 py-0.5 rounded-md border font-semibold transition-colors ${
                    selectedVariant.id === v.id
                      ? "bg-[#8B3E3E] text-[#FFFFFF] border-[#8B3E3E]"
                      : "bg-[#FFFFFF] text-[#555555] border-[rgba(51,51,51,0.15)] hover:border-[#8B3E3E]"
                  }`}
                >
                  {v.weight}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-[11px] text-[#555555] mb-2 font-medium">
              Net Weight: {selectedVariant.weight}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#8B3E3E]">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-xs text-[#888888] line-through font-medium">
                  ₹{selectedVariant.mrp}
                </span>
              )}
            </div>

            {/* Mobile Quick Add Button */}
            <button
              onClick={handleQuickAdd}
              className="sm:hidden p-2 rounded-xl bg-[#8B3E3E] text-[#FFFFFF] hover:bg-[#733232] transition-colors shadow-xs"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
