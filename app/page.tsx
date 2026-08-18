"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { CUSTOMER_REVIEWS } from "@/data/reviews";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
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
import HeroSlider from "@/components/hero/HeroSlider";
import Reveal from "@/components/ui/Reveal";

export default function HomePage() {
  const { addToCart } = useCart();

  const bestsellerProducts = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const bundleProducts = PRODUCTS.filter((p) => p.category === "bundles");

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F3]">
      {/* HERO SECTION */}
      <section className="w-full bg-[#FFF9F3] text-[#231F20] border-b border-[#EFE7DD] overflow-hidden">
        {/* 2-column layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
          <div className="flex flex-col lg:flex-row items-stretch gap-0 min-h-[300px] sm:min-h-[320px] lg:min-h-[360px]">

            {/* LEFT: Text */}
            <div className="lg:flex-[0_0_42%] py-10 sm:py-12 lg:py-20 flex flex-col justify-center pr-0 lg:pr-10">
              <Reveal direction="up" delay={100}>
                <h1 className="font-serif tracking-tight leading-[1.06] mb-4">
                  <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-[#8C201C]">
                    Crafted by Heart.
                  </span>
                  <span className="block text-5xl sm:text-6xl lg:text-7xl italic font-normal text-[#231F20] mt-1">
                    Rooted in Tradition.
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={500}>
                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-sm px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <span>Shop Our Flavours</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* RIGHT: Slider */}
            <HeroSlider />
          </div>
        </div>

        {/* ── 5-Pillar Bottom Trust Strip ── */}
        <div className="border-t border-[#EFE7DD] bg-[#FFF9F3] py-4 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
            {/* 1 */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                <Sun className="w-4 h-4 text-[#8C201C]" />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">100%</span>
                <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Sun-Cured &amp; Natural</span>
              </div>
            </div>
            {/* 2 */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#8C201C]" />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">Zero</span>
                <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Synthetic Additives</span>
              </div>
            </div>
            {/* 3 */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-[#8C201C]" />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">GI-Tag</span>
                <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Mithila Wetland Origin</span>
              </div>
            </div>
            {/* 4 */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#8C201C]" />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">Premium</span>
                <span className="text-[11px] text-[#666666] font-semibold block leading-tight">Ingredients</span>
              </div>
            </div>
            {/* 5 */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFFFFF]/70 border border-[#EFE7DD] flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-[#8C201C]" />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-[#8C201C] block leading-tight">Made with Love</span>
                <span className="text-[11px] text-[#666666] font-semibold block leading-tight">In Small Batches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS SECTION - Solid Clean White Surface */}
      <section className="pt-8 sm:pt-10 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[rgba(51,51,51,0.10)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <Reveal direction="up" delay={0}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
                Customer Favourites
              </span>
            </Reveal>
            <Reveal direction="up" delay={200}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231F20] mt-1.5 mb-2">
                The Flavours You Keep Coming Back For
              </h2>
            </Reveal>
            <Reveal direction="up" delay={400}>
              <p className="text-xs sm:text-sm text-[#555555] font-medium max-w-lg mx-auto">
                Freshly cured batches bottled and dispatched weekly from our kitchen in Vaishali.
              </p>
            </Reveal>
            <Reveal direction="up" delay={580}>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C201C] hover:text-[#6B1815] transition-colors mt-3 group"
              >
                <span>View All Flavours</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {bestsellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRAND STORY ("More Than Food. It's a Taste of Home.") - Solid Cream Background */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] text-[#231F20] border-b border-[rgba(51,51,51,0.10)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Large Editorial Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFFFF] bg-white">
              <Image
                src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80"
                alt="Traditional Indian Sun Curing & Pickle Jars"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#231F20]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] shadow-lg">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C201C] block mb-1">
                  Heirloom Craftsmanship
                </span>
                <p className="font-serif text-base italic font-bold text-[#231F20]">
                  &quot;In our kitchen, time and sunlight are the two most valuable ingredients.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Right Story Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#8C201C] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[rgba(51,51,51,0.10)] shadow-xs">
              <Heart className="w-3.5 h-3.5 text-[#E07A4A]" />
              <span>Our Culinary Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#8C201C]">
              More Than Food. <br />
              <span className="italic font-normal text-[#231F20]">
                It&apos;s a Taste of Home.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#231F20] font-medium leading-relaxed">
              Every bottle of Chachiji cuisine begins in Vaishali, Bihar, where recipes have been guarded and perfected across four generations. We do not use commercial vinegar, chemical preservatives, or industrial curing chambers.
            </p>

            <p className="text-sm sm:text-base text-[#231F20] font-medium leading-relaxed">
              Instead, our Banarasi red chillies and raw orchard mangoes sit under the warm northern sun in ceramic martabans. They are bathed in pure wood-churned cold-pressed mustard oil and hand-roasted panchphoron spices ground in-house on traditional stone silbattas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="flex items-start gap-3 bg-[#FFFFFF] p-4 rounded-2xl border border-[rgba(51,51,51,0.10)] shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#8C201C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#231F20]">Zero Factory Shortcuts</h4>
                  <p className="text-[#555555] text-xs mt-0.5">Slow 14-day natural fermentation in porcelain jars.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#FFFFFF] p-4 rounded-2xl border border-[rgba(51,51,51,0.10)] shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#8C201C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#231F20]">Kachchi Ghani Mustard Oil</h4>
                  <p className="text-[#555555] text-xs mt-0.5">Slow wood-pressed oil with high pungency and aroma.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs px-8 py-4 rounded-xl transition-all shadow-md"
              >
                <span>Meet Chachiji &amp; Our Kitchen</span>
                <ArrowRight className="w-4 h-4 text-[#FFFFFF]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MITHILA HERITAGE SECTION - Solid White Canvas */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[rgba(51,51,51,0.10)]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#FFF9F3] rounded-3xl border border-[rgba(51,51,51,0.10)] p-8 sm:p-12 lg:p-16 shadow-lg relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
                  Geographical Indication (GI Tag) Origin
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] mt-2 mb-4">
                  From Mithila, <br />
                  <span className="italic font-normal text-[#8C201C]">
                    With Sacred Tradition.
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed mb-4">
                  Mithila in Northern Bihar is the historic heartland of Makhana (Fox Nuts), producing over 85% of India&apos;s crop. Deep within the freshwater ponds and wetlands of Darbhanga and Madhubani, local harvesting families dive to gather the spiny seeds of the giant water lily (*Euryale Ferox*).
                </p>
                <p className="text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed mb-6">
                  Our fox nuts are manually sun-dried, fire-roasted in clay ovens, and hand-popped at peak temperature. We select only the Grade A+ jumbo white kernels, ensuring unbeatable natural crunch and pristine purity.
                </p>

                <div className="flex flex-wrap gap-3">
                  <div className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] px-4 py-2 rounded-xl text-xs font-bold text-[#8C201C] shadow-2xs">
                    🌱 Naturally Gluten-Free
                  </div>
                  <div className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] px-4 py-2 rounded-xl text-xs font-bold text-[#8C201C] shadow-2xs">
                    💪 9.7g Protein per 100g
                  </div>
                  <div className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] px-4 py-2 rounded-xl text-xs font-bold text-[#8C201C] shadow-2xs">
                    ❤️ Zero Cholesterol &amp; Trans Fat
                  </div>
                </div>
              </div>

              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md border-4 border-[#FFFFFF] bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80"
                  alt="Mithila Fox Nuts Harvesting and Popping"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
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

