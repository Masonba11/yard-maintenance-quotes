import { MetadataRoute } from "next";
import { locations } from "@/src/data/locations";
import { services } from "@/src/data/services";
import { getAllBlogPosts } from "@/src/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yardmaintenancequotes.com";
  const now = new Date().toISOString();

  // 1. Homepage → priority 1.0, weekly
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // 2. State Pages (/locations/[state]) → priority 0.9, weekly
  const uniqueStates = Array.from(
    new Set(locations.map((loc) => loc.stateSlug))
  );
  const statePages: MetadataRoute.Sitemap = uniqueStates.map((stateSlug) => ({
    url: `${baseUrl}/locations/${stateSlug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. City Pages (/locations/[state]/[city]) → priority 0.8, weekly
  const cityPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.stateSlug}/${location.citySlug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. City Service Pages (/locations/[state]/[city]/[service]) → priority 0.7, monthly
  // Exclude "yard-maintenance" since location pages are the main yard maintenance pages
  const locationServicePages: MetadataRoute.Sitemap = [];
  locations.forEach((location) => {
    services.forEach((service) => {
      if (service.id !== "yard-maintenance") {
        locationServicePages.push({
          url: `${baseUrl}/locations/${location.stateSlug}/${location.citySlug}/${service.id}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    });
  });

  // 5. Blog Posts → priority 0.6, monthly
  const blogPosts = getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // 6. Other Static Pages → priority 0.5, monthly
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // Service pages (individual service pages at /services/[serviceId])
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Return in priority order: Homepage > State > City > Service > Blog > Static
  return [
    ...homepage,
    ...statePages,
    ...cityPages,
    ...locationServicePages,
    ...blogPages,
    ...staticPages,
    ...servicePages,
  ];
}
