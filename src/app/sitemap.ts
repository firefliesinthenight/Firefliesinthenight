import type { MetadataRoute } from "next";
import { chapters } from "@/lib/memoir";

const baseUrl = "https://firefliesinthenight.com";

const routes = [
  "",
  "/latest",
  "/music",
  "/in-search-of-beauty",
  "/in-search-of-beauty/movement-was-my-oxygen",
  "/sitting-with-buyahka",
  "/sitting-with-buyahka/buyahka-and-abrar",
  ...chapters.map((c) => `/sitting-with-buyahka/buyahka-and-abrar/${c.slug}`),
  "/sitting-with-buyahka/critical-thinking-did-not-weaken-my-faith",
  "/community",
  "/community/i-remember-dar-ul-islah",
  "/recommended",
  "/recommended/three-books-i-read-before-fifteen",
  "/about",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
