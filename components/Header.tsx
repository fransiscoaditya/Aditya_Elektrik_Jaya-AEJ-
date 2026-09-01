"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, animate, AnimatePresence } from "framer-motion";
import { useLenis } from "@/components/SmoothScroll";

const NAV_LINKS = [
  { label: "Produk", href: "#katalog" },
  { label: "Merek", href: "#mitra" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Lokasi", href: "#lokasi" },
];

export default function Header() {
  const { scrollTo } = useLenis();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const headerY = useMotionValue(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [semarangTime, setSemarangTime] = useState<string>("");
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live Semarang (WIB / GMT+7) Time and Store Status
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const wibDate = new Date(utc + 3600000 * 7);

      const hours = wibDate.getHours();
      const minutes = wibDate.getMinutes().toString().padStart(2, "0");
      setSemarangTime(`${hours.toString().padStart(2, "0")}:${minutes} WIB`);

      const day = wibDate.getDay();
      const isOpen = day !== 0 && hours >= 8 && hours < 17;
      setIsOpenNow(isOpen);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (current) => {
      const prev = lastScrollY.current;
      const diff = current - prev;
      setIsScrolled(current > 40);
      if (diff > 8 && current > 140) {
        animate(headerY, -100, { duration: 0.35, ease: [0.76, 0, 0.24, 1] });
      } else if (diff < -4) {
        animate(headerY, 0, { duration: 0.4, ease: [0.76, 0, 0.24, 1] });
      }
      lastScrollY.current = current;
    });
    return unsubscribe;
  }, [scrollY, headerY]);

  // Close mobile menu on scroll
  useEffect(() => {
    const unsubscribe = scrollY.on("change", () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    });
    return unsubscribe;
  }, [scrollY, mobileMenuOpen]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => scrollTo(href, { offset: -80 }), mobileMenuOpen ? 300 : 0);
  };

  return (
    <>
      <motion.header
        style={{ y: headerY }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-[#050505]/80 via-[#050505]/30 to-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-3.5 md:py-4 flex items-center justify-between">

          {/* Brand */}
          <a
            href="#beranda"
            data-cursor="hover"
            onClick={(e) => { e.preventDefault(); scrollTo(0); }}
            className="flex items-center gap-2.5 group flex-shrink-0"
            aria-label="Aditya Electric Jaya - Kembali ke atas"
          >
            <div className="w-7 h-7 bg-emerald-950 border border-emerald-500/50 flex items-center justify-center font-mono text-xs font-black text-[#E6FF00] group-hover:scale-105 transition-transform flex-shrink-0">
              AEJ
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-xs sm:text-sm tracking-tight font-space uppercase leading-none group-hover:text-[#E6FF00] transition-colors">
                Aditya Electric Jaya
              </span>
              <span className="font-mono text-[9px] text-zinc-500 tracking-[0.14em] uppercase mt-0.5 hidden sm:block">
                Distributor Elektrikal · Semarang
              </span>
            </div>
          </a>

          {/* Desktop: Store Status + Nav + CTA */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {/* Live Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-zinc-900/70 border border-white/[0.08] font-mono text-[10px]">
              <span className="flex h-1.5 w-1.5 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${isOpenNow ? "bg-emerald-400" : "bg-amber-400"}`} />
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isOpenNow ? "bg-emerald-500" : "bg-amber-500"}`} />
              </span>
              <span className={isOpenNow ? "text-emerald-400" : "text-amber-400"}>
                {isOpenNow ? "Toko Buka" : "Toko Tutup"}
              </span>
              {semarangTime && (
                <>
                  <span className="text-zinc-700">|</span>
                  <span className="text-zinc-400 tabular-nums">{semarangTime}</span>
                </>
              )}
            </div>

            {/* Nav */}
            <nav aria-label="Navigasi utama" className="flex items-center gap-5 lg:gap-7">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor="hover"
                  onClick={(e) => handleNav(e, link.href)}
                  className="font-sans text-xs text-zinc-400 hover:text-white transition-colors duration-200 tracking-wide relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E6FF00] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20material%20listrik."
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="font-mono text-[10px] uppercase tracking-[0.16em] px-4 py-2 bg-[#E6FF00] hover:bg-white text-black font-bold transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span>Hubungi Kami</span>
              <span>↗</span>
            </a>
          </div>

          {/* Mobile: WhatsApp icon + Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20material%20listrik."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi via WhatsApp"
              className="flex items-center justify-center w-11 h-11 bg-[#E6FF00] text-black font-bold text-xs transition-all hover:bg-white active:scale-95"
            >
              WA
            </a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex flex-col items-center justify-center w-11 h-11 gap-1.5 border border-white/[0.12] hover:border-white/30 transition-colors"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-5 h-px bg-white block origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-px bg-white block"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-5 h-px bg-white block origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-out Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[98] bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.nav
              id="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              aria-label="Menu navigasi mobile"
              className="fixed top-0 right-0 bottom-0 z-[99] w-[280px] bg-[#0a0a0a] border-l border-white/[0.08] flex flex-col md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
                <div className="flex flex-col">
                  <span className="font-space font-bold text-white text-sm uppercase tracking-tight">
                    Aditya Electric Jaya
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? "bg-emerald-400" : "bg-amber-400"}`} />
                    <span className={`font-mono text-[10px] ${isOpenNow ? "text-emerald-400" : "text-amber-400"}`}>
                      {isOpenNow ? "Toko Buka" : "Toko Tutup"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Tutup menu"
                  className="w-8 h-8 flex items-center justify-center border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col flex-1 py-6 px-4 gap-1">
                <a
                  href="#beranda"
                  onClick={(e) => handleNav(e, "#beranda")}
                  className="flex items-center justify-between px-4 py-4 font-sans text-sm text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/[0.06] rounded-sm"
                >
                  <span>Beranda</span>
                  <span className="text-zinc-600 text-xs">↑</span>
                </a>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="flex items-center justify-between px-4 py-4 font-sans text-sm text-zinc-300 hover:text-[#E6FF00] hover:bg-white/[0.04] transition-colors border border-transparent hover:border-[#E6FF00]/[0.15] rounded-sm"
                  >
                    <span>{link.label}</span>
                    <span className="text-zinc-600 text-xs">→</span>
                  </a>
                ))}
              </div>

              {/* Drawer Footer CTA */}
              <div className="px-4 pb-8 pt-4 border-t border-white/[0.07] space-y-3">
                <a
                  href="https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20material%20listrik."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#E6FF00] hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-[0.16em] transition-colors"
                >
                  <span>Konsultasi WhatsApp</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/uygmjLEwpWyRTVnY6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/15 hover:border-white/30 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-[0.14em] transition-colors"
                >
                  <span>Petunjuk Arah</span>
                  <span>↗</span>
                </a>
                <p className="font-mono text-[9px] text-zinc-600 text-center tracking-[0.12em] uppercase">
                  Jl. Parang Kusumo I No.19 · Semarang
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
