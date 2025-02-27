import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../AuthLayout';

const VerificationCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  
  // Focus on first input on page load
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Create a new copy of the code array
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto focus on next input if a digit was entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setCode(digits);
      
      // Focus the last input
      inputRefs.current[5].focus();
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <AuthLayout 
      title="Verification"
      description="Please enter the 6-digit code sent to your email or phone number."
    >
      <div className="bg-gray-800 rounded-lg p-8">
        {/* Security Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-700 rounded-full p-4 w-20 h-20 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>

        {/* Code explanation */}
        <div className="text-center mb-6">
          <h2 className="text-xl text-white font-medium mb-2">Enter Verification Code</h2>
          <p className="text-gray-400 text-sm">
            We've sent a 6-digit code to your device for authentication
          </p>
        </div>

        {/* Verification Code Input */}
        <div className="flex justify-between gap-2 mb-6" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-white text-center text-xl font-bold bg-gray-700 rounded-lg border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
          ))}
        </div>

        <Link to={isCodeComplete ? '/Onboarding' : '#'} className='w-full'>
          <button 
            className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4 ${
              isCodeComplete 
                ? 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 focus:ring-4 focus:ring-blue-500/50' 
                : 'bg-gray-700 cursor-not-allowed'
            }`}
            disabled={!isCodeComplete}
          >
            Verify
          </button>
        </Link>

        <div className="text-sm text-center text-gray-400">
          Didn't receive a code?{" "}
          <button className="text-blue-400 hover:underline font-medium">
            Resend
          </button>
        </div>

        <div className="mt-4 text-sm text-center text-gray-400">
          <Link to="/login" className="text-blue-400 hover:underline font-medium">
            ← Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerificationCode;