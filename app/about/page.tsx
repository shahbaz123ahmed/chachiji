import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Heart,
  Sun,
  Droplets,
  ShieldCheck,
  ArrowRight,
  Award,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import { BRAND_INFO } from "@/data/brandInfo";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About US — Handcrafted Culinary Heritage of Bihar & Mithila",
  description:
    "Learn about Chachiji's Homemade Cuisine. Heirloom recipes from Vaishali, Bihar, wood cold-pressed mustard oil, sun-curing in earthen martabans, and sacred Mithila wetland makhana.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Hero: 2-Column with Cream Background & Directional Animations */}
      <section className="relative bg-[#FFF9F3] text-[#231F20] py-2 sm:py-3 lg:py-4 border-b border-[#EFE7DD] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 min-h-[340px]">
            {/* Left Column: Text (Animates from Left) */}
            <div className="flex-1 max-w-lg text-left">
              <Reveal direction="right" delay={100}>
                <span className="inline-block bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-2 shadow-2xs">
                  Our Roots in Vaishali, Bihar
                </span>
              </Reveal>
              <Reveal direction="right" delay={250}>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] mb-3">
                  <span className="block text-[#8C201C]">Crafted by Heart.</span>
                  <span className="block italic font-normal text-[#231F20] mt-0.5">Ground by Hand.</span>
                </h1>
              </Reveal>
              <Reveal direction="right" delay={400}>
                <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed mb-4">
                  Chachiji was born from an unwavering devotion to the authentic, unadulterated tastes of home — where every achar is cured under open sunshine and every makhana is harvested from sacred wetlands.
                </p>
              </Reveal>
              <Reveal direction="right" delay={550}>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <span>Explore Our Heritage Jars</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Transparent about.png (Animates from Right - Enlarged) */}
            <div className="flex-1 lg:flex-[1.2] relative flex items-center justify-center lg:justify-end w-full">
              <Reveal direction="left" delay={200} className="w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl h-[320px] sm:h-[400px] lg:h-[460px] xl:h-[500px]">
                  <Image
                    src="/about-hero-v2.png"
                    alt="Chachiji Traditional Sil-Batta, Pickles & Makhana Heritage"
                    fill
                    priority
                    quality={100}
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    style={{ objectFit: "contain", objectPosition: "center right" }}
                    className="select-none pointer-events-none"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 1: Our Commitment - Solid Soft Cream Background */}
      <section className="py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] border-b border-[#EFE7DD] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left: Transparent Commitment Image (Animates from Left - Ultra-HD & Enlarged) */}
          <div className="flex items-center justify-center lg:justify-start w-full">
            <Reveal direction="right" delay={150} className="w-full flex justify-center lg:justify-start">
              <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-3xl h-[320px] sm:h-[400px] lg:h-[460px] xl:h-[500px]">
                <Image
                  src="/commitment-v3.png"
                  alt="Chachiji Artisans grinding spices on traditional sil-batta and handpicking Mithila makhana"
                  fill
                  priority
                  quality={100}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  style={{ objectFit: "contain", objectPosition: "center left" }}
                  className="select-none pointer-events-none"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: Content (Animates from Right) */}
          <div className="space-y-3.5">
            <Reveal direction="left" delay={200}>
              <span className="inline-block bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-1.5 shadow-2xs">
                Our Commitment
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] leading-[1.12]">
                A Sacred Pledge to Pure Indian Heritage
              </h2>
            </Reveal>

            <Reveal direction="left" delay={350}>
              <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
                At Chachiji’s Homemade Cuisine, we don’t just sell food; we share a piece of our heritage. Our commitment is built on two pillars of authentic Indian tradition: the artisanal craft of hand-ground pickles and the sustainable procurement of Mithila’s finest Makhana.
              </p>
            </Reveal>

            <Reveal direction="left" delay={500}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#FFFFFF] p-3 sm:p-3.5 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#8C201C] block">
                    1. Artisanal Hand-Ground Pickles
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    Whole spices stone-crushed on traditional sil-batta and sun-cured in porcelain martabans with pure cold-pressed oil.
                  </p>
                </div>

                <div className="bg-[#FFFFFF] p-3 sm:p-3.5 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#8C201C] block">
                    2. Sustainable Mithila Makhana
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    Direct ethical partnerships with indigenous harvesting families in Bihar&apos;s freshwater wetlands for Grade A+ jumbo blooms.
                  </p>
                </div>
              </div>

              <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-2xl border border-[#EFE7DD] text-xs text-[#8C201C] font-serif italic font-bold shadow-2xs mt-2.5">
                &quot;If it cannot be prepared with the same purity we feed our own children, it will never leave our kitchen.&quot;
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chapter 2: Taste the Tradition - Solid Soft Cream Background */}
      <section className="py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] border-b border-[#EFE7DD] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Text & 3 Pillars (Compact Width - 5/12 cols) */}
          <div className="space-y-3 order-2 lg:order-1 lg:col-span-5 max-w-lg lg:max-w-none">
            <Reveal direction="right" delay={100}>
              <span className="inline-block bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-1 shadow-2xs">
                Taste the Tradition
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] leading-[1.12]">
                Crafted by Heart, <br />
                <span className="italic font-normal text-[#8C201C]">Ground by Hand.</span>
              </h2>
            </Reveal>

            <Reveal direction="right" delay={250}>
              <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
                We believe that the soul of a perfect pickle lies in the purity of its ingredients. In a world of mass production, we choose the path of patience.
              </p>
            </Reveal>

            <Reveal direction="right" delay={400}>
              <div className="space-y-2 pt-0.5">
                {/* Pillar 1 */}
                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8C201C]">
                    Hand-Blended Excellence
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    Every jar features our signature spice blends, roasted and ground in-house. This ensures a depth of aroma and a bold flavor profile that pre-packaged alternatives can never replicate.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8C201C]">
                    A Living Legacy
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    We aren&apos;t just preparing recipes; we are preserving a legacy of authentic flavors passed down through generations.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8C201C]">
                    Patience &amp; Love
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    Our pickles are cured naturally, allowing time to develop the complex tang and texture that define true homemade cuisine.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Transparent Image (Massively Enlarged - 7/12 cols) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex items-center justify-center lg:justify-end w-full">
            <Reveal direction="left" delay={200} className="w-full flex justify-center lg:justify-end">
              <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] xl:h-[640px]">
                <Image
                  src="/our-v3.png"
                  alt="Traditional Grandmother and Child Grinding Heirloom Spices on Stone Sil-Batta"
                  fill
                  priority
                  quality={100}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  style={{ objectFit: "contain", objectPosition: "center right" }}
                  className="select-none pointer-events-none"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chapter 3: The Mithila Wetland Connection - Solid Cream Section */}
      <section id="mithila" className="py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] border-y border-[#EFE7DD] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Transparent Makhana Image (Animates from Left) */}
          <div className="order-1 lg:order-1 flex items-center justify-center lg:justify-start w-full">
            <Reveal direction="right" delay={150} className="w-full flex justify-center lg:justify-start">
              <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl h-[320px] sm:h-[400px] lg:h-[460px] xl:h-[500px]">
                <Image
                  src="/mithila-clean.png"
                  alt="GI-Tagged Mithila Makhana and Spiced Roasted Fox Nuts"
                  fill
                  priority
                  quality={100}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  className="select-none pointer-events-none"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Text (Animates from Right) */}
          <div className="order-2 lg:order-2">
            <Reveal direction="left" delay={200}>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
                  Mithila Sacred Waters
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20]">
                  GI-Tagged Mithila Makhana
                </h2>
                <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
                  Mithila produces over 85% of the world&apos;s Fox Nuts. The freshwater wetlands of Darbhanga, Madhubani, and Sitamarhi provide the pristine mineral-rich environment where the prickly water lily (*Euryale Ferox*) flourishes.
                </p>
                <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
                  Every morning at dawn, indigenous Mallah community harvesters dive deep into the calm waters to gather the seeds from the muddy lakebeds. We work directly with these artisan farming clusters, paying fair prices and selecting only the top Grade A+ jumbo white blooms.
                </p>
                <div className="flex flex-wrap gap-2 text-xs pt-0.5">
                  <span className="bg-[#FFFFFF] border border-[#EFE7DD] px-3.5 py-1.5 rounded-xl font-bold text-[#8C201C] shadow-2xs">
                    Direct Farmer Partnership
                  </span>
                  <span className="bg-[#FFFFFF] border border-[#EFE7DD] px-3.5 py-1.5 rounded-xl font-bold text-[#8C201C] shadow-2xs">
                    GI Registered Origin
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chapter 4: Our Promise to You - Solid Soft Cream Background */}
      <section className="py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] border-b border-[#EFE7DD] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Text & Promises (Animates from Left - 5/12 cols) */}
          <div className="space-y-3.5 order-2 lg:order-1 lg:col-span-5 max-w-lg lg:max-w-none">
            <Reveal direction="right" delay={100}>
              <span className="inline-block bg-[#FFFFFF] border border-[#EFE7DD] text-[#8C201C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-1.5 shadow-2xs">
                Our Promise to You
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] leading-[1.12]">
                Uncompromising Quality. <br />
                <span className="italic font-normal text-[#8C201C]">Delivered with Integrity.</span>
              </h2>
            </Reveal>

            <Reveal direction="right" delay={250}>
              <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
                Whether it is the spicy kick of our hand-ground pickles or the guilt-free crunch of our sun-dried Makhana, we promise uncompromising quality.
              </p>
              <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed mt-2.5">
                At Chachiji’s, we bring you the warmth of a traditional kitchen, where every ingredient is chosen with care and every product is delivered with integrity.
              </p>
            </Reveal>

            <Reveal direction="right" delay={400}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#FFFFFF] p-3 sm:p-3.5 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8C201C]">
                    Chosen with Care
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    100% pure cold-pressed oils, hand-picked Mithila makhana, and heirloom whole spices with zero shortcuts.
                  </p>
                </div>

                <div className="bg-[#FFFFFF] p-3 sm:p-3.5 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-0.5">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#8C201C]">
                    Delivered with Integrity
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#555555] font-medium leading-relaxed">
                    Packed fresh in food-grade glass jars and delivered straight from our kitchen in Vaishali to your family.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Transparent Promise Image (Massively Enlarged - 7/12 cols) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex items-center justify-center lg:justify-end w-full">
            <Reveal direction="left" delay={200} className="w-full flex justify-center lg:justify-end">
              <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] xl:h-[640px]">
                <Image
                  src="/promise-clean.png"
                  alt="Chachiji's Homemade Cuisine — Our Promise to You 3-Generation Family Gathering"
                  fill
                  priority
                  quality={100}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  style={{ objectFit: "contain", objectPosition: "center right" }}
                  className="select-none pointer-events-none"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chapter 5: Four Pillars of Authenticity - Solid White Canvas */}
      <section id="process" className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
            Artisan Principles
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#231F20] mt-1">
            Our 4 Sacred Kitchen Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#FFF9F3] p-5 rounded-3xl border border-[#EFE7DD] shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center">
              <Sun className="w-5 h-5 text-[#E07A4A]" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#231F20]">
              100% Sun-Cured
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              No artificial heaters or chemical ripening chambers. Pickles cure naturally over 12-14 days in porcelain martabans under bright sunlight.
            </p>
          </div>

          <div className="bg-[#FFF9F3] p-5 rounded-3xl border border-[#EFE7DD] shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center">
              <Droplets className="w-5 h-5 text-[#E07A4A]" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#231F20]">
              Wood Cold-Pressed Oil
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              We exclusively use unrefined kachchi ghani mustard oil, preserving natural pungent allyl isothiocyanate and essential antioxidants.
            </p>
          </div>

          <div className="bg-[#FFF9F3] p-5 rounded-3xl border border-[#EFE7DD] shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#E07A4A]" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#231F20]">
              Zero Chemical Additives
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              No sodium benzoate, no artificial food colorings, and no synthetic vinegar. Natural fermentation preserved by salt and oil.
            </p>
          </div>

          <div className="bg-[#FFF9F3] p-5 rounded-3xl border border-[#EFE7DD] shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#8C201C] text-[#FFFFFF] flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#E07A4A]" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#231F20]">
              Local Artisan Empowerment
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Prepared and packed by experienced rural women artisans in Vaishali, supporting dignified heritage livelihoods.
            </p>
          </div>
        </div>
      </section>

      {/* Official Licensing & Food Safety Compliance Strip */}
      <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 bg-[#FFF9F3] border-t border-[#EFE7DD]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Government of India Certified
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#231F20] mt-1 mb-1.5">
              Official Food Licensing &amp; Compliance
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
              Every jar is produced in an FSSAI-compliant, certified kitchen under strict hygiene and temperature-monitored conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* FSSAI License Card */}
            <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-3xl border border-[#EFE7DD] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#8C201C]" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#8C201C] text-[#FFFFFF] px-2.5 py-0.5 rounded">
                    Food Safety
                  </span>
                  <span className="text-xs text-[#777777] font-semibold">FSSAI Central / State</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#231F20]">FSSAI License Number</h3>
                <div className="bg-[#FFF9F3] border border-[#EFE7DD] px-3 py-1.5 rounded-xl text-base font-mono font-bold text-[#8C201C] tracking-wider w-fit">
                  {BRAND_INFO.fssaiNumber}
                </div>
                <p className="text-xs text-[#555555] font-medium leading-relaxed pt-0.5">
                  Certified for hygienic manufacturing, processing, and domestic distribution of traditional pickles and GI-tagged makhana.
                </p>
              </div>
            </div>

            {/* GST Registration Card */}
            <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-3xl border border-[#EFE7DD] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6 text-[#8C201C]" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E07A4A] text-[#231F20] px-2.5 py-0.5 rounded shadow-2xs">
                    Registered Enterprise
                  </span>
                  <span className="text-xs text-[#777777] font-semibold">Govt. of Bihar / India</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#231F20]">GST Identification Number</h3>
                <div className="bg-[#FFF9F3] border border-[#EFE7DD] px-3 py-1.5 rounded-xl text-base font-mono font-bold text-[#231F20] tracking-wider w-fit">
                  {BRAND_INFO.gstNumber}
                </div>
                <p className="text-xs text-[#555555] font-medium leading-relaxed pt-0.5">
                  Legally registered manufacturing kitchen facility located at Hajipur-Muzaffarpur Highway (NH 22), Vaishali, Bihar - 844114.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip - Solid Deep Red #8C201C */}
      <section className="bg-[#8C201C] text-[#FFFFFF] py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#6B1815]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Taste the Authentic Spirit of Bihar
          </h2>
          <p className="text-xs sm:text-sm text-[#FFF9F3] font-medium max-w-xl mx-auto">
            Order fresh small-batch pickles and roasted fox nuts delivered directly from our Vaishali kitchen to your dining table.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#E07A4A] hover:bg-[#C96635] text-[#231F20] font-bold text-xs px-8 py-3.5 rounded-xl shadow-md transition-all"
            >
              <span>Explore Our Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

