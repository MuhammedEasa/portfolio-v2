import type { MetadataRoute } from "next";
import { leaves } from "@/lib/manuscript";

export default function sitemap(): MetadataRoute.Sitemap {
  return leaves.map((p) => ({
    url: `https://muhammedeasa.com${p.href === "/" ? "" : p.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p.href === "/" ? 1 : 0.7,
  }));
}
