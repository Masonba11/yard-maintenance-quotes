import React from "react";

type Props = {
  stateSlug: string;
  stateName: string;
  stateAbbr: string;
  citySlug: string;
  cityName: string;
  services: string[];
  lat: number;
  lon: number;
  pageUrl: string;
};

const LocationSchema: React.FC<Props> = ({
  stateSlug,
  stateName,
  stateAbbr,
  citySlug,
  cityName,
  services,
  lat,
  lon,
  pageUrl,
}) => {
  // Place Schema
  const placeJson = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${pageUrl}#place`,
    name: `Yard Maintenance Quotes – ${cityName}, ${stateName}`,
    description: `Get free yard maintenance quotes in ${cityName}, ${stateName}. Connect with pre-screened local professionals for lawn care, yard cleanup, and landscaping services.`,
    url: pageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: stateAbbr,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lon,
    },
  };

  // Service Schema
  const serviceJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Yard Maintenance in ${cityName}, ${stateName}`,
    serviceType: services.join(", "),
    provider: {
      "@type": "Organization",
      name: "Yard Maintenance Quotes",
      url: "https://yardmaintenancequotes.com",
    },
    areaServed: {
      "@type": "Place",
      name: `${cityName}, ${stateName}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: lat,
        longitude: lon,
      },
    },
    url: pageUrl,
  };

  // BreadcrumbList Schema
  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yardmaintenancequotes.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: stateName,
        item: `https://yardmaintenancequotes.com/locations/${stateSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityName,
        item: pageUrl,
      },
    ],
  };

  const jsonLdObjects = [placeJson, serviceJson, breadcrumbJson];

  return (
    <>
      {jsonLdObjects.map((obj, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
};

export default LocationSchema;
