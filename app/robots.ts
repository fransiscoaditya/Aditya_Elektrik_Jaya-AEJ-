import type { MetadataRoute } from "next";

const PRIMARY_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adityaelektrikjaya.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PRIMARY_URL}/sitemap.xml`,
  };
}
