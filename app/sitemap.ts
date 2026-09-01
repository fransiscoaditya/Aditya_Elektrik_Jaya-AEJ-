import type { MetadataRoute } from "next";

const PRIMARY_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adityaelektrikjaya.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PRIMARY_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${PRIMARY_URL}/#katalog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${PRIMARY_URL}/#lokasi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${PRIMARY_URL}/#faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
