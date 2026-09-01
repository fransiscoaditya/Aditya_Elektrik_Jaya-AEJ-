"use client";

import { useLenis } from "@/components/SmoothScroll";

export default function Footer() {
  const { scrollTo } = useLenis();

  return (
    <footer className="bg-[#050505] text-white pt-20 pb-12 relative overflow-hidden border-t border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#E6FF00]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* ── MONUMENTAL CLOSING BANNER ── */}
        <div className="pb-16 sm:pb-24 border-b border-white/[0.08]">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E6FF00] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#E6FF00] font-semibold">
              KONSULTASI &amp; PENGADAAN MATERIAL ELEKTRIKAL
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <div className="lg:col-span-8">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-space uppercase leading-[0.92] text-white">
                Siap Menerangi <br />
                <span className="text-zinc-600 hover:text-white transition-colors duration-300">
                  &amp; Menghubungkan
                </span>{" "}
                <br />
                <span className="text-emerald-400">Proyek Anda?</span>
              </h2>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
              <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light leading-relaxed lg:text-right max-w-[360px]">
                Hubungi staf teknis kami untuk konsultasi spesifikasi, pengecekan ketersediaan stok fisik, atau permintaan penawaran harga terbaik.
              </p>

              <a
                href="https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20ingin%20konsultasi%20pengadaan%20material%20kelistrikan%20untuk%20proyek%20saya"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center justify-center gap-3 bg-[#E6FF00] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] px-8 py-4.5 rounded-sm shadow-[0_0_30px_rgba(230,255,0,0.35)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Konsultasi WhatsApp</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Top Row: Brand & Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-white/[0.07]">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-[#E6FF00] font-mono text-xs font-black">
                ⚡
              </div>
              <span className="font-space font-bold text-white text-base sm:text-lg tracking-tight uppercase">
                ADITYA ELECTRIC JAYA
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-400 font-light max-w-[380px] leading-relaxed">
              Distributor resmi komponen elektrikal industri, kabel distribusi tegangan tinggi, komponen panel proteksi, dan solusi pencahayaan LED di Semarang, Jawa Tengah.
            </p>
            <div className="flex items-center gap-3 font-mono text-[10px] text-emerald-400">
              <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/30 rounded-xs">
                ✓ 100% MUTU ASLI SNI
              </span>
              <span className="px-2 py-0.5 bg-white/[0.04] border border-white/10 text-zinc-400 rounded-xs">
                EST. 2017
              </span>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 block mb-3 font-bold">
                Eksplorasi
              </span>
              <ul className="space-y-2.5 font-mono text-xs text-zinc-400">
                <li>
                  <a
                    href="#kategori"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#kategori", { offset: -60 });
                    }}
                    className="hover:text-[#E6FF00] transition-colors"
                  >
                    Lini Kategori
                  </a>
                </li>
                <li>
                  <a
                    href="#katalog"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#katalog", { offset: -60 });
                    }}
                    className="hover:text-[#E6FF00] transition-colors"
                  >
                    Tabel Katalog
                  </a>
                </li>
                <li>
                  <a
                    href="#mitra"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#mitra", { offset: -60 });
                    }}
                    className="hover:text-[#E6FF00] transition-colors"
                  >
                    Mitra B2B &amp; Merek
                  </a>
                </li>
                <li>
                  <a
                    href="#keunggulan"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#keunggulan", { offset: -60 });
                    }}
                    className="hover:text-[#E6FF00] transition-colors"
                  >
                    Standar Layanan
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 block mb-3 font-bold">
                Kontak &amp; Alamat
              </span>
              <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
                Jl. Parang Kusumo I No.19, Tlogosari Kulon, Pedurungan, Kota Semarang 50196
              </p>
              <a
                href="https://maps.app.goo.gl/uygmjLEwpWyRTVnY6"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-[#E6FF00] hover:underline inline-block mt-2 font-medium"
              >
                Buka Google Maps ↗
              </a>
            </div>
          </div>

          {/* Back to Top (3 cols) */}
          <div className="md:col-span-3 flex md:justify-end items-start">
            <button
              onClick={() => scrollTo(0)}
              data-cursor="hover"
              className="font-mono text-xs uppercase tracking-[0.16em] px-5 py-2.5 border border-white/10 hover:border-[#E6FF00] hover:text-[#E6FF00] text-zinc-400 transition-all duration-200 flex items-center gap-2 rounded-sm cursor-pointer"
            >
              <span>Kembali Ke Atas</span>
              <span>↑</span>
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} Aditya Electric Jaya. Hak Cipta Dilindungi.
          </div>
          <div className="tracking-[0.14em] uppercase text-zinc-400">
            Distribusi Material Elektrikal · Semarang, Jawa Tengah
          </div>
        </div>
      </div>
    </footer>
  );
}

