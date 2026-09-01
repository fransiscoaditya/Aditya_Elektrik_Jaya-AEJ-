import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const DoggoEasterEgg = dynamic(() => import("@/components/DoggoEasterEgg"), {
  ssr: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://aditya-elektrik-jaya.vercel.app");

export const metadata: Metadata = {
  title: "Aditya Elektrik Jaya | Toko Elektrikal & Lampu Terlengkap Semarang",
  description:
    "Aditya Elektrik Jaya merupakan distributor dan toko elektrikal terpercaya di Semarang sejak 2017. Menyediakan kabel, lampu, komponen panel, saklar, dan solusi pencahayaan untuk proyek B2B, kontraktor, dan rumah tangga.",
  keywords: [
    "toko elektrik semarang",
    "distributor kabel semarang",
    "lampu led semarang",
    "komponen panel listrik",
    "saklar semarang",
    "kontraktor listrik semarang",
    "aditya elektrik jaya",
    "toko listrik tlogosari",
    "instalasi listrik",
    "pencahayaan industrial",
  ],
  authors: [{ name: "Aditya Elektrik Jaya" }],
  creator: "Aditya Elektrik Jaya",
  publisher: "Aditya Elektrik Jaya",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Aditya Elektrik Jaya",
    title: "Aditya Elektrik Jaya | Solusi Elektrikal Terlengkap Semarang",
    description:
      "Distributor dan toko elektrikal terpercaya di Semarang sejak 2017. Kabel, lampu, komponen panel, saklar untuk proyek B2B dan hunian.",
    images: [
      {
        url: "/tempat-asri.webp",
        width: 1200,
        height: 630,
        alt: "Aditya Elektrik Jaya - Toko Elektrikal Semarang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Elektrik Jaya | Solusi Elektrikal Semarang",
    description:
      "Distributor dan toko elektrikal terpercaya di Semarang sejak 2017. Berpengalaman, 50+ merek resmi terdaftar.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HardwareStore"],
      "@id": `${SITE_URL}/#business`,
      name: "Aditya Elektrik Jaya",
      alternateName: "AEJ",
      url: SITE_URL,
      description:
        "Distributor dan toko elektrikal terpercaya di Semarang, Indonesia. Menyediakan kabel, lampu LED, komponen panel listrik, saklar, dan solusi pencahayaan untuk proyek B2B, kontraktor, dan kebutuhan rumah tangga.",
      foundingDate: "2017",
      telephone: "+6281391585582",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Parang Kusumo I No.19",
        addressLocality: "Semarang",
        addressRegion: "Jawa Tengah",
        postalCode: "50196",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.9932,
        longitude: 110.4203,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+6281391585582",
        availableLanguage: ["Indonesian"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Produk Elektrikal",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Kabel & Instalasi Listrik" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Lampu & Pencahayaan LED" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Komponen Panel Listrik" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: "Saklar & Perangkat Instalasi" },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://adityaelektrikjaya.com/#website",
      url: "https://adityaelektrikjaya.com",
      name: "Aditya Elektrik Jaya",
      publisher: { "@id": "https://adityaelektrikjaya.com/#business" },
      inLanguage: "id-ID",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body
        className="antialiased"
        style={{ background: "#050505", color: "#F2F2F2" }}
      >
        {/* JSON-LD via next/script to avoid server/client type-prop hydration mismatch */}
        <Script
          id="json-ld-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <CustomCursor />
        <FilmGrain />
        <DoggoEasterEgg />
        {children}
      </body>
    </html>
  );
}
