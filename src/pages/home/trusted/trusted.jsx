import React, { useState, useEffect } from 'react';

const TrustedBySection = () => {
  // Sample data - replace image URLs with your actual partner logos when implementing
  const partners = [
    { 
      id: 1, 
      name: 'Acme Corp', 
      logo: 'https://static.hsappstatic.net/ui-images/static-2.745/optimized/hubspot-wordmark.svg',
      category: 'technology'
    },
    { 
      id: 2, 
      name: 'TechGiant', 
      logo: 'https://static.hsappstatic.net/ui-images/static-2.745/optimized/hubspot-wordmark.svg',
      category: 'technology'
    },
    { 
      id: 3, 
      name: 'Global Retail', 
      logo: 'https://static.hsappstatic.net/ui-images/static-2.745/optimized/hubspot-wordmark.svg',
      category: 'retail'
    },
    { 
      id: 4, 
      name: 'Industry Leader', 
      logo: 'https://static.hsappstatic.net/ui-images/static-2.745/optimized/hubspot-wordmark.svg',
      category: 'manufacturing'
    },
    { 
      id: 5, 
      name: 'Major Brand', 
      logo: 'https://static.hsappstatic.net/ui-images/static-2.745/optimized/hubspot-wordmark.svg',
      category: 'retail'
    },
    { 
      id: 6, 
      name: 'Financial Group', 
      logo: 'https://static.hsappstatic.net/ui-images/static-2.745/optimized/hubspot-wordmark.svg',
      category: 'finance'
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "This platform revolutionized our inventory management and boosted our online sales by 35% within the first quarter of implementation.",
      author: "Jane Smith",
      position: "Chief Operating Officer",
      company: "TechGiant",
      companyLogo: '/api/placeholder/60/30',
      rating: 5
    },
    {
      id: 2,
      quote: "Implementation was seamless and our customers love the improved shopping experience. Support team was exceptional throughout the process.",
      author: "Mark Johnson",
      position: "Head of Digital",
      company: "Global Retail",
      companyLogo: '/api/placeholder/60/30',
      rating: 5
    },
    {
      id: 3,
      quote: "After evaluating multiple solutions, this platform provided the best balance of features, usability, and price point for our growing business.",
      author: "Sarah Williams",
      position: "CTO",
      company: "Financial Group",
      companyLogo: '/api/placeholder/60/30',
      rating: 4
    }
  ];

  // Add animation states
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="flex mt-2">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Filter functionality
  const [filter, setFilter] = useState('all');
  const filteredPartners = filter === 'all' 
    ? partners 
    : partners.filter(partner => partner.category === filter);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container-fluid mx-auto px-4 max-w-6xl">
        {/* Section Header with refined typography */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Trusted By Industry Leaders
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join over 500 companies already transforming their business with our enterprise-grade platform
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${filter === 'all' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All Partners
          </button>
          <button 
            onClick={() => setFilter('technology')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${filter === 'technology' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Technology
          </button>
          <button 
            onClick={() => setFilter('retail')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${filter === 'retail' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Retail
          </button>
          <button 
            onClick={() => setFilter('finance')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${filter === 'finance' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Finance
          </button>
        </div>

        {/* Partner Logos with improved grid and hover effects */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
          {filteredPartners.map((partner, index) => (
            <div 
              key={partner.id} 
              className={`bg-white p-6 rounded-xl transition-all duration-500 
                flex items-center justify-center border border-gray-100 hover:border-blue-200
                transform hover:-translate-y-1 group
                ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className="h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
          ))}
        </div>

        {/* Testimonials with improved cards */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">
            What Our Partners Say
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`bg-white p-8 rounded-xl shadow-md border border-gray-100
                  hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2
                  flex flex-col h-full relative overflow-hidden
                  ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-100 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-100 rounded-full opacity-30"></div>
                
                {/* Quote mark */}
                <svg 
                  className="w-10 h-10 text-blue-100 mb-4" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                
                <p className="italic text-gray-700 mb-6 flex-grow leading-relaxed">{testimonial.quote}</p>
                
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="mr-4">
                    <img 
                      src={testimonial.companyLogo} 
                      alt="" 
                      className="object-contain" 
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.position}, {testimonial.company}
                    </p>
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-20">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Global Partners</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Satisfaction Rate</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">35%</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Average Growth</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Support Available</div>
          </div>
        </div>

        {/* Call to action with improved design */}
        <div className="text-center mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-10 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to join our partner network?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Become part of our growing ecosystem and unlock exclusive benefits for your business
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg 
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;