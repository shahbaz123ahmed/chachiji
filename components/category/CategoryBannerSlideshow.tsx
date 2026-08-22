"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryBannerSlideshowProps {
  images: string[];
  name: string;
  isFullCenter?: boolean;
  autoPlayMs?: number;
}

export default function CategoryBannerSlideshow({
  images,
  name,
  isFullCenter = false,
  autoPlayMs = 3500,
}: CategoryBannerSlideshowProps) {
  const bannerImages =
    Array.isArray(images) && images.length > 0 ? images : ["/makh1-clean.png"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset to slide 0 whenever the images list changes (subcategory switch)
  // Using JSON.stringify as stable key for the whole array
  const imageKey = bannerImages.join("|");
  const prevImageKeyRef = useRef(imageKey);
  useEffect(() => {
    if (prevImageKeyRef.current !== imageKey) {
      prevImageKeyRef.current = imageKey;
      setCurrentIndex(0);
      setDirection("next");
    }
  }, [imageKey]);

  const goTo = useCallback(
    (idx: number, dir: "next" | "prev") => {
      if (isAnimating || bannerImages.length <= 1) return;
      setDirection(dir);
      setIsAnimating(true);
      setCurrentIndex(idx);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating, bannerImages.length]
  );

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % bannerImages.length, "next");
  }, [currentIndex, bannerImages.length, goTo]);

  const goPrev = useCallback(() => {
    goTo(
      currentIndex === 0 ? bannerImages.length - 1 : currentIndex - 1,
      "prev"
    );
  }, [currentIndex, bannerImages.length, goTo]);

  // Auto-slideshow
  useEffect(() => {
    if (bannerImages.length <= 1) return;
    timerRef.current = setInterval(goNext, autoPlayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [bannerImages.length, autoPlayMs, goNext]);

  // Pause on hover
  const pauseAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resumeAutoPlay = () => {
    if (bannerImages.length <= 1) return;
    timerRef.current = setInterval(goNext, autoPlayMs);
  };

  const heightClass = isFullCenter
    ? "h-[300px] sm:h-[360px] md:h-[400px] lg:h-[450px]"
    : "h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px] xl:h-[440px]";

  return (
    <div
      className={`relative w-full group flex items-center justify-center overflow-hidden select-none ${heightClass}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Slides */}
      {bannerImages.map((src, idx) => {
        const isActive = idx === currentIndex;
        // Slide-in direction based on animation direction
        const slideClass = isActive
          ? "opacity-100 translate-x-0 z-10"
          : direction === "next"
          ? idx === (currentIndex - 1 + bannerImages.length) % bannerImages.length
            ? "opacity-0 -translate-x-full z-0"
            : "opacity-0 translate-x-full z-0"
          : idx === (currentIndex + 1) % bannerImages.length
          ? "opacity-0 translate-x-full z-0"
          : "opacity-0 -translate-x-full z-0";

        return (
          <div
            key={`${src}-${idx}`}
            className={`absolute inset-0 w-full h-full transition-all duration-600 ease-in-out will-change-transform flex items-center justify-center ${
              isActive
                ? "opacity-100 translate-x-0 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{
              transform: isActive ? "translateX(0)" : undefined,
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-3">
              <Image
                src={src}
                alt={`${name} - Image ${idx + 1}`}
                fill
                priority={idx === 0}
                quality={100}
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 55vw"
                style={{ objectFit: "contain", objectPosition: "center" }}
                className="drop-shadow-lg"
              />
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows (only when multiple images) */}
      {bannerImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goPrev();
            }}
            className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm cursor-pointer shadow-md border border-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goNext();
            }}
            className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm cursor-pointer shadow-md border border-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {bannerImages.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  const dir = dotIdx > currentIndex ? "next" : "prev";
                  goTo(dotIdx, dir);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === currentIndex
                    ? "w-5 h-1.5 bg-white shadow-sm"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to image ${dotIdx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
