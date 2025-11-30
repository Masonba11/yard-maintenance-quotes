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
  // If cityName === stateName, this is a state-level page, so just use stateName
  const isStateLevel = cityName === stateName;
  const placeName = isStateLevel
    ? `Yard Maintenance Quotes – ${stateName}`
    : `Yard Maintenance Quotes – ${cityName}, ${stateName}`;
  const placeDescription = isStateLevel
    ? `Get free yard maintenance quotes across ${stateName}. Connect with pre-screened local professionals for lawn care, yard cleanup, and landscaping services throughout ${stateName}.`
    : `Get free yard maintenance quotes in ${cityName}, ${stateName}. Connect with pre-screened local professionals for lawn care, yard cleanup, and landscaping services.`;

  const addressJson: {
    "@type": string;
    addressLocality?: string;
    addressRegion: string;
    addressCountry: string;
  } = {
    "@type": "PostalAddress",
    addressRegion: stateAbbr,
    addressCountry: "US",
  };

  if (!isStateLevel) {
    addressJson.addressLocality = cityName;
  }

  const placeJson = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${pageUrl}#place`,
    name: placeName,
    description: placeDescription,
    url: pageUrl,
    address: addressJson,
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lon,
    },
  };

  // Service Schema
  const serviceName = isStateLevel
    ? `Yard Maintenance in ${stateName}`
    : `Yard Maintenance in ${cityName}, ${stateName}`;
  const areaServedName = isStateLevel ? stateName : `${cityName}, ${stateName}`;

  const serviceJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    serviceType: services.join(", "),
    provider: {
      "@type": "Organization",
      name: "Yard Maintenance Quotes",
      url: "https://yardmaintenancequotes.com",
    },
    areaServed: {
      "@type": "Place",
      name: areaServedName,
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
