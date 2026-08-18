'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const SLIDES = [
  {
    src: '/heros2.png',
    alt: 'Chachiji Mix Pickle, Mango Pickle, Masala Chana and Mithila Makhana jars',
    // Centred jar composition — can go bigger
    scale: 1.6,
    objectPosition: 'center',
  },
  {
    src: '/h3.png',
    alt: 'Chachiji Authentic Mango Pickle in traditional ceramic martaban',
    // Wide landscape — scale 1.0 so full image (jar + oil bottle) stays uncropped
    scale: 1.05,
    objectPosition: 'center',
  },
  {
    src: '/h4.png',
    alt: 'Chachiji Mithila Makhana Pure Crunchy Nutritious',
    // Wide landscape image — no upscale, full visible
    scale: 1.2,
    objectPosition: 'center',
  },
];


const INTERVAL_MS = 3500;
const FADE_MS = 1200;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const ready = setTimeout(() => setImagesReady(true), 300);
    return () => clearTimeout(ready);
  }, []);

  useEffect(() => {
    if (!imagesReady) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [imagesReady]);

  return (
    <div className="flex-1 relative min-h-[280px] sm:min-h-[320px] lg:min-h-0">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            zIndex: i === current ? 1 : 0,
          }}
        >
          {/* Per-slide scale wrapper — overflow hidden only within each slide */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ transform: `scale(${slide.scale})`, transformOrigin: 'center' }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              quality={100}
              sizes="100vw"
              style={{ objectFit: 'contain', objectPosition: slide.objectPosition }}
              className="select-none pointer-events-none"
            />
          </div>
        </div>
      ))}

      {/* Carousel Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-3 h-3 bg-[#8C201C] scale-110'
                : 'w-2 h-2 bg-[#EFE7DD] hover:bg-[#C96635]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

