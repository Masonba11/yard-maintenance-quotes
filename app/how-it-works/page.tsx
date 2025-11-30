import HowItWorks from "@/src/components/HowItWorks";
import Benefits from "@/src/components/Benefits";
import LeadForm from "@/src/components/LeadForm";
import FAQ from "@/src/components/FAQ";

export const metadata = {
  title: "How It Works",
  description:
    "Learn how Yard Maintenance Quotes connects you with local yard maintenance professionals in three simple steps.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h1>
            <p className="text-xl text-gray-700">
              Getting a yard maintenance quote is simple, fast, and completely
              free.
            </p>
          </div>
        </div>
      </section>
      <HowItWorks />
      <Benefits />
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600">
                Fill out our simple form and get matched with local
                professionals today.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <FAQ
        title="Frequently Asked Questions About How It Works"
        description="Common questions about getting yard maintenance quotes through our service"
      />
    </>
  );
}
