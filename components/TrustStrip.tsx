"use client";

import { motion } from "framer-motion";

const TRUST_ITEMS = [
  {
    label: "Toko Fisik Semarang",
    detail: "Jl. Parang Kusumo I No.19 · Pedurungan",
    mark: "◈",
  },
  {
    label: "Buka Sen–Sab",
    detail: "08:00 – 17:00 WIB",
    mark: "◇",
  },
  {
    label: "Merek Terpercaya",
    detail: "Schneider · Supreme · Panasonic · Broco",
    mark: "◈",
  },
  {
    label: "Layanan B2B & Proyek",
    detail: "Kontraktor · Industri · Pengadaan",
    mark: "◇",
  },
];

export default function TrustStrip() {
  return (
    <div
      aria-label="Keunggulan utama Aditya Electric Jaya"
      className="bg-[#050505] border-b border-white/[0.08]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07]">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex items-start gap-3 px-4 sm:px-6 py-5 md:py-6 border-b md:border-b-0 border-white/[0.07] group"
            >
              <span
                className="font-mono text-base text-zinc-600 mt-0.5 flex-shrink-0 group-hover:text-[#E6FF00] transition-colors duration-300"
                aria-hidden="true"
              >
                {item.mark}
              </span>
              <div className="min-w-0">
                <div className="font-sans text-xs text-white font-medium leading-tight mb-0.5">
                  {item.label}
                </div>
                <div className="font-mono text-[10px] text-zinc-500 tracking-[0.1em] uppercase leading-relaxed truncate">
                  {item.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
