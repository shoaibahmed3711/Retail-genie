import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-60 -right-20 w-96 h-96 bg-blue-400 rounded-full opacity-10 animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-60 w-72 h-72 bg-blue-300 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Main content container */}
      <div className="container-fluid mx-auto px-6 py-[200px] flex gap-10 md:flex-row flex-col items-center justify-between relative z-10">
        {/* Left column */}
        <div className="space-y-2">
          <h1 className="text-[32px] max-w-[600px] font-bold leading-tight">
            The Go-To Platform for Canadian Buyers to Discover Retail-Verified Products Ready for Listing.
            <br />
          </h1>
            <h1 className="text-[20px] font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              Great Price.
            </h1>
          <p className="text-lg text-blue-100 max-w-xl">
            We'll do the hard work to help you and your employees save.
            Plan Administration, Compliance, and Investment Management
          </p>
          <button className="bg-white flex items-center gap-2 text-blue-600 font-semibold px-8 py-3 rounded-md hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
           <span> Let's get started </span><FaArrowRight />
          </button>
        </div>

        {/* Right column - Form */}
        <div className="bg-white/10  max-w-[500px] backdrop-blur-lg rounded-xl p-8 border border-white/20 shadow-2xl">
          <h3 className="text-xl font-semibold mb-6">Get Started Today</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition duration-300"
            />
            <input
              type="email"
              placeholder="Work email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition duration-300"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-3 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Schedule a demo
            </button>
          </form>
        </div>
      </div>

      {/* Precise wave pattern */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-32"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,192C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;