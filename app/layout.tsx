import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Yard Maintenance Quotes | Fast, Free Quotes from Local Pros",
    template: "%s | Yard Maintenance Quotes",
  },
  description:
    "Get fast, free yard maintenance quotes from pre-screened local professionals. One simple form, multiple quote options. No spam, no obligation.",
  keywords: [
    "yard maintenance",
    "lawn care",
    "yard cleanup",
    "landscaping maintenance",
    "free quotes",
  ],
  openGraph: {
    title: "Yard Maintenance Quotes | Fast, Free Quotes from Local Pros",
    description:
      "Get fast, free yard maintenance quotes from pre-screened local professionals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Yard Maintenance Quotes",
              url: "https://yardmaintenancequote.com",
              description:
                "Connect with local yard maintenance professionals for free quotes.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://yardmaintenancequote.com/locations?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Yard Maintenance Quotes",
              url: "https://yardmaintenancequote.com",
              description:
                "A lead generation service connecting homeowners with local yard maintenance professionals.",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
