import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { SITE } from "@/lib/site";

const LEGAL_UPDATED = new Date("2026-04-22");

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.reduce((newest, post) => (post.date > newest.date ? post : newest));
  const latestPostDate = new Date(latestPost.date);
  const pages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: latestPostDate, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/legal/privacy`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/terms`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/terms-south-africa`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];
  for (const post of posts) {
    pages.push({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  return pages;
}
