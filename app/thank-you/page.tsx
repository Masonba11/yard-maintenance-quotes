import Link from "next/link";

export const metadata = {
  title: "Thank You",
  description: "Thank you for requesting a yard maintenance quote.",
};

export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="text-green-600 text-6xl mb-6">✓</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            We've received your request for a yard maintenance quote. A local
            professional will contact you shortly with a free, no-obligation
            quote.
          </p>
          <div className="space-y-4">
            <p className="text-gray-600">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
              <li>• You'll receive quotes from 2-4 local professionals</li>
              <li>• Most homeowners are contacted within 24 hours</li>
              <li>• Compare quotes and choose the best fit for you</li>
              <li>• No obligation to accept any quote</li>
            </ul>
          </div>
          <div className="mt-8">
            <Link
              href="/"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-block"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
