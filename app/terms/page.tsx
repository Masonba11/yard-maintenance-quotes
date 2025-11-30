export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Yard Maintenance Quotes",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
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
              Please read these Terms of Service ("Terms") carefully before
              using Yard Maintenance Quotes ("the Service") operated by Yard
              Maintenance Quotes ("us," "we," or "our").
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Service Description
            </h2>
            <p className="text-gray-700 mb-4">
              Yard Maintenance Quotes is a lead generation and matching service.
              We connect homeowners with local yard maintenance professionals.
              We do not perform yard maintenance services ourselves, and we are
              not responsible for the work performed by the professionals we
              connect you with.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              No Obligation
            </h2>
            <p className="text-gray-700 mb-4">
              There is no obligation to accept any quote or hire any
              professional. You are free to compare quotes and choose the option
              that works best for you, or choose not to proceed with any of the
              options.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-700 mb-4">
              The yard maintenance professionals we connect you with are
              independent contractors. We are not responsible for their work,
              pricing, availability, or any agreements you enter into with them.
              Any disputes should be resolved directly with the professional.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-4">
              Yard Maintenance Quotes is provided "as is" without warranties of
              any kind. We are not liable for any damages arising from your use
              of the Service or from work performed by professionals we connect
              you with.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these Terms, please contact us through
              our contact page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
