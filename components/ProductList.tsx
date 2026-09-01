"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion";

// ─── Product Data — sinkron dengan PricingSection ───────────────────────────
const PRODUCTS = [
  {
    id: "01",
    name: "KABEL & PENGHANTAR",
    sub: "Power Transmission",
    description: "NYA · NYM · NYY · NYFGBY · Fire Resistant Cable",
    image: "/product-kabel.webp",
    accent: "#E6FF00",
  },
  {
    id: "02",
    name: "LAMPU & PENCAHAYAAN",
    sub: "Architectural Lighting",
    description: "LED Bulb · High Bay · Downlight · Flood Light · TL",
    image: "/product-lampu.webp",
    accent: "#00E5FF",
  },
  {
    id: "03",
    name: "KOMPONEN PANEL",
    sub: "Switchgear & Protection",
    description: "MCB · MCCB · Kontaktor · Relay · Busbar · Terminal",
    image: "/product-panel.webp",
    accent: "#FF6644",
  },
  {
    id: "04",
    name: "SAKLAR & INSTALASI",
    sub: "Wiring Devices",
    description: "Saklar · Stop Kontak · Grounding · Dimmer · Sensor",
    image: "/product-saklar.webp",
    accent: "#00FF88",
  },
];

// ─── Floating Image Card (follows cursor) ────────────────────────────────────

interface FloatingImageProps {
  image: string;
  accent: string;
  isVisible: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  id: string;
}

function FloatingImage({ image, accent, isVisible, mouseX, mouseY, id }: FloatingImageProps) {
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.8 });

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 200,
        translateX: "-50%",
        translateY: "-60%",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.85,
        rotate: isVisible ? 0 : -4,
      }}
      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
    >
      <div
        style={{
          width: "300px",
          height: "200px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "2px",
        }}
      >
        {/* Real product image */}
        <Image
          src={image}
          alt={id}
          fill
          sizes="300px"
          style={{ objectFit: "cover" }}
          priority={false}
        />

        {/* Dark overlay vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 60%)",
          }}
        />

        {/* Accent corner tag */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "14px",
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.48rem",
            letterSpacing: "0.22em",
            color: accent,
            textTransform: "uppercase",
          }}
        >
          AEJ™ Katalog
        </div>

        {/* Thin accent border on left edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "2px",
            height: "100%",
            background: accent,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Product Row ──────────────────────────────────────────────────────────────

interface ProductItemProps {
  product: (typeof PRODUCTS)[0];
  index: number;
}

function ProductItem({ product, index }: ProductItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <>
      <FloatingImage
        image={product.image}
        accent={product.accent}
        isVisible={isHovered}
        mouseX={mouseX}
        mouseY={mouseY}
        id={product.id}
      />

      <motion.div
        data-cursor="hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="product-item group"
        style={{ borderTop: "1px solid rgba(242,242,242,0.07)" }}
      >
        <div
          className="px-6 md:px-10 lg:px-14"
          style={{
            paddingTop: "2.5rem",
            paddingBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Left: Number + Title */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "2.5rem", flex: 1, overflow: "hidden" }}>
            {/* Index number */}
            <span
              className="label flex-shrink-0"
              style={{ color: "rgba(242,242,242,0.2)", fontSize: "0.65rem" }}
            >
              {product.id}
            </span>

            {/* Main Title */}
            <div>
              <motion.h3
                animate={{
                  skewX: isHovered ? -4 : 0,
                  x: isHovered ? 12 : 0,
                  color: isHovered ? product.accent : "#F2F2F2",
                }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                className="heading-lg product-text"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "clamp(1.8rem, 5.5vw, 7rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  willChange: "transform, color",
                  marginBottom: "0.5rem",
                }}
              >
                {product.name}
              </motion.h3>
              <motion.p
                animate={{ opacity: isHovered ? 0.6 : 0.25 }}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.72rem",
                  color: "#F2F2F2",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                }}
              >
                {product.description}
              </motion.p>
            </div>
          </div>

          {/* Right: Sub-label + Arrow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            <motion.span
              className="label hidden md:block"
              style={{ color: "rgba(242,242,242,0.25)", textAlign: "right", maxWidth: "200px" }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
            >
              {product.sub}
            </motion.span>
            <motion.span
              animate={{
                x: isHovered ? 4 : 0,
                rotate: isHovered ? -45 : 0,
                color: isHovered ? product.accent : "rgba(242,242,242,0.2)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ fontSize: "1.5rem", fontWeight: 300, lineHeight: 1 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductList() {
  return (
    <section
      id="produk"
      style={{
        background: "#050505",
        paddingTop: "20vh",
        paddingBottom: "20vh",
        minHeight: "100vh",
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="px-6 md:px-10 lg:px-14 mb-16 md:mb-24 flex items-end justify-between"
      >
        <div>
          <span
            className="label block mb-3"
            style={{ color: "rgba(242,242,242,0.25)", fontSize: "0.6rem", letterSpacing: "0.28em" }}
          >
            02 / Katalog Utama
          </span>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(242,242,242,0.3)",
              fontWeight: 300,
              maxWidth: "380px",
              lineHeight: 1.6,
            }}
          >
            Arahkan kursor ke kategori untuk preview produk. Klik untuk konsultasi langsung.
          </p>
        </div>
      </motion.div>

      {/* Product List */}
      <div style={{ borderBottom: "1px solid rgba(242,242,242,0.07)" }}>
        {PRODUCTS.map((product, i) => (
          <ProductItem key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
