import React from 'react';

const TrustedbySection = () => {
  const companies = [
    { id: 1, name: 'Microsoft', type: 'Enterprise' },
    { id: 2, name: 'Google', type: 'Enterprise' },
    { id: 3, name: 'Amazon', type: 'Enterprise' },
    { id: 4, name: 'Stripe', type: 'Technology' },
    { id: 5, name: 'Shopify', type: 'E-commerce' },
    { id: 6, name: 'Slack', type: 'Technology' }
  ];

  return (
    <div className="container-fluid md:py-[50px] bg-white">
      <div className="">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Trusted by leading companies
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px bg-gray-200 w-12"></div>
            <p className="text-gray-900 text-3xl font-bold">10,000+ businesses trust us</p>
            <div className="h-px bg-gray-200 w-12"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-600 text-3xl font-bold mb-2">$50B+</p>
            <p className="text-gray-600">Assets Managed</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-600 text-3xl font-bold mb-2">99.9%</p>
            <p className="text-gray-600">Uptime SLA</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-600 text-3xl font-bold mb-2">24/7</p>
            <p className="text-gray-600">Support</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-600 text-3xl font-bold mb-2">150+</p>
            <p className="text-gray-600">Countries</p>
          </div>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
            >
              {/* Replace with actual company logos in production */}
              <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-600 font-semibold">{company.name}</span>
              </div>
              <span className="text-sm text-gray-500 mt-2">{company.type}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TrustedbySection;