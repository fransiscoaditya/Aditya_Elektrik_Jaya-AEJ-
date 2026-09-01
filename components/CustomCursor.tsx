"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Center dot follows mouse instantly, outer ring has smooth spring trailing
  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Completely disable custom cursor on touch/mobile devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isTouch) return;

    let active = false;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!active) {
        active = true;
        setIsVisible(true);
        document.body.classList.add("custom-cursor-active");
      }
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      document.body.classList.add("custom-cursor-active");
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove("custom-cursor-active");
    };

    const onTouchStart = () => {
      // Touch device detected: deactivate custom cursor and show standard touch pointer
      setIsVisible(false);
      document.body.classList.remove("custom-cursor-active");
    };

    // Track hover on interactive links/buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a, button, input, select, [data-cursor="hover"], .cursor-pointer, summary') !== null)
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* ── Outer Trailing Ring ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999999]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 46 : 26,
          height: isHovering ? 46 : 26,
          borderColor: isHovering ? "#10B981" : "rgba(230, 255, 0, 0.55)",
          backgroundColor: isHovering ? "rgba(16, 185, 129, 0.15)" : "rgba(230, 255, 0, 0.05)",
          opacity: 1,
        }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 320,
          mass: 0.35,
        }}
      >
        <div className="w-full h-full rounded-full border border-inherit bg-inherit backdrop-blur-[0.5px]" />
      </motion.div>

      {/* ── Inner Sharp Neon Center Dot ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[1000000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#E6FF00] shadow-[0_0_10px_#E6FF00]" />
      </motion.div>
    </>
  );
}
