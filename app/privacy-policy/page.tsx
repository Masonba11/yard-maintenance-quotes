export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Yard Maintenance",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-700">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-gray-700 mb-6">
              <strong>Yard Maintenance</strong> ("we," "our," or "us") is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, and share information when you use our
              website and services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              When you submit a request for a yard maintenance quote, we collect
              information including your name, phone number, email address,
              address (optional), ZIP code, service preferences, and any
              additional information you provide about your yard maintenance
              needs.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information you provide to connect you with local yard
              maintenance professionals who can provide quotes for the services
              you need. We share your information with 2-4 pre-screened local
              professionals so you can receive multiple quotes and compare
              options.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We share your information with local yard maintenance
              professionals in your area who are part of our network. We do not
              sell your information to third parties or use it for marketing
              purposes beyond connecting you with yard maintenance
              professionals.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 mb-4">
              We take reasonable measures to protect your information, but no
              method of transmission over the internet is 100% secure. We cannot
              guarantee absolute security of your data.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy, please contact us
              through our contact page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
