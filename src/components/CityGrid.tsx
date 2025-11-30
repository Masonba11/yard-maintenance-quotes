import Link from "next/link";
import { primaryLocations } from "@/src/data/locations";

export default function CityGrid() {
  return (
    <section
      id="service-areas"
      className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Top Service Areas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We connect homeowners with trusted yard maintenance professionals in
            cities across the country
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {primaryLocations.map((location) => (
            <Link
              key={`${location.stateSlug}-${location.citySlug}`}
              href={`/locations/${location.stateSlug}/${location.citySlug}`}
              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all text-center border-2 border-gray-100 hover:border-primary-500 transform hover:-translate-y-2"
            >
              <div className="font-bold text-gray-900 mb-2 text-lg group-hover:text-primary-600 transition-colors">
                {location.city}
              </div>
              <div className="text-sm text-gray-500">{location.state}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
