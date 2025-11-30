import { services } from "@/src/data/services";
import Link from "next/link";

export default function ServicesOverview() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional yard maintenance services to keep your property looking
            its best
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-primary-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 block group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                {service.shortDescription}
              </p>
              <span className="text-primary-600 text-sm font-semibold group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
