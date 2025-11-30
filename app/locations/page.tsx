import { locations } from "@/src/data/locations";
import Link from "next/link";

export const metadata = {
  title: "Service Areas",
  description:
    "View all cities and locations where Yard Maintenance Quotes connects homeowners with local yard maintenance professionals.",
};

export default function LocationsPage() {
  // Group locations by state
  const locationsByState = locations.reduce((acc, location) => {
    if (!acc[location.state]) {
      acc[location.state] = [];
    }
    acc[location.state].push(location);
    return acc;
  }, {} as Record<string, typeof locations>);

  return (
    <>
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
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Service Areas
            </h1>
            <p className="text-xl text-white/90">
              We connect homeowners with trusted yard maintenance professionals
              in cities across the country.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {Object.entries(locationsByState).map(([state, stateLocations]) => (
              <div key={state} className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {state}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {stateLocations.map((location) => (
                    <Link
                      key={`${location.stateSlug}-${location.citySlug}`}
                      href={`/locations/${location.stateSlug}/${location.citySlug}`}
                      className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-primary-500"
                    >
                      <div className="font-bold text-gray-900 mb-1">
                        {location.city}
                        {location.isPrimary && (
                          <span className="ml-2 text-xs text-primary-600">
                            (Primary)
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {location.state}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
