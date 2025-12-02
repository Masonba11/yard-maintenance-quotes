import { notFound } from "next/navigation";
import { getLocationsByState } from "@/src/data/locations";
import { services } from "@/src/data/services";
import Hero from "@/src/components/Hero";
import Link from "next/link";
import type { Metadata } from "next";
import LocationSchema from "@/src/components/schema/LocationSchema";
import { GEO } from "@/src/utils/structuredData";

interface StatePageProps {
  params: {
    state: string;
  };
}

// State abbreviation mapping
const STATE_ABBREVIATIONS: Record<string, string> = {
  arizona: "AZ",
  oklahoma: "OK",
  florida: "FL",
  tennessee: "TN",
  "south-carolina": "SC",
  arkansas: "AR",
  idaho: "ID",
  texas: "TX",
  "new-mexico": "NM",
};

// State name mapping
const STATE_NAMES: Record<string, string> = {
  arizona: "Arizona",
  oklahoma: "Oklahoma",
  florida: "Florida",
  tennessee: "Tennessee",
  "south-carolina": "South Carolina",
  arkansas: "Arkansas",
  idaho: "Idaho",
  texas: "Texas",
  "new-mexico": "New Mexico",
};

export async function generateStaticParams() {
  const stateSlugs = [
    "arizona",
    "oklahoma",
    "florida",
    "tennessee",
    "south-carolina",
    "arkansas",
    "idaho",
    "texas",
    "new-mexico",
  ];

  return stateSlugs.map((state) => ({
    state,
  }));
}

export async function generateMetadata({
  params,
}: StatePageProps): Promise<Metadata> {
  const stateName = STATE_NAMES[params.state] || params.state;
  const stateLocations = getLocationsByState(params.state);

  if (stateLocations.length === 0) {
    return {
      title: "State Not Found",
    };
  }

  const primaryLocation = stateLocations.find((loc) => loc.isPrimary);
  const displayCity = primaryLocation
    ? primaryLocation.city
    : stateLocations[0].city;

  const title = `Yard Maintenance in ${stateName} | Free Quotes`;
  const description = `Get fast, free yard maintenance quotes in ${stateName}. Connect with pre-screened local professionals in ${displayCity} and cities across ${stateName} for lawn mowing, yard cleanup, and landscaping maintenance.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default function StatePage({ params }: StatePageProps) {
  const stateLocations = getLocationsByState(params.state);
  const stateName = STATE_NAMES[params.state] || params.state;
  const stateAbbr = STATE_ABBREVIATIONS[params.state] || "";

  if (stateLocations.length === 0) {
    notFound();
  }

  // Get primary city or first city for geo coordinates (use primary city's coords for state page)
  const primaryLocation = stateLocations.find((loc) => loc.isPrimary);
  const locationForGeo = primaryLocation || stateLocations[0];
  const geo = GEO[params.state]?.[locationForGeo.citySlug];

  const pageUrl = `https://yardmaintenancequote.com/locations/${params.state}`;
  const serviceNames = services.map((s) => s.name);

  return (
    <>
      {/* State-level Location Schema - Place, Service, BreadcrumbList */}
      {/* Uses primary city's coordinates but represents the entire state */}
      {geo && (
        <LocationSchema
          stateSlug={params.state}
          stateName={stateName}
          stateAbbr={stateAbbr}
          citySlug={params.state}
          cityName={stateName}
          services={serviceNames}
          lat={geo.lat}
          lon={geo.lon}
          pageUrl={pageUrl}
        />
      )}

      <Hero
        headline={`Fast Yard Maintenance in ${stateName}`}
        subheadline={`Get matched with pre-screened yard maintenance professionals across ${stateName}. Free quotes, no obligation.`}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Yard Maintenance Services in {stateName}
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Homeowners across {stateName} trust Yard Maintenance to
                connect them with reliable, professional yard maintenance
                services. Whether you need regular lawn mowing, seasonal yard
                cleanup, or ongoing landscaping maintenance, we make it easy to
                find the right professional for your needs.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our network of pre-screened local professionals throughout{" "}
                {stateName} specializes in a wide range of yard maintenance
                services. From basic lawn care to comprehensive property
                maintenance, you'll find qualified contractors ready to help
                keep your yard looking its best year-round.
              </p>

              <div className="bg-primary-50 border-l-4 border-primary-500 p-8 rounded-lg mb-8 mt-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Homeowners in {stateName} Use Yard Maintenance
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 text-lg">
                  <li>
                    Access to pre-screened, licensed yard maintenance
                    professionals across {stateName} who understand local
                    conditions and requirements
                  </li>
                  <li>
                    Compare multiple quotes from local contractors in one place,
                    saving time and ensuring you find the best value
                  </li>
                  <li>
                    Fast response times—most homeowners receive quotes within 24
                    hours, with many professionals responding the same day
                  </li>
                  <li>
                    No fees, no obligations, and no spam—just real quotes from
                    real professionals who want to earn your business
                  </li>
                  <li>
                    Year-round support for all your yard maintenance needs, from
                    spring cleanup to winter preparation
                  </li>
                  <li>
                    Local expertise that understands {stateName}'s climate,
                    common landscaping challenges, and regional best practices
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cities We Serve in {stateName}
              </h2>
              <p className="text-lg text-gray-600">
                Click on any city to learn more and get quotes
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {stateLocations.map((location) => (
                <Link
                  key={`${location.stateSlug}-${location.citySlug}`}
                  href={`/locations/${location.stateSlug}/${location.citySlug}`}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group text-center"
                >
                  <div className="font-bold text-gray-900 mb-1 text-lg group-hover:text-primary-600 transition-colors">
                    {location.city}
                    {location.isPrimary && (
                      <span className="ml-2 text-xs text-primary-600">
                        (Primary)
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{location.state}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Services Available in {stateName}
              </h2>
              <p className="text-lg text-gray-600">
                Click on any service to learn more
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                  <div className="text-primary-600 font-semibold text-sm flex items-center gap-1">
                    Learn more
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
