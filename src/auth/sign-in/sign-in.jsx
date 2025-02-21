
import React, { useState } from 'react';
import { Link, Links } from 'react-router-dom';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);

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

          <div className="bg-gray-800 rounded-lg p-8">
            {/* Profile Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-700 rounded-full p-4 w-20 h-20 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>

            {/* Form */}
            <form>
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="bg-gray-700 text-white text-sm rounded-lg pl-10 w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                />
              </div>

              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="password"
                  className="bg-gray-700 text-white text-sm rounded-lg pl-10 w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                />
              </div>

              {!isLogin && (
                <div className="mb-6 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="bg-gray-700 text-white text-sm rounded-lg pl-10 w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm Password"
                  />
                </div>
              )}

              <Link to='/Onboarding' className='w-full' >
                <button className="w-full text-white bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 focus:ring-4 focus:ring-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4"
                >
                  {isLogin ? 'Login' : 'Sign Up'}

                </button>
              </Link>

              <div className="text-sm text-center text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  className="text-blue-400 hover:underline font-medium"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Register an account' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Welcome Visual */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/40 to-blue-900/40"></div>

        {/* blue Wave Animation */}
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
          <h1 className="text-5xl font-bold text-white mb-4">Welcome.</h1>
          <p className="text-gray-300 text-lg text-center max-w-md">
            Log in to access your dashboard and explore the latest features designed to enhance your experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;