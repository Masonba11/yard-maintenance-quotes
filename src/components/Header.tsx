"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { primaryLocations } from "@/src/data/locations";
import { services } from "@/src/data/services";

export default function Header() {
  const [isServiceAreasOpen, setIsServiceAreasOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileServiceAreasOpen, setIsMobileServiceAreasOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center py-0">
          <Link href="/" className="flex items-center -my-1">
            <Image
              src="/logo.png"
              alt="Yard Maintenance"
              width={1200}
              height={360}
              className="h-20 md:h-28 lg:h-32 w-auto object-contain"
              priority
            />
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center gap-1">
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`absolute top-full left-0 w-80 z-50 transition-opacity duration-200 ${
                  isServicesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <div className="pt-2">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors mb-1"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="font-semibold">{service.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {service.shortDescription}
                        </div>
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="block px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-md transition-colors text-center border-t border-gray-200 mt-2 pt-2"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative group"
              onMouseEnter={() => setIsServiceAreasOpen(true)}
              onMouseLeave={() => setIsServiceAreasOpen(false)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center gap-1">
                Service Areas
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isServiceAreasOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`absolute top-full left-0 w-96 z-50 transition-opacity duration-200 ${
                  isServiceAreasOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <div className="pt-2">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 grid grid-cols-2 gap-2">
                    {primaryLocations.map((location) => (
                      <Link
                        key={`${location.stateSlug}-${location.citySlug}`}
                        href={`/locations/${location.stateSlug}/${location.citySlug}`}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors"
                        onClick={() => setIsServiceAreasOpen(false)}
                      >
                        {location.city}, {location.state}
                      </Link>
                    ))}
                    <Link
                      href="/locations"
                      className="col-span-2 px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-md transition-colors text-center border-t border-gray-200 mt-2 pt-2"
                      onClick={() => setIsServiceAreasOpen(false)}
                    >
                      View All Locations →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/how-it-works"
              className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              href="#quote-form"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50 max-h-[calc(100vh-100px)] overflow-y-auto">
              <div className="container mx-auto px-4 py-4 space-y-2">
                {/* Services Dropdown */}
                <div>
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium text-left"
                  >
                    <span>Services</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isMobileServicesOpen && (
                    <div className="pl-4 space-y-1">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileServicesOpen(false);
                          }}
                        >
                          <div className="font-medium">{service.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {service.shortDescription}
                          </div>
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        className="block px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileServicesOpen(false);
                        }}
                      >
                        View All Services →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Service Areas Dropdown */}
                <div>
                  <button
                    onClick={() =>
                      setIsMobileServiceAreasOpen(!isMobileServiceAreasOpen)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium text-left"
                  >
                    <span>Service Areas</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        isMobileServiceAreasOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isMobileServiceAreasOpen && (
                    <div className="pl-4 space-y-1">
                      {primaryLocations.map((location) => (
                        <Link
                          key={`${location.stateSlug}-${location.citySlug}`}
                          href={`/locations/${location.stateSlug}/${location.citySlug}`}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileServiceAreasOpen(false);
                          }}
                        >
                          {location.city}, {location.state}
                        </Link>
                      ))}
                      <Link
                        href="/locations"
                        className="block px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileServiceAreasOpen(false);
                        }}
                      >
                        View All Locations →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Other Links */}
                <Link
                  href="/how-it-works"
                  className="block px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/blog"
                  className="block px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/faq"
                  className="block px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="#quote-form"
                  className="block px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all text-center mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
