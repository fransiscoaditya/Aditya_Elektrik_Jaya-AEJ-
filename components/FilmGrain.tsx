"use client";

import { useEffect } from "react";

export default function FilmGrain() {
  useEffect(() => {
    // Skip heavy SVG filter animation on mobile / touch screens or low-power devices
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isMobile) return;

    document.body.classList.add("film-grain");
    return () => document.body.classList.remove("film-grain");
  }, []);

  return null;
}
