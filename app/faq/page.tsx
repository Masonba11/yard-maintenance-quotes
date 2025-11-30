import FAQ from "@/src/components/FAQ";
import LeadForm from "@/src/components/LeadForm";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Get answers to common questions about Yard Maintenance Quotes, our services, and how the quote process works.",
};

export default function FAQPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-700">
              Everything you need to know about getting yard maintenance quotes
            </p>
          </div>
        </div>
      </section>
      <FAQ />
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Get in touch with us or request a free quote to get started.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
