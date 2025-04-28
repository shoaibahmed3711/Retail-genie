import React from 'react';
import { Link } from 'react-router-dom';

const Onboarding = () => {
    const userRoles = [
        {
          title: "Brand Owner",
          path: "/Overview",
          shade: "bg-blue-600",
          description: "Manage your product catalog and connect with top retailers across Canada.",
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
          </svg>
        },
        {
          title: "Brand Manager",
          path: "/brandManagerDashboard",
          shade: "bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700",
          description: "Oversee multiple brands with analytics and strategic marketing tools.",
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        },
        {
          title: "Retail Buyer",
          path: "/BuyerBrands",
          shade: "bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700",
          description: "Discover verified products with category filters and trend forecasting.",
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        },
        {
          title: "Administrator",
          path: "/AdminOverview",
          shade: "bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700",
          description: "Manage platform users, security settings, and system configurations.",
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
          </svg>
        }
      ];
    
      return (
        <div className="min-h-screen bg-gray-50">
          {/* Header with Blue Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white py-12 px-6">
            <div className="container-fluid mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="mb-8 lg:mb-0 text-center lg:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Retail Genie</h1>
                  <p className="text-blue-100 text-lg max-w-xl">
                    Select your role to access a tailored dashboard designed for your specific needs.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img src="/logo.svg" alt="Retail Genie Logo" className="h-24" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="container-fluid mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-gray-800">Get Started with Your Account</h2>
              <p className="text-gray-600 mt-2">Choose your role to continue to your personalized experience</p>
            </div>
            
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {userRoles.map((role, index) => (
                <Link
                  to={role.path}
                  key={index}
                  className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Icon Container */}
                  <div className={`${role.shade} p-8 flex items-center justify-center`}>
                    <div className="text-white transition-transform duration-300 group-hover:scale-110">
                      {role.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 bg-white flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{role.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{role.description}</p>
                    
                    {/* CTA */}
                    <button className="mt-auto w-full py-3 bg-blue-600 text-white rounded-md font-medium transition-colors duration-300 hover:bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 flex items-center justify-center">
                      <span>Continue</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
    
            {/* Help Section */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center justify-center p-6 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700">
                  Not sure which role to select? <button className="text-blue-600 font-medium hover:underline ml-1">Contact support</button>
                </span>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-6 mt-12">
            <div className="container-fluid mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 mb-4 md:mb-0">
                &copy; 2025 Retail Genie. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">Help Center</a>
              </div>
            </div>
          </footer>
        </div>
      );
    };

export default Onboarding;