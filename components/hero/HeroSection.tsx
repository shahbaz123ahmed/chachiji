'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlideItem } from '@/types/ecommerce';

interface HeroSectionProps {
  slides?: HeroSlideItem[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const slideItems: HeroSlideItem[] = Array.isArray(slides) && slides.length > 0 ? slides : [
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
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 5.5s (pauses on mouse hover)
  useEffect(() => {
    if (slideItems.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideItems.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slideItems.length, isPaused]);

  // Keep index in valid bounds
  useEffect(() => {
    if (currentIndex >= slideItems.length) {
      setCurrentIndex(0);
    }
  }, [slideItems.length, currentIndex]);

  const activeSlide = slideItems[currentIndex] || slideItems[0];
  const isImageLeft = activeSlide.imagePosition === "left";
  const isTextRight = activeSlide.textAlign === "right";

  return (
    <section
      className="w-full bg-[#FFF9F3] text-[#231F20] border-b border-[#EFE7DD] overflow-hidden relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex items-center justify-center">
        {/* ================= SPLIT HERO BANNER (DYNAMIC DIRECTIONAL ANIMATION) ================= */}
        <div
          key={`split-${currentIndex}-${activeSlide.imagePosition}`}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-5 sm:pt-7 lg:pt-9 pb-3 sm:pb-4 lg:pb-6"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Text Column: Slides from RIGHT if on Right, or from LEFT if on Left */}
            <div
              className={`w-full lg:w-[45%] xl:w-[42%] flex flex-col justify-center ${
                isImageLeft
                  ? "order-2 lg:order-2 pl-0 lg:pl-2 animate-in fade-in slide-in-from-right-16 duration-700 ease-out"
                  : "order-1 lg:order-1 pr-0 lg:pr-2 animate-in fade-in slide-in-from-left-16 duration-700 ease-out"
              } ${
                isTextRight
                  ? "text-right items-end"
                  : "text-left items-start"
              }`}
            >
              {activeSlide.badge && (
                <span
                  className={`inline-flex items-center gap-1.5 bg-white border border-[#EFE7DD] text-[#8C201C] text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-2xs mb-2 animate-in fade-in duration-500 delay-75 ${
                    isImageLeft ? "slide-in-from-right-10" : "slide-in-from-left-10"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E07A4A]" />
                  <span>{activeSlide.badge}</span>
                </span>
              )}

              <h1
                className={`font-serif tracking-tight leading-[1.08] mb-2 animate-in fade-in duration-600 delay-150 ${
                  isImageLeft ? "slide-in-from-right-12" : "slide-in-from-left-12"
                }`}
              >
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8C201C]">
                  {activeSlide.headingPrimary}
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl italic font-normal text-[#231F20] mt-0.5">
                  {activeSlide.headingSecondary}
                </span>
              </h1>

              {activeSlide.subtitle && (
                <p
                  className={`text-xs sm:text-sm text-[#555555] font-medium leading-relaxed mb-4 max-w-lg animate-in fade-in duration-700 delay-225 ${
                    isImageLeft ? "slide-in-from-right-8" : "slide-in-from-left-8"
                  }`}
                >
                  {activeSlide.subtitle}
                </p>
              )}

              <div
                className={`flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300 ${
                  isTextRight ? "justify-end" : "justify-start"
                }`}
              >
                <Link
                  href={activeSlide.primaryBtnLink || "/shop"}
                  className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span>{activeSlide.primaryBtnText || "Shop Our Flavours"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {activeSlide.secondaryBtnText && (
                  <Link
                    href={activeSlide.secondaryBtnLink || "/about"}
                    className="inline-flex items-center gap-2 bg-white hover:bg-[#FFF9F3] text-[#231F20] border border-[#EFE7DD] font-bold text-sm px-5 py-3 rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{activeSlide.secondaryBtnText}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Image Column: Slides from LEFT if on Left, or from RIGHT if on Right */}
            <div
              className={`w-full lg:w-[55%] xl:w-[58%] flex items-center justify-center ${
                isImageLeft
                  ? "order-1 lg:order-1 animate-in fade-in slide-in-from-left-16 duration-700 ease-out"
                  : "order-2 lg:order-2 animate-in fade-in slide-in-from-right-16 duration-700 ease-out"
              }`}
            >
              <div className="relative w-full h-[318px] sm:h-[378px] md:h-[438px] lg:h-[498px] xl:h-[538px] flex items-center justify-center">
                <Image
                  src={activeSlide.image || "/heros2.png"}
                  alt={activeSlide.headingPrimary || "Hero Slide"}
                  fill
                  priority
                  quality={100}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  className="select-none drop-shadow-2xl transform scale-[1.12] sm:scale-[1.20] lg:scale-[1.26] xl:scale-[1.30] transition-all duration-700 ease-out hover:scale-[1.34]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows (visible on hover if > 1 slide) */}
        {slideItems.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev === 0 ? slideItems.length - 1 : prev - 1))
              }
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-xs cursor-pointer shadow-lg active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % slideItems.length)
              }
              aria-label="Next Slide"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-xs cursor-pointer shadow-lg active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
