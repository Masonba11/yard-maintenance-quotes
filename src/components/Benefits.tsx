export default function Benefits() {
  const benefits = [
    {
      title: "Pre-screened local pros",
      description:
        "We work with trusted, licensed yard maintenance professionals in your area.",
    },
    {
      title: "One simple form, multiple quotes",
      description:
        "Fill out one form and receive quotes from multiple qualified professionals.",
    },
    {
      title: "No spam, no obligation",
      description:
        "Get real quotes from real pros. No spam calls or high-pressure sales tactics.",
    },
    {
      title: "Year-round yard maintenance help",
      description:
        "From spring cleanup to winter prep, we connect you with pros for all seasons.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Why Homeowners Use Yard Maintenance
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-primary-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
