import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef([]);
  const { verifyEmail, resendVerificationCode, verificationEmail, loading, error: authError, clearError, currentUser } = useAuth();
  const navigate = useNavigate();

  // Clear any auth errors when component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);

  // Redirect if user is already verified
  useEffect(() => {
    if (currentUser && currentUser.isEmailVerified) {
      redirectBasedOnRole(currentUser.role);
    }
  }, [currentUser]);

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'ADMIN':
        navigate('/AdminOverview');
        break;
      case 'BUYER':
        navigate('/BuyerOverview');
        break;
      case 'BRAND_OWNER':
        navigate('/Overview');
        break;
      case 'BRAND_MANAGER':
        navigate('/brandManagerDashboard');
        break;
      default:
        navigate('/');
    }
  };

  // Handle countdown for resend button
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user is typing
    if (error) setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Filter out non-numeric characters
    const numericValue = pastedData.replace(/[^0-9]/g, '');
    
    // Only process if we have digits
    if (numericValue) {
      const digits = numericValue.split('').slice(0, 6);
      const newOtp = [...otp];
      
      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      
      setOtp(newOtp);
      
      // Focus last populated input or the next empty one
      const focusIndex = Math.min(digits.length, 5);
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit verification code');
      return;
    }
    
    try {
      const result = await verifyEmail(verificationEmail, otpValue);
      if (result.status === 'success') {
        setTimeout(() => {
          redirectBasedOnRole(currentUser.role);
        }, 1000);
      }
    } catch (err) {
      setError('Verification failed. Please check the code and try again.');
      console.error('Verification error:', err);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendVerificationCode();
      setResendDisabled(true);
      setCountdown(60); // Disable resend for 60 seconds
    } catch (err) {
      setError('Failed to resend code. Please try again later.');
      console.error('Resend code error:', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 6-digit verification code to <span className="font-medium text-indigo-600">{verificationEmail}</span>.<br />
            Enter the code below to verify your email address.
          </p>
        </div>
        
        {(error || authError) && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Verification Failed</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error || authError}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 text-center mb-4">
              Verification Code
            </label>
            
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 rounded-md border border-gray-300 text-center text-2xl focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : null}
              Verify Email
            </button>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-gray-600">Didn't receive a code?</p>
            <button
              type="button"
              disabled={resendDisabled || loading}
              onClick={handleResendCode}
              className="mt-1 font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendDisabled ? `Resend code (${countdown}s)` : 'Resend code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;