"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CUSTOMER_REVIEWS } from "@/data/reviews";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { Product, HeroConfig } from "@/types/ecommerce";
import {
  Sparkles,
  ArrowRight,
  Sun,
  ShieldCheck,
  Award,
  Truck,
  Heart,
  Star,
  CheckCircle2,
  Droplets,
  Flame,
  Leaf,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import HeroSection from "@/components/hero/HeroSection";
import Reveal from "@/components/ui/Reveal";
import AutoHoverImage from "@/components/ui/AutoHoverImage";

export default function HomePage() {
  const { addToCart } = useCart();
  const [activeBentoIndex, setActiveBentoIndex] = React.useState(0);
  const [dynamicProducts, setDynamicProducts] = React.useState<Product[]>([]);

  const [heroConfig, setHeroConfig] = React.useState<HeroConfig>({
    slides: [
      {
        id: "slide-1",
        image: "/heros2.png",
        badge: "Mithila Culinary Heritage • 100% Traditional",
        headingPrimary: "Crafted by Heart.",
        headingSecondary: "Rooted in Tradition.",
        subtitle: "Authentic handcrafted flavours from the heart of India, made in small batches and delivered to your home.",
        primaryBtnText: "Shop Our Flavours",
        primaryBtnLink: "/shop",
        secondaryBtnText: "Our Heritage Story",
        secondaryBtnLink: "/about",
        imagePosition: "right",
        textAlign: "left",
        hideText: false,
      }
    ],
  });

  const fetchLiveProducts = () => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.products) {
          setDynamicProducts(data.products);
        }
      })
      .catch(() => {});

    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.heroConfig) {
          setHeroConfig(data.heroConfig);
        }
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    fetchLiveProducts();
    const onFocus = () => fetchLiveProducts();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const featuredProducts = dynamicProducts.filter(
    (p) =>
      p.isFeatured === true ||
      String(p.isFeatured) === "true" ||
      p.isBestseller === true ||
      String(p.isBestseller) === "true"
  );
  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : dynamicProducts;
  const bundleProducts = dynamicProducts.filter((p) => p.category === "bundles");

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F3]">
      {/* HERO SECTION */}
      <HeroSection slides={heroConfig.slides} />

      {/* ── 5-Pillar Bottom Trust Strip (Marquee) ── */}
      <section className="border-t border-[#EFE7DD] bg-[#FFF9F3] py-3 sm:py-3.5 overflow-hidden">
        <div className="flex animate-marquee gap-8 sm:gap-12 pl-8 sm:pl-12">
          {/* We render the list twice to create an infinite scroll effect */}
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4 text-[#8C201C]" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">100%</span>
                  <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Sun-Cured &amp; Natural</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#8C201C]" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">Zero</span>
                  <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Synthetic Additives</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#8C201C]" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">GI-Tag</span>
                  <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Mithila Wetland Origin</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#8C201C]" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">Premium</span>
                  <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Ingredients</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-[#8C201C]" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">Made with Love</span>
                  <span className="text-[11px] text-[#666666] font-semibold block leading-tight">In Small Batches</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4 text-[#8C201C]" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">Authentic</span>
                  <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Indian Heritage</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                  <PackageCheck className="w-4 h-4 text-[#8C201C]" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">Carefully</span>
                  <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Handpacked</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* TASTE THE TRADITION: MIXED PICKLE FEATURE SECTION */}
      <section className="py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] border-b border-[#EFE7DD] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Transparent Mix Pickle Image (Image on Left - 7/12 cols) */}
          <div className="order-1 lg:order-1 lg:col-span-7 flex items-center justify-center lg:justify-start w-full">
            <Reveal direction="right" delay={120} duration={1.4} className="w-full flex justify-center lg:justify-start">
              <div className="group relative w-full h-[380px] sm:h-[480px] lg:h-[580px] xl:h-[640px] cursor-pointer">
                <AutoHoverImage
                  src1="/mixpickle2-clean.png"
                  alt1="Chachiji's Homemade Mixed Pickle Jar with fresh mangoes, chillies and mustard oil"
                  src2="/mixpickle-clean.png"
                  alt2="Chachiji's Homemade Mixed Pickle close-up texture and whole spices"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Text & Story (Text on Right - 5/12 cols) */}
          <div className="space-y-3 order-2 lg:order-2 lg:col-span-5 max-w-lg lg:max-w-none">
            <Reveal direction="left" delay={100} duration={1.4}>
              <span className="inline-block bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-1 shadow-2xs">
                At Chachiji&apos;s Homemade Cuisine
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] leading-[1.12]">
                Taste the Tradition: <br />
                <span className="italic font-normal text-[#8C201C]">Crafted by Heart, Ground by Hand.</span>
              </h2>
            </Reveal>

            <Reveal direction="left" delay={250} duration={1.4}>
              <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
                We believe that the soul of an authentic Indian pickle lies in the uncompromising purity of its ingredients and the patience of traditional recipes.
              </p>
              <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed mt-2">
                Every jar of our Homemade Mixed Pickle brings together fresh raw mangoes, lemons, green &amp; red chillies, pungent mustard oil, and heirloom whole spices crushed on stone sil-batta — cured naturally under open sunshine without any synthetic vinegar or artificial preservatives.
              </p>
            </Reveal>

            <Reveal direction="left" delay={400} duration={1.4}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8C201C]">
                    Stone Sil-Batta Spices
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    Whole spices slowly roasted and crushed in-house for deep aroma and authentic texture.
                  </p>
                </div>

                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8C201C]">
                    100% Sun-Cured
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    Aged naturally in traditional porcelain martabans with pure kachchi ghani mustard oil.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/shop/achar"
                  className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <span>Explore Heritage Pickles</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. FEATURED & BESTSELLER PRODUCTS SECTION */}
      {displayProducts.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[#EFE7DD]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E07A4A] flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C201C]" />
                  Curated by Chachiji
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231F20]">
                  Featured Heritage Flavours
                </h2>
                <p className="text-xs sm:text-sm text-[#555555] font-medium mt-1">
                  Handcrafted in limited seasonal batches under the bright Bihar sun.
                </p>
              </div>

              <Link
                href="/shop/achar"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C201C] hover:text-[#6B1815] bg-[#FFF9F3] border border-[#EFE7DD] px-4 py-2.5 rounded-xl shadow-2xs hover:shadow-xs transition-all self-start sm:self-auto"
              >
                <span>View Full Store Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. STORIES OF FLAVOUR BENTO GRID SECTION (Primary Brand Theme, Compact Balanced Height) */}
      <section className="py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] text-[#231F20] border-b border-[#EFE7DD]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <Reveal direction="up" delay={0}>
              <span className="inline-block bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-1 shadow-2xs">
                From Mithila, With Love
              </span>
            </Reveal>
            <Reveal direction="up" delay={150}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] mt-1.5 mb-2">
                Stories of flavour, made the slow way
              </h2>
            </Reveal>
            <Reveal direction="up" delay={300}>
              <p className="text-xs sm:text-sm text-[#555555] font-medium max-w-xl mx-auto leading-relaxed">
                Not just products—small glimpses of ingredients, craft and traditions behind every batch.
              </p>
            </Reveal>
          </div>

          {/* Bento Grid: 4-col Left Portrait Card + 8-col Right Stack (Ultra-Thin Hairline Gaps) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-1.5 sm:gap-2 items-stretch">
            {/* Left Portrait Tile: Slow-Crafted Achar (4 cols, Dual Image Hover Swap) */}
            <Link
              href="/shop/achar"
              className="group relative lg:col-span-4 min-h-[420px] sm:min-h-[500px] lg:min-h-[570px] xl:min-h-[600px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#F4F8FC] via-[#EAF2F8] to-[#DFEBF4] border border-[#D4E2ED] shadow-sm hover:shadow-xl hover:border-[#8C201C]/40 transition-all flex flex-col justify-end p-5 sm:p-7 cursor-pointer"
            >
              {/* Image Container with Auto/Hover Image */}
              <div className="absolute inset-0 overflow-hidden">
                <AutoHoverImage
                  src1="/achaar-clean.png"
                  alt1="Traditional homemade mixed pickle with fresh ingredients and wooden spoon"
                  src2="/achaar2-clean.png"
                  alt2="Traditional homemade mixed pickle jar with jute rope cover"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  objectFit="cover"
                  objectPosition="center"
                  isAutoActive={activeBentoIndex === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#152332]/85 via-[#152332]/25 to-transparent pointer-events-none" />
              </div>

              {/* Tile Content */}
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                  Slow-Crafted
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF] leading-tight">
                  Achar, just like home
                </h3>
                <p className="text-xs sm:text-sm text-[#E5F0FA] font-medium">
                  Sun-cured spices, generations of patience.
                </p>
              </div>
            </Link>

            {/* Right Column: 1 Top Wide Tile + 2 Bottom Tiles (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-1.5 sm:gap-2 justify-between">
              {/* Top Wide Tile: Mithila's Pride Makhana (Dual Image Hover Swap) */}
              <Link
                href="/shop/makhana"
                className="group relative min-h-[210px] sm:min-h-[250px] lg:min-h-[285px] xl:min-h-[300px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#F4F8FC] via-[#EAF2F8] to-[#DFEBF4] border border-[#D4E2ED] shadow-sm hover:shadow-xl hover:border-[#8C201C]/40 transition-all flex flex-col justify-end p-5 sm:p-7 cursor-pointer"
              >
                {/* Image Container with Auto/Hover Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <AutoHoverImage
                    src1="/makh1-clean.png"
                    alt1="Chachiji Mithila Makhana with craft pouch and lotus leaves"
                    src2="/makh2-clean.png"
                    alt2="Chachiji Mithila Makhana craft pouch and painted Madhubani bowl"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    objectFit="contain"
                    objectPosition="center 30%"
                    isAutoActive={activeBentoIndex === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#152332]/85 via-[#152332]/25 to-transparent pointer-events-none" />
                </div>

                {/* Tile Content */}
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                    Mithila&apos;s Pride
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFFFF] leading-tight">
                    Light, crisp, unforgettable
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E5F0FA] font-medium">
                    Handpicked makhana in flavours worth sharing.
                  </p>
                </div>
              </Link>

              {/* Bottom Row: 2 Compact Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 flex-1">
                {/* Tile 1: Our Promise (Dual Image Hover Swap: promp & prom1) */}
                <Link
                  href="/about"
                  className="group relative min-h-[190px] sm:min-h-[225px] lg:min-h-[260px] xl:min-h-[275px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#F4F8FC] via-[#EAF2F8] to-[#DFEBF4] border border-[#D4E2ED] shadow-sm hover:shadow-xl hover:border-[#8C201C]/40 transition-all flex flex-col justify-end p-5 sm:p-6 cursor-pointer"
                >
                  {/* Image Container with Auto/Hover Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <AutoHoverImage
                      src1="/promp-clean.png"
                      alt1="Family enjoying Chachiji Mithila Makhana together"
                      src2="/prom1-clean.png"
                      alt2="Traditional family moments enjoying Mithila Makhana"
                      sizes="(max-width: 640px) 100vw, 32vw"
                      objectFit="contain"
                      objectPosition="center 30%"
                      isAutoActive={activeBentoIndex === 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#152332]/85 via-[#152332]/25 to-transparent pointer-events-none" />
                  </div>

                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                      Our Promise
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFFFFF] leading-tight">
                      Made with care
                    </h3>
                  </div>
                </Link>

                {/* Tile 2: Rooted in Craft (Dual Image Hover Swap: trust & trust1) */}
                <Link
                  href="/about#process"
                  className="group relative min-h-[190px] sm:min-h-[225px] lg:min-h-[260px] xl:min-h-[275px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#F4F8FC] via-[#EAF2F8] to-[#DFEBF4] border border-[#D4E2ED] shadow-sm hover:shadow-xl hover:border-[#8C201C]/40 transition-all flex flex-col justify-end p-5 sm:p-6 cursor-pointer"
                >
                  {/* Image Container with Auto/Hover Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <AutoHoverImage
                      src1="/trust-clean.png"
                      alt1="Traditional terracotta hand-painted pot and craft pouch of Mithila Makhana"
                      src2="/trust1-clean.png"
                      alt2="Generations of women sharing authentic Mithila Makhana pouch"
                      sizes="(max-width: 640px) 100vw, 32vw"
                      objectFit="contain"
                      objectPosition="center 30%"
                      isAutoActive={activeBentoIndex === 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#152332]/85 via-[#152332]/25 to-transparent pointer-events-none" />
                  </div>

                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                      Rooted in Craft
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFFFFF] leading-tight">
                      From soil to soul
                    </h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-5 pt-4 border-t border-[#EFE7DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#555555] font-medium text-center sm:text-left">
              Each tile can open its category, story, or featured collection.
            </p>
            <Link
              href="/shop/achar"
              className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
            >
              <span>Explore all flavours</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. MITHILA MAKHANA FEATURE SECTION */}
      <section className="py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] border-b border-[#EFE7DD] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Text & Story (Text on Left - 5/12 cols) */}
          <div className="space-y-3 order-2 lg:order-1 lg:col-span-5 max-w-lg lg:max-w-none">
            <Reveal direction="right" delay={100} duration={1.4}>
              <span className="inline-block bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-1 shadow-2xs">
                GI-Tagged Mithila Origin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] leading-[1.12]">
                Mithila Makhana: <br />
                <span className="italic font-normal text-[#8C201C]">Direct from Pristine Sacred Waters.</span>
              </h2>
            </Reveal>

            <Reveal direction="right" delay={250} duration={1.4}>
              <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
                At Chachiji&apos;s, we offer a wide range of high-quality Pokhar Makhana (or Pokhara Makhana) — premium popped lotus seeds (fox nuts) sourced directly from the mineral-rich freshwater wetlands of Mithila.
              </p>
              <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed mt-2">
                Celebrated for centuries as a sacred, nutrient-dense superfood, each kernel is hand-harvested by local diving families, naturally sun-cured, and slowly roasted in small batches to preserve its irresistible natural crunch, rich antioxidants, plant protein, and calcium.
              </p>
            </Reveal>

            <Reveal direction="right" delay={400} duration={1.4}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8C201C]">
                    Ethical Wetland Sourced
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    Hand-harvested from deep freshwater lakes of Darbhanga &amp; Madhubani with zero factory shortcuts.
                  </p>
                </div>

                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8C201C]">
                    Grade A+ Jumbo Blooms
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    Extra-large, sun-dried white pearls roasted to light, crispy perfection with 100% natural spices.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/shop/makhana"
                  className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <span>Explore Mithila Makhana</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Transparent Makhana Image (Image on Right - 7/12 cols, Interactive Hover Angle) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex items-center justify-center lg:justify-end w-full">
            <Reveal direction="left" delay={120} duration={1.4} className="w-full flex justify-center lg:justify-end">
              <div className="group relative w-full h-[380px] sm:h-[480px] lg:h-[580px] xl:h-[640px] cursor-pointer">
                {/* Default Primary Makhana Image (makhana1) */}
                <Image
                  src="/makhana1-clean.png"
                  alt="Chachiji's Mixed Mithila Makhana Craft Pouch and Roasted Bowl"
                  fill
                  priority
                  quality={100}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  className="select-none pointer-events-none transition-all duration-700 ease-in-out opacity-100 group-hover:opacity-0 group-hover:scale-95"
                />

                {/* Secondary Hover Makhana Image (makhana2) */}
                <Image
                  src="/makhana2-clean.png"
                  alt="Chachiji's Mixed Mithila Makhana Glass Jar and Madhubani Pottery"
                  fill
                  priority
                  quality={100}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  className="select-none pointer-events-none transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>



      {/* 7. HOW IT'S MADE (4-STEP TIMELINE) - Solid White Surface with Cream Cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[rgba(51,51,51,0.10)]">
        <div className="max-w-7xl mx-auto text-center mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
            Artisanal Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231F20] mt-1.5">
            How Chachiji Flavour Is Born
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-medium mt-2 max-w-md mx-auto">
            A traditional 4-stage journey that honors time, sun, and purity.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-[#FFF9F3] p-6 rounded-2xl border border-[rgba(51,51,51,0.10)] text-left relative shadow-xs">
            <span className="font-serif text-3xl font-bold text-[#8C201C] block mb-3">
              01
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center mb-4">
              <Leaf className="w-5 h-5 text-[#E07A4A]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1.5">
              Select
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Carefully chosen seasonal fruits, fleshy red chillies, and wetland lotus seeds directly from Bihar growers.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FFF9F3] p-6 rounded-2xl border border-[rgba(51,51,51,0.10)] text-left relative shadow-xs">
            <span className="font-serif text-3xl font-bold text-[#8C201C] block mb-3">
              02
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center mb-4">
              <Flame className="w-5 h-5 text-[#E07A4A]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1.5">
              Craft
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Prepared using hand-ground stone roasted spices and pure wood cold-pressed mustard oil.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FFF9F3] p-6 rounded-2xl border border-[rgba(51,51,51,0.10)] text-left relative shadow-xs">
            <span className="font-serif text-3xl font-bold text-[#8C201C] block mb-3">
              03
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center mb-4">
              <Sun className="w-5 h-5 text-[#E07A4A]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1.5">
              Sun-Cure
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Naturally fermented for 12-14 days in traditional ceramic martabans under bright sunlight.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#FFF9F3] p-6 rounded-2xl border border-[rgba(51,51,51,0.10)] text-left relative shadow-xs">
            <span className="font-serif text-3xl font-bold text-[#8C201C] block mb-3">
              04
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center mb-4">
              <PackageCheck className="w-5 h-5 text-[#E07A4A]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1.5">
              Pack &amp; Deliver
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Sealed in glass jars with multi-layer protective packaging, delivered straight to your doorstep across India.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRODUCT BUNDLES & GIFT BOXES - Solid White Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[rgba(51,51,51,0.10)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Curated Gift Sets
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] mt-1.5">
              Tasting Boxes &amp; Value Bundles
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-medium mt-2">
              Save up to 28% with our curated multi-jar tasting collections, packed in keepsake gift boxes with complimentary wooden spoons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bundleProducts.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-[#FFF9F3] rounded-3xl border border-[rgba(51,51,51,0.10)] p-6 sm:p-8 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-[#8C201C] text-[#FFFFFF] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-xs">
                      {bundle.badges[0] || "Gift Hamper"}
                    </span>
                    <span className="text-xs font-bold text-[#231F20] bg-[#E07A4A] px-2.5 py-0.5 rounded-full shadow-2xs">
                      Save {bundle.discountPercentage}%
                    </span>
                  </div>

                  <div className="relative aspect-16/9 rounded-2xl overflow-hidden mb-6 bg-white border-2 border-white shadow-sm">
                    <Image
                      src={bundle.images[0]}
                      alt={bundle.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20] mb-2">
                    {bundle.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed mb-4">
                    {bundle.description}
                  </p>

                  {/* Included items */}
                  <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[rgba(51,51,51,0.10)] mb-6 space-y-1.5 shadow-2xs">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#8C201C] block mb-2">
                      In this box:
                    </span>
                    {bundle.ingredients.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#231F20] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8C201C] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgba(51,51,51,0.10)] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#777777] font-semibold uppercase block">Bundle Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8C201C]">
                        ₹{bundle.price}
                      </span>
                      <span className="text-xs text-[#888888] line-through font-medium">
                        ₹{bundle.mrp}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(bundle, bundle.variants[0], 1, true)}
                    className="bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FFFFFF]" />
                    <span>Add Box to Basket</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHY CHACHIJI (6 PILLARS) - Solid Cream Section with Solid White Cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] text-[#231F20] border-b border-[rgba(51,51,51,0.10)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Pillars of Purity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231F20] mt-1">
              Why Chachiji Stands Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] p-6 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#8C201C] flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-[#8C201C]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1">
                Handcrafted with Love
              </h3>
              <p className="text-xs text-[#555555] font-medium leading-relaxed">
                Stuffed and prepared by skilled local women artisans from Vaishali, preserving traditional livelihood and culinary heritage.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] p-6 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#8C201C] flex items-center justify-center mb-4">
                <Sun className="w-5 h-5 text-[#8C201C]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1">
                Small-Batch Curing
              </h3>
              <p className="text-xs text-[#555555] font-medium leading-relaxed">
                We make pickles in limited seasonal batches so every single ceramic jar receives natural sun-drying attention.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] p-6 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#8C201C] flex items-center justify-center mb-4">
                <Droplets className="w-5 h-5 text-[#8C201C]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1">
                Wood Cold-Pressed Oils
              </h3>
              <p className="text-xs text-[#555555] font-medium leading-relaxed">
                100% pure kachchi ghani mustard oil — raw, unrefined, retaining natural antioxidants and pungent warmth.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] p-6 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#8C201C] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-[#8C201C]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1">
                Zero Chemical Preservatives
              </h3>
              <p className="text-xs text-[#555555] font-medium leading-relaxed">
                Preserved naturally using centuries-old wisdom with rock salt, lemon juice, turmeric, and bright sunshine.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] p-6 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#8C201C] flex items-center justify-center mb-4">
                <PackageCheck className="w-5 h-5 text-[#8C201C]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1">
                Glass-Jar Safety Delivery
              </h3>
              <p className="text-xs text-[#555555] font-medium leading-relaxed">
                Packed in food-grade glass jars with 5-ply multi-layer shockproof honeycomb cushioning across India.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] p-6 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#8C201C] flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-[#8C201C]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#231F20] mb-1">
                Direct Mithila Sourcing
              </h3>
              <p className="text-xs text-[#555555] font-medium leading-relaxed">
                Empowering Mallah community pond harvesters across Darbhanga and Madhubani for authentic GI-tagged Makhana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CUSTOMER REVIEWS - Solid White Section with Solid Cream Cards */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[rgba(51,51,51,0.10)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Stories from Kitchens
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231F20] mt-1">
              Loved by Food Connoisseurs Across India
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-[#F3A83B]">
              <Star className="w-4 h-4 fill-[#F3A83B]" />
              <Star className="w-4 h-4 fill-[#F3A83B]" />
              <Star className="w-4 h-4 fill-[#F3A83B]" />
              <Star className="w-4 h-4 fill-[#F3A83B]" />
              <Star className="w-4 h-4 fill-[#F3A83B]" />
              <span className="text-xs font-bold text-[#231F20] ml-1">4.9 / 5.0 Average Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {CUSTOMER_REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-[#FFF9F3] p-6 sm:p-7 rounded-2xl border border-[rgba(51,51,51,0.10)] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F3A83B] mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F3A83B]" />
                    ))}
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#231F20] mb-2 leading-snug">
                    &quot;{review.title}&quot;
                  </h4>
                  <p className="text-xs text-[#231F20] leading-relaxed font-medium mb-4">
                    &quot;{review.content}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(51,51,51,0.10)] flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-[#8C201C] block">{review.author}</span>
                    <span className="text-[#555555] font-medium">{review.location}</span>
                  </div>
                  {review.verifiedPurchase && (
                    <span className="text-[10px] font-bold text-[#8C201C] bg-[#FFFFFF] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                      <CheckCircle2 className="w-3 h-3 text-[#8C201C]" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. INSTAGRAM / SOCIAL PROOF ("Follow the Flavour") */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Community &amp; Kitchen Diary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231F20] mt-1">
              Follow the Flavour on Instagram
            </h2>
            <p className="text-xs text-[#555555] font-medium mt-1">
              Tag @Chachiji.in with your favorite meal pairings to get featured.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
            {[
              "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
            ].map((imgUrl, i) => (
              <a
                key={i}
                href="https://instagram.com/chachiji.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-xs border border-[rgba(51,51,51,0.12)] block"
              >
                <Image
                  src={imgUrl}
                  alt={`Chachiji Flavour Moment ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#8C201C]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#FFFFFF]">
                  <InstagramIcon className="w-6 h-6" />
                </div>
              </a>
            ))}
          </div>

          <a
            href="https://instagram.com/chachiji.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#231F20] hover:text-[#8C201C] bg-[#FFF9F3] hover:bg-[#E07A4A] border border-[rgba(51,51,51,0.12)] px-6 py-3 rounded-full transition-all shadow-xs"
          >
            <InstagramIcon className="w-4 h-4 text-[#8C201C]" />
            <span>Follow @Chachiji on Instagram</span>
          </a>
        </div>
      </section>
    </div>
  );
}

