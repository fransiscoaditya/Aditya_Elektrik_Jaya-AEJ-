"use client";

import { motion } from "framer-motion";

export default function FooterReveal() {
  return (
    <footer
      id="kontak"
      className="footer-curtain"
      aria-label="Kontak & Lokasi"
    >
      {/* Massive brand name fills the footer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(4rem, 22vw, 26rem)",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            lineHeight: 0.82,
            color: "rgba(242,242,242,0.04)",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          ADITYA
        </span>
      </div>

      {/* Minimalist info grid overlaid on top of the big text */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(2rem, 5vw, 5rem)",
        }}
      >
        {/* Top Row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <span
              className="label"
              style={{ color: "rgba(242,242,242,0.3)", fontSize: "0.6rem", letterSpacing: "0.28em", display: "block", marginBottom: "0.75rem" }}
            >
              04 / Lokasi &amp; Info
            </span>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#F2F2F2",
              }}
            >
              Kunjungi Toko Kami.
            </div>
          </motion.div>
        </div>

        {/* Middle — Location & Hours Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2.5rem",
            borderTop: "1px solid rgba(242,242,242,0.07)",
            borderBottom: "1px solid rgba(242,242,242,0.07)",
            paddingTop: "2.5rem",
            paddingBottom: "2.5rem",
          }}
        >
          {/* Alamat Lengkap */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="label"
              style={{
                color: "rgba(242,242,242,0.25)",
                fontSize: "0.55rem",
                letterSpacing: "0.28em",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Alamat
            </span>
            {[
              "Jl. Parang Kusumo I No.19",
              "Tlogosari Kulon, Kec. Pedurungan",
              "Kota Semarang, Jawa Tengah 50196",
            ].map((line) => (
              <div
                key={line}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.85rem",
                  color: "rgba(242,242,242,0.65)",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                {line}
              </div>
            ))}
          </motion.div>

          {/* Google Maps Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.38, duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="label"
              style={{
                color: "rgba(242,242,242,0.25)",
                fontSize: "0.55rem",
                letterSpacing: "0.28em",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Google Maps
            </span>
            <a
              href="https://maps.app.goo.gl/uygmjLEwpWyRTVnY6"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.85rem",
                color: "#E6FF00",
                fontWeight: 400,
                lineHeight: 1.8,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderBottom: "1px solid #E6FF00",
                paddingBottom: "2px",
                transition: "opacity 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              <span>Petunjuk Arah Google Maps</span>
              <span style={{ transform: "rotate(-45deg)", display: "inline-block", fontSize: "0.75rem" }}>↗</span>
            </a>
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.72rem",
                color: "rgba(242,242,242,0.3)",
                marginTop: "0.4rem",
                fontWeight: 300,
              }}
            >
              Buka aplikasi peta untuk rute jalan
            </div>
          </motion.div>

          {/* Jam Operasional */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.46, duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="label"
              style={{
                color: "rgba(242,242,242,0.25)",
                fontSize: "0.55rem",
                letterSpacing: "0.28em",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Jam Operasional
            </span>
            {[
              "Senin – Sabtu: 10:00 – 21:00 WIB",
              "Minggu: 10:00 – 12:00 & 17:00 – 21:00 WIB",
            ].map((line) => (
              <div
                key={line}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.85rem",
                  color: "rgba(242,242,242,0.65)",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                {line}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Row — Copyright */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            className="label"
            style={{ color: "rgba(242,242,242,0.18)", fontSize: "0.55rem", letterSpacing: "0.22em" }}
          >
            © 2026 Aditya Electric Jaya — Hak Cipta Dilindungi
          </span>
          <span
            className="label"
            style={{ color: "rgba(242,242,242,0.18)", fontSize: "0.55rem", letterSpacing: "0.22em" }}
          >
            Pedurungan · Semarang · Jawa Tengah
          </span>
        </div>
      </div>
    </footer>
  );
}
