import { notFound } from "next/navigation";
import { services, getServiceById } from "@/src/data/services";
import { primaryLocations } from "@/src/data/locations";
import Hero from "@/src/components/Hero";
import LeadForm from "@/src/components/LeadForm";
import FAQ from "@/src/components/FAQ";
import Link from "next/link";
import { generateServiceContent } from "@/src/utils/contentGenerator";
import { generateServiceFAQs } from "@/src/utils/faqGenerator";

interface ServicePageProps {
  params: {
    serviceId: string;
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    serviceId: service.id,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = getServiceById(params.serviceId);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const title = `${service.name} | Yard Maintenance Quotes`;
  const description = `${service.description} Get free quotes from local professionals.`;

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

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceById(params.serviceId);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Hero
        headline={`${service.name} Services`}
        subheadline={`${service.description} Get matched with local professionals for free quotes.`}
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Professional {service.name}
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {service.description}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {service.shortDescription}
              </p>

              {generateServiceContent(service).map((section, index) => (
                <div key={index} className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {section.content}
                  </p>
                </div>
              ))}

              <div className="bg-primary-50 border-l-4 border-primary-500 p-8 rounded-lg mb-8 mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Choose Professional {service.name}?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 text-lg">
                  <li>
                    Experienced, licensed professionals with proven track
                    records in {service.name.toLowerCase()}
                  </li>
                  <li>
                    Quality workmanship and attention to detail that ensures
                    lasting results
                  </li>
                  <li>
                    Competitive pricing with free, no-obligation quotes so you
                    can compare options
                  </li>
                  <li>
                    Reliable service you can count on, with professionals who
                    stand behind their work
                  </li>
                  <li>
                    Time savings that let you focus on other priorities while
                    professionals handle your yard
                  </li>
                  <li>
                    Expert knowledge of best practices, equipment, and
                    techniques for optimal results
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  How It Works
                </h3>
                <ol className="list-decimal pl-6 text-gray-700 space-y-4 text-lg">
                  <li>
                    Fill out our simple form below with details about your{" "}
                    {service.name.toLowerCase()} needs, including the size of
                    your property, specific requirements, and any particular
                    concerns or preferences you have.
                  </li>
                  <li>
                    We match you with 2-4 pre-screened local professionals who
                    specialize in {service.name.toLowerCase()} and have
                    experience in your area. Each professional is licensed,
                    insured, and has a proven track record of quality work.
                  </li>
                  <li>
                    Receive free quotes tailored to your specific requirements.
                    Each professional will contact you directly to discuss your
                    needs, answer questions, and provide a detailed quote that
                    outlines exactly what services are included.
                  </li>
                  <li>
                    Compare options and choose the best fit for you. Review each
                    quote, ask questions, check references if desired, and
                    select the professional that best meets your needs, budget,
                    and preferences. There's no obligation to accept any quote.
                  </li>
                </ol>
              </div>

              <div className="mt-10 p-8 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What to Expect from Professional {service.name}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you work with professional {service.name.toLowerCase()}{" "}
                  services, you can expect thorough, efficient work performed by
                  experienced professionals. They'll arrive with the right
                  equipment, use proper techniques, and clean up after
                  completing the work. Professional services also typically
                  include insurance coverage, warranties on work performed, and
                  clear communication throughout the process.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Professional {service.name.toLowerCase()} providers understand
                  that your yard is an important part of your home. They take
                  pride in delivering results that enhance your property's
                  appearance and value. Whether you need one-time service or
                  ongoing maintenance, professional providers can develop a plan
                  that fits your needs and budget.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Available in These Service Areas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {primaryLocations.map((location) => (
                  <Link
                    key={`${location.stateSlug}-${location.citySlug}`}
                    href={`/locations/${location.stateSlug}/${location.citySlug}`}
                    className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {location.city}, {location.state}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quote-form" className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Your Free {service.name} Quote
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll connect you with local
                professionals.
              </p>
            </div>
            <LeadForm serviceContext={service.id} />
          </div>
        </div>
      </section>

      <FAQ
        items={generateServiceFAQs(service)}
        title={`Frequently Asked Questions About ${service.name}`}
        description={`Common questions about ${service.name.toLowerCase()} services and getting quotes`}
      />
    </>
  );
}
