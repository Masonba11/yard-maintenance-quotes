import LeadForm from "@/src/components/LeadForm";
import FAQ from "@/src/components/FAQ";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Yard Maintenance Quotes or request a free yard maintenance quote from local professionals.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-700">
              Have questions? We're here to help. Or request a free quote below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get Your Free Quote
              </h2>
              <p className="text-gray-700 mb-6">
                Fill out the form below and we'll connect you with local yard
                maintenance professionals in your area. You'll receive free,
                no-obligation quotes within 24 hours.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <FAQ
        title="Frequently Asked Questions"
        description="Common questions about getting yard maintenance quotes and our service"
      />
    </>
  );
}
