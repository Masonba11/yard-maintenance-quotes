import { notFound } from "next/navigation";
import { getLocationBySlugs, getLocationsByMetro } from "@/src/data/locations";
import { services, getServiceById } from "@/src/data/services";
import Hero from "@/src/components/Hero";
import LeadForm from "@/src/components/LeadForm";
import Link from "next/link";
import type { Metadata } from "next";
import {
  generateLocationServiceContent,
  generateServiceContent,
} from "@/src/utils/contentGenerator";
import { generateLocationServiceFAQs } from "@/src/utils/faqGenerator";
import { getAllBlogPosts } from "@/src/data/blog";
import LocationSchema from "@/src/components/schema/LocationSchema";
import { GEO } from "@/src/utils/structuredData";

interface LocationServicePageProps {
  params: {
    state: string;
    city: string;
    service: string;
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

export async function generateStaticParams() {
  const { locations } = await import("@/src/data/locations");
  const { services } = await import("@/src/data/services");

  const params: Array<{
    state: string;
    city: string;
    service: string;
  }> = [];

  locations.forEach((location) => {
    services.forEach((service) => {
      // Exclude "yard-maintenance" - location pages are the main yard maintenance pages
      if (service.id !== "yard-maintenance") {
        params.push({
          state: location.stateSlug,
          city: location.citySlug,
          service: service.id,
        });
      }
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: LocationServicePageProps): Promise<Metadata> {
  const location = getLocationBySlugs(params.state, params.city);
  const service = getServiceById(params.service);

  if (!location || !service) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `${service.name} in ${location.displayName} | Free Quotes`;
  const description = `Get fast, free ${service.name.toLowerCase()} quotes in ${location.displayName}. Connect with pre-screened local professionals for ${service.name.toLowerCase()} services.`;

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

export default function LocationServicePage({
  params,
}: LocationServicePageProps) {
  const location = getLocationBySlugs(params.state, params.city);
  const service = getServiceById(params.service);

  // Redirect "yard-maintenance" to the main location page
  if (params.service === "yard-maintenance") {
    notFound();
  }

  if (!location || !service) {
    notFound();
  }

  const metroLocations = getLocationsByMetro(location.metroArea);
  const otherServices = services.filter((s) => s.id !== service.id);

  // Get geo coordinates
  const geo = GEO[location.stateSlug]?.[location.citySlug];
  const stateAbbr = STATE_ABBREVIATIONS[location.stateSlug] || "";
  const pageUrl = `https://yardmaintenancequotes.com/locations/${location.stateSlug}/${location.citySlug}/${service.id}`;
  const serviceNames = [service.name];

  return (
    <>
      {/* Location Service Schema - Place, Service, BreadcrumbList */}
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
        headline={`${service.name} in ${location.city}, ${location.state}`}
        subheadline={`Get matched with local ${service.name.toLowerCase()} professionals in ${location.displayName}. Free quotes, no obligation.`}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {service.name} Services in {location.displayName}
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Homeowners in {location.displayName} trust Yard Maintenance
                Quotes to connect them with reliable, professional{" "}
                {service.name.toLowerCase()} services. {service.description}
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our network of pre-screened local professionals in{" "}
                {location.city} and the surrounding {location.metroArea} area
                specializes in {service.name.toLowerCase()}. Whether you need
                regular service or a one-time project, we make it easy to find
                the right professional for your needs.
              </p>

              {generateLocationServiceContent(location, service).map(
                (section, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {section.content}
                    </p>
                  </div>
                )
              )}

              <div className="bg-primary-50 border-l-4 border-primary-500 p-8 rounded-lg mb-8 mt-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why {location.city} Homeowners Choose Professional{" "}
                  {service.name}
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 text-lg">
                  <li>
                    Access to pre-screened, licensed professionals in{" "}
                    {location.displayName} who specialize in{" "}
                    {service.name.toLowerCase()} and understand local conditions
                  </li>
                  <li>
                    Compare multiple quotes from local contractors, allowing you
                    to evaluate options and find the best value for your
                    specific needs
                  </li>
                  <li>
                    Fast response times—most homeowners in {location.city}{" "}
                    receive quotes within 24 hours, with many professionals
                    responding the same day
                  </li>
                  <li>
                    No fees, no obligations, and no spam—just real quotes from
                    real professionals who want to earn your business through
                    quality service
                  </li>
                  <li>
                    Local expertise that understands how {location.state}'s
                    climate affects {service.name.toLowerCase()} requirements
                    throughout the year
                  </li>
                  <li>
                    Knowledge of {location.metroArea} area regulations,
                    disposal requirements, and local best practices
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What to Expect from {service.name} in {location.displayName}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you work with {service.name.toLowerCase()} professionals
                  in {location.city}, you can expect services that are tailored
                  to the local environment. Professionals serving{" "}
                  {location.displayName} understand how {location.state}'s
                  climate, soil conditions, and seasonal patterns affect{" "}
                  {service.name.toLowerCase()} needs.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These local professionals have experience working in the{" "}
                  {location.metroArea} area and can provide{" "}
                  {service.name.toLowerCase()} that's specifically suited to your
                  location. They understand common challenges in {location.state}{" "}
                  and can recommend approaches that work best for{" "}
                  {location.displayName} conditions.
                </p>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Other Services Available in {location.city}
              </h3>
              <div className="flex flex-wrap gap-2">
                {otherServices.map((s) => (
                  <Link
                    key={s.id}
                    href={`/locations/${location.stateSlug}/${location.citySlug}/${s.id}`}
                    className="text-primary-600 hover:text-primary-700 hover:underline text-sm"
                  >
                    {s.name}
                  </Link>
                ))}
                {otherServices.length > 0 && (
                  <>
                    <span className="text-gray-400">•</span>
                    <Link
                      href={`/locations/${location.stateSlug}/${location.citySlug}`}
                      className="text-primary-600 hover:text-primary-700 hover:underline text-sm font-semibold"
                    >
                      Yard Maintenance
                    </Link>
                  </>
                )}
              </div>
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
                    <Link
                      key={`${loc.stateSlug}-${loc.citySlug}`}
                      href={`/locations/${loc.stateSlug}/${loc.citySlug}/${service.id}`}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border-2 border-transparent hover:border-primary-500"
                    >
                      <div className="font-bold text-gray-900">{loc.city}</div>
                      <div className="text-sm text-gray-600">{loc.state}</div>
                    </Link>
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
                Get Your Free {service.name} Quote in {location.displayName}
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll connect you with local{" "}
                {service.name.toLowerCase()} professionals in {location.city}.
              </p>
            </div>
            <LeadForm
              city={location.city}
              state={location.state}
              citySlug={location.citySlug}
              stateSlug={location.stateSlug}
              serviceContext={service.name}
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

      {/* FAQ section without FAQPage schema */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Frequently Asked Questions About {service.name} in{" "}
                {location.displayName}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Common questions about {service.name.toLowerCase()} services in{" "}
              {location.city}, {location.state}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {generateLocationServiceFAQs(location, service).map(
                (item, index) => (
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
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

