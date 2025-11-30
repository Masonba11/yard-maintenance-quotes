"use client";

import { useEffect } from "react";

interface StructuredDataProps {
  data: object | object[];
}

/**
 * Component to inject JSON-LD structured data into the page head
 * Usage: <StructuredData data={schemaObject} />
 */
export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.id = "structured-data";

    // Remove existing structured data script if present
    const existing = document.getElementById("structured-data");
    if (existing) {
      existing.remove();
    }

    // Append to head
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById("structured-data");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
}
