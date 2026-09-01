"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const BENTO_PILLARS = [
  {
    id: "sni",
    badge: "Keamanan & Kualitas",
    title: "Produk Asli Berstandar Resmi",
    desc: "Kami hanya menyediakan produk bersertifikasi resmi untuk menjamin keamanan sirkuit, mencegah risiko korsleting, dan memberikan keandalan instalasi jangka panjang.",
    highlight: "Mutu Asli Terjamin",
    subtext: "Dari Distributor Resmi Bersertifikat",
    colSpan: "md:col-span-7",
    mark: "◈",
    accentBg: "from-emerald-950/40 via-zinc-950/60 to-zinc-950/80",
    borderGlow: "group-hover:border-emerald-500/50",
  },
  {
    id: "b2b",
    badge: "Logistik & Stok",
    title: "Kesiapan Pasokan Partai Besar & Proyek",
    desc: "Stok fisik kabel (Supreme, Eterna, Kabelindo), modul MCB, dan aksesoris panel selalu siap untuk kebutuhan darurat maupun pengadaan terjadwal.",
    highlight: "Stok Fisik Konsisten",
    subtext: "Siap Kirim ke Proyek Semarang & Sekitarnya",
    colSpan: "md:col-span-5",
    mark: "◇",
    accentBg: "from-zinc-950 via-zinc-950/80 to-zinc-900/40",
    borderGlow: "group-hover:border-[#E6FF00]/50",
  },
  {
    id: "consultation",
    badge: "Konsultasi Teknis",
    title: "Pendampingan Spesifikasi Gratis",
    desc: "Bebas konsultasi pemilihan kabel, ampere MCB/MCCB, hingga perencanaan titik lampu LED bersama staf teknis berpengalaman kami — tanpa biaya tersembunyi.",
    highlight: "Konsultasi Solutif",
    subtext: "Tanpa Biaya Tersembunyi",
    colSpan: "md:col-span-5",
    mark: "◈",
    accentBg: "from-zinc-950 via-zinc-950/80 to-zinc-900/40",
    borderGlow: "group-hover:border-emerald-500/50",
  },
  {
    id: "store-experience",
    badge: "Suasana Toko",
    title: "Toko Asri dengan Sambutan Hangat",
    desc: "Nikmati belanja yang sejuk dan ramah di ruko kami yang berhiaskan tanaman hijau asri, ditemani 3 anjing kesayangan toko: Michi, Pyu, dan Miko.",
    highlight: "Michi · Pyu · Miko",
    subtext: "Fasad Ruko Teduh & Bersahabat",
    colSpan: "md:col-span-7",
    mark: "◇",
    accentBg: "from-emerald-950/30 via-zinc-950/70 to-zinc-950",
    borderGlow: "group-hover:border-emerald-400/50",
    hasAvatars: true,
  },
];

export default function WhyAditya() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="keunggulan"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#050505] border-b border-white/[0.07] relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#E6FF00]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space text-white"
            >
              Mengapa Memilih
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
              Aditya Electric Jaya?
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed mt-5 max-w-[520px]"
          >
            Empat alasan yang menjadikan kami mitra pengadaan material elektrikal terpercaya di Semarang.
          </motion.p>
        </div>

        {/* ── ASYMMETRIC BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          {BENTO_PILLARS.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + idx * 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
              className={`group ${p.colSpan} relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br ${p.accentBg} border border-white/[0.08] ${p.borderGlow} transition-all duration-500 flex flex-col justify-between overflow-hidden`}
            >
              {/* Top Row: Badge + Mark */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                    {p.badge}
                  </span>
                  <span className="font-mono text-lg text-zinc-600 group-hover:text-[#E6FF00] transition-colors duration-300" aria-hidden="true">
                    {p.mark}
                  </span>
                </div>

                <h3 className="font-space font-bold text-white text-xl sm:text-2xl lg:text-3xl tracking-tight leading-snug mb-3 group-hover:text-[#E6FF00] transition-colors duration-300">
                  {p.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-[540px]">
                  {p.desc}
                </p>
              </div>

              {/* Bottom Row: Key Metric + Mascot Avatars if applicable */}
              <div className="pt-8 mt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-space font-bold text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors">
                    {p.highlight}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase mt-0.5">
                    {p.subtext}
                  </div>
                </div>

                {p.hasAvatars && (
                  <div className="flex items-center gap-2">
                    {[
                      { name: "Michi", img: "/dog-michi-8bit.webp" },
                      { name: "Pyu", img: "/dog-pyu-8bit.webp" },
                      { name: "Miko", img: "/dog-miko-8bit.webp" },
                    ].map((dog) => (
                      <div
                        key={dog.name}
                        className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-500/50 bg-black shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:scale-110 transition-transform"
                        title={`Maskot Toko: ${dog.name}`}
                      >
                        <Image
                          src={dog.img}
                          alt={dog.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom brand mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 pt-6 border-t border-white/[0.06] flex items-center justify-between"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
            Aditya Electric Jaya · Pedurungan, Semarang · Est. 2017
          </span>
          <span className="font-space font-bold text-zinc-800 text-lg tracking-tight">
            AEJ
          </span>
        </motion.div>
      </div>
    </section>
  );
}
