import Hero from "@/src/components/Hero";
import HowItWorks from "@/src/components/HowItWorks";
import Benefits from "@/src/components/Benefits";
import ServicesOverview from "@/src/components/ServicesOverview";
import CityGrid from "@/src/components/CityGrid";
import LeadForm from "@/src/components/LeadForm";
import FAQ from "@/src/components/FAQ";

export const metadata = {
  title: "Fast Yard Maintenance Quotes in Minutes",
  description:
    "Get fast, free yard maintenance quotes from pre-screened local professionals. One simple form, multiple quote options. No spam, no obligation.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <ServicesOverview />
      <section id="quote-form" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <LeadForm />
          </div>
        </div>
      </section>
      <CityGrid />
      <FAQ />
    </>
  );
}
