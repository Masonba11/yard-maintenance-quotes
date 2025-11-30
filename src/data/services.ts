export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  icon?: string;
}

export const services: Service[] = [
  {
    id: "yard-maintenance",
    name: "Yard Maintenance",
    description:
      "Comprehensive yard maintenance services to keep your property looking its best year-round.",
    shortDescription:
      "Regular maintenance to keep your yard healthy and beautiful.",
  },
  {
    id: "lawn-mowing",
    name: "Lawn Mowing & Edging",
    description:
      "Professional lawn mowing and edging services for a clean, manicured look.",
    shortDescription:
      "Regular mowing and precise edging for a well-maintained lawn.",
  },
  {
    id: "yard-cleanup",
    name: "Yard Cleanup",
    description:
      "Seasonal and one-time yard cleanup services to remove debris, branches, and overgrowth.",
    shortDescription: "Thorough cleanup to restore your yard's appearance.",
  },
  {
    id: "bush-trimming",
    name: "Bush & Hedge Trimming",
    description:
      "Expert trimming and shaping of bushes, hedges, and shrubs for a polished landscape.",
    shortDescription:
      "Professional trimming to keep your shrubs and hedges neat.",
  },
  {
    id: "weed-removal",
    name: "Weed Removal",
    description:
      "Effective weed removal and prevention to maintain a healthy, weed-free yard.",
    shortDescription: "Remove and prevent weeds for a cleaner yard.",
  },
  {
    id: "leaf-removal",
    name: "Leaf Removal",
    description:
      "Seasonal leaf removal and cleanup to keep your yard clear and healthy.",
    shortDescription: "Complete leaf removal during fall and spring seasons.",
  },
  {
    id: "landscaping-maintenance",
    name: "Basic Landscaping Maintenance",
    description:
      "Maintenance services including mulch refresh, rock replacement, and general landscape upkeep.",
    shortDescription:
      "Keep your landscaping fresh with mulch and rock maintenance.",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
