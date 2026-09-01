"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useLenis } from "@/components/SmoothScroll";

const CATEGORIES = [
  {
    id: "01",
    catKey: "kabel",
    name: "Kabel & Penghantar",
    count: "24+ Tipe",
    spec: "NYA · NYM · NYY · NYAF · Tahan Api",
    desc: "Kabel tembaga murni tunggal, serabut fleksibel, kabel tanah lapis baja, dan kabel tahan api berstandar SPLN / LMK resmi.",
    image: "/product-kabel.webp",
  },
  {
    id: "02",
    catKey: "lampu",
    name: "Lampu & Pencahayaan",
    count: "18+ Seri",
    spec: "LED High Bay · Downlight · Floodlight · T8/TL",
    desc: "Pencahayaan LED efisiensi tinggi untuk pergudangan, pabrik manufaktur, fasad arsitektur, ruko, dan hunian modern.",
    image: "/product-lampu.webp",
  },
  {
    id: "03",
    catKey: "panel",
    name: "Komponen Panel",
    count: "31+ Modul",
    spec: "MCB · MCCB · COS · Panel Meter · Box Panel",
    desc: "Perangkat proteksi beban lebih, pemutus arus sirkuit, saklar pemindah daya genset-PLN, dan aksesoris panel listrik.",
    image: "/product-panel.webp",
  },
  {
    id: "04",
    catKey: "saklar",
    name: "Saklar & Instalasi",
    count: "16+ Perangkat",
    spec: "Saklar Modular · Stop Kontak Arde · Pipa Conduit",
    desc: "Perangkat pengkabelan terminal, saklar inbow/outbow, stop kontak arde pengaman, dan aksesoris instalasi kelistrikan.",
    image: "/product-saklar.webp",
  },
];

/* ─── Desktop Category Image Layer (crossfades as user scrolls) ─── */
function CategoryImageLayer({
  i,
  activeSpring,
  image,
  name,
}: {
  i: number;
  activeSpring: MotionValue<number>;
  image: string;
  name: string;
}) {
  const opacity = useTransform(
    activeSpring,
    [i - 0.75, i - 0.2, i + 0.2, i + 0.75],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    activeSpring,
    [i - 0.75, i, i + 0.75],
    [1.06, 1.0, 1.06]
  );

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 will-change-transform">
      <Image
        src={image}
        alt={`Kategori Elektrikal ${name} - Distributor Semarang`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center"
        quality={75}
      />
      {/* Right-edge vignette to blend into right panel */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050505]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
    </motion.div>
  );
}

/* ─── Desktop Large Background Index Number ─── */
function CategoryNumber({
  i,
  num,
  activeSpring,
}: {
  i: number;
  num: string;
  activeSpring: MotionValue<number>;
}) {
  const opacity = useTransform(
    activeSpring,
    [i - 0.5, i - 0.1, i + 0.1, i + 0.5],
    [0, 0.06, 0.06, 0]
  );

  return (
    <motion.div style={{ opacity }} className="absolute bottom-8 left-8 z-10 leading-none select-none">
      <span className="font-space font-bold text-white text-[10rem] md:text-[14rem] leading-none">
        {num}
      </span>
    </motion.div>
  );
}

/* ─── Progress Dot ─── */
function ProgressDot({
  i,
  activeSpring,
}: {
  i: number;
  activeSpring: MotionValue<number>;
}) {
  const width = useTransform(
    activeSpring,
    [i - 0.4, i, i + 0.4],
    [6, 28, 6]
  );
  const opacity = useTransform(
    activeSpring,
    [i - 0.5, i - 0.1, i + 0.1, i + 0.5],
    [0.15, 1, 1, 0.15]
  );

  return (
    <motion.div
      style={{ width, opacity }}
      className="h-[2px] bg-[#E6FF00] rounded-full"
    />
  );
}

/* ─── Desktop Category Row ─── */
function CategoryRow({
  cat,
  i,
  activeSpring,
  onClick,
}: {
  cat: (typeof CATEGORIES)[0];
  i: number;
  activeSpring: MotionValue<number>;
  onClick: () => void;
}) {
  const rowOpacity = useTransform(
    activeSpring,
    [i - 0.65, i - 0.15, i + 0.15, i + 0.65],
    [0.2, 1, 1, 0.2]
  );
  const nameX = useTransform(activeSpring, [i - 0.5, i, i + 0.5], [0, 10, 0]);
  const descOpacity = useTransform(
    activeSpring,
    [i - 0.4, i - 0.05, i + 0.05, i + 0.4],
    [0, 1, 1, 0]
  );
  const arrowX = useTransform(activeSpring, [i - 0.5, i, i + 0.5], [0, 6, 0]);

  return (
    <motion.div
      style={{ opacity: rowOpacity }}
      className="group py-7 border-b border-white/[0.07] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-5">
        <span className="font-mono text-xs text-zinc-600 pt-1.5 shrink-0 group-hover:text-[#E6FF00] transition-colors duration-300">
          {cat.id}
        </span>

        <div className="flex-1 overflow-hidden min-w-0">
          <motion.div style={{ x: nameX }}>
            <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
              <h3 className="font-space font-bold text-white text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight group-hover:text-[#E6FF00] transition-colors duration-300">
                {cat.name}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/10 text-zinc-500 shrink-0">
                {cat.count}
              </span>
            </div>
            <span className="font-mono text-[11px] text-zinc-500 tracking-[0.13em] uppercase block">
              {cat.spec}
            </span>
          </motion.div>

          <motion.p
            style={{ opacity: descOpacity }}
            className="font-sans text-xs text-zinc-400 font-light leading-relaxed mt-3 max-w-[460px]"
          >
            {cat.desc}
          </motion.p>
        </div>

        <motion.span
          style={{ x: arrowX }}
          className="text-zinc-700 text-xl pt-1 shrink-0 group-hover:text-[#E6FF00] transition-colors duration-300"
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ─── Desktop Sticky View Component (Only mounted on desktop >= 1024px) ─── */
function DesktopStickyView({
  handleSelect,
}: {
  handleSelect: (catKey: string) => void;
}) {
  const stickyRef = useRef<HTMLDivElement>(null);

  /* Track scroll progress ONLY through the sticky scroll area (Desktop) */
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  /* Map 0→1 to 0→(N-1) with gentle spring */
  const activeFloat = useTransform(
    scrollYProgress,
    [0, 1],
    [0, CATEGORIES.length - 1]
  );
  const activeSpring = useSpring(activeFloat, {
    stiffness: 55,
    damping: 22,
    mass: 0.8,
  });

  return (
    <div
      ref={stickyRef}
      style={{ height: `${CATEGORIES.length * 100}vh` }}
      className="relative hidden lg:block"
    >
      <div className="sticky top-0 h-screen overflow-hidden border-b border-white/[0.07]">
        <div className="h-full grid grid-cols-2">

          {/* ── LEFT: Crossfading Product Image ── */}
          <div className="relative h-full overflow-hidden flex items-end">
            {CATEGORIES.map((cat, i) => (
              <CategoryImageLayer
                key={cat.id}
                i={i}
                activeSpring={activeSpring}
                image={cat.image}
                name={cat.name}
              />
            ))}

            {/* Big Ghost Index Numbers */}
            {CATEGORIES.map((cat, i) => (
              <CategoryNumber
                key={cat.id}
                i={i}
                num={cat.id}
                activeSpring={activeSpring}
              />
            ))}

            {/* AEJ Badge */}
            <div className="absolute top-8 left-8 z-20 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 pointer-events-none">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#10B981]">
                AEJ · Inventory
              </span>
            </div>
          </div>

          {/* ── RIGHT: Scrollable Category List ── */}
          <div className="flex flex-col justify-center px-10 md:px-14 lg:px-16 bg-[#050505]">
            <div className="max-w-xl w-full mx-auto lg:mx-0">

              {/* Progress Dots */}
              <div className="flex items-center gap-2 mb-10">
                {CATEGORIES.map((_, i) => (
                  <ProgressDot key={i} i={i} activeSpring={activeSpring} />
                ))}
              </div>

              {/* Category Rows */}
              {CATEGORIES.map((cat, i) => (
                <CategoryRow
                  key={cat.id}
                  cat={cat}
                  i={i}
                  activeSpring={activeSpring}
                  onClick={() => handleSelect(cat.catKey)}
                />
              ))}

              <div className="mt-8 pt-5 border-t border-white/[0.06]">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  Gulir untuk melihat · Klik untuk membuka katalog
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function CategoryIndex() {
  const { scrollTo } = useLenis();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSelect = (catKey: string) => {
    scrollTo("#katalog", { offset: -60 });
    window.dispatchEvent(new CustomEvent("aej-filter-category", { detail: catKey }));
  };

  return (
    <section id="kategori" className="bg-[#050505]">
      {/* ── Section Header ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-32 border-b border-white/[0.07]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-7">
              <span className="w-8 h-px bg-[#10B981]" />
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.24em] text-emerald-400 font-semibold">
                02 / Indeks Kategori Material
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-space">
              Inventaris Lengkap. <br />
              <span
                style={{
                  WebkitTextStroke: "1px rgba(242,242,242,0.25)",
                  color: "transparent",
                }}
              >
                Spesifikasi Teruji.
              </span>
            </h2>
          </div>

          <div className="md:max-w-[380px]">
            <p className="font-mono text-xs text-zinc-400 leading-relaxed">
              Empat pilar material elektrikal utama untuk kontraktor, industri, dan hunian di Jawa Tengah.
            </p>
          </div>
        </div>
      </div>

      {/* ── MOBILE VIEW: Visual Rich Category Cards (< lg) ── */}
      <div className="block lg:hidden px-4 py-8 space-y-6">
        {CATEGORIES.map((cat) => (
          <article
            key={cat.id}
            onClick={() => handleSelect(cat.catKey)}
            className="group bg-zinc-950 border border-white/[0.08] rounded-sm overflow-hidden active:scale-[0.99] transition-all cursor-pointer"
          >
            {/* Visual Thumbnail */}
            <div className="relative w-full h-[180px] bg-zinc-900 overflow-hidden">
              <Image
                src={cat.image}
                alt={`Kategori ${cat.name} - Toko Aditya Elektrik Semarang`}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 border border-white/10 text-[9px] font-mono text-emerald-400 uppercase tracking-widest">
                Kategori /{cat.id}
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                <span className="font-space font-bold text-white text-xl tracking-tight">
                  {cat.name}
                </span>
                <span className="font-mono text-[10px] text-[#E6FF00] uppercase tracking-wider px-2 py-0.5 bg-black/60 border border-white/15 rounded-sm">
                  {cat.count}
                </span>
              </div>
            </div>

            {/* Content & Action */}
            <div className="p-4 space-y-3">
              <span className="font-mono text-[11px] text-zinc-400 tracking-wider uppercase block">
                {cat.spec}
              </span>
              <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed">
                {cat.desc}
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] text-xs font-mono text-zinc-400 group-hover:text-emerald-300 transition-colors">
                <span>Buka Spesifikasi Katalog</span>
                <span>→</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── DESKTOP VIEW: Only mounted when isDesktop is true ── */}
      {isDesktop && <DesktopStickyView handleSelect={handleSelect} />}
    </section>
  );
}
