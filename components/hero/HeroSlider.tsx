'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const DEFAULT_SLIDES = [
  '/heros2.png',
  '/h3.png',
  '/h4.png',
  '/slide4.png',
  '/slide5.png',
];

const INTERVAL_MS = 3800;

interface HeroSliderProps {
  slides?: string[];
  isFullCenter?: boolean;
}

export default function HeroSlider({
  slides,
  isFullCenter = false,
}: HeroSliderProps) {
  const slideImages = Array.isArray(slides) && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [current, setCurrent] = useState(0);

  // Ensure current index is always within valid bounds when slides change
  useEffect(() => {
    if (current >= slideImages.length) {
      setCurrent(0);
    }
  }, [slideImages.length, current]);

  useEffect(() => {
    if (slideImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideImages.length);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  return (
    <div
      className={`relative w-full flex items-center justify-center overflow-hidden group ${
        isFullCenter
          ? 'h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px]'
          : 'h-[320px] sm:h-[380px] md:h-[440px] lg:h-[480px]'
      }`}
    >
      {slideImages.map((src, i) => {
        const isCurrent = i === current;

        return (
          <div
            key={src + i}
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-700 ease-in-out ${
              isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
              <Image
                src={src}
                alt={`Hero Slide ${i + 1}`}
                fill
                priority={i === 0}
                quality={100}
                unoptimized
                sizes="100vw"
                style={{
                  objectFit: isFullCenter ? 'contain' : 'contain',
                  objectPosition: 'center',
                }}
                className={`select-none ${
                  !isFullCenter ? 'transform scale-[1.05] sm:scale-[1.12] lg:scale-[1.18] origin-center drop-shadow-md' : 'p-2 sm:p-4 drop-shadow-md'
                }`}
              />
            </div>
          </div>
        );
      })}

      {/* Carousel Dots */}
      {slideImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-xs">
          {slideImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'w-4 h-2 bg-[#8C201C] shadow-xs'
                  : 'w-2 h-2 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
