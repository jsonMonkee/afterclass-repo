'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScrollProvider({ children }) {
  const pathname = usePathname();
  const disableLenis = pathname?.startsWith('/clubs') || pathname?.startsWith('/dhanda');

  useEffect(() => {
    // Register ScrollTrigger with GSAP
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (disableLenis) return;

    // Use native hardware-accelerated scrolling on touch/mobile devices to prevent scroll lag
    const isTouchDevice =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    if (isTouchDevice) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [disableLenis]);

  return <>{children}</>;
}

