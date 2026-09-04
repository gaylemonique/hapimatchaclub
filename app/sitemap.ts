import type { MetadataRoute } from "next";

const routes = ["/", "/menu", "/about", "/order"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "/menu" ? "daily" : "monthly",
    priority: route === "/" ? 1 : route === "/menu" ? 0.9 : 0.6,
  }));
}
