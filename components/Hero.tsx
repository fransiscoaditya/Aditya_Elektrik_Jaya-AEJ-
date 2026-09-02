"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useRef, ReactNode } from "react";
import Image from "next/image";
import { useLenis } from "@/components/SmoothScroll";

/* ─── Magnetic Button ────────────────────────────────── */
function MagneticButton({
  children,
  className,
  onClick,
  href,
}: {
  children: ReactNode;
  className: string;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24 });
  const springY = useSpring(y, { stiffness: 260, damping: 24 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || prefersReduced) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const sharedProps = {
    ref: ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    style: prefersReduced ? {} : { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: () => { x.set(0); y.set(0); },
    "data-cursor": "hover",
    className,
  };

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...sharedProps}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

/* ─── Hero ───────────────────────────────────────────── */
export default function Hero() {
  const { scrollTo } = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 0.75]);

  return (
    <section
      ref={sectionRef}
      id="beranda"
      aria-label="Aditya Electric Jaya - Material Listrik Terlengkap Semarang"
      className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#050505]"
    >
      {/* ── Background Image with Parallax ── */}
      <motion.div
        style={prefersReduced ? {} : { scale: imageScale, y: imageY }}
        className="absolute inset-0 z-0 origin-center"
      >
        <Image
          src="/hero-electrical.webp"
          alt="Toko material listrik Aditya Electric Jaya Semarang"
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Darkening overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Scroll darkening */}
      <motion.div
        style={prefersReduced ? {} : { opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#050505] z-[2] pointer-events-none"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex flex-col max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-28 pb-16 md:pb-20">

        {/* Overline strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-wrap items-center gap-3 mb-10 md:mb-14"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 inline-block rounded-full" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
              Aditya Electric Jaya · Semarang
            </span>
          </span>
          <span className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-emerald-950/50 border border-emerald-500/30 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
              Toko Listrik Terpercaya · Est. 2017
            </span>
          </span>
        </motion.div>

        {/* ── Semantic SEO H1 — Exact Match for Google Search ── */}
        <h1 className="sr-only">
          Toko Listrik Semarang — Aditya Elektrik Jaya | Distributor Kabel, Lampu LED &amp; Komponen Panel Terlengkap
        </h1>

        {/* ── Main Headline — Visual Display ── */}
        <div className="flex-1 flex flex-col justify-center max-w-[900px]">
          <div aria-hidden="true" className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: prefersReduced ? 0 : 24, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="font-space font-bold text-white leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 7.5vw, 6.5rem)" }}
            >
              Material Listrik
            </motion.div>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.div
              initial={{ y: prefersReduced ? 0 : 24, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
              className="font-space font-bold leading-[1.0] tracking-tight"
              style={{
                fontSize: "clamp(2.4rem, 7.5vw, 6.5rem)",
                color: "#E6FF00",
              }}
            >
              Berkualitas.
            </motion.div>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.div
              initial={{ y: prefersReduced ? 0 : 24, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.76, 0, 0.24, 1] }}
              className="font-space font-bold text-zinc-400 leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 7.5vw, 6.5rem)" }}
            >
              Siap untuk Anda.
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="font-sans text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-[540px] mb-8"
          >
            Distributor dan toko material listrik terpercaya di Semarang untuk kebutuhan rumah, ruko, kantor, proyek, dan industri.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <MagneticButton
              onClick={() => scrollTo("#katalog", { offset: -80 })}
              className="group bg-[#E6FF00] hover:bg-white text-[#050505] font-mono font-bold text-[11px] uppercase tracking-[0.18em] px-7 py-4 transition-colors duration-300 flex items-center justify-center gap-2.5 min-h-[52px]"
            >
              <span>Lihat Katalog Produk</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">↓</span>
            </MagneticButton>

            <MagneticButton
              href="https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20material%20listrik."
              className="group border border-white/25 hover:border-[#E6FF00] hover:text-[#E6FF00] text-zinc-300 font-mono text-[11px] uppercase tracking-[0.18em] px-7 py-4 transition-all duration-300 flex items-center justify-center gap-2.5 min-h-[52px]"
            >
              <span>Konsultasi WhatsApp</span>
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 inline-block">↗</span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── Bottom Trust Strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 md:mt-12 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
        >
          {[
            { label: "Lokasi", value: "Pedurungan, Semarang" },
            { label: "Jam Buka", value: "Sen–Sab · 08:00–17:00" },
            { label: "Produk", value: "Kabel, Lampu, Panel, Saklar" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-zinc-400">
                {item.label}
              </span>
              <span className="font-sans text-xs text-zinc-300 font-medium leading-tight">
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}
