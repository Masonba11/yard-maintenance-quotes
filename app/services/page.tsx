import { services } from "@/src/data/services";
import LeadForm from "@/src/components/LeadForm";
import FAQ from "@/src/components/FAQ";
import Link from "next/link";

export const metadata = {
  title: "Our Services",
  description:
    "View all yard maintenance services we offer including lawn mowing, yard cleanup, bush trimming, weed removal, and more.",
};

export default function ServicesPage() {
  return (
    <>
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
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-primary-100/90 text-primary-700 rounded-full text-sm font-semibold">
                Professional Services
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Our Yard Maintenance Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Comprehensive yard maintenance services to keep your property
              looking its best year-round
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-primary-300 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 block"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
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
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        {service.shortDescription}
                      </p>
                      <div className="mt-4 text-primary-600 font-semibold text-sm flex items-center gap-1">
                        Learn more
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
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-gray-600">
                  Get free quotes from local professionals for any of these
                  services
                </p>
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <FAQ
        title="Frequently Asked Questions About Our Services"
        description="Common questions about yard maintenance services and getting quotes"
      />
    </>
  );
}
