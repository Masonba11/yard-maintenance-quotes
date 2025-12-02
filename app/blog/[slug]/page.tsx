import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts } from "@/src/data/blog";
import LeadForm from "@/src/components/LeadForm";
import type { Metadata } from "next";
import { services } from "@/src/data/services";
import { locations } from "@/src/data/locations";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Yard Maintenance Blog`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
    },
  };
}

// Map blog categories to state slugs
const categoryToStateSlug: Record<string, string> = {
  "Arizona Yard Care": "arizona",
  "Oklahoma Yard Care": "oklahoma",
  "Tennessee Yard Care": "tennessee",
  "South Carolina Yard Care": "south-carolina",
  "Texas Yard Care": "texas",
  "Florida Yard Care": "florida",
  "Arkansas Yard Care": "arkansas",
  "Idaho Yard Care": "idaho",
  "New Mexico Yard Care": "new-mexico",
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get relevant locations for this blog post's state
  const stateSlug = categoryToStateSlug[post.category];
  const relevantLocations = stateSlug
    ? locations.filter((loc) => loc.stateSlug === stateSlug && loc.isPrimary)
    : [];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-24 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/YMQhero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-white/80">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-primary-100/90 text-primary-700 text-sm font-medium rounded-md">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                {post.title}
              </h1>
            </header>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div
            className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:font-bold prose-h2:leading-tight
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:font-semibold prose-h3:leading-tight
            prose-p:text-gray-700 prose-p:leading-7 prose-p:mb-6 prose-p:text-lg
            prose-ul:text-gray-700 prose-ul:mb-8 prose-ul:pl-0
            prose-li:text-gray-700 prose-li:mb-3 prose-li:leading-7 prose-li:pl-0 prose-li:marker:text-primary-600
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-headings:first:mt-0"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Services Cross-Link Section */}
          <section className="bg-white rounded-2xl p-8 md:p-12 mb-12 border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Yard Maintenance Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive yard maintenance services available in
                your area
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                // "Yard Maintenance" is the main service, so don't link it
                const isYardMaintenance = service.id === "yard-maintenance";

                if (isYardMaintenance) {
                  return (
                    <div
                      key={service.id}
                      className="bg-gray-50 p-6 rounded-xl border border-gray-200"
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
                    href={`/services/${service.id}`}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all transform hover:-translate-y-1 group"
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
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/services"
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
              >
                View All Services
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
              </Link>
            </div>
          </section>

          {/* Locations Cross-Link Section */}
          {relevantLocations.length > 0 && (
            <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12 mb-12 border border-primary-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Service Areas & Services
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Get yard maintenance quotes in these{" "}
                  {relevantLocations[0]?.state} cities
                </p>
              </div>
              <div className="space-y-6">
                {relevantLocations.map((location) => (
                  <div
                    key={`${location.stateSlug}-${location.citySlug}`}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
                  >
                    <div className="mb-4">
                      <Link
                        href={`/locations/${location.stateSlug}/${location.citySlug}`}
                        className="inline-block"
                      >
                        <h3 className="text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors mb-1">
                          {location.city}, {location.state}
                        </h3>
                      </Link>
                      <Link
                        href={`/locations/${location.stateSlug}/${location.citySlug}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
                      >
                        View all services
                        <svg
                          className="w-4 h-4"
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
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {services
                        .filter((s) => s.id !== "yard-maintenance")
                        .map((service) => (
                          <Link
                            key={service.id}
                            href={`/locations/${location.stateSlug}/${location.citySlug}/${service.id}`}
                            className="text-sm text-primary-600 hover:text-primary-700 hover:underline font-medium py-2 px-3 rounded-md hover:bg-primary-50 transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/locations"
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                >
                  View All Service Areas
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
                </Link>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section
            id="quote-form"
            className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12 mb-12 border border-primary-100"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get connected with trusted local yard maintenance professionals
                in your area. Free quotes, no obligation.
              </p>
            </div>
            <LeadForm />
          </section>

          {/* Back to Blog */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
