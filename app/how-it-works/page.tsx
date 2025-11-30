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
              How It Works
            </h1>
            <p className="text-xl text-white/90">
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
