import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Add custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Don't log in production
  if (import.meta.env.DEV) {
    // Using a less-frequent log to avoid console spam
    if (Math.random() < 0.1) {
      console.log('AuthContext: useAuth hook accessed');
    }
  }
  
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationEmail, setVerificationEmail] = useState(null);
  
  console.log('AuthContext: AuthProvider rendered');

  // Configure axios
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Use environment variable
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add authorization header to requests if user is logged in
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for handling token expiration
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logoutUser();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  // Check if user is already logged in on initial load
  useEffect(() => {
    console.log('AuthContext: Checking session');
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          console.log('AuthContext: Token found, validating session');
          const response = await apiClient.get('/auth/check-session');
          setCurrentUser(response.data.user);
          console.log('AuthContext: User session validated');
        } else {
          console.log('AuthContext: No token found, user is not logged in');
        }
      } catch (error) {
        console.error("AuthContext: Session check failed:", error.response?.data?.error || error.message);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Register new user
  const registerUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post('/auth/register', userData);
      
      localStorage.setItem('token', response.data.access_token);
      setCurrentUser(response.data.user);
      
      // Store email for verification
      setVerificationEmail(userData.email);
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const loginUser = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post('/auth/login', credentials);
      
      localStorage.setItem('token', response.data.access_token);
      setCurrentUser(response.data.user);
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Verify email with OTP
  const verifyEmail = async (email, code) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post('/auth/verify-otp', { email, code });
      
      // Update user's email verification status
      if (response.data.status === 'success') {
        setCurrentUser(prev => ({
          ...prev,
          isEmailVerified: true
        }));
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Verification failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Resend verification code
  const resendVerificationCode = async (email) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post('/auth/resend-verification', { email: email || verificationEmail });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to resend code. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to process request. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Reset password with token
  const resetPassword = async (token, newPassword, confirmNewPassword) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post('/auth/reset-password', {
        token,
        newPassword,
        confirmNewPassword
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Password reset failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword, confirmNewPassword) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword,
        confirmNewPassword
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to change password. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logoutUser = () => {
    try {
      apiClient.post('/auth/logout').catch(err => {
        console.error('Logout API error:', err);
      });
    } finally {
      localStorage.removeItem('token');
      setCurrentUser(null);
      window.location.href = '/login';
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Memoize value to prevent unnecessary re-renders
  const value = React.useMemo(() => ({
    currentUser,
    loading,
    error,
    registerUser,
    loginUser,
    logoutUser,
    verifyEmail,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
    changePassword,
    verificationEmail,
    setVerificationEmail,
    clearError
  }), [
    currentUser,
    loading,
    error,
    verificationEmail
    // Note: we don't need to include function dependencies as they're stable
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;