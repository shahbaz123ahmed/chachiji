"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface AutoHoverImageProps {
  src1: string;
  alt1: string;
  src2: string;
  alt2: string;
  sizes?: string;
  objectFit?: "contain" | "cover";
  objectPosition?: string;
  className?: string;
  intervalMs?: number;
  isAutoActive?: boolean; // Controlled sequential flip from parent
}

export default function AutoHoverImage({
  src1,
  alt1,
  src2,
  alt2,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  objectFit = "cover",
  objectPosition = "center",
  className = "",
  intervalMs = 3500,
  isAutoActive,
}: AutoHoverImageProps) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only use internal timer if parent is not controlling isAutoActive
    if (isAutoActive !== undefined) return;

    const timer = setInterval(() => {
      if (!isHovered) {
        setInternalFlipped((prev) => !prev);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isHovered, intervalMs, isAutoActive]);

  // If controlled, use isAutoActive; otherwise use internalFlipped
  const activeSecond = isAutoActive !== undefined ? isAutoActive : internalFlipped;
  const showSecond = isHovered || activeSecond;

  return (
    <div
      className={`relative w-full h-full select-none pointer-events-auto ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Primary Image 1 */}
      <Image
        src={src1}
        alt={alt1}
        fill
        priority
        quality={100}
        unoptimized
        sizes={sizes}
        style={{ objectFit, objectPosition }}
        className={`pointer-events-none transition-all duration-1000 ease-in-out ${
          showSecond ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      />

      {/* Secondary Image 2 */}
      <Image
        src={src2}
        alt={alt2}
        fill
        priority
        quality={100}
        unoptimized
        sizes={sizes}
        style={{ objectFit, objectPosition }}
        className={`pointer-events-none transition-all duration-1000 ease-in-out ${
          showSecond ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      />
    </div>
  );
}
