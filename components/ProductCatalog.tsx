"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { CATALOG_DATA, CATALOG_CATEGORIES, CatalogItem } from "./data/catalog";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { trackSearch, trackFilterCategory, trackProductView, trackWhatsApp } from "@/lib/analytics";

/* ─── Category → product image map ─── */
const CAT_IMAGES: Record<string, string> = {
  kabel: "/product-kabel.webp",
  lampu: "/product-lampu.webp",
  panel: "/product-panel.webp",
  saklar: "/product-saklar.webp",
};

/* ─── Cursor-following product preview (Desktop only) ─── */
function CursorPreview({
  category,
  visible,
  mouseX,
  mouseY,
}: {
  category: string | null;
  visible: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const springX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.5 });

  const imgSrc = category ? CAT_IMAGES[category] : null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        position: "fixed",
        top: 0,
        left: 0,
        translateX: "-50%",
        translateY: "-65%",
        pointerEvents: "none",
        zIndex: 200,
      }}
      animate={{
        opacity: visible && imgSrc ? 1 : 0,
        scale: visible && imgSrc ? 1 : 0.88,
      }}
      transition={{ duration: 0.22, ease: [0.76, 0, 0.24, 1] }}
      className="hidden lg:block pointer-events-none"
    >
      <div className="w-[240px] h-[155px] relative overflow-hidden border border-white/20 shadow-2xl bg-zinc-950 rounded-sm">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={`Katalog Elektrikal ${category} Semarang`}
            fill
            sizes="240px"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#E6FF00] inline-block rounded-full" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E6FF00]">
              AEJ INVENTORY
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-300">
            {category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Desktop Editorial Catalog Row ─── */
function CatalogDesktopRow({
  item,
  onHoverEnter,
  onHoverLeave,
  onMouseMove,
}: {
  item: CatalogItem;
  onHoverEnter: (cat: string) => void;
  onHoverLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="border-b border-white/[0.06] transition-colors duration-150 cursor-pointer group"
      style={{ background: hovered ? "rgba(255,255,255,0.025)" : "transparent" }}
      onMouseEnter={() => {
        setHovered(true);
        onHoverEnter(item.category);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onHoverLeave();
      }}
      onMouseMove={onMouseMove}
    >
      {/* Code */}
      <td className="py-5 px-3 font-mono text-[11px] text-zinc-600 group-hover:text-[#E6FF00] transition-colors duration-200">
        /{item.id}
      </td>

      {/* Name & desc */}
      <td className="py-5 px-5">
        <motion.div
          animate={{ x: hovered ? 12 : 0 }}
          transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.28 }}
        >
          <div
            className="font-sans font-medium text-base md:text-lg transition-colors duration-150"
            style={{ color: hovered ? "#E6FF00" : "#F2F2F2" }}
          >
            {item.name}
          </div>
          <div className="font-sans text-xs text-zinc-400 font-light mt-1 max-w-[560px] leading-relaxed">
            {item.desc}
          </div>
        </motion.div>
      </td>

      {/* Brand */}
      <td className="py-5 px-5 font-mono text-xs">
        <span className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.1] text-zinc-300 text-[11px] uppercase tracking-wider group-hover:border-[#E6FF00]/40 group-hover:text-white transition-colors duration-200">
          {item.brand}
        </span>
      </td>

      {/* Spec */}
      <td className="py-5 px-5 font-mono text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200">
        {item.spec}
      </td>

      {/* Action / Arrow (Direct WhatsApp Inquiry) */}
      <td className="py-5 px-3 text-right">
        <a
          href={`https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.name)}%20(${encodeURIComponent(item.brand)}%20-%20${encodeURIComponent(item.spec)}).%20Bisa%20minta%20info%20ketersediaan%20stok%20dan%20harga%20terbaik?`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 group-hover:text-[#E6FF00] transition-colors duration-200 px-3 py-1.5 rounded-sm border border-transparent group-hover:border-[#E6FF00]/30 group-hover:bg-[#E6FF00]/10"
        >
          <span className="hidden sm:inline">Minta Penawaran</span>
          <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm">
            ↗
          </span>
        </a>
      </td>
    </motion.tr>
  );
}

/* ─── Mobile Accordion Dropdown Card (Optimized for Mobile & SEO) ─── */
function CatalogMobileCard({
  item,
  isOpen,
  onToggle,
}: {
  item: CatalogItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const imgSrc = CAT_IMAGES[item.category] || "/product-kabel.webp";

  return (
    <article className="border-b border-white/[0.08] bg-zinc-950/40 overflow-hidden transition-colors">
      {/* Clickable Card Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full py-4 px-4 flex items-center justify-between text-left gap-3 focus:outline-none focus:bg-white/[0.03] active:bg-white/[0.05]"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="font-mono text-[11px] text-zinc-500 shrink-0">
            /{item.id}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-sans text-sm font-semibold text-white truncate tracking-tight">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-white/[0.06] text-emerald-400 border border-emerald-500/30 rounded-sm shrink-0">
                {item.brand}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 truncate">
                {item.spec}
              </span>
            </div>
          </div>
        </div>

        {/* Dropdown Chevron Icon */}
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400">
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-block text-xs"
          >
            ▼
          </motion.span>
        </div>
      </button>

      {/* Expandable Dropdown Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-2 border-t border-white/[0.05] space-y-4">
              {/* Product Thumbnail with SEO alt tags */}
              <div className="relative w-full h-[140px] rounded overflow-hidden border border-white/10 bg-zinc-900">
                <Image
                  src={imgSrc}
                  alt={`Produk Elektrikal ${item.name} ${item.brand} - Toko Aditya Elektrik Semarang`}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover object-center"
                  loading="lazy"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-300">
                  <span className="text-[#E6FF00] font-bold">Kategori: {item.category.toUpperCase()}</span>
                  <span className="text-emerald-400">Standar SNI Resmi</span>
                </div>
              </div>

              {/* Technical Description */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500 block mb-1">
                  Deskripsi &amp; Penggunaan
                </span>
                <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Spec Details Grid */}
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1">
                <div className="p-2.5 bg-white/[0.02] border border-white/[0.06] rounded-sm">
                  <span className="text-zinc-500 block text-[9px] uppercase">Merek Pabrikan</span>
                  <span className="text-white font-medium">{item.brand}</span>
                </div>
                <div className="p-2.5 bg-white/[0.02] border border-white/[0.06] rounded-sm">
                  <span className="text-zinc-500 block text-[9px] uppercase">Spesifikasi</span>
                  <span className="text-emerald-400 font-medium">{item.spec}</span>
                </div>
              </div>

              {/* Mobile CTA Button (Direct WhatsApp) */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.name)}%20(${encodeURIComponent(item.brand)}%20-%20${encodeURIComponent(item.spec)}).%20Bisa%20minta%20info%20ketersediaan%20stok%20dan%20harga%20terbaik?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#E6FF00] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-[0_0_15px_rgba(230,255,0,0.25)] active:scale-95"
                >
                  <span>Minta Penawaran (WhatsApp)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

/* ─── Empty State: No results → WhatsApp lead ─── */
function CatalogEmptyState({
  query,
  onCategoryClick,
}: {
  query: string;
  onCategoryClick: (cat: string) => void;
}) {
  const waMessage = query.trim()
    ? `Halo%20Aditya%20Electric%20Jaya,%20saya%20sedang%20mencari%20produk%20%22${encodeURIComponent(
        query.trim()
      )}%22.%20Apakah%20tersedia%20di%20toko%20Anda?`
    : `Halo%20Aditya%20Electric%20Jaya,%20saya%20ingin%20menanyakan%20ketersediaan%20produk%20yang%20saya%20cari.`;

  const QUICK_CATS = [
    { id: "kabel", label: "Kabel" },
    { id: "lampu", label: "Lampu" },
    { id: "panel", label: "MCB & Panel" },
    { id: "saklar", label: "Saklar" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="py-16 px-4 text-center"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600 mb-3">
        Produk tidak ditemukan
      </p>
      <h3 className="font-space font-bold text-white text-xl sm:text-2xl tracking-tight mb-2">
        {query.trim() ? (
          <>
            Tidak ada hasil untuk{" "}
            <span className="text-[#E6FF00]">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          "Tidak ada produk yang cocok"
        )}
      </h3>
      <p className="font-sans text-sm text-zinc-400 font-light max-w-[400px] mx-auto mb-8 leading-relaxed">
        Kami belum menemukan produk yang sesuai. Coba kategori lain, atau tanyakan langsung ke tim kami.
      </p>

      {/* Quick category shortcuts */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {QUICK_CATS.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryClick(cat.id)}
            className="font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-2 border border-white/[0.12] hover:border-[#E6FF00]/50 text-zinc-400 hover:text-[#E6FF00] transition-all"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Primary fallback: WhatsApp with pre-filled query */}
      <a
        href={`https://wa.me/6281391585582?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsApp("product", query.trim() || undefined)}
        className="inline-flex items-center justify-center gap-2.5 bg-[#E6FF00] hover:bg-white text-black font-mono font-bold text-[11px] uppercase tracking-[0.18em] px-7 py-4 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <span>Tanya Ketersediaan via WhatsApp</span>
        <span>↗</span>
      </a>

      {query.trim() && (
        <p className="font-mono text-[10px] text-zinc-600 mt-4 tracking-[0.1em]">
          Pesan otomatis: &ldquo;saya sedang mencari {query}&rdquo;
        </p>
      )}
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [openMobileId, setOpenMobileId] = useState<string | null>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* Listen for category filter events from CategoryIndex */
  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<string>;
      if (ev.detail) {
        setSelectedCategory(ev.detail);
        trackFilterCategory(ev.detail);
      }
    };
    window.addEventListener("aej-filter-category", handler);
    return () => window.removeEventListener("aej-filter-category", handler);
  }, []);

  const filteredItems = useMemo(
    () =>
      CATALOG_DATA.filter((item) => {
        const matchCat =
          selectedCategory === "all" || item.category === selectedCategory;
        const q = searchQuery.trim().toLowerCase();
        const matchSearch =
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q);
        return matchCat && matchSearch;
      }),
    [selectedCategory, searchQuery]
  );

  /* Debounced search tracking — fires 800ms after user stops typing */
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      if (value.trim().length >= 2) {
        searchTimerRef.current = setTimeout(() => {
          const count = CATALOG_DATA.filter((item) => {
            const q = value.trim().toLowerCase();
            return (
              item.name.toLowerCase().includes(q) ||
              item.brand.toLowerCase().includes(q) ||
              item.desc.toLowerCase().includes(q)
            );
          }).length;
          trackSearch(value.trim(), count);
        }, 800);
      }
    },
    []
  );

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    trackFilterCategory(catId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const toggleMobileItem = (item: CatalogItem) => {
    const isOpening = openMobileId !== item.id;
    setOpenMobileId((prev) => (prev === item.id ? null : item.id));
    if (isOpening) {
      trackProductView(item.id, item.name, item.category);
    }
  };

  return (
    <section
      id="katalog"
      className="py-20 sm:py-24 md:py-36 border-b border-white/[0.07]"
      style={{ background: "#0d0d0d" }}
    >
      {/* Desktop Cursor-following preview */}
      <CursorPreview
        category={hoveredCategory}
        visible={previewVisible}
        mouseX={mouseX}
        mouseY={mouseY}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* ── Section header ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-18">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-7">
              <span className="w-8 h-px bg-[#E6FF00]" />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-emerald-400">
                03 / Direktori Inventaris &amp; Spesifikasi Teknis
              </span>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-space"
              >
                Daftar Inventaris
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space"
                style={{
                  WebkitTextStroke: "1px rgba(242,242,242,0.18)",
                  color: "transparent",
                }}
              >
                Produk Lengkap.
              </motion.h2>
            </div>
          </div>

          <div className="md:col-span-5 flex items-end">
            <p className="font-mono text-xs text-zinc-400 leading-relaxed">
              Katalog spesifikasi material elektrikal resmi terdaftar. Hubungi kami untuk ketersediaan volume partai besar serta penawaran khusus proyek.
            </p>
          </div>
        </div>

        {/* ── Filter toolbar ── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.07] mb-6">
          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATALOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  data-cursor="hover"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`font-mono text-[11px] uppercase tracking-[0.16em] px-3.5 sm:px-4 py-2 border transition-all duration-200 whitespace-nowrap flex items-center gap-2 rounded-sm cursor-pointer ${
                    isActive
                      ? "bg-white text-black border-white font-semibold"
                      : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white bg-white/[0.02]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? "text-zinc-800 font-bold" : "text-zinc-400"}`}>
                    ({cat.id === "all"
                      ? CATALOG_DATA.length
                      : CATALOG_DATA.filter((i) => i.category === cat.id).length})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-[300px]">
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari spesifikasi, merek, nama..."
              aria-label="Cari spesifikasi, merek, atau nama produk inventaris"
              className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-emerald-400 transition-colors rounded-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Hapus kata kunci pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── MOBILE VIEW: Dropdown Accordion List (No Sideways Scroll) ── */}
        <div className="block md:hidden border-t border-white/[0.08]">
          {filteredItems.length === 0 ? (
            <CatalogEmptyState query={searchQuery} onCategoryClick={handleCategoryClick} />
          ) : (
            filteredItems.map((item: CatalogItem) => (
              <CatalogMobileCard
                key={item.id}
                item={item}
                isOpen={openMobileId === item.id}
                onToggle={() => toggleMobileItem(item)}
              />
            ))
          )}
        </div>

        {/* ── DESKTOP VIEW: Sleek Editorial Table ── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <th className="py-5 px-3 w-[80px] border-b border-white/[0.06]">ID</th>
                <th className="py-5 px-5 w-[45%] border-b border-white/[0.06]">Nama Produk &amp; Deskripsi</th>
                <th className="py-5 px-5 w-[18%] border-b border-white/[0.06]">Merek Pabrikan</th>
                <th className="py-5 px-5 w-[25%] border-b border-white/[0.06]">Spesifikasi Teknis</th>
                <th className="py-5 px-3 text-right w-[12%] border-b border-white/[0.06]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="sync">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-2">
                      <CatalogEmptyState query={searchQuery} onCategoryClick={handleCategoryClick} />
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item: CatalogItem) => (
                    <CatalogDesktopRow
                      key={item.id}
                      item={item}
                      onHoverEnter={(cat) => {
                        setHoveredCategory(cat);
                        setPreviewVisible(true);
                      }}
                      onHoverLeave={() => {
                        setPreviewVisible(false);
                        setHoveredCategory(null);
                      }}
                      onMouseMove={handleMouseMove}
                    />
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Bottom callout */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-zinc-400">
            Menampilkan{" "}
            <span className="text-emerald-400 font-semibold">{filteredItems.length}</span>{" "}
            dari total {CATALOG_DATA.length} SKU katalog
          </div>
          <a
            href="#lokasi"
            data-cursor="hover"
            className="group font-mono text-xs uppercase tracking-[0.2em] text-[#E6FF00] hover:text-white transition-colors flex items-center gap-2.5"
          >
            <span>Kunjungi Toko Langsung di Semarang</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
