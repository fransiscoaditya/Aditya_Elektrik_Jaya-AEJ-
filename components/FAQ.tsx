"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FAQ_ITEMS = [
  {
    id: "q1",
    q: "Apakah bisa pesan dalam jumlah partai besar atau kebutuhan proyek?",
    a: "Ya. Kami melayani pembelian eceran dan partai besar untuk kontraktor, proyek gedung, pabrik, dan pengadaan B2B. Hubungi kami via WhatsApp untuk penawaran khusus sesuai volume kebutuhan Anda.",
  },
  {
    id: "q2",
    q: "Produk apa saja yang tersedia di toko?",
    a: "Kami menyediakan kabel listrik (NYA, NYM, NYY, NYAF), lampu LED (bulb, downlight, floodlight, TL), komponen panel (MCB, MCCB, box panel, meter), saklar dan stop kontak dari merek Schneider, In-Lite, Hannochs, Panasonic, Broco, Supreme, Eterna, dan lainnya.",
  },
  {
    id: "q3",
    q: "Berapa jam operasional toko?",
    a: "Toko kami buka Senin sampai Sabtu pukul 08:00 hingga 17:00 WIB. Hari Minggu kami tutup, namun dapat melayani kebutuhan mendesak melalui WhatsApp.",
  },
  {
    id: "q4",
    q: "Di mana lokasi toko Aditya Electric Jaya?",
    a: "Kami berlokasi di Jl. Parang Kusumo I No.19, Tlogosari Kulon, Kecamatan Pedurungan, Kota Semarang, Jawa Tengah 50196. Toko kami mudah dikenali dengan tanaman hijau asri di depan ruko.",
  },
  {
    id: "q5",
    q: "Apakah tersedia konsultasi spesifikasi produk secara gratis?",
    a: "Ya. Staf kami siap membantu konsultasi pemilihan kabel, kapasitas MCB, titik lampu, dan spesifikasi komponen listrik sesuai kebutuhan instalasi Anda — tanpa biaya tersembunyi.",
  },
  {
    id: "q6",
    q: "Bagaimana cara menanyakan ketersediaan stok suatu produk?",
    a: "Anda bisa langsung menghubungi kami melalui WhatsApp. Ketik nama produk atau kode item, dan staf kami akan segera mengonfirmasi stok dan harga terbaik.",
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: typeof FAQ_ITEMS[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-white/[0.07]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        className="w-full text-left py-5 px-0 flex items-start justify-between gap-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E6FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        <span className="font-sans text-sm sm:text-base text-zinc-200 font-medium leading-snug group-hover:text-white transition-colors max-w-[85%]">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-white/[0.12] text-zinc-400 group-hover:border-[#E6FF00]/40 group-hover:text-[#E6FF00] transition-colors text-sm mt-0.5"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <motion.div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-5 pr-10">
          <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed">
            {item.a}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("q1");

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 sm:py-24 md:py-32 bg-[#050505] border-b border-white/[0.07]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Header */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="faq-heading"
                className="font-space font-bold text-white text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-4"
              >
                Pertanyaan yang Sering Ditanyakan
              </h2>
              <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed mb-6">
                Belum menemukan jawaban yang Anda cari? Hubungi kami langsung via WhatsApp.
              </p>
              <a
                href="https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20ingin%20bertanya%20mengenai%20produk%20dan%20layanan%20Anda."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#E6FF00] hover:text-white border border-[#E6FF00]/30 hover:border-white/30 px-4 py-2.5 transition-all duration-200"
              >
                <span>Tanya via WhatsApp</span>
                <span>↗</span>
              </a>
            </motion.div>
          </div>

          {/* Right: FAQ Accordion */}
          <div
            className="lg:col-span-8"
            role="list"
            aria-label="Daftar pertanyaan umum"
          >
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
