"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const HIGHLIGHTS = [
  {
    num: "01",
    stat: "15+",
    unit: "Mitra B2B",
    title: "Langganan Industri & Bisnis",
    desc: "Menjadi mitra terpercaya pemasok material kelistrikan untuk industri farmasi, fasilitas toko roti, dan instalatur listrik di Semarang.",
  },
  {
    num: "02",
    stat: "5K+",
    unit: "SKU",
    title: "Kesiapan Pasokan Lengkap",
    desc: "Stok fisik ribuan item mencakup kabel, lampu, panel, serta aksesoris siap memenuhi kebutuhan proyek Anda.",
  },
  {
    num: "03",
    stat: "100%",
    unit: "SNI",
    title: "Standar & Mutu Asli SNI",
    desc: "Seluruh produk terjamin kualitas dan keasliannya sesuai standar resmi SNI untuk keamanan kelistrikan jangka panjang.",
  },
];

function AnimatedParagraph({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.76, 0, 0.24, 1] }}
      className="font-sans text-sm md:text-base text-zinc-300 font-light leading-relaxed"
    >
      {text}
    </motion.p>
  );
}

export default function IntroNarrative() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 md:py-36 lg:py-44 bg-[#050505] border-b border-white/[0.07]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* ── TOP SECTION TAG ── */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-4 mb-14 md:mb-20"
        >
          <span className="w-8 h-px bg-[#10B981]" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-emerald-400">
            01 / Identitas, Suasana &amp; Kapabilitas
          </span>
        </motion.div>

        {/* ── LARGE EDITORIAL STATEMENT ── */}
        <div className="mb-20 md:mb-28">
          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="text-[6vw] sm:text-[5vw] md:text-[4.2vw] lg:text-[3.6vw] font-bold tracking-tight text-white font-space leading-[1.1] max-w-[900px]"
            >
              Mitra Pengadaan Elektrikal
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="text-[6vw] sm:text-[5vw] md:text-[4.2vw] lg:text-[3.6vw] font-bold tracking-tight font-space leading-[1.1] max-w-[900px]"
              style={{
                WebkitTextStroke: "1px rgba(242,242,242,0.25)",
                color: "transparent",
              }}
            >
              Tepercaya di Semarang.
            </motion.h2>
          </div>
        </div>

        {/* ── 12-COLUMN BODY ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pt-10 border-t border-white/[0.07]">
          {/* Left: Long-form body copy with friendly & botanical identity (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <AnimatedParagraph
              text="Berlokasi di Semarang, Aditya Electric Jaya menghadirkan pasokan material elektrikal berkualitas lengkap dengan pelayanan yang hangat, ramah, dan bersahabat."
              delay={0.15}
            />

            {/* Friendly Green & Pets Mascot Highlight Box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="p-5 bg-emerald-950/20 border border-emerald-500/20 rounded-sm"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                  Suasana Asri &amp; Ramah
                </span>
              </div>
              <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light">
                Toko kami mudah dikenali dengan deretan tanaman hijau asri di depan ruko. Suasana belanja yang sejuk dan ramah, ditambah 3 anjing kesayangan maskot toko kami: Michi si putih, Pyu si coklat, dan Miko si hitam yang bersahabat dan selalu dinantikan oleh para pelanggan setia.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border-l-2 border-[#E6FF00] pl-4"
            >
              <p className="font-mono text-[11px] text-zinc-400 leading-relaxed tracking-[0.04em]">
                Komitmen kami: ketersediaan stok fisik konsisten, ketepatan spesifikasi teknis, serta konsultasi kebutuhan listrik yang jujur dan solutif.
              </p>
            </motion.div>
          </div>

          {/* Right: 3-pillar data metrics (7 cols) */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-l border-white/[0.07]">
              {HIGHLIGHTS.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.2 + idx * 0.12, ease: [0.76, 0, 0.24, 1] }}
                  className="group p-6 md:p-8 border-r border-b border-white/[0.07] last:border-r-0 flex flex-col justify-between min-h-[200px] hover:bg-white/[0.02] transition-colors duration-300 cursor-default"
                >
                  <div>
                    {/* Big stat */}
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="font-space font-bold text-[2.5rem] md:text-[3rem] leading-none text-[#E6FF00] tabular-nums group-hover:text-[#10B981] transition-colors duration-300">
                        {item.stat}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.16em]">
                        {item.unit}
                      </span>
                    </div>
                    <h3 className="font-space font-bold text-white text-sm md:text-base mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                    No. {item.num}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
