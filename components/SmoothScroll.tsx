"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { useMotionValue, MotionValue } from "framer-motion";

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
  velocity: MotionValue<number>;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  velocity: null as unknown as MotionValue<number>,
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const velocity = useMotionValue(0);

  useEffect(() => {
    // Only instantiate Lenis smooth wheel on desktop pointer devices
    const isMobileTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isMobileTouch) {
      return; // Use 100% native zero-overhead momentum scrolling on mobile
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ({ velocity: v }: { velocity: number }) => {
      velocity.set(v);
    });

    let rafId: number;
    const tick = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [velocity]);

  const scrollTo = (target: string | number | HTMLElement, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as any, {
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        ...options,
      });
    } else {
      // Fallback for native mobile scroll
      if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo, velocity }}>
      {children}
    </LenisContext.Provider>
  );
}
