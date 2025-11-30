import { notFound } from "next/navigation";
import { getLocationBySlugs, getLocationsByMetro } from "@/src/data/locations";
import { services, getServiceById } from "@/src/data/services";
import Hero from "@/src/components/Hero";
import LeadForm from "@/src/components/LeadForm";
import FAQ from "@/src/components/FAQ";
import Link from "next/link";
import type { Metadata } from "next";
import {
  generateLocationServiceContent,
  generateServiceContent,
  generateLocationContent,
} from "@/src/utils/contentGenerator";
import { generateLocationServiceFAQs } from "@/src/utils/faqGenerator";
import { getAllBlogPosts } from "@/src/data/blog";

interface LocationServicePageProps {
  params: {
    state: string;
    city: string;
    service: string;
  };
}

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
      params.push({
        state: location.stateSlug,
        city: location.citySlug,
        service: service.id,
      });
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
  const description = `Get free quotes for ${service.name.toLowerCase()} in ${
    location.displayName
  }. ${service.description}`;

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
  const metroLocations = location
    ? getLocationsByMetro(location.metroArea)
    : [];

  if (!location || !service) {
    notFound();
  }

  return (
    <>
      <Hero
        headline={`${service.name} in ${location.city}, ${location.state}`}
        subheadline={`Get matched with local ${service.name.toLowerCase()} professionals in ${
          location.displayName
        }. Free quotes, no obligation.`}
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {service.name} Services in {location.displayName}
              </h2>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Homeowners in {location.city} trust Yard Maintenance Quotes to
                connect them with reliable, professional{" "}
                {service.name.toLowerCase()} services. {service.description}
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our network of pre-screened local professionals in{" "}
                {location.displayName} specializes in{" "}
                {service.name.toLowerCase()}. Whether you need regular service
                or a one-time project, we make it easy to find the right
                professional for your needs.
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

              {generateServiceContent(service)
                .slice(0, 3)
                .map((section, index) => (
                  <div key={`service-${index}`} className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {section.title} in {location.city}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {section.content} When applied to {location.displayName},
                      these principles are adapted to work with {location.state}
                      's specific climate and growing conditions.
                    </p>
                  </div>
                ))}

              <div className="bg-primary-50 border-l-4 border-primary-500 p-8 rounded-lg mb-8 mt-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Choose {service.name} Professionals in {location.city}?
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
                    Knowledge of {location.metroArea} area regulations, disposal
                    requirements, and local best practices
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
                  {service.name.toLowerCase()} that's specifically suited to
                  your location. They understand common challenges in{" "}
                  {location.state} and can recommend approaches that work best
                  for {location.displayName} conditions.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Other Services Available in {location.city}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {services
                  .filter((s) => s.id !== service.id)
                  .map((s) => (
                    <Link
                      key={s.id}
                      href={`/locations/${location.stateSlug}/${location.citySlug}/${s.id}`}
                      className="px-4 py-2 bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-600 rounded-lg transition-colors text-sm font-medium"
                    >
                      {s.name}
                    </Link>
                  ))}
              </div>
            </div>

            {metroLocations.length > 1 && (
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  We Also Serve These {location.metroArea} Area Cities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {metroLocations
                    .filter((loc) => loc.citySlug !== location.citySlug)
                    .map((loc) => (
                      <Link
                        key={`${loc.stateSlug}-${loc.citySlug}`}
                        href={`/locations/${loc.stateSlug}/${loc.citySlug}/${service.id}`}
                        className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {loc.city}, {loc.state}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="quote-form" className="py-20 md:py-28 bg-gray-50">
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
              serviceContext={service.id}
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

      <FAQ
        items={generateLocationServiceFAQs(location, service)}
        title={`Frequently Asked Questions About ${service.name} in ${location.displayName}`}
        description={`Common questions about ${service.name.toLowerCase()} services in ${
          location.city
        }, ${location.state}`}
      />
    </>
  );
}
