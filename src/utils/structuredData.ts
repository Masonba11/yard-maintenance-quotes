// GEO Coordinates Database
export const GEO: Record<
  string,
  Record<string, { lat: number; lon: number }>
> = {
  arizona: {
    tucson: { lat: 32.2226, lon: -110.9747 },
    marana: { lat: 32.4367, lon: -111.2223 },
    "oro-valley": { lat: 32.3909, lon: -110.9665 },
    sahuarita: { lat: 31.9576, lon: -110.9557 },
    vail: { lat: 32.0481, lon: -110.7126 },
    "catalina-foothills": { lat: 32.297, lon: -110.9187 },
  },
  oklahoma: {
    "oklahoma-city": { lat: 35.4676, lon: -97.5164 },
    edmond: { lat: 35.6528, lon: -97.4781 },
    norman: { lat: 35.2226, lon: -97.4395 },
    moore: { lat: 35.3395, lon: -97.4867 },
    "midwest-city": { lat: 35.4495, lon: -97.3967 },
    yukon: { lat: 35.5067, lon: -97.7625 },
    tulsa: { lat: 36.154, lon: -95.9928 },
    "broken-arrow": { lat: 36.0609, lon: -95.7975 },
    owasso: { lat: 36.2695, lon: -95.8547 },
    bixby: { lat: 35.942, lon: -95.8833 },
    jenks: { lat: 36.0229, lon: -95.9683 },
    "sand-springs": { lat: 36.1398, lon: -96.1089 },
  },
  florida: {
    jacksonville: { lat: 30.3322, lon: -81.6557 },
    "orange-park": { lat: 30.166, lon: -81.7068 },
    "fleming-island": { lat: 30.0931, lon: -81.7187 },
    middleburg: { lat: 30.0683, lon: -81.8604 },
    "st-augustine": { lat: 29.9012, lon: -81.3124 },
    "ponte-vedra": { lat: 30.2397, lon: -81.3853 },
  },
  tennessee: {
    knoxville: { lat: 35.9606, lon: -83.9207 },
    maryville: { lat: 35.7565, lon: -83.9705 },
    farragut: { lat: 35.8845, lon: -84.1535 },
    "oak-ridge": { lat: 36.0104, lon: -84.2696 },
    powell: { lat: 36.0312, lon: -84.0263 },
    "lenoir-city": { lat: 35.7979, lon: -84.256 },
  },
  "south-carolina": {
    greenville: { lat: 34.8526, lon: -82.394 },
    greer: { lat: 34.9387, lon: -82.2271 },
    simpsonville: { lat: 34.7371, lon: -82.2543 },
    taylors: { lat: 34.9207, lon: -82.2965 },
    mauldin: { lat: 34.7787, lon: -82.3101 },
    easley: { lat: 34.8298, lon: -82.6015 },
  },
  arkansas: {
    fayetteville: { lat: 36.0822, lon: -94.1719 },
    bentonville: { lat: 36.3729, lon: -94.2088 },
    rogers: { lat: 36.332, lon: -94.1185 },
    springdale: { lat: 36.1867, lon: -94.1288 },
    centerton: { lat: 36.3595, lon: -94.2852 },
    "bella-vista": { lat: 36.4815, lon: -94.273 },
  },
  idaho: {
    boise: { lat: 43.615, lon: -116.2023 },
    meridian: { lat: 43.6121, lon: -116.3915 },
    nampa: { lat: 43.5407, lon: -116.5635 },
    caldwell: { lat: 43.6629, lon: -116.6871 },
    eagle: { lat: 43.6959, lon: -116.354 },
    kuna: { lat: 43.4915, lon: -116.4204 },
  },
  texas: {
    "san-antonio": { lat: 29.4241, lon: -98.4936 },
    "new-braunfels": { lat: 29.703, lon: -98.1245 },
    schertz: { lat: 29.5522, lon: -98.2697 },
    cibolo: { lat: 29.5616, lon: -98.2267 },
    converse: { lat: 29.518, lon: -98.3161 },
    selma: { lat: 29.5841, lon: -98.3028 },
  },
  "new-mexico": {
    albuquerque: { lat: 35.0844, lon: -106.6504 },
    "rio-rancho": { lat: 35.2328, lon: -106.663 },
    bernalillo: { lat: 35.306, lon: -106.5514 },
    "los-lunas": { lat: 34.8065, lon: -106.7334 },
    belen: { lat: 34.6623, lon: -106.7769 },
    corrales: { lat: 35.2378, lon: -106.6061 },
  },
};

const BASE_URL = "https://yardmaintenancequote.com";

// Service types available
export const SERVICE_TYPES = [
  "Yard Maintenance",
  "Lawn Mowing & Edging",
  "Yard Cleanup",
  "Bush & Hedge Trimming",
  "Weed Removal",
  "Leaf Removal",
  "Basic Landscaping Maintenance",
];

// WebSite Schema with SearchAction
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Yard Maintenance",
    url: BASE_URL,
    description:
      "Get fast, free yard maintenance quotes from pre-screened local professionals. Connect with trusted lawn care and landscaping experts in your area.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/locations?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Organization Schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Yard Maintenance",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Yard Maintenance connects homeowners with pre-screened local yard maintenance professionals. We provide free, no-obligation quotes for lawn care, yard cleanup, and landscaping services.",
    sameAs: [
      // Add social media URLs if available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: `${BASE_URL}/contact`,
    },
  };
}

// Service Schema
export function getServiceSchema(serviceName: string) {
  const serviceId = serviceName.toLowerCase().replace(/\s+/g, "-");

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: `Professional ${serviceName.toLowerCase()} services. Get free quotes from local professionals.`,
    provider: {
      "@type": "Organization",
      name: "Yard Maintenance",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: serviceName,
    url: `${BASE_URL}/services/${serviceId}`,
  };
}

// LocalBusiness + ServiceArea Schema for city pages
export function getLocationSchema(
  state: string,
  city: string,
  stateSlug: string,
  citySlug: string
) {
  const geo = GEO[stateSlug]?.[citySlug];
  const cityDisplay = city;
  const stateDisplay = state;
  const fullLocation = `${cityDisplay}, ${stateDisplay}`;

  if (!geo) {
    console.warn(`No GEO data found for ${stateSlug}/${citySlug}`);
  }

  const serviceArea: Array<{
    "@type": string;
    name: string;
  }> = SERVICE_TYPES.map((service) => ({
    "@type": "City",
    name: fullLocation,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Yard Maintenance - ${fullLocation}`,
    description: `Get free yard maintenance quotes in ${fullLocation}. Connect with pre-screened local professionals for lawn care, yard cleanup, and landscaping services.`,
    url: `${BASE_URL}/locations/${stateSlug}/${citySlug}`,
    ...(geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.lat,
        longitude: geo.lon,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: cityDisplay,
        addressRegion: stateDisplay,
        addressCountry: "US",
      },
    }),
    areaServed: {
      "@type": "City",
      name: fullLocation,
    },
    serviceType: SERVICE_TYPES,
    hasMap: geo
      ? `https://www.google.com/maps?q=${geo.lat},${geo.lon}`
      : undefined,
    provider: {
      "@type": "Organization",
      name: "Yard Maintenance",
      url: BASE_URL,
    },
  };
}

// City-Service Schema (combines LocalBusiness with specific Service)
export function getCityServiceSchema(
  state: string,
  city: string,
  service: string,
  stateSlug: string,
  citySlug: string,
  serviceSlug: string
) {
  const geo = GEO[stateSlug]?.[citySlug];
  const cityDisplay = city;
  const stateDisplay = state;
  const fullLocation = `${cityDisplay}, ${stateDisplay}`;

  if (!geo) {
    console.warn(`No GEO data found for ${stateSlug}/${citySlug}`);
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${service} in ${fullLocation} | Yard Maintenance`,
    description: `Get free quotes for ${service.toLowerCase()} in ${fullLocation}. Connect with pre-screened local professionals.`,
    url: `${BASE_URL}/locations/${stateSlug}/${citySlug}/${serviceSlug}`,
    ...(geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.lat,
        longitude: geo.lon,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: cityDisplay,
        addressRegion: stateDisplay,
        addressCountry: "US",
      },
    }),
    areaServed: {
      "@type": "City",
      name: fullLocation,
    },
    serviceType: service,
    hasMap: geo
      ? `https://www.google.com/maps?q=${geo.lat},${geo.lon}`
      : undefined,
    provider: {
      "@type": "Organization",
      name: "Yard Maintenance",
      url: BASE_URL,
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        description: `Professional ${service.toLowerCase()} services in ${fullLocation}`,
      },
    },
  };
}

// BreadcrumbList Schema
export interface Breadcrumb {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(breadcrumbs: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// BlogPosting Schema
export interface BlogPostData {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function getBlogSchema(post: BlogPostData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Organization",
      name: post.author || "Yard Maintenance",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Yard Maintenance",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: post.image,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

// Helper function to get GEO coordinates
export function getGeoCoordinates(
  stateSlug: string,
  citySlug: string
): { lat: number; lon: number } | null {
  return GEO[stateSlug]?.[citySlug] || null;
}
