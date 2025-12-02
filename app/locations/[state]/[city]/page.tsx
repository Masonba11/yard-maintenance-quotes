import { notFound } from "next/navigation";
import { getLocationBySlugs, getLocationsByMetro } from "@/src/data/locations";
import { services } from "@/src/data/services";
import Hero from "@/src/components/Hero";
import LeadForm from "@/src/components/LeadForm";
import Link from "next/link";
import type { Metadata } from "next";
import { generateLocationContent } from "@/src/utils/contentGenerator";
import { generateLocationFAQs } from "@/src/utils/faqGenerator";
import { getAllBlogPosts } from "@/src/data/blog";
import LocationSchema from "@/src/components/schema/LocationSchema";
import { GEO } from "@/src/utils/structuredData";

interface LocationPageProps {
  params: {
    state: string;
    city: string;
  };
}

export async function generateStaticParams() {
  // This will be used to pre-generate all location pages at build time
  const { locations } = await import("@/src/data/locations");

  return locations.map((location) => ({
    state: location.stateSlug,
    city: location.citySlug,
  }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const location = getLocationBySlugs(params.state, params.city);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  const title = `Yard Maintenance in ${location.displayName} | Free Quotes`;
  const description = `Get fast, free yard maintenance quotes in ${location.displayName}. Connect with pre-screened local professionals for lawn mowing, yard cleanup, and landscaping maintenance.`;

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

export default function LocationPage({ params }: LocationPageProps) {
  const location = getLocationBySlugs(params.state, params.city);
  const metroLocations = location
    ? getLocationsByMetro(location.metroArea)
    : [];

  if (!location) {
    notFound();
  }

  // Generate location-specific content
  const locationServices = services.slice(0, 5); // Show top 5 services

  // Get geo coordinates
  const geo = GEO[location.stateSlug]?.[location.citySlug];
  const stateAbbr = STATE_ABBREVIATIONS[location.stateSlug] || "";
  const pageUrl = `https://yardmaintenancequote.com/locations/${location.stateSlug}/${location.citySlug}`;
  const serviceNames = services.map((s) => s.name);

  return (
    <>
      {/* Location Schema - Place, Service, BreadcrumbList */}
      {geo && (
        <LocationSchema
          stateSlug={location.stateSlug}
          stateName={location.state}
          stateAbbr={stateAbbr}
          citySlug={location.citySlug}
          cityName={location.city}
          services={serviceNames}
          lat={geo.lat}
          lon={geo.lon}
          pageUrl={pageUrl}
        />
      )}
      <Hero
        headline={`Fast Yard Maintenance in ${location.city}, ${location.state}`}
        subheadline={`Get matched with pre-screened yard maintenance professionals in ${location.displayName}. Free quotes, no obligation.`}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Yard Maintenance Services in {location.displayName}
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Homeowners in {location.displayName} trust Yard Maintenance
                to connect them with reliable, professional yard
                maintenance services. Whether you need regular lawn mowing,
                seasonal yard cleanup, or ongoing landscaping maintenance, we
                make it easy to find the right professional for your needs.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our network of pre-screened local professionals in{" "}
                {location.city} and the surrounding {location.metroArea} area
                specializes in a wide range of yard maintenance services. From
                basic lawn care to comprehensive property maintenance, you'll
                find qualified contractors ready to help keep your yard looking
                its best year-round.
              </p>

              {generateLocationContent(location).map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {section.content}
                  </p>
                </div>
              ))}

              <div className="bg-primary-50 border-l-4 border-primary-500 p-8 rounded-lg mb-8 mt-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Homeowners in {location.city} Use Yard Maintenance
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 text-lg">
                  <li>
                    Access to pre-screened, licensed yard maintenance
                    professionals in {location.displayName} who understand local
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
                    Local expertise that understands {location.state}'s climate,
                    common landscaping challenges, and regional best practices
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Getting Started in {location.displayName}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Getting started is simple. Fill out our quick form below, and
                  we'll match you with 2-4 qualified yard maintenance
                  professionals in {location.displayName}. Each professional
                  will contact you directly with a free, no-obligation quote
                  tailored to your specific needs.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The professionals in our network serving {location.city} have
                  been pre-screened for quality, reliability, and customer
                  satisfaction. They understand the unique needs of{" "}
                  {location.state} homeowners and can provide services that are
                  specifically suited to the {location.metroArea} area's climate
                  and conditions.
                </p>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Popular Services in {location.city}
              </h3>
              <p className="text-gray-700">
                Our network of professionals in {location.displayName} offers
                comprehensive yard maintenance services including lawn mowing,
                yard cleanup, bush and hedge trimming, weed removal, leaf
                removal, and basic landscaping maintenance. Whether you need
                one-time service or ongoing maintenance, we can help you find
                the right professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Services Available in {location.displayName}
              </h2>
              <p className="text-lg text-gray-600">
                Our network of professionals in {location.displayName} offers
                comprehensive yard maintenance services
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                // "Yard Maintenance" is the main page, so don't link it
                const isYardMaintenance = service.id === "yard-maintenance";

                if (isYardMaintenance) {
                  return (
                    <div
                      key={service.id}
                      className="bg-white p-6 rounded-xl border border-gray-200 shadow-md"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mb-4">
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
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                  );
                }

                return (
                  <Link
                    key={service.id}
                    href={`/locations/${location.stateSlug}/${location.citySlug}/${service.id}`}
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
                      Get quotes
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
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {metroLocations.length > 1 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                We Also Serve These {location.metroArea} Area Cities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {metroLocations
                  .filter((loc) => loc.citySlug !== location.citySlug)
                  .map((loc) => (
                    <a
                      key={`${loc.stateSlug}-${loc.citySlug}`}
                      href={`/locations/${loc.stateSlug}/${loc.citySlug}`}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border-2 border-transparent hover:border-primary-500"
                    >
                      <div className="font-bold text-gray-900">{loc.city}</div>
                      <div className="text-sm text-gray-600">{loc.state}</div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="quote-form" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Your Free Quote in {location.displayName}
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll connect you with local yard
                maintenance professionals in {location.city}.
              </p>
            </div>
            <LeadForm
              city={location.city}
              state={location.state}
              citySlug={location.citySlug}
              stateSlug={location.stateSlug}
            />
          </div>
        </div>
      </section>

      {(location.stateSlug === "arizona" ||
        location.stateSlug === "oklahoma" ||
        location.stateSlug === "tennessee" ||
        location.stateSlug === "south-carolina" ||
        location.stateSlug === "texas" ||
        location.stateSlug === "florida" ||
        location.stateSlug === "arkansas" ||
        location.stateSlug === "idaho" ||
        location.stateSlug === "new-mexico") && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {location.state} Yard Maintenance Resources
                </h2>
                <p className="text-lg text-gray-600">
                  Expert guides and tips for maintaining your yard in{" "}
                  {location.state}'s unique climate
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {getAllBlogPosts()
                  .filter(
                    (post) =>
                      (location.stateSlug === "arizona" &&
                        post.category === "Arizona Yard Care") ||
                      (location.stateSlug === "oklahoma" &&
                        post.category === "Oklahoma Yard Care") ||
                      (location.stateSlug === "tennessee" &&
                        post.category === "Tennessee Yard Care") ||
                      (location.stateSlug === "south-carolina" &&
                        post.category === "South Carolina Yard Care") ||
                      (location.stateSlug === "texas" &&
                        post.category === "Texas Yard Care") ||
                      (location.stateSlug === "florida" &&
                        post.category === "Florida Yard Care") ||
                      (location.stateSlug === "arkansas" &&
                        post.category === "Arkansas Yard Care") ||
                      (location.stateSlug === "idaho" &&
                        post.category === "Idaho Yard Care") ||
                      (location.stateSlug === "new-mexico" &&
                        post.category === "New Mexico Yard Care")
                  )
                  .map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all group"
                    >
                      <div className="mb-3">
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-md">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 gap-1.5 transition-all">
                        Read article
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ section without FAQPage schema - we only want Place/Service/BreadcrumbList on location pages */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Frequently Asked Questions About Yard Maintenance in{" "}
                {location.displayName}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Common questions about getting yard maintenance quotes in{" "}
              {location.city}, {location.state}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {generateLocationFAQs(location).map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-white"
                >
                  <details className="group">
                    <summary className="w-full px-6 py-5 text-left flex justify-between items-center bg-gradient-to-r from-gray-50 to-white hover:from-primary-50 hover:to-white transition-all cursor-pointer list-none">
                      <span className="font-bold text-gray-900 pr-4 text-lg">
                        {item.question}
                      </span>
                      <span className="text-primary-600 text-2xl flex-shrink-0 font-light">
                        <span className="group-open:hidden">+</span>
                        <span className="group-open:inline hidden">−</span>
                      </span>
                    </summary>
                    <div className="px-6 py-5 bg-white text-gray-700 leading-relaxed border-t border-gray-100">
                      {item.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
