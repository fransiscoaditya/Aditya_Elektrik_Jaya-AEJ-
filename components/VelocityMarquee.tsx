"use client";

import { useState } from "react";

export default function VelocityMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="klien"
      className="bg-[#050505] py-20 sm:py-28 md:py-36 overflow-hidden border-t border-b border-white/[0.08] relative"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-emerald-950/20 blur-[130px] pointer-events-none rounded-full" />

      {/* ── SECTION HEADER ── */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 mb-12 sm:mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#10B981]" />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-emerald-400 font-semibold">
                03 / Spesifikasi, Kemitraan &amp; Mutu
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-space">
              Distribusi Presisi.{" "}
              <span
                style={{
                  WebkitTextStroke: "1px rgba(242,242,242,0.3)",
                  color: "transparent",
                }}
              >
                Kualitas Bersertifikasi.
              </span>
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-zinc-400 font-light max-w-[380px] leading-relaxed">
            Menyuplai kabel tembaga murni, perangkat proteksi panel, serta solusi penerangan resmi untuk keandalan instalasi Anda.
          </p>
        </div>
      </div>

      {/* ── KINETIC BRAND & SPECIFICATION STREAM ── */}
      <div
        className="flex flex-col gap-3 sm:gap-4 select-none relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ── LAYER 1: Technical Spec & Copper Wire Wireframe Tape ── */}
        <div className="overflow-hidden w-full py-1">
          <div
            className="flex whitespace-nowrap will-change-transform animate-marquee"
            style={{
              animationDuration: "36s",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {[1, 2].map((k) => (
              <div key={k} className="flex items-center gap-6 shrink-0 pr-6">
                <span className="font-space font-bold uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                  100% TEMBAGA MURNI SNI
                </span>
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-300">
                  NYM · NYY · NYFGBY · N2XY
                </span>
                <span
                  className="font-space font-bold uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                    color: "transparent",
                  }}
                >
                  TEGANGAN 220V – 380V 3-PHASE
                </span>
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#E6FF00]/40 bg-[#E6FF00]/10 text-[#E6FF00]">
                  PROTEKSI SIRKUIT MCB &amp; MCCB
                </span>
                <span className="font-space font-bold uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-zinc-300">
                  DISTRIBUSI RESMI SEMARANG
                </span>
                <span className="text-[#10B981] text-2xl font-mono">⚡</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── LAYER 2: Aesthetic Emerald Botanical & Energy Ribbon ── */}
        <div className="relative py-3 sm:py-4 bg-gradient-to-r from-emerald-950 via-[#063826] to-emerald-950 border-y border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.12)]">
          <div
            className="flex whitespace-nowrap will-change-transform animate-marquee-reverse"
            style={{
              animationDuration: "28s",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {[1, 2].map((k) => (
              <div key={k} className="flex items-center gap-8 shrink-0 pr-8">
                <span className="flex items-center gap-2.5 font-space font-bold uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl text-emerald-300">
                  <span className="text-emerald-400">🌿</span> TOKO LISTRIK ASRI &amp; RAMAH
                </span>
                <span className="w-2 h-2 rounded-full bg-[#E6FF00]" />
                <span className="flex items-center gap-2.5 font-space font-bold uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl text-white">
                  <span className="text-[#E6FF00]">★</span> MITRA PEMASOK PT ERELA (FARMASI)
                </span>
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="flex items-center gap-2.5 font-space font-bold uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl text-emerald-200">
                  <span>🍞</span> PEMASOK KELISTRIKAN VIRGIN BAKERY
                </span>
                <span className="w-2 h-2 rounded-full bg-[#E6FF00]" />
                <span className="flex items-center gap-2.5 font-space font-bold uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl text-[#E6FF00]">
                  <span>🛡️</span> JAMINAN KESELAMATAN &amp; STANDAR RESMI
                </span>
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              </div>
            ))}
          </div>
        </div>

        {/* ── LAYER 3: Industrial Monospace Brand Ticker ── */}
        <div className="overflow-hidden w-full py-1">
          <div
            className="flex whitespace-nowrap will-change-transform animate-marquee"
            style={{
              animationDuration: "32s",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {[1, 2].map((k) => (
              <div key={k} className="flex items-center gap-8 shrink-0 pr-8 font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-400">
                <span className="text-zinc-200 font-semibold">SCHNEIDER ELECTRIC</span>
                <span className="text-emerald-500">·</span>
                <span>SUPREME CABLE</span>
                <span className="text-emerald-500">·</span>
                <span className="text-zinc-200 font-semibold">PHILIPS LIGHTING</span>
                <span className="text-emerald-500">·</span>
                <span>PANASONIC</span>
                <span className="text-emerald-500">·</span>
                <span className="text-zinc-200 font-semibold">IN-LITE LED</span>
                <span className="text-emerald-500">·</span>
                <span>ABB SWITCHGEAR</span>
                <span className="text-emerald-500">·</span>
                <span className="text-zinc-200 font-semibold">ETERNA CABLE</span>
                <span className="text-emerald-500">·</span>
                <span>BROCO ELECTRICAL</span>
                <span className="text-emerald-500">·</span>
                <span className="text-zinc-200 font-semibold">FORT ELECTRIC</span>
                <span className="text-emerald-500">·</span>
                <span>HANNOCHS</span>
                <span className="text-emerald-500">·</span>
                <span className="text-zinc-200 font-semibold">LEGRAND</span>
                <span className="text-[#E6FF00]">■</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ELEVATED METRIC CARDS ── */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 mt-16 sm:mt-24 pt-12 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              id: "01",
              number: "15+",
              unit: "Mitra Tetap",
              title: "Mitra & Langganan B2B",
              desc: "Pabrik Farmasi, Toko Bakery & Instalatur Listrik Loyal",
              color: "text-[#10B981]",
              tag: "B2B Supply",
            },
            {
              id: "02",
              number: "5.000+",
              unit: "Item",
              title: "SKU Produk Siap Pasok",
              desc: "Kabel Tembaga, Panel Kontrol, Saklar & Lampu LED",
              color: "text-white",
              tag: "Ready Stock",
            },
            {
              id: "03",
              number: "50+",
              unit: "Merek",
              title: "Merek Resmi Terdaftar",
              desc: "Pabrikan Resmi Skala Nasional & Global Terpercaya",
              color: "text-[#E6FF00]",
              tag: "Authorized",
            },
            {
              id: "04",
              number: "100%",
              unit: "SNI",
              title: "Standar & Mutu Asli SNI",
              desc: "Jaminan Keamanan Kelistrikan & Sertifikasi Resmi Pabrik",
              color: "text-emerald-400",
              tag: "Certified",
            },
          ].map((stat) => (
            <div
              key={stat.id}
              className="p-6 sm:p-7 bg-zinc-950/80 border border-white/[0.08] hover:border-emerald-500/40 rounded-xs flex flex-col justify-between gap-6 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                  {"//"} {stat.id}
                </span>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-white/[0.04] text-zinc-400 border border-white/[0.08] rounded-xs group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors">
                  {stat.tag}
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`font-space text-4xl sm:text-5xl font-bold tracking-tight ${stat.color} leading-none`}>
                    {stat.number}
                  </span>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                    {stat.unit}
                  </span>
                </div>
                <h3 className="font-space font-bold text-white text-base tracking-tight mb-1.5">
                  {stat.title}
                </h3>
                <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
                  {stat.desc}
                </p>
              </div>

              <div className="w-full h-0.5 bg-white/[0.04] group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-[#E6FF00] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
