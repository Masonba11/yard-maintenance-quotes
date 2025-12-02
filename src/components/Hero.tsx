import Link from "next/link";

interface HeroProps {
  headline?: string;
  subheadline?: string;
  showForm?: boolean;
  city?: string;
  state?: string;
}

export default function Hero({
  headline = "Fast Yard Maintenance in Minutes",
  subheadline = "Tell us about your yard once and we&apos;ll match you with a local yard maintenance pro for a free, no-obligation quote.",
  showForm = false,
  city,
  state,
}: HeroProps) {
  const locationText = city && state ? ` in ${city}, ${state}` : "";

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20 md:py-32 overflow-hidden">
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
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-[1]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary-100/90 text-primary-700 rounded-full text-sm font-semibold">
              Free Quotes • No Obligation
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            {headline.replace("Minutes", `Minutes${locationText}`)}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {!showForm && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#quote-form"
                className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Get My Free Quote
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/#service-areas"
                className="bg-white hover:bg-gray-50 text-primary-600 font-bold py-4 px-10 rounded-xl text-lg border-2 border-primary-600 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                See Service Areas
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
