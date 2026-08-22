'use client';

import { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;        // ms delay before animation starts
  duration?: number;     // duration in seconds (default 1.25s)
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
  once?: boolean;        // animate only once (default false)
}

/**
 * Reveal — wraps children in a scroll-triggered fade+slide animation.
 * Uses IntersectionObserver so it works for both on-load and scroll-into-view elements.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 1.25,
  direction = 'up',
  className = '',
  once = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const transforms: Record<string, string> = {
    up:    'translateY(40px)',
    down:  'translateY(-40px)',
    left:  'translateX(50px)',
    right: 'translateX(-50px)',
    fade:  'none',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : transforms[direction],
        transitionProperty: 'opacity, transform',
        transitionDuration: visible ? `${duration}s` : '0.35s',
        transitionTimingFunction: visible ? 'cubic-bezier(0.22, 1, 0.36, 1)' : 'ease-out',
        transitionDelay: visible ? `${delay}ms` : '0ms',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
