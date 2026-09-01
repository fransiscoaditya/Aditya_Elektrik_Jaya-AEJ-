"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StoreLocation() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      "Aditya Electric Jaya, Jl. Parang Kusumo I No.19, Tlogosari Kulon, Kec. Pedurungan, Kota Semarang, Jawa Tengah 50196"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="lokasi" className="py-20 md:py-32 lg:py-36 bg-[#050505] border-b border-white/[0.07] relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Tag */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#10B981]" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.24em] text-emerald-400">
              06 / Lokasi, Suasana &amp; Jam Operasional
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-space">
            Kunjungi Toko Fisik Kami.
          </h2>
        </div>

        {/* ── Friendly Store Ambiance Banner ── */}
        <div className="mb-12 border border-white/[0.08] bg-zinc-950 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center group hover:border-emerald-500/30 transition-all duration-500 shadow-2xl">
          <div className="lg:col-span-6 relative h-[300px] sm:h-[380px] lg:h-[420px] w-full overflow-hidden">
            <Image
              src="/tempat-asri.webp"
              alt="Foto Toko Fisik Asli Aditya Electric Jaya di Jl Parang Kusumo Semarang dengan tanaman hijau asri di depan ruko"
              fill
              quality={75}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md border border-emerald-500/40 px-3.5 py-1.5 rounded-sm">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-emerald-400 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Foto Fisik Toko · Asri &amp; Ramah
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                Toko Listrik Asri Bernuansa Hangat
              </span>
            </div>
            <h3 className="font-space font-bold text-white text-xl sm:text-2xl lg:text-3xl tracking-tight">
              Mudah Dikenali dengan Tanaman Hijau di Depan Ruko
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Saat tiba di ruko kami, Anda akan disambut deretan tanaman hijau yang asri dan sejuk. Toko kami juga ditemani 3 anjing kesayangan maskot toko kami yaitu Michi si putih, Pyu si coklat, dan Miko si hitam yang ramah dan bersahabat, siap menyambut kedatangan Anda dengan hangat.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>{copied ? "✓ Alamat Tersalin!" : "Salin Alamat"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 12-Column Layout (Desktop 5 cols info / 7 cols map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 border-t border-white/[0.07]">
          {/* Left Column: 5 Cols Info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-8">
              {/* Address Block */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                  Alamat Lengkap Toko
                </span>
                <p className="font-sans text-base text-white font-medium leading-snug">
                  Aditya Electric Jaya
                </p>
                <p className="font-sans text-sm text-zinc-300 font-light leading-relaxed mt-1">
                  Jl. Parang Kusumo I No.19, Tlogosari Kulon, Kec. Pedurungan, Kota Semarang, Jawa Tengah 50196
                </p>
              </div>

              {/* Operating Hours Block */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                  Jam Buka Operasional
                </span>
                <div className="space-y-2 font-mono text-xs text-zinc-300">
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Senin s/d Sabtu</span>
                    <span className="text-emerald-400 font-medium">08:00 s/d 17:00 WIB</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-zinc-400">Minggu</span>
                    <span className="text-zinc-500 font-medium">Tutup (Janji Temu / Urgent)</span>
                  </div>
                </div>
              </div>

              {/* Direct Note */}
              <div className="p-4 bg-zinc-950/80 border border-emerald-500/20 text-xs font-sans text-zinc-300 font-light leading-relaxed rounded-sm">
                Melayani pembelian langsung eceran maupun partai besar untuk kebutuhan proyek dan industri. Tersedia area parkir yang nyaman untuk kendaraan operasional Anda.
              </div>
            </div>

            {/* Direct Google Maps CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.app.goo.gl/uygmjLEwpWyRTVnY6"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-[#10B981] hover:bg-[#059669] text-black font-mono text-xs uppercase tracking-[0.18em] px-6 py-4 font-bold transition-all duration-200 rounded-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
              >
                <span>Petunjuk Arah Google Maps</span>
                <span className="text-sm">↗</span>
              </a>

              <a
                href="https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20sedang%20dalam%20perjalanan%20ke%20toko%20dan%20ingin%20tanya%20stok"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#E6FF00] hover:text-[#E6FF00] text-zinc-300 font-mono text-xs uppercase tracking-[0.18em] px-5 py-4 transition-all rounded-sm"
              >
                <span>Tanya Stok</span>
                <span className="text-xs">💬</span>
              </a>
            </div>
          </div>

          {/* Right Column: 7 Cols Map Embed */}
          <div className="lg:col-span-7 h-[380px] sm:h-[450px] lg:h-[500px] relative bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <iframe
              title="Lokasi Aditya Electric Jaya di Google Maps"
              src="https://maps.google.com/maps?q=Aditya%20Electric%20Jaya%2C%20Jl.%20Parang%20Kusumo%20I%20No.19%2C%20Tlogosari%20Kulon%2C%20Semarang&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(95%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Map Floating Badge */}
            <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded pointer-events-none">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#10B981] block font-bold">
                Google Maps Live View
              </span>
              <span className="font-sans text-xs text-white font-medium">
                Aditya Electric Jaya · Pedurungan, Semarang
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
