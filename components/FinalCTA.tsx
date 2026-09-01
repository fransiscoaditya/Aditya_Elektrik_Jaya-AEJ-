"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function FinalCTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="py-20 sm:py-28 md:py-36 bg-[#050505] border-b border-white/[0.07] relative overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(230,255,0,0.04), transparent)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-[780px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-5"
          >
            Siap membantu kebutuhan Anda
          </motion.p>

          <motion.h2
            id="final-cta-heading"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-space font-bold text-white tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Ada pertanyaan tentang<br />
            <span className="text-[#E6FF00]">material listrik Anda?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-[520px] mx-auto mb-10"
          >
            Hubungi staf teknis kami untuk konsultasi spesifikasi, pengecekan ketersediaan stok, atau permintaan penawaran harga terbaik.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20material%20listrik."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#E6FF00] hover:bg-white text-black font-mono font-bold text-[11px] uppercase tracking-[0.18em] px-8 py-4 transition-all duration-200 hover:scale-105 active:scale-95 min-h-[52px]"
            >
              <span>Konsultasi via WhatsApp</span>
              <span>↗</span>
            </a>

            <a
              href="https://maps.app.goo.gl/uygmjLEwpWyRTVnY6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-white/20 hover:border-white/50 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-[0.18em] px-8 py-4 transition-all duration-200 min-h-[52px]"
            >
              <span>Kunjungi Toko</span>
              <span>↗</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-mono text-[10px] text-zinc-600 mt-8 tracking-[0.14em] uppercase"
          >
            Jl. Parang Kusumo I No.19 · Pedurungan, Semarang · Sen–Sab 08:00–17:00
          </motion.p>
        </div>
      </div>
    </section>
  );
}
