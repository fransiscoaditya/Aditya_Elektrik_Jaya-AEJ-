import { SmoothScrollProvider } from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import CategoryIndex from "@/components/CategoryIndex";
import ProductCatalog from "@/components/ProductCatalog";
import BrandPartners from "@/components/BrandPartners";
import WhyAditya from "@/components/WhyAditya";
import StoreLocation from "@/components/StoreLocation";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#E6FF00] focus:text-black focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:outline-none"
      >
        Lewati ke konten utama
      </a>

      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content" className="relative z-10 bg-[#050505] text-[#F2F2F2]">

        {/* 01. Hero — Commercial value proposition */}
        <Hero />

        {/* 02. Trust Strip — Physical store, hours, brands, B2B */}
        <TrustStrip />

        {/* 03. Product Categories — Visual tile grid */}
        <CategoryIndex />

        {/* 04. Product Catalog — Search + filter + empty state + mobile accordion */}
        <ProductCatalog />

        {/* 05. Brand Partners */}
        <BrandPartners />

        {/* 06. Why Aditya Electric Jaya — Service pillars */}
        <WhyAditya />

        {/* 07. Physical Store — Location + hours + map */}
        <StoreLocation />

        {/* 08. FAQ */}
        <FAQ />

        {/* 09. Final WhatsApp CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Bottom Bar: Search + WhatsApp (mobile only, appears after scroll) */}
      <MobileBottomBar />
    </SmoothScrollProvider>
  );
}
