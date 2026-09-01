"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Pricing Data (Representatif — Update dengan data monitoring aktual Anda) ──
// Format harga: Rp per satuan (meter/buah/set)

const PRICE_CATEGORIES = [
  {
    id: "kabel",
    number: "01",
    label: "Kabel & Penghantar",
    unit: "per meter",
    accent: "#E6FF00",
    items: [
      { name: "Kabel NYA 1 × 1,5 mm²", brand: "Supreme", price: 2200, stock: true },
      { name: "Kabel NYA 1 × 2,5 mm²", brand: "Supreme", price: 3500, stock: true },
      { name: "Kabel NYM 2 × 1,5 mm²", brand: "Kabelmetal", price: 4800, stock: true },
      { name: "Kabel NYM 3 × 2,5 mm²", brand: "Kabelmetal", price: 7200, stock: true },
      { name: "Kabel NYY 4 × 4 mm²", brand: "Kabelindo", price: 18500, stock: true },
      { name: "Kabel FRC 2 × 1,5 mm² (Fire Resistant)", brand: "Furukawa", price: 12800, stock: false },
    ],
  },
  {
    id: "lampu",
    number: "02",
    label: "Lampu & Pencahayaan",
    unit: "per buah",
    accent: "#00E5FF",
    items: [
      { name: "LED Bulb 9W E27 Cool White", brand: "Philips", price: 28000, stock: true },
      { name: "LED Downlight 9W Recessed", brand: "Philips", price: 68000, stock: true },
      { name: "LED Panel 18W 30×30 cm", brand: "Osram", price: 145000, stock: true },
      { name: "LED Tube TL 18W 120 cm", brand: "Philips", price: 58000, stock: true },
      { name: "LED Flood Light 30W Outdoor", brand: "In-Lite", price: 185000, stock: true },
      { name: "LED High Bay 100W Industrial", brand: "Osram", price: 680000, stock: false },
    ],
  },
  {
    id: "panel",
    number: "03",
    label: "Komponen Panel",
    unit: "per buah",
    accent: "#FF6644",
    items: [
      { name: "MCB 1 Pole 6A 6kA", brand: "Schneider", price: 48000, stock: true },
      { name: "MCB 1 Pole 16A 6kA", brand: "Schneider", price: 58000, stock: true },
      { name: "MCB 2 Pole 20A", brand: "ABB", price: 155000, stock: true },
      { name: "MCCB 3 Pole 100A 18kA", brand: "Schneider", price: 875000, stock: true },
      { name: "Kontaktor Magnetik 9A", brand: "Chint", price: 185000, stock: true },
      { name: "Relay Thermal Overload 6–9A", brand: "ABB", price: 220000, stock: false },
    ],
  },
  {
    id: "saklar",
    number: "04",
    label: "Saklar & Stop Kontak",
    unit: "per buah",
    accent: "#00FF88",
    items: [
      { name: "Saklar Tunggal Seri Classic", brand: "Panasonic", price: 32000, stock: true },
      { name: "Saklar Seri (2 Gang)", brand: "Panasonic", price: 52000, stock: true },
      { name: "Stop Kontak 2P + E Grounding", brand: "Erela", price: 42000, stock: true },
      { name: "Stop Kontak USB-A + USB-C", brand: "Legrand", price: 185000, stock: true },
      { name: "Dimmer Rotary 300W", brand: "Panasonic", price: 145000, stock: true },
      { name: "Saklar Sensor PIR Otomatis", brand: "Virgin", price: 98000, stock: true },
    ],
  },
] as const;

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID");
}

interface CategoryProps {
  cat: (typeof PRICE_CATEGORIES)[number];
  index: number;
}

function PriceCategory({ cat, index }: CategoryProps) {
  const [open, setOpen] = useState(index === 0); // First one open by default

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      style={{ borderBottom: "1px solid rgba(242,242,242,0.07)" }}
    >
      {/* ── Category Header (click to toggle) ── */}
      <button
        data-cursor="hover"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2.5rem 0",
          background: "transparent",
          border: "none",
          cursor: "none",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
          <span
            className="label"
            style={{ color: "rgba(242,242,242,0.2)", fontSize: "0.6rem", flexShrink: 0 }}
          >
            {cat.number}
          </span>
          <div>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(1.3rem, 3vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: open ? cat.accent : "#F2F2F2",
                transition: "color 0.4s ease",
                lineHeight: 1,
              }}
            >
              {cat.label}
            </div>
            <div
              className="label mt-1"
              style={{ color: "rgba(242,242,242,0.2)", fontSize: "0.58rem", letterSpacing: "0.22em" }}
            >
              {cat.items.length} Produk · {cat.unit}
            </div>
          </div>
        </div>

        {/* Toggle Arrow */}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            fontSize: "1.8rem",
            color: open ? cat.accent : "rgba(242,242,242,0.2)",
            fontWeight: 300,
            lineHeight: 1,
            flexShrink: 0,
            transition: "color 0.4s",
          }}
        >
          +
        </motion.span>
      </button>

      {/* ── Expandable Price Table ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "2.5rem" }}>
              {/* Table Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid rgba(242,242,242,0.05)",
                  marginBottom: "0.5rem",
                }}
              >
                {["Produk", "Merek", "Harga"].map((h) => (
                  <span
                    key={h}
                    className="label"
                    style={{
                      color: "rgba(242,242,242,0.2)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.25em",
                      textAlign: h === "Harga" ? "right" : "left",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              {cat.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "1rem 0",
                    borderBottom: "1px solid rgba(242,242,242,0.04)",
                    opacity: item.stock ? 1 : 0.4,
                  }}
                >
                  {/* Product Name */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.85rem",
                        color: "#F2F2F2",
                        fontWeight: 400,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.name}
                    </div>
                    {!item.stock && (
                      <span
                        className="label"
                        style={{
                          color: "rgba(242,242,242,0.25)",
                          fontSize: "0.5rem",
                          letterSpacing: "0.2em",
                          marginTop: "2px",
                          display: "block",
                        }}
                      >
                        Stok Terbatas — Hubungi Kami
                      </span>
                    )}
                  </div>

                  {/* Brand */}
                  <span
                    className="label"
                    style={{
                      color: "rgba(242,242,242,0.3)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.brand}
                  </span>

                  {/* Price */}
                  <div
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: cat.accent,
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatRupiah(item.price)}
                  </div>
                </motion.div>
              ))}

              {/* CTA link to location */}
              <div style={{ paddingTop: "1.25rem" }}>
                <a
                  href="#kontak"
                  data-cursor="hover"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: cat.accent,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    opacity: 0.7,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
                >
                  <span>Cek Stok &amp; Pembelian Langsung di Toko</span>
                  <span style={{ transform: "rotate(-45deg)", display: "inline-block" }}>↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section
      id="harga"
      style={{
        background: "#050505",
        paddingTop: "20vh",
        paddingBottom: "20vh",
        borderTop: "1px solid rgba(242,242,242,0.07)",
      }}
    >
      <div
        className="px-6 md:px-10 lg:px-14"
        style={{ maxWidth: "1400px", margin: "0 auto" }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "6rem",
            borderBottom: "1px solid rgba(242,242,242,0.07)",
            paddingBottom: "3rem",
          }}
        >
          <span
            className="label"
            style={{ color: "rgba(242,242,242,0.25)", fontSize: "0.6rem", letterSpacing: "0.28em" }}
          >
            05 / Referensi Harga
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(2rem, 5vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "#F2F2F2",
              }}
            >
              Harga &amp;{" "}
              <span style={{ color: "#E6FF00" }}>Katalog</span>
              {" "}Produk.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8rem",
                color: "rgba(242,242,242,0.3)",
                maxWidth: "320px",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Harga bersifat estimasi. Untuk penawaran harga proyek, volume besar, atau stok spesifik — hubungi tim kami langsung.
            </p>
          </div>
        </motion.div>

        {/* Categories */}
        <div>
          {PRICE_CATEGORIES.map((cat, i) => (
            <PriceCategory key={cat.id} cat={cat} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(242,242,242,0.05)",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            className="label"
            style={{ color: "rgba(242,242,242,0.18)", fontSize: "0.55rem", letterSpacing: "0.22em" }}
          >
            * Harga sewaktu-waktu dapat berubah tanpa pemberitahuan sebelumnya
          </span>
          <span
            className="label"
            style={{ color: "rgba(242,242,242,0.18)", fontSize: "0.55rem", letterSpacing: "0.22em" }}
          >
            Update terakhir: Agustus 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}
