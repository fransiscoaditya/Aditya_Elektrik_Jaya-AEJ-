"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { trackWhatsApp } from "@/lib/analytics";
import { useLenis } from "@/components/SmoothScroll";

const WA_URL =
  "https://wa.me/6281391585582?text=Halo%20Aditya%20Electric%20Jaya,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20material%20listrik.";

export default function MobileBottomBar() {
  const { scrollTo } = useLenis();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  // Show after scrolling past the hero (~100vh)
  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      setVisible(y > 280);
    });
    return unsub;
  }, [scrollY]);

  const handleSearch = () => {
    scrollTo("#katalog", { offset: -80 });
    // Small delay so catalog is in view, then focus the search input
    setTimeout(() => {
      const searchInput = document.getElementById("catalog-search-input");
      if (searchInput) (searchInput as HTMLInputElement).focus();
    }, 600);
  };

  return (
    /* Only render on mobile — hidden on md+ */
    <div className="md:hidden" aria-hidden={!visible}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[90] bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/[0.09]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-stretch h-[52px]">
              {/* Search / Cari Produk */}
              <button
                type="button"
                onClick={handleSearch}
                aria-label="Cari produk di katalog"
                className="flex-1 flex items-center justify-center gap-2.5 border-r border-white/[0.09] text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors active:bg-white/[0.06]"
              >
                <svg
                  aria-hidden="true"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  className="opacity-60"
                >
                  <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                  Cari Produk
                </span>
              </button>

              {/* WhatsApp CTA */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi kami via WhatsApp"
                onClick={() => trackWhatsApp("header_mobile")}
                className="flex-1 flex items-center justify-center gap-2.5 bg-[#E6FF00] hover:bg-white text-black font-mono font-bold text-[11px] uppercase tracking-[0.18em] transition-colors active:scale-[0.98]"
              >
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
