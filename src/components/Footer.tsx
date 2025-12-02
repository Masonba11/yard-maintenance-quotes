import Link from "next/link";
import { primaryLocations } from "@/src/data/locations";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Group locations by state for footer display
  const locationsByState = primaryLocations.reduce((acc, location) => {
    if (!acc[location.state]) {
      acc[location.state] = [];
    }
    acc[location.state].push(location);
    return acc;
  }, {} as Record<string, typeof primaryLocations>);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-xl mb-4 bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
              Yard Maintenance
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting homeowners with trusted local yard maintenance
              professionals across the country.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary-400 transition-colors text-gray-400 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-primary-400 transition-colors text-gray-400 hover:text-white"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary-400 transition-colors text-gray-400 hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-400 transition-colors text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary-400 transition-colors text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary-400 transition-colors text-gray-400 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">
              Service Areas
            </h4>
            <ul className="space-y-3 text-sm max-h-64 overflow-y-auto pr-2">
              {Object.entries(locationsByState).map(([state, locations]) => (
                <li key={state} className="mb-3">
                  <div className="text-primary-400 font-medium text-xs mb-1 uppercase tracking-wide">
                    {state}
                  </div>
                  <ul className="space-y-1.5 ml-2">
                    {locations.map((location) => (
                      <li key={`${location.stateSlug}-${location.citySlug}`}>
                        <Link
                          href={`/locations/${location.stateSlug}/${location.citySlug}`}
                          className="hover:text-primary-400 transition-colors text-gray-400 hover:text-white text-xs"
                        >
                          {location.city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="mt-4 pt-3 border-t border-gray-700">
                <Link
                  href="/locations"
                  className="text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors"
                >
                  View All Locations →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © {currentYear} Yard Maintenance. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs max-w-2xl text-center md:text-right">
              Yard Maintenance is a lead generation and matching service.
              We connect homeowners with independent local contractors. We do
              not perform yard maintenance services ourselves.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
