import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan — Aditya Electric Jaya",
  description:
    "Halaman yang Anda cari tidak tersedia. Temukan produk material listrik, kabel, lampu, dan komponen panel di toko kami.",
  robots: { index: false },
};

const QUICK_CATEGORIES = [
  { label: "Kabel", catKey: "kabel" },
  { label: "Lampu LED", catKey: "lampu" },
  { label: "MCB & Panel", catKey: "panel" },
  { label: "Saklar & Instalasi", catKey: "saklar" },
];

const WA_URL =
  "https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20tidak%20menemukan%20produk%20yang%20saya%20cari%20di%20website.%20Bisa%20dibantu?";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F2F2F2] flex flex-col items-center justify-center px-5 py-20">
      {/* Ghost number */}
      <div
        aria-hidden="true"
        className="font-space font-black text-[clamp(6rem,20vw,16rem)] leading-none text-white/[0.04] select-none mb-[-2rem] tracking-tight"
      >
        404
      </div>

      {/* Main message */}
      <div className="relative z-10 text-center max-w-[560px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 mb-5">
          Halaman tidak ditemukan
        </p>
        <h1 className="font-space font-bold text-white text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug mb-4">
          Produk atau halaman yang<br />
          Anda cari tidak tersedia.
        </h1>
        <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed mb-10">
          Mungkin URL salah ketik, atau halaman telah dipindahkan. Coba cari langsung dari katalog atau tanyakan via WhatsApp.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/#katalog"
            className="inline-flex items-center justify-center gap-2.5 bg-[#E6FF00] hover:bg-white text-black font-mono font-bold text-[11px] uppercase tracking-[0.18em] px-7 py-4 transition-colors"
          >
            <span>Lihat Katalog Produk</span>
            <span>→</span>
          </Link>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 border border-white/20 hover:border-[#E6FF00] hover:text-[#E6FF00] text-zinc-300 font-mono text-[11px] uppercase tracking-[0.18em] px-7 py-4 transition-all"
          >
            <span>Tanya via WhatsApp</span>
            <span>↗</span>
          </a>
        </div>

        {/* Quick category links */}
        <div className="border-t border-white/[0.07] pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 mb-4">
            Kategori Populer
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.catKey}
                href={`/#katalog`}
                className="font-mono text-[11px] uppercase tracking-[0.14em] px-3.5 py-2 border border-white/[0.1] hover:border-[#E6FF00]/40 text-zinc-400 hover:text-[#E6FF00] transition-all"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Back home */}
        <div className="mt-10">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
