import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <div className="relative container-fluid overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute z-30 inset-0 ">
        <div className="absolute top-40 right-10 w-48 h-48 bg-blue-400 rounded-full opacity-10 animate-pulse delay-700"></div>
        <div className="absolute bottom-10 left-40 w-56 h-56 bg-blue-300 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </div>
      
      {/* Content container */}
      <div className=" bg-gradient-to-br from-blue-600 to-blue-800 relative rounded-xl z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-10 border border-white/20 shadow-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get Started Today</h2>
          
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-10">
            Retail Genie makes it easier than ever to connect brands with buyers, streamline the listing process, and leverage AI-powered insights to maximize success.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button className="bg-white flex items-center justify-center gap-2 text-blue-600 font-semibold px-8 py-3 rounded-md hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <span>Join Now</span>
              <FaArrowRight />
            </button>
            
            <button className="bg-transparent flex items-center justify-center gap-2 text-white font-semibold px-8 py-3 rounded-md border-2 border-white/50 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <span>Request a Demo</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom wave pattern */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20"
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

export default FeaturesSection;