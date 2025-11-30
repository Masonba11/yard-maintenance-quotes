export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Tell us about your yard",
      description:
        "Fill out a simple form with details about your yard and the services you need.",
    },
    {
      number: "2",
      title: "We match you with a local pro",
      description:
        "We connect you with pre-screened yard maintenance professionals in your area.",
    },
    {
      number: "3",
      title: "They contact you with a quote",
      description:
        "Local pros reach out with free, no-obligation quotes tailored to your needs.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting a yard maintenance quote has never been easier
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-primary-300 transition-all hover:shadow-xl"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
