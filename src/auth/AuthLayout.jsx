import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, description }) => {
  return (
    <div className="flex h-screen w-full bg-gray-900">
      {/* Left Section - Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center">
            <Link to='/' className="text-blue-500 font-bold text-2xl flex items-center">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" />
              </svg>
              COMPANY DESIGN
            </Link>
          </div>

          {children}
        </div>
      </div>

      {/* Right Section - Welcome Visual */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/40 to-blue-900/40"></div>

        {/* Blue Wave Animation */}
        <div className="absolute w-full h-full">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-50">
            <path d="M0,800 C200,700 400,900 600,800 C800,700 1000,800 1000,700 V1000 H0 V800 Z" fill="url(#blueGradient)" className="animate-pulse">
              <animate attributeName="d"
                values="M0,800 C200,700 400,900 600,800 C800,700 1000,800 1000,700 V1000 H0 V800 Z;
                       M0,700 C200,800 400,700 600,900 C800,800 1000,700 1000,800 V1000 H0 V800 Z;
                       M0,800 C200,700 400,900 600,800 C800,700 1000,800 1000,700 V1000 H0 V800 Z"
                dur="20s" repeatCount="indefinite" />
            </path>
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Welcome Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-12">
          <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-300 text-lg text-center max-w-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
