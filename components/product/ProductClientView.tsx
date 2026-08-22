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
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  MapPin,
  MessageSquarePlus,
  X,
  Share2,
  Check,
  Flame,
  Leaf,
  Award,
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

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ["/achaar-clean.png"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Auto-slideshow: Switch image every 2.5 seconds (2500ms)
  React.useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images.length]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants && product.variants.length > 0
      ? {
          ...product.variants[0],
          weight: product.variants[0].weight || product.weight || "100gm",
        }
      : {
          id: "default",
          weight: product.weight || "100gm",
          price: product.price,
          mrp: product.mrp,
          inStock: true,
        }
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const [openAccordion, setOpenAccordion] = useState<string>("details");

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
      setPincodeStatus("✓ Delivery Available! Estimated delivery in 3–5 business days.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian pincode.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const savings = Math.max(0, (selectedVariant.mrp || product.mrp) - selectedVariant.price);
  const discountPercent =
    selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price
      ? Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100)
      : product.discountPercentage || 0;

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-20 sm:pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <div className="flex items-center gap-1.5 text-xs text-[#666666] font-medium">
          <Link href="/" className="hover:text-[#8C201C] transition-colors">
            Home
          </Link>
          <span className="text-[#CCCCCC]">/</span>
          <Link
            href={`/shop/${product.category}`}
            className="hover:text-[#8C201C] capitalize transition-colors"
          >
            {product.category}
          </Link>
          {product.subCategory && (
            <>
              <span className="text-[#CCCCCC]">/</span>
              <Link
                href={`/shop/${product.category}?sub=${encodeURIComponent(product.subCategory)}`}
                className="hover:text-[#8C201C] transition-colors"
              >
                {product.subCategory}
              </Link>
            </>
          )}
          <span className="text-[#CCCCCC]">/</span>
          <span className="text-[#8C201C] font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main Product Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ===================== LEFT: GALLERY ===================== */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary Main Image Frame with Overlaid Slide Buttons & Auto-Slideshow */}
            <div className="relative aspect-[4/4.45] w-full max-w-[440px] sm:max-w-[470px] mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-[#FFF9F3] border border-[#EFE7DD] shadow-sm flex items-center justify-center group">
              <Image
                src={images[activeImageIndex] || images[0]}
                alt={product.name}
                fill
                priority
                quality={100}
                unoptimized
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain p-4 sm:p-5 transition-all duration-500 hover:scale-105"
              />

              {/* Overlaid Slide Navigation Arrows (Prev / Next) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-[#8C201C] hover:text-white text-[#231F20] shadow-md flex items-center justify-center transition-all border border-[#EFE7DD] z-20 cursor-pointer opacity-90 hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev + 1) % images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-[#8C201C] hover:text-white text-[#231F20] shadow-md flex items-center justify-center transition-all border border-[#EFE7DD] z-20 cursor-pointer opacity-90 hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Floating Badges */}
              <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
                {product.isBestseller && (
                  <span className="bg-[#8C201C] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#E07A4A]" />
                    Bestseller
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-[#E07A4A] text-[#231F20] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-10">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#231F20] hover:text-[#8C201C] shadow-sm transition-all border border-[#EFE7DD] cursor-pointer"
                  title="Save to Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? "fill-[#8C201C] text-[#8C201C]" : "text-[#777777]"
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#231F20] hover:text-[#8C201C] shadow-sm transition-all border border-[#EFE7DD] cursor-pointer"
                  title="Share Product"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#777777]" />}
                </button>
              </div>
            </div>
          </div>

          {/* ===================== RIGHT: EXACT DETAILS SECTION AS MOCKUP ===================== */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Header: Title on Left, Rating on Right */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1A1A1A] tracking-tight leading-[1.15]">
                  {product.name}
                </h1>
                {product.hindiName && (
                  <p className="text-sm font-serif italic text-[#8C201C] mt-0.5">
                    {product.hindiName}
                  </p>
                )}
              </div>

              {/* Rating Pill Badge */}
              <div className="flex items-center gap-1.5 text-xs bg-white px-3 py-1 rounded-full border border-[#EFE7DD] shadow-2xs shrink-0 mt-1">
                <div className="flex items-center text-[#E89E38]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#E89E38] text-[#E89E38]"
                    />
                  ))}
                </div>
                <span className="font-bold text-[#231F20] text-xs">{product.rating || "5.0"}</span>
                <span className="text-[#777777] text-xs font-normal">
                  ({product.reviewCount || 1} verified)
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed font-normal">
              {product.description || product.shortDescription || product.tagline}
            </p>

            {/* Net Weight Display & Variant Selector */}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-xs font-bold text-[#666666]">Net Weight:</span>
              {product.variants && product.variants.length > 1 ? (
                <div className="flex items-center gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl border transition-all cursor-pointer ${
                        selectedVariant.id === v.id
                          ? "bg-[#8C201C] text-white border-[#8C201C] shadow-2xs"
                          : "bg-white text-[#231F20] border-[#EFE7DD] hover:border-[#8C201C]"
                      }`}
                    >
                      {v.weight}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="bg-[#FFF9F3] text-[#8C201C] border border-[#EFE7DD] text-xs font-bold px-3 py-1 rounded-xl shadow-2xs">
                  {selectedVariant.weight || product.weight || "100gm"}
                </span>
              )}
            </div>

            {/* Price & Quantity Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-1">
              <div className="flex items-center flex-wrap gap-2.5">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#8C201C]">
                  ₹{selectedVariant.price}
                </span>

                {selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price && (
                  <span className="text-sm sm:text-base text-[#666666] line-through font-medium">
                    MRP ₹{selectedVariant.mrp}
                  </span>
                )}

                {savings > 0 && (
                  <span className="bg-[#FFF0E6] text-[#8C201C] border border-[#E07A4A]/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    SAVE ₹{savings} • {discountPercent}% OFF
                  </span>
                )}

                <span className="text-[10px] text-[#777777] font-medium leading-tight max-w-[65px]">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Floating Qty Box */}
              <div className="relative border border-[#EFE7DD] rounded-xl px-2.5 py-1.5 flex items-center gap-3 bg-white shrink-0">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-1.5 text-[10px] text-[#777777] font-semibold">
                  Qty
                </span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#231F20] hover:text-[#8C201C] transition-colors font-bold text-sm px-0.5 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span className="text-xs font-bold text-[#231F20] min-w-[12px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#231F20] hover:text-[#8C201C] transition-colors font-bold text-sm px-0.5 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Basket & Buy Now */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => handleAddToCart(true)}
                className="bg-[#8C201C] hover:bg-[#6B1815] text-white font-medium text-sm sm:text-base py-3.5 px-4 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add to Basket</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-[#E05A2B] hover:bg-[#C94E23] text-white font-medium text-sm sm:text-base py-3.5 px-4 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Zap className="w-4 h-4 fill-white text-white" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Delivery Estimate & Pincode Box */}
            <div className="bg-[#FFF9F3] border border-[#EFE7DD] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C201C] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#8C201C]" />
                  DELIVERY ESTIMATE &amp; PINCODE
                </span>
                <span className="text-xs text-[#666666] font-medium">
                  Free delivery above ₹599
                </span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 110001)"
                  className="flex-1 bg-white border border-[#EFE7DD] rounded-xl px-4 py-2.5 text-xs text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                />
                <button
                  type="submit"
                  className="bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-xs font-semibold text-[#8C201C] pt-0.5">{pincodeStatus}</p>
              )}
            </div>

            {/* Trust Badges: 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-[#231F20]">
              <div className="bg-[#FFF9F3] border border-[#EFE7DD] rounded-2xl p-3.5 flex items-center gap-3.5">
                <Sun className="w-6 h-6 text-[#8C201C] stroke-[1.5] shrink-0" />
                <div className="font-medium text-xs text-[#231F20] leading-tight">
                  <p>100% Traditionally</p>
                  <p>Sun-Cured</p>
                </div>
              </div>

              <div className="bg-[#FFF9F3] border border-[#EFE7DD] rounded-2xl p-3.5 flex items-center gap-3.5">
                <Droplets className="w-6 h-6 text-[#8C201C] stroke-[1.5] shrink-0" />
                <div className="font-medium text-xs text-[#231F20] leading-tight">
                  <p>Wood Cold-Pressed Oil /</p>
                  <p>Pure Ghee</p>
                </div>
              </div>

              <div className="bg-[#FFF9F3] border border-[#EFE7DD] rounded-2xl p-3.5 flex items-center gap-3.5">
                <ShieldCheck className="w-6 h-6 text-[#8C201C] stroke-[1.5] shrink-0" />
                <div className="font-medium text-xs text-[#231F20] leading-tight">
                  <p>0% Synthetic</p>
                  <p>Preservatives</p>
                </div>
              </div>

              <div className="bg-[#FFF9F3] border border-[#EFE7DD] rounded-2xl p-3.5 flex items-center gap-3.5">
                <Award className="w-6 h-6 text-[#8C201C] stroke-[1.5] shrink-0" />
                <div className="font-medium text-xs text-[#231F20] leading-tight">
                  <p>Heirloom Mithila</p>
                  <p>Recipe</p>
                </div>
              </div>
            </div>

            {/* The Heritage & Craft Accordion */}
            <div className="border-t border-[#EFE7DD] pt-4 space-y-2">
              <button
                onClick={() => setOpenAccordion(openAccordion === "details" ? "" : "details")}
                className="w-full flex items-center justify-between font-serif text-base font-bold text-[#231F20] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>The Heritage &amp; Craft</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#231F20] transition-transform duration-200 ${
                    openAccordion === "details" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openAccordion === "details" && (
                <p className="text-xs text-[#555555] leading-relaxed mt-1.5 animate-in fade-in duration-150">
                  {product.description || "Experience the premium quality of carefully selected traditional recipes made with heirloom spices."}
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 border-t border-[#EFE7DD] mt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                Recommended Pairings
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
                You May Also Relish
              </h2>
            </div>
            <Link
              href={`/shop/${product.category}`}
              className="text-xs font-bold text-[#8C201C] hover:underline"
            >
              View Category
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
