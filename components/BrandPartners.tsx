"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURED_PARTNERS = [
  {
    name: "Aditya Electric Jaya",
    label: "Pusat Distribusi & Pengadaan",
    category: "Penyedia Material Elektrikal",
    logoSrc: "/logo.jpg",
    desc: "Pusat pasokan material kelistrikan lengkap, kabel proyek, dan komponen panel untuk operasional fasilitas industri, komersial, maupun pelanggan setia.",
    badge: "Distributor",
  },
  {
    name: "PT Erela",
    label: "Industri Farmasi & Obat-obatan",
    category: "Klien & Langganan B2B Tetap",
    logoSrc: "/logo_erela.webp",
    desc: "Perusahaan manufaktur farmasi & obat-obatan terkemuka di Semarang yang mempercayakan pengadaan komponen kelistrikan operasional fasilitas pabriknya kepada AEJ.",
    badge: "Langganan B2B",
  },
  {
    name: "Virgin Cake & Bakery",
    label: "Jaringan Toko Roti & Kuliner",
    category: "Klien & Langganan B2B Tetap",
    logoSrc: "/logo_virgin.webp",
    desc: "Jaringan bakery dan kuliner legendaris di Semarang yang rutin kami pasok kebutuhan kabel, sistem penerangan, dan peralatan instalasi listrik untuk outlet serta dapur produksinya.",
    badge: "Langganan B2B",
  },
];

const MANUFACTURE_BRANDS = [
  { name: "Schneider Electric", category: "Circuit Breakers & Protection" },
  { name: "Supreme Cable", category: "Industrial Power Cables" },
  { name: "Philips Lighting", category: "Architectural & Industrial LED" },
  { name: "Panasonic", category: "Wiring Devices & Sockets" },
  { name: "Eterna Cable", category: "Building & Residential Cables" },
  { name: "In-Lite LED", category: "Commercial & Industrial Lighting" },
  { name: "ABB", category: "Heavy Industrial Switchgear" },
  { name: "Broco Electrical", category: "Wiring & Power Accessories" },
  { name: "Fort Electric", category: "Panel Components & Meters" },
  { name: "Hannochs", category: "Energy Efficient Lighting" },
  { name: "Kitani", category: "Audio & Installation Cables" },
  { name: "Legrand", category: "Modular Control Systems" },
];

export default function BrandPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="mitra" className="py-24 md:py-36 bg-[#050505] border-b border-white/[0.07]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* ── SECTION HEADER ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="w-8 h-px bg-[#10B981]" />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-emerald-400">
                04 / Klien &amp; Langganan B2B
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-space"
              >
                Klien &amp; Langganan
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space"
                style={{
                  WebkitTextStroke: "1px rgba(242,242,242,0.2)",
                  color: "transparent",
                }}
              >
                Bisnis &amp; Industri.
              </motion.h2>
            </div>
          </div>
          <div className="md:col-span-5 flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed max-w-[420px]"
            >
              Dipercaya sebagai pemasok andalan kebutuhan material kelistrikan untuk operasional industri farmasi hingga fasilitas toko roti terkemuka di Semarang.
            </motion.p>
          </div>
        </div>

        {/* ── FEATURED 3 PARTNERS & B2B CLIENTS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/[0.07] mb-16 md:mb-20">
          {FEATURED_PARTNERS.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + idx * 0.12, ease: [0.76, 0, 0.24, 1] }}
              className="group p-8 md:p-10 border-r border-b border-white/[0.07] flex flex-col gap-6 hover:bg-white/[0.02] transition-colors duration-300"
            >
              {/* ── LOGO FRAME ── */}
              <div className="relative w-full h-[140px] bg-zinc-950 border border-white/[0.08] overflow-hidden flex items-center justify-center p-6 group-hover:border-emerald-500/30 transition-colors duration-300">
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-contain p-4"
                />
              </div>

              {/* ── PARTNER INFO ── */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-[0.2em] font-semibold">
                    {partner.label}
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 bg-white/[0.05] text-zinc-400 border border-white/10 rounded-xs">
                    {partner.badge}
                  </span>
                </div>
                <h3 className="font-space font-bold text-white text-2xl md:text-3xl tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                  {partner.name}
                </h3>
                <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-[0.14em] mt-1">
                  {partner.category}
                </div>
                <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed mt-2">
                  {partner.desc}
                </p>
              </div>

              {/* Status footer */}
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Mitra Pemasok AEJ
                </span>
                <span className="text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── SUPPORTING BRANDS — Clean Editorial Grid ── */}
        <div className="pt-10 border-t border-white/[0.07]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-400 font-semibold">
              Merek &amp; Produsen Terpercaya yang Kami Sediakan
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l border-white/[0.06]">
            {MANUFACTURE_BRANDS.map((b, idx) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.04 }}
                className="p-5 md:p-6 border-r border-b border-white/[0.06] hover:bg-white/[0.025] transition-colors duration-200 group cursor-default"
              >
                <div className="font-space font-semibold text-zinc-300 group-hover:text-white text-sm md:text-base tracking-tight mb-1.5 transition-colors duration-200">
                  {b.name}
                </div>
                <div className="font-mono text-[10px] text-zinc-500 tracking-[0.1em] uppercase leading-relaxed">
                  {b.category}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
