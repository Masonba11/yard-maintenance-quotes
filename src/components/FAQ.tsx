"use client";

import { useState, useEffect } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
  title?: string;
  description?: string;
}

const defaultFAQItems: FAQItem[] = [
  {
    question: "How much does it cost to get a quote?",
    answer:
      "Getting a quote through Yard Maintenance is completely free. There are no fees, no obligations, and no hidden costs. Local professionals will contact you directly with their quotes.",
  },
  {
    question: "How many quotes will I receive?",
    answer:
      "We typically match you with 2-4 pre-screened local yard maintenance professionals. This gives you options to compare services and pricing while ensuring you find the right fit for your needs.",
  },
  {
    question: "Who actually does the yard maintenance work?",
    answer:
      "Yard Maintenance is a lead generation and matching service. We connect you with local, licensed yard maintenance professionals in your area. The actual work is performed by these independent contractors, not by us.",
  },
  {
    question: "How quickly will I be contacted?",
    answer:
      "Most homeowners receive their first call or email from a local professional within 24 hours of submitting their request. Some may be contacted the same day, depending on availability.",
  },
  {
    question: "Do I have to accept any of the quotes?",
    answer:
      "No, there is absolutely no obligation. You can review all quotes, ask questions, and choose the professional that best fits your needs and budget. If none of the options work for you, you're under no obligation to proceed.",
  },
  {
    question: "What types of yard maintenance services are covered?",
    answer:
      "We connect homeowners with professionals offering a wide range of maintenance services including lawn mowing, yard cleanup, bush and hedge trimming, weed removal, leaf removal, and basic landscaping maintenance. If you have specific needs, mention them in your request.",
  },
  {
    question: "Is my information shared with multiple companies?",
    answer:
      "Yes, we share your information with 2-4 pre-screened local professionals so you can receive multiple quotes and compare options. We do not sell your information to third parties or use it for marketing purposes beyond connecting you with yard maintenance professionals.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We currently serve homeowners in select metro areas across the United States, including cities in Arizona, Oklahoma, Florida, Tennessee, South Carolina, Arkansas, Idaho, Texas, and New Mexico. Check our service areas page to see if we cover your location.",
  },
];

export default function FAQ({
  items = defaultFAQItems,
  title = "Frequently Asked Questions",
  description = "Everything you need to know about getting yard maintenance quotes",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQPage schema.org markup
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    script.id = "faq-schema";

    // Remove existing schema if present
    const existing = document.getElementById("faq-schema");
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("faq-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-white"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center bg-gradient-to-r from-gray-50 to-white hover:from-primary-50 hover:to-white transition-all"
                >
                  <span className="font-bold text-gray-900 pr-4 text-lg">
                    {item.question}
                  </span>
                  <span className="text-primary-600 text-2xl flex-shrink-0 font-light">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-5 bg-white text-gray-700 leading-relaxed border-t border-gray-100">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
